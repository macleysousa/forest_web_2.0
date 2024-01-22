'use client';

import { Link } from '@chakra-ui/next-js';
import { Card, Center, Flex, Grid, Icon, Image, Text, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { z } from 'zod';

import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { Form } from 'src/components/ui/Form';
import { InputLabel } from 'src/components/ui/InputLabel';
import { InputPassword } from 'src/components/ui/InputPassword';
import { InputText } from 'src/components/ui/InputText';
import { useSession } from 'src/contexts/use-session';
import { useRouter } from 'next/navigation';

export default function Login() {
  const toast = useToast();
  const router = useRouter();
  const { signIn } = useSession();

  const schema = z.object({
    email: z.string().min(0, 'O email é obrigatório').email('Formato de email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await signIn(data.email, data.password).then((res) => {
      if (res.status === 'success') {
        router.replace('/dashboard');
      }
    }).catch(() => {
      toast({ description: 'Email ou senha inválidos', status: 'error', isClosable: true });
    });
  };

  return (
    <Center gap={4}>
      <Flex
        bg='url("background-login.png")'
        className="min-h-screen min-w-full absolute bg-cover bg-no-repeat blur-sm contrast-50"
      />

      <Image src="/petroplus.png" alt="petroplus logo" h="96px" w="400px" zIndex={1} />

      <Card className="p-8 rounded-md" h="433px" w="459px">
        <Text fontSize="24px" fontWeight="semibold">
          Entrar
        </Text>
        <Form onSubmit={handleSubmit(onSubmit, console.error)}>
          <Grid gap={4} templateColumns="1fr" w="100%">
            <InputLabel error={formState.errors.email?.message}>
              Email da Conta
              <InputText mt={2} placeholder="Digite seu email" {...register('email')} />
            </InputLabel>

            <InputLabel error={formState.errors.password?.message}>
              Senha
              <InputPassword mt={2} placeholder="Entre com sua senha" {...register('password')} />
            </InputLabel>

            <InputLabel>
              <Link href="/forgot-password" color="#1E93FF">
                Esqueceu a senha?
              </Link>
            </InputLabel>

            <Flex>
              <ButtonPrimary flex={1} type="submit" isLoading={formState.isSubmitting}>
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
