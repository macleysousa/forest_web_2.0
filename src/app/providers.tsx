'use client';

import { StyledProvider } from 'src/providers/styled.provider';
import { ThemeProvider } from 'src/providers/theme.provider';
import { AuthContextProvider } from 'src/contexts/AuthContext';
import { ReactQueryProvider } from 'src/providers/reactQuery.provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StyledProvider>
        <AuthContextProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthContextProvider>
      </StyledProvider>
    </ThemeProvider>
  );
}
