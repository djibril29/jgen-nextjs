import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const interventions = {
  plaidoyer: {
    title: "Le plaidoyer",
    heroImage: "/african-women-advocacy-protest-rights.jpg",
    description:
      "Le plaidoyer est au cœur de notre action pour transformer les politiques publiques et les pratiques institutionnelles. Nous travaillons à influencer les décideurs politiques, les législateurs et les institutions pour qu'ils adoptent et mettent en œuvre des lois et des politiques qui protègent et promeuvent les droits des femmes et des filles au Sénégal.",
    approach: {
      title: "Notre approche du plaidoyer",
      items: [
        {
          title: "Plaidoyer basé sur les données",
          description:
            "Nous collectons et analysons des données probantes pour documenter les violations des droits et informer nos recommandations politiques.",
        },
        {
          title: "Mobilisation communautaire",
          description:
            "Nous amplifions les voix des femmes et des filles affectées pour qu'elles participent activement aux processus de décision.",
        },
        {
          title: "Engagement institutionnel",
          description:
            "Nous collaborons avec les institutions gouvernementales, les parlementaires et les autorités locales pour promouvoir des réformes législatives.",
        },
      ],
    },
    impact: [
      { number: "12", label: "Lois et politiques influencées", description: "depuis notre création" },
      { number: "45", label: "Rencontres avec décideurs", description: "au niveau national et local" },
      { number: "8", label: "Campagnes de plaidoyer", description: "menées avec succès" },
    ],
    activities: [
      "/african-women-advocacy-protest-rights.jpg",
      "/community-awareness-workshop-senegal-women.jpg",
      "/empowered-african-women-standing-together-in-solid.jpg",
      "/african-women-in-community-meeting-discussing-righ.jpg",
    ],
    relatedPrograms: [
      {
        title: "Leadership des Jeunes Femmes",
        slug: "leadership-jeunes-femmes",
        image: "/young-leaders-workshop-senegal.jpg",
      },
      {
        title: "Éducation et Sensibilisation",
        slug: "education-sensibilisation",
        image: "/school-education-senegal.jpg",
      },
    ],
  },
  sensibilisation: {
    title: "La sensibilisation communautaire",
    heroImage: "/community-awareness-workshop-senegal-women.jpg",
    description:
      "La sensibilisation communautaire est essentielle pour transformer les normes sociales et culturelles qui perpétuent les violences basées sur le genre. Nous travaillons directement avec les communautés pour éduquer, informer et mobiliser autour des droits des femmes et des filles, en créant des espaces de dialogue et de réflexion collective.",
    approach: {
      title: "Notre approche de sensibilisation",
      items: [
        {
          title: "Dialogue communautaire",
          description:
            "Nous organisons des sessions de dialogue participatif avec les leaders communautaires, les hommes, les femmes et les jeunes pour déconstruire les stéréotypes de genre.",
        },
        {
          title: "Éducation par les pairs",
          description:
            "Nous formons des ambassadeurs communautaires qui sensibilisent leurs pairs et deviennent des agents de changement dans leurs quartiers.",
        },
        {
          title: "Campagnes de communication",
          description:
            "Nous développons des campagnes créatives utilisant les médias traditionnels et numériques pour toucher un large public.",
        },
      ],
    },
    impact: [
      { number: "15 000+", label: "Personnes sensibilisées", description: "dans 50 communautés" },
      { number: "120", label: "Ambassadeurs formés", description: "actifs dans leurs communautés" },
      { number: "25", label: "Campagnes menées", description: "sur différentes thématiques" },
    ],
    activities: [
      "/community-awareness-workshop-senegal-women.jpg",
      "/african-women-in-community-meeting-discussing-righ.jpg",
      "/empowered-african-women-standing-together-in-solid.jpg",
      "/school-education-senegal.jpg",
    ],
    relatedPrograms: [
      {
        title: "Éducation et Sensibilisation",
        slug: "education-sensibilisation",
        image: "/school-education-senegal.jpg",
      },
      {
        title: "Leadership des Jeunes Femmes",
        slug: "leadership-jeunes-femmes",
        image: "/young-leaders-workshop-senegal.jpg",
      },
    ],
  },
  "renforcement-capacite": {
    title: "Le renforcement de capacité",
    heroImage: "/capacity-building-training-women-empowerment.jpg",
    description:
      "Le renforcement de capacité vise à doter les femmes, les filles et les acteurs clés des compétences, des connaissances et des outils nécessaires pour défendre leurs droits, exercer leur leadership et contribuer au changement social. Nous croyons que l'autonomisation passe par l'acquisition de compétences pratiques et le développement du leadership.",
    approach: {
      title: "Notre approche de renforcement",
      items: [
        {
          title: "Formation pratique",
          description:
            "Nous offrons des formations sur le leadership, les droits humains, l'entrepreneuriat et les compétences de vie pour renforcer l'autonomie des femmes et des filles.",
        },
        {
          title: "Mentorat et accompagnement",
          description:
            "Nous mettons en place des programmes de mentorat où des femmes leaders accompagnent les jeunes femmes dans leur développement personnel et professionnel.",
        },
        {
          title: "Renforcement institutionnel",
          description:
            "Nous travaillons avec les organisations partenaires pour renforcer leurs capacités organisationnelles et leur efficacité dans la promotion des droits des femmes.",
        },
      ],
    },
    impact: [
      { number: "2 500+", label: "Femmes et filles formées", description: "sur diverses thématiques" },
      { number: "80", label: "Organisations renforcées", description: "dans leurs capacités" },
      { number: "95%", label: "Taux de satisfaction", description: "des participantes aux formations" },
    ],
    activities: [
      "/capacity-building-training-women-empowerment.jpg",
      "/young-leaders-workshop-senegal.jpg",
      "/vocational-training-center.png",
      "/microfinance-women.jpg",
    ],
    relatedPrograms: [
      {
        title: "Leadership des Jeunes Femmes",
        slug: "leadership-jeunes-femmes",
        image: "/young-leaders-workshop-senegal.jpg",
      },
      {
        title: "Autonomisation Économique",
        slug: "autonomisation-economique",
        image: "/microfinance-women.jpg",
      },
    ],
  },
  "reseautage-partenariat": {
    title: "Le réseautage et partenariat",
    heroImage: "/networking-partnership-collaboration-women-organiz.jpg",
    description:
      "Le réseautage et les partenariats stratégiques sont essentiels pour amplifier notre impact et créer un mouvement collectif pour les droits des femmes. Nous collaborons avec des organisations locales, nationales et internationales, des institutions gouvernementales et des acteurs de la société civile pour créer des synergies et maximiser nos ressources.",
    approach: {
      title: "Notre approche de collaboration",
      items: [
        {
          title: "Partenariats stratégiques",
          description:
            "Nous établissons des partenariats avec des organisations partageant nos valeurs pour mener des actions conjointes et partager les ressources.",
        },
        {
          title: "Réseaux thématiques",
          description:
            "Nous participons activement à des réseaux nationaux et régionaux sur les droits des femmes, les VBG et l'égalité de genre.",
        },
        {
          title: "Échange de connaissances",
          description:
            "Nous facilitons le partage d'expériences, de bonnes pratiques et d'apprentissages entre organisations pour renforcer le mouvement féministe.",
        },
      ],
    },
    impact: [
      { number: "35+", label: "Organisations partenaires", description: "au niveau national et international" },
      { number: "8", label: "Réseaux actifs", description: "auxquels nous participons" },
      { number: "20", label: "Projets collaboratifs", description: "menés avec des partenaires" },
    ],
    activities: [
      "/networking-partnership-collaboration-women-organiz.jpg",
      "/african-women-in-community-meeting-discussing-righ.jpg",
      "/empowered-african-women-standing-together-in-solid.jpg",
      "/community-awareness-workshop-senegal-women.jpg",
    ],
    relatedPrograms: [
      {
        title: "Leadership des Jeunes Femmes",
        slug: "leadership-jeunes-femmes",
        image: "/young-leaders-workshop-senegal.jpg",
      },
      {
        title: "Soutien aux Survivantes",
        slug: "soutien-survivantes",
        image: "/support-center-dakar.jpg",
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
          alt={intervention.title}
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
              Des résultats concrets qui témoignent de notre engagement
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
                {intervention.activities.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Activité ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
