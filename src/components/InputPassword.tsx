import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

import { forwardRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type InputPasswordProps = Omit<InputProps, 'type'>;

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ isInvalid, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <InputGroup {...props}>
        <Input
          ref={ref}
          isInvalid={isInvalid}
          {...props}
          type={show ? 'text' : 'password'}
        />
        <InputRightElement {...props}>
          <IconButton
            _hover={{ background: 'transparent' }}
            aria-label="Mostar/Esconder senha"
            variant="ghost"
            onClick={() => setShow(!show)}
          >
            <Icon
              as={show ? FaEyeSlash : FaEye}
              color="#898989"
            />
          </IconButton>
        </InputRightElement>
      </InputGroup>
    );
  },
);

InputPassword.displayName = 'InputPassword';

export { InputPassword };
