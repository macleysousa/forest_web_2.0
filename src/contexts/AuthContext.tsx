import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { Loading } from 'src/components/Loader';
import { getUser } from 'src/services/api/user';

type User = Awaited<ReturnType<typeof getUser>>;

type AuthContextState =
  | { is: 'authenticated'; user: User }
  | { is: 'unauthenticated' }
  | { is: 'loading' };

type AuthContextValue = AuthContextState & {
  login: (accessToken: string) => void;
  logout: () => void
};

const AuthContext = createContext({} as AuthContextValue);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
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

    getUser()
      .then((user) => setState({ is: 'authenticated', user }))
      .catch((err) => toast({ status: 'error', description: err?.message ?? String(err) }));
  }, [toast]);

  const login: AuthContextValue['login'] = (accessToken) => {
    document.cookie = `forest_access_token=${accessToken};maxAge=3600;path=/;`;

    getUser()
      .then((user) => setState({ is: 'authenticated', user }))
      .catch((err) => toast({ status: 'error', description: err?.message ?? String(err) }));
  };

  const logout: AuthContextValue['logout'] = () => {
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

export type PrivatePageProps = { user: User };

export function isPrivatePage<P extends PrivatePageProps = PrivatePageProps>(Page: React.FC<P>) {
  return function PrivatePage(props: P & JSX.IntrinsicAttributes) {
    const auth = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (auth.is === 'unauthenticated') {
        router.push('/login');
      }
    }, [auth.is, router]);

    if (auth.is !== 'authenticated') {
      return <Loading fullScreen />;
    }

    return <Page {...props} user={auth.user} />;
  };
}

export function isPublicPage<P = {}>(Page: React.FC<P>) {
  return function PublicPage(props: P & JSX.IntrinsicAttributes) {
    const auth = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (auth.is === 'authenticated') {
        router.push('/dashboard');
      }
    }, [auth.is, router]);

    if (auth.is !== 'unauthenticated') {
      return <Loading fullScreen />;
    }

    return <Page {...props} />;
  };
}

