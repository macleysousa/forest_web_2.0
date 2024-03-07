'use client';

import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react';

import { MdClear } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';

type InvoicesFilterProps = {
  defaultValue?: string;
  disabled: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onTextChange?: (value: string) => void;
  readOnly?: boolean;
  value: string;
};

export function InvoicesFilter({
  disabled,
  defaultValue = '',
  inputRef,
  label,
  onClick,
  onTextChange,
  readOnly,
  value,
}: InvoicesFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onTextChange) {
      onTextChange(e.target.value);
    }
  };

  const handleClick = () => {
    if (onTextChange) {
      onTextChange(defaultValue);
    }
  };

  return (
    <InputGroup>
      <InputLeftAddon
        borderLeftRadius="md"
        h="2.5rem"
        justifyContent="flex-end"
        minW="4.5rem"
      >
        {label}
      </InputLeftAddon>
      <Input
        ref={inputRef}
        borderRightRadius="md"
        h="2.5rem"
        isDisabled={disabled}
        isReadOnly={readOnly}
        value={value}
        onChange={handleChange}
        onClick={onClick}
      />
      {value !== defaultValue && (
        <InputRightElement h="2.5rem">
          <IconButton
            aria-label="Limpar"
            isLoading={disabled}
            size="sm"
            variant="ghost"
            icon={
              <Icon
                as={MdClear}
                color="gray.500"
                fontSize="md"
              />
            }
            onClick={handleClick}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
