import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PetitionForm } from '@/components/petition-form.client'
import { Redis } from '@upstash/redis'
import { Metadata } from 'next'
import Image from 'next/image'
import { Scale, ShieldOff, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pétition — Pour les droits des femmes au Sénégal',
  description:
    'Signez la pétition pour l\'égalité, la justice et la dignité de toutes les femmes et filles au Sénégal. Rejoignez la mobilisation de J-GEN SENEGAL.',
  alternates: { canonical: 'https://jgen.sn/petition' },
  openGraph: {
    title: 'Pétition — Pour les droits des femmes au Sénégal',
    description: 'Chaque signature compte. Agissons maintenant.',
    url: 'https://jgen.sn/petition',
  },
}

export const revalidate = 60

async function getCount(): Promise<number> {
  try {
    const redis = Redis.fromEnv()
    const count = await redis.get<number>('petition:count')
    return count ?? 0
  } catch {
    return 0
  }
}

const REVENDICATIONS = [
  {
    icon: Scale,
    tag: 'Justice & Égalité',
    title: 'Réforme du Code de la famille',
    description:
      "Mettre fin aux dispositions discriminatoires qui limitent l'autonomie des femmes et renforcent les inégalités au sein du foyer. Un combat essentiel pour la dignité de chaque Sénégalaise.",
  },
  {
    icon: ShieldOff,
    tag: 'Solidarité féminine au Sénégal',
    title: "Fin de l'impunité",
    description:
      'Garantir des poursuites systématiques et des sanctions exemplaires contre les auteurs de violences faites aux femmes et aux filles. Brisons le silence pour protéger nos vies.',
  },
  {
    icon: Globe,
    tag: 'Leadership féminin',
    title: 'Protocole de Maputo',
    description:
      'Application effective et intégrale de tous les engagements pris par le Sénégal pour les droits des femmes en Afrique. Transformons les promesses en réalités tangibles.',
  },
]

export default async function PetitionPage() {
  const initialCount = await getCount()

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-[#3d1f47] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/african-women-advocacy-protest-rights.jpg"
            alt="Femmes pour leurs droits"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block text-[#ffd23f] text-sm font-semibold uppercase tracking-widest mb-4">
              Campagne & Mobilisation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Pour les droits des femmes au Sénégal&nbsp;:{' '}
              <span className="text-[#c61d4d]">Agissons maintenant.</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl">
              En cette Journée internationale des droits des femmes, rejoignez la mobilisation
              pour l'égalité, la justice et la dignité pour toutes les femmes et les filles.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#signer"
                className="inline-block bg-[#c61d4d] hover:bg-[#a8173f] text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                Signer la pétition
              </a>
              <a
                href="#revendications"
                className="inline-block border border-white/40 hover:border-white text-white font-semibold px-8 py-3 rounded-full transition-colors"
              >
                Je soutiens les droits
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pourquoi cette pétition ──────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#3d1f47] mb-6">
            Pourquoi cette pétition&nbsp;?
          </h2>
          <div className="w-16 h-1 bg-[#c61d4d] mx-auto mb-8" />
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Le Sénégal fait face à des défis persistants en matière d'égalité. Les discriminations
            systémiques et les inégalités juridiques dans le Code de la famille freinent
            l'épanouissement des femmes et des filles.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Malgré les avancées législatives, la réalité quotidienne de millions de femmes reste
            marquée par l'injustice. Il est temps de transformer nos lois pour garantir la justice
            pour toutes, sans exception.
          </p>
        </div>
      </section>

      {/* ── Nos revendications ───────────────────────────── */}
      <section id="revendications" className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#3d1f47] mb-4">
              Nos revendications
            </h2>
            <div className="w-16 h-1 bg-[#c61d4d] mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trois piliers fondamentaux pour une société juste et égalitaire au Sénégal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {REVENDICATIONS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <span className="text-xs font-semibold text-[#c61d4d] uppercase tracking-widest mb-4 block">
                    {item.tag}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-[#3d1f47]/10 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-[#3d1f47]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#3d1f47] mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Formulaire de signature ───────────────────────── */}
      <section id="signer" className="py-20 lg:py-28 bg-[#c61d4d]">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-[#3d1f47] mb-3">
                Signez la pétition
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Votre voix compte. Chaque signature est un pas vers un changement significatif.
              </p>
            </div>
            <PetitionForm initialCount={initialCount} />
          </div>
        </div>
      </section>

      {/* ── Citation ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#3d1f47]">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-[#c61d4d] text-6xl leading-none select-none">&ldquo;</span>
          <blockquote className="text-white text-2xl md:text-3xl font-bold leading-snug mt-2 mb-6">
            Les droits des femmes sont des droits humains. Ensemble, faisons avancer l&apos;égalité,
            la justice et la dignité pour toutes.
          </blockquote>
          <cite className="text-[#ffd23f] text-sm font-semibold tracking-widest not-italic">
            — J-GEN SÉNÉGAL
          </cite>
        </div>
      </section>

      <Footer />
    </main>
  )
}
