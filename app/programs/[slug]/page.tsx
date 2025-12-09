import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import { ProgramHeroImage } from "@/components/program-hero-image"
import { CounterAnimation } from "@/components/counter-animation"
import { ProgramsCTA } from "@/components/programs-cta"
import { ProgramGallery } from "@/components/program-gallery"

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
    gallery,
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
  return client.fetch(query, { slug }, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
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

      {/* Main Content - Single Column Clean Design */}
      <div className="relative">
        {/* Decorative Squares */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 -left-10 w-32 h-32 bg-[#c61d4d] opacity-10 rotate-12 animate-float" />
          <div className="absolute top-96 right-20 w-24 h-24 bg-[#00d4aa] opacity-15 -rotate-6 animate-float-delayed" />
          <div className="absolute top-[800px] -left-16 w-40 h-40 bg-[#ffd23f] opacity-10 rotate-45 animate-float" />
          <div className="absolute top-[1200px] right-10 w-28 h-28 bg-[#8c80f7] opacity-15 -rotate-12 animate-float-delayed" />
          <div className="absolute bottom-96 left-32 w-36 h-36 bg-[#c61d4d] opacity-10 rotate-[30deg] animate-float" />
          <div className="absolute bottom-64 -right-12 w-32 h-32 bg-[#00d4aa] opacity-12 -rotate-[20deg] animate-float-delayed" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12 relative">
        {/* Back Button */}
          <Link href="/programs" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8 font-semibold">
          <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux programmes
          </Link>

          {/* Single Column Layout */}
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Title & Main Info */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-balance">
                {program.title}
              </h1>
              
              {/* Key Info - Clean inline layout */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
                {program.status && (
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      program.status === 'ongoing' ? 'bg-[#00d4aa]' : 
                      program.status === 'completed' ? 'bg-[#8c80f7]' : 'bg-[#ffd23f]'
                    }`} />
                    <span className="text-sm font-semibold">
                      {program.status === 'ongoing' ? 'En cours' : 
                       program.status === 'completed' ? 'Terminé' : 'À venir'}
                    </span>
                  </div>
                )}

                {program.executionPeriod && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-[#c61d4d]" />
                    <span className="text-muted-foreground">{program.executionPeriod}</span>
                  </div>
                )}

                {program.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-[#00d4aa]" />
                    <span className="text-muted-foreground">{program.location}</span>
                  </div>
                )}

                {program.beneficiaries && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-[#ffd23f]" />
                    <span className="text-muted-foreground">{program.beneficiaries}</span>
                  </div>
                )}
              </div>
              
              {program.summary && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {program.summary}
                </p>
              )}

              {program.content && program.content.length > 0 && (
                <div className="prose prose-lg max-w-none">
                  <PortableText value={program.content} />
                </div>
              )}
        </div>

            {/* Impact Statistics - Clean Grid */}
            {(program.impactStats?.length > 0 || program.projectsCompleted || program.partnersEngaged) && (
              <div className="py-16 border-y-2 border-[#8c80f7]/20 bg-gradient-to-br from-[#8c80f7]/5 to-transparent">
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-2 h-10 bg-[#8c80f7] rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-bold">Impact & Résultats</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                  {program.impactStats?.map((stat: any, index: number) => (
                    <div key={index} className="text-center space-y-3">
                      <CounterAnimation 
                        value={stat.value} 
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-[#8c80f7] drop-shadow-sm"
                      />
                      <p className="text-sm md:text-base font-semibold text-foreground/80 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                  
                  {program.projectsCompleted && (
                    <div className="text-center space-y-3">
                      <CounterAnimation 
                        value={program.projectsCompleted} 
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-[#8c80f7] drop-shadow-sm"
                      />
                      <p className="text-sm md:text-base font-semibold text-foreground/80 leading-tight">Projets réalisés</p>
                    </div>
                  )}
                  
                  {program.partnersEngaged && (
                    <div className="text-center space-y-3">
                      <CounterAnimation 
                        value={program.partnersEngaged} 
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-[#8c80f7] drop-shadow-sm"
                      />
                      <p className="text-sm md:text-base font-semibold text-foreground/80 leading-tight">Partenaires engagés</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Achievements */}
            {program.achievements && program.achievements.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-6 w-6 text-[#00d4aa]" />
                  <h2 className="text-2xl md:text-3xl font-bold">Réalisations</h2>
                </div>
                <div className="prose prose-lg max-w-none pl-9 border-l-2 border-[#00d4aa]/30">
                    <PortableText value={program.achievements} />
        </div>
              </div>
            )}

            {/* Next Steps */}
            {program.nextSteps && program.nextSteps.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-[#8c80f7]" />
                  <h2 className="text-2xl md:text-3xl font-bold">Prochaines étapes</h2>
                </div>
                <div className="prose prose-lg max-w-none pl-9 border-l-2 border-[#8c80f7]/30">
                    <PortableText value={program.nextSteps} />
                  </div>
              </div>
            )}

            {/* Gallery */}
            {program.gallery && program.gallery.length > 0 && (
              <ProgramGallery images={program.gallery} />
            )}

            {/* Partners - Clean horizontal layout */}
            {program.partners && program.partners.length > 0 && (
              <div className="py-12 border-y border-border">
                <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Nos Partenaires</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-10 items-end justify-items-center">
                  {program.partners.map((partner: any, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-3 group w-full max-w-[180px]">
                      {partner.logo && (
                        <div className="w-full h-20 flex items-center justify-center transition-transform group-hover:scale-105">
                          <img
                            src={urlFor(partner.logo).width(400).url()}
                            alt={partner.name || "Partenaire"}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      <span className="text-sm text-center text-muted-foreground font-medium leading-tight">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {program.relatedPosts && program.relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Actualités du Programme</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {program.relatedPosts.map((post: any) => (
                    <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                      <div className="overflow-hidden rounded-lg border border-border hover:border-[#c61d4d] transition-all">
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <img
                            src={post.image ? urlFor(post.image).width(800).height(450).url() : "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
          </div>
                        <div className="p-5">
                          <p className="text-xs text-muted-foreground mb-2">
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : ''}
                          </p>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-[#c61d4d] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Call to Action with reveal animation */}
          <ProgramsCTA />
        </div>
      </div>

      <Footer />
    </main>
  )
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60
