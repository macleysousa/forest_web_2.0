import { api } from '.';

export async function logout() {
    await api.post('/v2/logout');
}
