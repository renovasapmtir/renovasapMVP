export const APP_NAME = "Rénov'ASAP";
export const APP_DESCRIPTION = "Services de rénovation et bricolage à la demande";
export const APP_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const SITE_METADATA = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'rénovation',
    'bricolage',
    'plomberie',
    'électricité',
    'ménage',
    'services',
    'intervention rapide',
    'dépannage',
  ],
  authors: [{ name: "Rénov'ASAP", url: APP_URL }],
  creator: "Rénov'ASAP",
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: APP_URL,
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/og-image.jpg`],
    creator: '@renovasap',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: APP_URL,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const PAGE_METADATA = {
  home: {
    title: "Accueil",
    description: "Réservez rapidement des services de rénovation et bricolage",
  },
  profile: {
    title: "Mon Profil",
    description: "Gérez vos informations personnelles et préférences",
  },
  reservation: {
    title: "Réserver",
    description: "Réservez une intervention de plomberie, électricité, bricolage ou ménage",
  },
  historique: {
    title: "Historique",
    description: "Consultez l'historique de vos interventions",
  },
  abonnements: {
    title: "Abonnements",
    description: "Découvrez nos formules d'abonnement pour des services réguliers",
  },
};
