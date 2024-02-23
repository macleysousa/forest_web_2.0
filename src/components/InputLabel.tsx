import {
  FormControl,
  FormErrorMessage,
  Text,
  TextProps,
} from '@chakra-ui/react';

import { Children, cloneElement, isValidElement } from 'react';

type InputLabelProps = TextProps & {
  error?: string;
  htmlFor?: string;
};

export const InputLabel: React.FC<InputLabelProps> = ({
  children,
  error,
  ...rest
}) => {
  const childs = Children.toArray(children).map((child) => {
    if (!isValidElement(child)) return child;
    if (!error) return child;
    return cloneElement(child, { ...child.props, 'aria-invalid': !!error });
  });

  return (
    <FormControl
      isInvalid={!!error}
      aria-invalid
    >
      <Text
        as="label"
        fontSize="14px"
        fontWeight="medium"
        mt={2}
        w="full"
        {...rest}
      >
        {childs}
        <FormErrorMessage>{error}</FormErrorMessage>
      </Text>
    </FormControl>
  );
};
