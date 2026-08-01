import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import { BlogHeroImage } from "@/components/blog-hero-image"
import { ArticleSchema, BreadcrumbSchema } from "@/components/structured-data"
import { buildUrl } from "@/lib/site"

async function getPost(slug: string) {
  const query = `*[_type=="post" && slug.current==$slug][0]{
    _id,
    title,
    publishedAt,
    _updatedAt,
    image,
    excerpt,
    body,
    metaTitle,
    metaDescription,
    keywords,
    noIndex,
    "categories": categories[]->title,
    "author": author->name,
    program->{ title, "slug": slug.current }
  }`
  return client.fetch(query, { slug }, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
}

/**
 * Métadonnées par article.
 *
 * Sans cette fonction, Next.js retombe sur le `metadata` du layout racine : tous
 * les articles partagent alors le même titre et la même description, ce qui les
 * rend indistinguables pour un moteur de recherche. Les champs `metaTitle` et
 * `metaDescription` de Sanity priment ; à défaut on retombe sur le titre et
 * l'accroche de l'article.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: "Article non trouvé",
      robots: { index: false, follow: false },
    }
  }

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt || undefined
  const url = buildUrl(`/blog/${slug}`)
  const image = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: { canonical: url },
    robots: post.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      images: image ? [{ url: image, alt: post.image?.alt || post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  // If post doesn't exist, show a default message
  if (!post) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <Link href="/blog">
            <Button>Retour au blog</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const url = buildUrl(`/blog/${slug}`)
  const image = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined

  return (
    <main className="min-h-screen">
      {/* Balisage Article : c'est ce qui permet à Google d'identifier la page
          comme un article daté et attribué, plutôt que comme une page générique. */}
      <ArticleSchema
        headline={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        url={url}
        image={image}
        datePublished={post.publishedAt}
        dateModified={post._updatedAt}
        authorName={post.author}
        keywords={post.keywords}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: buildUrl("/") },
          { name: "Actualités", url: buildUrl("/blog") },
          { name: post.title, url },
        ]}
      />

      <Header />

      {/* Hero Image */}
      <BlogHeroImage
        image={post.image}
        alt={post.image?.alt || post.title}
      />

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux actualités
            </Link>

            {/* Article Type */}
            <div className="text-sm font-medium text-muted-foreground mb-4">{post.categories?.[0] ?? ''}</div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight">{post.title}</h1>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-accent text-foreground text-sm rounded-full">
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-2 text-muted-foreground mb-8 pb-8 border-b">
              <Calendar className="h-4 w-4" />
              <time>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : ''}</time>
            </div>

            {/* Lead Paragraph */}
            {post.excerpt ? (
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 text-foreground">{post.excerpt}</p>
            ) : null}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} />
            </div>

            {/* Rattachement au programme. Ce lien de retour ferme la boucle du
                maillage interne : la page programme liste ses articles, chaque
                article renvoie à son programme. */}
            {post.program?.slug && (
              <div className="mt-12 border-l-4 border-jgen-jaune bg-gray-50 p-6">
                <p className="text-sm text-gray-600">Cet article s'inscrit dans le programme</p>
                <Link
                  href={`/programs/${post.program.slug}`}
                  className="mt-1 inline-flex items-center gap-2 text-lg font-bold text-jgen-plum underline-offset-4 hover:underline"
                >
                  {post.program.title}
                  <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
                </Link>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Partager cet article</span>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
