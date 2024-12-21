import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api } from '../api';
import { HandleError } from '@/error/HandlerError';

export interface OrdenacaoVisibilidadeData {
  ordenacaoVisibilidadeID: number;
  restauranteID: number;
  franquiaID: number;
  position: number;
  visibilidade: boolean;
  alternativeName?: string;
  customLatitude?: number;
  customLongitude?: number;
  customPrepTime?: number;
  restaurante: {
    nome: string;
    address: string;
    status: string;
  };
}

export async function getOrdenacaoVisibilidade() {
  try {
    const { data } = await api.get('/OrdenacaoVisibilidade');
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export function useOrdenacaoVisibilidade() {
  return useQuery(
    ['Ordenacao_Visibilidade'],
    () => getOrdenacaoVisibilidade(),
    {
      staleTime: 1000 * 5,
    }
  );
}

export async function updateOrdenacaoVisibilidade(ordenacoes: any[]) {
  try {
    await api.put('/OrdenacaoVisibilidade/update-order', ordenacoes);
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export async function updateDataVisibilidade(ordenacoes: any[]) {
  try {
    await api.put('/OrdenacaoVisibilidade/update-data', ordenacoes);
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}

export function useUpdateOrdenacaoVisibilidade() {
  const queryClient = useQueryClient();

  return useMutation(
    (ordenacoes: { restauranteID: number; position: number }[]) =>
      updateOrdenacaoVisibilidade(ordenacoes),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['Ordenacao_Visibilidade']);
      },
      onError: (error: any) => {
        throw new HandleError(error.response);
      },
    }
  );
}
