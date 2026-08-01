import Image from "next/image"

import type { NewsletterImageRef } from "@/content/newsletter-semestre-1-2026"
import { resolveNewsletterImage } from "@/lib/newsletter-image"
import { cn } from "@/lib/utils"

type NewsletterFigureProps = {
  image?: NewsletterImageRef
  /** Classes appliquées au conteneur (doit définir une hauteur ou un ratio) */
  className?: string
  /** `priority` pour l'image principale au-dessus de la ligne de flottaison */
  priority?: boolean
  sizes?: string
}

/**
 * Affiche le visuel s'il a été déposé dans public/newsletter/, sinon un bloc
 * décoratif aux couleurs de J-GEN.
 *
 * Le placeholder est un choix graphique assumé : il ne signale pas une image
 * manquante au visiteur et la page reste complète sans aucune photographie.
 */
export function NewsletterFigure({
  image,
  className,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: NewsletterFigureProps) {
  const resolved = image ? resolveNewsletterImage(image.name, image.alt) : undefined

  if (resolved) {
    return (
      <div className={cn("relative overflow-hidden bg-[#3d1f47]", className)}>
        <Image
          src={resolved.publicPath}
          alt={resolved.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-[#3d1f47] to-[#2d1537]",
        className,
      )}
      // Décoratif : aucune information n'est portée uniquement par ce bloc.
      aria-hidden="true"
    >
      <div className="absolute top-6 right-6 h-20 w-20 rotate-12 bg-[#ffd23f] opacity-40" />
      <div className="absolute bottom-8 left-8 h-14 w-14 -rotate-6 bg-[#00d4aa] opacity-40" />
      <div className="absolute bottom-16 right-16 h-10 w-10 rotate-45 bg-[#c61d4d] opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-heading text-4xl tracking-tight text-white/25 sm:text-5xl">
          J-GEN
        </span>
      </div>
    </div>
  )
}
