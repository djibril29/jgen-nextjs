import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogClient } from "@/components/blog-client"
import { client } from "@/sanity/lib/client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Actualités et Ressources",
  description: "Découvrez nos dernières actualités, articles et ressources sur les violences basées sur le genre, les droits des femmes et notre action au Sénégal.",
  alternates: {
    canonical: 'https://jgen.sn/blog',
  },
  openGraph: {
    title: "Blog - J-GEN SENEGAL",
    description: "Actualités et ressources sur les VBG et droits des femmes",
    url: "https://jgen.sn/blog",
    images: ["/blog.png"],
  },
  keywords: [
    "blog J-GEN SENEGAL",
    "actualités VBG Sénégal",
    "articles droits femmes",
    "ressources violences genre",
    "témoignages survivantes",
    "plaidoyer féministe"
  ]
}

interface BlogCardPost {
  _id: string
  slug: string
  title: string
  excerpt?: string
  publishedAt?: string
  categories?: string[]
  image?: any
  author?: {
    name: string
  }
}

async function getBlogPosts() {
  try {
    const query = `
      *[_type == "post"]|order(publishedAt desc){
        _id,
        "slug": slug.current,
        title,
        excerpt,
        publishedAt,
        image,
        "categories": coalesce(categories[]->title, []),
        "author": author->{name}
      }
    `
    const posts = await client.fetch<BlogCardPost[]>(query, {}, {
      next: { revalidate: 60 } // Revalidate every minute
    })
    return posts || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const revalidate = 60 // Revalidate every minute

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <BlogClient posts={blogPosts} />
      <Footer />
    </main>
  )
}
