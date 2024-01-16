'use client';

import { Link } from '@chakra-ui/next-js';
import { Card, Center, Flex, Grid, Icon, Text, Image } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { z } from 'zod';

import { ButtonPrimary } from 'ui/ButtonPrimary';
import { InputLabel } from 'ui/InputLabel';
import { InputPassword } from 'ui/InputPassword';
import { InputText } from 'ui/InputText';
import { Form } from 'ui/form';

export default function Login() {

  const schema = z.object({
    email: z.string().min(0, 'O email é obrigatório').email('Formato de email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Center gap={4}>
      <Flex
        bg='url("background-login.png")'
        h='100vh'
        w='100vw'
        position='absolute'
        bgSize='cover'
        bgRepeat='no-repeat'
        className='blur-sm contrast-50' />

      <Image src='/petroplus.png' alt='petroplus logo' h='96px' w='400px' zIndex={1} />

      <Card p={4} h='433px' w='459px' borderRadius={8}>
        <Text fontSize='24px' fontWeight='semibold'>Entrar</Text>
        <Form onSubmit={handleSubmit(onSubmit, console.error)}>
          <Grid gap={4} templateColumns='1fr' w='100%'>

            <InputLabel error={formState.errors.email?.message}>
              Email da Conta
              <InputText mt={2} placeholder='Digite seu email' {...register('email')} />
            </InputLabel>

            <InputLabel error={formState.errors.password?.message}>
              Senha
              <InputPassword mt={2} placeholder='Entre com sua senha' {...register('password')} />
            </InputLabel>

            <InputLabel>
              <Link href='/forgot-password' color='#1E93FF'>Esqueceu a senha?</Link>
            </InputLabel>

            <Flex>
              <ButtonPrimary flex={1} type='submit'>
                <Text flex={1}>Entrar</Text>
                <Icon as={FaArrowRight} />
              </ButtonPrimary>
            </Flex>
          </Grid>

        </Form>
      </Card>
    </Center>
  );
}
