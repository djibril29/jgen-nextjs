/**
 * Crée les articles du semestre 1 2026 dans Sanity, en BROUILLON.
 *
 * Utilisation :
 *   npx sanity exec scripts/create-semester-articles.ts --with-user-token
 *
 * Tous les contenus sont tirés des deux rapports trimestriels de J-GEN Sénégal
 * (T1 janvier-mars 2026, T2 avril-juin 2026). Rien n'est inventé : lorsqu'un
 * rapport ne permet pas d'établir un fait, l'article ne le mentionne pas et le
 * point part dans la liste de vérification remise en fin de chantier.
 *
 * Le script est idempotent : il retrouve un brouillon existant par son slug et
 * le met à jour plutôt que d'en créer un doublon.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const AUTHOR_JGEN = '2e8bf1e0-8d86-415a-8c58-c04222f704e8'

const PROGRAM = {
  ellesAussi: '173da4f5-3364-45a7-9430-7ac07201b7e1',
  kiiray: '4afe64ef-dc08-4997-b272-8826845e8581',
  pasAPas: '59a2488b-292e-4387-875d-926d643e67aa',
  jvssr: '9b8f885f-da6d-4523-98aa-a3de74ef7e4c',
  liggeeyal: '3d5904cb-eacb-4534-a683-5d7bdbd8e77d',
  naatal: 'fc8b5b3f-19b6-4606-bf6b-345aa57ad508',
}

/** Programmes et catégories qui n'existent encore qu'en brouillon. */
const DRAFT_ONLY = new Set([
  PROGRAM.kiiray,
  '14a1f41b-265f-4118-925b-a1e28138c179', // Autonomisation économique
  'a9b6fb35-3ff6-48d6-980a-5ed98ac60694', // Gouvernance locale
  '5c1b619a-7aca-4ba6-9af3-5d8fb0ab3bd1', // Bajenu Gox
])

const CATEGORY = {
  violencesSexuelles: '00a797a7-d6f7-4c9c-8e4c-a2924c09033b',
  feminisme: '0681b765-b017-45aa-91cd-796cd65ed05d',
  guerison: '0ed36fba-130e-4110-892f-c77b49311848',
  societeCivile: '33447e91-37e2-4852-8834-7520682a1e9b',
  formation: '35695073-eee8-4880-bacc-1ba07f967640',
  partenariat: '49ea7712-f6fc-49f7-b725-7a0847e8c983',
  ellesAussi: '556e1239-979d-4556-a8a3-44473d2bd830',
  santeReproductive: '55f3058b-c9b4-4924-bc6e-30487585256f',
  plaidoyer: 'bb1a7d4d-1f07-4ad4-976f-27ad65f7f29b',
  programme: 'cae7b4c3-255f-47e3-8e1b-b41d590c7bc3',
  autonomisation: '14a1f41b-265f-4118-925b-a1e28138c179',
  gouvernanceLocale: 'a9b6fb35-3ff6-48d6-980a-5ed98ac60694',
  bajenuGox: '5c1b619a-7aca-4ba6-9af3-5d8fb0ab3bd1',
}

const IMAGE = {
  huitMars: 'image-9b3def0ebfa70be4de9057525bb82b9963977d6c-1600x900-jpg',
  assises: 'image-8e09eb3c203fa7a1d5800e0498c6f9b76be24ca3-1600x900-jpg',
  bajenugox2: 'image-3813d91b0deff4f1e71f2026a3d13e178fb5cd00-1600x900-jpg',
  euleug: 'image-ba78840f1d8832c66b9125a416cbfe66af26e562-1600x900-jpg',
  jvssr: 'image-bcc3936a28451cb3027b433281d091ca512dfcd7-1163x842-jpg',
  pasAPas: 'image-d28ee8beda8a7555789ed665dd1194869b01812e-2048x1152-jpg',
  pasAPas2: 'image-8baf427881cbf756280be3a16710d6510139a6d8-2048x1152-jpg',
  pasAPas3: 'image-a328d2c83efaece50e7989a40a2712015e3c524e-2048x1152-jpg',
  cercles: 'image-d373af03a0d12a16fbd8c3278ac7e7b7e7837d46-1162x821-jpg',
  codeFamille: 'image-28863918f036e6d5b9242b3de00581ed39dfe116-2048x1152-jpg',
  copil: 'image-3d520954b9fa5db9df39a6423692f7fccbc45bcf-1600x900-jpg',
  perception: 'image-125030ed0812cf0ad2a8cefd472ea1c5f7a259de-1600x900-jpg',
}

/** Date de mise en ligne, conformément au choix éditorial retenu : les articles
 *  portent la date de publication, la date de l'activité étant donnée en clair
 *  dans le texte. */
const PUBLISHED_AT = '2026-08-01T09:00:00.000Z'

type Article = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  excerpt: string
  program: string
  categories: string[]
  image?: {asset: string; alt: string}
  /** Un tableau de paragraphes. Un élément préfixé par « ## » devient un titre. */
  body: string[]
}

function reference(id: string, key?: string) {
  return {
    _type: 'reference' as const,
    ...(key ? {_key: key} : {}),
    _ref: id,
    ...(DRAFT_ONLY.has(id) ? {_weak: true} : {}),
  }
}

function toPortableText(paragraphs: string[]) {
  return paragraphs.map((paragraph, index) => {
    const isHeading = paragraph.startsWith('## ')
    const text = isHeading ? paragraph.slice(3) : paragraph
    return {
      _type: 'block',
      _key: `b${index}`,
      style: isHeading ? 'h2' : 'normal',
      children: [{_type: 'span', _key: `b${index}s`, text}],
    }
  })
}

function toDocument(article: Article) {
  return {
    _type: 'post',
    title: article.title,
    slug: {_type: 'slug', current: article.slug},
    publishedAt: PUBLISHED_AT,
    author: reference(AUTHOR_JGEN),
    program: reference(article.program),
    categories: article.categories.map((id, index) => reference(id, `c${index}`)),
    ...(article.image
      ? {
          image: {
            _type: 'image',
            asset: {_type: 'reference', _ref: article.image.asset},
            alt: article.image.alt,
          },
        }
      : {}),
    excerpt: article.excerpt,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    keywords: article.keywords,
    body: toPortableText(article.body),
  }
}

