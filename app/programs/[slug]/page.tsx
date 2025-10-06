import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import { ProgramHeroImage } from "@/components/program-hero-image"

// Fetch program from Sanity
async function getProgram(slug: string) {
  const query = `*[_type=="program" && slug.current==$slug][0]{
    _id,
    title,
    summary,
    content,
    category,
    location,
    status,
    featuredImage,
    executionPeriod,
    beneficiaries,
    partners,
    impactStats,
    achievements,
    nextSteps,
    partnersEngaged,
    projectsCompleted,
    relatedPosts[]->{
      _id,
      title,
      "slug": slug.current,
      image,
      excerpt,
      publishedAt,
      "categories": categories[]->title
    }
  }`
  return client.fetch(query, { slug })
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = await getProgram(slug)

  // If program doesn't exist in Sanity, show 404
  if (!program) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Programme non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            Ce programme n'existe pas ou n'a pas encore été publié.
          </p>
          <Link href="/programs">
            <Button>Retour aux programmes</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <ProgramHeroImage 
        image={program.featuredImage}
        title={program.title}
        summary={program.summary}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/programs" className="inline-flex items-center text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux programmes
          </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Description */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                {program.title}
              </h1>
              
              {program.summary && (
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {program.summary}
                </p>
              )}

              {program.content && program.content.length > 0 && (
                <div className="prose prose-lg max-w-none">
                  <PortableText value={program.content} />
                </div>
              )}
        </div>

            {/* Réalisations */}
            {program.achievements && program.achievements.length > 0 && (
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Réalisations</h2>
                  <div className="prose prose-base max-w-none">
                    <PortableText value={program.achievements} />
        </div>
                </CardContent>
              </Card>
            )}

            {/* Prochaines étapes */}
            {program.nextSteps && program.nextSteps.length > 0 && (
              <Card className="border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Prochaines étapes</h2>
                  <div className="prose prose-base max-w-none">
                    <PortableText value={program.nextSteps} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actualités liées au programme */}
            {program.relatedPosts && program.relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Actualités liées au projet</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {program.relatedPosts.map((post: any) => (
                    <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                      <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all overflow-hidden">
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <img
                            src={post.image ? urlFor(post.image).width(800).height(500).url() : "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {post.categories && post.categories.length > 0 && (
                            <div className="absolute top-3 left-3">
                              <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                                {post.categories[0]}
                              </Badge>
          </div>
                          )}
        </div>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : ''}
                          </p>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Informations clés */}
              <Card className="bg-accent/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Informations clés</h3>
                  <div className="space-y-4">
                    {program.executionPeriod && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">Période d'exécution</span>
                        </div>
                        <p className="text-base font-semibold ml-6">{program.executionPeriod}</p>
        </div>
                    )}

                    {program.beneficiaries && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Users className="h-4 w-4" />
                          <span className="font-medium">Bénéficiaires</span>
                        </div>
                        <p className="text-base font-semibold ml-6">{program.beneficiaries}</p>
              </div>
                    )}

                    {program.location && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">Localisation</span>
          </div>
                        <p className="text-base font-semibold ml-6">{program.location}</p>
        </div>
                    )}

                    {program.status && (
                      <div>
                        <span className="text-sm text-muted-foreground font-medium">Statut</span>
                        <div className="mt-1">
                          <Badge variant={program.status === 'ongoing' ? 'default' : 'secondary'}>
                            {program.status === 'ongoing' ? 'En cours' : 
                             program.status === 'completed' ? 'Terminé' : 'À venir'}
                          </Badge>
                        </div>
          </div>
                    )}
                </div>
                </CardContent>
              </Card>

              {/* Statistiques d'impact */}
              {program.impactStats && program.impactStats.length > 0 && (
                <Card className="bg-primary/5">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Statistiques d'impact</h3>
                    <div className="space-y-4">
                      {program.impactStats.map((stat: any, index: number) => (
                        <div key={index} className="text-center py-2">
                          <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                      
                      {program.projectsCompleted && (
                        <div className="text-center py-2">
                          <div className="text-3xl font-bold text-primary mb-1">{program.projectsCompleted}</div>
                          <p className="text-sm text-muted-foreground">Projets réalisés</p>
          </div>
                      )}
                      
                      {program.partnersEngaged && (
                        <div className="text-center py-2">
                          <div className="text-3xl font-bold text-primary mb-1">{program.partnersEngaged}</div>
                          <p className="text-sm text-muted-foreground">Partenaires engagés</p>
        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Partenaires */}
              {program.partners && program.partners.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Partenaires</h3>
                    <div className="space-y-3">
                      {program.partners.map((partner: any, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          {partner.logo && (
                            <div className="w-12 h-12 relative flex-shrink-0">
                              <img
                                src={urlFor(partner.logo).width(100).height(100).url()}
                                alt={partner.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <span className="text-sm font-medium">{partner.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 py-12 bg-primary/10 -mx-4 px-4 lg:-mx-8 lg:px-8 text-center rounded-lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Découvrez nos autres programmes</h2>
            <p className="text-muted-foreground mb-6">
              Explorez l'ensemble de nos initiatives pour l'autonomisation des femmes et des filles
            </p>
            <Link href="/programs">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Voir tous les programmes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60
