import { TricolorRule } from "@/components/patterns/editorial"
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
      className="scroll-mt-32 bg-jgen-plum py-16 lg:py-20 xl:scroll-mt-44"
    >
      <EditorialColumn size="wide">
        <h2 id="partenaires-titre" className="eyebrow text-jgen-jaune">
          Partenaires cités dans les rapports du semestre
        </h2>

        <TricolorRule className="mt-5" />

        {/* Colonnes plutot qu'une ligne qui se replie : les noms d'associations
            depassent la demi-largeur, et cotes a cotes ils se lisaient comme une
            seule enumeration continue. */}
        <ul className="mt-8 grid list-none gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <li
              key={partner}
              className="border-t border-white/20 py-3.5 text-base leading-snug text-white/85"
            >
              {partner}
            </li>
          ))}
        </ul>
      </EditorialColumn>
    </section>
  )
}
