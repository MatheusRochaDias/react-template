// services/hooks/useTaxes.ts
import { useQuery } from 'react-query';
import { api } from '../api';
import { HandleError } from '@/error/HandlerError';

export async function syncMenuTaxes(franquiaId: number) {
  try {
    await api.post(`/Square/fetch-taxes/${franquiaId}`);
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export async function getSquareTaxes() {
  try {
    const { data } = await api.get('/Square/menu-taxes-with-restaurants/1');
    return data;
  } catch (error) {
    console.log();
  }
}

export function useSquareTaxes() {
  return useQuery(['SquareTaxes'], () => getSquareTaxes(), {
    staleTime: 1000 * 5,
  });
}

export async function getTaxes() {
  try {
    const { data } = await api.get('/taxes');
    return data;
  } catch (error) {
    console.log();
  }
}

export function useTaxes() {
  return useQuery(['all_taxes'], () => getTaxes(), {
    staleTime: 1000 * 5,
  });
}
