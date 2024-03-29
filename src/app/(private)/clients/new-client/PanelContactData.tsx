import { Box, Divider, Flex, TabPanel, Text, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { InputLabel } from 'src/components/ui/InputLabel';
import { InputText } from 'src/components/ui/InputText';
import { Form } from 'src/components/ui/Form';
import { z } from 'zod';
import InputMask from 'react-input-mask';

export default function PanelContactData() {
  const schema = z.object({
    contactName: z.string().min(0, 'O nome do contato é obrigatório'),
    phoneNumber: z.string().min(0, 'O telefone é obrigatório'),
    email: z.string().email('E-mail inválido').min(0, 'O e-mail é obrigatório'),
    financialEmail: z.string().email('E-mail inválido').min(0, 'O e-mail é obrigatório'),
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <TabPanel p="2rem 0">
      <Box
        maxW="53rem"
        w={{ md: '100%', lg: '100%', xl: '53rem' }}
        borderRadius="8px"
        shadow="sm"
        p="1rem 2rem 1rem 2rem"
        bg="#fff"
      >
        <Form onSubmit={handleSubmit(onSubmit, console.error)}>
          <Flex
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="9rem">Nome do Contato</Text>
            <InputLabel
              my="1rem"
              display="flex"
              alignItems="baseline"
              flexDirection="column"
              w={{ md: '100%', lg: '100%', xl: '90%' }}
              error={formState.errors.contactName?.message}
            >
              <InputText
                ml={{ md: '0', lg: '0', xl: '3rem' }}
                placeholder="Nome do Contato"
                {...register('contactName')}
              />
            </InputLabel>
          </Flex>
          <Flex
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="9rem">Telefone</Text>
            <InputLabel
              my="1rem"
              display="flex"
              alignItems="baseline"
              flexDirection="column"
              w={{ md: '100%', lg: '100%', xl: '90%' }}
              error={formState.errors.phoneNumber?.message}
            >
              <Input
                as={InputMask}
                //   mask={[/^(\d{2})\D*(\d{5}|\d{4})\D*(\d{4})$/]}
                mask="(99) 9 9999-9999"
                maskChar={null}
                alwaysShowMask={false}
                ml={{ md: '0', lg: '0', xl: '3rem' }}
                placeholder="Telefone"
                {...register('phoneNumber')}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="9rem">E-Mail</Text>
            <InputLabel
              my="1rem"
              display="flex"
              alignItems="baseline"
              flexDirection="column"
              w={{ md: '100%', lg: '100%', xl: '90%' }}
              error={formState.errors.email?.message}
            >
              <InputText ml={{ md: '0', lg: '0', xl: '3rem' }} placeholder="E-Mail Comercial" {...register('email')} />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text mb={{ base: '0', md: '1rem', lg: '1rem' }} minW="9rem">
              E-Mail Financeiro
            </Text>
            <InputLabel
              my="1rem"
              display="flex"
              alignItems="baseline"
              flexDirection="column"
              w={{ md: '100%', lg: '100%', xl: '90%' }}
              error={formState.errors.financialEmail?.message}
            >
              <InputText
                ml={{ md: '0', lg: '0', xl: '3rem' }}
                placeholder="E-Mail Financeiro"
                {...register('financialEmail')}
              />
            </InputLabel>
          </Flex>

          <Divider my="2rem" />

          <Flex justify="flex-end" align="center">
            <ButtonOutline w="5.5rem" h="2.5rem">
              Cancelar
            </ButtonOutline>
            <ButtonPrimary type="submit" ml="1.5rem" w="8rem" h="2.5rem">
              Salvar
            </ButtonPrimary>
          </Flex>
        </Form>
      </Box>
    </TabPanel>
  );
}
