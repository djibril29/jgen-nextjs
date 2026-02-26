import { client } from "@/sanity/lib/client"
import { HeroCarouselClient, type HeroSlideData } from "@/components/hero-carousel.client"

// ── Types ─────────────────────────────────────────────────────────────────────

interface RawHeroSlide {
  _id: string
  slideType: 'linked' | 'standalone'
  youtubeUrl?: string
  linked?: {
    _type: 'post' | 'program'
    title: string
    slug: string
    image?: any
    subtitle?: string
  }
  overrideImage?: any
  overrideCtaLabel?: string
  title?: string
  subtitle?: string
  image?: any
  badge?: string
  ctaLabel?: string
  ctaUrl?: string
}

// ── GROQ queries ──────────────────────────────────────────────────────────────

const HERO_SLIDES_QUERY = `
  *[_type == "heroSlide" && isActive == true && (!defined(expiresAt) || expiresAt > now())]
  | order(order asc)[0...6]{
    _id,
    slideType,
    youtubeUrl,
    "linked": linkedDocument->{
      _type,
      title,
      "slug": slug.current,
      "image": coalesce(image, featuredImage),
      "subtitle": coalesce(excerpt, summary)
    },
    overrideImage,
    overrideCtaLabel,
    title,
    subtitle,
    image,
    badge,
    ctaLabel,
    ctaUrl
  }
`

// Fallback: used when no heroSlide documents are active yet
const FEATURED_POSTS_QUERY = `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...4]{
    _id,
    title,
    excerpt,
    image,
    "slug": slug.current,
    "category": categories[0]->title
  }
`

const RECENT_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc)[0...4]{
    _id,
    title,
    excerpt,
    image,
    "slug": slug.current,
    "category": categories[0]->title
  }
`

// ── Normalization ─────────────────────────────────────────────────────────────

function normalizeSlide(raw: RawHeroSlide): HeroSlideData | null {
  if (raw.slideType === 'linked') {
    if (!raw.linked) return null // orphaned reference — skip silently

    const { _type, title, slug, image, subtitle } = raw.linked
    const resolvedUrl = _type === 'post' ? `/blog/${slug}` : `/programs/${slug}`
    const defaultCtaLabel = _type === 'post' ? "Lire l'article" : 'En savoir plus'

    return {
      _id:        raw._id,
      title,
      subtitle,
      image:      raw.overrideImage ?? image,
      ctaLabel:   raw.overrideCtaLabel ?? defaultCtaLabel,
      ctaUrl:     raw.youtubeUrl ? undefined : resolvedUrl,
      youtubeUrl: raw.youtubeUrl,
    }
  }

  // standalone
  if (!raw.title || !raw.image) return null // incomplete — skip silently

  return {
    _id:        raw._id,
    title:      raw.title,
    subtitle:   raw.subtitle,
    image:      raw.image,
    badge:      raw.badge,
    ctaLabel:   raw.ctaLabel ?? 'En savoir plus',
    ctaUrl:     raw.youtubeUrl ? undefined : raw.ctaUrl,
    youtubeUrl: raw.youtubeUrl,
  }
}

// ── Data fetching ─────────────────────────────────────────────────────────────

async function getHeroSlides(): Promise<HeroSlideData[]> {
  const rawSlides: RawHeroSlide[] = await client.fetch(
    HERO_SLIDES_QUERY,
    {},
    { next: { revalidate: 60 } }
  )

  if (rawSlides && rawSlides.length > 0) {
    return rawSlides
      .map(normalizeSlide)
      .filter((s): s is HeroSlideData => s !== null)
  }

  // ── Fallback: no heroSlide documents yet — use featured posts ─────────────
  let posts = await client.fetch(FEATURED_POSTS_QUERY, {}, { next: { revalidate: 60 } })

  if (!posts || posts.length === 0) {
    posts = await client.fetch(RECENT_POSTS_QUERY, {}, { next: { revalidate: 60 } })
  }

  if (!posts || posts.length === 0) return []

  return posts.map((post: any): HeroSlideData => ({
    _id:      post._id,
    title:    post.title,
    subtitle: post.excerpt,
    image:    post.image,
    badge:    post.category,
    ctaLabel: "Lire l'article",
    ctaUrl:   `/blog/${post.slug}`,
  }))
}

// ── Component ─────────────────────────────────────────────────────────────────

export async function HeroCarousel() {
  const slides = await getHeroSlides()
  return <HeroCarouselClient slides={slides} />
}

export const revalidate = 60
