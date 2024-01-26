'use client';

import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';

import { api } from 'src/commons/api';
import { Loading } from 'src/components/Loader';
import { UserResponse } from 'src/interfaces/v2/user';

export type AuthContextType = {
  user: UserResponse | null;
  signIn: (email: string, password: string) => Promise<UserResponse>;
  signOut: () => Promise<any>;
  getMe: () => Promise<UserResponse>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState<UserResponse | null>(null);

  const forestAccessToken = parseCookies().forest_access_token;

  useEffect(() => {
    if (forestAccessToken) {
      getMe();
    }
  }, [forestAccessToken]);

  async function signIn(
    email: string,
    password: string
  ): Promise<UserResponse> {
    return api
      .post<UserResponse>('/v2/login', { email, password })
      .then(async ({ data }) => {
        setCookie(undefined, 'forest_access_token', data.user.api_token, {
          maxAge: 60 * 60 * 1,
          path: '/',
        });
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }

  async function signOut(): Promise<void> {
    await api.post('/v2/logout');
    destroyCookie(undefined, 'forest_access_token');
  }

  async function getMe(): Promise<UserResponse> {
    setIsLoadingUser(true);
    return api
      .get<UserResponse>('/v2/user')
      .then(({ data: usr }) => {
        setUser(usr);
        return usr;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setIsLoadingUser(false));
  }

  if (!forestAccessToken || isLoadingUser) {
    return <Loading fullScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, getMe }}>
      {children}
    </AuthContext.Provider>
  );
}
