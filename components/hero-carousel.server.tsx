import { client } from "@/sanity/lib/client"
import { HeroCarouselClient } from "@/components/hero-carousel.client"

// Fetch featured posts for the hero carousel
async function getFeaturedPosts() {
  const query = `*[_type=="post" && featured==true]|order(publishedAt desc)[0...4]{
    _id,
    title,
    excerpt,
    image,
    "slug": slug.current,
    "category": categories[0]->title,
    publishedAt
  }`
  
  const posts = await client.fetch(query)
  
  // If no featured posts, get the 4 most recent posts
  if (!posts || posts.length === 0) {
    const fallbackQuery = `*[_type=="post"]|order(publishedAt desc)[0...4]{
      _id,
      title,
      excerpt,
      image,
      "slug": slug.current,
      "category": categories[0]->title,
      publishedAt
    }`
    return client.fetch(fallbackQuery)
  }
  
  return posts
}

export async function HeroCarousel() {
  const posts = await getFeaturedPosts()
  
  return <HeroCarouselClient posts={posts} />
}

// Enable ISR
export const revalidate = 60

