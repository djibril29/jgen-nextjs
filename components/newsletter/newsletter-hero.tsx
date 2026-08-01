import Link from "next/link"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
import { Button } from "@/components/ui/button"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

export function NewsletterHero() {
  const { header, intro, coverImage, links, cta } = data

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#3d1f47] to-[#2d1537] pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Formes décoratives, cohérentes avec les autres pages du site */}
      <div
        className="pointer-events-none absolute top-24 right-8 h-24 w-24 rotate-12 bg-[#ffd23f] opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 left-6 h-16 w-16 -rotate-12 bg-[#00d4aa] opacity-30"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-5 inline-block border-2 border-[#ffd23f] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#ffd23f] sm:text-sm">
              {header.overline}
            </p>

            <h1 className="mb-6 text-4xl font-black tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              {header.title}
            </h1>

            <div className="mb-8 h-1 w-24 bg-[#ffd23f]" aria-hidden="true" />

            <p className="mb-8 text-lg leading-relaxed text-pretty text-white/90 lg:text-xl">
              {intro.web[0]}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="h-auto bg-[#c61d4d] px-8 py-6 text-base font-bold text-white hover:bg-[#b01a45]"
              >
                <Link href={links.achievementsAnchor}>{cta.heroPrimary}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="h-auto bg-white px-8 py-6 text-base font-bold text-[#3d1f47] hover:bg-white/90"
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
      </div>
    </section>
  )
}
