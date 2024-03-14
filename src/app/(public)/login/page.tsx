'use client';
import { Link } from '@chakra-ui/next-js';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import { z } from 'zod';
import { useAuthContext } from '../../../contexts/AuthContext';
import { login } from '../../../services/api/login';

const schema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('Formato de email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export default function LoginPage() {
  const toast = useToast();
  const auth = useAuthContext();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    window.document.title = 'Forest | Login';
  }, []);

  const handleValid = async (data: z.infer<typeof schema>) => {
    try {
      const result = await login(data.email, data.password);
      auth.login(result.user.api_token);
    } catch (error) {
      console.error(error);
      toast({ description: 'Email ou senha inválidos', status: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Text
        fontSize="2xl"
        fontWeight="semibold"
        lineHeight="shorter"
      >
        Entrar
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
      <FormControl
        isDisabled={isSubmitting}
        isInvalid={!!errors.password?.message}
        mt={6}
      >
        <FormLabel>Senha</FormLabel>
        <InputGroup>
          <Input
            placeholder="Entre com sua senha"
            type={show ? 'text' : 'password'}
            {...register('password')}
          />
          <InputRightElement pr={3}>
            <Button
              _hover={{ bg: 'gray.100' }}
              bg="transparent"
              size="sm"
              onClick={() => setShow(!show)}
            >
              <Icon
                as={show ? FaEyeSlash : FaEye}
                color="#898989"
              />
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password?.message && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      <Box mt={6}>
        <Link
          color="blue.500"
          href="/forgot-password"
        >
          Esqueceu a senha?
        </Link>
      </Box>
      <Box mt={8}>
        <Button
          isLoading={isSubmitting}
          justifyContent="space-between"
          rightIcon={<Icon as={FaArrowRight} />}
          type="submit"
          w="100%"
        >
          ENTRAR
        </Button>
      </Box>
    </form>
  );
}
