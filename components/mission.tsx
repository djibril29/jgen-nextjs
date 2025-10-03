"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Mission() {
  const titleReveal = useScrollReveal({ threshold: 0.2 })
  const textReveal = useScrollReveal({ threshold: 0.2 })
  const imageReveal = useScrollReveal({ threshold: 0.2 })

  return (
    <section id="mission" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div ref={titleReveal.ref} className={`scroll-reveal-left ${titleReveal.isVisible ? "is-visible" : ""}`}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                  Appuyer des systèmes durables.
                </h2>
                <div className="w-20 h-1 bg-primary mb-8" />
              </div>

              <div ref={textReveal.ref} className={`scroll-reveal ${textReveal.isVisible ? "is-visible" : ""}`}>
                <p className="text-xl md:text-2xl leading-relaxed mb-6 font-semibold">
                  J-GEN SENEGAL est une organisation féministe qui œuvre pour les droits des femmes et des filles au
                  Sénégal.
                </p>
                <p className="text-xl leading-relaxed text-muted-foreground mb-6">
                  Avec nos partenaires, nous soutenons des solutions innovantes visant une prospérité et un bien-être
                  partagés et durables. L'égalité entre les femmes et les hommes, la diversité et l'inclusion sont au
                  cœur de toute notre action.
                </p>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  Notre approche est enracinée dans les principes féministes, en plaçant les voix et les expériences des
                  femmes et des filles au centre, tout en construisant des coalitions avec des alliés engagés pour la
                  justice de genre.
                </p>
              </div>
            </div>

            <div ref={imageReveal.ref} className={`scroll-reveal-right ${imageReveal.isVisible ? "is-visible" : ""}`}>
              <div className="overflow-hidden rounded-lg shadow-2xl">
                <img
                  src="/african-women-in-community-meeting-discussing-righ.jpg"
                  alt="Réunion communautaire"
                  className="w-full h-auto image-zoom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
