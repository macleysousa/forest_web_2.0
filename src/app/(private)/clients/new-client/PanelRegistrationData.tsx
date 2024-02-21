import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  Select,
  TabPanel,
  Text,
  Textarea,
} from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { z } from 'zod';
import { InputLabel } from '../../../../components/InputLabel';
import { InputText } from '../../../../components/InputText';

export function PanelRegistrationData() {
  const schema = z.object({
    cnpj: z
      .string()
      .regex(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/, 'Formato inválido')
      .min(0, 'O CNPJ é obrigatório'),
    comments: z.string(),
    corporateReason: z.string().min(0, 'A Razão Social é obrigatória'),
    customerReview: z.string(),
    fantasyName: z.string(),
    ie: z.string(),
    im: z.string(),
    situation: z.string(),
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
        p="3rem 2rem 1rem 2rem"
        shadow="sm"
        // eslint-disable-next-line canonical/sort-keys
        w={{ md: '100%', lg: '100%', xl: '53rem' }}
      >
        <form onSubmit={handleSubmit(onSubmit, console.error)}>
          <Flex
            // eslint-disable-next-line canonical/sort-keys
            align={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            direction={{ md: 'column', lg: 'column', xl: 'row' }}
            mb="1rem"
          >
            <Text
              // eslint-disable-next-line canonical/sort-keys
              mb={{ base: '0', md: '1rem', lg: '1rem' }}
              // eslint-disable-next-line canonical/sort-keys
              minW={{ md: 'auto', lg: 'auto', xl: '7rem' }}
            >
              Avatar
            </Text>
            <Flex
              align="center"
              // eslint-disable-next-line canonical/sort-keys
              ml={{ base: '0', lg: '0', xl: '4rem' }}
            >
              <Box
                bg="#84818A"
                borderRadius="50%"
                h="72px"
                w="72px"
              />
              <Button
                h="2rem"
                ml="2rem"
                variant="solid"
                w="9rem"
              >
                Alterar Foto
              </Button>
              <Button
                borderColor="#1E93FF"
                color="#1E93FF"
                h="2rem"
                ml="1rem"
                variant="outline"
                w="9rem"
              >
                Apagar Foto
              </Button>
            </Flex>
          </Flex>

          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">CNPJ</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.cnpj?.message}
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '90%' }}
            >
              <Input
                alwaysShowMask={false}
                as={InputMask}
                mask="99.999.999/9999-99"
                maskChar={null}
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="CNPJ"
                {...register('cnpj')}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Razão Social</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.corporateReason?.message}
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '90%' }}
            >
              <InputText
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Nome da Empresa"
                {...register('corporateReason')}
              />
            </InputLabel>
          </Flex>

          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Nome Fantasia</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.fantasyName?.message}
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '90%' }}
            >
              <InputText
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Nome Fantasia (Se houver)"
                {...register('fantasyName')}
              />
            </InputLabel>
          </Flex>

          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">IE / IM</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.fantasyName?.message}
              flexDirection="column"
              my="1rem"
              w="100%"
            >
              <Flex w="100%">
                <InputText
                  // eslint-disable-next-line canonical/sort-keys
                  ml={{ md: '0', lg: '0', xl: '4rem' }}
                  placeholder="Inscrição Estadual"
                  w="100%"
                  {...register('ie')}
                />
                <InputText
                  ml="2rem"
                  placeholder="Inscrição Municipal"
                  w="100%"
                  {...register('im')}
                />
              </Flex>
            </InputLabel>
          </Flex>

          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Situação</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.fantasyName?.message}
              flexDirection="column"
              my="1rem"
              w="100%"
            >
              <Box
                alignItems="center"
                display="flex"
                width="100%"
              >
                <Select
                  // eslint-disable-next-line canonical/sort-keys
                  ml={{ md: '0', lg: '0', xl: '4rem' }}
                  placeholder="Situação"
                  w="25rem"
                  {...register('situation')}
                >
                  <option value="Regular">Regular</option>
                  <option value="Irregular">Irregular</option>
                </Select>
                <Checkbox ml="2rem">Termo de incentivo</Checkbox>
              </Box>
            </InputLabel>
          </Flex>

          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="8rem">Avaliação Cliente</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.customerReview?.message}
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '92.5%' }}
            >
              <InputText
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '3rem' }}
                placeholder="Avaliação Cliente"
                {...register('customerReview')}
              />
            </InputLabel>
          </Flex>

          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Observações</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.comments?.message}
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '90%' }}
            >
              <Textarea
                h="9rem"
                maxW="26.625rem"
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Descrição da empresa"
                resize="none"
                w="26.625rem"
                {...register('comments')}
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
