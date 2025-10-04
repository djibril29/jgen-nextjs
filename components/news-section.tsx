import { client } from "@/sanity/lib/client"
import { Suspense } from "react"
import { NewsSectionClient, NewsItem } from "./news-section.client"

export async function NewsSection() {
  const query = `*[_type=="post"]|order(publishedAt desc)[0...3]{
    _id,
    title,
    excerpt,
    image,
    "slug": slug.current,
    "tags": coalesce(categories[]->title, []),
    publishedAt
  }`
  const items = await client.fetch<NewsItem[]>(query)
  return (
    <Suspense>
      {/* @ts-expect-error Async Server/Client boundary */}
      <NewsSectionClient items={items} />
    </Suspense>
  )
}
