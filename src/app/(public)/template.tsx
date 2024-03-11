'use client';
import { Box, Card, Flex, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loading } from '../../components/Loading';
import { useAuthContext } from '../../contexts/AuthContext';

type LayoutProps = {
  children: React.ReactNode;
};

export default function PublicTemplate({ children }: LayoutProps) {
  const auth = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (auth.is === 'authenticated') {
      router.push('/dashboard');
    }
  }, [auth.is, router]);

  if (auth.is !== 'unauthenticated') {
    return <Loading />;
  }

  return (
    <Flex
      align="center"
      direction="column"
      justify="center"
      minH="100vh"
      px="1.5rem"
    >
      <Box
        bg="url('/background-login.png')"
        bgSize="cover"
        inset="0"
        position="absolute"
        sx={{ filter: 'blur(4px) contrast(.5)' }}
      />
      <Image
        alt="petroplus logo"
        h="6rem"
        height="auto"
        src="/petroplus.png"
        w="25rem"
        width={{ base: '15rem', md: '25rem' }}
        zIndex={1}
      />
      <Card
        maxW="459px"
        mt={7}
        p={8}
        w="100%"
      >
        {children}
      </Card>
    </Flex>
  );
}
