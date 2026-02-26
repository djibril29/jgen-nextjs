# CLAUDE.md

## Project Overview

J-GEN SENEGAL website — a feminist organization fighting gender-based violence (VBG) in Senegal.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS 4, Sanity CMS v4, and deployed on Vercel.
The site is entirely in French (locale `fr-SN`).

## Commands

- `npm run dev` — Start development server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm start` — Start production server

## Project Structure

```
app/                  # Next.js App Router pages
  about/              # About + Careers (/about/careers/[slug])
  api/                # API routes: blog, careers, contact, newsletter, resources
  blog/[slug]         # Blog posts
  contact/            # Contact page
  interventions/[slug]
  programs/[slug]     # Programs
  resources/[slug]    # Resources
  studio/[[...tool]]  # Sanity Studio (mounted at /studio)
components/
  ui/                 # shadcn/ui components (do not edit manually, use `npx shadcn@latest add`)
  *.tsx               # App-level components (header, footer, hero-carousel, etc.)
hooks/                # Custom React hooks
lib/                  # Utilities (utils.ts)
sanity/
  schemaTypes/documents/  # Sanity schemas: post, program, resource, career, author, category
  lib/                    # Sanity client, image helpers
public/               # Static assets (images, logos)
```

## Key Conventions

- **Path aliases:** `@/*` maps to the project root (e.g. `@/components/ui/button`)
- **UI components:** shadcn/ui (New York style) with Radix UI primitives. Add new components via `npx shadcn@latest add <component>`
- **Icons:** Lucide React (`lucide-react`)
- **Forms:** react-hook-form + zod for validation
- **Styling:** Tailwind CSS 4 with CSS variables for theming. Global styles in `app/globals.css`
- **CMS:** All dynamic content (posts, programs, resources, careers) comes from Sanity. Schemas are in `sanity/schemaTypes/documents/`
- **Sanity client:** `sanity/lib/client.ts`. Uses GROQ queries. Revalidation is set to 60s
- **Images:** Use `next/image`. Remote images from `cdn.sanity.io` are configured in `next.config.mjs`
- **Rich text:** Rendered with `@portabletext/react`
- **Newsletter:** Mailchimp integration via `/api/newsletter` route

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
MAILCHIMP_API_KEY
MAILCHIMP_AUDIENCE_ID
MAILCHIMP_API_SERVER
```

## Design Tokens

- Primary: `#3d1f47` (dark purple)
- Accent pink: `#c61d4d`
- Accent yellow: `#ffd23f`
- Accent green: `#00d4aa`
- Heading font: Anton
- Body font: Open Sans

## Important Notes

- TypeScript strict mode is enabled
- ESLint and TypeScript errors are ignored during builds (`next.config.mjs`)
- The `/studio` route is the Sanity CMS admin interface — do not add middleware or layouts that interfere with it
- All text content on the site is in French
- Security headers (X-Frame-Options DENY, X-Content-Type-Options nosniff) are set in `next.config.mjs`
