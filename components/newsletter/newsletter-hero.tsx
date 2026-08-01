import Link from "next/link"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
import { EditorialColumn } from "@/components/patterns/layout"
import { Button } from "@/components/ui/button"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

export function NewsletterHero() {
  const { header, intro, coverImage, links, cta } = data

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-jgen-plum to-[#2d1537] pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Formes décoratives, cohérentes avec les autres pages du site */}
      <div
        className="pointer-events-none absolute top-24 right-8 h-24 w-24 rotate-12 bg-jgen-jaune opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 left-6 h-16 w-16 -rotate-12 bg-jgen-vert opacity-30"
        aria-hidden="true"
      />

      {/* Le hero s'aligne sur la meme colonne que la narration : sans cela, le
          titre demarre plus a gauche que le texte qu'il annonce. */}
      <EditorialColumn size="wide" className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-5 inline-block border-2 border-jgen-jaune px-4 py-2 text-xs font-bold uppercase tracking-wide text-jgen-jaune sm:text-sm">
              {header.overline}
            </p>

            <h1 className="mb-6 text-4xl font-black tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              {header.title}
            </h1>

            <div className="mb-8 h-1 w-24 bg-jgen-jaune" aria-hidden="true" />

            <p className="mb-8 text-lg leading-relaxed text-pretty text-white/90 lg:text-xl">
              {intro.web[0]}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="h-auto bg-jgen-rose px-8 py-6 text-base font-bold text-white hover:bg-[#b01a45]"
              >
                <Link href={links.achievementsAnchor}>{cta.heroPrimary}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-auto bg-white px-8 py-6 text-base font-bold text-jgen-plum hover:bg-white/90"
              >
                <Link href={links.about}>{cta.heroSecondary}</Link>
              </Button>
            </div>
          </div>

          <NewsletterFigure
            image={coverImage}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/3] w-full shadow-2xl"
          />
        </div>
      </EditorialColumn>
    </section>
  )
}
