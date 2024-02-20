import { Box, Flex } from '@chakra-ui/react';
import './loading.css';

export default function Loading() {
  return (
    <Flex h="100vh" bg="gray.50" display="flex" align="center" justify="center">
      <Box
        w="6rem"
        h="6rem"
        borderRadius="50%"
        borderWidth="0.625rem"
        borderStyle="solid"
        borderColor="#ECECEC"
        borderTopColor="#110834"
        animation="spin 1s linear infinite"
    />
    </Flex>
  );
}
