import { Button, Card, Center, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function ForgotPassword() {
  return (
    <Center gap={4}>
      <Flex
        bg='url("background-login.png")'
        h='100vh'
        w='100vw'
        position='absolute'
        bgSize='cover'
        bgRepeat='no-repeat'
        filter='blur(10px) contrast(0.5)' />

      <Image src='/petroplus.png' alt='petroplus logo' h='96px' w='400px' zIndex={1} />

      <Card p={8} h='433px' w='459px' borderRadius={8}>
        <Text>Esqueceu sua Senha?</Text>
        {/* <Form className='mt-4' onSubmit={handleSubmit(onSubmit, console.error)}>
          <Grid className='gap-4' templateColumns='1fr' w='100%'>

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

        </Form> */}
        <Button >Enviar</Button>
      </Card>

    </Center>
  );
}