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
  const { partners } = data

  return (
    <section
      id="partenaires"
      aria-labelledby="partenaires-titre"
      className="mt-10 bg-jgen-plum py-16 lg:py-20"
    >
      <EditorialColumn size="wide">
        <div>
          <h2 id="partenaires-titre" className="eyebrow mb-4 text-jgen-jaune">
            Partenaires cités dans les rapports du semestre
          </h2>
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
