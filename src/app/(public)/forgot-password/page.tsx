'use client';
import { Link } from '@chakra-ui/next-js';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('Formato de email inválido'),
});

export default function ForgotPasswordPage() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: { email: '' },
    resolver: zodResolver(schema),
  });

  const handleValid = async () => {
    toast({
      description: 'Ação não disponível no momento',
      status: 'error',
    });
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Text
        fontSize="2xl"
        fontWeight="semibold"
        lineHeight="shorter"
      >
        Esqueceu seu senha?
      </Text>
      <Text
        color="#5A5A5A"
        fontSize="sm"
        lineHeight="tall"
        mt={6}
      >
        Nao se preocupe... Digite o e-mail da sua conta cadastrada que
        enviaremos um link para você reiniciar a sua senha
      </Text>
      <FormControl
        isDisabled={isSubmitting}
        isInvalid={!!errors.email?.message}
        mt={7}
      >
        <FormLabel>Email da Conta</FormLabel>
        <Input
          placeholder="Digite seu email"
          type="email"
          {...register('email')}
        />
        {errors.email?.message && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <Box mt={8}>
        <Button
          type="submit"
          w="100%"
        >
          Quero reiniciar minha senha
        </Button>
      </Box>
      <Box
        mt={8}
        textAlign="center"
      >
        Lembrou?{' '}
        <Link
          color="blue.500"
          href="/login"
        >
          Entrar
        </Link>
      </Box>
    </form>
  );
}
