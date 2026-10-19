/**
 * Crée l'article sur la première étape des pré-assises nationales citoyennes
 * sur les droits des femmes et des filles : la région de Thiès (14-16 octobre 2026).
 *
 * Utilisation :
 *   npx sanity exec scripts/create-pre-assises-thies-article.ts --with-user-token
 *
 * SOURCES : publications Facebook de J-GEN Sénégal (Thiès, Tivaouane, Mbour,
 * Joal-Fadiouth), dépêche APS du 16 octobre 2026 (Tivaouane), article du Soleil
 * signé Mbaye Sarr Diakhaté (Thiès), reportages Thies24 et Seneweb TV.
 *
 * Les photos sont dans content/pre-assises-thies/. Sanity déduplique les
 * images par empreinte : relancer le script ne crée pas de doublons.
 *
 * L'article est créé en BROUILLON.
 */
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const SLUG = 'pre-assises-nationales-citoyennes-region-thies'
const PHOTOS = path.join(process.cwd(), 'content', 'pre-assises-thies')

const APS_URL =
  'https://aps.sn/a-tivaouane-j-gen-plaide-pour-une-meilleure-representation-des-femmes-dans-les-instances-de-decision/'
const THIES24_URL = 'https://www.youtube.com/watch?v=wGDBjSP_sOo'
const SENEWEB_URL = 'https://www.youtube.com/watch?v=cbLYVbPH58o'

type Photo = {file: string; alt: string; caption?: string}

// Le corps de l'article, dans l'ordre. Les liens s'écrivent [texte](url).
type Part =
  | {kind: 'p' | 'h2' | 'h3' | 'li' | 'note'; text: string}
  | {kind: 'img'; photo: Photo}
  | {kind: 'yt'; url: string; caption: string}

const p = (text: string): Part => ({kind: 'p', text})
const h2 = (text: string): Part => ({kind: 'h2', text})
const h3 = (text: string): Part => ({kind: 'h3', text})
const li = (text: string): Part => ({kind: 'li', text})
const note = (text: string): Part => ({kind: 'note', text})
const img = (file: string, alt: string, caption?: string): Part => ({kind: 'img', photo: {file, alt, caption}})
const yt = (url: string, caption: string): Part => ({kind: 'yt', url, caption})

const COVER: Photo = {
  file: 'thies-departementale-couverture.jpg',
  alt: 'Participantes de la rencontre départementale des pré-assises à Thiès, jeunes filles et aînées assises côte à côte',
}

