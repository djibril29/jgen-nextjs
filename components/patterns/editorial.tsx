import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Primitives editoriales J-GEN.
 *
 * Principe directeur : une boite doit etre un aplat de couleur, ou ne pas
 * exister. Un liseré gris sur fond blanc ne porte aucune information, il ne
 * fait que cloisonner — c'est ce qui donnait au site son effet de blocs.
 * Ici la couleur ne cadre pas le contenu, elle designe ce qui compte.
 */

/**
 * Couples fond / texte verifies au contraste WCAG. Le texte n'est jamais
 * choisi par l'appelant : c'est ce qui rend une combinaison illisible
 * impossible a ecrire.
 *
 *   jaune #ffd23f + plum  = 9.79  (AAA)
 *   vert  #00d4aa + plum  = 7.40  (AAA)
 *   plum  #3d1f47 + blanc = 14.14 (AAA)
 *
 * Le violet #8c80f7 est volontairement absent : 3.2 sur blanc et 4.4 sur plum,
 * il echoue au seuil AA de 4.5 et reste reserve aux formes decoratives.
 */
const TONES = {
  jaune: "bg-jgen-jaune text-jgen-plum",
  vert: "bg-jgen-vert text-jgen-plum",
  plum: "bg-jgen-plum text-white",
} as const

export type Tone = keyof typeof TONES

/**
 * Chiffre mis en valeur au fil d'un paragraphe : « Nous avons forme
 * <KeyFigure>68 jeunes filles</KeyFigure> a Kolda ».
 *
 * Le surlignage plutot que la couleur de texte n'est pas un choix
 * esthetique : le jaune de marque en couleur de texte sur blanc plafonne a
 * 1.44 de contraste, il serait illisible. Sur aplat, il monte a 9.79.
 */
export function KeyFigure({
  children,
  tone = "jaune",
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <mark
      className={cn(
        // box-decoration-clone : sans lui, un chiffre qui passe a la ligne
        // perd son fond sur le second fragment.
        "font-heading tnum mx-[0.08em] box-decoration-clone px-[0.28em] text-[1.12em] font-extrabold leading-tight",
        TONES[tone],
        className,
      )}
    >
      {children}
    </mark>
  )
}

/**
 * Enonce cle detache du texte courant, sur aplat pleine largeur. Remplace le
 * paragraphe encadre d'un liseré : ici l'aplat souligne au lieu d'enfermer.
 */
export function Callout({
  children,
  tone = "jaune",
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <aside
      className={cn(
        "my-10 px-6 py-6 text-lg font-bold leading-snug sm:px-9 sm:py-8 sm:text-xl",
        TONES[tone],
        className,
      )}
    >
      {children}
    </aside>
  )
}

/**
 * Donnee chiffree en vedette : chiffre geant, filet segmente tricolore,
 * libelle a droite.
 *
 * La classe `tnum` est indispensable des que la valeur est animee par un
 * compteur : sans chasse fixe, le « 1 » etant plus etroit que le « 8 », le
 * nombre tressaute lateralement pendant toute l'animation.
 */
export function StatBlock({
  value,
  label,
  className,
}: {
  value: ReactNode
  label: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-start gap-5", className)}>
      <div className="shrink-0">
        <span className="font-heading tnum block text-6xl font-extrabold leading-none text-jgen-plum sm:text-7xl">
          {value}
        </span>
        <span aria-hidden="true" className="mt-3 flex h-1 w-24 gap-1">
          <span className="flex-[3] bg-jgen-jaune" />
          <span className="flex-[2] bg-jgen-vert" />
          <span className="flex-1 bg-jgen-rose" />
        </span>
      </div>
      <p className="max-w-[22ch] pt-1 text-base leading-snug text-jgen-plum">{label}</p>
    </div>
  )
}

/**
 * Bloc de contenu qui assume sa boite parce qu'elle porte une couleur pleine.
 * A reserver aux contenus reellement autonomes ; le texte courant, lui, doit
 * couler directement sur la page.
 */
export function ColorCard({
  children,
  tone = "plum",
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return <div className={cn("p-7 sm:p-9", TONES[tone], className)}>{children}</div>
}
