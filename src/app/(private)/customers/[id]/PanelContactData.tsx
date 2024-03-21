import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  TabPanel,
  Text,
} from '@chakra-ui/react';
import IMask from 'imask';
import { useEffect, useRef } from 'react';
import { InputLabel } from '../../../../components/InputLabel';
import { InputText } from '../../../../components/InputText';

type PanelContactDataProps = {
  formState: any;
  handleSubmit: any;
  onCancel: any;
  onError: any;
  onSubmit: any;
  register: any;
};

export function PanelContactData({
  formState,
  register,
  handleSubmit,
  onSubmit,
  onError,
  onCancel,
}: PanelContactDataProps) {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!phoneInputRef.current) return;

    const phoneInputMask = IMask(phoneInputRef.current, {
      mask: [
        {
          mask: '(00) 0000-0000',
        },
        {
          mask: '(00) 0 0000-0000',
        },
      ],
    });

    return () => phoneInputMask.destroy();
  }, []);
  return (
    <TabPanel p="2rem 0">
      <Box
        bg="#fff"
        borderRadius="8px"
        maxW="53rem"
        p="1rem 2rem 1rem 2rem"
        shadow="sm"
        w={{ lg: '100%', md: '100%', xl: '53rem' }}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="9rem">
              Nome do Contato
              <Box
                as="span"
                color="red.500"
                ml="0.25rem"
              >
                *
              </Box>
            </Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.contactName?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <InputText
                ml={{ lg: '0', md: '0', xl: '3rem' }}
                placeholder="Nome do Contato"
                {...register('contactName')}
              />
            </InputLabel>
          </Flex>
          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="9rem">Telefone</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.phoneNumber?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <Input
                ml={{ lg: '0', md: '0', xl: '3rem' }}
                placeholder="Telefone"
                {...register('phoneNumber')}
                ref={phoneInputRef}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="9rem">
              E-Mail
              <Box
                as="span"
                color="red.500"
                ml="0.25rem"
              >
                *
              </Box>
            </Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.email?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <InputText
                ml={{ lg: '0', md: '0', xl: '3rem' }}
                placeholder="E-Mail Comercial"
                {...register('email')}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text
              mb={{ base: '0', lg: '1rem', md: '1rem' }}
              minW="9rem"
            >
              E-Mail Financeiro
            </Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.financialEmail?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <InputText
                ml={{ lg: '0', md: '0', xl: '3rem' }}
                placeholder="E-Mail Financeiro"
                {...register('financialEmail')}
              />
            </InputLabel>
          </Flex>

          <Divider my="2rem" />

          <Flex
            align="center"
            justify="flex-end"
          >
            <Button
              h="2.5rem"
              variant="outline"
              w="5.5rem"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              h="2.5rem"
              ml="1.5rem"
              type="submit"
              variant="solid"
              w="8rem"
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </Box>
    </TabPanel>
  );
}
