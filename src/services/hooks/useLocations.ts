// src/hooks/useSquare.ts
import { useQuery } from 'react-query';
import { api } from '../api';
import { HandleError } from '@/error/HandlerError';

export async function getLocations() {
  try {
    const { data } = await api.get('/locations');
    return data;
  } catch (error) {
    console.log();
  }
}

export function useLocations() {
  return useQuery(['all_locations'], () => getLocations(), {
    staleTime: 1000 * 5,
  });
}
