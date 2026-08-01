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
  type NewsletterProject,
} from "@/content/newsletter-semestre-1-2026"
import { resolveNewsletterImage } from "@/lib/newsletter-image"
import { buildUrl, withNewsletterUtm } from "@/lib/site"

/**
 * ============================================================================
 * NEWSLETTER SEMESTRIELLE J-GEN SÉNÉGAL — VERSION E-MAIL
 * ----------------------------------------------------------------------------
 * Version volontairement CONDENSÉE : elle ne reproduit pas la page web, elle y
 * conduit. Tout le contenu provient de content/newsletter-semestre-1-2026.ts.
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

/** Trois projets mis en avant dans l'e-mail. */
const featuredProjectIds = ["elles-aussi", "liggeyal-eleg", "jvssr"]
const featuredProjects = featuredProjectIds
  .map((id) => data.projects.find((project) => project.id === id))
  .filter((project): project is NewsletterProject => Boolean(project))

// --- Composant ---------------------------------------------------------------

export function NewsletterSemestreOne2026Email() {
  const cover = resolveNewsletterImage(data.coverImage.name, data.coverImage.alt)

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
            {cover ? (
              <Img
                src={cover.absoluteUrl}
                alt={cover.alt}
                width="600"
                style={{
                  border: 0,
                  display: "block",
                  height: "auto",
                  maxWidth: "100%",
                  outline: "none",
                  textDecoration: "none",
                  width: "100%",
                }}
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

          {/* ---- Axes d'intervention ---- */}
          <Section style={{ ...gutter, paddingBottom: "8px" }}>
            <Heading as="h2" style={sectionTitle}>
              Nos axes d&apos;intervention
            </Heading>
            <Text style={{ ...smallText, margin: "0 0 20px" }}>
              Quatre priorités ont structuré le travail du semestre.
            </Text>

            {data.axes.map((axis) => (
              <Section key={axis.id} style={{ marginBottom: "18px" }}>
                <Text
                  style={{
                    color: PURPLE,
                    fontFamily: FONT_STACK,
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    margin: "0 0 4px",
                  }}
                >
                  {axis.emailTitle}
                </Text>
                <Text style={{ ...paragraph, fontSize: "15px", lineHeight: "24px", margin: 0 }}>
                  {axis.emailSummary}
                </Text>
              </Section>
            ))}
          </Section>

          <Hr style={{ borderColor: BORDER, margin: "28px 24px" }} />

          {/* ---- Projets mis en avant ---- */}
          <Section style={{ ...gutter, paddingBottom: "8px" }}>
            <Heading as="h2" style={sectionTitle}>
              Trois projets du semestre
            </Heading>
            <Text style={{ ...smallText, margin: "0 0 20px" }}>
              Un aperçu — l&apos;ensemble des réalisations est présenté sur le site.
            </Text>

            {featuredProjects.map((project) => (
              <Section
                key={project.id}
                style={{
                  border: `1px solid ${BORDER}`,
                  marginBottom: "16px",
                  padding: "18px",
                }}
              >
                <Text
                  style={{
                    color: CRIMSON,
                    fontFamily: FONT_STACK,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    lineHeight: "16px",
                    margin: "0 0 6px",
                    textTransform: "uppercase",
                  }}
                >
                  {project.category}
                </Text>
                <Text
                  style={{
                    color: PURPLE,
                    fontFamily: FONT_STACK,
                    fontSize: "18px",
                    fontWeight: 800,
                    lineHeight: "26px",
                    margin: "0 0 8px",
                  }}
                >
                  {project.name}
                </Text>
                <Text
                  style={{ ...paragraph, fontSize: "15px", lineHeight: "24px", margin: "0 0 14px" }}
                >
                  {project.emailSummary ?? project.summary}
                </Text>
                {/* Un seul appel à l'action par section, vers la page pilier du
                    projet : c'est là que se trouvent le programme et ses articles. */}
                <Button
                  href={projectProgramUrl(project)}
                  style={{ ...primaryButton, fontSize: "14px", padding: "12px 22px" }}
                >
                  {project.programCta ?? `Découvrir ${project.name}`}
                </Button>
              </Section>
            ))}
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
