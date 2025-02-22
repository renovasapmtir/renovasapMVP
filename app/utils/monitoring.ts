type LogLevel = 'info' | 'warn' | 'error' | 'debug';
type LogContext = Record<string, any>;

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
}

class MonitoringService {
  private static instance: MonitoringService;
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  // Performance metrics
  private metrics: {
    [key: string]: {
      count: number;
      totalDuration: number;
      lastDuration: number;
    };
  } = {};

  private constructor() {
    // Initialize error handling
    if (typeof window !== 'undefined') {
      window.onerror = (msg, url, line, col, error) => {
        this.logError('Uncaught error', error as Error, { url, line, col });
      };

      window.onunhandledrejection = (event) => {
        this.logError('Unhandled promise rejection', event.reason);
      };
    }
  }

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };

    this.logs.unshift(entry);

    // Keep logs under the maximum size
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // In development, also log to console
    if (process.env.NODE_ENV === 'development') {
      console[level](message, context || '');
    }

    // TODO: In production, send to monitoring service (e.g., Sentry)
  }

  logInfo(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  logWarn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  logError(message: string, error: Error, context?: LogContext) {
    this.log('error', message, {
      ...context,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
    });
  }

  logDebug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, context);
    }
  }

  // Performance monitoring
  startTimer(operationName: string) {
    return {
      end: () => {
        if (!this.metrics[operationName]) {
          this.metrics[operationName] = {
            count: 0,
            totalDuration: 0,
            lastDuration: 0,
          };
        }

        const duration = performance.now();
        this.metrics[operationName].count++;
        this.metrics[operationName].totalDuration += duration;
        this.metrics[operationName].lastDuration = duration;

        this.logDebug(`Operation ${operationName} completed`, {
          duration,
          metrics: this.metrics[operationName],
        });
      },
    };
  }

  // Get performance metrics
  getMetrics() {
    return Object.entries(this.metrics).reduce((acc, [key, value]) => {
      acc[key] = {
        ...value,
        averageDuration: value.totalDuration / value.count,
      };
      return acc;
    }, {} as Record<string, any>);
  }

  // Get recent logs
  getLogs(level?: LogLevel, limit = 100) {
    return this.logs
      .filter((log) => !level || log.level === level)
      .slice(0, limit);
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
  }
}

export const monitoring = MonitoringService.getInstance();

// Usage example:
// const timer = monitoring.startTimer('operation-name');
// ... do something ...
// timer.end();
//
// monitoring.logInfo('Something happened', { userId: '123' });
// monitoring.logError('Operation failed', error, { operationId: '456' });
