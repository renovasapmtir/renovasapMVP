import { MetadataRoute } from 'next';
import { APP_NAME, APP_DESCRIPTION } from './utils/metadata';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: "Rénov'ASAP",
    description: APP_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1976d2',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    orientation: 'portrait',
    categories: ['business', 'services', 'utilities'],
    screenshots: [
      {
        src: '/screenshots/home.jpg',
        sizes: '1170x2532',
        type: 'image/jpeg',
        label: 'Page d\'accueil',
      },
      {
        src: '/screenshots/reservation.jpg',
        sizes: '1170x2532',
        type: 'image/jpeg',
        label: 'Réservation de service',
      },
    ],
    prefer_related_applications: false,
    shortcuts: [
      {
        name: 'Nouvelle réservation',
        url: '/reservation',
        description: 'Réserver un service',
      },
      {
        name: 'Mon historique',
        url: '/historique',
        description: 'Voir mes réservations',
      },
    ],
  };
}
