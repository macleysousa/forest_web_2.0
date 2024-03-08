'use client';
import { Center, Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <Center
      bg="gray.50"
      display="flex"
      h="100vh"
    >
      <Spinner
        color="blue.500"
        emptyColor="gray.200"
        size="xl"
        thickness="4px"
      />
    </Center>
  );
}
