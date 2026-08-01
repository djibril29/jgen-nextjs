/**
 * Crée l'article sur l'atelier de restitution du rapport alternatif Beijing +30.
 *
 * Utilisation :
 *   npx sanity exec scripts/create-beijing-30-article.ts --with-user-token
 *
 * SOURCE : publication Facebook de J-GEN Sénégal transmise par l'organisation,
 * complétée par la mention de l'atelier dans le rapport trimestriel T2 2026
 * (« Activités institutionnelles et de plaidoyer »), qui en situe la tenue au
 * deuxième trimestre 2026.
 *
 * La banderole photographiée sur place établit le lieu et le mois : l'atelier
 * s'est tenu à l'Hôtel Ndiambour, à Dakar, un mardi de juin 2026.
 *
 * ⚠️  Le QUANTIÈME exact reste masqué sur la photo. L'article dit donc
 * « en juin 2026 » sans donner de jour. Voir le point 8 de
 * content/verification-semestre-1-2026.md.
 *
 * L'article est créé en BROUILLON.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const SLUG = 'restitution-rapport-alternatif-beijing-30-senegal'

const document = {
  _type: 'post',
  title:
    "Beijing +30 : la société civile sénégalaise restitue son rapport alternatif sur les droits des femmes",
  slug: {_type: 'slug', current: SLUG},
  publishedAt: '2026-08-01T09:00:00.000Z',
  author: {_type: 'reference', _ref: '2e8bf1e0-8d86-415a-8c58-c04222f704e8'},
  // Rattaché au programme de plaidoyer institutionnel de J-GEN, qui porte la
  // réforme des politiques publiques en faveur des droits des femmes.
  program: {_type: 'reference', _ref: 'fc8b5b3f-19b6-4606-bf6b-345aa57ad508'},
  categories: [
    {_type: 'reference', _key: 'c0', _ref: 'bb1a7d4d-1f07-4ad4-976f-27ad65f7f29b'}, // Plaidoyer
    {_type: 'reference', _key: 'c1', _ref: '33447e91-37e2-4852-8834-7520682a1e9b'}, // Société civile
    {_type: 'reference', _key: 'c2', _ref: '0681b765-b017-45aa-91cd-796cd65ed05d'}, // Féminisme
  ],
  image: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-2188f406f543526a80e6e67e7773b4586523939a-1600x900-jpg',
    },
    alt: "Panel d'ouverture de l'atelier de restitution du rapport alternatif Beijing +30, à l'Hôtel Ndiambour à Dakar",
  },
  excerpt:
    "En juin 2026 à l'Hôtel Ndiambour de Dakar, J-GEN Sénégal a organisé la restitution du rapport alternatif de la société civile sur trente ans de mise en œuvre du Programme d'action de Beijing au Sénégal, autour de ses douze domaines critiques.",
  metaTitle: 'Beijing +30 : le rapport alternatif de la société civile',
  metaDescription:
    "En juin 2026 à Dakar, J-GEN Sénégal a restitué le rapport alternatif de la société civile sur trente ans de mise en œuvre du Programme d'action de Beijing : avancées, défis et recommandations.",
  keywords: [
    'Beijing +30 Sénégal',
    "Programme d'action de Beijing",
    'rapport alternatif société civile droits des femmes',
    'douze domaines critiques Beijing',
    'droits des femmes Sénégal 2026',
  ],
  body: [
    "Trente ans après la quatrième Conférence mondiale sur les femmes, tenue à Pékin en 1995, une question reste entière : que sont devenus les engagements pris alors ? C'est à cette question que la société civile sénégalaise a entrepris de répondre par elle-même, avec un rapport alternatif dont J-GEN Sénégal a organisé la restitution en juin 2026, à l'Hôtel Ndiambour de Dakar.",

    '## Pourquoi un rapport « alternatif »',
    "Un rapport alternatif est un rapport produit par les organisations de la société civile, en parallèle du rapport officiel remis par un État. Sa fonction n'est pas de contredire par principe, mais de rendre compte de ce que les institutions mesurent mal : l'écart entre un droit inscrit dans un texte et son effectivité dans la vie des femmes et des filles.",
    "C'est précisément l'objet du travail restitué lors de cet atelier : l'évaluation des avancées, des défis et des recommandations autour des douze domaines critiques du Programme d'action de Beijing.",

    '## Douze domaines critiques',
    "Le Programme d'action adopté en 1995 ne se limite pas à une déclaration de principe. Il identifie douze domaines critiques dans lesquels les États s'engagent à agir, de la pauvreté à l'éducation, de la santé aux violences, des conflits armés à l'économie, du pouvoir de décision aux droits fondamentaux, en passant par les médias, l'environnement et la petite fille.",
    "Cette structure fait la valeur de l'exercice : elle interdit de réduire les droits des femmes à un seul sujet, et oblige à examiner chaque champ séparément — y compris ceux dont on parle le moins.",

    '## Un exercice collectif, au-delà de la restitution',
    "La rencontre a réuni des actrices et acteurs clés de la société civile : organisations de femmes et féministes, organisations communautaires, mouvements citoyens, organisations de jeunes, mais aussi ministères sectoriels, institutions nationales, chercheur·e·s et partenaires techniques et financiers.",
    "Au-delà d'un simple exercice de restitution, cette journée a été un espace de dialogue, de mémoire militante et de co-construction. Elle a permis de croiser les regards entre générations de militantes, institutions publiques, communautés et partenaires engagés pour l'égalité et l'équité.",
    "La présence conjointe des organisations et des ministères sectoriels dans une même salle n'est pas un détail protocolaire. Elle transforme un document de plaidoyer en base de discussion partagée : une fois les constats énoncés devant celles et ceux qui conduisent les politiques publiques, ils cessent d'être une position extérieure.",

    '## Ce que le rapport établit',
    "Le rapport est revenu sur l'état des lieux des droits des femmes et des filles au Sénégal : les avancées enregistrées, les défis persistants, et surtout les recommandations nécessaires pour renforcer les politiques publiques nationales.",
    "Cette dernière dimension est celle qui engage la suite. Un état des lieux sans recommandations documente un problème ; des recommandations issues d'un état des lieux ouvrent une négociation.",

    '## Faire entrer les constats dans les politiques publiques',
    "L'ambition affichée est que les constats et recommandations issus de ce rapport inspirent l'action publique, nourrissent les réformes et contribuent à rendre les droits des femmes et des filles plus effectifs dans les institutions, les communautés, les familles et les écoles.",
    "Cette énumération dit quelque chose de la méthode. Les droits ne deviennent pas effectifs par le seul fait d'être reconnus au niveau national : ils le deviennent dans une école qui garde une adolescente scolarisée, dans une famille qui ne consent pas à un mariage précoce, dans un service public qui accueille une survivante sans la renvoyer chez elle.",

    '## Un travail appuyé par des partenaires',
    "L'atelier a été organisé par J-GEN Sénégal avec l'appui de ses partenaires techniques et financiers, en particulier la GIZ à travers le projet REDTRA et la Foundation for a Just Society.",

    '## Une échéance qui s\'inscrit dans une séquence plus large',
    "Cette restitution s'inscrit dans une année dense pour le plaidoyer féministe au Sénégal, marquée par la préparation des Assises nationales citoyennes sur les droits des femmes et des filles, annoncées du 25 au 27 novembre 2026, et par le plaidoyer pour la révision des dispositions discriminatoires du Code de la famille.",
    "Beijing +30 fournit à ces chantiers nationaux un cadre de référence internationalement reconnu, et une grille d'évaluation que les organisations peuvent opposer aux bilans officiels.",
  ].map((paragraph, index) => {
    const isHeading = paragraph.startsWith('## ')
    return {
      _type: 'block',
      _key: `b${index}`,
      style: isHeading ? 'h2' : 'normal',
      children: [
        {_type: 'span', _key: `b${index}s`, text: isHeading ? paragraph.slice(3) : paragraph},
      ],
    }
  }),
}

async function main() {
  const existing = await client.fetch<{_id: string} | null>(
    `*[_type == "post" && slug.current == $slug][0]{_id}`,
    {slug: SLUG},
  )

  const draftId = existing
    ? existing._id.startsWith('drafts.')
      ? existing._id
      : `drafts.${existing._id}`
    : `drafts.${crypto.randomUUID()}`

  await client.createOrReplace({...document, _id: draftId})

  console.log(`  ${existing ? '↻' : '+'} ${SLUG}`)
  console.log("\nL'article est en BROUILLON. Il lui manque le quantième exact de l'atelier.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
