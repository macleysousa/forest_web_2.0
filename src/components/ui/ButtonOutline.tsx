import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export const ButtonOutline: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button {...props} variant="outline">
      {children}
    </Button>
  );
};
