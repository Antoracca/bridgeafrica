import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pont Afrique Sante',
    short_name: 'PontAfriqueSante',
    description: 'Votre pont vers les meilleurs soins medicaux en Afrique et dans le monde',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0284C7',
    icons: [
      {
        src: '/FaviconFinal.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/FaviconFinal.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
