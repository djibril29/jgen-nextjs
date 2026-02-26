import { defineField, defineType } from 'sanity'

export const heroSlideType = defineType({
  name: 'heroSlide',
  title: 'Slide Hero',
  type: 'document',
  groups: [
    { name: 'main',       title: 'Essentiel',           default: true },
    { name: 'linked',     title: 'Document lié'         },
    { name: 'standalone', title: 'Contenu autonome'     },
    { name: 'editorial',  title: 'Contrôle éditorial'  },
  ],
  fields: [
    // ── MAIN ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'internalName',
      title: 'Nom interne',
      type: 'string',
      description: 'Référence interne uniquement (non affiché sur le site). Ex : "Slide Atelier Dakar - Jan 2026"',
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'slideType',
      title: 'Type de slide',
      type: 'string',
      options: {
        list: [
          { title: 'Document lié (article ou programme)', value: 'linked'     },
          { title: 'Slide autonome',                      value: 'standalone' },
        ],
        layout: 'radio',
      },
      initialValue: 'linked',
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'URL YouTube (optionnel)',
      type: 'url',
      description:
        'Si renseigné, le bouton CTA ouvrira cette vidéo dans une modale au lieu de naviguer vers une page. Ex : https://www.youtube.com/watch?v=XXXXXXXXX',
      group: 'main',
    }),

    // ── LINKED ───────────────────────────────────────────────────────────────
    defineField({
      name: 'linkedDocument',
      title: 'Document lié',
      type: 'reference',
      to: [{ type: 'post' }, { type: 'program' }],
      description:
        'Sélectionner un article ou un programme. Son titre et son image seront utilisés automatiquement.',
      hidden: ({ parent }) => parent?.slideType !== 'linked',
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const parent = (ctx as any).parent
          if (parent?.slideType === 'linked' && !value) {
            return 'Un document lié est requis pour ce type de slide.'
          }
          return true
        }),
      group: 'linked',
    }),
    defineField({
      name: 'overrideImage',
      title: "Remplacer l'image automatique",
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texte alternatif' }),
      ],
      description:
        "Optionnel. Si renseigné, remplace l'image issue du document lié.",
      hidden: ({ parent }) => parent?.slideType !== 'linked',
      group: 'linked',
    }),
    defineField({
      name: 'overrideCtaLabel',
      title: 'Remplacer le libellé du bouton CTA',
      type: 'string',
      description:
        "Optionnel. Si vide, utilise « Lire l'article » pour un article et « En savoir plus » pour un programme.",
      hidden: ({ parent }) => parent?.slideType !== 'linked',
      group: 'linked',
    }),

    // ── STANDALONE ───────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      hidden: ({ parent }) => parent?.slideType !== 'standalone',
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const parent = (ctx as any).parent
          if (parent?.slideType === 'standalone' && !value) {
            return 'Le titre est requis pour un slide autonome.'
          }
          return true
        }),
      group: 'standalone',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre / Description',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => parent?.slideType !== 'standalone',
      group: 'standalone',
    }),
    defineField({
      name: 'image',
      title: 'Image de fond',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texte alternatif' }),
      ],
      hidden: ({ parent }) => parent?.slideType !== 'standalone',
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const parent = (ctx as any).parent
          if (parent?.slideType === 'standalone' && !value) {
            return "L'image de fond est requise pour un slide autonome."
          }
          return true
        }),
      group: 'standalone',
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Étiquette',
      type: 'string',
      description:
        "Affiché en petit texte au-dessus du titre. Ex : « Événement ».",
      options: {
        list: [
          { title: 'Événement',  value: 'Événement'  },
          { title: 'Annonce',    value: 'Annonce'    },
          { title: 'Programme',  value: 'Programme'  },
          { title: 'Impact',     value: 'Impact'     },
          { title: 'Actualité',  value: 'Actualité'  },
        ],
      },
      hidden: ({ parent }) => parent?.slideType !== 'standalone',
      group: 'standalone',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Libellé du bouton CTA',
      type: 'string',
      description:
        "Texte affiché sur le bouton d'action. Ex : « S'inscrire », « En savoir plus ».",
      hidden: ({ parent }) => parent?.slideType !== 'standalone',
      group: 'standalone',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'URL du CTA',
      type: 'string',
      description:
        "URL de destination du bouton CTA. Accepte les chemins internes (/about) et les URLs externes. Ignoré si une URL YouTube est définie.",
      hidden: ({ parent }) => parent?.slideType !== 'standalone',
      group: 'standalone',
    }),

    // ── EDITORIAL ────────────────────────────────────────────────────────────
    defineField({
      name: 'order',
      title: "Ordre d'affichage",
      type: 'number',
      description:
        'Les slides sont triés par ordre croissant. Ex : 1 = premier slide. Utilisez des intervalles (10, 20, 30…) pour faciliter les insertions.',
      initialValue: 10,
      validation: (rule) => rule.required().integer().positive(),
      group: 'editorial',
    }),
    defineField({
      name: 'isActive',
      title: 'Actif',
      type: 'boolean',
      description: 'Décocher pour masquer ce slide sans le supprimer.',
      initialValue: true,
      group: 'editorial',
    }),
    defineField({
      name: 'expiresAt',
      title: "Date d'expiration",
      type: 'datetime',
      description:
        "Optionnel. Le slide sera automatiquement exclu après cette date (dans un délai de 60 secondes).",
      group: 'editorial',
    }),
  ],

  preview: {
    select: {
      title:     'internalName',
      slideType: 'slideType',
      isActive:  'isActive',
      order:     'order',
      media:     'image',
      linkedTitle: 'linkedDocument.title',
    },
    prepare(selection) {
      const { title, slideType, isActive, order, media, linkedTitle } = selection
      const activeIcon = isActive ? '🟢' : '⚫'
      const typeLabel  =
        slideType === 'linked'
          ? `→ ${linkedTitle ?? 'document lié'}`
          : 'autonome'
      return {
        title:    `${activeIcon} [${order ?? '?'}] ${title ?? 'Sans nom'}`,
        subtitle: typeLabel,
        media,
      }
    },
  },

  orderings: [
    {
      title: "Ordre d'affichage",
      name:  'orderAsc',
      by:    [{ field: 'order', direction: 'asc' }],
    },
  ],
})
