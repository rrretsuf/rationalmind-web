'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '../supabase/client';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let hasInitialized = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        if (!hasInitialized) {
          setInitialized(true);
          hasInitialized = true;
        }
      }
    );

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!hasInitialized) {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        setInitialized(true);
        hasInitialized = true;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, initialized, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};