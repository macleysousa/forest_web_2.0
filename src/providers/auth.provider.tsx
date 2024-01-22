'use client';

import { destroyCookie, setCookie } from 'nookies';
import { createContext, useContext, useState } from 'react';

import { api } from 'src/commons/api';
import { UserResponse } from 'src/interfaces/v2/user';


export type AuthContextType = {
  user: UserResponse | null;
  signIn: (email: string, password: string) => Promise<UserResponse>;
  signOut: () => Promise<any>;
  getMe: () => Promise<UserResponse>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [user, setUser] = useState<UserResponse | null>(null);

  async function signIn(email: string, password: string): Promise<UserResponse> {
    return api
      .post<UserResponse>('/v2/login', { email, password })
      .then(async ({ data }) => {
        setCookie(undefined, 'forest_access_token', data.user.api_token, { maxAge: 60 * 60 * 1, path: '/' });
        return data;
      })
      .catch((err) => err);
  }

  async function signOut(): Promise<void> {
    await api.post('/v2/logout');
    destroyCookie(undefined, 'forest_access_token');
  }

  async function getMe(): Promise<UserResponse> {
    return api
      .get<UserResponse>('/v1/me')
      .then(({ data: usr }) => {
        setUser(usr);
        return usr;
      })
      .catch((err) => err)
      .finally(() => setIsLoadingUser(false));
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, getMe }} >
      {children}
    </AuthContext.Provider>
  );
}