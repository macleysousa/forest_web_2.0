import { TabPanel, Divider, Flex, Box, Text, Input, Select, Icon, Checkbox } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { InputLabel } from 'src/components/ui/InputLabel';
import { InputText } from 'src/components/ui/InputText';
import { Form } from 'src/components/ui/Form';
import { z } from 'zod';
import InputMask from 'react-input-mask';
import { MdPinDrop } from 'react-icons/md';

export default function PanelLocation() {
  const schema = z.object({
    cep: z.string().min(8, 'CEP inválido'),
    street: z.string().min(3, 'Endereço inválido'),
    number: z.string().min(1, 'Número inválido'),
    addressComplement: z.string(),
    city: z.string().min(2, 'Cidade inválida'),
    state: z.string().min(2, 'Estado inválido'),
  });

  const states: string[] = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MS',
    'MT',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

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
          <InputLabel
            my="2rem"
            display="flex"
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
            justifyContent="space-between"
            error={formState.errors.cep?.message}
          >
            <Text mb={{ base: '0', md: '1rem', lg: '1rem' }} minW="7rem">
              CEP
            </Text>
            <Input
              as={InputMask}
              mask="99999-999"
              maskChar={null}
              alwaysShowMask={false}
              ml={{ md: '0', lg: '0', xl: '3rem' }}
              placeholder="Telefone"
              {...register('cep')}
            />
          </InputLabel>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
            justifyContent="space-between"
            error={formState.errors.street?.message}
          >
            <Text mb={{ base: '0', md: '1rem', lg: '1rem' }} minW="7rem">
              Endereço
            </Text>
            <Flex direction="column" w="100%" ml={{ md: '0', lg: '0', xl: '3rem' }}>
              <Flex w="100%" mb="1rem">
                <InputText placeholder="Logradouro" {...register('street')} />
              </Flex>
              <Flex w="100%" mb="1rem">
                <InputText w="30%" placeholder="Número" {...register('number')} />
                <InputText w="70%" ml="1rem" placeholder="Complemento" {...register('addressComplement')} />
              </Flex>
              <Flex w="100%" mb="1rem">
                <InputText w="95%" placeholder="Cidade" {...register('city')} />
                <Select w="15%" ml="1rem" placeholder="UF" {...register('state')}>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
          </InputLabel>

          <Divider my="2rem" />

          <Flex direction="column">
            <ButtonPrimary w="11rem">
              <Icon as={MdPinDrop} w="24px" h="24px" />
              Geolocalizar
            </ButtonPrimary>
            ...
            <Checkbox alignItems="flex-start">
              <Text fontWeight="400">Confirmo endereço e geolocalização do cliente estão corretas</Text>
              <Text fontWeight="600">Após salvar não será mais permitido editar essas informações.</Text>
            </Checkbox>
          </Flex>

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
