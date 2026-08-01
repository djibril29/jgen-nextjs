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
 * Filet segmente tricolore. Il remplace le filet rose uni sous les titres :
 * trois couleurs de la palette au lieu d'une, c'est le meme trait mais il
 * signe la page au lieu de simplement souligner.
 */
export function TricolorRule({
  align = "left",
  className,
}: {
  align?: "left" | "center"
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-1 w-28 gap-1", align === "center" && "mx-auto", className)}
    >
      <span className="flex-[3] bg-jgen-jaune" />
      <span className="flex-[2] bg-jgen-vert" />
      <span className="flex-1 bg-jgen-rose" />
    </span>
  )
}

/**
 * Separateur entre deux chapitres d'un meme axe. Il marque une respiration la
 * ou deux blocs de prose se succederaient sans transition, sans introduire le
 * liseré gris pleine largeur que le reste de la page evite.
 *
 * Segments carres : le reste du site est a angles vifs (--radius: 0), une pastille
 * ronde y ferait tache.
 */
export function ChapterDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-1.5 py-12 lg:py-16", className)}
    >
      <span className="h-1 w-1.5 bg-jgen-vert" />
      <span className="h-1 w-6 bg-jgen-rose" />
      <span className="h-1 w-14 bg-jgen-jaune" />
      <span className="h-1 w-6 bg-jgen-vert" />
      <span className="h-1 w-1.5 bg-jgen-rose" />
    </div>
  )
}

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
 * Rend un paragraphe ecrit en texte suivi, ou les chiffres a mettre en valeur
 * sont marques entre doubles crochets :
 *
 *   "Nous avons forme [[68 jeunes filles]] a Kolda."
 *
 * Le contenu reste ainsi une simple chaine de caracteres dans le fichier de
 * contenu : l'equipe de J-GEN peut le modifier sans toucher a du JSX, et les
 * memes chaines restent utilisables ailleurs en retirant les marqueurs.
 */
export function RichText({ children, className }: { children: string; className?: string }) {
  const segments = children.split(/\[\[(.+?)\]\]/g)

  return (
    <p className={cn("mb-5 leading-relaxed text-gray-700 last:mb-0", className)}>
      {segments.map((segment, index) =>
        // Les index impairs sont les captures du groupe, donc les chiffres.
        index % 2 === 1 ? <KeyFigure key={index}>{segment}</KeyFigure> : segment,
      )}
    </p>
  )
}

/** Retire les marqueurs, pour les usages en texte brut (e-mail, resume). */
export function stripFigureMarkers(text: string): string {
  return text.replace(/\[\[(.+?)\]\]/g, "$1")
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
        <TricolorRule className="mt-3 w-24" />
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
