import { TabPanel, Flex, Select, Divider, Box, Input, Text } from '@chakra-ui/react';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { InputLabel } from 'src/components/ui/InputLabel';
import { Form } from 'src/components/ui/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function PanelSegmentation() {
  const schema = z.object({
    segment: z.string().min(1, 'Segmento inválido'),
    partner: z.string().min(1, 'Parceiro inválido'),
    flag: z.string().min(1, 'Bandeira inválida'),
    net: z.string().min(1, 'Net inválida'),
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
          <InputLabel
            my="2rem"
            display="flex"
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
            justifyContent="space-between"
            error={formState.errors.segment?.message}
          >
            <Text mb={{ base: '0', md: '1rem', lg: '1rem' }} minW="7rem">
              Segmento
            </Text>
            <Select ml={{ md: '0', lg: '0', xl: '4rem' }} placeholder="Segmento" {...register('segment')}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </InputLabel>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
            justifyContent="space-between"
            error={formState.errors.partner?.message}
          >
            <Text mb={{ base: '0', md: '1rem', lg: '1rem' }} minW="7rem">
              Parceiro
            </Text>
            <Select ml={{ md: '0', lg: '0', xl: '4rem' }} placeholder="Parceiro" {...register('partner')}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </InputLabel>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
            justifyContent="space-between"
            error={formState.errors.flag?.message}
          >
            <Text mb={{ base: '0', md: '1rem', lg: '1rem' }} minW="7rem">
              Bandeira
            </Text>
            <Select ml={{ md: '0', lg: '0', xl: '4rem' }} placeholder="Bandeira" {...register('flag')}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </InputLabel>
          <InputLabel
            my="2rem"
            display="flex"
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
            justifyContent="space-between"
            error={formState.errors.net?.message}
          >
            <Text mb={{ base: '0', md: '1rem', lg: '1rem' }} minW="7rem">
              Rede
            </Text>
            <Select ml={{ md: '0', lg: '0', xl: '4rem' }} placeholder="Rede" {...register('net')}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </InputLabel>
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
