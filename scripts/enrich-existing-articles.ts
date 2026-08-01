/**
 * Enrichit les articles déjà publiés qui recoupent le semestre 1 2026.
 *
 * Utilisation :
 *   npx sanity exec scripts/enrich-existing-articles.ts --with-user-token
 *
 * Principe : on ne recrée rien et on ne supprime rien. Les URL existantes ont de
 * l'ancienneté, et rafraîchir une page indexée vaut mieux que d'en publier une
 * nouvelle sur le même sujet — qui entrerait en concurrence avec elle.
 *
 * Chaque article reçoit :
 *  - son rattachement au programme concerné ;
 *  - ses champs de référencement (titre, description, mots-clés) ;
 *  - le cas échéant, des paragraphes supplémentaires tirés des rapports.
 *
 * Les modifications sont écrites dans le BROUILLON : la version en ligne reste
 * inchangée jusqu'à publication manuelle depuis le Studio.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const PROGRAM_KIIRAY = '4afe64ef-dc08-4997-b272-8826845e8581'
const PROGRAM_NAATAL = 'fc8b5b3f-19b6-4606-bf6b-345aa57ad508'
const PROGRAM_JVSSR = '9b8f885f-da6d-4523-98aa-a3de74ef7e4c'

/** KIIRAY n'existe encore qu'en brouillon : la référence doit être faible. */
const DRAFT_ONLY = new Set([PROGRAM_KIIRAY])

type Enrichment = {
  id: string
  label: string
  program: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  excerpt?: string
  image?: {asset: string; alt: string}
  /** Paragraphes ajoutés à la fin du corps. « ## » produit un titre de niveau 2. */
  append?: string[]
}

