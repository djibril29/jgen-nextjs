import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

// This would typically come from a CMS or database
const blogPosts: Record<string, any> = {
  "breaking-the-silence": {
    title: "Breaking the Silence: Stories of Courage from Senegalese Women",
    type: "Témoignages",
    date: "15 mars 2024",
    categories: ["Sénégal", "Témoignages", "Autonomisation"],
    image: "/african-women-empowerment-community.jpg",
    lead: "Dans tout le Sénégal, des femmes courageuses brisent le silence sur la violence basée sur le genre. Leurs histoires de résilience et de force inspirent le changement dans leurs communautés et au-delà.",
    content: [
      {
        type: "paragraph",
        text: "Fatou, 32 ans, est l'une de ces femmes. Après des années de violence domestique, elle a trouvé le courage de chercher de l'aide auprès de J-GEN SENEGAL. Aujourd'hui, elle dirige un groupe de soutien pour d'autres survivantes dans son quartier de Dakar.",
      },
      {
        type: "quote",
        text: "J'ai réalisé que ma voix avait du pouvoir. En partageant mon histoire, j'ai aidé d'autres femmes à comprendre qu'elles n'étaient pas seules et qu'il y avait de l'espoir.",
        author: "Fatou, survivante et militante",
      },
      {
        type: "heading",
        text: "Un mouvement qui prend de l'ampleur",
      },
      {
        type: "paragraph",
        text: "L'histoire de Fatou n'est pas unique. À travers nos programmes, nous avons vu des centaines de femmes transformer leur douleur en action. Elles deviennent des leaders communautaires, des éducatrices et des défenseures des droits des femmes.",
      },
      {
        type: "paragraph",
        text: "Ces femmes organisent des ateliers dans leurs communautés, sensibilisent sur les signes de violence et créent des réseaux de soutien. Leur courage inspire d'autres à parler et à chercher de l'aide.",
      },
      {
        type: "heading",
        text: "L'impact sur les communautés",
      },
      {
        type: "paragraph",
        text: "Lorsque les femmes partagent leurs histoires, cela crée un effet d'entraînement. Les attitudes changent, les tabous sont brisés et les communautés commencent à tenir les auteurs de violence responsables. C'est ainsi que le changement systémique commence.",
      },
      {
        type: "paragraph",
        text: "Nos programmes de soutien par les pairs ont touché plus de 500 femmes l'année dernière, créant un réseau de solidarité et d'espoir à travers le Sénégal.",
      },
    ],
  },
  "understanding-gender-based-violence": {
    title: "Understanding Gender-Based Violence: A Guide for Communities",
    type: "Guide éducatif",
    date: "10 mars 2024",
    categories: ["Éducation", "Prévention", "Communauté"],
    image: "/community-education-workshop.jpg",
    lead: "La violence basée sur le genre prend de nombreuses formes et affecte des millions de femmes et de filles au Sénégal. Ce guide aide les communautés à reconnaître, prévenir et répondre à la VBG.",
    content: [
      {
        type: "paragraph",
        text: "La violence basée sur le genre (VBG) n'est pas seulement physique. Elle comprend la violence psychologique, économique, sexuelle et émotionnelle. Comprendre ces différentes formes est la première étape vers la prévention.",
      },
      {
        type: "heading",
        text: "Les formes de violence basée sur le genre",
      },
      {
        type: "paragraph",
        text: "La violence physique comprend les coups, les gifles et toute forme de préjudice corporel. La violence psychologique inclut les menaces, l'intimidation et le contrôle. La violence économique implique le contrôle des ressources financières et l'empêchement de l'indépendance économique.",
      },
      {
        type: "paragraph",
        text: "La violence sexuelle comprend tout acte sexuel non consensuel. La violence émotionnelle implique l'humiliation, l'isolement et la manipulation. Toutes ces formes sont interconnectées et également dommageables.",
      },
      {
        type: "heading",
        text: "Le rôle des communautés",
      },
      {
        type: "paragraph",
        text: "Les communautés jouent un rôle crucial dans la prévention de la VBG. En créant des espaces sûrs pour le dialogue, en remettant en question les normes néfastes et en soutenant les survivantes, nous pouvons créer un changement durable.",
      },
      {
        type: "quote",
        text: "Lorsque les communautés s'unissent contre la violence, elles créent un environnement où les femmes et les filles peuvent s'épanouir en toute sécurité.",
        author: "Équipe J-GEN SENEGAL",
      },
    ],
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

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
      <div className="w-full h-[400px] lg:h-[500px] overflow-hidden mt-20">
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
      </div>

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
            <div className="text-sm font-medium text-muted-foreground mb-4">{post.type}</div>

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
              <time>{post.date}</time>
            </div>

            {/* Lead Paragraph */}
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-8 text-foreground">{post.lead}</p>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.map((block: any, index: number) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p key={index} className="mb-6 leading-relaxed text-foreground/90">
                        {block.text}
                      </p>
                    )
                  case "heading":
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-12 mb-6 text-foreground">
                        {block.text}
                      </h2>
                    )
                  case "quote":
                    return (
                      <blockquote
                        key={index}
                        className="my-8 pl-6 border-l-4 border-primary bg-accent/30 py-6 pr-6 rounded-r-lg"
                      >
                        <p className="text-lg italic mb-3 leading-relaxed text-foreground">"{block.text}"</p>
                        {block.author && (
                          <cite className="text-sm font-medium text-muted-foreground not-italic">— {block.author}</cite>
                        )}
                      </blockquote>
                    )
                  default:
                    return null
                }
              })}
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
