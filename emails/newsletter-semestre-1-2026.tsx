import * as React from "react"
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "react-email"

import {
  newsletterSemesterOne2026 as data,
  type NewsletterImageRef,
  type NewsletterProject,
} from "@/content/newsletter-semestre-1-2026"
import {
  resolveNewsletterImage,
  type ResolvedNewsletterImage,
} from "@/lib/newsletter-image"
import { buildUrl, withNewsletterUtm } from "@/lib/site"

/**
 * ============================================================================
 * NEWSLETTER SEMESTRIELLE J-GEN SÉNÉGAL — VERSION E-MAIL
 * ----------------------------------------------------------------------------
 * L'e-mail suit désormais le même déroulé que la page web : les quatre axes
 * d'intervention, puis CHACUNE des activités du semestre, illustrée par une
 * photographie, résumée en quelques lignes et refermée par un bouton vers sa
 * page programme. Les temps forts institutionnels suivent le même principe.
 * Tout le contenu provient de content/newsletter-semestre-1-2026.ts.
 *
 * Contraintes respectées :
 *  - styles 100 % inline, largeur 600 px, polices système ;
 *  - toutes les URL (liens et images) sont ABSOLUES ;
 *  - les images sont omises si le fichier n'a pas encore été déposé ;
 *  - zones éditables notées `data-mc-edit`, converties en `mc:edit` par le
 *    script de génération (un attribut JSX avec namespace casserait la
 *    compilation TSX).
 *
 * Aperçu :   npm run email:dev      → http://localhost:3001
 * Génération : npm run email:generate
 * ============================================================================
 */

// --- Palette et typographie --------------------------------------------------

const PURPLE = "#3d1f47"
const PURPLE_DARK = "#2d1537"
const CRIMSON = "#c61d4d"
const YELLOW = "#ffd23f"
const TEAL = "#00d4aa"
const TEXT = "#2f2f2f"
const MUTED = "#5f5f5f"
const BORDER = "#e2e2e2"

const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const main: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  fontFamily: FONT_STACK,
  margin: 0,
  padding: 0,
}

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  width: "100%",
}

const gutter: React.CSSProperties = { padding: "0 24px" }

const paragraph: React.CSSProperties = {
  color: TEXT,
  fontFamily: FONT_STACK,
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
  textAlign: "left",
}

const smallText: React.CSSProperties = {
  color: MUTED,
  fontFamily: FONT_STACK,
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0 0 10px",
  textAlign: "left",
}

const sectionTitle: React.CSSProperties = {
  color: PURPLE,
  fontFamily: FONT_STACK,
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: "28px",
  margin: "0 0 6px",
}

/** Surtitre d'un bloc : catégorie de projet, date et lieu d'un temps fort. */
const eyebrow: React.CSSProperties = {
  color: CRIMSON,
  fontFamily: FONT_STACK,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  lineHeight: "16px",
  margin: "0 0 6px",
  textTransform: "uppercase",
}

const blockTitle: React.CSSProperties = {
  color: PURPLE,
  fontFamily: FONT_STACK,
  fontSize: "18px",
  fontWeight: 800,
  lineHeight: "26px",
  margin: "0 0 8px",
}

/** Légende de photographie, sous l'illustration. */
const captionText: React.CSSProperties = {
  color: MUTED,
  fontFamily: FONT_STACK,
  fontSize: "12px",
  fontStyle: "italic",
  lineHeight: "18px",
  margin: "0 0 12px",
}

/** Image pleine largeur : elle se réduit avec le conteneur sur mobile. */
const fullWidthImage: React.CSSProperties = {
  border: 0,
  display: "block",
  height: "auto",
  maxWidth: "100%",
  outline: "none",
  textDecoration: "none",
  width: "100%",
}

/** Boutons : hauteur confortable au doigt (>= 44 px avec le padding). */
const primaryButton: React.CSSProperties = {
  backgroundColor: CRIMSON,
  borderRadius: "0",
  color: "#ffffff",
  display: "inline-block",
  fontFamily: FONT_STACK,
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "20px",
  padding: "16px 28px",
  textAlign: "center",
  textDecoration: "none",
}

const secondaryButton: React.CSSProperties = {
  ...primaryButton,
  backgroundColor: PURPLE,
}

// --- Données dérivées --------------------------------------------------------

const pageUrl = withNewsletterUtm(data.pagePath)
/** L'API `URL` place le fragment après les paramètres UTM, comme il se doit. */
const highlightsUrl = withNewsletterUtm(`${data.pagePath}#temps-forts`)
const programsUrl = withNewsletterUtm(data.links.programs)
const logoUrl = buildUrl("/logo-jgen.png")

