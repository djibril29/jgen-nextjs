import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import { BlogHeroImage } from "@/components/blog-hero-image"

async function getPost(slug: string) {
  const query = `*[_type=="post" && slug.current==$slug][0]{
    _id,
    title,
    publishedAt,
    image,
    excerpt,
    body,
    "categories": categories[]->title
  }`
  return client.fetch(query, { slug })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  // If post doesn't exist, show a default message
  if (!post) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <Link href="/blog">
            <Button>Retour au blog</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Image */}
      <BlogHeroImage 
        image={post.image} 
        alt={post.title}
      />

      {/* Article Content */}
      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux actualités
            </Link>

            {/* Article Type */}
            <div className="text-sm font-medium text-muted-foreground mb-4">{post.categories?.[0] ?? ''}</div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight">{post.title}</h1>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-accent text-foreground text-sm rounded-full">
                  {category}
                </span>
              ))}
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-muted-foreground mb-8 pb-8 border-b">
              <Calendar className="h-4 w-4" />
              <time>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : ''}</time>
            </div>

            {/* Lead Paragraph */}
            {post.excerpt ? (
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 text-foreground">{post.excerpt}</p>
            ) : null}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} />
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Partager cet article</span>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
