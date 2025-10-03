"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, FileText, Video, BookOpen, Search, Eye } from "lucide-react"
import { PageHero } from "@/components/page-hero"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const resources = [
    {
      title: "Comprendre vos droits",
      description: "Un guide complet sur les droits légaux et les protections pour les femmes au Sénégal.",
      type: "Guide PDF",
      category: "Droits",
      icon: FileText,
      size: "2.4 MB",
      content:
        "Ce guide détaille les droits fondamentaux des femmes au Sénégal, incluant les droits à l'éducation, à la santé, à la propriété, et à la protection contre la violence. Il explique également les recours légaux disponibles et comment accéder aux services de soutien.",
    },
    {
      title: "Planification de la sécurité",
      description: "Ressources étape par étape pour créer un plan de sécurité personnel.",
      type: "Boîte à outils PDF",
      category: "Sécurité",
      icon: FileText,
      size: "1.8 MB",
      content:
        "Cette boîte à outils fournit des stratégies pratiques pour créer un plan de sécurité personnalisé, identifier les signes de danger, préparer une sortie d'urgence, et accéder aux ressources de soutien. Inclut des listes de contrôle et des modèles.",
    },
    {
      title: "Reconnaître les signes d'abus",
      description: "Matériel éducatif sur l'identification des différentes formes de violence basée sur le genre.",
      type: "Série vidéo",
      category: "Éducation",
      icon: Video,
      size: "Regarder en ligne",
      content:
        "Cette série vidéo éducative explore les différentes formes de violence basée sur le genre, y compris la violence physique, émotionnelle, économique et sexuelle. Elle aide à reconnaître les signes d'alerte et à comprendre les cycles de violence.",
    },
    {
      title: "Guide du facilitateur communautaire",
      description: "Matériel de formation pour les leaders communautaires et les défenseurs.",
      type: "Manuel PDF",
      category: "Formation",
      icon: BookOpen,
      size: "5.2 MB",
      content:
        "Ce manuel complet fournit des outils et des méthodologies pour les facilitateurs communautaires travaillant sur les questions de genre. Il inclut des modules de formation, des activités de groupe, et des stratégies de mobilisation communautaire.",
    },
    {
      title: "Autonomisation économique des femmes",
      description: "Stratégies et ressources pour l'entrepreneuriat féminin et l'indépendance financière.",
      type: "Guide PDF",
      category: "Économie",
      icon: FileText,
      size: "3.1 MB",
      content:
        "Ce guide explore les opportunités d'autonomisation économique pour les femmes, incluant l'accès au crédit, la création d'entreprise, la gestion financière, et les réseaux de soutien entrepreneurial au Sénégal.",
    },
    {
      title: "Leadership féminin et participation politique",
      description: "Ressources pour encourager la participation des femmes dans la vie politique.",
      type: "Manuel PDF",
      category: "Leadership",
      icon: BookOpen,
      size: "4.5 MB",
      content:
        "Ce manuel examine les barrières à la participation politique des femmes et propose des stratégies pour renforcer le leadership féminin, développer des compétences en plaidoyer, et naviguer dans les espaces politiques.",
    },
    {
      title: "Santé reproductive et droits",
      description: "Informations essentielles sur la santé reproductive et les droits des femmes.",
      type: "Guide PDF",
      category: "Santé",
      icon: FileText,
      size: "2.8 MB",
      content:
        "Ce guide couvre les aspects essentiels de la santé reproductive, incluant la planification familiale, les soins prénataux, les droits reproductifs, et l'accès aux services de santé au Sénégal.",
    },
    {
      title: "Éducation des filles et égalité",
      description: "Stratégies pour promouvoir l'éducation des filles et éliminer les barrières.",
      type: "Série vidéo",
      category: "Éducation",
      icon: Video,
      size: "Regarder en ligne",
      content:
        "Cette série explore les défis auxquels font face les filles dans l'accès à l'éducation et présente des solutions innovantes pour promouvoir l'égalité éducative, réduire l'abandon scolaire, et créer des environnements d'apprentissage sûrs.",
    },
  ]

  const categories = ["Tous", "Droits", "Sécurité", "Éducation", "Formation", "Économie", "Leadership", "Santé"]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Tous" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen">
      <Header />

      <PageHero
        category="RESSOURCES"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/resources" },
        ]}
        title="RESSOURCES & DOCUMENTATION"
        description="Accédez à nos matériels éducatifs, boîtes à outils, et ressources pour soutenir les survivantes et les défenseurs dans la lutte contre la violence basée sur le genre."
        image="/capacity-building-training-women-empowerment.jpg"
        imageAlt="Ressources J-GEN SENEGAL"
      />

      <section className="py-8 lg:py-12 bg-background border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher des ressources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <p className="text-muted-foreground">
                {filteredResources.length} ressource{filteredResources.length !== 1 ? "s" : ""} trouvée
                {filteredResources.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                              {resource.category}
                            </span>
                            <span>•</span>
                            <span>{resource.type}</span>
                            <span>•</span>
                            <span>{resource.size}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">{resource.description}</p>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              <Eye className="mr-2 h-4 w-4" />
                              Lire
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl mb-4">{resource.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                                  {resource.category}
                                </span>
                                <span>•</span>
                                <span>{resource.type}</span>
                                <span>•</span>
                                <span>{resource.size}</span>
                              </div>
                              <p className="text-lg leading-relaxed">{resource.content}</p>
                              <div className="pt-4 border-t">
                                <Button className="w-full">
                                  <Download className="mr-2 h-4 w-4" />
                                  Télécharger la ressource complète
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
