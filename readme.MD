# J-GEN SENEGAL

Site web officiel de J-GEN SENEGAL, une organisation féministe dédiée à la lutte contre les violences basées sur le genre (VBG) au Sénégal.

**Site en production :** [https://jgen.sn](https://jgen.sn)

## Stack technique

- **Framework :** Next.js 14 (App Router)
- **Langage :** TypeScript
- **Styling :** Tailwind CSS + shadcn/ui (Radix UI)
- **CMS :** Sanity v4
- **Newsletter :** Mailchimp API
- **Analytics :** Vercel Analytics
- **Déploiement :** Vercel

## Fonctionnalités

- **Blog** — Articles dynamiques avec catégories, auteurs et texte riche
- **Programmes** — Présentation des programmes avec galeries, statistiques d'impact et suivi de statut
- **Ressources** — Bibliothèque de documents (PDF, vidéos, liens, guides)
- **Carrières** — Offres d'emploi avec téléchargement des termes de référence
- **Newsletter** — Inscription via Mailchimp avec modal popup
- **Sanity Studio** — Interface d'administration du contenu accessible sur `/studio`
- **SEO** — Métadonnées Open Graph / Twitter Cards, sitemap dynamique, données structurées
- **Performance** — Optimisation d'images (AVIF/WebP), ISR, lazy loading

## Prérequis

- Node.js 18+
- npm

## Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd jgen-senegal

# Installer les dépendances
npm install
```

## Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=<votre-project-id>
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-03

# Mailchimp
MAILCHIMP_API_KEY=<votre-api-key>
MAILCHIMP_AUDIENCE_ID=<votre-audience-id>
MAILCHIMP_API_SERVER=<votre-serveur>
```

## Développement

```bash
# Lancer le serveur de développement
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

Le Sanity Studio est accessible sur [http://localhost:3000/studio](http://localhost:3000/studio).

## Build

```bash
npm run build
npm start
```

## Structure du projet

```
app/
├── about/              # Pages À propos & Carrières
├── api/                # Routes API (blog, contact, newsletter, etc.)
├── blog/               # Section blog avec pages dynamiques [slug]
├── contact/            # Page de contact
├── interventions/      # Domaines d'intervention
├── programs/           # Section programmes
├── resources/          # Section ressources
└── studio/             # Sanity Studio

components/
├── ui/                 # Composants shadcn/ui
├── header.tsx          # Navigation principale
├── footer.tsx          # Pied de page
├── hero-carousel.tsx   # Carousel d'accueil
├── newsletter-modal.tsx
└── ...

sanity/
├── schemaTypes/        # Schémas de contenu (post, program, resource, career, etc.)
├── lib/                # Client et utilitaires Sanity
└── structure.ts        # Configuration du Studio

hooks/                  # Hooks React personnalisés
lib/                    # Fonctions utilitaires
public/                 # Assets statiques (images, logos)
```

## Design

| Élément | Valeur |
|---------|--------|
| Couleur principale | `#3d1f47` (violet foncé) |
| Accent rose | `#c61d4d` |
| Accent jaune | `#ffd23f` |
| Police titres | Anton |
| Police corps | Open Sans |

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run lint` | Linting ESLint |

## Licence

Tous droits réservés — J-GEN SENEGAL
