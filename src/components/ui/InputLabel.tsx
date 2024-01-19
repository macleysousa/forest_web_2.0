import { FormControl, FormErrorMessage, Text, TextProps } from '@chakra-ui/react';
import React from 'react';

interface InputLabelProps extends TextProps {
  htmlFor?: string;
  error?: string;
}

export const InputLabel: React.FC<InputLabelProps> = ({ children, error, ...rest }) => {
  const childs = React.Children.toArray(children).map((child) => {
    if (React.isValidElement(child) && !!error) {
      return React.cloneElement(child, { ...child.props, 'aria-invalid': !!error });
    }
    return child;
  });
  return (
    <FormControl isInvalid={!!error} aria-invalid>
      <Text mt={2} as="label" w="full" fontSize="14px" fontWeight="medium" {...rest}>
        {childs}
        <FormErrorMessage>{error}</FormErrorMessage>
      </Text>
    </FormControl>
  );
};
