"use client"

import { useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { ChevronDown, ChevronUp } from "lucide-react"

export function Mission() {
  const [isExpanded, setIsExpanded] = useState(false)
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
                  Mot de Bienvenue de la Directrice Executive.
                </h2>
                <div className="w-20 h-1 bg-primary mb-8" />
              </div>

              <div ref={textReveal.ref} className={`scroll-reveal ${textReveal.isVisible ? "is-visible" : ""}`}>
                <p className="text-xl md:text-2xl leading-relaxed mb-6 font-semibold">
                  Je vous souhaite une cordiale bienvenue sur le site de l'association JGEN SÉNÉGAL, Women Global Entrepreneurship. Créée en Octobre 2016, JGEN est une association féministe à but non lucratif qui travaille essentiellement à contribuer à l'élimination des violences basées sur le genre notamment les violences sexuelles et sexistes contre les femmes et les filles et la promotion de la santé sexuelle et reproductive des femmes.
                </p>
                <p className="text-xl leading-relaxed text-muted-foreground mb-6">
                  JGEN est également engagée à accompagner l'entrepreneuriat féminin des jeunes femmes et des jeunes filles sénégalaises, à promouvoir les droits des enfants, la justice climatique de genre et la justice économique
                </p>
                
                {/* Texte dépliable */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xl leading-relaxed text-muted-foreground mb-6">
                    Sur notre site, vous trouverez l'actualité sur nos différents projets ainsi que nos événements en vue. Notre foire aux questions vous permettra d'avoir des réponses adéquates et des informations précises sur les différents projets de l'association.
                  </p>
                  <p className="text-xl leading-relaxed text-muted-foreground mb-6">
                    Vous aurez besoin de connaître les objectifs et les activités de l'association. Également, le site vous informera sur les appels à propositions de projets pour les jeunes femmes entrepreneures et éventuellement sur les grands projets en vue ou en cours d'exécution.
                  </p>
                  <p className="text-xl leading-relaxed text-muted-foreground italic">
                    Je souhaite plein succès aux jeunes entrepreneurs sénégalais que nous sommes.
                  </p>
                </div>

                {/* Bouton Lire plus/moins */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors group"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? "Lire moins" : "Lire plus"}
                >
                  <span>{isExpanded ? "Lire moins" : "Lire plus"}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                  ) : (
                    <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                  )}
                </button>
              </div>
            </div>

            <div ref={imageReveal.ref} className={`scroll-reveal-right ${imageReveal.isVisible ? "is-visible" : ""}`}>
              <div className="relative">
                {/* Decorative squares - similar to carousel */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#c61d4d] opacity-80 z-0" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#ffd23f] opacity-90 z-0 rotate-12" />
                <div className="absolute top-1/2 -right-4 w-24 h-24 bg-[#8c80f7] opacity-70 z-0" />
                
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg shadow-2xl z-10">
                  <img
                    src="/MAYA.jpeg"
                    alt="Réunion communautaire"
                    className="w-full h-auto image-zoom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
