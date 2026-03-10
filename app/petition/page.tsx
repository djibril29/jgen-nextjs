import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PetitionForm } from '@/components/petition-form.client'
import { PetitionClaimsParallax } from '@/components/petition-claims-parallax.client'
import { Redis } from '@upstash/redis'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Pétition — Pour les droits des femmes au Sénégal',
  description:
    'Signez la pétition pour l\'égalité, la justice et la dignité de toutes les femmes et filles au Sénégal. Rejoignez la mobilisation de J-GEN SENEGAL.',
  alternates: { canonical: 'https://jgen.sn/petition' },
  openGraph: {
    title: 'Pétition — Pour les droits des femmes au Sénégal',
    description: 'Chaque signature compte. Agissons maintenant.',
    url: 'https://jgen.sn/petition',
    images: [{ url: 'https://jgen.sn/petition-hero.jpeg', width: 1200, height: 630, alt: 'Pétition J-GEN SÉNÉGAL' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://jgen.sn/petition-hero.jpeg'],
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

export default async function PetitionPage() {
  const initialCount = await getCount()

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="lg:grid lg:grid-cols-2">
        {/* Left — dark purple, text content */}
        <div className="bg-[#3d1f47] px-8 py-20 lg:px-16 lg:py-28 flex items-center">
          <div className="max-w-xl w-full">
            <span className="inline-block text-[#ffd23f] text-xs font-semibold uppercase tracking-widest mb-6">
              Campagne & Mobilisation
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
              Pour les droits des femmes au Sénégal&nbsp;:{' '}
              <span className="text-[#c61d4d]">Agissons maintenant.</span>
            </h1>
            <p className="!text-base lg:!text-lg text-white/75 leading-relaxed mb-10">
              En cette Journée internationale des droits des femmes, rejoignez la mobilisation
              pour l&apos;égalité, la justice et la dignité pour toutes les femmes et les filles.
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

        {/* Right — image fills the full column */}
        <div className="relative overflow-hidden min-h-[60vh] lg:min-h-0">
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#c61d4d] z-10" />
          <Image
            src="/petition-hero.jpeg"
            alt="Femme sénégalaise levant le poing pour ses droits"
            fill
            className="object-cover object-center"
            priority
          />
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
            Les violences basées sur le genre, notamment les violences sexuelles et sexistes,
            touchent de manière disproportionnée les femmes et les filles au Sénégal et entravent
            leur pleine citoyenneté.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ces violences s&apos;inscrivent dans un continuum de discriminations sociales,
            économiques, culturelles et juridiques, et leur expression la plus extrême est le
            féminicide.
          </p>
        </div>
      </section>

      {/* ── Nos revendications ───────────────────────────── */}
      <PetitionClaimsParallax />

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
