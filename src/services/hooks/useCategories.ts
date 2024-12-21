// services/hooks/useTaxes.ts
import { useQuery } from 'react-query';
import { api } from '../api';
import { HandleError } from '@/error/HandlerError';

export async function syncMenuCategories(franquiaId: number) {
  try {
    await api.post(`/SquareMenuCategory/fetch-categories/${franquiaId}`);
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export async function getSquareCategories() {
  try {
    const { data } = await api.get(
      '/SquareMenuCategory/menu-categories-with-restaurants/1'
    );
    return data;
  } catch (error) {
    console.log();
  }
}

export function useSquareCategories() {
  return useQuery(['SquareTaxes'], () => getSquareCategories(), {
    staleTime: 1000 * 5,
  });
}
