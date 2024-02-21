'use client';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import InputSearch from 'src/components/ui/InputSearch';
import { isPrivatePage } from 'src/contexts/AuthContext';

const range = (stop: number) =>
  Array.from({ length: stop })
    .fill(null)
    .map((_, i) => i);

function UsersPage() {
  const router = useRouter();

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex align="center">
          <Heading
            mr="auto"
            size="xl"
          >
            Usuários
          </Heading>
          <InputSearch
            h="2.5rem"
            maxW="15rem"
            mr="1rem"
            placeholder="Buscar"
          />
          <ButtonFilter
            h="2.5rem"
            mr="1rem"
          />
          <ButtonPrimary
            h="2.5rem"
            mr="1rem"
            onClick={() => router.push('/users/create')}
          >
            Novo Usuário
          </ButtonPrimary>
        </Flex>
        <TableContainer
          bg="#FFFFFF"
          borderRadius="0.5rem"
          mt="2rem"
          shadow="base"
        >
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Tipo</Th>
                <Th>Último Login</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr bg="#F9F9F9">
                <Td>
                  <Box
                    bg="gray.300"
                    borderRadius="50%"
                    display="inline-block"
                    h="2rem"
                    w="2rem"
                  />
                </Td>
                <Td fontSize="sm">Mathilda Bell</Td>
                <Td fontSize="sm">napozje@paw.com</Td>
                <Td fontSize="sm">Administrador</Td>
                <Td fontSize="sm">16 Mar 2022</Td>
                <Td fontSize="sm">
                  <Badge
                    bg="#E9F1F2"
                    borderRadius="0.25rem"
                    color="#70B6C1"
                    p="0.25rem 0.75rem"
                  >
                    Ativo
                  </Badge>
                </Td>
              </Tr>
              <Tr bg="#FFFFFF">
                <Td>
                  <Box
                    bg="gray.300"
                    borderRadius="50%"
                    display="inline-block"
                    h="2rem"
                    w="2rem"
                  />
                </Td>
                <Td fontSize="sm">Ryan Stevens</Td>
                <Td fontSize="sm">lefiden@podi.gov</Td>
                <Td fontSize="sm">Vendedor</Td>
                <Td fontSize="sm">25 May 2022</Td>
                <Td></Td>
              </Tr>
              <Tr bg="#F9F9F9">
                <Td>
                  <Box
                    bg="gray.300"
                    borderRadius="50%"
                    display="inline-block"
                    h="2rem"
                    w="2rem"
                  />
                </Td>
                <Td fontSize="sm">Loretta Myers</Td>
                <Td fontSize="sm">kuw@rolluzdi.gov</Td>
                <Td fontSize="sm">Distribuidor</Td>
                <Td fontSize="sm">18 Aug 2022</Td>
                <Td></Td>
              </Tr>
              {range(7).map((key, i) => (
                <Tr
                  key={key}
                  bg={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}
                  userSelect="none"
                >
                  <Td></Td>
                  <Td fontSize="sm">&nbsp;</Td>
                  <Td fontSize="sm">&nbsp;</Td>
                  <Td fontSize="sm">&nbsp;</Td>
                  <Td fontSize="sm">&nbsp;</Td>
                  <Td></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex
          align="center"
          justify="space-between"
          mt="2rem"
        >
          <Flex
            align="center"
            gap="0.5rem"
          >
            <Text size="sm">Mostrando</Text>
            <Select
              h="2rem"
              size="xs"
            >
              <option>10</option>
            </Select>
            <Text
              color="#898989"
              size="sm"
              whiteSpace="nowrap"
            >
              itens por página
            </Text>
          </Flex>
          <Flex
            align="center"
            gap="1.25rem"
          >
            <Flex gap="0.5rem">
              <ButtonOutline
                bg="#FFFFFF"
                borderColor="#1E93FF"
                color="#202020"
                size="sm"
              >
                1
              </ButtonOutline>
              <ButtonOutline
                bg="transparent"
                borderColor="transparent"
                color="#202020"
                fontWeight="400"
                size="sm"
              >
                2
              </ButtonOutline>
            </Flex>
            <Flex gap="0.5rem">
              <ButtonOutline
                bg="transparent"
                borderColor="transparent"
                color="#898989"
                fontWeight="400"
                size="sm"
              >
                Próx.
              </ButtonOutline>
              <ButtonOutline
                bg="transparent"
                borderColor="transparent"
                color="#898989"
                fontWeight="400"
                size="sm"
              >
                Fim
              </ButtonOutline>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(UsersPage);
