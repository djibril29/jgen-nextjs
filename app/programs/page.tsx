import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Programs } from "@/components/programs"

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Programs />
      <Footer />
    </main>
  )
}
