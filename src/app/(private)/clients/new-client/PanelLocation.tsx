import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  Select,
  TabPanel,
  Text,
} from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MdArrowDropDown, MdPinDrop } from 'react-icons/md';
import InputMask from 'react-input-mask';
import { z } from 'zod';
import { InputLabel } from '../../../../components/InputLabel';
import { InputText } from '../../../../components/InputText';

export function PanelLocation() {
  const schema = z.object({
    addressComplement: z.string(),
    cep: z.string().min(8, 'CEP inválido'),
    city: z.string().min(2, 'Cidade inválida'),
    number: z.string().min(1, 'Número inválido'),
    state: z.string().min(2, 'Estado inválido'),
    street: z.string().min(3, 'Endereço inválido'),
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
            <Text minW="7rem">CEP</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.cep?.message}
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '90%' }}
            >
              <Input
                alwaysShowMask={false}
                as={InputMask}
                mask="99999-999"
                maskChar={null}
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '3rem' }}
                placeholder="CEP"
                w="12rem"
                {...register('cep')}
              />
            </InputLabel>
          </Flex>

          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Endereço</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '90%' }}
              error={
                formState.errors.street?.message ||
                formState.errors.number?.message ||
                formState.errors.addressComplement?.message ||
                formState.errors.city?.message ||
                formState.errors.state?.message
              }
            >
              <Flex
                direction="column"
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '3rem' }}
                w="100%"
              >
                <Flex
                  mb="1rem"
                  w="100%"
                >
                  <InputText
                    placeholder="Logradouro"
                    {...register('street')}
                  />
                </Flex>
                <Flex
                  mb="1rem"
                  w="100%"
                >
                  <InputText
                    placeholder="Número"
                    w="30%"
                    {...register('number')}
                  />
                  <InputText
                    ml="1rem"
                    placeholder="Complemento"
                    w="70%"
                    {...register('addressComplement')}
                  />
                </Flex>
                <Flex
                  mb="1rem"
                  w="100%"
                >
                  <InputText
                    placeholder="Cidade"
                    w="95%"
                    {...register('city')}
                  />
                  <Select
                    h="3rem"
                    ml="1rem"
                    placeholder="UF"
                    w="15%"
                    {...register('state')}
                    icon={<MdArrowDropDown />}
                  >
                    {states.map((state, index) => (
                      <option
                        key={index}
                        value={state}
                      >
                        {state}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Flex>
            </InputLabel>
          </Flex>

          <Divider my="2rem" />

          <Flex direction="column">
            <Button w="11rem">
              <Icon
                as={MdPinDrop}
                h="24px"
                mr="1rem"
                w="24px"
              />
              Geolocalizar
            </Button>

            <Image
              alt="geolocation pic"
              my="1rem"
              src="/geolocation.jpg"
              w="44.25rem"
            />

            <Checkbox alignItems="flex-start">
              <Text fontWeight="400">
                Confirmo endereço e geolocalização do cliente estão corretas
              </Text>
              <Text fontWeight="600">
                Após salvar não será mais permitido editar essas informações.
              </Text>
            </Checkbox>
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
