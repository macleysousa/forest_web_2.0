import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export const ButtonPrimary: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button {...props} variant="primary">
      {children}
    </Button>
  );
};
