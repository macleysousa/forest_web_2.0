import { Icon, IconButton, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import React from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputPasswordProps extends Omit<InputProps, 'type'> {}

function InputPasswordElement({ isInvalid, ...props }: InputPasswordProps, ref: React.LegacyRef<HTMLInputElement>) {
  const [show, setShow] = React.useState(false);

  return (
    <InputGroup {...props}>
      <Input ref={ref} isInvalid={isInvalid} {...props} type={show ? 'text' : 'password'} />
      <InputRightElement {...props}>
        <IconButton
          aria-label="Mostar/Esconder senha"
          onClick={() => setShow(!show)}
          variant="ghost"
          _hover={{ background: 'transparent' }}
        >
          <Icon as={show ? FaEyeSlash : FaEye} color="#898989" />
        </IconButton>
      </InputRightElement>
    </InputGroup>
  );
}

export const InputPassword = React.forwardRef(InputPasswordElement);
