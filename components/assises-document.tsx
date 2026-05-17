import { FileText, Download, ExternalLink } from "lucide-react"

interface DocumentResource {
  title: string
  description: string
  fileUrl: string
  fileType?: string
  fileSize?: string
  external?: boolean
}

const DOCUMENTS: DocumentResource[] = [
  {
    title: "Document de cadrage des Assises",
    description:
      "Note conceptuelle, objectifs, méthodologie et feuille de route du comité de pilotage des Assises nationales citoyennes.",
    fileUrl: "/documents/assises-document-cadrage.pdf",
    fileType: "PDF",
    fileSize: "À venir",
  },
]

export function AssisesDocument() {
  return (
    <section
      id="documents"
      className="relative py-20 lg:py-28 bg-[#3d1f47] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #ffd23f 0%, transparent 50%), radial-gradient(circle at 80% 80%, #00d4aa 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-20">
          <span className="inline-block text-[#ffd23f] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Ressources & documentation
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Documents officiels
          </h2>
          <div className="w-20 h-1 bg-[#c61d4d] mx-auto mb-6 rounded-full" />
          <p className="text-white/80 text-lg leading-relaxed">
            Consultez et téléchargez les documents officiels relatifs aux
            Assises nationales citoyennes sur les droits des femmes et des
            filles au Sénégal.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6 md:gap-8">
          {DOCUMENTS.map((doc, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl p-6 lg:p-8 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(198,29,77,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-[#c61d4d] to-[#a8173f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <FileText className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {doc.fileType && (
                      <span className="inline-block bg-[#3d1f47] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                        {doc.fileType}
                      </span>
                    )}
                    {doc.fileSize && (
                      <span className="text-xs text-muted-foreground font-medium">
                        {doc.fileSize}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-[#3d1f47] mb-2 leading-tight">
                    {doc.title}
                  </h3>
                  <p className="!text-base text-muted-foreground leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 md:gap-3 flex-shrink-0">
                  <a
                    href={doc.fileUrl}
                    target={doc.external ? "_blank" : undefined}
                    rel={doc.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-center gap-2 bg-[#c61d4d] hover:bg-[#a8173f] text-white font-bold px-5 py-3 rounded-full text-sm transition-all hover:shadow-lg whitespace-nowrap"
                  >
                    {doc.external ? (
                      <>
                        Consulter
                        <ExternalLink className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Télécharger
                        <Download className="h-4 w-4" />
                      </>
                    )}
                  </a>
                  {!doc.external && (
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border-2 border-[#3d1f47]/20 hover:border-[#3d1f47] text-[#3d1f47] font-semibold px-5 py-3 rounded-full text-sm transition-all whitespace-nowrap"
                    >
                      Aperçu
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center mt-12 lg:mt-16">
          <p className="text-white/60 text-sm leading-relaxed">
            Pour toute demande complémentaire ou pour recevoir les documents par
            email, contactez le secrétariat des Assises à{" "}
            <a
              href="mailto:contact@jgen.sn"
              className="text-[#ffd23f] hover:text-white font-semibold underline underline-offset-4 transition-colors"
            >
              contact@jgen.sn
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
