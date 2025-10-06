import { useState, useEffect } from 'react'

interface Resource {
  _id: string
  title: string
  slug: string
  description?: string
  category: string
  type: 'pdf' | 'text' | 'link' | 'video'
  featuredImage?: any
  pdfFile?: any
  content?: any
  externalUrl?: string
  videoUrl?: string
  author?: string
  publishedAt: string
  featured: boolean
  tags?: string[]
}

interface UseResourcesOptions {
  category?: string
  featured?: boolean
  limit?: number
}

export function useResources(options: UseResourcesOptions = {}) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (options.category && options.category !== 'Tous') {
          params.append('category', options.category)
        }
        if (options.featured) {
          params.append('featured', 'true')
        }
        if (options.limit) {
          params.append('limit', options.limit.toString())
        }

        const response = await fetch(`/api/resources?${params}`)
        const data = await response.json()

        if (data.success) {
          setResources(data.data)
        } else {
          setError(data.error || 'Failed to fetch resources')
        }
      } catch (err) {
        setError('Failed to fetch resources')
        console.error('Error fetching resources:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [options.category, options.featured, options.limit])

  return { resources, loading, error }
}
