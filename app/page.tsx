import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { Mission } from "@/components/mission"
import { Priorities } from "@/components/priorities"
import { NewsSection } from "@/components/news-section"
import { PartnersCarousel } from "@/components/partners-carousel"
import { Impact } from "@/components/impact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroCarousel />
      <Mission />
      <Priorities />
      <NewsSection />
      <PartnersCarousel />
      <Impact />
      <Footer />
    </main>
  )
}
