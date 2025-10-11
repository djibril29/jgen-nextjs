import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Nous Contacter",
  description: "Contactez J-GEN SENEGAL pour toute question, demande d'aide ou collaboration. Nous sommes là pour soutenir les femmes et filles victimes de violences basées sur le genre au Sénégal.",
  alternates: {
    canonical: 'https://jgen.sn/contact',
  },
  openGraph: {
    title: "Contact - J-GEN SENEGAL",
    description: "Contactez-nous pour toute question ou demande d'aide",
    url: "https://jgen.sn/contact",
    images: ["/support-center-dakar.jpg"],
  },
  keywords: [
    "contact J-GEN SENEGAL",
    "aide femmes victimes VBG",
    "numéro urgence violences",
    "centre d'écoute Dakar",
    "accompagnement juridique",
    "soutien psychologique femmes"
  ]
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Hero */}
      <PageHero
        category="CONTACTEZ-NOUS"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        title="CONTACTEZ-NOUS"
        description="Que vous ayez besoin de soutien, que vous souhaitiez vous impliquer ou que vous ayez des questions sur notre travail, nous sommes là pour vous aider. Contactez-nous dès aujourd'hui."
        image="/african-women-advocacy-protest-rights.jpg"
        imageAlt="Contactez J-GEN SENEGAL"
      />

      {/* Contact Information */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dakar, Senegal
                  <br />
                  [Address Details]
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground leading-relaxed">
                  +221 XX XXX XXXX
                  <br />
                  24/7 Hotline
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground leading-relaxed">
                  info@jgensenegal.org
                  <br />
                  support@jgensenegal.org
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mon-Fri: 9AM - 5PM
                  <br />
                  Emergency: 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <Footer />
    </main>
  )
}
