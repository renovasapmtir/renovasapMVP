'use client';

import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './utils/createEmotionCache';
import { ReactNode, useState } from 'react';
import theme from './styles/theme';
import { AuthProvider } from './auth/AuthContext';
import { NotificationProvider } from './components/Notifications';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorBoundary from './components/ErrorBoundary';
import { useServerInsertedHTML } from 'next/navigation';

export function Providers({ children }: { children: ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createEmotionCache();
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <ErrorBoundary>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NotificationProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
}
