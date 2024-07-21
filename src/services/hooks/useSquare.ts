// src/hooks/useSquare.ts
import { useQuery } from 'react-query';
import { api } from '../api';
import { HandleError } from '@/error/HandlerError';

export interface SquareData {
  nome: string;
  prodToken: string;
  prodApplication: string;
  sandBoxToken: string;
  sandboxApplication: string;
  timezone: string;
  webhook: string;
}

export async function createSquare(square: SquareData) {
  try {
    const { data } = await api.post('/Franqueado', square);
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export async function getSquare() {
  try {
    const { data } = await api.get('/Franqueado');
    return data;
  } catch (error) {
    console.log();
  }
}

export function useSquare() {
  return useQuery(['All_admins'], () => getSquare(), {
    staleTime: 1000 * 5,
  });
}
