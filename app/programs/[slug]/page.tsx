import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Program data
const programs = {
  "education-sensibilisation": {
    title: "Éducation et Sensibilisation",
    intro:
      "La violence basée sur le genre commence souvent par des attitudes et des croyances. Nous travaillons à transformer les mentalités à travers l'éducation.",
    description:
      "Avec une approche intersectionnelle, des ateliers et de la diversité, le CECI appuie l'action des femmes et des filles en soutien de la revendication de leurs droits. En collaboration avec des organisations locales, nous créons des programmes éducatifs qui touchent tous les niveaux (individuel, familial, communautaire et sur l'environnement institutionnel, politique et de services). Pour que l'agenda de l'égalité entre les femmes et les hommes, les organisations qui font avancer leurs droits, et s'assurer que tous les partenaires s'engagent avec les femmes et les filles.",
    heroImage: "/community-education-workshop.jpg",
    approaches: [
      {
        title: "Approche Intersectionnelle",
        description:
          "Nous reconnaissons que les femmes et les filles font face à de multiples formes de discrimination. Notre approche prend en compte le genre, la classe, l'âge, l'ethnicité et d'autres facteurs qui influencent leurs expériences.",
      },
      {
        title: "Masculinités positives",
        description:
          "Nous travaillons avec les hommes et les garçons pour promouvoir des modèles de masculinité qui rejettent la violence et soutiennent l'égalité des genres. Les hommes sont des alliés essentiels dans la lutte contre la violence basée sur le genre.",
      },
    ],
    statistics: [
      {
        number: "2/3 des femmes",
        label: "ont subi des violences physiques ou sexuelles au Sénégal",
      },
      {
        number: "15 000+",
        label: "personnes sensibilisées à travers nos programmes éducatifs",
      },
      {
        number: "120 écoles",
        label: "intègrent maintenant l'éducation au genre dans leur curriculum",
      },
    ],
    changeApproaches: [
      {
        title: "Éducation",
        description: "Intégrer l'égalité des genres et sensibilisation dans les écoles et les communautés.",
      },
      {
        title: "Mobilisation communautaire",
        description:
          "Travailler avec les leaders communautaires, les chefs religieux et les aînés pour créer un environnement qui soutient les femmes et les filles.",
      },
      {
        title: "Changements structurels",
        description:
          "Plaider pour des politiques et des lois qui protègent les droits des femmes et préviennent la violence.",
      },
    ],
    impact: {
      description:
        "Nos programmes d'éducation ont touché plus de 15 000 personnes au Sénégal et ont contribué à des changements mesurables dans les attitudes et les comportements. 85% des participants rapportent une meilleure compréhension de l'égalité des genres.",
      images: ["/african-women-empowerment-community.jpg", "/community-education-workshop.jpg"],
    },
    relatedProjects: [
      {
        title: "Programme Jeunes Leaders",
        location: "Dakar, Sénégal",
        image: "/young-leaders-workshop-senegal.jpg",
      },
      {
        title: "Ateliers Communautaires",
        location: "Thiès, Sénégal",
        image: "/community-workshop-senegal.jpg",
      },
      {
        title: "Éducation au Genre dans les Écoles",
        location: "Saint-Louis, Sénégal",
        image: "/school-education-senegal.jpg",
      },
    ],
    documents: [
      {
        title: "Guide de l'éducateur - Égalité des genres et prévention de la violence",
        year: "2024",
      },
      {
        title: "Rapport d'impact - Programme d'éducation 2023",
        year: "2023",
      },
    ],
  },
  "soutien-survivantes": {
    title: "Services de Soutien aux Survivantes",
    intro:
      "Chaque survivante mérite un soutien complet, respectueux et accessible. Nous offrons des services holistiques pour aider les femmes à se reconstruire.",
    description:
      "Notre programme de soutien aux survivantes offre une gamme complète de services incluant l'intervention de crise, le conseil psychologique, l'aide juridique, et l'hébergement sécurisé. Nous travaillons avec un réseau de professionnels formés pour assurer que chaque survivante reçoit le soutien dont elle a besoin dans un environnement sûr et respectueux.",
    heroImage: "/legal-rights-justice.jpg",
    approaches: [
      {
        title: "Approche centrée sur la survivante",
        description:
          "Nous plaçons les besoins, les choix et le bien-être de la survivante au centre de tous nos services. Chaque femme est traitée avec dignité et respect, et ses décisions sont honorées.",
      },
      {
        title: "Services holistiques",
        description:
          "Nous reconnaissons que la guérison nécessite plus qu'une seule intervention. Nos services couvrent les besoins physiques, émotionnels, juridiques et économiques des survivantes.",
      },
    ],
    statistics: [
      {
        number: "500+",
        label: "survivantes soutenues chaque année",
      },
      {
        number: "24/7",
        label: "ligne d'assistance disponible pour les urgences",
      },
      {
        number: "8 centres",
        label: "de soutien à travers le Sénégal",
      },
    ],
    changeApproaches: [
      {
        title: "Intervention de crise",
        description: "Réponse immédiate et soutien pour les survivantes en situation d'urgence.",
      },
      {
        title: "Conseil et thérapie",
        description: "Soutien psychologique à long terme pour aider les survivantes à guérir du traumatisme.",
      },
      {
        title: "Hébergement sécurisé",
        description: "Maisons sûres pour les femmes qui ont besoin de quitter des situations dangereuses.",
      },
    ],
    impact: {
      description:
        "Nos services ont aidé plus de 500 survivantes l'année dernière. 90% des femmes qui ont utilisé nos services rapportent se sentir plus en sécurité et plus confiantes dans leur capacité à reconstruire leur vie.",
      images: ["/african-women-empowerment-community.jpg", "/women-leadership-empowerment.jpg"],
    },
    relatedProjects: [
      {
        title: "Centre d'Accueil Dakar",
        location: "Dakar, Sénégal",
        image: "/support-center-dakar.jpg",
      },
      {
        title: "Ligne d'Assistance 24/7",
        location: "National, Sénégal",
        image: "/helpline-support.jpg",
      },
      {
        title: "Programme de Conseil",
        location: "Thiès, Sénégal",
        image: "/counseling-support.jpg",
      },
    ],
    documents: [
      {
        title: "Guide des services pour les survivantes",
        year: "2024",
      },
      {
        title: "Rapport annuel - Services de soutien 2023",
        year: "2023",
      },
    ],
  },
  "autonomisation-economique": {
    title: "Autonomisation Économique",
    intro:
      "L'indépendance économique est essentielle pour que les femmes puissent échapper à la violence et construire un avenir meilleur pour elles-mêmes et leurs familles.",
    description:
      "Notre programme d'autonomisation économique offre aux femmes les compétences, les ressources et les opportunités dont elles ont besoin pour atteindre l'indépendance financière. À travers la formation professionnelle, le soutien à l'entrepreneuriat et l'accès au microfinancement, nous aidons les femmes à créer des moyens de subsistance durables.",
    heroImage: "/african-women-empowerment-community.jpg",
    approaches: [
      {
        title: "Formation professionnelle",
        description:
          "Nous offrons une formation dans des domaines à forte demande, donnant aux femmes les compétences nécessaires pour accéder à des emplois bien rémunérés.",
      },
      {
        title: "Soutien à l'entrepreneuriat",
        description:
          "Nous aidons les femmes à démarrer et à développer leurs propres entreprises, avec un mentorat, une formation commerciale et un accès au capital.",
      },
    ],
    statistics: [
      {
        number: "1 200+",
        label: "femmes formées aux compétences professionnelles",
      },
      {
        number: "300+",
        label: "micro-entreprises créées par des femmes",
      },
      {
        number: "85%",
        label: "des participantes rapportent une augmentation de leurs revenus",
      },
    ],
    changeApproaches: [
      {
        title: "Formation aux compétences",
        description: "Programmes de formation dans la couture, la coiffure, la transformation alimentaire et plus.",
      },
      {
        title: "Microfinancement",
        description: "Accès à de petits prêts pour démarrer ou développer des entreprises.",
      },
      {
        title: "Mentorat commercial",
        description: "Accompagnement et conseils pour aider les femmes à réussir en affaires.",
      },
    ],
    impact: {
      description:
        "Nos programmes d'autonomisation économique ont aidé plus de 1 200 femmes à acquérir de nouvelles compétences et 300 à démarrer leurs propres entreprises. Les participantes rapportent une augmentation moyenne de 60% de leurs revenus.",
      images: ["/african-women-empowerment-community.jpg", "/community-education-workshop.jpg"],
    },
    relatedProjects: [
      {
        title: "Centre de Formation Professionnelle",
        location: "Dakar, Sénégal",
        image: "/vocational-training-center.png",
      },
      {
        title: "Programme de Microfinancement",
        location: "Kaolack, Sénégal",
        image: "/microfinance-women.jpg",
      },
      {
        title: "Coopérative de Femmes",
        location: "Ziguinchor, Sénégal",
        image: "/women-cooperative-senegal.jpg",
      },
    ],
    documents: [
      {
        title: "Guide de l'entrepreneuriat pour les femmes",
        year: "2024",
      },
      {
        title: "Rapport d'impact - Autonomisation économique 2023",
        year: "2023",
      },
    ],
  },
  "plaidoyer-juridique": {
    title: "Plaidoyer Juridique",
    intro:
      "Les lois et les politiques doivent protéger les droits des femmes et des filles. Nous travaillons pour renforcer les cadres juridiques et assurer l'accès à la justice.",
    description:
      "Notre programme de plaidoyer juridique travaille à plusieurs niveaux pour protéger les droits des femmes. Nous offrons une aide juridique directe aux survivantes de violence, plaidons pour des réformes législatives, et sensibilisons les femmes à leurs droits. Nous collaborons avec des avocats, des juges et des décideurs politiques pour créer un système juridique qui protège et autonomise les femmes.",
    heroImage: "/legal-rights-justice.jpg",
    approaches: [
      {
        title: "Aide juridique directe",
        description:
          "Nous offrons des services juridiques gratuits ou à faible coût aux femmes qui ne peuvent pas se permettre une représentation légale.",
      },
      {
        title: "Plaidoyer politique",
        description:
          "Nous travaillons avec les législateurs et les décideurs pour renforcer les lois protégeant les femmes et les filles.",
      },
    ],
    statistics: [
      {
        number: "400+",
        label: "femmes ont reçu une aide juridique",
      },
      {
        number: "5 lois",
        label: "renforcées grâce à notre plaidoyer",
      },
      {
        number: "80%",
        label: "de taux de réussite dans les cas de violence basée sur le genre",
      },
    ],
    changeApproaches: [
      {
        title: "Représentation juridique",
        description: "Avocats formés pour représenter les survivantes dans les procédures judiciaires.",
      },
      {
        title: "Réforme des politiques",
        description: "Plaidoyer pour des lois plus fortes contre la violence basée sur le genre.",
      },
      {
        title: "Éducation aux droits",
        description: "Ateliers pour informer les femmes de leurs droits juridiques.",
      },
    ],
    impact: {
      description:
        "Notre travail de plaidoyer a contribué au renforcement de 5 lois protégeant les femmes au Sénégal. Nous avons fourni une aide juridique à plus de 400 femmes, avec un taux de réussite de 80% dans les cas de violence basée sur le genre.",
      images: ["/legal-rights-justice.jpg", "/women-leadership-empowerment.jpg"],
    },
    relatedProjects: [
      {
        title: "Clinique Juridique",
        location: "Dakar, Sénégal",
        image: "/legal-clinic-senegal.jpg",
      },
      {
        title: "Campagne de Réforme Législative",
        location: "National, Sénégal",
        image: "/legislative-reform-campaign.jpg",
      },
      {
        title: "Ateliers sur les Droits",
        location: "Thiès, Sénégal",
        image: "/rights-workshop-senegal.jpg",
      },
    ],
    documents: [
      {
        title: "Guide des droits juridiques des femmes au Sénégal",
        year: "2024",
      },
      {
        title: "Rapport de plaidoyer - Réformes législatives 2023",
        year: "2023",
      },
    ],
  },
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = programs[params.slug as keyof typeof programs]

  if (!program) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img src={program.heroImage || "/placeholder.svg"} alt={program.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Back Button */}
        <div className="py-8">
          <Link href="/programs">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour aux programmes
            </Button>
          </Link>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{program.intro}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-balance">{program.title}</h1>
          <p className="text-lg leading-relaxed text-pretty">{program.description}</p>
        </div>

        {/* Approaches */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Notre approche</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {program.approaches.map((approach, index) => (
              <Card key={index} className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">{approach.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{approach.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16 py-12 bg-accent/30 -mx-4 px-4 lg:-mx-8 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-12 text-center">État des lieux de la situation actuelle</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {program.statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-3">{stat.number}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Change Approaches */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Favoriser le changement</h2>
          <div className="space-y-6">
            {program.changeApproaches.map((approach, index) => (
              <div key={index} className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-lg font-bold mb-2">{approach.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{approach.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Notre impact</h2>
          <p className="text-lg leading-relaxed mb-8">{program.impact.description}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {program.impact.images.map((image, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Impact ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Projets liés à cette priorité</h2>
            <Link href="/programs">
              <Button variant="link" className="text-primary">
                Voir tous les projets
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {program.relatedProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Documentation Center */}
        <div className="mb-16 py-12 bg-accent/20 -mx-4 px-4 lg:-mx-8 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Centre de documentation</h2>
            <div className="space-y-4">
              {program.documents.map((doc, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">{doc.year}</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Télécharger
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Other Programs CTA */}
        <div className="mb-16 py-12 bg-primary/10 -mx-4 px-4 lg:-mx-8 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-primary">Nos autres priorités d'action</h2>
            <Link href="/programs">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Découvrir tous nos programmes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export async function generateStaticParams() {
  return [
    { slug: "education-sensibilisation" },
    { slug: "soutien-survivantes" },
    { slug: "autonomisation-economique" },
    { slug: "plaidoyer-juridique" },
  ]
}
