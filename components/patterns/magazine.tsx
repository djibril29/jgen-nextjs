import type { ReactNode } from "react"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
import { RichText } from "@/components/patterns/editorial"
import { EditorialColumn } from "@/components/patterns/layout"
import type { NewsletterImageRef } from "@/content/newsletter-semestre-1-2026"
import { cn } from "@/lib/utils"

/**
 * Ouverture de chapitre plein ecran, facon magazine.
 *
 * `min-h-[100dvh]` et non `100vh` : sur mobile, `vh` se calcule sur la fenetre
 * barre d'adresse retractee, ce qui fait deborder le chapitre et coupe le bas
 * du texte tant que la barre est visible. `dvh` suit la hauteur reellement
 * disponible.
 *
 * Le voile degrade n'est pas decoratif : il est la condition de lisibilite du
 * texte blanc. Une photo de terrain peut etre claire a n'importe quel endroit,
 * et sans lui le contraste n'est garanti nulle part.
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
      className={cn(
        "relative flex min-h-[100dvh] items-end overflow-hidden",
        // Accroche le haut du chapitre au defilement. En `proximity` (defini
        // sur le conteneur), le snap ne se declenche que si l'on s'en approche :
        // il rythme sans jamais confisquer le defilement dans la prose.
        "snap-start",
      )}
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

      <EditorialColumn size="wide" className="relative z-10 pb-20 lg:pb-28">
        {eyebrow && <p className="eyebrow mb-4 text-jgen-jaune">{eyebrow}</p>}

        <h2
          id={id ? `${id}-titre` : undefined}
          className="max-w-[18ch] text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </h2>

        {lead && (
          <RichText className="mt-6 max-w-[46ch] text-lg text-white/90">{lead}</RichText>
        )}

        {children}
      </EditorialColumn>
    </section>
  )
}

/**
 * Barre de chapitres collante.
 *
 * De simples liens d'ancrage : la navigation fonctionne sans JavaScript, reste
 * accessible au clavier, et chaque chapitre garde une URL partageable.
 */
export function MagazineNav({
  chapters,
}: {
  chapters: { id: string; label: string }[]
}) {
  return (
    <nav
      aria-label="Chapitres de la newsletter"
      className="sticky top-0 z-40 border-b border-jgen-plum/10 bg-white/95 backdrop-blur"
    >
      <EditorialColumn size="wide" className="!px-0">
        <ul className="flex list-none gap-6 overflow-x-auto px-5 py-3 text-sm sm:px-6">
          {chapters.map((chapter) => (
            <li key={chapter.id} className="shrink-0">
              <a
                href={`#${chapter.id}`}
                className="font-medium whitespace-nowrap text-jgen-plum underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jgen-rose"
              >
                {chapter.label}
              </a>
            </li>
          ))}
        </ul>
      </EditorialColumn>
    </nav>
  )
}
