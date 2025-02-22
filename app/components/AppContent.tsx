'use client';

import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Navigation from './Navigation';
import LoginButton from './LoginButton';
import { ReactNode } from 'react';

export default function AppContent({ children }: { children: ReactNode }) {
  return (
    <Box component="div" display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rénov&apos;ASAP
          </Typography>
          <LoginButton />
        </Toolbar>
      </AppBar>
      <Navigation />
      <Container component="main" sx={{ mt: 4, flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
}
