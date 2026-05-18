"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  ChevronDown,
  User,
  MessageSquare,
  CalendarDays,
  Coffee,
  Utensils,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AgendaItem {
  time: string
  activity: string
  comment?: string
  lead?: string
  type?: "session" | "break" | "meal"
}

interface AgendaDay {
  id: string
  shortLabel: string
  number: string
  title: string
  subtitle: string
  items: AgendaItem[]
}

const SCHEDULE: AgendaDay[] = [
  {
    id: "j1",
    number: "Jour 1",
    shortLabel: "Première journée",
    title: "Mise en place officielle du Comité de pilotage",
    subtitle: "Comité de pilotage des Assises (COPIL)",
    items: [
      {
        time: "08h00 – 09h00",
        activity: "Accueil des participants",
        comment: "Installation, partage des documents de travail.",
        lead: "JGEN Sénégal",
        type: "session",
      },
      {
        time: "09h00 – 09h15",
        activity: "Cérémonie d'ouverture",
        comment:
          "Mots introductifs de la Directrice de JGEN et d'un représentant du Comité technique.",
        lead: "Mme M. Yade & Mme Fatoumata G. Ndiaye",
        type: "session",
      },
      {
        time: "09h15 – 09h30",
        activity: "Rappel des objectifs et résultats attendus de la rencontre",
        comment: "Retour sur le contexte et les objectifs.",
        lead: "Mme Dior Fall Sow",
        type: "session",
      },
      {
        time: "09h30 – 10h00",
        activity: "Présentation des participants",
        comment: "Tour de table interactif.",
        lead: "Mme Dior Fall Sow",
        type: "session",
      },
      {
        time: "10h00 – 10h30",
        activity: "Pause-café",
        type: "break",
      },
      {
        time: "10h30 – 11h00",
        activity: "Présentation du Comité technique",
        comment:
          "Présentation des membres et de leur cahier des charges, suivie de discussions.",
        lead: "Mme Aminata Ndiaye",
        type: "session",
      },
      {
        time: "11h00 – 13h00",
        activity: "Mise en place officielle du COPIL",
        comment:
          "Validation des missions, rôles, composition, mécanisme de coordination. Déclaration solennelle de mise en place du COPIL des Assises.",
        lead: "Mme Dior Fall Sow & Maimouna A. Yade",
        type: "session",
      },
      {
        time: "13h00 – 14h00",
        activity: "Pause-déjeuner",
        type: "meal",
      },
      {
        time: "14h00 – 16h45",
        activity: "Structuration du COPIL",
        comment:
          "Travaux des groupes thématiques suivis de plénières pour constituer les sous-comités, leurs mandats, priorités et plan de travail.",
        lead: "Oussama Sagna",
        type: "session",
      },
      {
        time: "16h45 – 17h00",
        activity: "Clôture du J1",
        comment: "Synthèse de la journée.",
        type: "session",
      },
    ],
  },
  {
    id: "j2",
    number: "Jour 2",
    shortLabel: "Deuxième journée",
    title: "Structuration du COPIL (suite)",
    subtitle: "Validation des outils stratégiques des Assises",
    items: [
      {
        time: "09h00 – 09h10",
        activity: "Rappel des acquis du J1",
        comment: "Rappel des résultats et conclusions du jour 1.",
        lead: "Mme Dior Fall Sow",
        type: "session",
      },
      {
        time: "09h10 – 10h30",
        activity: "Validation de la méthodologie des pré-assises",
        comment:
          "Structuration des pôles régionaux pour la tenue des pré-assises. Validation du format des pré-assises.",
        lead: "Mme Dior Fall Sow",
        type: "session",
      },
      {
        time: "10h30 – 11h00",
        activity: "Pause-café",
        type: "break",
      },
      {
        time: "11h00 – 13h00",
        activity: "Validation des TDRs des Assises",
        comment:
          "Thématiques, méthodologie des Assises, catégorie de participants et modalités d'engagement.",
        lead: "Amy Sakho / Amy Sèye",
        type: "session",
      },
      {
        time: "13h00 – 14h00",
        activity: "Pause-déjeuner",
        type: "meal",
      },
      {
        time: "14h00 – 15h00",
        activity: "Validation de la feuille de route des Assises",
        comment: "Revue et validation des grandes étapes et de leurs dates clés.",
        lead: "Aminata Libain Mbengue",
        type: "session",
      },
      {
        time: "15h00 – 16h00",
        activity: "Validation du plan de communication",
        comment: "Revue et validation des messages clés, cibles, etc.",
        lead: "Oussama Sagna / Madjiguene Sarr",
        type: "session",
      },
      {
        time: "16h00 – 16h30",
        activity: "Identification des prochaines étapes",
        comment: "Définition des jalons prioritaires à la sortie de l'atelier.",
        lead: "Mme Dior Fall Sow",
        type: "session",
      },
      {
        time: "16h30 – 17h00",
        activity: "Mot de clôture",
        comment:
          "Retours des participants. Mot de clôture de la Directrice de JGEN.",
        lead: "Mme Dior Fall Sow",
        type: "session",
      },
    ],
  },
]

