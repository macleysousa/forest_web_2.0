import { Input, InputProps } from '@chakra-ui/react';
import React from 'react';

interface InputTextProps extends InputProps {}

function InputTextElement({ ...rest }: InputTextProps, ref: React.LegacyRef<HTMLInputElement>) {
  return <Input ref={ref} border="1px solid #EBEAED" {...rest} />;
}

export const InputText = React.forwardRef(InputTextElement);
