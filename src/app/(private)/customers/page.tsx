'use client';

import {
  Box,
  Card,
  Text,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  TableContainer,
  Th,
  Tr,
  Thead,
  Tbody,
  Td,
  Badge,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { isPrivatePage } from 'src/contexts/AuthContext';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { getCustomers } from 'src/services/api/customer';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function ClientsPage() {
  const router = useRouter();

  const { data } = useQuery({ queryKey: ['customers'], retry: 5, queryFn: () => getCustomers() });

  const cardsContent = [
    { name: 'Clientes', value: data?.reduce((acc, _) => acc + 1, 0) },
    { name: 'Inadimplentes', value: '?' },
    { name: 'Prospectos', value: data?.reduce((acc, curr) => (curr.status === 'Prospect' ? acc + 1 : acc), 0) },
    { name: 'Inativos', value: data?.reduce((acc, curr) => (curr.status === 'Inactive' ? acc + 1 : acc), 0) },
    { name: 'Ativos', value: data?.reduce((acc, curr) => (curr.status === 'Active' ? acc + 1 : acc), 0) },
    { name: 'Roteirizados', value: data?.reduce((acc, curr) => (curr.status === 'Routed' ? acc + 1 : acc), 0) },
  ];

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex>
          <Heading w="30%" minW="30%">
            Clientes
          </Heading>
          <Flex align="flex-end" justify="flex-end" minW="70%" w="70%" gap="1rem">
            <ButtonFilter placeContent="flex-start" w="22.5rem" />
            <ButtonOutline color="#1E93FF" borderColor="#1E93FF">
              Exportar
            </ButtonOutline>
            <Link href="/clients/new-client" passHref legacyBehavior>
              <ButtonPrimary as="a" w="9rem">
                Novo
              </ButtonPrimary>
            </Link>
          </Flex>
        </Flex>
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 3, xl: 6 }} spacing={{ sm: 5, md: 5, lg: 7 }} p="2rem 0">
          {cardsContent.map((card, index) => (
            <Card
              variant="outline"
              w={{ base: '9rem', xl: '9rem', '2xl': '11rem' }}
              h={{ base: '6rem', xl: '6rem', '2xl': '9rem' }}
              justify="center"
              align="center"
              key={index}
            >
              <Text fontWeight="500" fontSize={{ base: '14px', xl: '14px', '2xl': '20px' }}>
                {card.name}
              </Text>
              <Text fontWeight="700" fontSize={{ base: '36px', xl: '36px', '2xl': '42px' }}>
                {card.value}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
        <TableContainer p="1.5rem 1rem" bg="#fff" borderRadius="12px">
          <Table variant="striped" colorScheme="gray" size="xsm" fontSize="12px">
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
                <Tr key={`tr-${index}`} h="3rem">
                  <Td pl="1rem">{customer?.cnpj}</Td>
                  <Td
                    textDecor="underline"
                    cursor="pointer"
                    onClick={() => router.push(`/customers/${encodeURIComponent(customer?.id)}`)}
                  >
                    {customer?.social_name}
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
                    <Badge fontSize="12px" color="#00A163" p="5px" borderRadius="8px" colorScheme="green">
                      Completo
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(ClientsPage);
