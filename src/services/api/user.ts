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
  avatar: any;
  app_version: any;
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
type ActorTree = {
  parent_id: number;
  user_id: number;
  name: string;
  avatar: any;
  actor_id: number;
  actor_name: string;
  actor_type: string;
  actor_level: number;
  tree_id: number;
  tree_name: string;
  tree_type: string;
  tree_branch_id: number;
};
/* eslint-enable typescript-sort-keys/interface */

/* eslint-disable typescript-sort-keys/interface */
type GetUserResult = {
  status: string;
  user: User;
  distributor: Distributor;
  actor_tree: ActorTree[];
};
/* eslint-enable typescript-sort-keys/interface */

export async function getUser() {
  const response = await api.get<GetUserResult>('/v2/user');
  return response.data;
}
