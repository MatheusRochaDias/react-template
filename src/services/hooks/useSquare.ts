// src/hooks/useSquare.ts
import { useQuery } from 'react-query';
import { api } from '../api';
import { HandleError } from '@/error/HandlerError';

export interface SquareData {
  franqueadoID: number;
  name: string;
  prodToken: string;
  prodApplication: string;
  sandboxToken: string;
  sandboxApplication: string;
  timezone: string;
  webhook: string;
}

export async function createSquare(square: SquareData) {
  try {
    const { data } = await api.post('franchisee', square);
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export async function getSquare() {
  try {
    const { data } = await api.get('/franchisee');
    return data;
  } catch (error) {
    console.log();
  }
}

export async function deleteSquare(id: number) {
  try {
    const { data } = await api.delete(`/franchisee/${id}`);
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export async function updateSquare(id: number, square: SquareData) {
  try {
    const { data } = await api.put(`/franchisee/${id}`, square);
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export function useSquare() {
  return useQuery(['All_admins'], () => getSquare(), {
    staleTime: 1000 * 5,
  });
}
