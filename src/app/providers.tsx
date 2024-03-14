'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Suspense } from 'react';
import { Loading } from '../components/Loading';
import { theme } from '../configs/chakra';
import { AuthContextProvider } from '../contexts/AuthContext';
import { RouterContextProvider } from '../contexts/RouterContext';

setDefaultOptions({ locale: ptBR });

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <RouterContextProvider>
              <AuthContextProvider>{children}</AuthContextProvider>
            </RouterContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChakraProvider>
      </CacheProvider>
    </Suspense>
  );
}