const enrichments: Enrichment[] = [
  {
    id: 'dc48fd62-584e-4dbf-9abb-98b931271840',
    label: 'Journée internationale des droits des femmes 2026',
    program: PROGRAM_KIIRAY,
    metaTitle: '8 mars 2026 à Guédiawaye : 2 091 personnes mobilisées',
    metaDescription:
      "Sous le thème « Droits, justice, action pour toutes les femmes et les filles », la célébration du 7 mars 2026 à Guédiawaye a réuni 2 091 participantes et participants.",
    keywords: [
      'journée internationale des droits des femmes 2026 Sénégal',
      '8 mars Guédiawaye',
      'reconnaissance juridique du féminicide',
      'mobilisation droits des femmes Sénégal',
      'Luy Jot Jot Na',
    ],
    excerpt:
      "Le 7 mars 2026 à Guédiawaye, J-GEN Sénégal a réuni 2 091 participantes et participants sous le thème « Droits, justice, action pour toutes les femmes et les filles ». La cérémonie s'est close par la lecture d'un mémorandum réclamant la reconnaissance juridique du féminicide.",
    image: {
      asset: 'image-9b3def0ebfa70be4de9057525bb82b9963977d6c-1600x900-jpg',
      alt: "Rassemblement de la Journée internationale des droits des femmes, le 7 mars 2026 à Guédiawaye",
    },
    append: [
      '## Ce que la journée du 7 mars 2026 a produit',
      "La célébration s'est tenue le 7 mars 2026 à Guédiawaye. Elle a réuni 2 091 participantes et participants, pour une cible initiale de 2 000, parmi lesquels des autorités locales, des leaders communautaires et des organisations de la société civile.",
      "Les discours ont rappelé l'importance historique et symbolique de cette journée, en référence notamment aux femmes de Nder. Les intervenantes et intervenants ont insisté sur les défis persistants : les violences basées sur le genre, les féminicides, les discriminations et le manque d'autonomisation économique des femmes.",
      "Les autorités locales, les représentants communautaires et les partenaires ont plaidé pour une meilleure protection juridique et sociale des femmes. Les prises de parole ont également souligné le rôle de l'éducation, de la participation politique et de l'engagement des jeunes filles dans le développement du Sénégal.",
      "Une prestation artistique du groupe « L'Espoir de la Banlieue » a porté auprès du public des messages de sensibilisation sur les violences faites aux femmes. La Directrice exécutive de J-GEN Sénégal a appelé à des réformes courageuses pour renforcer les droits des femmes et lutter contre les inégalités persistantes.",
      "La cérémonie s'est close par la lecture d'un mémorandum réaffirmant les revendications des organisations de défense des droits des femmes, en particulier la reconnaissance juridique du féminicide et le renforcement des mécanismes de protection et d'accès à la justice.",
    ],
  },
  {
    id: '7143eba3-3093-49f6-a943-b0b7853ff407',
    label: 'KIIRAY — lancement du programme',
    program: PROGRAM_KIIRAY,
    metaTitle: 'KIIRAY : lancement du programme contre les VBG au Sénégal',
    metaDescription:
      "Lancé les 29 et 30 janvier 2026 à Diamaguène Sicap Mbao, le programme KIIRAY renforce la résilience communautaire et institutionnelle contre les violences basées sur le genre.",
    keywords: [
      'programme KIIRAY',
      'résilience communautaire VBG Sénégal',
      'lancement programme Diamaguène Sicap Mbao',
      'gouvernance sensible au genre',
      'budget sensible au genre commune',
    ],
    append: [
      '## La suite du programme au premier semestre 2026',
      "Après les lancements officiels, des diagnostics participatifs ont été réalisés dans les différentes communes afin d'identifier les principaux défis et besoins des populations : violences basées sur le genre, autonomisation économique des femmes, accès aux services sociaux et participation citoyenne.",
      "Ces travaux ont abouti à l'élaboration de trois plans d'action locaux, à Fatick, à Diamaguène Sicap Mbao et à Yoff. Élaborés et budgétisés, ils servent désormais de feuilles de route à la mise en œuvre des activités du programme.",
      "Au deuxième trimestre 2026, le programme a organisé un atelier national de renforcement des capacités et de plaidoyer consacré au rôle des Bajenu Gox dans la prévention et la prise en charge des violences basées sur le genre, suivi d'un atelier de validation de leur plan d'action qui a permis de consolider une feuille de route commune.",
      "Des dialogues intergénérationnels ont par ailleurs été organisés dans les communes de Biscuiterie/Grand-Dakar et de Ouakam/Sacré-Cœur, favorisant le dialogue entre les générations sur les violences sexuelles et sexistes et sensibilisant les communautés aux moyens de prévention et de protection.",
      "Le bilan du semestre identifie un point à renforcer : la synergie entre les acteurs communautaires et les services techniques des collectivités territoriales.",
    ],
  },
  {
    id: 'c7012970-21ca-46ec-84f4-49235fe67a40',
    label: 'Code de la famille — plaidoyer',
    program: PROGRAM_NAATAL,
    metaTitle: 'Code de la famille sénégalais : pourquoi le réformer',
    metaDescription:
      "Adopté en 1972, le Code de la famille sénégalais ne reflète plus les réalités sociales et économiques du pays. État du plaidoyer porté par J-GEN Sénégal pour sa révision.",
    keywords: [
      'Code de la famille sénégalais',
      'réforme Code de la famille 1972',
      'dispositions discriminatoires droits des femmes',
      'plaidoyer juridique Sénégal',
      'Naatal Jaboot Gui',
    ],
    append: [
      '## Où en est le plaidoyer en 2026',
      "Ce plaidoyer est porté par le programme Naatal Jaboot Gui, financé par l'African Women's Development Fund et mis en œuvre dans les régions de Dakar et de Thiès. Il vise à créer un cadre de dialogue entre les parlementaires et les communautés, et à promouvoir un engagement parlementaire en faveur de la révision des dispositions discriminatoires du Code de la famille.",
      "Une réunion d'orientation s'est tenue les 16 et 17 mars 2026 à Sama Hôtel, aux Almadies, pour préparer les Assises nationales citoyennes sur les droits des femmes et des filles, annoncées du 25 au 27 novembre 2026. Elle a défini les orientations stratégiques, organisationnelles et méthodologiques du processus.",
      "Les participants ont validé la mise en place d'un Comité technique chargé de l'orientation scientifique et d'un Comité de pilotage responsable de la coordination opérationnelle et des pré-assises régionales. Huit thématiques structureront les consultations : l'accès aux ressources, les réformes juridiques, l'autonomisation économique, la santé, le leadership, les violences basées sur le genre, la famille et la justice climatique.",
      "Les acteurs communautaires du programme KIIRAY ont pour leur part identifié quatre dispositions dont ils demandent la révision : l'âge légal du mariage pour les filles, l'autorité parentale, le refus de paternité et le choix du domicile conjugal, généralement attribué à l'époux.",
    ],
  },
  {
    id: 'dd670389-c7a7-4ed4-840d-6127bbc57b0b',
    label: 'JVSSR — protocole d\'accord avec la mairie de Yoff',
    program: PROGRAM_JVSSR,
    metaTitle: "JVSSR : protocole d'accord signé avec la mairie de Yoff",
    metaDescription:
      "J-GEN Sénégal et la mairie de Yoff ont signé un protocole d'accord dans le cadre du projet Jeunes Volontaires pour la Santé Sexuelle et Reproductive, financé par Speak Up Africa.",
    keywords: [
      'projet JVSSR Yoff',
      'santé sexuelle et reproductive adolescents Sénégal',
      'Speak Up Africa Voix Essentielles',
      'protocole accord mairie de Yoff',
      'jeunes volontaires santé reproductive',
    ],
    append: [
      '## Ce que la deuxième phase a produit en 2026',
      "Le projet est entré dans sa deuxième phase, qui vise à consolider les acquis des interventions précédentes et à renforcer la pérennité des mécanismes communautaires en faveur des adolescentes et des jeunes femmes, avec l'appui de la municipalité de Yoff et des Badienou Gox.",
      "Au premier trimestre 2026, les activités ont porté sur la planification et la budgétisation, avec la validation du plan d'action auprès du bailleur, puis sur le lancement du recrutement d'un consultant chargé d'une étude de base sur les perceptions des populations.",
      "Au deuxième trimestre, cette étude sur les perceptions de la communauté de Yoff en matière de droits en santé sexuelle et reproductive et de violences basées sur le genre a été réalisée, et ses résultats restitués à l'ensemble des parties prenantes.",
      "Deux cercles de sororité ont ensuite été organisés dans les quartiers de Ndenatte et de Therme Nord. Les participantes y ont renforcé leurs connaissances sur la citoyenneté active, les notions de genre et de sexe, les droits fondamentaux et les formes de violences basées sur le genre, et ont identifié les défis auxquels elles font face : mariages précoces et forcés, abandons scolaires, violences conjugales, psychologiques, verbales et économiques, normes sociales discriminatoires.",
    ],
  },
]

