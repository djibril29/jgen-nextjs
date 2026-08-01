import { Calendar, MapPin } from "lucide-react"

import { NewsletterFigure } from "@/components/newsletter/newsletter-figure"
import { TricolorRule } from "@/components/patterns/editorial"
import { EditorialColumn } from "@/components/patterns/layout"
import { MediaSplit } from "@/components/patterns/media"
import {
  newsletterSemesterOne2026 as data,
  type NewsletterHighlight,
} from "@/content/newsletter-semestre-1-2026"
import { resolveNewsletterImage } from "@/lib/newsletter-image"

/** Date et lieu, quand les rapports les etablissent. */
function HighlightMeta({
  highlight,
  tone,
}: {
  highlight: NewsletterHighlight
  tone: "sur-blanc" | "sur-plum"
}) {
  if (!highlight.date && !highlight.place) return null

  const textClass = tone === "sur-plum" ? "text-white/75" : "text-gray-600"

  return (
    <p className={`flex flex-wrap items-center gap-x-5 gap-y-1 text-sm ${textClass}`}>
      {highlight.date && (
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-jgen-rose" aria-hidden="true" />
          {highlight.date}
        </span>
      )}
      {highlight.place && (
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-jgen-rose" aria-hidden="true" />
          {highlight.place}
        </span>
      )}
    </p>
  )
}

/**
 * Temps fort de tete : photo et texte cote a cote.
 *
 * Le 8 mars est le seul temps fort a reunir un visuel, une date, un lieu et
 * cinq precisions : le traiter comme les deux autres, dans une carte d'un tiers
 * de page, revenait a tasser le fait le plus documente du semestre.
 */
function FeaturedHighlight({ highlight }: { highlight: NewsletterHighlight }) {
  const caption = [highlight.date, highlight.place].filter(Boolean).join(" — ")

  return (
    <article
      id={highlight.id}
      aria-labelledby={`${highlight.id}-titre`}
      className="scroll-mt-32 xl:scroll-mt-44"
    >
      <MediaSplit image={highlight.image} caption={caption || undefined}>
        <h3
          id={`${highlight.id}-titre`}
          className="text-2xl font-extrabold tracking-tight text-jgen-plum sm:text-3xl"
        >
          {highlight.title}
        </h3>

        <div className="mt-4">
          <HighlightMeta highlight={highlight} tone="sur-blanc" />
        </div>

        <p className="mt-5 text-lg leading-relaxed text-gray-700">{highlight.body}</p>

        {highlight.details && highlight.details.length > 0 && (
          <ul className="mt-6 list-none border-t border-gray-200">
            {highlight.details.map((detail, index) => (
              <li
                key={index}
                className="border-b border-gray-200 py-2.5 text-sm leading-relaxed text-gray-700"
              >
                {detail}
              </li>
            ))}
          </ul>
        )}
      </MediaSplit>
    </article>
  )
}

/**
 * Temps fort en carte. La photo n'apparait que si le fichier existe : un visuel
 * de remplacement en tete de carte se lit comme une image cassee, alors que la
 * carte tient parfaitement sur son seul aplat.
 */
function HighlightCard({ highlight }: { highlight: NewsletterHighlight }) {
  const photo = highlight.image
    ? resolveNewsletterImage(highlight.image.name, highlight.image.alt)
    : undefined

  return (
    <article
      id={highlight.id}
      aria-labelledby={`${highlight.id}-titre`}
      className="flex h-full scroll-mt-32 flex-col xl:scroll-mt-44"
    >
      {photo && (
        <NewsletterFigure
          image={highlight.image}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="aspect-[16/9] w-full"
        />
      )}

      {/* Aplat plein plutot que boite blanche cerclee de gris : la couleur porte
          la carte, aucun liseré n'est necessaire. Blanc sur plum = 14.14 de
          contraste. */}
      <div className="flex flex-1 flex-col bg-jgen-plum p-6 text-white sm:p-7">
        <h3 id={`${highlight.id}-titre`} className="mb-4 text-xl font-bold text-white">
          {highlight.title}
        </h3>

        <div className="mb-4">
          <HighlightMeta highlight={highlight} tone="sur-plum" />
        </div>

        <p className="text-base leading-relaxed text-white/90">{highlight.body}</p>

        {/* Puces remplacees par des lignes separees d'un filet fin. */}
        {highlight.details && highlight.details.length > 0 && (
          <ul className="mt-6 list-none border-t border-white/20 pt-4">
            {highlight.details.map((detail, index) => (
              <li
                key={index}
                className="border-b border-white/10 py-2 text-sm leading-relaxed text-white/80 last:border-b-0 last:pb-0"
              >
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export function NewsletterHighlights() {
  const { highlights } = data
  const [featured, ...others] = highlights

  return (
    <section
      id="temps-forts"
      aria-labelledby="temps-forts-titre"
      className="scroll-mt-32 py-14 lg:py-20 xl:scroll-mt-44"
    >
      <EditorialColumn size="wide">
        <div className="mb-14 text-center lg:mb-16">
          <p className="eyebrow mb-4 text-jgen-rose">Hors des programmes</p>
          <h2
            id="temps-forts-titre"
            className="mx-auto max-w-[24ch] text-3xl font-extrabold tracking-tight text-balance text-jgen-plum sm:text-4xl lg:text-5xl"
          >
            Les temps forts du semestre
          </h2>
          <TricolorRule align="center" className="mt-7" />
        </div>

        {featured && <FeaturedHighlight highlight={featured} />}

        {/* Deux colonnes plutot que trois : dans une colonne editoriale, une
            grille de trois cartes redevient une rangee de blocs serres. */}
        {others.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
            {others.map((highlight) => (
              <HighlightCard key={highlight.id} highlight={highlight} />
            ))}
          </div>
        )}
      </EditorialColumn>
    </section>
  )
}
