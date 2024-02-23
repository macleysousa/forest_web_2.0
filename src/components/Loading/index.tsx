'use client';
import { Box, Flex } from '@chakra-ui/react';
import './styles.css';

export function Loading() {
  return (
    <Flex
      align="center"
      bg="gray.50"
      display="flex"
      h="100vh"
      justify="center"
    >
      <Box
        animation="loading 1s linear infinite"
        borderColor="#ECECEC"
        borderRadius="50%"
        borderStyle="solid"
        borderTopColor="#110834"
        borderWidth="0.625rem"
        h="6rem"
        w="6rem"
      />
    </Flex>
  );
}
