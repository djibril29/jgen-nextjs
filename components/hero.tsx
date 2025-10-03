import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative pt-20 pb-0 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/empowered-african-women-standing-together-in-solid.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-balance leading-tight">
            Renforcer le pouvoir des femmes. <span className="text-primary">Soutenir les communautés.</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-10 text-pretty leading-relaxed max-w-2xl">
            J-GEN SENEGAL œuvre pour un Sénégal où les femmes et les filles vivent libres de toute violence et
            discrimination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-8"
              asChild
            >
              <Link href="/about">
                Découvrir notre action
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-2 bg-transparent" asChild>
              <Link href="/contact">Nous soutenir</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
