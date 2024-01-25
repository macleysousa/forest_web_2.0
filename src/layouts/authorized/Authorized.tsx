'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import Navbar from 'src/layouts/authorized/Navbar';
import Sidebar from 'src/layouts/authorized/Sidebar';

interface AuthorizedProps {
  children: React.ReactNode;
}

export default function Authorized({ children }: AuthorizedProps) {
  return (
    <Box>
      <Flex direction="row">
        <Sidebar />
        <Flex direction="column" w="100dvw" h="100dvh" overflowX="hidden" overflowY="hidden">
          <Navbar />
          <Box bg="#f9f9f9" h="100%" overflowY="scroll">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
