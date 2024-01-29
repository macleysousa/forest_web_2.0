import { TabPanel, Flex, Select, Checkbox, Textarea, Divider, Box, Text, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { InputLabel } from 'src/components/ui/InputLabel';
import { InputText } from 'src/components/ui/InputText';
import { z } from 'zod';
import { Form } from 'src/components/ui/Form';
import InputMask from 'react-input-mask';

export default function PanelRegistrationData() {
  const schema = z.object({
    cnpj: z
      .string()
      .regex(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/, 'Formato inválido')
      .min(0, 'O CNPJ é obrigatório'),
    corporateReason: z.string().min(0, 'A Razão Social é obrigatória'),
    fantasyName: z.string(),
    ie: z.string(),
    im: z.string(),
    situation: z.string(),
    customerReview: z.string(),
    comments: z.string(),
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <TabPanel p="2rem 0">
      <Box maxW="53rem" w="53rem" borderRadius="8px" shadow="sm" p="3rem 2rem 1rem 2rem" bg="#fff">
        <Form onSubmit={handleSubmit(onSubmit, console.error)}>
          <Flex align="center">
            <Text minW="7rem">Avatar</Text>
            <Flex ml="4rem" align="center">
              <Box h="72px" w="72px" borderRadius="50%" bg="#84818A" />
              <ButtonPrimary ml="2rem" h="2rem" w="9rem">
                Alterar Foto
              </ButtonPrimary>
              <ButtonOutline ml="1rem" h="2rem" w="9rem" color="#1E93FF" borderColor="#1E93FF">
                Apagar Foto
              </ButtonOutline>
            </Flex>
          </Flex>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            error={formState.errors.cnpj?.message}
          >
            <Text minW="7rem">CNPJ</Text>
            <Input
              as={InputMask}
              mask="99.999.999/9999-99"
              maskChar={null}
              alwaysShowMask={false}
              ml="4rem"
              placeholder="CNPJ"
              {...register('cnpj')}
            />
          </InputLabel>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            error={formState.errors.corporateReason?.message}
          >
            <Text minW="7rem">Razão Social</Text>
            <InputText ml="4rem" placeholder="Nome da Empresa" {...register('corporateReason')} />
          </InputLabel>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            error={formState.errors.fantasyName?.message}
          >
            <Text minW="7rem">Nome Fantasia</Text>
            <InputText ml="4rem" placeholder="Nome Fantasia (Se houver)" {...register('fantasyName')} />
          </InputLabel>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            error={formState.errors.fantasyName?.message}
          >
            <Text minW="7rem">IE / IM</Text>
            <InputText ml="4rem" placeholder="Inscrição Estadual" {...register('ie')} />
            <InputText ml="2rem" placeholder="Inscrição Municipal" {...register('im')} />
          </InputLabel>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            error={formState.errors.fantasyName?.message}
          >
            <Text minW="7rem">Situação</Text>
            <Box width="100%" display="flex" alignItems="center">
              <Select ml="4rem" w="25rem" placeholder="Situação" {...register('situation')}>
                <option value="Regular">Regular</option>
                <option value="Irregular">Irregular</option>
              </Select>
              <Checkbox ml="2rem">Termo de incentivo</Checkbox>
            </Box>
          </InputLabel>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            error={formState.errors.customerReview?.message}
          >
            <Text minW="8rem">Avaliação Cliente</Text>
            <InputText ml="3rem" placeholder="Avaliação Cliente" {...register('customerReview')} />
          </InputLabel>
          <InputLabel my="2rem" display="flex" alignItems="center" error={formState.errors.comments?.message}>
            <Text minW="7rem">Observações</Text>
            <Textarea
              maxW="26.625rem"
              w="26.625rem"
              h="9rem"
              resize="none"
              ml="4rem"
              placeholder="Descrição da empresa"
              {...register('comments')}
            />
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
