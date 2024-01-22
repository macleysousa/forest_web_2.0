'use client';

import { Button, Card, Center, Flex, Grid, Icon, Image, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { InputLabel } from 'src/components/ui/InputLabel';
import { InputText } from 'src/components/ui/InputText';
import { Form } from 'src/components/ui/Form';
import { z } from 'zod';


export default function ForgotPassword() {
  const schema = z.object({
    email: z.string().min(0, 'O email é obrigatório').email('Formato de email inválido'),
  });

  const { register, control, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Center gap={4}>
      <Flex
        bg='url("background-login.png")'
        className="min-h-screen min-w-full absolute bg-cover bg-no-repeat blur-sm contrast-50"
      />

      <Image src="/petroplus.png" alt="petroplus logo" h="96px" w="400px" zIndex={1} />

      <Card className="p-8 rounded-md" h="433px" w="459px">
        <Form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
          <Grid className='gap-4' templateColumns='1fr' w='100%'>

            <InputLabel error={formState.errors.email?.message}>
              Email da Conta
              <InputText mt={2} placeholder='Digite seu email' {...register('email')} />
            </InputLabel>

            <Flex>
              <ButtonPrimary flex={1} type='submit'>
                Enviar
              </ButtonPrimary>
            </Flex>
          </Grid>

        </Form>
      </Card>
    </Center>
  );
}
