import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  const programs = await client.fetch<ProgramCard[]>(query)

  return (
    <section id="programs" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="sr-only">Programmes</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {programs.map((program) => (
            <Link key={program._id} href={`/programs/${program.slug}`}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group h-full cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={program.featuredImage ? urlFor(program.featuredImage).width(1200).height(750).url() : "/placeholder.svg"}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                  {program.summary ? (
                    <CardDescription className="text-base leading-relaxed">{program.summary}</CardDescription>
                  ) : null}
                </CardHeader>
                <CardContent>
                  <span className="text-primary font-medium">En savoir plus →</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