/** Lien profond vers la section d'un projet sur la page complète. */
function projectUrl(project: NewsletterProject): string {
  const anchor = project.href?.startsWith("#") ? project.href : `#${project.id}`
  return project.href?.startsWith("/")
    ? withNewsletterUtm(project.href)
    : `${pageUrl}${anchor}`
}

/**
 * Destination du bouton de section : la page pilier du projet.
 *
 * On préfère cette page au lien profond vers la newsletter, parce qu'elle mène
 * au programme ET à ses articles. À défaut de page pilier déclarée, on retombe
 * sur le lien profond, qui existe toujours.
 */
function projectProgramUrl(project: NewsletterProject): string {
  return project.programHref ? withNewsletterUtm(project.programHref) : projectUrl(project)
}

/** Chiffres retenus pour l'e-mail (5 sur les 7 de la page). */
const emailStatistics = data.statistics.filter((stat) => stat.inEmail)

/**
 * Attribution des visuels.
 *
 * Chaque photographie n'est utilisée qu'UNE FOIS dans l'e-mail : la couverture
 * réutilise le cliché du 8 mars, le temps fort correspondant s'ouvre donc sans
 * image plutôt que de répéter la même vue quelques écrans plus bas.
 *
 * L'attribution est faite ici, au chargement du module, et non pendant le
 * rendu : le composant reste pur et l'aperçu `email dev` produit exactement le
 * même résultat que le script de génération, quel que soit le nombre de rendus.
 */
const claimedImagePaths = new Set<string>()

function claimImage(ref: NewsletterImageRef | undefined): ResolvedNewsletterImage | undefined {
  if (!ref) return undefined

  const resolved = resolveNewsletterImage(ref.name, ref.alt)
  if (!resolved || claimedImagePaths.has(resolved.publicPath)) return undefined

  claimedImagePaths.add(resolved.publicPath)
  return resolved
}

const coverImage = claimImage(data.coverImage)

/**
 * Une illustration par activité : la photo principale du projet, ou à défaut
 * son premier visuel secondaire. Les projets dont aucun fichier n'a encore été
 * fourni s'ouvrent sur un bandeau typographique (voir `Illustration`).
 */
const projectImages = new Map(
  data.projects.map((project) => [
    project.id,
    claimImage(project.image) ?? claimImage(project.media?.[0]),
  ]),
)

const highlightImages = new Map(
  data.highlights.map((highlight) => [highlight.id, claimImage(highlight.image)]),
)

/** Activités rattachées à chaque axe, dans l'ordre déclaré par l'axe. */
const projectsByAxis = new Map(
  data.axes.map((axis) => [
    axis.id,
    axis.projectIds
      .map((id) => data.projects.find((project) => project.id === id))
      .filter((project): project is NewsletterProject => Boolean(project)),
  ]),
)

// --- Sous-composants ---------------------------------------------------------

/**
 * Illustration pleine largeur d'une activité.
 *
 * Sans photographie disponible, on n'insère AUCUNE balise `<img>` — une URL
 * absente renverrait une 404 dans la boîte de réception. Un bandeau
 * typographique aux couleurs de J-GEN tient alors lieu d'ouverture, comme sur
 * la page web.
 */