const articles: Article[] = [
  // ─────────────────────────── ELLES AUSSI ───────────────────────────
  {
    slug: 'cercles-de-guerison-niakhar-38-survivantes-violences-sexuelles',
    title: "Cercles de guérison à Niakhar : 38 survivantes de violences sexuelles accompagnées",
    metaTitle: 'Cercles de guérison à Niakhar : 38 survivantes accompagnées',
    metaDescription:
      "Quatre cercles de guérison à Niakhar ont réuni 38 survivantes de violences sexuelles. Récit d'une méthode centrée sur le care et de ce qu'elle a mis au jour.",
    keywords: [
      'cercle de guérison survivantes',
      'accompagnement psychosocial VBG Sénégal',
      'violences sexuelles Fatick',
      'projet ELLES AUSSI',
      'espace sûr survivantes',
    ],
    excerpt:
      "Au premier trimestre 2026, quatre sessions de cercles de guérison ont été organisées à Niakhar dans le cadre du projet ELLES AUSSI. Elles ont réuni 38 survivantes réparties en quatre groupes.",
    program: PROGRAM.ellesAussi,
    categories: [
      CATEGORY.ellesAussi,
      CATEGORY.violencesSexuelles,
      CATEGORY.guerison,
    ],
    body: [
      "Il existe une distance considérable entre reconnaître qu'une violence a eu lieu et pouvoir en parler. C'est cette distance que les cercles de guérison cherchent à réduire. Au premier trimestre 2026, quatre sessions ont été organisées à Niakhar, dans la région de Fatick, réunissant 38 survivantes de violences sexuelles et sexistes réparties en quatre groupes.",
      "Ces cercles s'inscrivent dans la deuxième phase du projet ELLES AUSSI, un projet d'intervention communautaire contre les violences sexuelles et sexistes financé par l'African Women's Development Fund et déployé dans les communes de Fatick, Diouroup et Niakhar entre juillet 2025 et mars 2026.",
      '## Des règles posées par les participantes elles-mêmes',
      "Le dispositif repose sur une condition préalable : la sécurité du cadre. Les règles de fonctionnement — confidentialité, respect, écoute active — n'ont pas été imposées par les animatrices mais définies collectivement par les participantes au début du travail.",
      "Ce détail de méthode n'est pas anodin. Des femmes dont la parole a été confisquée, mise en doute ou retournée contre elles commencent par reprendre la main sur les conditions dans lesquelles elles vont parler. La libération de la parole vient ensuite, et seulement ensuite.",
      '## Une approche centrée sur le care',
      "L'intervention a reposé sur une approche participative centrée sur le care, s'appuyant sur des outils ludo-pédagogiques : cartes projectives, jeux de ballons, exercices de vocalisation. Le cadre a combiné présentations, travaux en binôme, échanges guidés et outils thérapeutiques.",
      "Ce recours au jeu et au corps répond à un obstacle précis. Le traumatisme bloque l'accès au récit : demander à une survivante de raconter les faits, dans l'ordre et avec des mots, revient souvent à lui demander l'impossible. Les cartes projectives et les exercices de vocalisation contournent cet obstacle en passant par l'image et par la voix plutôt que par le récit construit.",
      "Cette méthodologie a permis de faciliter l'expression émotionnelle des participantes, de réduire les blocages liés aux traumatismes et de renforcer la cohésion, la solidarité et la sororité au sein des groupes.",
      '## Ce que les échanges ont mis au jour',
      "Les discussions ont fait apparaître une diversité de violences subies — sexuelles, domestiques, psychologiques, sociales et économiques — incluant des cas de viols suivis de grossesses. Elles ont également montré une implication fréquente d'auteurs issus du cercle familial ou de proximité.",
      "Trois mécanismes structurels sont ressortis avec constance. La dépendance économique, d'abord, comme facteur majeur de vulnérabilité. L'existence de systèmes de prédation sociale et économique, ensuite. Enfin, ce que les participantes ont décrit comme une « économie du silence » : un ensemble d'intérêts convergents qui protège les auteurs et isole les survivantes.",
      "Le silence, dans cette lecture, n'est pas une absence de parole. C'est une organisation sociale qui a ses bénéficiaires. La stigmatisation, la pression de la sutura et le manque de confiance envers les institutions en sont les rouages.",
      '## Les besoins exprimés',
      "Les survivantes ont formulé quatre besoins prioritaires : un accès durable à un accompagnement psychosocial adapté, la mise en place d'espaces sûrs et permanents, le renforcement de leur autonomisation économique, et l'amélioration des mécanismes de protection et d'accès à la justice.",
      "L'ordre de cette liste mérite attention. L'autonomisation économique y figure au même rang que l'accompagnement psychologique et l'accès à la justice — ce qui rejoint le constat sur la dépendance économique comme facteur d'enfermement.",
      '## Ce que le projet en retient',
      "Le bilan du trimestre relève une participation active des survivantes et identifie comme principal enjeu la mise en place d'un suivi régulier après les séances. Les recommandations portent sur des séances préparatoires individuelles ou en petits groupes pour faciliter l'adhésion aux cercles, sur l'adaptation des approches au rythme de chaque survivante, et sur un accompagnement psychologique qui ne s'arrête pas à la fin de l'activité.",
      "Les cercles de guérison ont constitué des espaces de libération de la parole, de reconnaissance des vécus et de reconstruction individuelle et collective. Ils confirment la pertinence des approches communautaires centrées sur l'écoute, le care et l'autonomisation des survivantes.",
    ],
  },

  // ─────────────────────────── PAS À PAS ───────────────────────────
  {
    slug: 'argumentaire-religieux-justice-reproductive-anar-jrs',
    title: "Justice reproductive : un argumentaire religieux consolidé avec les mouvements de l'ANAR/JRS",
    metaTitle: 'Un argumentaire religieux sur la justice reproductive',
    metaDescription:
      "Deux rencontres en ligne et une en présentiel avec les mouvements de l'ANAR/JRS ont permis de consolider et de finaliser l'argumentaire religieux du programme PAS À PAS.",
    keywords: [
      'argumentaire religieux justice reproductive',
      'acteurs religieux DSSR Sénégal',
      'ANAR JRS',
      'programme PAS À PAS',
      'plaidoyer avortement sécurisé Sénégal',
    ],
    excerpt:
      "Au premier trimestre 2026, le programme PAS À PAS a réuni les mouvements de l'ANAR/JRS pour renforcer, enrichir et valider son argumentaire religieux. Le document a été consolidé et finalisé.",
    program: PROGRAM.pasAPas,
    categories: [CATEGORY.plaidoyer, CATEGORY.santeReproductive, CATEGORY.partenariat],
    image: {
      asset: IMAGE.pasAPas3,
      alt: "Échanges entre participantes et formatrices lors d'une session du programme PAS À PAS",
    },
    body: [
      "Sur les droits reproductifs, le débat public sénégalais se joue rarement sur le terrain juridique seul. Il se joue aussi, et souvent d'abord, sur le terrain religieux. Le programme PAS À PAS en a tiré une conséquence méthodologique : plutôt que de contourner les acteurs religieux, il travaille avec eux.",
      "Au premier trimestre 2026, deux rencontres en ligne et une rencontre en présentiel ont été organisées avec les mouvements de l'ANAR/JRS, en vue de renforcer, d'enrichir et de valider l'argumentaire religieux du programme.",
      '## Deux groupes de travail, deux fonctions',
      "Ces cadres de réflexion se sont appuyés sur deux groupes distincts. Le Groupe Revue Littéraire a pris en charge le travail sur les sources. Le Groupe Approche, Contenu et Méthodologie s'est chargé de la structure du document et de la manière dont il s'adresse à ses destinataires.",
      "Cette séparation des tâches est un choix de rigueur. Elle évite qu'un même groupe valide à la fois ce qui est dit et la façon dont c'est dit, et elle oblige à distinguer ce qui relève de l'établissement des sources de ce qui relève de l'argumentation.",
      "Les deux groupes ont mené un travail approfondi d'analyse, de relecture et d'harmonisation du contenu.",
      '## Un document consolidé et finalisé',
      "Grâce aux échanges et aux contributions concertées des participants, l'argumentaire religieux a pu être consolidé et finalisé. À l'issue de ce processus, il ne restait plus qu'à intégrer et transmettre la version arabe afin de disposer d'un document complet.",
      "Cette version arabe n'est pas une formalité de traduction. Elle conditionne la circulation du document auprès d'une partie des acteurs religieux à qui il s'adresse, et donc son utilité réelle.",
      '## Ce que ce travail vise',
      "Le programme PAS À PAS a pour objet de renforcer le plaidoyer en faveur de l'accès à l'avortement sécurisé dans les cas de viol ou d'inceste. Il mobilise pour cela les acteurs communautaires, les leaders religieux, les jeunes leaders et les professionnels des médias au sein d'une plateforme d'acteurs engagés.",
      "Il est mis en œuvre grâce aux partenaires techniques et financiers du programme, IPAS et AmplifyChange.",
      "Disposer d'un argumentaire religieux consolidé change la nature de la conversation. Il ne s'agit plus d'opposer un discours de droits à un discours de foi, mais de rendre discutable, à l'intérieur du champ religieux lui-même, une question jusque-là traitée comme close.",
    ],
  },
  {
    slug: 'enrolement-soixante-jeunes-leaders-justice-reproductive',
    title: 'Soixante jeunes leaders enrôlés dans le mouvement pour la justice reproductive',
    metaTitle: 'Soixante jeunes leaders enrôlés pour la justice reproductive',
    metaDescription:
      "Le programme PAS À PAS a lancé un processus d'enrôlement auprès des jeunes et des acteurs communautaires. Soixante jeunes leaders ont rejoint le mouvement au premier trimestre 2026.",
    keywords: [
      'jeunes leaders justice reproductive',
      'engagement communautaire DSSR',
      'mobilisation jeunesse Sénégal',
      'programme PAS À PAS',
      'plaidoyer VBG jeunes',
    ],
    excerpt:
      "Un processus d'enrôlement a été enclenché par les sous-mouvements du programme PAS À PAS auprès des jeunes et des acteurs communautaires. Soixante jeunes leaders ont été enrôlés.",
    program: PROGRAM.pasAPas,
    categories: [CATEGORY.plaidoyer, CATEGORY.santeReproductive],
    body: [
      "Un mouvement de plaidoyer ne vaut que par les personnes qui le portent sur le terrain. Au premier trimestre 2026, le programme PAS À PAS a enclenché un processus d'enrôlement auprès des jeunes et des acteurs communautaires, dans une dynamique de renforcement de l'engagement autour des questions de droits en santé sexuelle et reproductive, des violences basées sur le genre et du plaidoyer pour l'accès à l'avortement sécurisé en cas de viol et d'inceste.",
      "Soixante jeunes leaders ont été enrôlés à l'issue de cette première étape.",
      '## Enrôler, et non simplement sensibiliser',
      "Le vocabulaire employé par le programme mérite d'être pris au sérieux. On n'enrôle pas un public : on enrôle des personnes qui acceptent un rôle. La différence avec une action de sensibilisation classique tient à cet engagement réciproque.",
      "Les jeunes enrôlés ne sont pas destinataires d'un message ; ils deviennent les relais d'un plaidoyer dans leurs propres communautés, avec la légitimité que confère le fait d'y vivre.",
      '## Des zones d\'intervention précises',
      "L'enrôlement a été conduit dans les communes de Pikine Nord et Est, Tivaouane Peulh et Patte d'Oie, dans la région de Dakar. Ces territoires ont ensuite accueilli les sessions de formation destinées aux jeunes enrôlés.",
      "Ces formations visent à renforcer leurs capacités en matière de sensibilisation, de mobilisation communautaire, de leadership et de plaidoyer, afin de favoriser une meilleure implication des jeunes dans la promotion des droits, de la santé et du bien-être des communautés.",
      '## Une brique d\'un mouvement structuré',
      "Cet enrôlement s'inscrit dans une architecture plus large. Le mouvement Pas à Pas est structuré autour de quatre sous-mouvements : les jeunes, les acteurs communautaires, les professionnels des médias et les acteurs religieux. Chacun conduit son propre travail d'enrôlement et de mobilisation.",
      "Le pari est celui d'une action concertée plutôt que d'une addition d'initiatives : sur un sujet aussi disputé que la justice reproductive, une parole isolée est facilement disqualifiée, une parole portée simultanément par des jeunes, des médias, des acteurs communautaires et des religieux l'est beaucoup moins.",
    ],
  },
  {
    slug: 'formations-jeunes-leaders-dssr-pikine-tivaouane-peulh-patte-oie',
    title: "Pikine, Tivaouane Peulh, Patte d'Oie : des jeunes leaders formés aux DSSR et à la réponse aux mouvements anti-droits",
    metaTitle: 'Jeunes leaders formés aux DSSR et aux mouvements anti-droits',
    metaDescription:
      "Le programme PAS À PAS a formé des jeunes leaders à Pikine, Tivaouane Peulh et Patte d'Oie sur les DSSR, les argumentaires de plaidoyer et la réponse aux mouvements anti-droits.",
    keywords: [
      'formation DSSR jeunes Sénégal',
      'mouvements anti-droits',
      'plaidoyer justice reproductive',
      'Pikine Tivaouane Peulh Patte d\'Oie',
      'programme PAS À PAS',
    ],
    excerpt:
      "Au deuxième trimestre 2026, une série de formations a été organisée à Pikine, Tivaouane Peulh et Patte d'Oie sur les droits en santé sexuelle et reproductive et les stratégies de réponse aux mouvements anti-droits.",
    program: PROGRAM.pasAPas,
    categories: [CATEGORY.formation, CATEGORY.santeReproductive, CATEGORY.plaidoyer],
    image: {
      asset: IMAGE.pasAPas,
      alt: "Session de formation de jeunes leaders sur les droits en santé sexuelle et reproductive, programme PAS À PAS",
    },
    body: [
      "Au deuxième trimestre 2026, le programme PAS À PAS a poursuivi le renforcement des capacités des jeunes leaders à travers une série de formations organisées dans plusieurs communes de la région de Dakar. Ces sessions se sont tenues à Pikine, à Tivaouane Peulh et à Patte d'Oie.",
      '## Trois blocs de contenu',
      "Les formations ont porté sur trois ensembles. D'abord les droits en santé sexuelle et reproductive, socle de connaissances sans lequel aucun plaidoyer n'est tenable. Ensuite les argumentaires en faveur de l'avortement sécurisé dans les cas prévus par le plaidoyer du programme, c'est-à-dire les situations de viol et d'inceste.",
      "Enfin, et c'est le bloc le plus inhabituel dans ce type de formation : les stratégies de compréhension et de réponse aux mouvements anti-droits.",
      '## Pourquoi former à la réponse aux mouvements anti-droits',
      "Ce troisième volet répond à une évolution du contexte que J-GEN Sénégal observe sur l'ensemble de ses terrains : la montée d'une opposition organisée aux droits des femmes, qui ne se contente plus de contester des revendications mais conteste les faits eux-mêmes, et qui maîtrise souvent mieux les codes de la communication en ligne que les organisations de défense des droits.",
      "Former des jeunes leaders à comprendre ces mouvements avant d'y répondre est une manière de sortir de la réaction. On ne répond pas de la même façon à une objection de bonne foi et à une stratégie de disqualification ; encore faut-il savoir les distinguer.",
      '## Les résultats obtenus',
      "Ces formations ont permis de renforcer les connaissances et les compétences des jeunes participants, afin qu'ils deviennent des acteurs de sensibilisation et de plaidoyer au sein de leurs communautés, contribuant à la promotion de la justice reproductive et à la défense des droits des femmes et des filles.",
      "Des plans d'action ont par ailleurs été élaborés pour pérenniser les initiatives futures. Les participant·e·s ont exprimé la volonté de démultiplier les acquis auprès de leurs pairs — un effet que le programme retient explicitement comme leçon apprise.",
      '## Ce que le bilan retient',
      "Le bilan du trimestre relève la maîtrise des thématiques par les formatrices, une mobilisation précoce des jeunes et la qualité du cadre d'accueil, sécurisé et aéré.",
      "Deux points d'amélioration sont identifiés : la remise d'attestations à l'issue des formations, et la mise à disposition de documents permettant aux participants d'approfondir la réflexion après la session. Un mécanisme de suivi post-formation a été mis en place avec l'élaboration des plans d'action destinés à soutenir les initiatives portées par les jeunes.",
    ],
  },

  // ─────────────────────────── JVSSR ───────────────────────────
  {
    slug: 'cercles-de-sororite-ndenatte-therme-nord-yoff',
    title: 'Deux cercles de sororité à Ndenatte et Therme Nord : des jeunes femmes de Yoff prennent la parole',
    metaTitle: 'Cercles de sororité à Yoff : des jeunes femmes prennent la parole',
    metaDescription:
      "À Ndenatte et Therme Nord, deux cercles de sororité ont réuni des adolescentes et de jeunes femmes autour de la citoyenneté active, du genre et des violences basées sur le genre.",
    keywords: [
      'cercle de sororité Yoff',
      'adolescentes santé sexuelle et reproductive',
      'citoyenneté active jeunes femmes',
      'projet JVSSR',
      'violences basées sur le genre Dakar',
    ],
    excerpt:
      "Au deuxième trimestre 2026, le projet JVSSR a organisé deux cercles de sororité dans les quartiers de Ndenatte et Therme Nord, à Yoff. Ils ont porté sur la citoyenneté active, le genre et les droits fondamentaux.",
    program: PROGRAM.jvssr,
    categories: [CATEGORY.santeReproductive, CATEGORY.feminisme, CATEGORY.violencesSexuelles],
    image: {
      asset: IMAGE.jvssr,
      alt: "Cercle de sororité réunissant des adolescentes et de jeunes femmes à Yoff, projet JVSSR",
    },
    body: [
      "Au deuxième trimestre 2026, deux cercles de sororité ont été organisés dans les quartiers de Ndenatte et de Therme Nord, dans la commune de Yoff. Ces espaces d'échange ont réuni des adolescentes et de jeunes femmes issues de profils variés.",
      "Ils s'inscrivent dans le projet Jeunes Volontaires pour la Santé Sexuelle et Reproductive, financé par Speak Up Africa dans le cadre de l'Initiative Voix Essentielles et mis en œuvre avec la municipalité de Yoff et l'appui des Badienou Gox.",
      '## Une méthode qui repose sur la participation',
      "Les cercles ont favorisé une participation active grâce à une approche interactive fondée sur les discussions, les travaux de groupe et la réflexion collective. Ce format n'est pas décoratif : sur des sujets que les participantes n'abordent pas dans le cadre familial ou scolaire, la parole se libère plus facilement en petit groupe qu'en séance plénière.",
      '## Les connaissances renforcées',
      "Les participantes ont renforcé leurs connaissances sur la citoyenneté active, sur les notions de genre et de sexe, sur les droits fondamentaux ainsi que sur les différentes formes de violences basées sur le genre.",
      "La distinction entre genre et sexe occupe ici une place particulière. Elle constitue l'outil conceptuel qui permet de comprendre qu'une répartition des rôles présentée comme naturelle relève en réalité d'une construction sociale — et donc qu'elle peut être discutée.",
      '## Ce que les participantes ont identifié',
      "Ces cercles ont également permis d'identifier les principaux défis auxquels les jeunes filles sont confrontées dans leurs communautés : les mariages précoces et forcés, les abandons scolaires, les violences conjugales, psychologiques, verbales et économiques, ainsi que les normes sociales discriminatoires.",
      "Cette liste n'a pas été apportée par les animatrices. Elle est le produit des échanges, ce qui lui donne une valeur de diagnostic pour la suite du projet.",
      '## Les résultats observés',
      "Le projet retient trois résultats : une meilleure compréhension des thématiques abordées, un engagement accru des participantes à agir comme relais communautaires, et l'intérêt manifeste des communautés pour ce type d'espace de dialogue.",
      "Les cercles de sororité ont ainsi confirmé leur pertinence comme mécanisme de sensibilisation, de renforcement des capacités et de promotion d'une citoyenneté active en faveur des adolescentes et des jeunes femmes.",
      "Le bilan du trimestre souligne par ailleurs la diversité des profils et la bonne mobilisation des participantes, et relève que l'approche communautaire a permis de briser des sujets tabous au sein de la communauté traditionnelle lébou.",
    ],
  },
  {
    slug: 'etude-perceptions-communaute-yoff-dssr-vbg',
    title: 'Une étude sur les perceptions de la communauté de Yoff en matière de DSSR et de violences',
    metaTitle: 'Étude sur les perceptions des DSSR et des VBG à Yoff',
    metaDescription:
      "Le projet JVSSR a réalisé une étude sur les perceptions de la communauté de Yoff en matière de droits sexuels et reproductifs et de violences basées sur le genre, restituée aux parties prenantes.",
    keywords: [
      'étude perceptions DSSR Yoff',
      'données probantes VBG Sénégal',
      'recherche communautaire santé reproductive',
      'projet JVSSR',
      'restitution étude parties prenantes',
    ],
    excerpt:
      "Après la validation de son plan d'action et le recrutement d'un consultant, le projet JVSSR a réalisé une étude sur les perceptions de la communauté de Yoff, dont les résultats ont été restitués aux parties prenantes.",
    program: PROGRAM.jvssr,
    categories: [CATEGORY.santeReproductive, CATEGORY.societeCivile],
    image: {
      asset: IMAGE.perception,
      alt: "Session de restitution de l'enquête de base sur les perceptions communautaires à Yoff, le 24 juin 2026 à la mairie de Yoff",
    },
    body: [
      "Intervenir sans données revient à agir sur des suppositions. Le projet Jeunes Volontaires pour la Santé Sexuelle et Reproductive a fait de la production de données probantes l'un de ses axes structurants pour sa deuxième phase à Yoff.",
      '## Une préparation méthodique',
      "Le travail a commencé au premier trimestre 2026 par la planification et la budgétisation du projet, avec la validation du plan d'action auprès du bailleur. Un processus de recrutement d'un consultant a été lancé en vue de réaliser une étude de base sur la perception des populations concernant les notions de genre et la santé reproductive.",
      "Cette séquence — valider le cadre, recruter une expertise externe, puis enquêter — est ce qui distingue une étude d'un simple recueil d'impressions.",
      '## Une étude réalisée au deuxième trimestre',
      "Au deuxième trimestre, les activités de terrain ont été lancées. Une étude portant sur les perceptions de la communauté de Yoff en matière de droits en santé sexuelle et reproductive et de violences basées sur le genre a été réalisée.",
      "Interroger les perceptions plutôt que les seuls comportements est un choix qui a des conséquences pratiques. Ce sont les représentations partagées — sur ce qui se dit, ce qui se tait, ce qui est jugé acceptable — qui déterminent si une jeune fille osera consulter, se confier ou porter plainte.",
      '## Une restitution publique, le 24 juin 2026 à la mairie de Yoff',
      "Les résultats ont fait l'objet d'une session de restitution le mercredi 24 juin 2026, dans la salle de réunion de la mairie de Yoff, réunissant l'ensemble des parties prenantes du projet.",
      "L'intitulé retenu pour cette session dit précisément ce qui a été mesuré : la perception communautaire à Yoff sur l'accès des jeunes et des femmes aux services liés aux DSSR et à la prévention des violences basées sur le genre. Il ne s'agit donc pas seulement de savoir ce que les habitants pensent de ces sujets, mais de savoir ce qui, dans ces représentations, empêche ou permet le recours effectif à un service.",
      "Restituer publiquement les résultats engage : une fois les constats partagés avec la municipalité, les acteurs communautaires et les partenaires, ils deviennent une base commune sur laquelle chacun peut être interpellé. Tenir cette séance dans les locaux de la mairie plutôt que dans un cadre associatif accentue cet engagement.",
      "Cette restitution a permis d'orienter les interventions du projet en fonction des besoins identifiés.",
      '## Ce que l\'étude a rendu possible',
      "C'est sur cette base que se sont ensuite tenus les cercles de sororité de Ndenatte et de Therme Nord, ainsi que le travail d'animation d'espaces sûrs qui constitue le second axe de cette deuxième phase.",
      "Le projet vise à consolider les acquis des interventions précédentes et à renforcer la pérennité des mécanismes communautaires favorisant la protection, l'autonomisation et la participation des adolescentes et des jeunes femmes.",
    ],
  },

  // ─────────────────────────── LIGGEEYAL ËLËG ───────────────────────────
  {
    slug: 'liggeeyal-eleg-kaolack-patisserie-saponification-restauration',
    title: 'À Kaolack, trois GIE de jeunes femmes formés à la pâtisserie, à la saponification et à la restauration',
    metaTitle: 'Kaolack : trois GIE de jeunes femmes formés aux métiers',
    metaDescription:
      "Les Amazones villageoises de Gandiaye, Mbogga Yiff de Sibassor et les Jeunes femmes autonomes de Kaolack ont été formées à la pâtisserie, la saponification et la restauration.",
    keywords: [
      'autonomisation économique jeunes femmes Kaolack',
      'GIE femmes Sénégal',
      'formation saponification pâtisserie',
      'projet LIGGEEYAL ËLËG',
      'insertion socioprofessionnelle filles déscolarisées',
    ],
    excerpt:
      "Dans la région de Kaolack, le projet LIGGEEYAL ËLËG a organisé des sessions de formation aux métiers au profit de trois groupements d'intérêt économique de jeunes femmes.",
    program: PROGRAM.liggeeyal,
    categories: [CATEGORY.autonomisation, CATEGORY.formation, CATEGORY.partenariat],
    image: {
      asset: IMAGE.euleug,
      alt: "Session de formation aux métiers d'un GIE de jeunes femmes, projet LIGGEEYAL ËLËG",
    },
    body: [
      "Le projet LIGGEEYAL ËLËG part d'un constat que les cercles de guérison de Fatick ont confirmé par ailleurs : la dépendance économique est le principal facteur qui enferme une jeune femme dans une situation qu'elle voudrait quitter. Le projet s'adresse aux jeunes filles non scolarisées ou déscolarisées et aux jeunes femmes mères célibataires âgées de 16 à 35 ans.",
      "Il vise l'autonomisation de 120 jeunes femmes dans les régions de Fatick et de Kaolack, sur une durée de trois ans allant de novembre 2024 à octobre 2027.",
      '## Créer la structure avant de former',
      "J-GEN Sénégal a d'abord créé et formalisé six groupements d'intérêt économique, avant d'organiser les sessions de formation aux métiers à leur profit.",
      "Cet ordre est délibéré. Former des individus sans structure d'accueil produit des compétences dispersées ; formaliser un GIE au préalable donne aux participantes une existence juridique, une capacité à contracter et un cadre collectif qui survit à la fin du projet.",
      '## Trois métiers, trois groupements',
      "Dans la région de Kaolack, les sessions ont été organisées dans trois métiers distincts.",
      "La pâtisserie a été enseignée avec le GIE « Les Amazones villageoises de Gandiaye ». La saponification — la fabrication de savon — avec le GIE « Mbogga Yiff des jeunes femmes de Sibassor ». La restauration avec le GIE « Les jeunes femmes autonomes de Kaolack ».",
      "Ces trois activités ont un point commun : elles relèvent de la transformation, disposent d'un marché local immédiat et ne réclament pas un investissement initial hors de portée.",
      '## Une supervision confiée à un partenaire local',
      "Les sessions de formation ont été supervisées par l'Association Action pour le Développement du Sénégal, partenaire de mise en œuvre du projet à Kaolack.",
      "Ce choix d'un ancrage local n'est pas une délégation de commodité : il conditionne la possibilité d'un suivi après la formation, quand les équipes de projet ne sont plus sur place.",
      '## Ce que le bilan retient',
      "Le bilan du trimestre relève à Kaolack la disponibilité de la salle, du matériel et des produits, la présence effective des participantes, la pertinence des discussions pendant les travaux pratiques, la réussite des pratiques et le niveau d'études élevé de certaines participantes.",
      "Quatre points d'amélioration sont identifiés : la durée jugée insuffisante des sessions pratiques, le suivi après la formation, le manque de certains équipements et l'indisponibilité des supports de cours.",
      "Les recommandations qui en découlent portent sur l'allongement de la durée des formations, la mise à disposition de supports de cours, la remise d'attestations de fin de formation, l'organisation de suivis et la signature de conventions avec des structures financières — cette dernière étant la condition d'un démarrage effectif des activités.",
    ],
  },
  {
    slug: 'liggeeyal-eleg-fatick-teinture-patisserie-trois-gie',
    title: 'À Fatick, trois GIE formés à la teinture et à la pâtisserie',
    metaTitle: 'Fatick : trois GIE de jeunes femmes formés aux métiers',
    metaDescription:
      "Dans la région de Fatick, les GIE Niak Dieurignou, Ligueyal sama Gokh et Mbokator Ndamite Rew wé ont bénéficié de formations en teinture et en pâtisserie.",
    keywords: [
      'autonomisation économique femmes Fatick',
      'formation teinture Sénégal',
      'GIE jeunes femmes Diouroup Niakhar',
      'projet LIGGEEYAL ËLËG',
      'Badienou Gox Fatick',
    ],
    excerpt:
      "Dans la région de Fatick, trois groupements d'intérêt économique de jeunes femmes ont été formés à la teinture et à la pâtisserie, sous la supervision de l'Association des Badienou Gox de Fatick.",
    program: PROGRAM.liggeeyal,
    categories: [CATEGORY.autonomisation, CATEGORY.formation],
    body: [
      "Le volet Fatick du projet LIGGEEYAL ËLËG a concerné trois des six groupements d'intérêt économique créés et formalisés par J-GEN Sénégal dans le cadre de ce projet d'autonomisation économique et sociale.",
      '## Trois communes, deux métiers',
      "Le GIE « Niak Dieurignou », de la commune de Fatick, a bénéficié d'une formation en teinture.",
      "Les GIE « Ligueyal sama Gokh », de la commune de Diouroup, et « Mbokator Ndamite Rew wé », de la commune de Niakhar, ont été formés en pâtisserie.",
      "Ces communes ne sont pas choisies au hasard : Fatick, Diouroup et Niakhar sont également les territoires d'intervention du projet ELLES AUSSI, consacré à la prévention des violences sexuelles et sexistes et à l'accompagnement des survivantes. Travailler l'autonomisation économique là où l'on accompagne des survivantes répond directement à l'un des besoins que celles-ci ont exprimé en priorité.",
      '## Une supervision par les Badienou Gox',
      "Les sessions de formation dans la région de Fatick ont été supervisées par l'Association des Badienou Gox de Fatick, partenaire de mise en œuvre du projet.",
      "Confier cette supervision aux marraines de quartier prolonge un rôle qu'elles exercent déjà en matière de santé communautaire, et ancre le projet dans un réseau qui existait avant lui et lui survivra.",
      '## Ce que le bilan retient',
      "Le bilan du trimestre relève à Fatick le grand intérêt manifesté par les apprenantes, leur ponctualité, la disponibilité de la formatrice et la qualité du cadre d'accueil.",
      "Il souligne également la participation inclusive de toutes les bénéficiaires, la maîtrise des outils de travail par les participantes, le développement d'un bon esprit de groupe et l'implication des autorités locales et des services techniques.",
      '## Les enseignements tirés',
      "Le projet retient plusieurs leçons de ces sessions. Le travail en groupe permet de gagner du temps dans la fabrication du produit. L'apprentissage en milieu professionnel renforce la dynamique de groupe. La formation pratique facilite l'acquisition et la maîtrise des techniques.",
      "Le projet note enfin que la transformation alimentaire constitue une réelle opportunité économique pour les femmes, et que les participantes ont montré leur détermination à se lancer dans cette activité — en respectant les règles d'hygiène, port du tablier compris.",
    ],
  },

  // ─────────────────────────── NAATAL JABOOT GUI ───────────────────────────
  {
    slug: 'reunion-orientation-assises-nationales-citoyennes-mars-2026',
    title: "Assises nationales citoyennes : une réunion d'orientation fixe le cap les 16 et 17 mars 2026",
    metaTitle: "Assises nationales citoyennes : la réunion d'orientation",
    metaDescription:
      "Les 16 et 17 mars 2026 aux Almadies, une réunion d'orientation a défini les orientations stratégiques, la gouvernance et les huit thématiques des Assises nationales citoyennes.",
    keywords: [
      'Assises nationales citoyennes droits des femmes',
      'réforme Code de la famille Sénégal',
      'Naatal Jaboot Gui',
      'dialogue national droits des femmes',
      'comité de pilotage assises',
    ],
    excerpt:
      "Une réunion d'orientation s'est tenue les 16 et 17 mars 2026 à Sama Hôtel, aux Almadies, pour définir les orientations stratégiques, organisationnelles et méthodologiques des Assises nationales citoyennes.",
    program: PROGRAM.naatal,
    categories: [CATEGORY.plaidoyer, CATEGORY.societeCivile, CATEGORY.programme],
    image: {
      asset: IMAGE.assises,
      alt: "Réunion d'orientation des Assises nationales citoyennes, les 16 et 17 mars 2026 aux Almadies",
    },
    body: [
      "Les 16 et 17 mars 2026, une réunion d'orientation s'est tenue à Sama Hôtel, aux Almadies, dans le cadre de la préparation des Assises nationales citoyennes sur les droits des femmes et des filles. Elle a permis de définir les orientations stratégiques, organisationnelles et méthodologiques du processus.",
      "Ces Assises sont annoncées du 25 au 27 novembre 2026.",
      '## Un programme, deux instruments',
      "Les Assises s'inscrivent dans le programme Naatal Jaboot Gui, financé par l'African Women's Development Fund et mis en œuvre dans les régions de Dakar et de Thiès. Le programme vise à créer un cadre de dialogue entre les parlementaires et les communautés, en particulier les femmes, afin de promouvoir un engagement parlementaire en faveur de la révision des dispositions discriminatoires du Code de la famille.",
      "Deux types d'activités le structurent : « Jakarlo ak sama député », qui met en relation directe citoyennes et parlementaires, et les Assises nationales citoyennes elles-mêmes.",
      '## Une gouvernance en deux instances',
      "Les participants ont validé la réorganisation des instances de gouvernance du processus. Un Comité technique est chargé de l'orientation scientifique et technique. Un Comité de pilotage est responsable de la coordination opérationnelle et de l'organisation des pré-assises régionales.",
      "Cette séparation entre l'expertise et la conduite opérationnelle est une garantie de méthode : elle évite que les contraintes d'organisation ne dictent le contenu des travaux.",
      '## Huit thématiques',
      "Les échanges ont permis d'identifier les principales thématiques qui structureront les consultations et les Assises : l'accès aux ressources, les réformes juridiques, l'autonomisation économique, la santé, le leadership, les violences basées sur le genre, la famille et la justice climatique.",
      "La présence de la justice climatique dans cette liste mérite d'être relevée. Elle traduit une lecture des droits des femmes qui ne les isole pas des transformations économiques et environnementales en cours, particulièrement sensibles dans les régions côtières et le bassin arachidier.",
      '## Les suites immédiates',
      "La réunion a également permis de présenter la feuille de route du processus, de discuter du plan de communication et d'identifier les actions prioritaires : la structuration du Comité de pilotage, la préparation des outils méthodologiques, la mobilisation des ressources et la finalisation des documents de cadrage.",
      "Le bilan du programme retient comme point fort l'implication des expertes dans le comité scientifique des Assises, ainsi que celle des organisations sœurs de défense des droits des femmes et des filles.",
    ],
  },
  {
    slug: 'feuille-de-route-comite-pilotage-assises-nationales-citoyennes',
    title: "Feuille de route et comité de pilotage : les Assises nationales citoyennes entrent en préparation",
    metaTitle: 'Assises citoyennes : feuille de route et comité de pilotage',
    metaDescription:
      "Au deuxième trimestre 2026, la feuille de route des Assises nationales citoyennes a été élaborée, un comité technique d'expert·e·s créé et le comité de pilotage installé.",
    keywords: [
      'Assises nationales citoyennes Sénégal',
      'pré-assises régionales',
      'comité de pilotage droits des femmes',
      'Naatal Jaboot Gui',
      'plaidoyer Code de la famille',
    ],
    excerpt:
      "Le processus préparatoire des Assises nationales citoyennes a été lancé au deuxième trimestre 2026 : feuille de route élaborée, comité technique d'expert·e·s créé, comité de pilotage installé.",
    program: PROGRAM.naatal,
    categories: [CATEGORY.plaidoyer, CATEGORY.societeCivile],
    image: {
      asset: IMAGE.copil,
      alt: "Séance de travail des membres du comité de pilotage des Assises nationales citoyennes sur les droits des femmes et des filles",
    },
    body: [
      "Après la réunion d'orientation de mars 2026, le deuxième trimestre a été consacré à transformer des décisions de principe en dispositif opérationnel. Trois étapes ont été franchies.",
      '## Une feuille de route',
      "Le processus préparatoire a été lancé avec l'élaboration d'une feuille de route comprenant un ensemble d'activités préalables qui conduiront à la tenue des Assises, notamment l'organisation des pré-assises au niveau national.",
      "Ces pré-assises régionales sont le cœur du dispositif. Des Assises nationales qui se tiendraient à Dakar sans travail préalable en région produiraient une parole de capitale ; les pré-assises sont ce qui permet aux conclusions de reposer sur des consultations réellement territorialisées.",
      '## Un comité technique',
      "Un comité technique composé d'expert·e·s a été créé pour accompagner le processus de préparation des Assises.",
      "Sa fonction est d'assurer que les constats portés devant les parlementaires soient étayés. Sur un sujet aussi disputé que la révision du Code de la famille, la solidité méthodologique est une condition de recevabilité du plaidoyer.",
      '## Un comité de pilotage installé',
      "Un atelier d'installation et de structuration du comité de pilotage des Assises nationales citoyennes sur les droits des femmes et des filles du Sénégal a été organisé.",
      "L'installation formelle d'un comité de pilotage marque le passage d'un projet porté par une organisation à un processus porté par un collectif. C'est aussi ce qui permet aux organisations partenaires de s'y engager avec un mandat clair.",
      '## Un jalon dans un plaidoyer plus large',
      "Le programme Naatal Jaboot Gui vise à réviser les dispositions discriminatoires du Code de la famille sénégalais, adopté en 1972 et jugé en décalage avec les réalités sociales, culturelles et économiques du Sénégal contemporain.",
      "Les Assises nationales citoyennes constituent l'instrument par lequel ce plaidoyer entend s'appuyer sur une délibération publique plutôt que sur la seule expertise — condition, pour une réforme du droit de la famille, d'une légitimité qui ne se limite pas aux organisations spécialisées.",
    ],
  },
  {
    slug: 'deuxieme-atelier-defenseurs-droits-humains-saly-mars-2026',
    title: "Deuxième atelier des défenseur·e·s des droits humains à Saly : protéger celles et ceux qui protègent",
    metaTitle: 'Atelier des défenseur·e·s des droits humains à Saly',
    metaDescription:
      "Du 10 au 12 mars 2026 à Saly, J-GEN Sénégal a réuni société civile et institutions autour de la protection des défenseur·e·s des droits humains face au rétrécissement de l'espace civique.",
    keywords: [
      'défenseurs des droits humains Sénégal',
      'espace civique rétrécissement',
      'protection des données personnelles CDP',
      'mouvements anti-droits',
      'organisations féministes Sénégal',
    ],
    excerpt:
      "Du 10 au 12 mars 2026, J-GEN Sénégal a organisé à Saly le deuxième atelier des Défenseur·e·s des Droits Humains, réunissant société civile, institutions publiques et partenaires.",
    program: PROGRAM.naatal,
    categories: [CATEGORY.societeCivile, CATEGORY.plaidoyer, CATEGORY.partenariat],
    body: [
      "Du 10 au 12 mars 2026, J-GEN Sénégal a organisé à Saly le deuxième atelier des Défenseur·e·s des Droits Humains, réunissant des organisations de la société civile, des institutions publiques et des partenaires engagés dans la promotion et la protection des droits humains.",
      '## Un contexte qui se referme',
      "L'atelier s'inscrivait dans un contexte précis, que ses organisatrices nomment sans détour : le rétrécissement de l'espace civique, la montée des mouvements anti-droits, la désinformation et les menaces croissantes auxquelles font face les défenseur·e·s des droits humains — en particulier les femmes et les organisations féministes.",
      "Cette précision compte. Les organisations féministes ne subissent pas seulement les contraintes communes à la société civile ; elles font l'objet d'attaques ciblées qui portent autant sur les personnes que sur les causes.",
      '## Trois jours, quatre chantiers',
      "Pendant trois jours, les participant·e·s ont échangé sur les enjeux liés à la sécurité des défenseur·e·s, à la protection des données personnelles, à la désinformation et aux mouvements anti-droits, ainsi qu'aux cadres juridiques et institutionnels de protection des droits humains.",
      "L'atelier visait à renforcer les capacités stratégiques, juridiques et collectives des défenseur·e·s, à consolider les mécanismes de protection existants et à favoriser une meilleure coordination entre les acteurs.",
      '## Des institutions autour de la table',
      "Les discussions ont été enrichies par les interventions de la Commission de Protection des Données Personnelles, de la Commission Nationale des Droits de l'Homme, d'Amnesty International et du Forum Civil.",
      "Ces contributions ont permis de clarifier les mécanismes de recours existants, de renforcer la compréhension des textes relatifs à l'accès à l'information et à la protection des lanceurs d'alerte, et de mettre en lumière les défis persistants liés à la protection des défenseur·e·s.",
      "La présence conjointe d'institutions publiques et d'organisations de plaidoyer dans un même atelier est en soi un résultat : elle transforme des interlocuteurs distants en acteurs d'un dispositif commun.",
      '## Un plan d\'action commun pour 2026',
      "Les participant·e·s ont élaboré un plan d'action commun pour 2026 articulé autour de quatre axes : la mise en place d'un cadre de concertation national, le renforcement des capacités des défenseur·e·s, le plaidoyer pour l'adoption d'une loi spécifique de protection des défenseur·e·s des droits humains, et le développement de mécanismes d'alerte et de protection collective.",
      '## Les recommandations',
      "Au terme de la rencontre, plusieurs recommandations ont été formulées : le renforcement des capacités des organisations de la société civile, l'élaboration de stratégies de plaidoyer concertées, l'amélioration de la protection des données personnelles, et le renforcement de la collaboration entre institutions publiques, médias, organisations de la société civile et partenaires techniques.",
      "L'atelier a également favorisé le partage d'expériences entre organisations féminines et féministes, soulignant l'importance des synergies, du partage d'informations et de la création d'espaces sûrs pour les défenseures des droits humains. Le bilan du trimestre retient comme point fort la participation inclusive des organisations de la société civile.",
    ],
  },

  // ─────────────────────────── ARTICLES DE FOND ───────────────────────────
  {
    slug: 'mouvement-pas-a-pas-quatre-sous-mouvements-plaidoyer',
    title: "Jeunes, communautaires, médias, religieux : comment se construit un mouvement de plaidoyer pour la justice reproductive",
    metaTitle: 'Comment se construit un mouvement de plaidoyer au Sénégal',
    metaDescription:
      "Quatre sous-mouvements, deux groupes de travail, un argumentaire religieux : anatomie de la méthode du mouvement Pas à Pas pour la justice reproductive au Sénégal.",
    keywords: [
      'justice reproductive Sénégal',
      'mouvement de plaidoyer méthode',
      'avortement sécurisé viol inceste',
      'acteurs religieux droits reproductifs',
      'mobilisation communautaire DSSR',
    ],
    excerpt:
      "Le mouvement Pas à Pas est structuré autour de quatre sous-mouvements : les jeunes, les acteurs communautaires, les professionnels des médias et les acteurs religieux. Cette architecture est un choix de méthode.",
    program: PROGRAM.pasAPas,
    categories: [CATEGORY.plaidoyer, CATEGORY.santeReproductive, CATEGORY.feminisme],
    image: {
      asset: IMAGE.pasAPas2,
      alt: "Travaux de groupe lors d'une formation du programme PAS À PAS à Pikine, Tivaouane Peulh et Patte d'Oie",
    },
    body: [
      "Sur les questions de droits reproductifs, l'échec le plus courant d'une campagne de plaidoyer n'est pas de manquer d'arguments. C'est de n'être audible que par celles et ceux qui étaient déjà convaincus. Le mouvement Pas à Pas, dynamique communautaire de promotion de la justice reproductive au Sénégal, a construit sa méthode autour de ce problème.",
      '## Quatre sous-mouvements plutôt qu\'une coalition',
      "Le mouvement est structuré autour de quatre sous-mouvements : les jeunes, les acteurs communautaires, les professionnels des médias et les acteurs religieux.",
      "La différence avec une coalition d'organisations est réelle. Une coalition rassemble des structures qui partagent une position ; les sous-mouvements rassemblent des milieux qui ne la partagent pas nécessairement au départ et qui travaillent chacun à l'intérieur de son propre champ de légitimité.",
      "Un argument porté par un jeune leader dans son quartier, par un journaliste dans sa rédaction, par une actrice communautaire dans son réseau et par un acteur religieux dans son cadre de référence ne produit pas quatre fois le même effet. Il produit quatre effets différents, chacun recevable là où les trois autres ne le seraient pas.",
      '## Le travail avec les acteurs religieux',
      "Le sous-mouvement religieux illustre le mieux cette logique. Plutôt que d'opposer un discours de droits à un discours de foi, le programme a engagé un travail de fond avec les mouvements de l'ANAR/JRS pour construire un argumentaire religieux.",
      "Ce travail s'est appuyé sur deux groupes distincts : le Groupe Revue Littéraire, chargé du travail sur les sources, et le Groupe Approche, Contenu et Méthodologie, chargé de la structure du document et de son adresse. Deux rencontres en ligne et une rencontre en présentiel ont permis d'analyser, de relire et d'harmoniser le contenu, jusqu'à consolider et finaliser l'argumentaire.",
      "Restait, à l'issue du processus, à intégrer la version arabe pour disposer d'un document complet — condition de sa circulation auprès d'une partie des destinataires visés.",
      '## L\'enrôlement plutôt que la sensibilisation',
      "Le deuxième trait de méthode tient au vocabulaire. Le programme ne parle pas de sensibiliser des jeunes mais de les enrôler : soixante jeunes leaders ont ainsi rejoint le mouvement, dans les communes de Pikine Nord et Est, Tivaouane Peulh et Patte d'Oie.",
      "Un public sensibilisé reçoit un message. Une personne enrôlée accepte un rôle, se forme, élabore un plan d'action et devient responsable d'une part du travail. Les formations conduites à Pikine, Tivaouane Peulh et Patte d'Oie ont porté sur les DSSR, sur les argumentaires de plaidoyer et sur les stratégies de réponse aux mouvements anti-droits.",
      '## Anticiper l\'opposition organisée',
      "Ce dernier point marque une évolution notable. Les formations n'abordent plus seulement ce qu'il faut dire, mais ce à quoi il faut s'attendre : une opposition organisée, souvent transnationale, qui conteste les faits autant que les revendications et qui maîtrise les codes de la communication en ligne.",
      "Former à comprendre ces mouvements avant d'y répondre permet de distinguer une objection sincère d'une stratégie de disqualification — deux situations qui n'appellent pas la même réponse.",
      '## Ce que vise le mouvement',
      "Le programme PAS À PAS, mis en œuvre avec l'appui d'IPAS et d'AmplifyChange, vise à renforcer le plaidoyer en faveur de l'accès à l'avortement sécurisé dans les cas de viol ou d'inceste, en mobilisant acteurs communautaires, leaders religieux, jeunes leaders et professionnels des médias au sein d'une plateforme d'acteurs engagés.",
      "Les participant·e·s aux formations se sont portés volontaires pour démultiplier les acquis auprès de leurs pairs. C'est, à l'échelle d'un trimestre, le signe que l'architecture fonctionne comme prévu : le mouvement s'étend par ses membres plutôt que par ses campagnes.",
    ],
  },
  {
    slug: 'quatre-dispositions-discriminatoires-code-famille-senegalais',
    title: "Âge du mariage, autorité parentale, refus de paternité, domicile conjugal : quatre dispositions du Code de la famille en question",
    metaTitle: 'Quatre dispositions discriminatoires du Code de la famille',
    metaDescription:
      "Âge légal du mariage des filles, autorité parentale, refus de paternité, choix du domicile conjugal : les quatre points de révision du Code de la famille identifiés par les acteurs de terrain.",
    keywords: [
      'Code de la famille sénégalais révision',
      'dispositions discriminatoires femmes Sénégal',
      'autorité parentale Sénégal',
      'âge légal du mariage filles',
      'domicile conjugal droit sénégalais',
    ],
    excerpt:
      "Les acteurs communautaires du programme KIIRAY ont identifié quatre dispositions du Code de la famille sénégalais dont ils demandent la révision. Ces quatre points recoupent le plaidoyer porté par le programme Naatal Jaboot Gui.",
    program: PROGRAM.naatal,
    categories: [CATEGORY.plaidoyer, CATEGORY.feminisme, CATEGORY.societeCivile],
    image: {
      asset: IMAGE.codeFamille,
      alt: "Rassemblement communautaire de femmes lors d'une rencontre de plaidoyer de J-GEN Sénégal",
    },
    body: [
      "Adopté en 1972, le Code de la famille sénégalais régit depuis plus de cinquante ans la vie familiale et les rapports entre hommes, femmes et enfants. Le plaidoyer pour sa révision est ancien. Ce qui est plus récent, c'est la précision avec laquelle les acteurs de terrain désignent aujourd'hui les dispositions à modifier.",
      "Au terme du deuxième trimestre 2026, les recommandations issues du programme KIIRAY — porté par des collectivités territoriales, des Bajenu Gox et des acteurs communautaires — nomment quatre points précis.",
      '## L\'âge légal du mariage des filles',
      "Le premier point porte sur l'âge légal du mariage pour les filles, et sur la demande de l'établir à égalité avec celui des garçons.",
      "Ce n'est pas une question symbolique. Les cercles de sororité organisés à Yoff par le projet JVSSR ont identifié les mariages précoces et forcés comme l'un des premiers défis auxquels les jeunes filles disent être confrontées, aux côtés des abandons scolaires — les deux étant étroitement liés.",
      '## L\'autorité parentale',
      "Le deuxième point concerne l'autorité parentale et sa répartition entre les parents.",
      "Les conséquences pratiques de cette répartition se mesurent dans des situations très concrètes : inscrire un enfant à l'école, autoriser un acte médical, entreprendre une démarche administrative. Une mère qui ne détient pas l'autorité sur ces décisions dépend, pour la vie quotidienne de son enfant, d'un accord qu'elle n'est pas toujours en position d'obtenir.",
      '## Le refus de paternité',
      "Le troisième point porte sur le refus de paternité.",
      "Il touche directement la situation des jeunes femmes mères célibataires — précisément le public auquel s'adresse le projet LIGGEEYAL ËLËG, qui vise l'autonomisation de jeunes filles non scolarisées et de mères célibataires de 16 à 35 ans. La reconnaissance de la filiation détermine l'accès de l'enfant à des droits, et la charge, économique et sociale, qui pèse sur sa mère.",
      '## Le choix du domicile conjugal',
      "Le quatrième point concerne le choix du domicile conjugal, généralement attribué à l'époux.",
      "C'est peut-être celui dont l'effet est le plus direct sur les situations de violence. Décider du lieu de vie du couple, c'est décider de la proximité ou de l'éloignement d'une femme par rapport à sa famille d'origine, à son emploi et à son réseau de soutien. Or l'isolement est l'un des facteurs qui rendent une violence conjugale durable.",
      '## Pourquoi cette liste vient du terrain',
      "L'origine de ces quatre recommandations mérite d'être soulignée. Elles ne proviennent pas d'un travail juridique mené en chambre, mais du bilan d'un programme dont les actrices — Bajenu Gox, élues locales, acteurs communautaires — sont au contact quotidien des situations.",
      "Autrement dit : ce sont des personnes qui accompagnent des femmes dans leurs démarches concrètes qui identifient, dans le droit, les points de blocage récurrents. Le même bilan formule d'ailleurs une seconde recommandation, sur l'amélioration des conditions de travail de ces actrices communautaires.",
      '## Le lien avec les Assises nationales citoyennes',
      "Ces quatre points recoupent l'objet du programme Naatal Jaboot Gui, financé par l'African Women's Development Fund, qui vise à promouvoir un engagement parlementaire en faveur de la révision des dispositions discriminatoires du Code de la famille.",
      "C'est également l'un des huit thèmes retenus pour les Assises nationales citoyennes sur les droits des femmes et des filles, annoncées du 25 au 27 novembre 2026 : les réformes juridiques y figurent aux côtés de l'accès aux ressources, de l'autonomisation économique, de la santé, du leadership, des violences basées sur le genre, de la famille et de la justice climatique.",
    ],
  },
  {
    slug: 'budget-sensible-au-genre-lutte-contre-les-vbg-communes',
    title: "Budget sensible au genre : comment une commune finance réellement la lutte contre les violences",
    metaTitle: 'Budget sensible au genre et lutte contre les VBG',
    metaDescription:
      "Diagnostic participatif, budget sensible au genre, budget participatif, redevabilité : les outils par lesquels une commune sénégalaise passe de l'intention à la dépense contre les VBG.",
    keywords: [
      'budget sensible au genre',
      'budgétisation sensible au genre Sénégal',
      'gouvernance locale genre',
      'collectivités territoriales VBG',
      'budget participatif redevabilité',
    ],
    excerpt:
      "Entre condamner les violences faites aux femmes et y consacrer une ligne budgétaire, il y a une série d'outils de gestion publique. Le programme KIIRAY en fait le cœur de sa méthode.",
    program: PROGRAM.kiiray,
    categories: [CATEGORY.gouvernanceLocale, CATEGORY.violencesSexuelles, CATEGORY.programme],
    image: {
      asset: IMAGE.bajenugox2,
      alt: "Participantes à l'atelier national des Bajenu Gox consacré à la prévention des violences basées sur le genre",
    },
    body: [
      "Une politique publique se lit dans un budget avant de se lire dans un discours. C'est le principe de départ du budget sensible au genre, et c'est ce qui fonde la méthode du programme KIIRAY au Sénégal.",
      '## Ce qu\'est un budget sensible au genre',
      "Le budget sensible au genre ne consiste pas à créer une ligne « femmes » dans le budget d'une collectivité. Il consiste à examiner l'ensemble des dépenses en se demandant qui en bénéficie réellement.",
      "Un budget qui paraît neutre ne l'est presque jamais dans ses effets. L'éclairage public d'un marché, la desserte en transport d'un quartier, les horaires d'ouverture d'un poste de santé : chacune de ces décisions modifie concrètement la sécurité et la mobilité des femmes, sans jamais être présentée comme une mesure de genre.",
      '## Le diagnostic participatif comme point de départ',
      "Le programme KIIRAY commence par un diagnostic participatif conduit dans chaque commune d'intervention, pour identifier les défis et les besoins réellement exprimés par les populations.",
      "Ces diagnostics ont fait ressortir quatre champs : les violences basées sur le genre, l'autonomisation économique des femmes, l'accès aux services sociaux et la participation citoyenne. Ce sont ces constats, et non un modèle importé, qui déterminent ensuite ce qui sera budgété.",
      '## Du diagnostic au plan budgétisé',
      "L'étape suivante est celle que la plupart des démarches ne franchissent jamais : la traduction du diagnostic en plan d'action local élaboré et budgétisé.",
      "Trois plans de ce type ont été produits, à Fatick, à Diamaguène Sicap Mbao et à Yoff. Un plan budgétisé chiffre, désigne des responsables, et devient opposable lors des exercices de reddition des comptes. Il transforme une intention en engagement vérifiable.",
      '## Trois outils complémentaires',
      "Les rencontres organisées dans le cadre du programme ont porté sur un ensemble d'instruments de gestion publique : la gouvernance sensible au genre, le Budget Sensible au Genre, le budget participatif et les mécanismes de redevabilité.",
      "Ces outils fonctionnent ensemble. Le budget participatif associe les habitantes à l'affectation des ressources ; la gouvernance sensible au genre garantit que cette participation ne se limite pas à une consultation formelle ; les mécanismes de redevabilité permettent de vérifier, l'année suivante, que la dépense annoncée a été exécutée.",
      '## Le rôle des actrices communautaires',
      "Un dispositif budgétaire n'atteint les femmes concernées que si des personnes de confiance font le lien. C'est le rôle que le programme reconnaît aux Bajenu Gox, ces marraines de quartier qui constituent depuis des années un maillon de la santé communautaire, et dont KIIRAY a consolidé la feuille de route en matière de prévention et de prise en charge des violences basées sur le genre.",
      '## La difficulté qui demeure',
      "Le bilan du programme identifie un point de fragilité qui vaut d'être énoncé sans détour : la synergie entre les acteurs communautaires et les services techniques des collectivités reste à renforcer.",
      "C'est le point de passage obligé de toute cette démarche. Un plan budgétisé n'a d'effet que si les services chargés de l'exécuter travaillent effectivement avec celles et ceux qui ont participé à son élaboration. Sans cela, le document existe et rien ne change.",
    ],
  },
  {
    slug: 'ce-que-les-jeunes-filles-de-yoff-disent-des-violences',
    title: "Mariages précoces, abandons scolaires, violences conjugales : ce que les jeunes filles de Yoff identifient elles-mêmes",
    metaTitle: 'Ce que les jeunes filles de Yoff disent des violences',
    metaDescription:
      "Mariages précoces et forcés, abandons scolaires, violences conjugales, psychologiques, verbales et économiques : les défis identifiés par les jeunes filles de Yoff elles-mêmes.",
    keywords: [
      'mariages précoces et forcés Sénégal',
      'abandon scolaire filles',
      'violences conjugales psychologiques économiques',
      'normes sociales discriminatoires',
      'jeunes filles Yoff DSSR',
    ],
    excerpt:
      "Lors des cercles de sororité de Ndenatte et Therme Nord, ce sont les participantes elles-mêmes qui ont nommé les principaux défis auxquels elles font face. Leur liste constitue un diagnostic.",
    program: PROGRAM.jvssr,
    categories: [CATEGORY.violencesSexuelles, CATEGORY.santeReproductive, CATEGORY.feminisme],
    image: {
      asset: IMAGE.cercles,
      alt: "Travaux de groupe lors d'un cercle de sororité du projet JVSSR à Yoff",
    },
    body: [
      "Les diagnostics sur les violences faites aux filles sont le plus souvent établis par des personnes qui ne les subissent pas. À Yoff, au deuxième trimestre 2026, la liste a été dressée par les intéressées elles-mêmes.",
      "Lors de deux cercles de sororité organisés dans les quartiers de Ndenatte et de Therme Nord, des adolescentes et de jeunes femmes ont identifié les principaux défis auxquels elles sont confrontées dans leurs communautés : les mariages précoces et forcés, les abandons scolaires, les violences conjugales, psychologiques, verbales et économiques, ainsi que les normes sociales discriminatoires.",
      '## Une liste qui se tient d\'un bout à l\'autre',
      "Ce qui frappe dans cet énoncé, c'est sa cohérence interne. Ce ne sont pas cinq problèmes distincts, mais les maillons d'un même enchaînement.",
      "Un mariage précoce interrompt une scolarité. Une scolarité interrompue ferme l'accès à un revenu propre. L'absence de revenu propre installe une dépendance économique. La dépendance économique rend une violence conjugale difficile à quitter. Et les normes sociales discriminatoires font tenir l'ensemble en le présentant comme l'ordre naturel des choses.",
      '## Les violences économiques et verbales, rarement nommées',
      "La liste mentionne les violences psychologiques, verbales et économiques au même rang que les violences conjugales. C'est une précision qui compte.",
      "Les campagnes de sensibilisation portent le plus souvent sur les violences physiques et sexuelles, qui laissent des traces et relèvent d'une qualification pénale identifiable. Les violences économiques — priver une femme de ses revenus, contrôler ses dépenses, l'empêcher de travailler — sont plus difficiles à nommer parce qu'elles se confondent avec des arrangements familiaux jugés ordinaires.",
      "Que des jeunes femmes les citent spontanément indique qu'un travail de nomination a eu lieu. C'est précisément l'objet de ces cercles.",
      '## Ce que les cercles apportent',
      "Les participantes ont renforcé leurs connaissances sur la citoyenneté active, sur les notions de genre et de sexe, sur les droits fondamentaux et sur les différentes formes de violences basées sur le genre.",
      "La distinction entre genre et sexe est l'outil décisif de cette séquence. Elle permet de comprendre qu'une répartition des rôles présentée comme naturelle est une construction sociale — et donc qu'elle peut être discutée, ce que le mot « nature » interdisait.",
      '## Une parole rendue possible',
      "Le bilan du projet relève que l'approche communautaire a permis de briser des sujets tabous au sein de la communauté traditionnelle lébou, et souligne la diversité des profils réunis ainsi que la qualité de la mobilisation.",
      "Ces cercles s'appuient sur une étude préalable portant sur les perceptions de la communauté de Yoff en matière de droits en santé sexuelle et reproductive et de violences basées sur le genre, dont les résultats ont été restitués à l'ensemble des parties prenantes du projet.",
      '## De la parole au relais',
      "Le résultat que le projet retient en premier n'est pas un chiffre de participation mais un déplacement de position : un engagement accru des participantes à agir comme relais communautaires.",
      "Les jeunes femmes qui ont nommé ces violences deviennent celles qui aideront d'autres à les nommer. C'est le mécanisme sur lequel repose le projet Jeunes Volontaires pour la Santé Sexuelle et Reproductive, mis en œuvre à Yoff avec le soutien de Speak Up Africa dans le cadre de l'Initiative Voix Essentielles.",
    ],
  },
]

async function main() {
  console.log(`${articles.length} article(s) à créer ou mettre à jour.\n`)

  for (const article of articles) {
    const document = toDocument(article)

    // Un brouillon peut exister sans version publiée : on cherche les deux.
    const existing = await client.fetch<{_id: string} | null>(
      `*[_type == "post" && slug.current == $slug][0]{_id}`,
      {slug: article.slug},
    )

    if (existing) {
      const draftId = existing._id.startsWith('drafts.') ? existing._id : `drafts.${existing._id}`
      await client.createOrReplace({...document, _id: draftId})
      console.log(`  ↻ ${article.slug}`)
    } else {
      await client.create({...document, _id: `drafts.${crypto.randomUUID()}`})
      console.log(`  + ${article.slug}`)
    }
  }

  console.log(`\nTerminé. Tous les articles sont en BROUILLON et attendent votre relecture.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
