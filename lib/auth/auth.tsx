import { supabase } from '../supabase/client';
import { logger } from '../logger';
import { Session, User } from '@supabase/supabase-js';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Helper to check if a user needs to go through the onboarding flow
const checkIfUserNeedsOnboarding = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      logger.error('Error checking user profile', error);
      return false; // Fail safely
    }
    
    // If no profile exists or name is not set, user needs onboarding
    return !data || !data.name;
  } catch (error) {
    logger.error('Unexpected error checking user profile', error);
    return false;
  }
};

// Navigate user after successful authentication
const navigateAfterAuth = async (user: User, router: AppRouterInstance) => {
  const needsOnboarding = await checkIfUserNeedsOnboarding(user.id);
  
  if (needsOnboarding) {
    logger.info('New user detected, navigating to onboarding.', { userId: user.id });
    router.replace('/onboarding/01-greeting-screen');
  } else {
    logger.info('Existing user, navigating to main app.', { userId: user.id });
    router.replace('/main');
  }
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

export const signInWithApple = async (router: AppRouterInstance) => {
  logger.info('Attempting Apple signin');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  // The navigation will happen after Supabase redirects back to the app
  if (error) {
    logger.error('Apple signin failed to initiate', error);
  }
  
  return { data, error };
};

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