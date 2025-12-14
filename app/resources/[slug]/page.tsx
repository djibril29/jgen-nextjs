import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"

// Récupérer une ressource depuis Sanity
async function getResource(slug: string) {
  const query = `*[_type == "resource" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    category,
    type,
    featuredImage,
    pdfFile{
      asset->{
        _id,
        _ref,
        url
      }
    },
    content,
    externalUrl,
    videoUrl,
    author,
    publishedAt,
    featured,
    tags
  }`

  return client.fetch(query, { slug })
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = await getResource(slug)

  if (!resource) {
    notFound()
  }

  // Récupérer l'URL du PDF depuis Sanity
  const pdfUrl = resource.pdfFile?.asset?.url || null

  // Composant pour afficher le contenu selon le type de ressource
  const renderResourceContent = () => {
    switch (resource.type) {
      case 'pdf':
        return (
          <div className="space-y-6">
            {pdfUrl && (
              <>
                {/* Barre d'actions */}
                <div className="bg-primary/10 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Download className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Fichier PDF</p>
                      <p className="text-sm text-muted-foreground">Consultez le document ci-dessous ou téléchargez-le</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button asChild variant="default" className="flex-1 sm:flex-initial">
                      <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 sm:flex-initial">
                      <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ouvrir
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Visualiseur PDF intégré - Pleine largeur */}
                <div className="-mx-8 sm:-mx-12 md:-mx-16 lg:-mx-24">
                  <div className="w-full border-y-2 border-border overflow-hidden shadow-2xl bg-gray-50">
                    <div className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">📄 Aperçu du document</span>
                      <span className="text-xs text-gray-300 hidden sm:inline">Utilisez la molette pour naviguer • Cliquez sur le PDF pour zoomer</span>
                    </div>
                    <iframe
                      src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                      className="w-full h-[85vh] min-h-[600px] bg-white"
                      title={resource.title}
                      allow="fullscreen"
                    />
                  </div>
                </div>

                {/* Message d'aide */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                  <p className="text-blue-900">
                    <strong>💡 Astuce :</strong> Le PDF ne s'affiche pas correctement ? 
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline ml-1">
                      Ouvrez-le dans un nouvel onglet
                    </a> ou téléchargez-le pour une meilleure expérience de lecture.
                  </p>
                </div>
              </>
            )}
          </div>
        )

      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            {resource.content && <PortableText value={resource.content} />}
          </div>
        )

      case 'link':
        return (
          <div className="space-y-6">
            {resource.externalUrl && (
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Lien externe</p>
                    <p className="text-sm text-muted-foreground">Accéder à la ressource externe</p>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ouvrir le lien externe
                  </a>
                </Button>
              </div>
            )}
          </div>
        )

      case 'video':
        return (
          <div className="space-y-6">
            {resource.videoUrl && (
              <div className="aspect-video">
                <iframe
                  src={resource.videoUrl}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title={resource.title}
                />
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/resources" className="inline-flex items-center text-primary hover:underline mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux ressources
            </Link>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary">Accueil</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-primary">Ressources</Link>
              <span>/</span>
              <span className="text-foreground">{resource.title}</span>
            </div>

            {/* Resource Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {resource.category}
                </Badge>
                <Badge variant="outline">
                  {resource.type === 'pdf' ? 'PDF' :
                   resource.type === 'text' ? 'Texte' :
                   resource.type === 'link' ? 'Lien externe' : 'Vidéo'}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
                {resource.title}
              </h1>

              {resource.description && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                  {resource.description}
                </p>
              )}

              {/* Featured Image */}
              {resource.featuredImage && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={urlFor(resource.featuredImage).width(1200).height(600).url()}
                    alt={resource.featuredImage.alt || resource.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {resource.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Auteur: {resource.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Publié le {new Date(resource.publishedAt).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Content */}
      <section className="py-12">
        <div className={`container mx-auto px-4 lg:px-8 ${resource.type === 'pdf' ? 'max-w-7xl' : ''}`}>
          <div className={resource.type === 'pdf' ? 'max-w-7xl mx-auto' : 'max-w-4xl mx-auto'}>
            <Card className={resource.type === 'pdf' ? 'overflow-visible' : ''}>
              <CardContent className={resource.type === 'pdf' ? 'p-4 sm:p-6 md:p-8' : 'p-8'}>
                {renderResourceContent()}
              </CardContent>
            </Card>

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Mots-clés</h3>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
