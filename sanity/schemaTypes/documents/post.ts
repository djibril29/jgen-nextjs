import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    { name: 'main', title: 'Contenu', default: true },
    { name: 'seo', title: 'Référencement' },
    { name: 'relations', title: 'Relations' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => input
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
          .replace(/[^\w\s-]/g, '') // Remove special chars
          .trim()
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single
          .slice(0, 96)
      },
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
      group: 'main',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'main',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      group: 'main',
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'main',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      group: 'main',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      group: 'main',
    }),

    // Relations — le programme auquel se rattache l'article. C'est ce champ qui
    // alimente la section « Articles liés » de la page programme : on le pose ici,
    // au moment d'écrire, plutôt que d'aller éditer le programme après coup.
    defineField({
      name: 'program',
      title: 'Programme',
      description: "Le programme ou projet dont cet article rend compte. L'article apparaîtra automatiquement sur la page de ce programme.",
      type: 'reference',
      to: [{type: 'program'}],
      group: 'relations',
    }),

    // Référencement — sans ces champs, chaque article hérite du titre et de la
    // description du layout racine, identiques pour tout le site.
    defineField({
      name: 'metaTitle',
      title: 'Titre pour les moteurs de recherche',
      description: 'Environ 60 caractères. Si vide, le titre de l\'article est utilisé.',
      type: 'string',
      validation: (rule) => rule.max(70).warning('Au-delà de 70 caractères, Google tronque le titre.'),
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description pour les moteurs de recherche',
      description: 'Environ 155 caractères. Si vide, l\'accroche (excerpt) est utilisée.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(180).warning('Au-delà de 180 caractères, Google tronque la description.'),
      group: 'seo',
    }),
    defineField({
      name: 'keywords',
      title: 'Mots-clés',
      description: 'Les requêtes que cet article vise. Sert de repère éditorial et alimente les métadonnées.',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'seo',
    }),
    defineField({
      name: 'noIndex',
      title: 'Exclure des moteurs de recherche',
      description: 'À cocher uniquement pour un article que vous ne voulez pas voir indexé.',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),
  ],
})
