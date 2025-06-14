import * as Sentry from '@sentry/nextjs';

const isDebugMode = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_DEBUG === 'true';

export const logger = {
  debug: (message: string, extra?: Record<string, any>) => {
    if (isDebugMode) {
      console.debug(`[DEBUG] ${message}`, extra || '');
    }
    // Always add breadcrumb regardless of environment
    Sentry.addBreadcrumb({
      category: 'debug',
      message,
      level: 'debug',
      data: extra || {},
    });
  },

  info: (message: string, extra?: Record<string, any>) => {
    if (isDebugMode) {
      console.info(`[INFO] ${message}`, extra || '');
    }
    Sentry.addBreadcrumb({
      category: 'info',
      message,
      level: 'info',
      data: extra || {},
    });
  },

  warn: (message: string, extra?: Record<string, any>) => {
    if (isDebugMode) {
      console.warn(`[WARN] ${message}`, extra || '');
    }
    Sentry.addBreadcrumb({
      category: 'warning',
      message,
      level: 'warning',
      data: extra || {},
    });
  },

  error: (message: string, error?: any, extra: Record<string, any> = {}) => {
    const errorContext = { ...extra, message };

    if (isDebugMode) {
      console.error(`[ERROR] ${message}`, { error, ...extra });
    }

    if (error instanceof Error) {
      Sentry.captureException(error, {
        extra: errorContext,
        level: 'error',
      });
    } else {
      // Try to create a synthetic error for better grouping
      try {
        throw new Error(message);
      } catch (syntheticError: any) {
        Sentry.captureException(syntheticError, {
          extra: { ...errorContext, originalError: error },
          level: 'error',
        });
      }
    }
  },
}; 