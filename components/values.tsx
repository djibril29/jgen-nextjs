import { Heart, Users, Megaphone, Shield } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Empowerment",
    description:
      "We believe in empowering women and girls to claim their rights and live with dignity, providing them with the tools and support they need to thrive.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We work hand-in-hand with communities, recognizing that sustainable change comes from within and requires collective action.",
  },
  {
    icon: Megaphone,
    title: "Advocacy",
    description:
      "We amplify the voices of survivors and advocate for policy changes that protect women and girls from violence and discrimination.",
  },
  {
    icon: Shield,
    title: "Protection",
    description:
      "We provide safe spaces and support services for survivors of gender-based violence, ensuring they have access to justice and healing.",
  },
]

export function Values() {
  return (
    <section id="values" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">Our Values</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Our work is guided by core values that reflect our commitment to gender justice and human rights.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
