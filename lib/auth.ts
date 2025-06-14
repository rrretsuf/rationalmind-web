import { supabase } from './supabase/client';
import { logger } from './logger';
import { AuthError, Session, User } from '@supabase/supabase-js';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Navigate user after successful authentication - directly to main
const navigateAfterAuth = async (user: User, router: AppRouterInstance) => {
  logger.info('User authenticated successfully, navigating to main.', { userId: user.id });
  router.replace('/main');
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  router: AppRouterInstance
) => {
  logger.info('Attempting email signup', { email });
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    logger.error('Email signup failed', error);
    return { data, error };
  }

  if (data.user) {
    await navigateAfterAuth(data.user, router);
  }
  
  return { data, error };
};

export const signInWithEmail = async (
  email: string,
  password: string,
  router: AppRouterInstance
) => {
  logger.info('Attempting email signin', { email });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    logger.error('Email signin failed', error);
    return { data, error };
  }
  
  if (data.user) {
    await navigateAfterAuth(data.user, router);
  }
  
  return { data, error };
};

// Apple sign-in removed - email/password only authentication

export const signOut = async (router: AppRouterInstance) => {
  logger.info('Attempting signout');
  const { error } = await supabase.auth.signOut();
  if (error) {
    logger.error('Signout failed', error);
  } else {
    router.replace('/'); // Redirect to home page on sign out
  }
  return { error };
};

export const getSession = async (): Promise<{ session: Session | null }> => {
  const { data: { session } } = await supabase.auth.getSession();
  return { session };
}; 