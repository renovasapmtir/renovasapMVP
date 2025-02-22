'use client';

import { useState } from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

interface LoadingOverlayProps {
  open: boolean;
  message?: string;
}

export default function LoadingOverlay({ open, message }: LoadingOverlayProps) {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
      {message && (
        <Typography variant="h6" component="div">
          {message}
        </Typography>
      )}
    </Backdrop>
  );
}

export function useLoading(defaultMessage: string = 'Chargement en cours...') {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  const showLoading = (msg?: string) => {
    setMessage(msg || defaultMessage);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const LoadingComponent = () => (
    <LoadingOverlay open={loading} message={message} />
  );

  return {
    loading,
    showLoading,
    hideLoading,
    LoadingComponent,
  };
}
