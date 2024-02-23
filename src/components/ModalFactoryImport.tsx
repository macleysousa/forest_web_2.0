import {
  Box,
  Button,
  ButtonProps,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useState } from 'react';
import { MdClose, MdFileDownload } from 'react-icons/md';
import { InputLabel } from './InputLabel';

type ModalFactoryImportProps = {
  buttonProps?: ButtonProps;
  buttonTitle: string;
  modalBodyProps?: ModalBodyProps;
  modalProps?: Omit<ModalProps, 'children' | 'isOpen' | 'onClose'>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export function ModalFactoryImport({
  buttonProps,
  modalProps,
  modalBodyProps,
  buttonTitle,
  onChange,
}: ModalFactoryImportProps) {
  const { isOpen = true, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setFileName(
        fileNames.length > 0
          ? fileNames.join(', ')
          : 'Nenhum arquivo selecionado',
      );
    }
    onChange?.call(null, event);
  };

  return (
    <>
      <Button
        {...buttonProps}
        onClick={onOpen}
      >
        {buttonTitle}
      </Button>

      <Modal
        size="xl"
        {...modalProps}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <Text>Importar Pedido de Fábrica</Text>
            <Icon
              as={MdClose}
              cursor="pointer"
              onClick={onClose}
            />
          </ModalHeader>
          <ModalBody
            {...modalBodyProps}
            alignContent="center"
            display="flex"
            flexDirection="column"
            h="14rem"
            justifyContent="center"
            w="100%"
          >
            <InputLabel
            // error="Não foi possivel importar o arquivo"
            >
              Escolher o arquivo
              <Input
                id="factory-import-file"
                name="factory-import-file"
                type="file"
                hidden
                onChange={handleChange}
              />
              <Box
                alignItems="center"
                border="1px solid #00000020"
                borderRadius={5}
                color="#898989"
                display="flex"
                h="3rem"
                mt=".25rem"
                pl=".5rem"
                w="100%"
              >
                {fileName || 'Defina o arquivo'}
              </Box>
            </InputLabel>

            <Button
              alignSelf="center"
              bg="#fff"
              color="#202020"
              gap=".5rem"
              mt="4rem"
              variant="outline"
              w="14rem"
            >
              <Icon
                as={MdFileDownload}
                h="24px"
                w="24px"
              />
              <Text>Baixar Planilha Modelo</Text>
            </Button>
          </ModalBody>

          <ModalFooter mt="1rem">
            <Button
              variant="primary"
              width="100%"
              onClick={onClose}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
