"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Values } from "@/components/values"
import { Megaphone, Users, TrendingUp, Network } from "lucide-react"
import Link from "next/link"
import { PageHero } from "@/components/page-hero"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function AboutPage() {
  const storyReveal = useScrollReveal({ threshold: 0.2 })
  const videoReveal = useScrollReveal({ threshold: 0.2 })
  const interventionsReveal = useScrollReveal({ threshold: 0.2 })
  const card1Reveal = useScrollReveal({ threshold: 0.1 })
  const card2Reveal = useScrollReveal({ threshold: 0.1 })
  const card3Reveal = useScrollReveal({ threshold: 0.1 })
  const card4Reveal = useScrollReveal({ threshold: 0.1 })

  const cardReveals = [card1Reveal, card2Reveal, card3Reveal, card4Reveal]

  return (
    <main className="min-h-screen">
      <Header />

      <PageHero
        category="QUI SOMMES-NOUS"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "À propos", href: "/about" },
        ]}
        title="À PROPOS DE J-GEN SENEGAL"
        description="Nous sommes une organisation féministe engagée à créer un Sénégal où les femmes et les filles vivent libres de toute violence, avec des opportunités et des droits égaux."
        image="/nos-programmes.png"
        imageAlt="Femmes sénégalaises engagées pour l'égalité"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div ref={storyReveal.ref} className={`scroll-reveal ${storyReveal.isVisible ? "is-visible" : ""}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Notre histoire</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6 text-xl">
                  J-GEN SENEGAL a été fondée avec la vision de créer un changement durable dans la lutte contre les
                  violences basées sur le genre au Sénégal. Née des expériences collectives et de la détermination de
                  femmes qui ont refusé d'accepter la violence comme inévitable, notre organisation est devenue une
                  force puissante pour le changement.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6 text-xl">
                  Nous travaillons à l'intersection du plaidoyer, de l'éducation et du soutien direct, reconnaissant que
                  mettre fin aux violences basées sur le genre nécessite une approche multidimensionnelle. Notre équipe
                  de professionnels dévoués et de bénévoles travaille sans relâche pour créer des espaces sûrs, fournir
                  des ressources et plaider pour des changements politiques qui protègent les femmes et les filles.
                </p>
                <p className="text-muted-foreground leading-relaxed text-xl">
                  Grâce à des partenariats avec les communautés locales, les agences gouvernementales et les
                  organisations internationales, nous construisons un mouvement qui remet en question les normes
                  néfastes et crée des voies vers l'autonomisation des femmes et des filles à travers le Sénégal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-accent/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div ref={videoReveal.ref} className={`scroll-reveal-scale ${videoReveal.isVisible ? "is-visible" : ""}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Découvrez J-GEN SENEGAL</h2>
              <p className="text-center text-muted-foreground mb-12 text-xl max-w-3xl mx-auto">
                Regardez notre vidéo de présentation pour mieux comprendre notre mission, nos valeurs et notre impact
                sur les communautés sénégalaises.
              </p>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/IOBwnXGW3co"
                  title="Présentation J-GEN SENEGAL"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Values />

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div
              ref={interventionsReveal.ref}
              className={`scroll-reveal ${interventionsReveal.isVisible ? "is-visible" : ""}`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Nos domaines d'intervention</h2>
              <p className="text-center text-muted-foreground mb-12 text-xl max-w-3xl mx-auto">
                J-GEN SENEGAL intervient à travers quatre axes stratégiques pour promouvoir les droits des femmes et des
                filles au Sénégal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  href: "/interventions/plaidoyer",
                  image: "/african-women-advocacy-protest-rights.jpg",
                  alt: "Le plaidoyer",
                  icon: Megaphone,
                  title: "Le plaidoyer",
                  description:
                    "Influencer les politiques publiques et promouvoir les droits des femmes et des filles auprès des décideurs.",
                },
                {
                  href: "/interventions/sensibilisation",
                  image: "/community-awareness-workshop-senegal-women.jpg",
                  alt: "La sensibilisation communautaire",
                  icon: Users,
                  title: "La sensibilisation communautaire",
                  description:
                    "Éduquer et mobiliser les communautés pour transformer les normes sociales et prévenir les violences.",
                },
                {
                  href: "/interventions/renforcement-capacite",
                  image: "/capacity-building-training-women-empowerment.jpg",
                  alt: "Le renforcement de capacité",
                  icon: TrendingUp,
                  title: "Le renforcement de capacité",
                  description:
                    "Former et outiller les femmes, les filles et les acteurs clés pour renforcer leur autonomie et leur leadership.",
                },
                {
                  href: "/interventions/reseautage-partenariat",
                  image: "/networking-partnership-collaboration-women-organiz.jpg",
                  alt: "Le réseautage et partenariat",
                  icon: Network,
                  title: "Le réseautage et partenariat",
                  description:
                    "Créer des alliances stratégiques et collaborer avec des organisations pour amplifier notre impact.",
                },
              ].map((item, index) => {
                const reveal = cardReveals[index]
                const Icon = item.icon
                return (
                  <Link key={index} href={item.href} className="group">
                    <div
                      ref={reveal.ref}
                      className={`scroll-reveal delay-${(index + 1) * 100} ${reveal.isVisible ? "is-visible" : ""}`}
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="aspect-[4/3] relative">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.alt}
                            className="w-full h-full object-cover image-zoom group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <Icon className="h-6 w-6 text-primary-foreground" />
                              </div>
                              <h3 className="text-2xl md:text-3xl font-bold text-background">{item.title}</h3>
                            </div>
                            <p className="text-background/90 leading-relaxed text-lg">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
