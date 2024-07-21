import { authToken, SignInRequestData } from '@/types/auth';
import { api } from '../api';
import { HandleError } from '@/error/HandlerError';

export async function signInRequest(signin: SignInRequestData) {
  try {
    const { data } = await api.post<authToken>('/Auth/login', signin);
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}
