import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Programs } from "@/components/programs"
import { PageHero } from "@/components/page-hero"

export default function ProgramsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <PageHero
        category="NOS PROGRAMMES"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Programmes", href: "/programs" },
        ]}
        title="NOS PROGRAMMES"
        description="Des initiatives complètes conçues pour prévenir la violence basée sur le genre, soutenir les survivantes et créer un changement durable dans les communautés à travers le Sénégal."
        image="/community-education-workshop.jpg"
        imageAlt="Programmes de J-GEN SENEGAL"
      />

      <Programs />

      <Footer />
    </main>
  )
}
