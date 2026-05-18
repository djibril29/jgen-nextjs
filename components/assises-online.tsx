import { Video, ArrowUpRight, CalendarDays, Globe } from "lucide-react"

interface OnlineSession {
  id: string
  day: string
  label: string
  title: string
  meetingUrl: string
  accent: "purple" | "crimson"
}

// TODO: Replace the two `meetingUrl` values with the real Microsoft Teams links.
const SESSIONS: OnlineSession[] = [
  {
    id: "j1",
    day: "Jour 1",
    label: "Première journée",
    title: "Mise en place officielle du COPIL",
    meetingUrl: "https://teams.microsoft.com/meet/329562366944202?p=M7SYjztyH6YxrvNPSK",
    accent: "purple",
  },
  {
    id: "j2",
    day: "Jour 2",
    label: "Deuxième journée",
    title: "Structuration du COPIL (suite)",
    meetingUrl: "https://teams.microsoft.com/meet/357242236489115?p=8gXRNkg1EV9K1kbA0v",
    accent: "crimson",
  },
]

const ACCENTS = {
  purple: {
    card: "from-[#3d1f47] to-[#2a1432]",
    badge: "bg-[#ffd23f] text-[#3d1f47]",
    button: "bg-[#ffd23f] hover:bg-white text-[#3d1f47]",
    glow: "bg-[#c61d4d]/40",
  },
  crimson: {
    card: "from-[#c61d4d] to-[#8a1438]",
    badge: "bg-[#ffd23f] text-[#3d1f47]",
    button: "bg-white hover:bg-[#ffd23f] text-[#c61d4d] hover:text-[#3d1f47]",
    glow: "bg-[#ffd23f]/30",
  },
} as const

export function AssisesOnline() {
  return (
    <section
      id="participer-en-ligne"
      className="relative py-20 lg:py-24 bg-white overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#3d1f47]/[0.03] blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 text-[#c61d4d] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <Globe className="h-3.5 w-3.5" />
            Participer en ligne
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#3d1f47] leading-tight mb-6">
            Rejoindre la réunion
          </h2>
          <div className="w-20 h-1 bg-[#c61d4d] mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Vous ne pouvez pas être présent·e sur place&nbsp;? Rejoignez les
            travaux du Comité de pilotage à distance via Microsoft Teams.
            Cliquez sur le lien correspondant à la journée pour participer.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
          {SESSIONS.map((session) => {
            const styles = ACCENTS[session.accent]
            return (
              <article
                key={session.id}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${styles.card} p-8 lg:p-10 text-white shadow-[0_20px_50px_-15px_rgba(61,31,71,0.4)] hover:shadow-[0_25px_60px_-15px_rgba(198,29,77,0.5)] transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  aria-hidden
                  className={`absolute -top-20 -right-20 w-56 h-56 rounded-full ${styles.glow} blur-3xl pointer-events-none`}
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 right-0 opacity-10 pointer-events-none"
                >
                  <Video className="h-44 w-44 -mb-6 -mr-6" />
                </div>

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span
                      className={`inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${styles.badge}`}
                    >
                      {session.day}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-white/70 text-xs font-semibold uppercase tracking-[0.18em]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {session.label}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black leading-tight mb-2">
                    {session.title}
                  </h3>

                  <p className="text-white/80 text-base leading-relaxed mb-8">
                    Connectez-vous via Microsoft Teams pour suivre les travaux
                    et échanger avec les autres participant·e·s.
                  </p>

                  <a
                    href={session.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 font-bold px-6 py-3.5 rounded-full transition-all hover:shadow-xl hover:-translate-y-0.5 ${styles.button}`}
                  >
                    <Video className="h-4 w-4" />
                    Rejoindre la réunion Teams
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <div className="max-w-2xl mx-auto text-center mt-10 lg:mt-12">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Astuce&nbsp;: pour une meilleure expérience, installez{" "}
            <a
              href="https://www.microsoft.com/fr-fr/microsoft-teams/download-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c61d4d] hover:text-[#3d1f47] font-semibold underline underline-offset-4 transition-colors"
            >
              l&apos;application Microsoft Teams
            </a>{" "}
            ou rejoignez la réunion directement depuis votre navigateur.
          </p>
        </div>
      </div>
    </section>
  )
}
