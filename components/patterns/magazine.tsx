import type { ReactNode } from "react"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
import { RichText } from "@/components/patterns/editorial"
import { EditorialColumn } from "@/components/patterns/layout"
import type { NewsletterImageRef } from "@/content/newsletter-semestre-1-2026"
import { cn } from "@/lib/utils"

/**
 * Ouverture de chapitre : la photo porte le titre du projet.
 *
 * Hauteur bornee et non plein ecran : le defilement magnetique plein ecran a
 * ete essaye puis retire, il rendait la lecture penible. Le bandeau rythme la
 * page sans confisquer le defilement.
 *
 * Le voile degrade n'est pas decoratif — c'est la condition de lisibilite du
 * texte blanc sur une photo de terrain, dont on ne maitrise pas la clarte.
 */
export function MagazineChapter({
  id,
  image,
  eyebrow,
  title,
  lead,
  priority = false,
  children,
}: {
  id?: string
  image?: NewsletterImageRef
  eyebrow?: string
  title: string
  /** Phrase d'accroche ; accepte les marqueurs [[chiffre]] */
  lead?: string
  priority?: boolean
  children?: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-titre` : undefined}
      className={cn("relative flex min-h-[26rem] items-end overflow-hidden lg:min-h-[32rem]")}
    >
      <NewsletterFigure
        image={image}
        priority={priority}
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-jgen-plum via-jgen-plum/75 to-jgen-plum/20"
      />

      <EditorialColumn size="wide" className="relative z-10 py-12 lg:py-16">
        {eyebrow && <p className="eyebrow mb-4 text-jgen-jaune">{eyebrow}</p>}

        <h2
          id={id ? `${id}-titre` : undefined}
          className="max-w-[18ch] text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>

        {lead && <RichText className="mt-5 max-w-[52ch] text-lg text-white/90">{lead}</RichText>}

        {children}
      </EditorialColumn>
    </section>
  )
}

export function MagazineNav({
  chapters,
}: {
  chapters: { id: string; label: string }[]
}) {
  return (
    <nav
      aria-label="Sommaire de la newsletter"
      className="sticky top-0 z-40 bg-jgen-plum shadow-lg"
    >
      <EditorialColumn size="wide">
        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-6 sm:py-0">
          {/* Libelle explicite : sans lui, une rangee de liens colles sous
              l'en-tete se lit comme une seconde barre de navigation du site. */}
          <span className="eyebrow shrink-0 text-jgen-jaune">Au sommaire</span>

          <ul className="-mx-1 flex list-none gap-1 overflow-x-auto sm:mx-0 sm:gap-2">
            {chapters.map((chapter) => (
              <li key={chapter.id} className="shrink-0">
                <a
                  href={`#${chapter.id}`}
                  className="group relative block px-3 py-3.5 text-sm font-medium whitespace-nowrap text-white/75 transition-colors duration-200 hover:text-jgen-jaune focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jgen-jaune sm:py-5"
                >
                  {chapter.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-2 h-0.5 origin-left scale-x-0 bg-jgen-jaune transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none sm:bottom-3"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </EditorialColumn>
    </nav>
  )
}
