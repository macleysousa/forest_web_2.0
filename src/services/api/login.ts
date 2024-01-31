import { api } from '../api';

interface User {
  api_token: string
  id: number
  name: string
  email: string
  type: string
  date_birth: string
  is_ranking: number
  avatar: any
  app_version: any
}

interface Distributor {
  id: number
  name: string
  actor_id: number
  tree_id: number
}

interface ActorTree {
  parent_id: number
  user_id: number
  name: string
  avatar: any
  actor_id: number
  actor_name: string
  actor_type: string
  actor_level: number
  tree_id: number
  tree_name: string
  tree_type: string
  tree_branch_id: number
}

interface LoginResult {
  status: string
  user: User
  distributor: Distributor
  actor_tree: ActorTree[]
}

export async function login(email: string, password: string) {
  const data = { email, password, origin: 'web' };
  const response = await api.post<LoginResult>('/v2/login', data);
  return response.data;
}
