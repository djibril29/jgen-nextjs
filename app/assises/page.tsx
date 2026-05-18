import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssisesHero } from "@/components/assises-hero"
import { AssisesOnline } from "@/components/assises-online"
import { AssisesCalendar } from "@/components/assises-calendar"
import { AssisesFeedback } from "@/components/assises-feedback"
import { AssisesDocument, type AssisesDoc } from "@/components/assises-document"
import { client } from "@/sanity/lib/client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Assises nationales citoyennes sur les droits des femmes et des filles au Sénégal",
  description:
    "Atelier d'installation et de structuration du comité de pilotage des Assises nationales citoyennes sur les droits des femmes et des filles au Sénégal.",
  alternates: { canonical: "https://jgen.sn/assises" },
  openGraph: {
    title: "Assises nationales citoyennes sur les droits des femmes et des filles au Sénégal",
    description:
      "Atelier d'installation et de structuration du comité de pilotage. Rejoignez J-GEN SENEGAL pour bâtir un mouvement national pour les droits des femmes et des filles.",
    url: "https://jgen.sn/assises",
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

export const revalidate = 60

async function getAssisesDocuments(): Promise<AssisesDoc[]> {
  const query = `*[_type == "assisesDocument" && defined(pdfFile.asset)] | order(publishedAt desc) {
    _id,
    title,
    description,
    category,
    publishedAt,
    "fileUrl": pdfFile.asset->url,
    "fileSize": pdfFile.asset->size,
    "originalFilename": pdfFile.asset->originalFilename
  }`

  try {
    return await client.fetch<AssisesDoc[]>(query, {}, {
      next: { revalidate: 60 },
    })
  } catch (error) {
    console.error("Failed to fetch Assises documents:", error)
    return []
  }
}

export default async function AssisesPage() {
  const documents = await getAssisesDocuments()

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AssisesHero />
      <AssisesOnline />
      <AssisesCalendar />
      <AssisesFeedback />
      <AssisesDocument documents={documents} />
      <Footer />
    </main>
  )
}
