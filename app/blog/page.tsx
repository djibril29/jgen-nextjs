import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PageHero } from "@/components/page-hero"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

interface BlogCardPost {
  _id: string
  slug: string
  title: string
  excerpt?: string
  publishedAt?: string
  categories?: string[]
  image?: any
}

export const revalidate = 60 // revalidate every 60s in production

export default async function BlogPage() {
  const query = `
    *[_type == "post"]|order(publishedAt desc){
      _id,
      "slug": slug.current,
      title,
      excerpt,
      publishedAt,
      image,
      "categories": coalesce(categories[]->title, [])
    }
  `
  const blogPosts = await client.fetch<BlogCardPost[]>(query)

  return (
    <main className="min-h-screen">
      <Header />

      <PageHero
        category="ACTUALITÉS"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        title="ACTUALITÉS & INSIGHTS"
        description="Histoires, mises à jour et perspectives de notre travail dans la lutte contre la violence basée sur le genre au Sénégal."
        image="/nos-programmes.png"
        imageAlt="Actualités J-GEN SENEGAL"
      />

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image ? urlFor(post.image).width(1200).height(675).url() : "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="text-primary font-medium">{post.categories?.[0] ?? ""}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
