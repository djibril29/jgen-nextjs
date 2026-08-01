/**
 * ============================================================================
 * NEWSLETTER SEMESTRIELLE J-GEN SÉNÉGAL — JANVIER À JUIN 2026
 * ----------------------------------------------------------------------------
 * SOURCE UNIQUE DE VÉRITÉ pour :
 *   - la page web        app/newsletter/semestre-1-2026/page.tsx
 *   - le template e-mail emails/newsletter-semestre-1-2026.tsx
 *   - le script          scripts/generate-newsletter-semestre-1-2026.tsx
 *
 * Aucun de ces trois fichiers ne doit contenir de texte éditorial en dur.
 * Pour corriger un contenu, il suffit de modifier CE fichier puis de relancer
 * `npm run email:generate`.
 * ----------------------------------------------------------------------------
 * PROVENANCE DU CONTENU
 * Rapports trimestriels J-GEN Sénégal : janvier-mars 2026 (T1) et
 * avril-juin 2026 (T2). Aucun chiffre, témoignage, citation ou résultat n'a
 * été ajouté, extrapolé ou agrégé. Les activités PRÉVUES ne sont jamais
 * présentées comme RÉALISÉES.
 * ----------------------------------------------------------------------------
 * ⚠️  GRAPHIE DES PROGRAMMES — À VALIDER PAR J-GEN
 * Les rapports emploient plusieurs graphies concurrentes (« Naatal Ndiabote
 * Gui » / « Naatal Jaboot Gui » / « Naatal Jaboot Gi », « KIIRAY » / « KIIRAAY »,
 * « Bajenu Gox » / « Badienou Gox »). Aucune de ces dénominations n'apparaît
 * ailleurs sur le site jgen.sn : il n'existe donc pas de graphie officielle
 * déjà établie à reprendre.
 * Les formes retenues ci-dessous sont PROVISOIRES et appliquées de manière
 * cohérente partout. Elles doivent être confirmées avant publication :
 *   → « Naatal Jaboot Gui », « KIIRAY », « Bajenu Gox », « Liggeyal Ëlëg »,
 *     « PAS À PAS », « ELLES AUSSI », « JVSSR ».
 * Voir également le tableau `validationNotes` en fin de fichier.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Référence à un visuel, par NOM DE BASE (sans extension). Voir lib/newsletter-image.ts */
export type NewsletterImageRef = {
  /** Nom de base du fichier à déposer dans public/newsletter/, ex. "cover" */
  name: string
  /** Texte alternatif descriptif — obligatoire (accessibilité page + e-mail) */
  alt: string
}

export type NewsletterStatistic = {
  id: string
  value: string
  label: string
  /** D'où vient ce chiffre — affiché pour éviter toute lecture ambiguë */
  context: string
  /** Retenu dans la version e-mail (5 maximum) */
  inEmail: boolean
}

export type NewsletterPeriod = "T1" | "T2" | "Semestre"

export type NewsletterAchievementGroup = {
  period: NewsletterPeriod
  /** Libellé lisible, ex. « Janvier – mars 2026 » */
  periodLabel: string
  items: string[]
}

export type NewsletterProject = {
  id: string
  name: string
  category: string
  summary: string
  achievements: NewsletterAchievementGroup[]
  locations?: string[]
  partnerNames?: string[]
  image?: NewsletterImageRef
  /**
   * Lien sortant. Soit une URL réelle du site, soit une ancre interne à la
   * page newsletter. Aucune page projet fictive n'est créée.
   */
  href?: string
  /** Résumé court réservé à l'e-mail (2-3 phrases) */
  emailSummary?: string
}

export type NewsletterAxis = {
  id: string
  number: number
  title: string
  intro: string
  projectIds: string[]
  /** Résumé court de l'axe, utilisé dans l'e-mail */
  emailTitle: string
  emailSummary: string
}

export type NewsletterHighlight = {
  id: string
  title: string
  date?: string
  place?: string
  body: string
  details?: string[]
  image?: NewsletterImageRef
}

export type NewsletterTimelineBlock = {
  id: string
  period: string
  label: string
  entries: { label: string; text: string }[]
}

export type ValidationNote = {
  id: string
  subject: string
  issue: string
  action: string
}

// ---------------------------------------------------------------------------
// Contenu
// ---------------------------------------------------------------------------

const PAGE_PATH = "/newsletter/semestre-1-2026"

/**
 * Projets du semestre.
 * Le tableau est ANNOTÉ (et non `satisfies`) afin que `projects.find(...)`
 * renvoie bien un `NewsletterProject` dans les composants et le template e-mail,
 * plutôt qu'une union de types littéraux difficile à manipuler.
 */
