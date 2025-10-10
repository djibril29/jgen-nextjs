"use client"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState, useEffect, useRef } from "react"
import { NewsletterModal } from "@/components/newsletter-modal"
import { Button } from "@/components/ui/button"

const stats = [
  { number: 1200, suffix: "+", label: "femmes/filles formées" },
  { number: 2600, suffix: "+", label: "personnes sensibilisées" },
  { number: 50, suffix: "+", label: "communautés touchées" },
]

// Composant pour animer le comptage
function CountUpAnimation({ end, suffix, duration = 2000, isVisible }: { end: number; suffix: string; duration?: number; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    
    hasAnimated.current = true
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function pour un effet plus naturel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isVisible, end, duration])

  // Formater le nombre avec des virgules pour les milliers
  const formattedCount = count.toLocaleString('fr-FR')

  return (
    <span>
      {formattedCount}{suffix}
    </span>
  )
}

export function Impact() {
  const titleReveal = useScrollReveal({ threshold: 0.2 })
  const stat1Reveal = useScrollReveal({ threshold: 0.2 })
  const stat2Reveal = useScrollReveal({ threshold: 0.2 })
  const stat3Reveal = useScrollReveal({ threshold: 0.2 })
  const ctaReveal = useScrollReveal({ threshold: 0.2 })

  const statReveals = [stat1Reveal, stat2Reveal, stat3Reveal]

  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)

  return (
    <>
      <section id="impact" className="py-20 lg:py-32 bg-gradient-to-br from-[#3d1f47] to-[#2d1537] relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#a42c64] opacity-60 z-0" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#ffd23f] opacity-50 z-0 rotate-12" />
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-[#00d4aa] opacity-40 z-0 -rotate-12" />
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-[#8c80f7] opacity-60 z-0" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            ref={titleReveal.ref}
            className={`text-center mb-16 scroll-reveal ${titleReveal.isVisible ? "is-visible" : ""}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance text-white">Notre impact en 2024</h2>
            <p className="text-xl md:text-2xl text-white/80">J-GEN SENEGAL c'est...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {stats.map((stat, index) => {
              const reveal = statReveals[index]
              return (
                <div
                  key={index}
                  ref={reveal.ref}
                  className={`text-center scroll-reveal-scale delay-${(index + 1) * 100} ${reveal.isVisible ? "is-visible" : ""}`}
                >
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#ffd23f] mb-3">
                    <CountUpAnimation 
                      end={stat.number} 
                      suffix={stat.suffix}
                      duration={2000}
                      isVisible={reveal.isVisible}
                    />
                  </div>
                  <div className="text-lg md:text-xl text-white/90 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>

          <div ref={ctaReveal.ref} className={`scroll-reveal-scale ${ctaReveal.isVisible ? "is-visible" : ""}`}>
            <div className="bg-white text-gray-900 rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
              {/* Small decorative square inside the CTA box */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#c61d4d] opacity-20" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#ffd23f] opacity-20 rotate-45" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                  Ne ratez pas nos nouvelles
                </h3>
                <p className="text-xl md:text-2xl mb-8 text-pretty leading-relaxed text-gray-700">
                  Restez informé de nos actions, événements et histoires inspirantes. Abonnez-vous à notre newsletter.
                </p>

                <Button
                  size="lg"
                  onClick={() => setIsNewsletterOpen(true)}
                  className="bg-[#c61d4d] text-white hover:bg-[#c61d4d]/90 font-semibold px-12 py-6 text-xl md:text-2xl h-auto hover:scale-105 transition-all"
                >
                  S'abonner maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterModal open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
    </>
  )
}
