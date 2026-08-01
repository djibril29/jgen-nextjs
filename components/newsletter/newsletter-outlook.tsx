import { EditorialColumn } from "@/components/patterns/layout"
import { newsletterSemesterOne2026 as data } from "@/content/newsletter-semestre-1-2026"

/**
 * Enseignements tirés du semestre et perspectives pour la suite.
 *
 * Bande pleine largeur assumée : c'est un aplat de couleur, pas un cadre. Elle
 * marque la bascule entre le bilan et la suite. Le contenu reste malgré tout
 * dans la colonne editoriale, pour ne pas rompre l'alignement de la page.
 */
export function NewsletterOutlook() {
  const { lessons, perspectives, partners } = data

  return (
    <section
      id="enseignements"
      aria-labelledby="enseignements-titre"
      className="mt-10 bg-jgen-plum py-16 lg:py-20"
    >
      <EditorialColumn size="wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="enseignements-titre"
              className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Les enseignements
            </h2>
            <div className="mb-8 h-1 w-20 bg-jgen-jaune" aria-hidden="true" />
            {/* Glyphes de puce retires, structure de liste conservee. */}
            <ul className="list-none border-t border-white/15">
              {lessons.map((lesson, index) => (
                <li
                  key={index}
                  className="border-b border-white/15 py-3.5 text-base leading-relaxed text-white/90"
                >
                  {lesson}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2
              id="perspectives-titre"
              className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              Les perspectives
            </h2>
            <div className="mb-8 h-1 w-20 bg-jgen-vert" aria-hidden="true" />
            <ul className="list-none border-t border-white/15" aria-labelledby="perspectives-titre">
              {perspectives.map((perspective, index) => (
                <li
                  key={index}
                  className="border-b border-white/15 py-3.5 text-base leading-relaxed text-white/90"
                >
                  {perspective}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/20 pt-10">
          <h3 className="eyebrow mb-4 text-jgen-jaune">
            Partenaires cités dans les rapports du semestre
          </h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {partners.map((partner) => (
              <li key={partner} className="text-sm text-white/85">
                {partner}
              </li>
            ))}
          </ul>
        </div>
      </EditorialColumn>
    </section>
  )
}
