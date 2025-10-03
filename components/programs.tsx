import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Home, Briefcase, Scale } from "lucide-react"
import Link from "next/link"

const programs = [
  {
    icon: BookOpen,
    title: "Éducation et Sensibilisation",
    description:
      "Ateliers communautaires et programmes éducatifs qui sensibilisent à la violence basée sur le genre, aux droits des femmes et à l'égalité des genres.",
    initiatives: [
      "Programmes d'éducation au genre dans les écoles",
      "Campagnes de sensibilisation communautaire",
      "Formation au leadership des jeunes",
    ],
    image: "/community-education-workshop.jpg",
    slug: "education-sensibilisation",
  },
  {
    icon: Home,
    title: "Services de Soutien aux Survivantes",
    description:
      "Soutien complet pour les survivantes de violence basée sur le genre, incluant conseil, aide juridique et services d'hébergement sécurisé.",
    initiatives: ["Intervention de crise et conseil", "Réseau de maisons sûres", "Soutien médical et psychologique"],
    image: "/legal-rights-justice.jpg",
    slug: "soutien-survivantes",
  },
  {
    icon: Briefcase,
    title: "Autonomisation Économique",
    description:
      "Programmes offrant aux femmes une formation professionnelle, des opportunités de microfinance et des voies vers l'indépendance économique.",
    initiatives: [
      "Formation aux compétences professionnelles",
      "Développement de micro-entreprises",
      "Ateliers d'éducation financière",
    ],
    image: "/african-women-empowerment-community.jpg",
    slug: "autonomisation-economique",
  },
  {
    icon: Scale,
    title: "Plaidoyer Juridique",
    description:
      "Travail pour renforcer les protections juridiques des femmes et des filles, et assurer l'accès à la justice pour les survivantes de violence.",
    initiatives: [
      "Aide et représentation juridique",
      "Plaidoyer et réforme des politiques",
      "Campagnes de sensibilisation aux droits",
    ],
    image: "/women-leadership-empowerment.jpg",
    slug: "plaidoyer-juridique",
  },
]

export function Programs() {
  return (
    <section id="programs" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <Link key={index} href={`/programs/${program.slug}`}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group h-full cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4">
                    <program.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {program.initiatives.map((initiative, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm text-muted-foreground">{initiative}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
