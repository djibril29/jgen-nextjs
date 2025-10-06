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
      <section id="impact" className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div
            ref={titleReveal.ref}
            className={`text-center mb-16 scroll-reveal ${titleReveal.isVisible ? "is-visible" : ""}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">Notre impact en 2024</h2>
            <p className="text-xl md:text-2xl text-muted-foreground">J-GEN SENEGAL c'est...</p>
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
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-3">
                    <CountUpAnimation 
                      end={stat.number} 
                      suffix={stat.suffix}
                      duration={2000}
                      isVisible={reveal.isVisible}
                    />
                  </div>
                  <div className="text-lg md:text-xl text-muted-foreground font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>

          <div ref={ctaReveal.ref} className={`scroll-reveal-scale ${ctaReveal.isVisible ? "is-visible" : ""}`}>
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-2xl">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                Ne ratez pas nos nouvelles
              </h3>
              <p className="text-xl md:text-2xl mb-8 text-pretty leading-relaxed opacity-95">
                Restez informé de nos actions, événements et histoires inspirantes. Abonnez-vous à notre newsletter.
              </p>

              <Button
                size="lg"
                onClick={() => setIsNewsletterOpen(true)}
                className="bg-background text-foreground hover:bg-background/90 font-semibold px-12 py-6 text-xl md:text-2xl h-auto hover:scale-105 transition-all"
              >
                S'abonner maintenant
              </Button>
            </div>
          </div>
        </div>
      </section>

      <NewsletterModal open={isNewsletterOpen} onOpenChange={setIsNewsletterOpen} />
    </>
  )
}
