import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogClient } from "@/components/blog-client"
import { client } from "@/sanity/lib/client"

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
