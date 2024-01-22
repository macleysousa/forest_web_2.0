'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import Navbar from 'src/layouts/Navbar';
import Sidebar from 'src/layouts/Sidebar';

export default function Authorized() {
  return (
    <Box>
      <Flex direction="row">
        <Sidebar />
        <Flex direction="column" w="calc(100% - 16rem)">
          <Navbar />
          <Box>
            <Text>Authorized</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
