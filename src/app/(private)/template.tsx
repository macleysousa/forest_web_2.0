'use client';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loading } from '../../components/Loading';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { useAuthContext } from '../../contexts/AuthContext';

type PrivateTemplateProps = {
  children: React.ReactNode;
};

export default function PrivateTemplate({ children }: PrivateTemplateProps) {
  const auth = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (auth.is === 'unauthenticated') {
      router.push('/');
    }
  }, [auth.is, router]);

  if (auth.is !== 'authenticated') {
    return <Loading />;
  }

  return (
    <Box>
      <Flex direction="row">
        <Sidebar />
        <Flex
          direction="column"
          h="100dvh"
          overflowX="hidden"
          overflowY="hidden"
          w="100dvw"
        >
          <Navbar />
          <Box
            bg="#f9f9f9"
            h="100%"
            overflowY="scroll"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
