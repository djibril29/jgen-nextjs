import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const NL = "/newsletters/semestre-1"

// Données issues des rapports d'activité 2026 (content/newsletter-semestre-1-2026.ts)
// et de l'article sur les pré-assises de Thiès. Aucun chiffre n'est estimé :
// chaque valeur renvoie à une activité documentée.
const interventions = {
  plaidoyer: {
    title: "Le plaidoyer",
    heroImage: `${NL}/codefamille.jpg`,
    heroAlt: "Rassemblement communautaire de femmes lors d'une rencontre de plaidoyer de J-GEN Sénégal",
    description:
      "J-GEN Sénégal porte la parole des femmes et des filles auprès des parlementaires, des institutions et des collectivités territoriales. Notre plaidoyer vise la révision des dispositions discriminatoires du Code de la famille de 1972, notamment sur l'autorité parentale, l'âge du mariage et la reconnaissance de paternité. Il porte aussi la justice reproductive et la reconnaissance juridique du féminicide.",
    approach: {
      title: "Notre approche du plaidoyer",
      items: [
        {
          title: "Réformer le Code de la famille",
          description:
            "Avec le programme Naatal Jaboot Gui, soutenu par l'African Women's Development Fund, nous créons un dialogue entre parlementaires et communautés à Dakar et à Thiès. Les rencontres « Jakarlo ak sama député » recueillent les réalités vécues par les femmes pour nourrir ce plaidoyer.",
        },
        {
          title: "Défendre la justice reproductive",
          description:
            "Le programme PAS À PAS mobilise jeunes, acteurs communautaires, professionnels des médias et acteurs religieux. Avec ces derniers, nous avons consolidé un argumentaire religieux en faveur de l'accès à l'avortement sécurisé en cas de viol ou d'inceste.",
        },
        {
          title: "Interpeller les pouvoirs publics",
          description:
            "Le 7 mars 2026 à Guédiawaye, la Journée internationale des droits des femmes s'est conclue par un mémorandum demandant la reconnaissance juridique du féminicide. En juin, nous avons restitué à Dakar le rapport alternatif de la société civile sur trente ans de mise en œuvre du Programme d'action de Beijing.",
        },
      ],
    },
    impact: [
      {
        number: "2 091",
        label: "Personnes mobilisées",
        description: "le 7 mars 2026 à Guédiawaye, pour une cible de 2 000",
      },
      {
        number: "4",
        label: "Sous-mouvements",
        description: "jeunes, communautés, médias et acteurs religieux, dans PAS À PAS",
      },
      {
        number: "12",
        label: "Domaines critiques évalués",
        description: "dans le rapport alternatif Beijing +30 de la société civile",
      },
    ],
    activities: [
      {
        src: `${NL}/naatal1.jpg`,
        alt: "Rassemblement communautaire organisé dans le cadre de la campagne Naatal Jaboot Gui pour un Code de la famille juste et équitable",
        caption: "Campagne Naatal Jaboot Gui pour un Code de la famille juste.",
      },
      {
        src: `${NL}/8mars.jpg`,
        alt: "Mobilisation du 7 mars 2026 à Guédiawaye pour la Journée internationale des droits des femmes",
        caption: "Journée internationale des droits des femmes, Guédiawaye, 7 mars 2026.",
      },
      {
        src: `${NL}/beijing30.jpeg`,
        alt: "Panel d'ouverture de l'atelier de restitution du rapport alternatif Beijing +30, à l'Hôtel Ndiambour à Dakar",
        caption: "Restitution du rapport alternatif Beijing +30, Dakar, juin 2026.",
      },
      {
        src: "/interventions/mbour-table-officielle.jpg",
        alt: "Autorités administratives et organisatrices debout derrière la table officielle, devant la banderole des pré-assises à Mbour",
        caption: "Pré-assises nationales citoyennes à Mbour, 16 octobre 2026.",
      },
    ],
    relatedPrograms: [
      {
        title: "Naatal Jaboot Gui",
        slug: "naatal-jaboot-gui-un-plaidoyer-pour-la-reforme-du-code-de-la-famille",
        image: `${NL}/naatal1.jpg`,
      },
      {
        title: "PAS À PAS : vers une justice reproductive",
        slug: "pas-a-pas-vers-une-justice-reproductive-au-senegal",
        image: `${NL}/pas-a-pas.jpg`,
      },
    ],
  },
  sensibilisation: {
    title: "La sensibilisation communautaire",
    heroImage: `${NL}/cercles.jpeg`,
    heroAlt: "Travaux de groupe lors d'un cercle de sororité du projet JVSSR à Yoff",
    description:
      "Nous travaillons au plus près des quartiers et des villages pour faire reculer les normes sociales qui entretiennent les violences basées sur le genre. Cercles de sororité, cercles de guérison et dialogues entre générations ouvrent des espaces où les femmes et les filles prennent la parole, connaissent leurs droits et deviennent relais dans leur communauté.",
    approach: {
      title: "Notre approche de sensibilisation",
      items: [
        {
          title: "Cercles de sororité",
          description:
            "À Yoff, dans les quartiers de Ndenatte et Therme Nord, le projet JVSSR réunit adolescentes et jeunes femmes autour de la citoyenneté active, des notions de genre, des droits fondamentaux et des formes de VBG. Les participantes s'engagent ensuite comme relais.",
        },
        {
          title: "Cercles de guérison",
          description:
            "À Niakhar, le projet ELLES AUSSI a accueilli des survivantes dans des espaces confidentiels centrés sur l'écoute et le care. Cartes projectives, jeux et exercices de vocalisation y facilitent l'expression des émotions.",
        },
        {
          title: "Dialogues intergénérationnels",
          description:
            "À Biscuiterie/Grand-Dakar et à Ouakam/Sacré-Cœur, le programme KIIRAY fait dialoguer les générations sur les violences sexuelles et sexistes, la prévention et la protection des femmes et des filles.",
        },
      ],
    },
    impact: [
      {
        number: "38",
        label: "Survivantes accompagnées",
        description: "dans les cercles de guérison d'ELLES AUSSI à Niakhar",
      },
      {
        number: "4",
        label: "Cercles de guérison",
        description: "organisés à Niakhar au premier trimestre 2026",
      },
      {
        number: "2",
        label: "Cercles de sororité",
        description: "à Ndenatte et Therme Nord, dans la commune de Yoff",
      },
    ],
    activities: [
      {
        src: `${NL}/jvssr1.jpeg`,
        alt: "Cercle de sororité réunissant des jeunes femmes à Yoff",
        caption: "Cercle de sororité du projet JVSSR à Yoff.",
      },
      {
        src: `${NL}/perception.jpeg`,
        alt: "Session de restitution de l'enquête de base sur les perceptions communautaires à Yoff, le 24 juin 2026 à la mairie de Yoff",
        caption: "Restitution de l'enquête sur les perceptions communautaires, Yoff, 24 juin 2026.",
      },
      {
        src: `${NL}/kiiray1.jpg`,
        alt: "Séance de travail participative réunissant acteurs communautaires et institutionnels dans le cadre du programme KIIRAY",
        caption: "Séance de travail communautaire du programme KIIRAY.",
      },
      {
        src: "/interventions/tivaouane-salle.jpg",
        alt: "Participantes vêtues de blanc qui applaudissent dans un auditorium aux sièges rouges à Tivaouane",
        caption: "Participantes aux pré-assises de Tivaouane, 15 octobre 2026.",
      },
    ],
    relatedPrograms: [
      {
        title: "Jeunes Volontaires pour la Santé Sexuelle et Reproductive",
        slug: "jeunes-volontaires-pour-la-sante-sexuelle-et-reproductive",
        image: `${NL}/jvssr1.jpeg`,
      },
      {
        title: "KIIRAY",
        slug: "kiiray",
        image: `${NL}/kiiray.jpg`,
      },
    ],
  },
  "renforcement-capacite": {
    title: "Le renforcement de capacité",
    heroImage: `${NL}/pas-a-pas.jpg`,
    heroAlt: "Jeunes leaders formé·e·s sur les DSSR et les VBG dans le cadre du programme PAS À PAS",
    description:
      "Nous formons celles et ceux qui portent le changement sur le terrain : jeunes leaders, Bajenu Gox, élus locaux et groupements de jeunes femmes. Les formations portent sur les droits en santé sexuelle et reproductive, la prévention des violences, la gouvernance sensible au genre et des métiers qui génèrent des revenus.",
    approach: {
      title: "Notre approche de renforcement",
      items: [
        {
          title: "Former les jeunes leaders",
          description:
            "En avril 2026, à Pikine, Tivaouane Peulh et Patte d'Oie, les jeunes leaders de PAS À PAS ont été formés aux DSSR, aux argumentaires de plaidoyer et aux réponses face aux mouvements anti-droits. Ils et elles se sont engagés à démultiplier la formation auprès de leurs pairs.",
        },
        {
          title: "Outiller les Bajenu Gox et les élus",
          description:
            "Le programme KIIRAY a tenu un atelier national sur le rôle des Bajenu Gox dans la prévention et la prise en charge des VBG. Lors des lancements à Diamaguène Sicap Mbao et à Yoff, les élus ont été formés à la gouvernance et au budget sensibles au genre, au budget participatif et à la redevabilité.",
        },
        {
          title: "Apprendre un métier",
          description:
            "Avec LIGGEEYAL ËLËG, des jeunes femmes non scolarisées ou déscolarisées et des mères célibataires de 16 à 35 ans, organisées en GIE, se forment à la pâtisserie, la saponification, la restauration et la teinture à Fatick et Kaolack.",
        },
      ],
    },
    impact: [
      {
        number: "60",
        label: "Jeunes leaders enrôlés",
        description: "à Pikine, Tivaouane Peulh et Patte d'Oie, dans PAS À PAS",
      },
      {
        number: "6",
        label: "GIE formés",
        description: "créés et formalisés à Fatick et Kaolack, dans LIGGEEYAL ËLËG",
      },
      {
        number: "4",
        label: "Métiers enseignés",
        description: "pâtisserie, saponification, restauration et teinture",
      },
    ],
    activities: [
      {
        src: `${NL}/pas-a-pas3.jpg`,
        alt: "Échanges entre participantes et formatrices lors d'une session du programme PAS À PAS",
        caption: "Session de formation des jeunes leaders, PAS À PAS.",
      },
      {
        src: `${NL}/bejenugox.jpg`,
        alt: "Atelier national de renforcement des capacités des Bajenu Gox, programme KIIRAY",
        caption: "Atelier national de renforcement des capacités des Bajenu Gox.",
      },
      {
        src: `${NL}/euleug.jpg`,
        alt: "GIE de jeunes femmes de Sibassor présentant leurs savons lors d'une formation en saponification du projet LIGGEEYAL ËLËG",
        caption: "Formation en saponification d'un GIE de Sibassor, Kaolack.",
      },
      {
        src: `${NL}/patisserie.jpg`,
        alt: "Participantes d'un GIE de Kaolack en tenue de formation lors d'une session de pâtisserie du projet LIGGEEYAL ËLËG, supervisée par l'AADS",
        caption: "Session de pâtisserie d'un GIE de Kaolack, supervisée par l'AADS.",
      },
    ],
    relatedPrograms: [
      {
        title: "PAS À PAS : vers une justice reproductive",
        slug: "pas-a-pas-vers-une-justice-reproductive-au-senegal",
        image: `${NL}/pas-a-pas2.jpg`,
      },
      {
        title: "LIGGEEYAL ËLËG",
        slug: "liggeeyal-eleg",
        image: `${NL}/euleug.jpg`,
      },
    ],
  },
  "reseautage-partenariat": {
    title: "Le réseautage et partenariat",
    heroImage: `${NL}/copil.jpg`,
    heroAlt:
      "Séance de travail du comité de pilotage des Assises nationales citoyennes sur les droits des femmes et des filles",
    description:
      "Nous agissons avec les collectivités territoriales, les services de l'État, les organisations de la société civile, les acteurs religieux, les médias et nos partenaires techniques et financiers, dont l'African Women's Development Fund, Speak Up Africa, IPAS et AmplifyChange. Les Assises nationales citoyennes sur les droits des femmes et des filles rassemblent aujourd'hui ces acteurs autour d'une consultation nationale.",
    approach: {
      title: "Notre approche de collaboration",
      items: [
        {
          title: "Les Assises nationales citoyennes",
          description:
            "Un comité technique d'expert·e·s et un comité de pilotage préparent les Assises. En octobre 2026, la tournée des pré-assises a commencé à Thiès, Tivaouane, Mbour et Joal-Fadiouth, avec la formation des points focaux départementaux.",
        },
        {
          title: "Les collectivités territoriales",
          description:
            "Avec le programme KIIRAY, nous avons conduit des diagnostics participatifs avec les communes de Fatick, Diamaguène Sicap Mbao et Yoff, qui disposent désormais de plans d'action locaux budgétisés contre les VBG.",
        },
        {
          title: "Les alliances de la société civile",
          description:
            "À Saly, en mars 2026, l'atelier des défenseur·e·s des droits humains a produit un plan d'action commun pour 2026. Le rapport alternatif Beijing +30 a été restitué avec l'appui de la GIZ (projet REDTRA) et de la Foundation for a Just Society.",
        },
      ],
    },
    impact: [
      {
        number: "46",
        label: "Départements",
        description: "visés par la tournée des pré-assises nationales citoyennes",
      },
      {
        number: "8",
        label: "Thématiques de consultation",
        description: "retenues pour les Assises, des réformes juridiques à la justice climatique",
      },
      {
        number: "3",
        label: "Plans d'action locaux",
        description: "budgétisés avec les communes de Fatick, Diamaguène Sicap Mbao et Yoff",
      },
    ],
    activities: [
      {
        src: `${NL}/assises1.jpg`,
        alt: "Réunion d'orientation réunissant les parties prenantes des Assises nationales citoyennes",
        caption: "Réunion d'orientation des Assises, Almadies, 16 et 17 mars 2026.",
      },
      {
        src: "/interventions/thies-regionale-participantes.jpg",
        alt: "Points focaux et personnes ressources assises autour de la table de travail pendant la réunion régionale de Thiès",
        caption: "Points focaux en séance de travail, réunion régionale de Thiès.",
      },
      {
        src: "/interventions/joal-photo-de-groupe.jpg",
        alt: "Maimouna Astou Yade, en tenue noire et orange, entourée des participantes derrière la table officielle à Joal-Fadiouth",
        caption: "Maimouna Astou Yade avec les participantes, Joal-Fadiouth.",
      },
      {
        src: `${NL}/kiiray.jpg`,
        alt: "Lancement officiel du programme KIIRAY, réunissant élus, acteurs communautaires et populations autour de la banderole du programme",
        caption: "Lancement du programme KIIRAY avec une collectivité territoriale.",
      },
    ],
    relatedPrograms: [
      {
        title: "Naatal Jaboot Gui",
        slug: "naatal-jaboot-gui-un-plaidoyer-pour-la-reforme-du-code-de-la-famille",
        image: `${NL}/assises1.jpg`,
      },
      {
        title: "KIIRAY",
        slug: "kiiray",
        image: `${NL}/kiiray1.jpg`,
      },
    ],
  },
}

