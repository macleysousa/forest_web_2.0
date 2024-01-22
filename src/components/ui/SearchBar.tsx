import React from 'react';
import {
  InputGroup,
  InputRightElement,
  Icon,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

interface SearchBarProps extends Omit<InputProps, 'type'> {}

export default function SearchBar({ ...props }: SearchBarProps) {
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('searching...');
    }
  };

  return (
    <InputGroup {...props} w="25rem" borderRadius={5} bg="white">
      <Input {...props} type="text" onKeyDown={handleSearch} />
      <InputRightElement {...props}>
        <Icon as={IoSearch} />
      </InputRightElement>
    </InputGroup>
  );
}
