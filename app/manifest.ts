import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'J-GEN SENEGAL',
    short_name: 'J-GEN',
    description: 'Organisation féministe luttant contre les violences basées sur le genre au Sénégal',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#c61d4d',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'fr',
    categories: ['social', 'activism', 'education'],
    icons: [
      {
        src: '/logo-jgen.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/logo-jgen.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      },
    ],
    screenshots: [
      {
        src: '/screenshot-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow'
      },
      {
        src: '/screenshot-desktop.png',
        sizes: '1920x1080',
        type: 'image/png',
        form_factor: 'wide'
      }
    ]
  }
}
