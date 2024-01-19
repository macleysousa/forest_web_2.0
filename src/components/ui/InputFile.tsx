'use client';

import { Box, Button, Input, InputProps, Text, useStyleConfig } from '@chakra-ui/react';
import React from 'react';

interface InputFileProps extends InputProps {
  title?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function InputFileElement(props: InputFileProps, ref: React.LegacyRef<HTMLInputElement>) {
  const { name, title, placeholder, onChange, ...rest } = props;

  const id = 'input-file-' + Math.random().toString(36);

  const refLabel = React.useRef<HTMLLabelElement>(null);
  const refInput = React.useRef<HTMLInputElement>();

  const [fileName, setFileName] = React.useState<string>(placeholder ?? 'Nenhum arquivo selecionado');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setFileName(fileNames.length > 0 ? fileNames.join(', ') : placeholder ?? 'Nenhum arquivo selecionado');
    }
    onChange?.call(null, event);
  };

  const { field } = useStyleConfig('Input') as { field: any };
  const keys = Object.keys(field).filter((key) => !key.startsWith('--'));
  const styles: InputProps = keys.reduce((acc, key) => ({ ...acc, [key]: field[key] }), {});

  return (
    <Box ref={ref} {...styles} {...rest} p={1} aria-invalid={props['aria-invalid']}>
      <label htmlFor={id} ref={refLabel} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Button onClick={() => refLabel.current?.click()} h="100%">
          {title ?? 'Escolher arquivo'}
        </Button>
        <Text ml={2} isTruncated>
          {fileName}
        </Text>
      </label>
      <Input {...rest} ref={refInput} id={id} name={name} type="file" hidden onChange={handleChange} />
    </Box>
  );
}

export const InputFile = React.forwardRef(InputFileElement);
