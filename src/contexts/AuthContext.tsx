"use client";

import type { UserProfile } from '@/types';
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { mockUser } from '@/lib/mock-data'; // For demo purposes

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>; // Simulate API call
  logout: () => void;
  register: (email: string, pass: string, name?: string) => Promise<void>; // Simulate API call
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // To handle initial auth check

  useEffect(() => {
    // Simulate checking for an existing session (e.g., from localStorage or a cookie)
    const checkSession = () => {
      try {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse auth user from localStorage", error);
        localStorage.removeItem('authUser');
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === 'test@example.com' && pass === 'password') {
      const loggedInUser = { ...mockUser, email }; // Use mockUser as a base
      setUser(loggedInUser);
      localStorage.setItem('authUser', JSON.stringify(loggedInUser));
    } else {
      throw new Error('Invalid credentials');
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    // Optionally, redirect to login page or homepage
  };

  const register = async (email: string, pass: string, name?: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: UserProfile = { 
        id: `user-${Date.now()}`, 
        email, 
        name: name || `User ${Date.now().toString().slice(-4)}`,
        // Other fields can be empty or have defaults
    };
    setUser(newUser);
    localStorage.setItem('authUser', JSON.stringify(newUser));
    setLoading(false);
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) throw new Error("User not authenticated");
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
