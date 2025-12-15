import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Disable CDN to always get fresh data
  // Set to true in production if you want faster responses (with 60s delay for updates)
  useCdn: false,
})