function ItemIcon({ type }: { type?: AgendaItem["type"] }) {
  if (type === "break") return <Coffee className="h-4 w-4" />
  if (type === "meal") return <Utensils className="h-4 w-4" />
  return <CalendarDays className="h-4 w-4" />
}

function AgendaTable({ day }: { day: AgendaDay }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="overflow-hidden rounded-2xl border border-[#3d1f47]/10 bg-white shadow-[0_10px_40px_-15px_rgba(61,31,71,0.2)]">
      <div className="bg-[#3d1f47] text-white px-6 py-5 lg:px-8 lg:py-6 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#c61d4d]/30 blur-3xl -translate-y-12 translate-x-12"
        />
        <div className="flex flex-wrap items-center gap-3 relative">
          <span className="inline-block bg-[#ffd23f] text-[#3d1f47] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
            {day.number}
          </span>
          <span className="text-white/70 text-xs font-semibold uppercase tracking-[0.18em]">
            {day.shortLabel}
          </span>
        </div>
        <h3 className="mt-2 text-xl lg:text-2xl font-black leading-tight relative">
          {day.title}
        </h3>
        <p className="mt-1 text-white/75 !text-base relative">{day.subtitle}</p>
      </div>

      <div role="table" aria-label={`${day.number} — ${day.title}`}>
        <div
          role="row"
          className="hidden md:grid grid-cols-[200px_1fr_220px_56px] items-center gap-4 px-6 py-3 bg-[#faf6f0] border-b border-[#3d1f47]/10 text-[11px] font-bold uppercase tracking-[0.18em] text-[#3d1f47]/70"
        >
          <div role="columnheader">Heure</div>
          <div role="columnheader">Activité</div>
          <div role="columnheader">Responsable</div>
          <div role="columnheader" className="sr-only">
            Détails
          </div>
        </div>

        <ul className="divide-y divide-[#3d1f47]/10">
          {day.items.map((item, index) => {
            const isOpen = openIndex === index
            const isInfo = item.type === "break" || item.type === "meal"
            const hasDetails = Boolean(item.comment || item.lead)

            return (
              <li key={index} role="row" className="group">
                <button
                  type="button"
                  onClick={() =>
                    hasDetails ? setOpenIndex(isOpen ? null : index) : undefined
                  }
                  aria-expanded={hasDetails ? isOpen : undefined}
                  aria-disabled={!hasDetails}
                  className={cn(
                    "w-full text-left transition-colors",
                    "grid grid-cols-1 md:grid-cols-[200px_1fr_220px_56px] md:items-center gap-2 md:gap-4 px-6 py-4 lg:py-5",
                    hasDetails ? "hover:bg-[#faf6f0]" : "cursor-default",
                    isOpen && "bg-[#faf6f0]",
                    isInfo && "bg-[#ffd23f]/5",
                  )}
                >
                  <div
                    role="cell"
                    className="flex items-center gap-2 text-[#c61d4d] font-bold text-sm whitespace-nowrap"
                  >
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <time>{item.time}</time>
                  </div>

                  <div
                    role="cell"
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
                        isInfo
                          ? "bg-[#ffd23f]/20 text-[#a8830f]"
                          : "bg-[#3d1f47]/5 text-[#3d1f47]",
                      )}
                    >
                      <ItemIcon type={item.type} />
                    </span>
                    <span
                      className={cn(
                        "text-base lg:text-lg font-bold leading-snug text-[#3d1f47]",
                        isInfo && "italic font-semibold text-[#3d1f47]/80",
                      )}
                    >
                      {item.activity}
                    </span>
                  </div>

                  <div
                    role="cell"
                    className="text-sm text-[#3d1f47]/80 md:pr-2"
                  >
                    {item.lead ? (
                      <span className="inline-flex items-start gap-1.5">
                        <User className="h-3.5 w-3.5 mt-1 flex-shrink-0 text-[#c61d4d]" />
                        <span className="font-medium">{item.lead}</span>
                      </span>
                    ) : (
                      <span className="text-[#3d1f47]/30">—</span>
                    )}
                  </div>

                  <div
                    role="cell"
                    className={cn(
                      "hidden md:flex justify-end",
                      !hasDetails && "opacity-0",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                        isOpen
                          ? "bg-[#c61d4d] text-white rotate-180"
                          : "bg-[#3d1f47]/5 text-[#3d1f47] group-hover:bg-[#c61d4d] group-hover:text-white",
                      )}
                      aria-hidden
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                </button>

                {hasDetails && (
                  <div
                    role="region"
                    aria-hidden={!isOpen}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5 md:pl-[224px] md:pr-8">
                        <div className="rounded-xl bg-gradient-to-br from-[#3d1f47]/[0.03] to-[#c61d4d]/[0.03] border border-[#3d1f47]/10 p-4 lg:p-5">
                          {item.comment && (
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#3d1f47] text-white">
                                <MessageSquare className="h-3.5 w-3.5" />
                              </span>
                              <div className="flex-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#3d1f47]/60 mb-1">
                                  Commentaire
                                </p>
                                <p className="!text-base text-[#3d1f47]/90 leading-relaxed">
                                  {item.comment}
                                </p>
                              </div>
                            </div>
                          )}

                          {item.lead && (
                            <div className="md:hidden mt-4 pt-4 border-t border-[#3d1f47]/10 flex items-start gap-3">
                              <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#c61d4d] text-white">
                                <User className="h-3.5 w-3.5" />
                              </span>
                              <div className="flex-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#3d1f47]/60 mb-1">
                                  Responsable
                                </p>
                                <p className="!text-base text-[#3d1f47]/90 font-semibold">
                                  {item.lead}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export function AssisesCalendar() {
  return (
    <section
      id="calendrier"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#faf6f0] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[url('/deco-assises.svg')] bg-no-repeat bg-center bg-contain opacity-[0.07]"
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#ffd23f]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#00d4aa]/10 blur-3xl"
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <span className="inline-block text-[#c61d4d] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Programme officiel
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#3d1f47] leading-tight mb-6">
            Le calendrier
          </h2>
          <div className="w-20 h-1 bg-[#c61d4d] mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            Découvrez le déroulé de l&apos;atelier d&apos;installation et de
            structuration du comité de pilotage. Cliquez sur une activité pour
            consulter les détails.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue={SCHEDULE[0].id} className="gap-6 lg:gap-8">
            <TabsList className="mx-auto h-auto bg-[#3d1f47]/5 p-1.5 rounded-full border border-[#3d1f47]/10">
              {SCHEDULE.map((day) => (
                <TabsTrigger
                  key={day.id}
                  value={day.id}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider",
                    "data-[state=active]:bg-[#3d1f47] data-[state=active]:text-white data-[state=active]:shadow-md",
                    "data-[state=inactive]:text-[#3d1f47]/70 hover:data-[state=inactive]:text-[#3d1f47]",
                  )}
                >
                  {day.number}
                </TabsTrigger>
              ))}
            </TabsList>

            {SCHEDULE.map((day) => (
              <TabsContent key={day.id} value={day.id} className="mt-0">
                <AgendaTable day={day} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
