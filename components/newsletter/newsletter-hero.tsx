import Image from "next/image"

import { EditorialColumn } from "@/components/patterns/layout"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"
import { resolveNewsletterImage } from "@/lib/newsletter-image"

/**
 * Ouverture de la newsletter : la photo occupe le fond, le titre se pose
 * dessus, la description suit en dessous.
 *
 * Le voile degrade n'est pas decoratif — c'est la condition de lisibilite du
 * texte blanc. Une photo de terrain peut etre claire a n'importe quel endroit,
 * et sans lui le contraste n'est garanti nulle part.
 */
export function NewsletterHero() {
  const { header, intro, coverImage } = data
  const cover = resolveNewsletterImage(coverImage.name, coverImage.alt)

  return (
    <section className="relative overflow-hidden bg-jgen-plum pt-32 pb-20 lg:pt-40 lg:pb-28">
      {cover ? (
        <Image
          src={cover.publicPath}
          alt={cover.alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-jgen-plum via-jgen-plum/85 to-jgen-plum/50"
      />

      <EditorialColumn size="wide" className="relative z-10">
        <p className="eyebrow mb-5 text-jgen-jaune">{header.overline}</p>

        <h1 className="max-w-[16ch] text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
          {header.title}
        </h1>

        <div className="mt-7 mb-7 h-1 w-24 bg-jgen-jaune" aria-hidden="true" />

        <p className="max-w-[52ch] text-lg leading-relaxed text-pretty text-white/90">
          {intro.web[0]}
        </p>
      </EditorialColumn>
    </section>
  )
}
