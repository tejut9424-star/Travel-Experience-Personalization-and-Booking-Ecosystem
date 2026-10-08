import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<void>;
  register: (name: string, email: string, role?: UserRole) => Promise<void>;
  sendOtp: (identifier: string, purpose: 'login' | 'register' | 'booking') => Promise<{ success: boolean; demoOtp?: string; message: string }>;
  verifyOtp: (identifier: string, otp: string, purpose: 'login' | 'register' | 'booking') => Promise<{ success: boolean; message?: string; error?: string }>;
  loginWithOtp: (email: string, otp: string, role?: UserRole) => Promise<void>;
  registerWithOtp: (name: string, email: string, otp: string, role?: UserRole, phone?: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const defaultUser: User = {
  id: 'usr-traveler-01',
  name: 'Alex Vance',
  email: 'alex.vance@tripora.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  role: 'traveler',
  phone: '+1 (555) 382-9012',
  currency: 'USD',
  language: 'English',
  travelStyle: ['Cultural', 'Culinary', 'Scenic Nature'],
  createdAt: '2026-01-15T08:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tripora_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('tripora_jwt') || 'mock-jwt-token-tripora-2026';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('tripora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tripora_user');
    }
  }, [user]);

  // Send OTP
  const sendOtp = async (identifier: string, purpose: 'login' | 'register' | 'booking') => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identifier, purpose })
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, demoOtp: data.demoOtp, message: data.message };
      }
    } catch {
      // Fallback in-memory OTP simulation if backend is not currently running
    }
    const simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    return {
      success: true,
      demoOtp: simulatedOtp,
      message: `OTP sent successfully to ${identifier}`
    };
  };

  // Verify OTP
  const verifyOtp = async (identifier: string, otp: string, purpose: 'login' | 'register' | 'booking') => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identifier, otp, purpose })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return { success: true, message: data.message };
      }
      return { success: false, error: data.error || 'Invalid OTP code' };
    } catch {
      // Local fallback check
      if (otp && (otp.length === 6 || otp === '123456')) {
        return { success: true, message: 'OTP verified successfully' };
      }
      return { success: false, error: 'Invalid verification code' };
    }
  };

  const loginWithOtp = async (email: string, otp: string, role: UserRole = 'traveler') => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/login-with-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, role })
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('tripora_jwt', data.token);
        return;
      }
    } catch {
      // Fallback
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      currency: 'USD',
      language: 'English',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    const mockToken = `jwt-otp-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    setToken(mockToken);
    localStorage.setItem('tripora_jwt', mockToken);
  };

  const registerWithOtp = async (name: string, email: string, otp: string, role: UserRole = 'traveler', phone?: string) => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/register-with-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, otp, role, phone })
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('tripora_jwt', data.token);
        return;
      }
    } catch {
      // Fallback
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      currency: 'USD',
      language: 'English',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    const mockToken = `jwt-otp-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    setToken(mockToken);
    localStorage.setItem('tripora_jwt', mockToken);
  };

  const login = async (email: string, role: UserRole = 'traveler') => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      currency: 'USD',
      language: 'English',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    const mockToken = `jwt-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    setToken(mockToken);
    localStorage.setItem('tripora_jwt', mockToken);
  };

  const register = async (name: string, email: string, role: UserRole = 'traveler') => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      currency: 'USD',
      language: 'English',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    const mockToken = `jwt-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    setToken(mockToken);
    localStorage.setItem('tripora_jwt', mockToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tripora_user');
    localStorage.removeItem('tripora_jwt');
  };

  const switchRole = (newRole: UserRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        sendOtp,
        verifyOtp,
        loginWithOtp,
        registerWithOtp,
        logout,
        switchRole
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
