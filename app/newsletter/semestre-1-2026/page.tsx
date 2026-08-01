import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterAxes } from "@/components/newsletter/newsletter-axes"
import { NewsletterCta } from "@/components/newsletter/newsletter-cta"
import { NewsletterHero } from "@/components/newsletter/newsletter-hero"
import { NewsletterHighlights } from "@/components/newsletter/newsletter-highlights"
import { NewsletterOrientations } from "@/components/newsletter/newsletter-orientations"
import { NewsletterOutlook } from "@/components/newsletter/newsletter-outlook"
import { NewsletterStats } from "@/components/newsletter/newsletter-stats"
import { NewsletterTimeline } from "@/components/newsletter/newsletter-timeline"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"
import { resolveNewsletterImage } from "@/lib/newsletter-image"
import { buildUrl } from "@/lib/site"

const pageUrl = buildUrl(data.pagePath)

// Image sociale : le visuel de couverture s'il a été déposé, sinon le visuel
// générique déjà utilisé ailleurs sur le site. Aucune URL fictive n'est produite.
const cover = resolveNewsletterImage(data.coverImage.name, data.coverImage.alt)
const socialImage = cover?.publicPath ?? "/Hero.png"
const socialImageAlt = cover?.alt ?? "J-GEN Sénégal — newsletter semestrielle janvier-juin 2026"

export const metadata: Metadata = {
  title: data.meta.seoTitle,
  description: data.meta.seoDescription,
  keywords: data.meta.keywords,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: data.meta.seoTitle,
    description: data.meta.seoDescription,
    url: pageUrl,
    type: "article",
    images: [{ url: socialImage, alt: socialImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: data.meta.seoTitle,
    description: data.meta.seoDescription,
    images: [socialImage],
  },
}

export default function NewsletterSemestreUn2026Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Seule bande pleine largeur de l'en-tete : elle annonce la page. Tout
          ce qui suit court dans une colonne editoriale unique, ou les aplats
          de couleur ponctuent au lieu de segmenter. */}
      <NewsletterHero />

      <NewsletterOrientations />
      <NewsletterAxes />
      <NewsletterHighlights />
      <NewsletterTimeline />

      {/* Le bilan chiffre ferme la narration plutot que de l'ouvrir : on lit
          d'abord ce qui a ete fait, on en voit la somme ensuite. */}
      <NewsletterStats />

      <NewsletterOutlook />
      <NewsletterCta />
      <Footer />
    </main>
  )
}
