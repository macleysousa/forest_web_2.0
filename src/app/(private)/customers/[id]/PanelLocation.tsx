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
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MdArrowDropDown, MdPinDrop } from 'react-icons/md';
import InputMask from 'react-input-mask';
import { states } from '../../../../commons/locationUtils';
import { InputLabel } from '../../../../components/InputLabel';
import { InputText } from '../../../../components/InputText';
import { getCep } from '../../../../services/viacep/cep';

type PanelLocationProps = {
  formState: any;
  handleSubmit: any;
  onCancel: any;
  onError: any;
  onSubmit: any;
  register: any;
  setValue: any;
};

export function PanelLocation({
  formState,
  register,
  handleSubmit,
  onSubmit,
  onError,
  onCancel,
  setValue,
}: PanelLocationProps) {
  const [cep, setCep] = useState<string | null>('');
  const canFetch = !!Number(cep);

  const { data, refetch } = useQuery({
    enabled: canFetch,
    queryFn: () => getCep(cep || ''),
    queryKey: ['getCep'],
    retry: 1,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formatedValue = value.replace(/-/g, '');
    if (Number(formatedValue)) {
      setCep(formatedValue);
    }
  };

  useEffect(() => {
    refetch();
    setValue('address', data?.logradouro);
    setValue('neighborhood', data?.bairro);
    setValue('city', data?.localidade);
    setValue('state', data?.uf);
  }, [cep, data, refetch, setValue]);

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
            <Text minW="7rem">CEP</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.zip?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <Input
                alwaysShowMask={false}
                as={InputMask}
                mask="99999-999"
                maskChar={null}
                ml={{ lg: '0', md: '0', xl: '3rem' }}
                placeholder="CEP"
                w="12rem"
                {...(register('zip'),
                {
                  onChange: handleOnChange,
                })}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems="baseline"
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Endereço</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
              error={
                formState.errors.address?.message ||
                formState.errors.number?.message ||
                formState.errors.complement?.message ||
                formState.errors.city?.message ||
                formState.errors.state?.message ||
                formState.errors.neighborhood?.message
              }
            >
              <Flex
                direction="column"
                ml={{ lg: '0', md: '0', xl: '3rem' }}
                w="100%"
              >
                <Flex
                  mb="1rem"
                  w="100%"
                >
                  <InputText
                    placeholder="Logradouro"
                    {...register('address')}
                  />
                </Flex>
                <Flex
                  mb="1rem"
                  w="100%"
                >
                  <InputText
                    placeholder="Bairro"
                    {...register('neighborhood')}
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
                    {...register('complement')}
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
                    fontFamily="sans-serif"
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
            <Button
              variant="solid"
              w="11rem"
            >
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