function toBlocks(paragraphs: string[], keyPrefix: string) {
  return paragraphs.map((paragraph, index) => {
    const isHeading = paragraph.startsWith('## ')
    const text = isHeading ? paragraph.slice(3) : paragraph
    return {
      _type: 'block',
      _key: `${keyPrefix}${index}`,
      style: isHeading ? 'h2' : 'normal',
      children: [{_type: 'span', _key: `${keyPrefix}${index}s`, text}],
    }
  })
}

async function main() {
  for (const enrichment of enrichments) {
    const published = await client.getDocument(enrichment.id)

    if (!published) {
      console.warn(`  ! ${enrichment.label} — document introuvable, ignoré`)
      continue
    }

    const draftId = `drafts.${enrichment.id}`

    // On travaille sur le brouillon : la version en ligne n'est pas touchée.
    await client.createIfNotExists({...published, _id: draftId})

    const draft = await client.getDocument(draftId)
    const existingBody: any[] = draft?.body ?? []

    // Un seul h1 par page : celui du titre. Un h1 dans le corps crée une
    // hiérarchie de titres ambiguë pour les moteurs et les lecteurs d'écran.
    const normalisedBody = existingBody.map((block) =>
      block?._type === 'block' && block.style === 'h1' ? {...block, style: 'h2'} : block,
    )

    // On n'ajoute les paragraphes qu'une fois, même si le script est relancé.
    const alreadyAppended = normalisedBody.some((block: any) =>
      typeof block?._key === 'string' && block._key.startsWith('sem2026-'),
    )

    const body = alreadyAppended
      ? normalisedBody
      : [...normalisedBody, ...toBlocks(enrichment.append ?? [], 'sem2026-')]

    await client
      .patch(draftId)
      .set({
        body,
        metaTitle: enrichment.metaTitle,
        metaDescription: enrichment.metaDescription,
        keywords: enrichment.keywords,
        program: {
          _type: 'reference',
          _ref: enrichment.program,
          ...(DRAFT_ONLY.has(enrichment.program) ? {_weak: true} : {}),
        },
        ...(enrichment.excerpt ? {excerpt: enrichment.excerpt} : {}),
        ...(enrichment.image
          ? {
              image: {
                _type: 'image',
                asset: {_type: 'reference', _ref: enrichment.image.asset},
                alt: enrichment.image.alt,
              },
            }
          : {}),
      })
      .commit()

    console.log(`  ↻ ${enrichment.label}${alreadyAppended ? ' (paragraphes déjà présents)' : ''}`)
  }

  console.log('\nTerminé. Les modifications sont en BROUILLON ; la version en ligne est inchangée.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
