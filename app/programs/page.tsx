import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Programs } from "@/components/programs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programmes - Nos Actions",
  description: "Découvrez nos programmes d'action contre les violences basées sur le genre au Sénégal : sensibilisation, formation, accompagnement et plaidoyer pour les droits des femmes et filles.",
  alternates: {
    canonical: 'https://jgen.sn/programs',
  },
  openGraph: {
    title: "Programmes - J-GEN SENEGAL",
    description: "Nos programmes d'action contre les VBG au Sénégal",
    url: "https://jgen.sn/programs",
    images: ["/nos-programmes.png"],
  },
  keywords: [
    "programmes J-GEN SENEGAL",
    "actions VBG Sénégal",
    "formation femmes",
    "sensibilisation communautaire",
    "accompagnement survivantes",
    "plaidoyer droits femmes"
  ]
}

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Programs />
      <Footer />
    </main>
  )
}
