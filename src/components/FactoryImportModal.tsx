import {
  ButtonProps,
  ModalProps,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Icon,
  useDisclosure,
  ModalBody,
  ModalFooter,
  Text,
  ModalBodyProps,
  Input,
  Box,
} from '@chakra-ui/react';
import { MdClose, MdFileDownload } from 'react-icons/md';
import { InputFile } from './ui/InputFile';
import { ButtonPrimary } from './ui/ButtonPrimary';
import { InputLabel } from './ui/InputLabel';
import React from 'react';

interface FactoryImportModalProps {
  buttonProps?: ButtonProps;
  modalProps?: Omit<ModalProps, 'children' | 'isOpen' | 'onClose'>;
  modalBodyProps?: ModalBodyProps;
  buttonTitle: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function FactoryImportModal({
  buttonProps,
  modalProps,
  modalBodyProps,
  buttonTitle,
  onChange,
}: FactoryImportModalProps) {
  const { isOpen = true, onOpen, onClose } = useDisclosure();

  const [fileName, setFileName] = React.useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setFileName(fileNames.length > 0 ? fileNames.join(', ') : 'Nenhum arquivo selecionado');
    }
    onChange?.call(null, event);
  };

  return (
    <>
      <Button {...buttonProps} onClick={onOpen}>
        {buttonTitle}
      </Button>

      <Modal size="xl" {...modalProps} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
            <Text>Importar Pedido de Fábrica</Text>
            <Icon cursor="pointer" as={MdClose} onClick={onClose} />
          </ModalHeader>
          <ModalBody
            {...modalBodyProps}
            h="14rem"
            w="100%"
            display="flex"
            alignContent="center"
            justifyContent="center"
            flexDirection="column"
          >
            <InputLabel
            // error="Não foi possivel importar o arquivo"
            >
              Escolher o arquivo
              <Input onChange={handleChange} type="file" id="factory-import-file" name="factory-import-file" hidden />
              <Box
                border="1px solid #00000020"
                borderRadius={5}
                w="100%"
                h="3rem"
                color="#898989"
                display="flex"
                alignItems="center"
                mt=".25rem"
                pl=".5rem"
              >
                Defina o arquivo
              </Box>
            </InputLabel>

            <Button w="14rem" mt="4rem" alignSelf="center" gap=".5rem" bg="#fff" variant="outline" color="#202020">
              <Icon h="24px" w="24px" as={MdFileDownload} />
              <Text>Baixar Planilha Modelo</Text>
            </Button>
          </ModalBody>

          <ModalFooter mt="1rem">
            <ButtonPrimary width="100%" onClick={onClose}>
              Enviar
            </ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