const projects: NewsletterProject[] = [
  {
    id: "elles-aussi",
    name: "ELLES AUSSI",
    category: "Prévention des VBG et accompagnement des survivantes",
    summary:
      "Mis en œuvre dans la région de Fatick, ELLES AUSSI vise à renforcer la prévention des violences basées sur le genre et à améliorer la prise en charge communautaire des survivantes.",
    locations: ["Fatick", "Diouroup", "Niakhar"],
    href: "#elles-aussi",
    image: {
      name: "elles-aussi",
      alt: "Cercle de guérison réunissant des participantes dans un espace d'écoute à Niakhar",
    },
    emailSummary:
      "À Niakhar, quatre cercles de guérison ont réuni 38 survivantes dans des espaces confidentiels et sécurisés, centrés sur l'écoute et le care. Ces temps ont favorisé l'expression émotionnelle, la cohésion et la sororité.",
    achievements: [
      {
        period: "T1",
        periodLabel: "Janvier – mars 2026",
        items: [
          "Quatre cercles de guérison organisés à Niakhar.",
          "38 survivantes ont participé, réparties en quatre groupes.",
          "Des espaces confidentiels et sécurisés, centrés sur l'écoute et le care.",
          "Des activités qui ont favorisé l'expression émotionnelle, la cohésion, la solidarité et la sororité.",
          "Besoins identifiés : accompagnement psychosocial durable, création d'espaces sûrs permanents, autonomisation économique et amélioration de l'accès à la justice.",
        ],
      },
    ],
  },
  {
    id: "kiiray",
    name: "KIIRAY",
    category: "Résilience communautaire et institutionnelle",
    summary:
      "KIIRAY vise à renforcer la résilience communautaire et institutionnelle face aux violences basées sur le genre. Le programme travaille avec les collectivités territoriales, les acteurs communautaires, les services techniques et les communautés, et promeut la gouvernance sensible au genre, la budgétisation sensible au genre, le budget participatif et la redevabilité.",
    locations: [
      "Fatick",
      "Diamaguène Sicap Mbao",
      "Yoff",
      "Biscuiterie/Grand-Dakar",
      "Ouakam/Sacré-Cœur",
    ],
    href: "#kiiray",
    // Fichier fourni : bajenugox.png — rattaché à l'atelier national du T2 sur le
    // rôle des Bajenu Gox. ⚠️ À confirmer par J-GEN : les Bajenu Gox interviennent
    // aussi comme association encadrante dans Liggeyal Ëlëg.
    image: {
      name: "bajenugox",
      alt: "Atelier national consacré au rôle des Bajenu Gox dans le cadre du programme KIIRAY",
    },
    emailSummary:
      "Trois plans d'action locaux ont été élaborés et budgétisés à Fatick, Diamaguène Sicap Mbao et Yoff. Un atelier national a été consacré au rôle des Bajenu Gox, et des dialogues intergénérationnels ont été organisés à Dakar.",
    achievements: [
      {
        period: "T1",
        periodLabel: "Janvier – mars 2026",
        items: [
          "Lancements officiels organisés à Diamaguène Sicap Mbao et à Yoff.",
          "Diagnostics participatifs réalisés.",
          "Trois plans d'action locaux élaborés et budgétisés à Fatick, Diamaguène Sicap Mbao et Yoff.",
          "Des rencontres qui ont renforcé l'appropriation du programme par les parties prenantes.",
        ],
      },
      {
        period: "T2",
        periodLabel: "Avril – juin 2026",
        items: [
          "Atelier national de renforcement des capacités et de plaidoyer autour du rôle des Bajenu Gox.",
          "Atelier de validation de leur plan d'action.",
          "Feuille de route commune consolidée.",
          "Dialogues intergénérationnels organisés à Biscuiterie/Grand-Dakar et Ouakam/Sacré-Cœur.",
          "Des dialogues portant sur les violences sexuelles et sexistes ainsi que sur la prévention, la protection et la promotion des droits des femmes et des filles.",
        ],
      },
    ],
  },
  {
    id: "pas-a-pas",
    name: "PAS À PAS",
    category: "Plaidoyer pour la justice reproductive",
    summary:
      "PAS À PAS est un programme de plaidoyer pour la justice reproductive. Il mobilise les jeunes, les acteurs communautaires, les professionnels des médias et les acteurs religieux. Le programme porte sur les DSSR et le plaidoyer pour l'accès à l'avortement sécurisé en cas de viol ou d'inceste.",
    locations: ["Pikine", "Tivaouane Peulh", "Patte d'Oie"],
    partnerNames: ["IPAS", "AmplifyChange"],
    href: "#pas-a-pas",
    // Fichier fourni : pasapas1.png (un second visuel pasapas2.png est disponible
    // dans le dossier et peut être substitué en changeant ce seul nom).
    image: {
      name: "pasapas1",
      alt: "Session de formation de jeunes leaders sur les droits et la santé sexuels et reproductifs",
    },
    emailSummary:
      "L'argumentaire religieux a été enrichi et validé avec les acteurs religieux, et 60 jeunes leaders ont été enrôlés. Des formations à Pikine, Tivaouane Peulh et Patte d'Oie ont renforcé leurs compétences en plaidoyer.",
    achievements: [
      {
        period: "T1",
        periodLabel: "Janvier – mars 2026",
        items: [
          "Deux rencontres en ligne et une rencontre en présentiel organisées avec les acteurs religieux.",
          "Des rencontres qui ont permis de renforcer, enrichir et valider l'argumentaire religieux.",
          "Document consolidé et finalisé, sous réserve de l'intégration de sa version arabe.",
          "Lancement d'un processus d'enrôlement des jeunes et des acteurs communautaires.",
          "60 jeunes leaders enrôlés selon le tableau des indicateurs.",
        ],
      },
      {
        period: "T2",
        periodLabel: "Avril – juin 2026",
        items: [
          "Formations organisées à Pikine, Tivaouane Peulh et Patte d'Oie.",
          "Sessions portant sur les DSSR, les argumentaires de plaidoyer et les stratégies de compréhension et de réponse aux mouvements anti-droits.",
          "Connaissances et compétences des jeunes renforcées.",
          "Plans d'action élaborés pour soutenir les initiatives futures.",
          "Volonté exprimée par les participant·e·s de démultiplier les acquis auprès de leurs pairs.",
        ],
      },
    ],
  },
  {
    id: "jvssr",
    name: "JVSSR",
    category: "Jeunes Volontaires pour la Santé Sexuelle et Reproductive",
    summary:
      "Le projet Jeunes Volontaires pour la Santé Sexuelle et Reproductive est mis en œuvre dans la commune de Yoff avec le soutien de Speak Up Africa, dans le cadre de l'Initiative Voix Essentielles. Il vise à améliorer l'accès des adolescent·e·s et des jeunes à des informations fiables et à des services préventifs en matière de santé sexuelle et reproductive.",
    locations: ["Yoff", "Ndenatte", "Therme Nord"],
    partnerNames: ["Speak Up Africa", "Initiative Voix Essentielles"],
    href: "#jvssr",
    image: {
      name: "jvssr",
      alt: "Cercle de sororité réunissant des jeunes femmes à Yoff",
    },
    emailSummary:
      "Une étude sur les perceptions de la communauté de Yoff en matière de DSSR et de VBG a été réalisée puis restituée aux parties prenantes. Deux cercles de sororité ont été organisés à Ndenatte et Therme Nord.",
    achievements: [
      {
        period: "T1",
        periodLabel: "Janvier – mars 2026",
        items: [
          "Plan d'action et budget du projet validés.",
          "Lancement du processus de recrutement d'un consultant.",
          "L'étude prévue devait porter sur les perceptions de la population concernant le genre et la santé reproductive.",
        ],
      },
      {
        period: "T2",
        periodLabel: "Avril – juin 2026",
        items: [
          "Étude réalisée sur les perceptions de la communauté de Yoff en matière de DSSR et de VBG.",
          "Résultats restitués aux parties prenantes.",
          "Deux cercles de sororité organisés à Ndenatte et Therme Nord.",
          "Participantes ayant approfondi leurs connaissances sur la citoyenneté active, les notions de genre et de sexe, les droits fondamentaux et les différentes formes de VBG.",
          "Échanges ayant fait ressortir les mariages précoces et forcés, les abandons scolaires, les violences conjugales, psychologiques, verbales et économiques, ainsi que les normes sociales discriminatoires.",
          "Engagement accru des participantes à agir comme relais communautaires.",
        ],
      },
    ],
  },
  {
    id: "liggeyal-eleg",
    name: "Liggeyal Ëlëg",
    category: "Autonomisation économique et sociale",
    summary:
      "Liggeyal Ëlëg est un projet d'autonomisation économique et sociale destiné aux jeunes filles non scolarisées ou déscolarisées, aux jeunes femmes vulnérables et aux mères célibataires âgées de 16 à 35 ans.",
    locations: ["Fatick", "Kaolack"],
    partnerNames: [
      "Association Action pour le Développement du Sénégal (Kaolack)",
      "Association des Bajenu Gox de Fatick",
    ],
    href: "#liggeyal-eleg",
    image: {
      name: "liggeyal-eleg",
      alt: "Session de formation professionnelle réunissant des membres d'un GIE de jeunes femmes",
    },
    emailSummary:
      "Six GIE ont été créés et formalisés à Fatick et Kaolack. Des formations ont été organisées en pâtisserie, saponification, restauration et teinture, sous la supervision de partenaires associatifs locaux.",
    achievements: [
      {
        period: "Semestre",
        periodLabel: "Janvier – juin 2026",
        items: [
          "Six GIE créés et formalisés.",
          "À Kaolack — pâtisserie avec le GIE « Les Amazones villageoises de Gandiaye ».",
          "À Kaolack — saponification avec le GIE « Mbogga Yiff des jeunes femmes de Sibassor ».",
          "À Kaolack — restauration avec le GIE « Les jeunes femmes autonomes de Kaolack ».",
          "À Fatick — teinture avec le GIE « Niak Dieurignou ».",
          "À Fatick — pâtisserie avec le GIE « Ligueyal Sama Gokh ».",
          "À Fatick — pâtisserie avec le GIE « Mbokator Ndamite Rew wé ».",
          "Sessions supervisées par l'Association Action pour le Développement du Sénégal à Kaolack et l'Association des Bajenu Gox de Fatick.",
        ],
      },
    ],
  },
  {
    id: "naatal-jaboot-gui",
    name: "Naatal Jaboot Gui",
    category: "Réforme du Code de la famille et dialogue citoyen",
    summary:
      "Le programme vise notamment à soutenir le plaidoyer en faveur de la révision des dispositions discriminatoires du Code de la famille. Il cherche à créer un dialogue entre les parlementaires et les communautés, particulièrement les femmes.",
    href: "#naatal-jaboot-gui",
    image: {
      name: "naatal-jaboot-gui",
      alt: "Réunion d'orientation réunissant les parties prenantes du programme Naatal Jaboot Gui",
    },
    emailSummary:
      "Une réunion d'orientation tenue les 16 et 17 mars 2026 a défini les orientations stratégiques, organisationnelles et méthodologiques des Assises nationales citoyennes.",
    achievements: [
      {
        period: "T1",
        periodLabel: "Janvier – mars 2026",
        items: [
          "Réunion d'orientation tenue les 16 et 17 mars 2026 à Sama Hôtel, aux Almadies.",
          "Orientations stratégiques, organisationnelles et méthodologiques des Assises nationales citoyennes définies.",
          "Un Comité technique et un Comité de pilotage ont été prévus.",
          "Thématiques identifiées : accès aux ressources, réformes juridiques, autonomisation économique, santé, leadership, VBG, famille et justice climatique.",
        ],
      },
    ],
  },
  {
    id: "assises",
    name: "Assises nationales citoyennes",
    category: "Processus national de dialogue citoyen",
    summary:
      "Les Assises nationales citoyennes sur les droits des femmes et des filles constituent un processus national de dialogue, préparé tout au long du semestre par la mise en place de ses instances de gouvernance.",
    // URL réelle : la page /assises existe déjà sur le site.
    href: "/assises",
    emailSummary:
      "La feuille de route des Assises a été élaborée, un comité technique composé d'expert·e·s a été créé et un atelier d'installation et de structuration du Comité de pilotage a été organisé.",
    achievements: [
      {
        period: "T2",
        periodLabel: "Avril – juin 2026",
        items: [
          "Feuille de route des Assises élaborée.",
          "Comité technique composé d'expert·e·s créé.",
          "Atelier d'installation et de structuration du Comité de pilotage organisé.",
        ],
      },
    ],
  },
]

