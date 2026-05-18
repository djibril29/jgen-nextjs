import {
  MessageCircleHeart,
  Sparkles,
  Send,
  ArrowUpRight,
  Radio,
  Smartphone,
} from "lucide-react"

const MENTIMETER_EMBED_URL =
  "https://www.mentimeter.com/app/presentation/alp4osukbp28avfxrror158oxzkt7hjk/embed"

const MENTIMETER_VOTE_URL = "https://www.menti.com/ale7ucxsqiq4"

const VOTE_CODE = "ale7ucxsqiq4"

export function AssisesFeedback() {
  return (
    <section
      id="vos-retours"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-[#faf6f0] to-white overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-10 -left-24 w-80 h-80 rounded-full bg-[#00d4aa]/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 -right-24 w-80 h-80 rounded-full bg-[#ffd23f]/15 blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 text-[#c61d4d] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Atelier participatif
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#3d1f47] leading-tight mb-6">
            Partagez vos retours
          </h2>
          <div className="w-20 h-1 bg-[#c61d4d] mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Votre voix compte. Cliquez ci-dessous pour soumettre votre retour
            sur Mentimeter — vos contributions apparaîtront en direct dans la
            visualisation plus bas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#c61d4d] to-[#8a1438] text-white p-8 lg:p-12 shadow-[0_25px_60px_-15px_rgba(198,29,77,0.5)]">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#ffd23f]/25 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#3d1f47]/40 blur-3xl pointer-events-none"
            />

            <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="h-4 w-4 text-[#ffd23f]" />
                  <span className="text-[#ffd23f] text-xs font-bold uppercase tracking-[0.2em]">
                    Étape 1 — Soumettre votre retour
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black leading-tight mb-3">
                  Donnez votre avis en quelques secondes
                </h3>
                <p className="text-white/85 text-base lg:text-lg leading-relaxed mb-2">
                  Cliquez sur le bouton ci-contre pour ouvrir Mentimeter et
                  partager votre retour. Vos réponses sont anonymes.
                </p>
                <p className="text-white/65 text-sm">
                  Ou saisissez le code{" "}
                  <span className="inline-block bg-white/10 border border-white/20 text-[#ffd23f] font-mono font-bold tracking-widest px-2 py-0.5 rounded">
                    {VOTE_CODE}
                  </span>{" "}
                  sur{" "}
                  <a
                    href="https://www.menti.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    menti.com
                  </a>
                  .
                </p>
              </div>

              <a
                href={MENTIMETER_VOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#ffd23f] hover:bg-white text-[#3d1f47] font-black text-base lg:text-lg px-7 py-4 lg:px-9 lg:py-5 rounded-full transition-all hover:shadow-2xl hover:-translate-y-1 whitespace-nowrap"
              >
                <Send className="h-5 w-5" />
                Donner mon avis
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c61d4d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c61d4d]"></span>
            </span>
            <span className="inline-flex items-center gap-2 text-[#c61d4d] text-xs font-bold uppercase tracking-[0.25em]">
              <Radio className="h-3.5 w-3.5" />
              Étape 2 — Résultats en direct
            </span>
          </div>

          <div className="relative rounded-3xl bg-white shadow-[0_25px_60px_-15px_rgba(61,31,71,0.25)] border border-[#3d1f47]/10 overflow-hidden">
            <div className="flex items-center gap-2 bg-[#3d1f47] text-white px-5 py-3 border-b border-white/10">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#c61d4d]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffd23f]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#00d4aa]" />
              </span>
              <div className="flex items-center gap-2 ml-2">
                <MessageCircleHeart className="h-4 w-4 text-[#ffd23f]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  Visualisation en direct des retours
                </span>
              </div>
            </div>

            <div
              className="relative w-full bg-[#faf6f0]"
              style={{ paddingBottom: "56.25%", paddingTop: "35px" }}
            >
              <iframe
                src={MENTIMETER_EMBED_URL}
                title="Mentimeter — Retours en direct des Assises"
                sandbox="allow-popups allow-scripts allow-same-origin allow-presentation"
                allowFullScreen
                allowTransparency
                frameBorder={0}
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            La visualisation ne s&apos;affiche pas&nbsp;?{" "}
            <a
              href={MENTIMETER_VOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c61d4d] hover:text-[#3d1f47] font-semibold underline underline-offset-4 transition-colors"
            >
              Consulter Mentimeter dans un nouvel onglet
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
