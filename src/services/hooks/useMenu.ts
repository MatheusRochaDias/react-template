import { useQuery } from 'react-query';
import { api } from '../api';

export async function getMenuByLocation(locationId: string) {
  try {
    const { data } = await api.get(`/menu/${locationId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch menu for the selected location');
  }
}

export function useMenu(locationId: string) {
  return useQuery(['menu', locationId], () => getMenuByLocation(locationId), {
    enabled: !!locationId,
  });
}
