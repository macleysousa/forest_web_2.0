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
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import Authorized from 'src/layouts/authorized/Authorized';
import { useRouter } from 'next/navigation';

export default function Clients() {
  const router = useRouter();

  const cardsContent = [
    { name: 'Clientes', value: '12' },
    { name: 'Clientes', value: '9' },
    { name: 'Clientes', value: '2' },
    { name: 'Clientes', value: '1' },
    { name: 'Clientes', value: '46' },
    { name: 'Clientes', value: '84' },
  ];

  const handleNewClient = () => {
    router.push('/clients/new-client');
  };

  return (
    <Authorized>
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
            <ButtonPrimary onClick={handleNewClient} w="9rem">
              Novo
            </ButtonPrimary>
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
                <Th>Razão Social</Th>
                <Th>Situação</Th>
                <Th>Avaliação</Th>
                <Th>Status</Th>
                <Th>Segmento</Th>
                <Th>Parceiro</Th>
                <Th>Cidade/UF</Th>
                <Th>Cadastro</Th>
              </Tr>
            </Thead>
            <Tbody h="3rem">
              {Array.apply(0, Array(10)).map((_, index) => (
                <Tr key={`tr-${index}`} h="3rem">
                  <Td pl="1rem">04043949000472</Td>
                  <Td textDecor="underline">ACREDIESEL COMERCIAL DE VEÍCULOS LTDA</Td>
                  <Td>Regular</Td>
                  <Td>Latão</Td>
                  <Td>P</Td>
                  <Td>Agro</Td>
                  <Td>Bosch</Td>
                  <Td>Rio Branco / AC</Td>
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
    </Authorized>
  );
}
