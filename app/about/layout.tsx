import { Metadata } from "next"

export const metadata: Metadata = {
  title: "À Propos - Notre Histoire et Mission",
  description: "Découvrez l'histoire de J-GEN SENEGAL, notre mission de lutte contre les violences basées sur le genre, nos valeurs et nos domaines d'intervention au Sénégal.",
  alternates: {
    canonical: 'https://jgen.sn/about',
  },
  openGraph: {
    title: "À Propos de J-GEN SENEGAL",
    description: "Découvrez notre histoire, mission et valeurs dans la lutte contre les VBG au Sénégal",
    url: "https://jgen.sn/about",
    images: ["/empowered-african-women-standing-together-in-solid.jpg"],
  },
  keywords: [
    "histoire J-GEN SENEGAL",
    "mission organisation féministe",
    "valeurs J-GEN",
    "domaines intervention VBG",
    "plaidoyer féministe Sénégal",
    "sensibilisation communautaire",
    "renforcement capacité femmes",
    "réseautage partenariat"
  ]
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
