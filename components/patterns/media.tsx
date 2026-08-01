import type { ReactNode } from "react"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
import type { NewsletterMedia } from "@/content/newsletter-semestre-1-2026"
import { cn } from "@/lib/utils"

/**
 * Compositions image + texte.
 *
 * La page ne disposait que d'un seul geste : bandeau photo pleine largeur, puis
 * colonne de prose. Repete sept fois, il produit une page sans relief. Ces trois
 * primitives donnent les autres mesures de la partition : photo legendee, paire
 * de photos, photo cote a cote avec le texte.
 *
 * Aucune ne definit de marges verticales : c'est l'appelant qui rythme, sinon
 * deux compositions voisines cumulent leurs espacements.
 */

/**
 * Photo accompagnee de sa legende, portee par un bandeau plum sous l'image.
 *
 * La legende est sous la photo et non posee dessus : un bandeau translucide
 * masque toujours le bas du cadre, c'est-a-dire les visages des personnes
 * assises au premier rang sur la plupart des photos de terrain.
 */
export function CaptionedFigure({
  image,
  caption,
  ratio = "aspect-[4/3]",
  priority = false,
  sizes,
  className,
}: {
  image?: NewsletterMedia | { name: string; alt: string }
  caption?: string
  /** Classe de ratio Tailwind, ex. `aspect-[16/10]` */
  ratio?: string
  priority?: boolean
  sizes?: string
  className?: string
}) {
  return (
    <figure className={cn("flex flex-col", className)}>
      <NewsletterFigure
        image={image}
        priority={priority}
        sizes={sizes}
        className={cn("w-full", ratio)}
      />

      {caption && (
        <figcaption className="bg-jgen-plum px-5 py-3.5 text-sm leading-snug text-white/85">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * Deux photos legendees de front. Avec une seule entree, elle occupe toute la
 * largeur : c'est ce qui permet a l'appelant de passer `media` tel quel, sans
 * avoir a compter les visuels disponibles.
 */
export function FigurePair({
  items,
  className,
}: {
  items: NewsletterMedia[]
  className?: string
}) {
  if (items.length === 0) return null

  const isPair = items.length > 1

  return (
    <div className={cn("grid gap-5", isPair && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <CaptionedFigure
          key={item.name}
          image={item}
          caption={item.caption}
          ratio={isPair ? "aspect-[16/11]" : "aspect-[16/9]"}
          sizes={isPair ? "(max-width: 640px) 100vw, 45vw" : "(max-width: 1024px) 100vw, 60vw"}
        />
      ))}
    </div>
  )
}

/**
 * Photo et texte cote a cote, alignes sur leur milieu. `reverse` renvoie la
 * photo a droite : c'est ce qui evite que deux chapitres successifs se lisent
 * comme le meme gabarit.
 *
 * Sept colonnes sur douze pour l'image : a moitie-moitie, la photo ecrase le
 * texte qui l'accompagne, et la colonne de texte descend sous 40 caracteres.
 */
export function MediaSplit({
  image,
  caption,
  reverse = false,
  priority = false,
  children,
  className,
}: {
  image?: NewsletterMedia | { name: string; alt: string }
  caption?: string
  reverse?: boolean
  priority?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("grid items-center gap-8 lg:grid-cols-12 lg:gap-12", className)}>
      <div className={cn("lg:col-span-7", reverse && "lg:order-2")}>
        <CaptionedFigure
          image={image}
          caption={caption}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
      </div>

      <div className={cn("lg:col-span-5", reverse && "lg:order-1")}>{children}</div>
    </div>
  )
}
