'use client';

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ButtonFilter } from '../../../components/ButtonFilter';
import { getCustomers } from '../../../services/api/customer';

export default function ClientsPage() {
  const { data } = useQuery({
    queryFn: () => getCustomers(),
    queryKey: ['customers'],
    retry: 5,
  });

  const cardsContent = [
    {
      name: 'Clientes',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value: data?.reduce((acc: number, _: any) => acc + 1, 0),
    },
    { name: 'Inadimplentes', value: '?' },
    {
      name: 'Prospectos',
      value: data?.reduce(
        (acc, curr) => (curr.status === 'Prospect' ? acc + 1 : acc),
        0,
      ),
    },
    {
      name: 'Inativos',
      value: data?.reduce(
        (acc, curr) => (curr.status === 'Inactive' ? acc + 1 : acc),
        0,
      ),
    },
    {
      name: 'Ativos',
      value: data?.reduce(
        (acc, curr) => (curr.status === 'Active' ? acc + 1 : acc),
        0,
      ),
    },
    {
      name: 'Roteirizados',
      value: data?.reduce(
        (acc, curr) => (curr.status === 'Routed' ? acc + 1 : acc),
        0,
      ),
    },
  ];

  return (
    <Box p="2rem">
      <Flex>
        <Heading
          minW="30%"
          w="30%"
        >
          Clientes
        </Heading>
        <Flex
          align="flex-end"
          gap="1rem"
          justify="flex-end"
          minW="70%"
          w="70%"
        >
          <ButtonFilter
            placeContent="flex-start"
            w="22.5rem"
          />
          <Button
            borderColor="#1E93FF"
            color="#1E93FF"
            variant="outline"
          >
            Exportar
          </Button>
          <Link
            href="/customers/new-client"
            legacyBehavior
            passHref
          >
            <Button
              as="a"
              variant="solid"
              w="9rem"
            >
              Novo
            </Button>
          </Link>
        </Flex>
      </Flex>
      <SimpleGrid
        columns={{ lg: 3, md: 3, sm: 2, xl: 6 }}
        p="2rem 0"
        spacing={{ lg: 7, md: 5, sm: 5 }}
      >
        {cardsContent.map((card, index) => (
          <Card
            key={index}
            align="center"
            h={{ '2xl': '9rem', 'base': '6rem', 'xl': '6rem' }}
            justify="center"
            variant="outline"
            w={{ '2xl': '11rem', 'base': '9rem', 'xl': '9rem' }}
          >
            <Text
              fontSize={{ '2xl': '20px', 'base': '14px', 'xl': '14px' }}
              fontWeight="500"
            >
              {card.name}
            </Text>
            <Text
              fontSize={{ '2xl': '42px', 'base': '36px', 'xl': '36px' }}
              fontWeight="700"
            >
              {card.value}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
      <TableContainer
        bg="#fff"
        borderRadius="12px"
        p="1.5rem 1rem"
      >
        <Table
          colorScheme="gray"
          fontSize="12px"
          size="xsm"
          variant="striped"
        >
          <Thead h="3rem">
            <Tr>
              <Th pl="1rem">CNPJ</Th>
              <Th w="20%">Razão Social</Th>
              <Th textAlign="center">Situação</Th>
              <Th textAlign="center">Avaliação</Th>
              <Th textAlign="center">Status</Th>
              <Th>Segmento</Th>
              <Th>Parceiro</Th>
              <Th>Cidade/UF</Th>
              <Th>Cadastro</Th>
            </Tr>
          </Thead>
          <Tbody h="3rem">
            {data?.map((customer, index) => (
              <Tr
                key={`tr-${index}`}
                h="3rem"
              >
                <Td pl="1rem">{customer?.cnpj}</Td>
                <Td
                  cursor="pointer"
                  textDecor="underline"
                >
                  <Link
                    href={`/customers/${encodeURIComponent(customer?.id)}`}
                    legacyBehavior
                    passHref
                  >
                    {customer?.social_name}
                  </Link>
                </Td>
                <Td textAlign="center">{customer?.situation}</Td>
                <Td textAlign="center">{customer?.validated}</Td>
                <Td textAlign="center">{customer?.status.charAt(0)}</Td>
                <Td>{customer?.segment?.name}</Td>
                <Td>{customer?.partner?.name || 'Não definido'}</Td>
                <Td>
                  {customer?.address?.city} / {customer?.address?.state}
                </Td>
                <Td>
                  <Badge
                    borderRadius="8px"
                    color="#00A163"
                    colorScheme="green"
                    fontSize="12px"
                    p="5px"
                  >
                    Completo
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
