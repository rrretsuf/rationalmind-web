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

  error: (
    messageOrOptions: string | { message: string; error?: Error; extra?: Record<string, any> },
    error?: Error,
    extra: Record<string, any> = {}
  ) => {
    let message: string;
    let actualError: Error | undefined;
    let actualExtra: Record<string, any>;

    // Handle object parameter for unambiguous usage
    if (typeof messageOrOptions === 'object') {
      message = messageOrOptions.message;
      actualError = messageOrOptions.error;
      actualExtra = messageOrOptions.extra || {};
    } else {
      // Handle traditional parameters - error must be Error type or undefined
      message = messageOrOptions;
      actualError = error;
      actualExtra = extra;
    }

    const errorContext = { ...actualExtra, message };

    if (isDebugMode) {
      console.error(`[ERROR] ${message}`, { error: actualError, ...actualExtra });
    }

    if (actualError instanceof Error) {
      Sentry.captureException(actualError, {
        extra: errorContext,
        level: 'error',
      });
    } else {
      // Create a synthetic error for better grouping when no Error object is provided
      try {
        throw new Error(message);
      } catch (syntheticError: any) {
        Sentry.captureException(syntheticError, {
          extra: { ...errorContext, originalError: actualError },
          level: 'error',
        });
      }
    }
  },
}; 