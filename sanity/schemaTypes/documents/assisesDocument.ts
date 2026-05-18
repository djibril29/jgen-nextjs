import { defineField, defineType } from 'sanity'

export const assisesDocumentType = defineType({
  name: 'assisesDocument',
  title: 'Document des Assises',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Nom du document (ex: « Termes de référence des Assises »)',
      validation: (rule) => rule.required().min(3).max(140),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brève description du document affichée sur la page /assises',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'TDRs (Termes de référence)', value: 'TDRs' },
          { title: 'Feuille de route', value: 'Feuille de route' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'Fichier PDF',
      type: 'file',
      description: 'Téléversez le fichier PDF du document',
      options: {
        accept: 'application/pdf',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      description: 'Sert également à ordonner les documents (les plus récents en premier)',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Date de publication (récent → ancien)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, category, publishedAt } = selection as {
        title: string
        category?: string
        publishedAt?: string
      }
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('fr-FR')
        : 'Date inconnue'
      return {
        title,
        subtitle: `${category ?? 'Sans catégorie'} • ${date}`,
      }
    },
  },
})