const body: Part[] = [
  h2('Le contexte : 46 départements, une seule question'),
  p(
    "Comment protéger durablement les femmes et les filles au Sénégal contre les violences, les discriminations et l'exclusion des lieux où se prennent les décisions ? Les assises nationales citoyennes sur les droits des femmes et des filles veulent poser cette question à tout le pays, jusque dans les communes les plus éloignées de Dakar.",
  ),
  p(
    "Pour y parvenir, J-GEN Sénégal mène des pré-assises dans les 14 régions et les 46 départements. Chaque étape suit le même schéma. Une réunion régionale d'abord, puis des rencontres départementales qui réunissent les autorités administratives, les services de l'État, les élus locaux et les forces vives de la société civile. L'approche se veut systémique. Pour faire reculer les violences faites aux femmes, l'administration, les collectivités et les communautés doivent avancer ensemble.",
  ),
  p(
    "Lors de la rencontre de Tivaouane, la sociologue Selly Ba, consultante de J-GEN, a présenté l'architecture de cette tournée. Elle comprend des pôles régionaux, des superviseurs, des points focaux départementaux et un mécanisme de suivi pour collecter des informations fiables sur le terrain.",
  ),
  note(`[Voir l'article de l'APS](${APS_URL})`),
  yt(
    SENEWEB_URL,
    'Lois et règlements discriminatoires : vers les 1ères Assises nationales citoyennes. Reportage de Seneweb TV.',
  ),
  img(
    'thies-regionale-points-focaux.jpg',
    "Une intervenante prend la parole au micro devant les points focaux, sous la banderole de la réunion d'information",
    "Thiès. Réunion régionale d'information des points focaux pour les assises nationales citoyennes.",
  ),
  p('Pour tout savoir sur la démarche, consultez notre page [Assises nationales citoyennes](/assises).'),

  h2('La mobilisation : quatre étapes en trois jours'),
  h3('Thiès, 14 octobre : la réunion régionale et la rencontre départementale'),
  p(
    "La tournée a commencé dans la capitale régionale. La réunion régionale a réuni les acteurs locaux, la cheffe du bureau de la Direction de la Famille de Thiès et celle de Mbour, ainsi que les organisations de la société civile. Le même jour, le département de Thiès a tenu sa propre rencontre. Rokhaya Sambou, cheffe du service départemental de la Famille et représentante du préfet, y a salué une approche ancrée dans les territoires. Mener les pré-assises au plus près des réalités locales permet, selon elle, de « garantir que la voix de la jeune fille, de la femme rurale ou de la femme en situation de handicap soit entendue au même titre que celle des résidentes des grandes villes ».",
  ),
  yt(THIES24_URL, 'Thiès : pré-assises citoyennes sur les droits des femmes et des filles. Reportage de Thies24.'),
  img(
    'thies-departementale-salle.jpg',
    'Salle comble de femmes de tous âges, foulards colorés, attentives pendant la rencontre de Thiès',
    "Thiès. Une salle comble pour la rencontre d'information.",
  ),

  h3("Tivaouane, 15 octobre : l'engagement au cœur de la cité de Maodo"),
  p(
    "À la Maison de la jeunesse et de la citoyenneté, les actrices et acteurs de la société civile, l'administration territoriale et la cheffe du bureau de la Direction de la Famille se sont réunis. Dans la cité religieuse, le dialogue et la cohésion ont donné le ton des échanges.",
  ),
  note(`[Voir l'article de l'APS](${APS_URL})`),
  img(
    'tivaouane-salle.jpg',
    'Participantes vêtues de blanc qui applaudissent dans un auditorium aux sièges rouges à Tivaouane',
    'Tivaouane. Les participantes applaudissent lors de la rencontre départementale.',
  ),

  h3('Mbour, 16 octobre : les autorités au rendez-vous sur la Petite Côte'),
  p(
    "À Mbour, la session d'information s'est tenue en présence du préfet, du maire et des services techniques, aux côtés de la cheffe du service départemental de la Famille. Les associations de la société civile y ont porté la voix de leurs communautés.",
  ),
  img(
    'mbour-table-officielle.jpg',
    'Autorités administratives et organisatrices debout derrière la table officielle, devant la banderole des pré-assises à Mbour',
    'Mbour. Les autorités et les organisatrices autour de la table officielle.',
  ),

  h3("Joal-Fadiouth, 16 octobre : les forces vives au Royaume de l'Enfance"),
  p(
    "Le même jour, Joal-Fadiouth a pris le relais. Sur cette terre d'histoire, les organisations de femmes et la société civile ont répondu présentes en nombre. La rencontre a réuni les services de l'État, la municipalité et les acteurs du développement local.",
  ),
  img(
    'joal-photo-de-groupe.jpg',
    "Maimouna Astou Yade, en tenue noire et orange, entourée des participantes derrière la table officielle à Joal-Fadiouth",
    'Joal-Fadiouth. Maimouna Astou Yade, directrice exécutive de J-GEN Sénégal, entourée des participantes.',
  ),
  img(
    'joal-prise-de-parole.jpg',
    'Un intervenant prend la parole au micro à côté de la table officielle, devant le kakémono de J-GEN',
    'Joal-Fadiouth. Prise de parole pendant la rencontre.',
  ),

  h2("L'objectif : former celles et ceux qui porteront les pré-assises"),
  p(
    'Ces rencontres servent à former les points focaux et les personnes ressources des comités départementaux de pilotage. Ce sont ces personnes qui organiseront les consultations dans leur département, recueilleront la parole des femmes et des filles et feront remonter les données.',
  ),
  p(
    "La directrice exécutive de J-GEN Sénégal, Maimouna Astou Yade, a donné le cap. Elle a plaidé pour une meilleure représentation des femmes dans les instances de décision et pour une prise en compte accrue de leurs droits dans les politiques publiques. Elle a invité les acteurs à dépasser les clivages politiques au profit du dialogue et de l'intérêt général. Elle a salué les avancées obtenues depuis l'indépendance, tout en rappelant que la question des droits des femmes et des filles « reste évolutive et fait face à de nombreux défis ». Abordant les violences conjugales qui mènent à la mort, elle a rappelé que « toute vie est sacrée et mérite d'être protégée ».",
  ),
  img(
    'thies-regionale-participantes.jpg',
    'Points focaux et personnes ressources assises autour de la table de travail pendant la réunion régionale de Thiès',
    'Thiès. Points focaux et personnes ressources en séance de travail.',
  ),

  h2('Les prochaines étapes'),
  p(
    'La tournée a franchi sa première étape avec la région de Thiès et ses départements. Les autres régions suivront selon le même schéma : une réunion régionale, puis des rencontres départementales. Les données recueillies par les points focaux alimenteront des rapports réguliers. Elles permettront de recenser les difficultés rencontrées sur le terrain et de formuler des recommandations adaptées aux réalités locales. Le tout convergera vers les pré-assises nationales prévues en mars 2027.',
  ),
  p('La presse écrite a elle aussi relayé le lancement de la tournée.'),
  img(
    'le-soleil-coupure.jpg',
    "Coupure de presse du journal Le Soleil titrée « J-Gen Sénégal lance ses pré-assises à Thiès »",
    '« J-Gen Sénégal lance ses pré-assises à Thiès… », Le Soleil. Article de Mbaye Sarr Diakhaté, correspondant à Thiès.',
  ),

  h3('Dans la presse'),
  li(`APS : [À Tivaouane, J-GEN plaide pour une meilleure représentation des femmes dans les instances de décision](${APS_URL})`),
  li(`Thies24 : [Thiès / Pré-assises citoyennes sur les droits des femmes et des filles](${THIES24_URL})`),
  li(`Seneweb TV : [Lois et règlements discriminatoires : vers les 1ères Assises nationales citoyennes](${SENEWEB_URL})`),
]

