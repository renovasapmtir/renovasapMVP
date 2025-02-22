'use client';

import { useEffect, useCallback } from 'react';
import { monitoring } from '../utils/monitoring';

export interface MonitoringOptions {
  componentName: string;
  trackMounts?: boolean;
  trackErrors?: boolean;
  trackPerformance?: boolean;
}

export function useMonitoring({
  componentName,
  trackMounts = true,
  trackErrors = true,
  trackPerformance = true,
}: MonitoringOptions) {
  // Track component mounts and unmounts
  useEffect(() => {
    if (trackMounts) {
      monitoring.logDebug(`Component mounted: ${componentName}`);
      return () => {
        monitoring.logDebug(`Component unmounted: ${componentName}`);
      };
    }
  }, [componentName, trackMounts]);

  // Error tracking
  const trackError = useCallback((error: Error, context?: Record<string, any>) => {
    if (trackErrors) {
      monitoring.logError(`Error in ${componentName}`, error, {
        componentName,
        ...context,
      });
    }
  }, [componentName, trackErrors]);

  // Performance tracking
  const trackOperation = useCallback((operationName: string) => {
    if (trackPerformance) {
      const fullOperationName = `${componentName}:${operationName}`;
      const timer = monitoring.startTimer(fullOperationName);
      return timer;
    }
    return { end: () => {} };
  }, [componentName, trackPerformance]);

  // Wrap async operations with error and performance tracking
  const wrapAsync = useCallback(async <T>(
    operationName: string,
    operation: () => Promise<T>,
    context?: Record<string, any>
  ): Promise<T> => {
    const timer = trackOperation(operationName);
    try {
      const result = await operation();
      timer.end();
      return result;
    } catch (error) {
      trackError(error as Error, {
        operationName,
        ...context,
      });
      throw error;
    }
  }, [trackOperation, trackError]);

  return {
    trackError,
    trackOperation,
    wrapAsync,
  };
}

// Usage example:
/*
function MyComponent() {
  const { trackError, trackOperation, wrapAsync } = useMonitoring({
    componentName: 'MyComponent',
  });

  const handleClick = async () => {
    try {
      await wrapAsync('handleClick', async () => {
        // Your async operation here
      });
    } catch (error) {
      // Handle error
    }
  };

  const handleOperation = () => {
    const timer = trackOperation('someOperation');
    // Do something
    timer.end();
  };

  return <div>...</div>;
}
*/