export const newsletterSemesterOne2026 = {
  /** Chemin de la page complète sur le site (sans domaine) */
  pagePath: PAGE_PATH,

  meta: {
    seoTitle: "Premier semestre 2026 : les réalisations de J-GEN Sénégal",
    seoDescription:
      "Découvrez les principales actions menées par J-GEN Sénégal entre janvier et juin 2026 en faveur des droits, de la santé, de la protection et de l'autonomisation des femmes et des filles.",
    keywords: [
      "newsletter J-GEN SENEGAL",
      "bilan semestriel 2026",
      "droits des femmes Sénégal",
      "violences basées sur le genre",
      "autonomisation économique des femmes",
      "santé sexuelle et reproductive",
      "Assises nationales citoyennes",
    ],
  },

  header: {
    overline: "Newsletter semestrielle — Janvier à juin 2026",
    title:
      "Six mois d'actions pour les droits et l'autonomisation des femmes et des filles",
    periodLabel: "Janvier – Juin 2026",
    organisation: "J-GEN Sénégal",
  },

  /** Visuel principal — sert aussi d'image Open Graph si le fichier existe. */
  coverImage: {
    name: "cover",
    alt: "Rassemblement de femmes et de filles lors d'une activité communautaire de J-GEN Sénégal",
  } satisfies NewsletterImageRef,

  intro: {
    /** Version longue, page web */
    web: [
      "Au cours du premier semestre 2026, J-GEN Sénégal a poursuivi ses actions en faveur de la protection, de la santé, de la participation citoyenne et de l'autonomisation des femmes et des filles.",
      "Des cercles de guérison de Niakhar aux ateliers de plaidoyer de Saly, des formations professionnelles de Fatick et Kaolack aux dialogues intergénérationnels de Dakar, ces six mois ont été marqués par un travail de proximité mené avec les communautés, les collectivités territoriales, les acteurs religieux, les professionnels des médias et les partenaires techniques et financiers.",
      "Cette édition présente les réalisations effectives de la période, projet par projet, ainsi que les enseignements tirés et les perspectives pour le second semestre.",
    ],
    /** Version courte, e-mail */
    email:
      "Au cours du premier semestre 2026, J-GEN Sénégal a poursuivi ses actions en faveur de la protection, de la santé, de la participation citoyenne et de l'autonomisation des femmes et des filles. Découvrez quelques-unes des réalisations qui ont marqué ces six mois d'engagement aux côtés des communautés et des partenaires.",
  },

  /** Les grandes orientations du semestre (section « introduction semestrielle ») */
  orientations: [
    {
      id: "protection",
      title: "Protection contre les VBG",
      text: "Renforcer la prévention des violences basées sur le genre et la prise en charge communautaire des survivantes.",
    },
    {
      id: "psychosocial",
      title: "Accompagnement psychosocial",
      text: "Offrir des espaces confidentiels et sécurisés, centrés sur l'écoute, le care et la solidarité entre femmes.",
    },
    {
      id: "sante",
      title: "Santé et justice reproductive",
      text: "Améliorer l'accès à une information fiable sur les DSSR et porter le plaidoyer pour les droits reproductifs.",
    },
    {
      id: "economie",
      title: "Autonomisation économique",
      text: "Former et structurer des groupements de jeunes femmes autour de métiers générateurs de revenus.",
    },
    {
      id: "citoyennete",
      title: "Participation citoyenne",
      text: "Associer les communautés et les collectivités territoriales à la gouvernance sensible au genre.",
    },
    {
      id: "plaidoyer",
      title: "Plaidoyer institutionnel",
      text: "Faire évoluer les cadres juridiques et renforcer les mécanismes de protection et d'accès à la justice.",
    },
  ],

  /**
   * CHIFFRES CLÉS
   * Uniquement des résultats effectivement rapportés. Chaque valeur porte son
   * contexte d'origine. Aucune addition de données hétérogènes n'est faite :
   * il n'existe volontairement PAS de « total de bénéficiaires ».
   */
  statistics: [
    {
      id: "mobilisation-8-mars",
      value: "2 091",
      label: "personnes mobilisées",
      context: "Journée internationale des droits des femmes, 7 mars 2026 à Guédiawaye (cible prévue : 2 000)",
      inEmail: true,
    },
    {
      id: "survivantes",
      value: "38",
      label: "survivantes accompagnées",
      context: "Cercles de guérison du projet ELLES AUSSI à Niakhar, réparties en quatre groupes",
      inEmail: true,
    },
    {
      id: "cercles-guerison",
      value: "4",
      label: "cercles de guérison organisés",
      context: "Projet ELLES AUSSI, Niakhar — premier trimestre 2026",
      inEmail: false,
    },
    {
      id: "gie",
      value: "6",
      label: "GIE ayant bénéficié de formations",
      context: "Projet Liggeyal Ëlëg, régions de Fatick et Kaolack — GIE créés et formalisés",
      inEmail: true,
    },
    {
      id: "plans-action",
      value: "3",
      label: "plans d'action locaux élaborés",
      context: "Programme KIIRAY — Fatick, Diamaguène Sicap Mbao et Yoff, plans budgétisés",
      inEmail: true,
    },
    {
      id: "jeunes-leaders",
      value: "60",
      label: "jeunes leaders enrôlés",
      context: "Programme PAS À PAS, selon le tableau des indicateurs du premier trimestre",
      inEmail: false,
    },
    {
      id: "cercles-sororite",
      value: "2",
      label: "cercles de sororité organisés",
      context: "Projet JVSSR à Yoff — quartiers de Ndenatte et Therme Nord",
      inEmail: true,
    },
  ] satisfies NewsletterStatistic[],

  /** Les 4 axes d'intervention du semestre */
  axes: [
    {
      id: "axe-protection",
      number: 1,
      title: "Protéger, accompagner et réparer",
      intro:
        "Prévenir les violences basées sur le genre, accompagner les survivantes et renforcer la résilience des communautés et des institutions locales.",
      projectIds: ["elles-aussi", "kiiray"],
      emailTitle: "Protection et lutte contre les VBG",
      emailSummary:
        "Des cercles de guérison, des espaces de sororité et des actions communautaires ont contribué à renforcer l'accompagnement, la prévention et la prise en charge des violences basées sur le genre.",
    },
    {
      id: "axe-sante",
      number: 2,
      title: "Faire progresser la santé et la justice reproductive",
      intro:
        "Améliorer l'accès à une information fiable sur les droits et la santé sexuels et reproductifs, et porter un plaidoyer argumenté auprès de tous les acteurs.",
      projectIds: ["pas-a-pas", "jvssr"],
      emailTitle: "Santé et justice reproductive",
      emailSummary:
        "J-GEN a renforcé les capacités des jeunes leaders, soutenu la production de données communautaires et développé le plaidoyer en faveur des droits et de la santé sexuels et reproductifs.",
    },
    {
      id: "axe-economie",
      number: 3,
      title: "Favoriser l'autonomisation économique",
      intro:
        "Former, structurer et accompagner des groupements de jeunes femmes vers des activités génératrices de revenus durables.",
      projectIds: ["liggeyal-eleg"],
      emailTitle: "Autonomisation économique",
      emailSummary:
        "Six GIE de Fatick et Kaolack ont bénéficié de formations dans des métiers tels que la pâtisserie, la restauration, la saponification et la teinture.",
    },
    {
      id: "axe-plaidoyer",
      number: 4,
      title: "Influencer les politiques et renforcer la participation citoyenne",
      intro:
        "Créer les conditions d'un dialogue entre les parlementaires, les institutions et les communautés, et faire avancer les réformes juridiques.",
      projectIds: ["naatal-jaboot-gui", "assises"],
      emailTitle: "Plaidoyer et participation citoyenne",
      emailSummary:
        "Les travaux préparatoires des Assises nationales citoyennes, les actions avec les collectivités et l'atelier des défenseur·e·s des droits humains ont renforcé les dynamiques de dialogue et de mobilisation.",
    },
  ] satisfies NewsletterAxis[],

  /** Projets — les réalisations T1 et T2 restent toujours distinctes (voir `projects` ci-dessus) */
  projects,

  /**
   * Information PRÉVISIONNELLE, à ne pas présenter comme acquise.
   * ⚠️  Les rapports indiquent les Assises « prévues du 25 au 27 novembre 2026 ».
   *     Cette date est une projection future : elle DOIT être vérifiée auprès de
   *     J-GEN avant toute publication ou tout envoi de campagne.
   */
  assisesPlannedDates: {
    label: "Dates annoncées dans les rapports",
    value: "Du 25 au 27 novembre 2026",
    disclaimer:
      "Dates indiquées comme prévisionnelles dans les rapports trimestriels — à confirmer avant diffusion.",
  },

  /** Temps forts institutionnels et de plaidoyer */
  highlights: [
    {
      id: "journee-8-mars",
      title: "Journée internationale des droits des femmes",
      date: "7 mars 2026",
      place: "Guédiawaye",
      body: "Placée sous le thème « Droits, justice, action pour toutes les femmes et les filles », la célébration a mobilisé 2 091 personnes, pour une cible prévue de 2 000. Elle s'est terminée par la lecture d'un mémorandum.",
      details: [
        "2 091 personnes mobilisées, pour une cible prévue de 2 000.",
        "Participation d'autorités locales, de leaders communautaires et d'organisations de la société civile.",
        "Thème : « Droits, justice, action pour toutes les femmes et les filles ».",
        "Lecture d'un mémorandum en clôture de la rencontre.",
        "Le mémorandum réaffirme notamment la demande de reconnaissance juridique du féminicide et le renforcement des mécanismes de protection et d'accès à la justice.",
      ],
      image: {
        name: "8-mars-guediawaye",
        alt: "Mobilisation du 7 mars 2026 à Guédiawaye pour la Journée internationale des droits des femmes",
      },
    },
    {
      id: "atelier-defenseurs",
      title: "Atelier des défenseur·e·s des droits humains",
      date: "10 – 12 mars 2026",
      place: "Saly",
      body: "Cet atelier a réuni des organisations de la société civile, des institutions publiques et des partenaires autour de la sécurité des défenseur·e·s et des mécanismes de protection.",
      details: [
        "Réunion d'organisations de la société civile, d'institutions publiques et de partenaires.",
        "Thèmes abordés : sécurité des défenseur·e·s, protection des données personnelles, désinformation, mouvements anti-droits, accès à l'information et mécanismes juridiques de protection.",
        "Élaboration d'un plan d'action commun pour 2026.",
        "Ce plan comporte notamment la concertation nationale, le renforcement des capacités, le plaidoyer pour une loi de protection et les mécanismes d'alerte et de protection collective.",
      ],
      image: {
        name: "atelier-defenseurs-saly",
        alt: "Participant·e·s à l'atelier des défenseur·e·s des droits humains à Saly",
      },
    },
    {
      id: "beijing-30",
      title: "Rapport Beijing +30",
      // ⚠️  Le rapport du deuxième trimestre mentionne uniquement l'existence de
      //     cet atelier. Aucune date, aucun nombre de participant·e·s et aucun
      //     résultat ne figurent dans le document : ne rien ajouter ici.
      body: "Le rapport du deuxième trimestre mentionne la tenue d'un atelier de restitution du rapport des 30 ans de Beijing. Aucun détail supplémentaire n'est fourni dans le document source.",
    },
  ] satisfies NewsletterHighlight[],

  /** Chronologie du semestre — rendue en HTML sémantique, sans JavaScript */
  timeline: [
    {
      id: "t1",
      period: "Janvier – mars 2026",
      label: "Premier trimestre",
      entries: [
        { label: "ELLES AUSSI", text: "Quatre cercles de guérison à Niakhar, avec 38 survivantes." },
        { label: "KIIRAY", text: "Lancements officiels à Diamaguène Sicap Mbao et Yoff, diagnostics participatifs et trois plans d'action locaux budgétisés." },
        { label: "PAS À PAS", text: "Argumentaire religieux enrichi et validé, enrôlement de 60 jeunes leaders." },
        { label: "JVSSR", text: "Validation du plan d'action et du budget, lancement du recrutement d'un consultant." },
        { label: "Naatal Jaboot Gui", text: "Réunion d'orientation des Assises nationales citoyennes, les 16 et 17 mars aux Almadies." },
        { label: "8 mars", text: "Journée internationale des droits des femmes à Guédiawaye : 2 091 personnes mobilisées." },
        { label: "Défenseur·e·s des droits humains", text: "Atelier à Saly du 10 au 12 mars, plan d'action commun pour 2026." },
      ],
    },
    {
      id: "t2",
      period: "Avril – juin 2026",
      label: "Deuxième trimestre",
      entries: [
        { label: "KIIRAY", text: "Atelier national sur le rôle des Bajenu Gox, validation de leur plan d'action et dialogues intergénérationnels à Dakar." },
        { label: "PAS À PAS", text: "Formations à Pikine, Tivaouane Peulh et Patte d'Oie sur les DSSR et les mouvements anti-droits." },
        { label: "JVSSR", text: "Étude sur les perceptions de la communauté de Yoff, restitution aux parties prenantes et deux cercles de sororité." },
        { label: "Assises nationales citoyennes", text: "Feuille de route élaborée, comité technique créé et atelier d'installation du Comité de pilotage." },
        { label: "Beijing +30", text: "Atelier de restitution du rapport des 30 ans de Beijing." },
      ],
    },
  ] satisfies NewsletterTimelineBlock[],

  /** Enseignements tirés du semestre */
  lessons: [
    "La nécessité d'un suivi après les activités, pour transformer les acquis en changements durables.",
    "Le besoin d'un accompagnement psychosocial durable pour les survivantes, au-delà des temps de rencontre.",
    "L'importance du suivi des jeunes leaders formés, afin de soutenir la démultiplication auprès de leurs pairs.",
    "La nécessité d'accompagner les initiatives économiques dans la durée, après les sessions de formation.",
    "Le besoin de supports, d'équipements et d'attestations pour consolider les acquis des participantes.",
    "L'intérêt de renforcer la coordination avec les services techniques et les acteurs locaux.",
  ],

  /** Perspectives pour la suite */
  perspectives: [
    "Assurer le suivi des bénéficiaires accompagnées au cours du semestre.",
    "Produire des données probantes pour nourrir le plaidoyer et l'action de terrain.",
    "Renforcer les partenariats techniques, financiers et institutionnels.",
    "Approfondir l'impact communautaire des interventions.",
    "Poursuivre le processus des Assises nationales citoyennes.",
  ],

  /** Conclusion éditoriale, partagée entre la page et l'e-mail */
  conclusion:
    "Ces avancées ont été rendues possibles par l'engagement des équipes, des communautés, des collectivités territoriales et des partenaires de J-GEN Sénégal. Ensemble, poursuivons la construction d'un environnement plus juste, plus sûr et plus égalitaire pour les femmes et les filles.",

  /** Partenaires cités dans les rapports du semestre */
  partners: [
    "IPAS",
    "AmplifyChange",
    "Speak Up Africa — Initiative Voix Essentielles",
    "Association Action pour le Développement du Sénégal (Kaolack)",
    "Association des Bajenu Gox de Fatick",
  ],

  /**
   * Liens. Toutes les destinations correspondent à des routes réellement
   * existantes du site — aucune page fictive n'a été créée.
   */
  links: {
    page: PAGE_PATH,
    programs: "/programs",
    about: "/about",
    contact: "/contact",
    blog: "/blog",
    assises: "/assises",
    /** Ancre de la section des axes, à l'intérieur de la page */
    achievementsAnchor: "#axes",
  },

  /** Libellés des appels à l'action */
  cta: {
    heroPrimary: "Voir les réalisations",
    heroSecondary: "Découvrir J-GEN Sénégal",
    emailPrimary: "Découvrir toutes nos réalisations",
    projects: "Découvrir tous nos projets",
    partner: "Devenir partenaire",
    contact: "Contacter J-GEN Sénégal",
  },

  /** Coordonnées — reprises telles quelles du site (components/footer.tsx, contact) */
  organisation: {
    name: "J-GEN Sénégal",
    tagline: "Agir pour les femmes et les filles au Sénégal",
    email: "info@jgen.sn",
    phoneDisplay: "+221 33 868 91 29",
    phoneHref: "tel:+221338689129",
    // ⚠️  Le site ne mentionne que « Dakar, Sénégal ». L'adresse postale complète
    //     est obligatoire pour Mailchimp — elle est injectée par le merge tag
    //     *|HTML:LIST_ADDRESS_HTML|* et doit être renseignée dans les paramètres
    //     de l'audience Mailchimp.
    cityCountry: "Dakar, Sénégal",
    social: {
      facebook: "https://www.facebook.com/JGENSenegal/",
      instagram: "https://www.instagram.com/jgen.sn/",
      linkedin: "https://www.linkedin.com/company/jgen-women-global-entrepreneurship",
    },
  },

  /** Texte du preheader de l'e-mail */
  emailPreview:
    "Six mois d'actions pour les droits et l'autonomisation des femmes et des filles.",

  /** Salutation générique — volontairement sans *|FNAME|* (voir docs) */
  emailGreeting: "Chères partenaires, chers partenaires,",

  /** Mention légale expliquant pourquoi le lecteur reçoit l'e-mail */
  emailReasonForReceiving:
    "Vous recevez cet e-mail parce que vous êtes inscrit·e à la lettre d'information de J-GEN Sénégal ou que vous êtes partenaire de nos actions.",

  /**
   * ÉLÉMENTS À VALIDER PAR J-GEN AVANT PUBLICATION.
   * Ce tableau est également repris dans docs/newsletter-semestre-1-2026.md.
   */
  validationNotes: [
    {
      id: "graphies",
      subject: "Graphie officielle des programmes",
      issue:
        "Les rapports emploient des graphies concurrentes : « Naatal Ndiabote Gui » / « Naatal Jaboot Gui » / « Naatal Jaboot Gi », « KIIRAY » / « KIIRAAY », « Bajenu Gox » / « Badienou Gox ». Aucune graphie officielle n'existe ailleurs sur le site.",
      action:
        "Confirmer les formes retenues (« Naatal Jaboot Gui », « KIIRAY », « Bajenu Gox », « Liggeyal Ëlëg ») ou les corriger dans ce fichier.",
    },
    {
      id: "dates-assises",
      subject: "Dates des Assises nationales citoyennes",
      issue:
        "Les rapports indiquent les Assises « prévues du 25 au 27 novembre 2026 ». Il s'agit d'une information future, non d'un fait réalisé.",
      action: "Vérifier et confirmer les dates définitives avant toute publication.",
    },
    {
      id: "beijing-30",
      subject: "Atelier Beijing +30",
      issue:
        "Le rapport du deuxième trimestre mentionne l'atelier de restitution sans aucun détail : ni date, ni nombre de participant·e·s, ni résultat.",
      action:
        "Fournir les informations manquantes si l'activité doit être davantage développée. En l'état, seule son existence est mentionnée.",
    },
    {
      id: "visuels",
      subject: "Visuels et crédits photographiques",
      issue:
        "Aucune photographie des activités du semestre n'est encore disponible dans le dépôt. La page et l'e-mail s'affichent sans photo tant que les fichiers ne sont pas fournis.",
      action:
        "Déposer les visuels dans public/newsletter/ (l'extension importe peu) et communiquer les crédits photographiques. Voir docs/newsletter-semestre-1-2026.md.",
    },
    {
      id: "urls-projets",
      subject: "URL définitives des pages projets",
      issue:
        "Seule la page /assises existe aujourd'hui. Les autres projets renvoient vers l'ancre de leur section sur cette page.",
      action:
        "Renseigner le champ `href` du projet concerné dès qu'une page dédiée est publiée.",
    },
    {
      id: "adresse-postale",
      subject: "Adresse postale de l'organisation",
      issue:
        "Le site ne mentionne que « Dakar, Sénégal ». Mailchimp exige une adresse physique complète dans le pied de page des campagnes.",
      action:
        "Renseigner l'adresse complète dans les paramètres de l'audience Mailchimp — elle sera injectée par le merge tag *|HTML:LIST_ADDRESS_HTML|*.",
    },
    {
      id: "cible-liggeyal",
      subject: "Bénéficiaires de Liggeyal Ëlëg",
      issue:
        "Le projet vise 120 bénéficiaires dans les régions de Fatick et Kaolack. Ce nombre est une CIBLE, jamais présentée ici comme un résultat atteint.",
      action:
        "Communiquer le nombre de bénéficiaires effectivement accompagnées lorsqu'il sera consolidé.",
    },
  ] satisfies ValidationNote[],
}

export type NewsletterSemesterOne2026 = typeof newsletterSemesterOne2026

/** Cible du projet Liggeyal Ëlëg — volontairement séparée des chiffres clés. */
export const LIGGEYAL_ELEG_TARGET = {
  value: "120",
  label: "bénéficiaires visées",
  context:
    "Cible du projet Liggeyal Ëlëg dans les régions de Fatick et Kaolack. Il s'agit d'un objectif, non d'un résultat atteint.",
} as const

/** Tous les noms de base d'images référencés — utilisé par le script de génération. */
export const NEWSLETTER_IMAGE_NAMES = [
  newsletterSemesterOne2026.coverImage.name,
  ...newsletterSemesterOne2026.projects
    .map((project) => project.image?.name)
    .filter((name): name is string => Boolean(name)),
  ...newsletterSemesterOne2026.highlights
    .map((highlight) => highlight.image?.name)
    .filter((name): name is string => Boolean(name)),
] as const
