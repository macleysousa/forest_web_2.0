import { api } from '../api';

/* eslint-disable typescript-sort-keys/interface */
type User = {
  api_token: string;
  id: number;
  name: string;
  email: string;
  type: string;
  date_birth: string;
  is_ranking: number;
  avatar: string;
  app_version: number;
  mobile_app: number;
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type Distributor = {
  id: number;
  name: string;
  actor_id: number;
  tree_id: number;
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type LoginResult = {
  status: string;
  user: User;
  distributor: Distributor;
};
/* eslint-enable typescript-sort-keys/interface */

export async function login(email: string, password: string) {
  const data = { email, origin: 'web', password };
  const response = await api.post<LoginResult>('/v2/login', data);
  return response.data;
}
