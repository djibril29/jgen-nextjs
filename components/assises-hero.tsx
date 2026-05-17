import Image from "next/image"
import { CalendarDays, ArrowDown } from "lucide-react"

export function AssisesHero() {
  return (
    <section className="relative isolate overflow-hidden pt-14 lg:pt-20 bg-[#3d1f47]">
      <Image
        src="/Hero.png"
        alt="Assises nationales citoyennes sur les droits des femmes et des filles au Sénégal"
        fill
        priority
        sizes="100vw"
        className="object-cover object-left lg:object-center -z-10"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#3d1f47]/20 via-transparent to-[#3d1f47]/60 lg:from-transparent lg:via-transparent lg:to-[#3d1f47]/70"
      />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 min-h-[78vh] lg:min-h-[88vh] items-center">
          <div className="hidden lg:block" />

          <div className="py-16 lg:py-24 max-w-2xl lg:pl-6">
            <span className="inline-flex items-center gap-2 bg-[#ffd23f] text-[#3d1f47] text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 shadow-md">
              <CalendarDays className="h-3.5 w-3.5" />
              Évènement national
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-white leading-[1.05] mb-6 text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              Bienvenue aux{" "}
              <span className="text-[#ffd23f]">
                Assises nationales citoyennes
              </span>{" "}
              sur les droits des femmes et des filles au Sénégal
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="h-[3px] w-12 bg-[#00d4aa] rounded-full" />
              <span className="text-[#00d4aa] text-xs sm:text-sm font-bold uppercase tracking-[0.18em]">
                Comité de pilotage
              </span>
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white/95 leading-relaxed mb-10 text-pretty">
              Atelier d&apos;installation et de structuration du comité de pilotage.
            </h2>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#calendrier"
                className="inline-flex items-center gap-2 bg-[#c61d4d] hover:bg-[#a8173f] text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Voir le calendrier
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#documents"
                className="inline-flex items-center gap-2 border-2 border-white/70 hover:border-white text-white font-semibold px-7 py-3.5 rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all"
              >
                Documents officiels
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c61d4d] via-[#ffd23f] to-[#00d4aa]"
      />
    </section>
  )
}