export default function InterventionPage({ params }: { params: { slug: string } }) {
  const intervention = interventions[params.slug as keyof typeof interventions]

  if (!intervention) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <img
          src={intervention.heroImage || "/placeholder.svg"}
          alt={intervention.heroAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 pb-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 text-balance">
            {intervention.title}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{intervention.description}</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 lg:py-24 bg-accent/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{intervention.approach.title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {intervention.approach.items.map((item, index) => (
                <div key={index} className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Notre impact</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Des chiffres tirés de nos rapports d'activité 2026
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {intervention.impact.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold mb-1">{stat.label}</div>
                  <div className="text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Carousel */}
      <section className="py-16 lg:py-24 bg-accent/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Nos activités en images</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Découvrez quelques moments forts de nos interventions sur le terrain
            </p>
            <div className="relative">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {intervention.activities.map((activity, index) => (
                  <figure key={index}>
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                      <img src={activity.src} alt={activity.alt} className="w-full h-full object-cover" />
                    </div>
                    <figcaption className="mt-3 text-sm text-muted-foreground leading-snug">
                      {activity.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Programmes liés</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Découvrez nos programmes qui s'inscrivent dans ce domaine d'intervention
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {intervention.relatedPrograms.map((program, index) => (
                <Link
                  key={index}
                  href={`/programs/${program.slug}`}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[16/9] relative">
                    <img
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-background mb-2">{program.title}</h3>
                      <div className="flex items-center text-background/90 group-hover:text-primary-foreground transition-colors">
                        <span>En savoir plus</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Rejoignez-nous dans cette action</h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Ensemble, nous pouvons créer un impact durable pour les droits des femmes et des filles au Sénégal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/programs">Voir tous nos programmes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
