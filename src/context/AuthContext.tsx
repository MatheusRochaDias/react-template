// src/context/AuthContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/api';
import { SignInRequestData } from '@/types/auth';
import { signInRequest } from '@/services/hooks/useAuth';
import { clearLocalStorage } from '@/utils/localStorageFormat';

type Component = {
  children: ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInRequestData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Component) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function signOut() {
    destroyCookie(null, '@food_token', { path: '/' });
    clearLocalStorage();
    setIsAuthenticated(false);
    Router.push('/login');
  }

  // async function signIn(credentials: SignInRequestData) {
  //   try {
  //     const { token } = await signInRequest(credentials);
  //     setCookie(undefined, '@food_token', token, {
  //       maxAge: 60 * 60 * 24, // 24 horas
  //       path: '/',
  //     });

  //     if (token) {
  //       api.defaults.headers.common.Authorization = `Bearer ${token}`;
  //       setIsAuthenticated(true);
  //       Router.push(`/`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  async function signIn(credentials: SignInRequestData) {
    try {
      // Força a autenticação para testes
      setIsAuthenticated(true);
      let token = '123';
      setCookie(undefined, '@food_token', token, {
        maxAge: 60 * 60 * 24, // 24 horas
        path: '/',
      });
      console.log('Login bem-sucedido! Redirecionando...');
      Router.push(`/`); // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error; // Deixe o erro ser capturado na página de login
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
