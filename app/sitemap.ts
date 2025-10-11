import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jgen.sn'

  // Pages statiques
  const routes = [
    '',
    '/about',
    '/about/careers',
    '/blog',
    '/programs',
    '/resources',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Articles de blog dynamiques
  try {
    const posts = await client.fetch(`
      *[_type=="post"]{
        "slug": slug.current,
        publishedAt
      }
    `)

    const postRoutes = posts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt || new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Programmes dynamiques
    const programs = await client.fetch(`
      *[_type=="program"]{
        "slug": slug.current,
        _updatedAt
      }
    `)

    const programRoutes = programs.map((program: any) => ({
      url: `${baseUrl}/programs/${program.slug}`,
      lastModified: program._updatedAt || new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Ressources dynamiques
    const resources = await client.fetch(`
      *[_type=="resource"]{
        "slug": slug.current,
        _updatedAt
      }
    `)

    const resourceRoutes = resources.map((resource: any) => ({
      url: `${baseUrl}/resources/${resource.slug}`,
      lastModified: resource._updatedAt || new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Carrières dynamiques
    const careers = await client.fetch(`
      *[_type=="career"]{
        "slug": slug.current,
        _updatedAt
      }
    `)

    const careerRoutes = careers.map((career: any) => ({
      url: `${baseUrl}/about/careers/${career.slug}`,
      lastModified: career._updatedAt || new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    // Interventions dynamiques
    const interventions = await client.fetch(`
      *[_type=="intervention"]{
        "slug": slug.current,
        _updatedAt
      }
    `)

    const interventionRoutes = interventions.map((intervention: any) => ({
      url: `${baseUrl}/interventions/${intervention.slug}`,
      lastModified: intervention._updatedAt || new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...routes, ...postRoutes, ...programRoutes, ...resourceRoutes, ...careerRoutes, ...interventionRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return routes
  }
}
