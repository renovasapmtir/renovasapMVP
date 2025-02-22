'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: Log error to error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 2
        }}>
          <Paper sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
            <Typography variant="h5" component="h1" gutterBottom color="error">
              Oups ! Une erreur est survenue
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Nous sommes désolés, mais quelque chose s&apos;est mal passé.
              Veuillez réessayer ou contacter le support si le problème persiste.
            </Typography>
            {this.state.error && (
              <Typography 
                variant="body2" 
                component="pre" 
                sx={{ 
                  mt: 2,
                  p: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  overflow: 'auto'
                }}
              >
                {this.state.error.message}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={this.handleRetry}
              sx={{ mt: 3 }}
            >
              Réessayer
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}
