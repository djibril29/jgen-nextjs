import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssisesHero } from "@/components/assises-hero"
import { AssisesCalendar } from "@/components/assises-calendar"
import { AssisesDocument } from "@/components/assises-document"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Assises nationales citoyennes sur les droits des femmes et des filles au Sénégal",
  description:
    "Atelier d'installation et de structuration du comité de pilotage des Assises nationales citoyennes sur les droits des femmes et des filles au Sénégal.",
  alternates: { canonical: "https://jgen.sn/assises-nationales" },
  openGraph: {
    title: "Assises nationales citoyennes sur les droits des femmes et des filles au Sénégal",
    description:
      "Atelier d'installation et de structuration du comité de pilotage. Rejoignez J-GEN SENEGAL pour bâtir un mouvement national pour les droits des femmes et des filles.",
    url: "https://jgen.sn/assises-nationales",
    images: [
      {
        url: "/Hero.png",
        width: 1024,
        height: 600,
        alt: "Assises nationales citoyennes — J-GEN SENEGAL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/Hero.png"],
  },
}

export default function AssisesNationalesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AssisesHero />
      <AssisesCalendar />
      <AssisesDocument />
      <Footer />
    </main>
  )
}
