import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel.server"
import { Mission } from "@/components/mission"
import { Priorities } from "@/components/priorities"
import { NewsSection } from "@/components/news-section"
import { PartnersCarousel } from "@/components/partners-carousel"
import { Impact } from "@/components/impact"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense fallback={<HeroCarouselSkeleton />}>
        <HeroCarousel />
      </Suspense>
      <Mission />
      <Priorities />
      <NewsSection />
      <PartnersCarousel />
      <Impact />
      <Footer />
    </main>
  )
}

// Skeleton loader for the hero carousel
function HeroCarouselSkeleton() {
  return (
    <section className="relative pt-20 overflow-hidden isolate" style={{ zIndex: 1 }}>
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] bg-gradient-to-br from-muted/50 to-muted/20 animate-pulse">
        <div className="container mx-auto px-4 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl space-y-4">
            <div className="h-8 w-32 bg-muted rounded-full" />
            <div className="h-16 w-full bg-muted rounded" />
            <div className="h-24 w-3/4 bg-muted rounded" />
            <div className="flex gap-4">
              <div className="h-14 w-48 bg-muted rounded" />
              <div className="h-14 w-40 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
