import { MetadataRoute } from 'next';
import { APP_URL } from './utils/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${APP_URL}/reservation`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${APP_URL}/abonnements`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${APP_URL}/historique`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
  ];

  return routes;
}
