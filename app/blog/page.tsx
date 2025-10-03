import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PageHero } from "@/components/page-hero"

export default function BlogPage() {
  const blogPosts = [
    {
      slug: "breaking-the-silence",
      title: "Breaking the Silence: Stories of Courage from Senegalese Women",
      excerpt: "Hear from survivors who have found their voice and are leading change in their communities.",
      date: "March 15, 2024",
      category: "Stories",
      image: "/african-women-empowerment-community.jpg",
    },
    {
      slug: "understanding-gender-based-violence",
      title: "Understanding Gender-Based Violence: A Guide for Communities",
      excerpt: "Learn about the different forms of GBV and how communities can work together to prevent it.",
      date: "March 10, 2024",
      category: "Education",
      image: "/community-education-workshop.jpg",
    },
    {
      slug: "legal-rights-every-woman-should-know",
      title: "Legal Rights Every Woman in Senegal Should Know",
      excerpt: "An overview of legal protections and resources available for women facing violence.",
      date: "March 5, 2024",
      category: "Legal",
      image: "/legal-rights-justice.jpg",
    },
    {
      slug: "economic-empowerment-pathways",
      title: "Economic Empowerment: Pathways to Independence",
      excerpt: "How financial independence helps women escape cycles of violence and build better futures.",
      date: "February 28, 2024",
      category: "Empowerment",
      image: "/women-entrepreneurs-business.jpg",
    },
    {
      slug: "youth-engagement-next-generation",
      title: "Youth Engagement: The Next Generation of Advocates",
      excerpt: "Young people are leading the charge for gender equality. Here's how we're supporting them.",
      date: "February 20, 2024",
      category: "Youth",
      image: "/youth-activists-advocacy.jpg",
    },
    {
      slug: "building-safe-spaces-shelter-program",
      title: "Building Safe Spaces: Our Shelter Program Impact",
      excerpt: "A look at how our emergency shelters are providing safety and support to survivors.",
      date: "February 15, 2024",
      category: "Programs",
      image: "/safe-space-shelter-support.jpg",
    },
  ]

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
        image="/youth-activists-advocacy.jpg"
        imageAlt="Actualités J-GEN SENEGAL"
      />

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="text-primary font-medium">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
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
