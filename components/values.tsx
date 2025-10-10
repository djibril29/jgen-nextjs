import { Heart, Users, Megaphone, Shield } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Autonomisation",
    description:
      "Nous croyons en l'autonomisation des femmes et des filles pour revendiquer leurs droits et vivre dans la dignité, en leur fournissant les outils et le soutien nécessaires pour s'épanouir.",
    bgColor: "bg-[#c61d4d]",
    textColor: "text-white",
    iconBg: "bg-white/20",
    iconColor: "text-white",
  },
  {
    icon: Users,
    title: "Communauté",
    description:
      "Nous travaillons main dans la main avec les communautés, reconnaissant que le changement durable vient de l'intérieur et nécessite une action collective.",
    bgColor: "bg-[#00d4aa]",
    textColor: "text-white",
    iconBg: "bg-white/20",
    iconColor: "text-white",
  },
  {
    icon: Megaphone,
    title: "Plaidoyer",
    description:
      "Nous amplifions les voix des survivantes et plaidons pour des changements de politique qui protègent les femmes et les filles de la violence et de la discrimination.",
    bgColor: "bg-[#ffd23f]",
    textColor: "text-[#3d1f47]",
    iconBg: "bg-[#3d1f47]/20",
    iconColor: "text-[#3d1f47]",
  },
  {
    icon: Shield,
    title: "Protection",
    description:
      "Nous fournissons des espaces sûrs et des services de soutien aux survivantes de violences basées sur le genre, en garantissant leur accès à la justice et à la guérison.",
    bgColor: "bg-[#8c80f7]",
    textColor: "text-white",
    iconBg: "bg-white/20",
    iconColor: "text-white",
  },
]

export function Values() {
  return (
    <section id="values" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative squares */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-[#ffd23f] opacity-30 z-0 rotate-12" />
      <div className="absolute bottom-20 left-10 w-28 h-28 bg-[#a42c64] opacity-25 z-0" />
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#00d4aa] opacity-20 z-0 -rotate-12" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">Nos Valeurs</h2>
          <div className="w-24 h-1 bg-[#c61d4d] mx-auto mb-8" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-pretty leading-relaxed">
            Notre travail est guidé par des valeurs fondamentales qui reflètent notre engagement en faveur de la justice de genre et des droits humains.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`${value.bgColor} rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full" />
              
              <div className={`inline-flex items-center justify-center w-20 h-20 ${value.iconBg} rounded-full mb-6 relative z-10`}>
                <value.icon className={`h-10 w-10 ${value.iconColor}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${value.textColor} relative z-10`}>{value.title}</h3>
              <p className={`leading-relaxed ${value.textColor} ${value.bgColor === 'bg-[#ffd23f]' ? 'opacity-90' : 'opacity-95'} relative z-10`}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
