import {defineField, defineType} from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Ressource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brève description de la ressource',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Image mise en avant',
      type: 'image',
      description: 'Image affichée sur la page des ressources',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          description: 'Description de l\'image pour l\'accessibilité',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Publications', value: 'Publications' },
          { title: 'Rapports', value: 'Rapports' },
          { title: 'Guides', value: 'Guides' },
          { title: 'Outils', value: 'Outils' },
          { title: 'Vidéos', value: 'Vidéos' },
          { title: 'Formations', value: 'Formations' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type de ressource',
      type: 'string',
      options: {
        list: [
          { title: 'PDF', value: 'pdf' },
          { title: 'Texte', value: 'text' },
          { title: 'Lien externe', value: 'link' },
          { title: 'Vidéo', value: 'video' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'Fichier PDF',
      type: 'file',
      description: 'Téléchargez le fichier PDF de la ressource',
      options: {
        accept: 'application/pdf',
      },
      hidden: ({ parent }) => parent?.type !== 'pdf',
    }),
    defineField({
      name: 'content',
      title: 'Contenu texte',
      type: 'array',
      description: 'Contenu riche de la ressource (si applicable)',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre', value: 'h2' },
            { title: 'Sous-titre', value: 'h3' },
            { title: 'Citation', value: 'blockquote' },
          ],
          lists: [
            { title: 'Liste à puces', value: 'bullet' },
            { title: 'Liste numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
            annotations: [
              {
                title: 'Lien',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      hidden: ({ parent }) => parent?.type === 'pdf' || parent?.type === 'link',
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL externe',
      type: 'url',
      description: 'Lien vers la ressource externe (si applicable)',
      hidden: ({ parent }) => parent?.type !== 'link',
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL de la vidéo',
      type: 'url',
      description: 'Lien vers la vidéo (YouTube, Vimeo, etc.)',
      hidden: ({ parent }) => parent?.type !== 'video',
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      description: 'Auteur ou source de la ressource',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant',
      type: 'boolean',
      description: 'Afficher cette ressource en vedette',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Mots-clés',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Mots-clés pour faciliter la recherche',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      type: 'type',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, category, type, publishedAt } = selection
      return {
        title: title,
        subtitle: `${category} • ${type} • ${new Date(publishedAt).toLocaleDateString('fr-FR')}`,
      }
    },
  },
})
