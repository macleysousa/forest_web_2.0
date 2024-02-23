import {
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

import { IoSearch } from 'react-icons/io5';

type InputSearchProps = Omit<InputProps, 'type'>;

export function InputSearch({ ...props }: InputSearchProps) {
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('searching...');
    }
  };

  return (
    <InputGroup
      {...props}
      bg="white"
      borderRadius={5}
      h="2rem"
      w="30rem"
    >
      <Input
        {...props}
        h="100%"
        type="text"
        onKeyDown={handleSearch}
      />
      <InputRightElement
        h="100%"
        {...props}
      >
        <Icon as={IoSearch} />
      </InputRightElement>
    </InputGroup>
  );
}
