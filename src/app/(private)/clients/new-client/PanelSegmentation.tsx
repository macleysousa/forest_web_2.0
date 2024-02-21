import {
  Box,
  Button,
  Divider,
  Flex,
  Select,
  TabPanel,
  Text,
} from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InputLabel } from '../../../../components/InputLabel';

export function PanelSegmentation() {
  const schema = z.object({
    flag: z.string(),
    net: z.string(),
    partner: z.string().min(1, 'Parceiro inválido'),
    segment: z.string().min(1, 'Segmento inválido'),
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
            align={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Segmento</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.segment?.message}
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '90%' }}
            >
              <Select
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Definir o Segmento"
                {...register('segment')}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </InputLabel>
          </Flex>
          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Parceiro</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.partner?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <Select
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Definir o Parceiro"
                {...register('partner')}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </InputLabel>
          </Flex>
          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Bandeira</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.flag?.message}
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '90%' }}
            >
              <Select
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Definir a Bandeira (quando aplicável)"
                {...register('flag')}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </InputLabel>
          </Flex>
          <Flex
            // eslint-disable-next-line canonical/sort-keys
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            // eslint-disable-next-line canonical/sort-keys
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text
              // eslint-disable-next-line canonical/sort-keys
              mb={{ base: '0', md: '1rem', lg: '1rem' }}
              minW="7rem"
            >
              Rede
            </Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.net?.message}
              flexDirection="column"
              my="1rem"
              // eslint-disable-next-line canonical/sort-keys
              w={{ md: '100%', lg: '100%', xl: '90%' }}
            >
              <Select
                // eslint-disable-next-line canonical/sort-keys
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Definir a Rede (quando aplicável)"
                {...register('net')}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
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
