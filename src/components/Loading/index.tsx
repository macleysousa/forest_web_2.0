'use client';
import { Center, Spinner } from '@chakra-ui/react';
import { forwardRef } from 'react';

const Loading = forwardRef<HTMLDivElement, object>((props, ref) => (
  <Center
    ref={ref}
    bg="gray.50"
    display="flex"
    h="100vh"
    inset="0"
    position="fixed"
    {...props}
  >
    <Spinner
      color="blue.500"
      emptyColor="gray.200"
      size="xl"
      thickness="4px"
    />
  </Center>
));

Loading.displayName = 'Loading';

export { Loading };
