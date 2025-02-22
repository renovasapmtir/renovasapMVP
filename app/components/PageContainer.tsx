'use client';

import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { APP_NAME } from '../utils/metadata';

interface PageContainerProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function generateMetadata({ title, description }: PageContainerProps) {
  return {
    title: `${title} | ${APP_NAME}`,
    description: description || `${APP_NAME} - Services de rénovation et bricolage`,
    openGraph: {
      title: `${title} | ${APP_NAME}`,
      description: description || `${APP_NAME} - Services de rénovation et bricolage`,
    },
    twitter: {
      title: `${title} | ${APP_NAME}`,
      description: description || `${APP_NAME} - Services de rénovation et bricolage`,
    },
  };
}

export default function PageContainer({ children, title, description }: PageContainerProps) {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2, mb: 8 }}>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2rem' }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
