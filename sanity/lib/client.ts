import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use fresh data during development; enable CDN in production for speed
  useCdn: process.env.NODE_ENV === 'production',
})
