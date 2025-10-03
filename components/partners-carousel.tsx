"use client"

import { useEffect, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const partners = [
  { name: "ONU Femmes", logo: "/un-women-logo.png" },
  { name: "UNICEF", logo: "/unicef-logo.png" },
  { name: "Union Africaine", logo: "/african-union-logo.jpg" },
  { name: "Ministère de la Femme", logo: "/ministry-women-senegal-logo.jpg" },
  { name: "USAID", logo: "/generic-aid-logo.png" },
  { name: "Oxfam", logo: "/oxfam-logo.jpg" },
  { name: "Plan International", logo: "/plan-international-logo.jpg" },
  { name: "Care International", logo: "/care-international-logo.jpg" },
]

export function PartnersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleReveal = useScrollReveal({ threshold: 0.2 })
  const carouselReveal = useScrollReveal({ threshold: 0.2 })

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollAmount += scrollSpeed
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount

        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0
        }
      }
    }

    const intervalId = setInterval(scroll, 20)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div ref={titleReveal.ref} className={`scroll-reveal ${titleReveal.isVisible ? "is-visible" : ""}`}>
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            Nos Partenaires
          </h2>
        </div>

        <div
          ref={carouselReveal.ref}
          className={`relative overflow-hidden scroll-reveal-scale ${carouselReveal.isVisible ? "is-visible" : ""}`}
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          <div ref={scrollRef} className="flex gap-12 overflow-x-hidden" style={{ scrollBehavior: "auto" }}>
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-8 text-muted-foreground font-serif text-lg md:text-xl">
          Nous collaborons avec des organisations locales et internationales pour amplifier notre impact
        </p>
      </div>
    </section>
  )
}
