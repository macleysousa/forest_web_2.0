import { Input, InputProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => (
    <Input
      ref={ref}
      border="1px solid #EBEAED"
      {...rest}
    />
  ),
);

InputText.displayName = 'InputText';

export { InputText };
