// src/context/ThemeContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { getClientConfig } from '@/features/whitelabel';

interface ThemeConfig {
  logo: string;
  mainColor: string;
  font: string;
  textGray: string;
  inputColor: string;
  inputBorderColor: string;
}

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: ThemeConfig;
};

const defaultTheme: ThemeConfig = {
  logo: '/assets/logo/logo_default.png',
  mainColor: '#000000',
  font: "'Poppins', sans-serif",
  textGray: '#666666',
  inputColor: '#000000',
  inputBorderColor: '#cccccc',
};

const ThemeContext = createContext<ThemeContextType>({ theme: defaultTheme });

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = getClientConfig() || defaultTheme;
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
