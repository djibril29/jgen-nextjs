"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Values } from "@/components/values"
import { Megaphone, Users, TrendingUp, Network } from "lucide-react"
import Link from "next/link"
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
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Violet avec carrés décoratifs */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#3d1f47] to-[#2d1537] relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-[#ffd23f] opacity-40 z-0 rotate-12" />
        <div className="absolute bottom-10 left-10 w-28 h-28 bg-[#00d4aa] opacity-30 z-0 -rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#8c80f7] opacity-20 z-0" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              À Propos de J-GEN SENEGAL
            </h1>
            <div className="w-24 h-1 bg-[#ffd23f] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Nous sommes une organisation féministe engagée à créer un Sénégal où les femmes et les filles vivent libres de toute violence, avec des opportunités et des droits égaux.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-[#a42c64] opacity-40 z-0 rotate-12" />
        <div className="absolute bottom-20 left-10 w-28 h-28 bg-[#ffd23f] opacity-50 z-0" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div ref={storyReveal.ref} className={`scroll-reveal ${storyReveal.isVisible ? "is-visible" : ""}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900">Notre histoire</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-12" />
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6 text-xl">
                  J-GEN SENEGAL a été fondée avec la vision de créer un changement durable dans la lutte contre les
                  violences basées sur le genre au Sénégal. Née des expériences collectives et de la détermination de
                  femmes qui ont refusé d'accepter la violence comme inévitable, notre organisation est devenue une
                  force puissante pour le changement.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-xl">
                  Nous travaillons à l'intersection du plaidoyer, de l'éducation et du soutien direct, reconnaissant que
                  mettre fin aux violences basées sur le genre nécessite une approche multidimensionnelle. Notre équipe
                  de professionnels dévoués et de bénévoles travaille sans relâche pour créer des espaces sûrs, fournir
                  des ressources et plaider pour des changements politiques qui protègent les femmes et les filles.
                </p>
                <p className="text-gray-700 leading-relaxed text-xl">
                  Grâce à des partenariats avec les communautés locales, les agences gouvernementales et les
                  organisations internationales, nous construisons un mouvement qui remet en question les normes
                  néfastes et crée des voies vers l'autonomisation des femmes et des filles à travers le Sénégal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#3d1f47] to-[#2d1537] relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#8c80f7] opacity-50 z-0" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#00d4aa] opacity-40 z-0 rotate-45" />
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-[#ffd23f] opacity-30 z-0 -rotate-12" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div ref={videoReveal.ref} className={`scroll-reveal-scale ${videoReveal.isVisible ? "is-visible" : ""}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">Découvrez J-GEN SENEGAL</h2>
              <div className="w-24 h-1 bg-[#ffd23f] mx-auto mb-8" />
              <p className="text-center text-white/80 mb-12 text-xl max-w-3xl mx-auto">
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

      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-40 left-5 w-16 h-16 bg-[#c61d4d] opacity-30 z-0 rotate-45" />
        <div className="absolute bottom-40 right-5 w-20 h-20 bg-[#8c80f7] opacity-40 z-0" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div
              ref={interventionsReveal.ref}
              className={`scroll-reveal ${interventionsReveal.isVisible ? "is-visible" : ""}`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900">Nos domaines d'intervention</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8" />
              <p className="text-center text-gray-700 mb-12 text-xl max-w-3xl mx-auto">
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
                          <div className="absolute inset-0 bg-gradient-to-t from-[#3d1f47]/95 via-[#3d1f47]/60 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 bg-[#ffd23f] rounded-full flex items-center justify-center">
                                <Icon className="h-6 w-6 text-gray-900" />
                              </div>
                              <h3 className="text-2xl md:text-3xl font-bold text-white">{item.title}</h3>
                            </div>
                            <p className="text-white/90 leading-relaxed text-lg">{item.description}</p>
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
