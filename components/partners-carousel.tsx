"use client"

import { useEffect, useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const partners = [
  { name: "AWFDF", logo: "/2-LOGO-AWFDF-300x165.png" },
  { name: "BFF", logo: "/3-BFF-150x150.png" },
  { name: "Collectif", logo: "/collectif.png" },
  { name: "Equipop", logo: "/equipop.png" },
  { name: "GFFW", logo: "/gffw.png" },
  { name: "J-GEN TV", logo: "/jgentv_preview_rev_1-300x185.png" },
  { name: "AWFDF Logo", logo: "/LOGO-AWFDF.png" },
  { name: "PPglobal", logo: "/PPglobal.png" },
  { name: "Save the Children", logo: "/save-the-children.png" },
  { name: "Speak Up Africa", logo: "/SpeakupAfrica-logo_72dpi-300x169.jpg" },
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
