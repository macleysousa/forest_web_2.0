import { Box, Flex } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function PrivateLayout({ children }: { children: React.ReactNode }) {
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
