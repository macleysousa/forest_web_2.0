import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  TabPanel,
  Text,
} from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { z } from 'zod';
import { InputLabel } from '../../../../components/InputLabel';
import { InputText } from '../../../../components/InputText';

export function PanelContactData() {
  const schema = z.object({
    contactName: z.string().min(0, 'O nome do contato é obrigatório'),
    email: z.string().email('E-mail inválido').min(0, 'O e-mail é obrigatório'),
    financialEmail: z
      .string()
      .email('E-mail inválido')
      .min(0, 'O e-mail é obrigatório'),
    phoneNumber: z.string().min(0, 'O telefone é obrigatório'),
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>(
    { resolver: zodResolver(schema) },
  );

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <TabPanel p="2rem 0">
      <Box
        bg="#fff"
        borderRadius="8px"
        maxW="53rem"
        p="1rem 2rem 1rem 2rem"
        shadow="sm"
        // eslint-disable-next-line canonical/sort-keys
        w={{ md: '100%', lg: '100%', xl: '53rem' }}
      >
        <form onSubmit={handleSubmit(onSubmit, console.error)}>
          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="9rem">Nome do Contato</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.contactName?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <InputText
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '3rem' }}
                placeholder="Nome do Contato"
                {...register('contactName')}
              />
            </InputLabel>
          </Flex>
          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
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
                alwaysShowMask={false}
                as={InputMask}
                //   mask={[/^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/]}
                mask="(99) 9 9999-9999"
                maskChar={null}
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '3rem' }}
                placeholder="Telefone"
                {...register('phoneNumber')}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="9rem">E-Mail</Text>
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
