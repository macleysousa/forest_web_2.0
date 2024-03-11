import { useToast } from '@chakra-ui/react';
// import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
// import { Loading } from '../components/Loading';
import { getUser } from '../services/api/user';

export type AuthUser = Awaited<ReturnType<typeof getUser>>;

type AuthContextState =
  | { is: 'authenticated'; user: AuthUser }
  | { is: 'unauthenticated' }
  | { is: 'loading' };

type AuthContextValue = AuthContextState & {
  login: (accessToken: string) => void;
  logout: () => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextValue);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const toast = useToast();
  const [state, setState] = useState<AuthContextState>({ is: 'loading' });

  useEffect(() => {
    const values = document.cookie.split('; ');
    const entries = values.map((v) => v.split('=', 2) as [string, string]);
    const map = new Map(entries);
    const accessToken = map.get('forest_access_token');

    if (!accessToken) {
      setState({ is: 'unauthenticated' });
      return;
    }

    getUser(accessToken)
      .then((user) => setState({ is: 'authenticated', user }))
      .catch((error) => {
        toast({ description: error.message, status: 'error' });
        document.cookie = `forest_access_token=;maxAge=0;path=/;`;
      });
  }, [toast]);

  const login: AuthContextValue['login'] = async (accessToken) => {
    try {
      const user = await getUser(accessToken);
      setState({ is: 'authenticated', user });
      document.cookie = `forest_access_token=${accessToken};maxAge=3600;path=/;`;
    } catch (error) {
      toast({ description: error.message, status: 'error' });
    }
  };

  const logout: AuthContextValue['logout'] = () => {
    document.cookie = `forest_access_token=;maxAge=0;path=/;`;
    setState({ is: 'unauthenticated' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
