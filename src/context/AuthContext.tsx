import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Profile, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  demoLogin: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_PROFILES: Record<UserRole, Profile> = {
  client: {
    id: 'demo-client-user-id-12345',
    full_name: 'Maharani Gayatri Devi',
    phone: '+91 98260 12345',
    role: 'client',
    created_at: new Date().toISOString(),
  },
  admin: {
    id: 'demo-admin-user-id-99999',
    full_name: 'Salon Director (Indore GM)',
    phone: '+91 731 405 8888',
    role: 'admin',
    created_at: new Date().toISOString(),
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check initial active session or demo session
  useEffect(() => {
    async function initSession() {
      try {
        // Check local demo profile first
        const savedDemo = localStorage.getItem('hm_luxury_demo_user');
        if (savedDemo) {
          const parsed = JSON.parse(savedDemo) as Profile;
          setProfile(parsed);
          setUser({
            id: parsed.id,
            email: parsed.role === 'admin' ? 'director@hairmasters.in' : 'client@hairmasters.in',
            app_metadata: {},
            user_metadata: { full_name: parsed.full_name, phone: parsed.phone, role: parsed.role },
            aud: 'authenticated',
            created_at: parsed.created_at,
          } as User);
          setLoading(false);
          return;
        }

        // Live Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id, session.user);
        }
      } catch (err) {
        console.warn('Auth session check notice:', err);
      } finally {
        setLoading(false);
      }
    }

    initSession();

    // Listen to Supabase Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        await fetchProfile(newSession.user.id, newSession.user);
      } else {
        const savedDemo = localStorage.getItem('hm_luxury_demo_user');
        if (!savedDemo) {
          setProfile(null);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string, authUser?: User) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) {
        // Fallback profile built from user metadata
        const fallbackProfile: Profile = {
          id: userId,
          full_name: authUser?.user_metadata?.full_name || authUser?.email?.split('@')[0] || 'Esteemed Guest',
          phone: authUser?.user_metadata?.phone || '',
          role: (authUser?.user_metadata?.role as UserRole) || 'client',
          created_at: authUser?.created_at || new Date().toISOString(),
        };
        setProfile(fallbackProfile);
        return;
      }

      setProfile(data as Profile);
    } catch {
      setProfile({
        id: userId,
        full_name: authUser?.email?.split('@')[0] || 'Esteemed Guest',
        phone: '',
        role: 'client',
        created_at: new Date().toISOString(),
      });
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    localStorage.removeItem('hm_luxury_demo_user');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ? new Error(error.message) : null };
    } catch (err: any) {
      return { error: new Error(err.message || 'Login failed') };
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string, phone: string) => {
    localStorage.removeItem('hm_luxury_demo_user');
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
            role: 'client',
          },
        },
      });
      return { error: error ? new Error(error.message) : null };
    } catch (err: any) {
      return { error: new Error(err.message || 'Signup failed') };
    }
  };

  const signInWithGoogle = async () => {
    localStorage.removeItem('hm_luxury_demo_user');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      return { error: error ? new Error(error.message) : null };
    } catch (err: any) {
      return { error: new Error(err.message || 'Google Auth failed') };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('hm_luxury_demo_user');
    setUser(null);
    setProfile(null);
    setSession(null);
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Sign out error:', e);
    }
  };

  const demoLogin = (role: UserRole) => {
    const demoUser = DEMO_PROFILES[role];
    localStorage.setItem('hm_luxury_demo_user', JSON.stringify(demoUser));
    setProfile(demoUser);
    setUser({
      id: demoUser.id,
      email: role === 'admin' ? 'director@hairmasters.in' : 'client@hairmasters.in',
      app_metadata: {},
      user_metadata: { full_name: demoUser.full_name, phone: demoUser.phone, role: demoUser.role },
      aud: 'authenticated',
      created_at: demoUser.created_at,
    } as User);
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isAdmin,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
