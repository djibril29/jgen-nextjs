import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ressources - Documentation et Guides",
  description: "Accédez à nos ressources documentaires : guides pratiques, fiches informatives, rapports et documentation sur les violences basées sur le genre au Sénégal.",
  alternates: {
    canonical: 'https://jgen.sn/resources',
  },
  openGraph: {
    title: "Ressources - J-GEN SENEGAL",
    description: "Documentation et guides sur les VBG",
    url: "https://jgen.sn/resources",
    images: ["/legal-rights-justice.jpg"],
  },
  keywords: [
    "ressources J-GEN SENEGAL",
    "guides VBG",
    "documentation violences genre",
    "fiches informatives",
    "rapports droits femmes",
    "outils sensibilisation"
  ]
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