const document = {
  _type: 'post',
  title: 'Pré-assises nationales citoyennes : la région de Thiès ouvre la marche',
  slug: {_type: 'slug', current: SLUG},
  publishedAt: '2026-10-19T09:00:00.000Z',
  featured: true,
  author: {_type: 'reference', _ref: '2e8bf1e0-8d86-415a-8c58-c04222f704e8'}, // J-GEN Sénégal
  categories: [
    {_type: 'reference', _key: 'c0', _ref: 'bb1a7d4d-1f07-4ad4-976f-27ad65f7f29b'}, // Plaidoyer
    {_type: 'reference', _key: 'c1', _ref: '33447e91-37e2-4852-8834-7520682a1e9b'}, // Société civile
    {_type: 'reference', _key: 'c2', _ref: 'a9b6fb35-3ff6-48d6-980a-5ed98ac60694'}, // Gouvernance locale
  ],
  excerpt:
    'Du 14 au 16 octobre 2026, J-GEN Sénégal a lancé à Thiès, Tivaouane, Mbour et Joal-Fadiouth la tournée des pré-assises nationales citoyennes sur les droits des femmes et des filles. Cette tournée doit couvrir les 46 départements du pays.',
  metaTitle: 'Pré-assises citoyennes : la région de Thiès ouvre la marche',
  metaDescription:
    'Thiès, Tivaouane, Mbour, Joal-Fadiouth : J-GEN Sénégal lance la tournée des pré-assises nationales citoyennes sur les droits des femmes et des filles.',
  keywords: [
    'pré-assises nationales citoyennes',
    'assises nationales droits des femmes Sénégal',
    'J-GEN Sénégal Thiès',
    'droits des femmes et des filles Sénégal',
    'violences basées sur le genre Sénégal',
  ],
}

// --- Conversion en Portable Text -------------------------------------------

let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36)}`

function spans(text: string, extraMarks: string[] = []) {
  const markDefs: {_type: 'link'; _key: string; href: string}[] = []
  const children: {_type: 'span'; _key: string; text: string; marks: string[]}[] = []
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  for (const match of text.matchAll(pattern)) {
    if (match.index! > last) {
      children.push({_type: 'span', _key: key(), text: text.slice(last, match.index), marks: extraMarks})
    }
    const linkKey = key()
    markDefs.push({_type: 'link', _key: linkKey, href: match[2]})
    children.push({_type: 'span', _key: key(), text: match[1], marks: [...extraMarks, linkKey]})
    last = match.index! + match[0].length
  }
  if (last < text.length) {
    children.push({_type: 'span', _key: key(), text: text.slice(last), marks: extraMarks})
  }
  return {children, markDefs}
}

async function uploadPhoto(photo: Photo) {
  const asset = await client.assets.upload('image', fs.createReadStream(path.join(PHOTOS, photo.file)), {
    filename: photo.file,
  })
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
    alt: photo.alt,
    ...(photo.caption ? {caption: photo.caption} : {}),
  }
}

async function toPortableText(parts: Part[]) {
  const blocks = []
  for (const part of parts) {
    if (part.kind === 'img') {
      blocks.push({_key: key(), ...(await uploadPhoto(part.photo))})
    } else if (part.kind === 'yt') {
      blocks.push({_type: 'youtube', _key: key(), url: part.url, caption: part.caption})
    } else {
      const style = part.kind === 'h2' || part.kind === 'h3' ? part.kind : 'normal'
      const marks = part.kind === 'note' ? ['em'] : []
      blocks.push({
        _type: 'block',
        _key: key(),
        style,
        ...(part.kind === 'li' ? {listItem: 'bullet', level: 1} : {}),
        ...spans(part.text, marks),
      })
    }
  }
  return blocks
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

  const image = await uploadPhoto(COVER)

  await client.createOrReplace({...document, _id: draftId, image, body: await toPortableText(body)})

  console.log(`  ${existing ? '↻' : '+'} ${SLUG} (${draftId})`)

  // À la une : slide du carrousel d'accueil, placé en tête (ordre 5).
  // Référence faible tant que l'article n'est pas publié, comme le fait le Studio.
  await client.createOrReplace({
    _id: 'drafts.hero-pre-assises-thies',
    _type: 'heroSlide',
    internalName: 'Pré-assises nationales citoyennes — région de Thiès',
    slideType: 'linked',
    linkedDocument: {
      _type: 'reference',
      _ref: draftId.replace(/^drafts\./, ''),
      _weak: true,
      _strengthenOnPublish: {type: 'post'},
    },
    order: 5,
    isActive: true,
  })

  console.log('  + slide « À la une » (drafts.hero-pre-assises-thies)')
  console.log("\nL'article et le slide sont en BROUILLON : publier l'article d'abord, puis le slide, depuis /studio.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
