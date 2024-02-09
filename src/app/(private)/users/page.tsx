'use client';
import { Badge, Box, Flex, Heading, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { PrivateLayout } from "src/components/PrivateLayout";
import { ButtonFilter } from "src/components/ui/ButtonFilter";
import { ButtonOutline } from "src/components/ui/ButtonOutline";
import { ButtonPrimary } from "src/components/ui/ButtonPrimary";
import InputSearch from "src/components/ui/InputSearch";
import { isPrivatePage } from "src/contexts/AuthContext";

const range = (stop: number) => new Array(stop).fill(null).map((_, i) => i);

function UsersPage() {
  const router = useRouter();

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex align="center">
          <Heading size="xl" mr="auto">
            Usuários
          </Heading>
          <InputSearch placeholder="Buscar" maxW="15rem" h="2.5rem" mr="1rem" />
          <ButtonFilter h="2.5rem" mr="1rem" />
          <ButtonPrimary h="2.5rem" mr="1rem" onClick={() => router.push('/users/create')}>
            Novo Usuário
          </ButtonPrimary>
        </Flex>
        <TableContainer mt="2rem" bg="#FFFFFF" shadow="base" borderRadius="0.5rem">
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
                <Td><Box display="inline-block" w="2rem" h="2rem" bg="gray.300" borderRadius="50%" /></Td>
                <Td fontSize="sm">Mathilda Bell</Td>
                <Td fontSize="sm">napozje@paw.com</Td>
                <Td fontSize="sm">Administrador</Td>
                <Td fontSize="sm">16 Mar 2022</Td>
                <Td fontSize="sm">
                  <Badge bg="#E9F1F2" color="#70B6C1" p="0.25rem 0.75rem" borderRadius="0.25rem">
                    Ativo
                  </Badge>
                </Td>
              </Tr>
              <Tr bg="#FFFFFF">
                <Td><Box display="inline-block" w="2rem" h="2rem" bg="gray.300" borderRadius="50%" /></Td>
                <Td fontSize="sm">Ryan Stevens</Td>
                <Td fontSize="sm">lefiden@podi.gov</Td>
                <Td fontSize="sm">Vendedor</Td>
                <Td fontSize="sm">25 May 2022</Td>
                <Td></Td>
              </Tr>
              <Tr bg="#F9F9F9">
                <Td><Box display="inline-block" w="2rem" h="2rem" bg="gray.300" borderRadius="50%" /></Td>
                <Td fontSize="sm">Loretta Myers</Td>
                <Td fontSize="sm">kuw@rolluzdi.gov</Td>
                <Td fontSize="sm">Distribuidor</Td>
                <Td fontSize="sm">18 Aug 2022</Td>
                <Td></Td>
              </Tr>
              {range(7).map((key, i) => (
                <Tr key={key} bg={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'} userSelect="none">
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
        <Flex mt="2rem" align="center" justify="space-between">
          <Flex align="center" gap="0.5rem">
            <Text size="sm">
              Mostrando
            </Text>
            <Select size="xs" h="2rem">
              <option>10</option>
            </Select>
            <Text size="sm" color="#898989" whiteSpace="nowrap">
              itens por página
            </Text>
          </Flex>
          <Flex align="center" gap="1.25rem">
            <Flex gap="0.5rem">
              <ButtonOutline bg="#FFFFFF" borderColor="#1E93FF" color="#202020" size="sm">
                1
              </ButtonOutline>
              <ButtonOutline bg="transparent" borderColor="transparent" color="#202020" fontWeight="400" size="sm">
                2
              </ButtonOutline>
            </Flex>
            <Flex gap="0.5rem">
              <ButtonOutline bg="transparent" borderColor="transparent" color="#898989" fontWeight="400" size="sm">
                Próx.
              </ButtonOutline>
              <ButtonOutline bg="transparent" borderColor="transparent" color="#898989" fontWeight="400" size="sm">
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
