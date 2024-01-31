'use client';

import { StyledProvider } from 'src/providers/styled.provider';
import { ThemeProvider } from 'src/providers/theme.provider';
import { AuthContextProvider } from 'src/contexts/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StyledProvider>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </StyledProvider>
    </ThemeProvider>
  );
}
