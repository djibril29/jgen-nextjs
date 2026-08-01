import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Colonne editoriale unique.
 *
 * La page de reference ne juxtapose pas des bandes pleine largeur : elle fait
 * courir une seule colonne etroite du debut a la fin, et ce sont les aplats de
 * couleur qui ponctuent. Empiler des sections aux fonds alternes produit au
 * contraire l'effet de blocs — chaque bande se lit comme une boite.
 *
 * `prose` (46rem) est la largeur de lecture par defaut : au-dela, l'oeil perd
 * le debut de la ligne suivante. `wide` (60rem) est reserve aux grilles de
 * cartes et aux blocs image + texte qui etoufferaient dans 46rem.
 */
export function EditorialColumn({
  children,
  size = "prose",
  className,
}: {
  children: ReactNode
  size?: "prose" | "wide"
  className?: string
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6",
        size === "prose" ? "max-w-[46rem]" : "max-w-[60rem]",
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * Section de la narration. Pas de fond propre, pas de conteneur propre : elle
 * herite de la colonne. L'espacement vertical remplace la bande de couleur
 * comme moyen de separer.
 */
export function EditorialSection({
  id,
  title,
  titleId,
  children,
  className,
}: {
  id?: string
  title?: string
  titleId?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("scroll-mt-24 py-10 lg:py-14", className)}
    >
      {title && (
        <h2
          id={titleId}
          className="mb-6 text-3xl font-extrabold tracking-tight text-jgen-plum sm:text-4xl"
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}
