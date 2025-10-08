import {defineField, defineType} from 'sanity'

export const careerType = defineType({
  name: 'career',
  title: 'Opportunité d\'emploi',
  type: 'document',
  groups: [
    {name: 'main', title: 'Informations principales', default: true},
    {name: 'details', title: 'Détails du poste'},
    {name: 'requirements', title: 'Exigences'},
    {name: 'media', title: 'Médias'},
  ],
  fields: [
    // Informations principales
    defineField({
      name: 'title',
      title: 'Titre du poste',
      type: 'string',
      description: 'Ex: Chargé(e) de Programme',
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^\w\s-]/g, '') // Remove special chars
            .trim()
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Ex: OFFRE D\'EMPLOI',
      initialValue: 'OFFRE D\'EMPLOI',
      group: 'main',
    }),
    defineField({
      name: 'description',
      title: 'Description du poste',
      type: 'text',
      rows: 5,
      description: 'Description générale du poste et du contexte',
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'deadline',
      title: 'Date limite de candidature',
      type: 'date',
      description: 'Date limite pour postuler',
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          {title: 'Ouvert', value: 'open'},
          {title: 'Fermé', value: 'closed'},
          {title: 'Brouillon', value: 'draft'},
        ],
      },
      initialValue: 'open',
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant',
      type: 'boolean',
      description: 'Afficher cette opportunité en vedette',
      initialValue: false,
      group: 'main',
    }),

    // Détails du poste
    defineField({
      name: 'type',
      title: 'Type de contrat',
      type: 'string',
      options: {
        list: [
          {title: 'CDI', value: 'CDI'},
          {title: 'CDD', value: 'CDD'},
          {title: 'Stage', value: 'Stage'},
          {title: 'Bénévolat', value: 'Bénévolat'},
          {title: 'Consultation', value: 'Consultation'},
        ],
      },
      validation: (rule) => rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'domain',
      title: 'Domaine',
      type: 'string',
      options: {
        list: [
          {title: 'Gestion de projet', value: 'Gestion de projet'},
          {title: 'Communication', value: 'Communication'},
          {title: 'Administration', value: 'Administration'},
          {title: 'Plaidoyer', value: 'Plaidoyer'},
          {title: 'Finance', value: 'Finance'},
          {title: 'Ressources humaines', value: 'Ressources humaines'},
          {title: 'Suivi & Évaluation', value: 'Suivi & Évaluation'},
          {title: 'Autre', value: 'Autre'},
        ],
      },
      validation: (rule) => rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
      description: 'Ex: Dakar, Sénégal',
      initialValue: 'Dakar, Sénégal',
      group: 'details',
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Ex: Temps plein, 6 mois, 12 mois renouvelable',
      group: 'details',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsabilités',
      type: 'array',
      of: [{type: 'text', rows: 2}],
      description: 'Liste des responsabilités principales du poste',
      validation: (rule) => rule.required().min(1),
      group: 'details',
    }),
    defineField({
      name: 'termsOfReferencePdf',
      title: 'Termes de référence (PDF)',
      type: 'file',
      description: 'Document PDF des termes de référence de l\'offre (affiché après la description)',
      options: {
        accept: 'application/pdf',
      },
      group: 'details',
    }),

    // Exigences
    defineField({
      name: 'qualifications',
      title: 'Qualifications requises',
      type: 'array',
      of: [{type: 'text', rows: 2}],
      description: 'Liste des qualifications et compétences requises',
      validation: (rule) => rule.required().min(1),
      group: 'requirements',
    }),
    defineField({
      name: 'advantages',
      title: 'Avantages',
      type: 'array',
      of: [{type: 'text', rows: 2}],
      description: 'Ce que nous offrons (salaire, avantages, etc.)',
      group: 'requirements',
    }),
    defineField({
      name: 'applicationEmail',
      title: 'Email de candidature',
      type: 'string',
      description: 'Email où envoyer les candidatures',
      initialValue: 'recrutement@jgen-senegal.org',
      validation: (rule) => rule.email(),
      group: 'requirements',
    }),
    defineField({
      name: 'applicationInstructions',
      title: 'Instructions de candidature',
      type: 'text',
      rows: 3,
      description: 'Instructions spécifiques pour postuler',
      group: 'requirements',
    }),

    // Médias
    defineField({
      name: 'featuredImage',
      title: 'Image mise en avant',
      type: 'image',
      description: 'Image affichée sur la page de liste des opportunités',
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
      group: 'media',
    }),
    defineField({
      name: 'heroImage',
      title: 'Image hero',
      type: 'image',
      description: 'Grande image affichée en haut de la page de détail',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        }),
      ],
      group: 'media',
    }),
    defineField({
      name: 'pdfFile',
      title: 'Fiche de poste (PDF)',
      type: 'file',
      description: 'Fichier PDF de la fiche de poste complète (optionnel)',
      options: {
        accept: 'application/pdf',
      },
      group: 'media',
    }),
    defineField({
      name: 'additionalContent',
      title: 'Contenu additionnel',
      type: 'array',
      description: 'Contenu riche supplémentaire (optionnel)',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Légende',
            },
          ],
        },
      ],
      group: 'media',
    }),

    // Métadonnées
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'tags',
      title: 'Mots-clés',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Mots-clés pour faciliter la recherche',
      group: 'main',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'featuredImage',
      status: 'status',
      deadline: 'deadline',
    },
    prepare(selection) {
      const {title, subtitle, media, status, deadline} = selection
      const statusEmoji = status === 'open' ? '🟢' : status === 'closed' ? '🔴' : '⚪'
      const deadlineFormatted = deadline
        ? new Date(deadline).toLocaleDateString('fr-FR')
        : 'Non définie'
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `${subtitle} • Deadline: ${deadlineFormatted}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date de publication, plus récent',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Date limite, plus proche',
      name: 'deadlineAsc',
      by: [{field: 'deadline', direction: 'asc'}],
    },
    {
      title: 'Titre A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
