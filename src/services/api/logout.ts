import { api } from '../api';

export async function logout() {
  await api.post('/v2/logout');
}
