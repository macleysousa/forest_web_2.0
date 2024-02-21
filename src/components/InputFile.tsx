import {
  Box,
  Button,
  Input,
  InputProps,
  Text,
  useStyleConfig,
} from '@chakra-ui/react';

import { forwardRef, useRef, useState } from 'react';

type InputFileProps = InputProps & {
  accept?: string;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  title?: string;
};

const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { name, title, placeholder, onChange, ...rest } = props;

  const id = 'input-file-' + Math.random().toString(36);

  const refLabel = useRef<HTMLLabelElement>(null);
  const refInput = useRef<HTMLInputElement>();

  const [fileName, setFileName] = useState<string>(
    placeholder ?? 'Nenhum arquivo selecionado',
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setFileName(
        fileNames.length > 0
          ? fileNames.join(', ')
          : placeholder ?? 'Nenhum arquivo selecionado',
      );
    }
    onChange?.call(null, event);
  };

  const { field } = useStyleConfig('Input') as { field: any };
  const keys = Object.keys(field).filter((key) => !key.startsWith('--'));
  const styles: InputProps = keys.reduce(
    (acc, key) => ({ ...acc, [key]: field[key] }),
    {},
  );

  return (
    <Box
      ref={ref}
      {...styles}
      {...rest}
      aria-invalid={props['aria-invalid']}
      p={1}
    >
      <label
        ref={refLabel}
        htmlFor={id}
        style={{ alignItems: 'center', display: 'flex', height: '100%' }}
      >
        <Button
          h="100%"
          onClick={() => refLabel.current?.click()}
        >
          {title ?? 'Escolher arquivo'}
        </Button>
        <Text
          ml={2}
          isTruncated
        >
          {fileName}
        </Text>
      </label>
      <Input
        {...rest}
        ref={refInput}
        id={id}
        name={name}
        type="file"
        hidden
        onChange={handleChange}
      />
    </Box>
  );
});

InputFile.displayName = 'InputFile';

export { InputFile };
