import { Callout, KeyFigure } from "@/components/patterns/editorial"
import { EditorialColumn } from "@/components/patterns/layout"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

export function NewsletterOrientations() {
  const { intro, orientations } = data

  return (
    <EditorialColumn>
      <section
        id="orientations"
        aria-labelledby="orientations-titre"
        className="scroll-mt-24 py-10 lg:py-14"
      >
        <h2
          id="orientations-titre"
          className="mb-3 text-3xl font-extrabold tracking-tight text-jgen-plum sm:text-4xl"
        >
          Six mois d&apos;engagement
        </h2>
        <div className="mb-6 h-1 w-20 bg-jgen-rose" aria-hidden="true" />

        {intro.web.slice(1).map((paragraph, index) => (
          <p key={index} className="mb-5 leading-relaxed text-gray-700 last:mb-0">
            {paragraph}
          </p>
        ))}

        {/* L'aplat ne cadre pas le contenu, il designe ce qui compte. Chiffre
            issu du tableau des indicateurs du premier trimestre : cible de
            2 000 personnes, 2 091 mobilisees. */}
        <Callout>
          Le 7 mars 2026 à Guédiawaye, <KeyFigure>2 091 personnes</KeyFigure> se sont réunies pour
          la Journée internationale des droits des femmes, autour du thème « Droits, justice,
          action pour toutes les femmes et les filles ».
        </Callout>

        <h3 className="mb-6 mt-12 text-xl font-bold text-jgen-plum">
          Les six orientations du semestre
        </h3>

        {/* Anciennes cartes blanches a filet vert : remplacees par des entrees
            separees d'un filet fin, qui coulent sur la page. */}
        <ul className="list-none border-t border-gray-200">
          {orientations.map((orientation) => (
            <li key={orientation.id} className="border-b border-gray-200 py-5">
              <h4 className="mb-1.5 text-lg font-bold text-jgen-plum">{orientation.title}</h4>
              <p className="text-base leading-relaxed text-gray-700">{orientation.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </EditorialColumn>
  )
}
