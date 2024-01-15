import { Button, Card, Center, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function ForgotPassword() {
  return (
    <Center>
      <Flex
        bg='url("background-login.png")'
        className='min-h-screen min-w-full absolute bg-cover bg-no-repeat blur-md contrast-50'
      />

      <Image src='/petroplus.png' alt='petroplus logo' h='96px' w='400px' zIndex={1} />

      <Card className='p-8' h='433px' w='459px' borderRadius={8}>
        <Text className='text-2xl font-semibold'>Esqueceu sua Senha?</Text>
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