import { TabPanel, Divider, Flex, Box, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { InputLabel } from 'src/components/ui/InputLabel';
import { InputText } from 'src/components/ui/InputText';
import { Form } from 'src/components/ui/Form';
import { z } from 'zod';

export default function PanelLocation() {
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
      <Box maxW="53rem" w="53rem" borderRadius="8px" shadow="sm" p="3rem 2rem 1rem 2rem" bg="#fff">
        <Form onSubmit={handleSubmit(onSubmit, console.error)}>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            error={formState.errors.contactName?.message}
          >
            <Text minW="8rem">Nome do Contato</Text>
            <InputText ml="3rem" placeholder="Nome do Contato" {...register('contactName')} />
          </InputLabel>
          <Divider my="2rem" />
          <Flex justify="flex-end" align="center">
            <ButtonOutline w="5.5rem" h="2.5rem">
              Cancelar
            </ButtonOutline>
            <ButtonPrimary ml="1.5rem" w="8rem" h="2.5rem">
              Salvar
            </ButtonPrimary>
          </Flex>
        </Form>
      </Box>
    </TabPanel>
  );
}
