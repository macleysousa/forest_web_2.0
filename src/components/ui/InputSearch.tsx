import React from 'react';
import { InputGroup, InputRightElement, Icon, Input, InputProps } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

interface InputSearchProps extends Omit<InputProps, 'type'> {}

export default function InputSearch({ ...props }: InputSearchProps) {
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('searching...');
    }
  };

  return (
    <InputGroup {...props} h="2rem" w="30rem" borderRadius={5} bg="white">
      <Input {...props} h="100%" type="text" onKeyDown={handleSearch} />
      <InputRightElement h="100%" {...props}>
        <Icon as={IoSearch} />
      </InputRightElement>
    </InputGroup>
  );
}