function Illustration({
  image,
  label,
}: {
  image: ResolvedNewsletterImage | undefined
  label: string
}) {
  if (image) {
    return <Img src={image.absoluteUrl} alt={image.alt} width="600" style={fullWidthImage} />
  }

  return (
    <Section style={{ backgroundColor: PURPLE, padding: "34px 24px", textAlign: "center" }}>
      <Text
        style={{
          color: YELLOW,
          fontFamily: FONT_STACK,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          lineHeight: "16px",
          margin: "0 0 8px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        J-GEN Sénégal
      </Text>
      <Text
        style={{
          color: "#ffffff",
          fontFamily: FONT_STACK,
          fontSize: "22px",
          fontWeight: 800,
          lineHeight: "30px",
          margin: 0,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </Section>
  )
}

// --- Composant ---------------------------------------------------------------

export function NewsletterSemestreOne2026Email() {
  return (
    <Html lang="fr" dir="ltr">
      <Head>
        <title>{data.meta.seoTitle}</title>
      </Head>
      <Preview>{data.emailPreview}</Preview>

      {/* `lang` est répété sur <body> : le composant Body de react-email pose
          sinon lang="en" par défaut, ce qui écraserait le français du <html>. */}
      <Body lang="fr" dir="ltr" style={main}>
        {/* ---- Lien vers la version navigateur ---- */}
        <Section style={{ backgroundColor: "#f4f4f5", padding: "16px 24px" }}>
          <Text
            style={{
              ...smallText,
              margin: 0,
              textAlign: "center",
            }}
          >
            <Link href="*|ARCHIVE|*" style={{ color: MUTED, textDecoration: "underline" }}>
              Voir cet e-mail dans votre navigateur
            </Link>
          </Text>
        </Section>

        <Container style={container}>
          {/* ---- En-tête ---- */}
          <Section style={{ ...gutter, paddingTop: "28px", paddingBottom: "20px" }}>
            <Img
              src={logoUrl}
              alt="Logo de J-GEN Sénégal"
              width="140"
              height="56"
              style={{ display: "block", border: 0, outline: "none", textDecoration: "none" }}
            />
            <Text
              style={{
                ...smallText,
                color: CRIMSON,
                fontWeight: 700,
                letterSpacing: "0.06em",
                margin: "16px 0 4px",
                textTransform: "uppercase",
              }}
            >
              Newsletter semestrielle
            </Text>
            <Text style={{ ...smallText, margin: 0 }}>{data.header.periodLabel}</Text>
          </Section>

          {/* ---- Hero ---- */}
          <Section style={{ backgroundColor: PURPLE, padding: "32px 24px" }}>
            <Heading
              as="h1"
              data-mc-edit="hero_title"
              style={{
                color: "#ffffff",
                fontFamily: FONT_STACK,
                fontSize: "26px",
                fontWeight: 800,
                lineHeight: "34px",
                margin: "0 0 16px",
              }}
            >
              {data.header.title}
            </Heading>

            <div
              style={{
                backgroundColor: YELLOW,
                fontSize: "1px",
                height: "4px",
                lineHeight: "4px",
                margin: "0 0 20px",
                width: "64px",
              }}
            >
              &nbsp;
            </div>

            <Text
              data-mc-edit="hero_intro"
              style={{
                ...paragraph,
                color: "#f2eef4",
                margin: "0 0 24px",
              }}
            >
              {data.intro.email}
            </Text>

            <Button href={pageUrl} data-mc-edit="main_cta" style={primaryButton}>
              {data.cta.emailPrimary}
            </Button>
          </Section>

          {/* ---- Visuel principal (zone image éditable dans Mailchimp) ---- */}
          <Section data-mc-edit="hero_image" style={{ padding: 0 }}>
            {coverImage ? (
              <Img
                src={coverImage.absoluteUrl}
                alt={coverImage.alt}
                width="600"
                style={fullWidthImage}
              />
            ) : (
              // Aucune photographie n'a encore été fournie : on n'insère AUCUNE
              // balise <img>, plutôt qu'une URL qui renverrait une erreur 404.
              // Un simple filet de couleur tient lieu de séparation.
              <div
                style={{
                  backgroundColor: YELLOW,
                  fontSize: "1px",
                  height: "6px",
                  lineHeight: "6px",
                }}
              >
                &nbsp;
              </div>
            )}
          </Section>

          {/* ---- Chiffres clés ---- */}
          <Section style={{ ...gutter, paddingTop: "32px", paddingBottom: "8px" }}>
            <Heading as="h2" style={sectionTitle}>
              Les chiffres du semestre
            </Heading>
            <Text style={{ ...smallText, margin: "0 0 20px" }}>
              Résultats effectivement rapportés sur la période janvier – juin 2026.
            </Text>

            {emailStatistics.map((stat) => (
              <Row key={stat.id} style={{ marginBottom: "14px" }}>
                <Column
                  style={{
                    borderLeft: `4px solid ${CRIMSON}`,
                    paddingLeft: "14px",
                    verticalAlign: "top",
                  }}
                >
                  <Text
                    style={{
                      color: CRIMSON,
                      fontFamily: FONT_STACK,
                      fontSize: "26px",
                      fontWeight: 800,
                      lineHeight: "32px",
                      margin: "0 0 2px",
                    }}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    style={{
                      color: PURPLE,
                      fontFamily: FONT_STACK,
                      fontSize: "15px",
                      fontWeight: 700,
                      lineHeight: "22px",
                      margin: "0 0 2px",
                    }}
                  >
                    {stat.label}
                  </Text>
                  <Text style={{ ...smallText, margin: 0 }}>{stat.context}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={{ borderColor: BORDER, margin: "28px 24px" }} />

          {/* ---- Axes d'intervention et activités ---- */}
          <Section style={{ ...gutter, paddingBottom: "4px" }}>
            <Heading as="h2" style={sectionTitle}>
              Les activités du semestre
            </Heading>
            <Text style={{ ...smallText, margin: 0 }}>
              Quatre axes d&apos;intervention, {data.projects.length} projets conduits entre janvier
              et juin 2026.
            </Text>
          </Section>

          {data.axes.map((axis, axisIndex) => (
            <React.Fragment key={axis.id}>
              {/* Bandeau d'axe, jaune puis vert en alternance — comme sur la page. */}
              <Section
                style={{
                  backgroundColor: axisIndex % 2 === 0 ? YELLOW : TEAL,
                  marginTop: "20px",
                  padding: "22px 24px",
                }}
              >
                <Text
                  style={{
                    color: PURPLE,
                    fontFamily: FONT_STACK,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    lineHeight: "16px",
                    margin: "0 0 6px",
                    textTransform: "uppercase",
                  }}
                >
                  Axe n° {axis.number}
                </Text>
                <Text
                  style={{
                    color: PURPLE,
                    fontFamily: FONT_STACK,
                    fontSize: "20px",
                    fontWeight: 800,
                    lineHeight: "28px",
                    margin: "0 0 8px",
                  }}
                >
                  {axis.emailTitle}
                </Text>
                <Text
                  style={{
                    color: PURPLE,
                    fontFamily: FONT_STACK,
                    fontSize: "14px",
                    lineHeight: "22px",
                    margin: 0,
                  }}
                >
                  {axis.emailSummary}
                </Text>
              </Section>

              {(projectsByAxis.get(axis.id) ?? []).map((project) => {
                const image = projectImages.get(project.id)

                return (
                  <React.Fragment key={project.id}>
                    <Illustration image={image} label={project.name} />

                    <Section style={{ ...gutter, paddingTop: "18px", paddingBottom: "26px" }}>
                      {image && project.imageCaption ? (
                        <Text style={captionText}>{project.imageCaption}</Text>
                      ) : null}

                      <Text style={eyebrow}>{project.category}</Text>

                      {/* Sans photographie, le bandeau typographique porte déjà le
                          nom du projet : le répéter ici ferait doublon. */}
                      {image ? <Text style={blockTitle}>{project.name}</Text> : null}

                      {project.locations && project.locations.length > 0 ? (
                        <Text style={{ ...smallText, margin: "0 0 10px" }}>
                          {project.locations.join("  ·  ")}
                        </Text>
                      ) : null}

                      <Text
                        style={{
                          ...paragraph,
                          fontSize: "15px",
                          lineHeight: "24px",
                          margin: "0 0 16px",
                        }}
                      >
                        {project.emailSummary ?? project.summary}
                      </Text>

                      {/* Un seul appel à l'action par activité, vers sa page pilier :
                          c'est là que se trouvent le programme et ses articles. */}
                      <Button
                        href={projectProgramUrl(project)}
                        style={{ ...primaryButton, fontSize: "14px", padding: "12px 22px" }}
                      >
                        {project.programCta ?? `Découvrir ${project.name}`}
                      </Button>
                    </Section>
                  </React.Fragment>
                )
              })}
            </React.Fragment>
          ))}

          <Hr style={{ borderColor: BORDER, margin: "12px 24px 28px" }} />

          {/* ---- Temps forts institutionnels ---- */}
          <Section style={{ ...gutter, paddingBottom: "4px" }}>
            <Heading as="h2" style={sectionTitle}>
              Les temps forts
            </Heading>
            <Text style={{ ...smallText, margin: 0 }}>
              Mobilisations et rencontres institutionnelles du semestre.
            </Text>
          </Section>

          {data.highlights.map((highlight) => {
            const image = highlightImages.get(highlight.id)
            const meta = [highlight.date, highlight.place].filter(Boolean).join("  ·  ")

            const body = (
              <React.Fragment>
                {meta ? <Text style={eyebrow}>{meta}</Text> : null}
                <Text style={blockTitle}>{highlight.title}</Text>
                <Text style={{ ...paragraph, fontSize: "15px", lineHeight: "24px", margin: 0 }}>
                  {highlight.body}
                </Text>
              </React.Fragment>
            )

            return (
              <React.Fragment key={highlight.id}>
                {image ? (
                  <Section style={{ paddingTop: "20px" }}>
                    <Img
                      src={image.absoluteUrl}
                      alt={image.alt}
                      width="600"
                      style={fullWidthImage}
                    />
                  </Section>
                ) : null}

                <Section style={{ ...gutter, paddingTop: "18px", paddingBottom: "8px" }}>
                  {image ? (
                    body
                  ) : (
                    // Sans photographie, un filet jaune tient lieu de repère
                    // visuel : le bloc se distingue du précédent aussi nettement
                    // que le ferait une image.
                    <Row>
                      <Column
                        style={{
                          borderLeft: `4px solid ${YELLOW}`,
                          paddingLeft: "14px",
                          verticalAlign: "top",
                        }}
                      >
                        {body}
                      </Column>
                    </Row>
                  )}
                </Section>
              </React.Fragment>
            )
          })}

          <Section style={{ ...gutter, paddingTop: "18px", paddingBottom: "28px" }}>
            <Button
              href={highlightsUrl}
              style={{ ...secondaryButton, fontSize: "14px", padding: "12px 22px" }}
            >
              Lire le détail des temps forts
            </Button>
          </Section>

          {/* ---- Appel à lire la version complète ---- */}
          <Section
            style={{
              backgroundColor: PURPLE_DARK,
              padding: "32px 24px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontFamily: FONT_STACK,
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "26px",
                margin: "0 0 18px",
              }}
            >
              Retrouvez l&apos;intégralité du bilan semestriel sur notre site.
            </Text>
            <Button href={pageUrl} style={primaryButton}>
              {data.cta.emailPrimary}
            </Button>
            <Text style={{ margin: "16px 0 0", textAlign: "center" }}>
              <Link
                href={programsUrl}
                style={{
                  color: YELLOW,
                  fontFamily: FONT_STACK,
                  fontSize: "15px",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                {data.cta.projects}
              </Link>
            </Text>
          </Section>

          {/* ---- Conclusion éditoriale ---- */}
          <Section style={{ ...gutter, paddingTop: "28px", paddingBottom: "8px" }}>
            <Text style={{ ...paragraph, fontWeight: 700 }}>{data.emailGreeting}</Text>
            <Text data-mc-edit="editorial_footer" style={paragraph}>
              {data.conclusion}
            </Text>
            <Section style={{ paddingTop: "8px" }}>
              <Button href={withNewsletterUtm(data.links.contact)} style={secondaryButton}>
                {data.cta.partner}
              </Button>
            </Section>
          </Section>

          <Hr style={{ borderColor: BORDER, margin: "28px 24px" }} />

          {/* ---- Pied de page ---- */}
          <Section style={{ ...gutter, paddingBottom: "32px" }}>
            <Text
              style={{
                color: PURPLE,
                fontFamily: FONT_STACK,
                fontSize: "15px",
                fontWeight: 700,
                lineHeight: "22px",
                margin: "0 0 4px",
              }}
            >
              {data.organisation.name}
            </Text>
            <Text style={{ ...smallText, margin: "0 0 12px" }}>{data.organisation.tagline}</Text>

            <Text style={{ ...smallText, margin: "0 0 4px" }}>
              <Link
                href={`mailto:${data.organisation.email}`}
                style={{ color: CRIMSON, textDecoration: "underline" }}
              >
                {data.organisation.email}
              </Link>
            </Text>
            <Text style={{ ...smallText, margin: "0 0 12px" }}>
              <Link
                href={data.organisation.phoneHref}
                style={{ color: MUTED, textDecoration: "underline" }}
              >
                {data.organisation.phoneDisplay}
              </Link>
            </Text>

            <Text style={{ ...smallText, margin: "0 0 16px" }}>
              <Link
                href={data.organisation.social.facebook}
                style={{ color: MUTED, textDecoration: "underline" }}
              >
                Facebook
              </Link>
              {"  ·  "}
              <Link
                href={data.organisation.social.instagram}
                style={{ color: MUTED, textDecoration: "underline" }}
              >
                Instagram
              </Link>
              {"  ·  "}
              <Link
                href={data.organisation.social.linkedin}
                style={{ color: MUTED, textDecoration: "underline" }}
              >
                LinkedIn
              </Link>
            </Text>

            <div
              style={{
                backgroundColor: TEAL,
                fontSize: "1px",
                height: "3px",
                lineHeight: "3px",
                margin: "0 0 16px",
                width: "48px",
              }}
            >
              &nbsp;
            </div>

            {/* Adresse physique de l'organisation, injectée par Mailchimp. */}
            <Text style={{ ...smallText, margin: "0 0 12px" }}>*|HTML:LIST_ADDRESS_HTML|*</Text>

            <Text style={{ ...smallText, margin: "0 0 12px" }}>
              {data.emailReasonForReceiving}
            </Text>

            <Text style={{ ...smallText, margin: 0 }}>
              <Link href="*|UPDATE_PROFILE|*" style={{ color: MUTED, textDecoration: "underline" }}>
                Mettre à jour vos préférences
              </Link>
              {"  ·  "}
              <Link href="*|UNSUB|*" style={{ color: MUTED, textDecoration: "underline" }}>
                Se désabonner
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default NewsletterSemestreOne2026Email
