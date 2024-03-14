import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import type { Metadata } from 'next';

// disable next.js static optimization
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Forest',
};

type LayoutRootProps = {
  children: React.ReactNode;
};

export default function LayoutRoot({ children }: LayoutRootProps) {
  return (
    <html
      className={inter.variable}
      lang="pt-BR"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
