import {defineField, defineType} from 'sanity'

export const programType = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main Info', default: true },
    { name: 'details', title: 'Details' },
    { name: 'stats', title: 'Statistics & Impact' },
    { name: 'relations', title: 'Relations' },
  ],
  fields: [
    // Main Information
    defineField({ 
      name: 'title', 
      type: 'string', 
      validation: (rule) => rule.required(),
      group: 'main'
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
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .slice(0, 96)
      }, 
      validation: (rule) => rule.required(),
      group: 'main'
    }),
    defineField({ 
      name: 'summary', 
      title: 'Summary', 
      type: 'text', 
      rows: 3,
      group: 'main'
    }),
    defineField({ 
      name: 'content', 
      title: 'Description complète', 
      type: 'array', 
      of: [{type: 'block'}, {type: 'image'}],
      group: 'main'
    }),
    defineField({ 
      name: 'featuredImage', 
      title: 'Image principale',
      type: 'image', 
      options: {hotspot: true}, 
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
      group: 'main'
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie d\'images',
      type: 'array',
      description: 'Galerie de photos du programme',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          defineField({ 
            name: 'alt', 
            type: 'string', 
            title: 'Texte alternatif',
            description: 'Description de l\'image pour l\'accessibilité'
          }),
          defineField({ 
            name: 'caption', 
            type: 'string', 
            title: 'Légende',
            description: 'Légende affichée sous l\'image'
          }),
        ]
      }],
      group: 'main'
    }),

    // Details & Timeline
    defineField({ 
      name: 'executionPeriod', 
      title: "Période d'exécution",
      type: 'string',
      description: 'Ex: 2023 - 2025',
      group: 'details'
    }),
    defineField({ 
      name: 'beneficiaries', 
      title: 'Bénéficiaires',
      type: 'string',
      description: 'Ex: Femmes et filles du Sénégal',
      group: 'details'
    }),
    defineField({ 
      name: 'partners', 
      title: 'Partenaires',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', type: 'string', title: 'Nom du partenaire' }),
          defineField({ name: 'logo', type: 'image', title: 'Logo', options: {hotspot: true} }),
        ]
      }],
      group: 'details'
    }),
    defineField({ 
      name: 'category', 
      type: 'string', 
      options: { list: [
        { title: 'Education', value: 'education' },
        { title: 'Sensibilisation', value: 'awareness' },
        { title: 'Support Juridique', value: 'legal-support' },
        { title: 'Santé', value: 'health' },
        { title: 'Autonomisation Économique', value: 'economic-empowerment' },
      ]},
      group: 'details'
    }),
    defineField({ 
      name: 'location', 
      type: 'string',
      group: 'details'
    }),
    defineField({ 
      name: 'status', 
      type: 'string', 
      options: { list: [
        { title: 'À venir', value: 'upcoming' },
        { title: 'En cours', value: 'ongoing' },
        { title: 'Terminé', value: 'completed' },
      ]}, 
      initialValue: 'upcoming',
      group: 'details'
    }),

    // Statistics & Impact
    defineField({
      name: 'impactStats',
      title: "Statistiques d'impact",
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', type: 'string', title: 'Valeur', description: 'Ex: 5000+' }),
          defineField({ name: 'label', type: 'string', title: 'Description', description: 'Ex: Femmes autonomisées' }),
        ]
      }],
      group: 'stats'
    }),
    defineField({
      name: 'achievements',
      title: 'Réalisations',
      description: 'Liste des réalisations du programme',
      type: 'array',
      of: [{type: 'block'}],
      group: 'stats'
    }),
    defineField({
      name: 'nextSteps',
      title: 'Prochaines étapes',
      description: 'Les prochaines actions prévues',
      type: 'array',
      of: [{type: 'block'}],
      group: 'stats'
    }),
    defineField({
      name: 'partnersEngaged',
      title: 'Partenaires engagés',
      description: 'Nombre de partenaires engagés (ex: 10+)',
      type: 'string',
      group: 'stats'
    }),
    defineField({
      name: 'projectsCompleted',
      title: 'Projets réalisés',
      description: 'Nombre de projets réalisés (ex: 15+)',
      type: 'string',
      group: 'stats'
    }),

    // Relations
    defineField({
      name: 'relatedPosts',
      title: 'Articles liés',
      description: 'Articles de blog liés à ce programme',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      group: 'relations'
    }),
  ],
})
