import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

interface ProgramCard {
  _id: string
  title: string
  summary?: string
  content?: any
  slug: string
  featuredImage?: any
}

export async function Programs() {
  const query = `*[_type=="program"]|order(_createdAt desc){
    _id,
    title,
    summary,
    "slug": slug.current,
    featuredImage
  }`
  const programs = await client.fetch<ProgramCard[]>(query, {}, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })

  return (
    <>
      {/* Hero Section - Violet avec carrés décoratifs */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#3d1f47] to-[#2d1537] relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-[#ffd23f] opacity-40 z-0 rotate-12" />
        <div className="absolute bottom-10 left-10 w-28 h-28 bg-[#00d4aa] opacity-30 z-0 -rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#8c80f7] opacity-20 z-0" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
              Nos Programmes
            </h1>
            <div className="w-24 h-1 bg-[#ffd23f] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment J-GEN SENEGAL œuvre pour un avenir où l'égalité des sexes et
              l'autonomisation des femmes sont une réalité pour tous.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid - Blanc avec carrés décoratifs */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-40 right-10 w-24 h-24 bg-[#ffd23f] opacity-30 z-0 rotate-12" />
        <div className="absolute bottom-40 left-10 w-28 h-28 bg-[#a42c64] opacity-25 z-0" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#00d4aa] opacity-20 z-0 -rotate-12" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <Link key={program._id} href={`/programs/${program.slug}`} className="group">
                  <div className="relative h-full">
                    {/* Decorative squares around cards */}
                    {index % 3 === 0 && (
                      <div className="absolute -top-3 -left-3 w-16 h-16 bg-[#c61d4d] opacity-40 z-0" />
                    )}
                    {index % 3 === 1 && (
                      <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-[#ffd23f] opacity-40 z-0 rotate-12" />
                    )}
                    {index % 3 === 2 && (
                      <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#8c80f7] opacity-40 z-0" />
                    )}
                    
                    <Card className="relative h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white z-10">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={program.featuredImage ? urlFor(program.featuredImage).width(800).height(800).url() : "/placeholder.svg"}
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight text-gray-900 group-hover:text-[#c61d4d] transition-colors line-clamp-2">
                          {program.title}
                        </h3>
                        {program.summary && (
                          <p className="text-base text-gray-700 leading-relaxed line-clamp-3">
                            {program.summary}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Violet avec carrés décoratifs */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#3d1f47] to-[#2d1537] relative overflow-hidden">
        {/* Decorative squares */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#8c80f7] opacity-40 z-0" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#00d4aa] opacity-30 z-0 rotate-45" />
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-[#ffd23f] opacity-25 z-0 -rotate-12" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Impliquez-vous
            </h2>
            <div className="w-24 h-1 bg-[#ffd23f] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Votre soutien est crucial pour la réussite de nos programmes.
              Rejoignez-nous pour construire un avenir plus juste et égalitaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#c61d4d] hover:bg-[#b01a45] text-white font-bold text-base px-8 py-6 h-auto"
              >
                <Link href="/contact">
                  Participer
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 font-bold text-base px-8 py-6 h-auto"
              >
                <Link href="/contact">
                  Faire un don
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
