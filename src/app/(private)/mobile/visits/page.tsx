'use client';

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdApps } from 'react-icons/md';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage } from 'src/contexts/AuthContext';

function VisitsPage() {
  const router = useRouter();

  const [dashboardStatus, setDashboardStatus] = useState<boolean>(true);

  const cardsContent = [
    { name: 'Válidas', value: '374' },
    { name: 'Inválidas', value: '239' },
    { name: 'Fora de Rota', value: '22' },
    { name: 'Fora de Roteiro', value: '190' },
    { name: 'Ignoradas', value: '460' },
    { name: 'Tempo Médio', value: '460' },
  ];

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex>
          <Heading w="30%" minW="30%">
            Visitas
          </Heading>
          <Flex align="flex-end" justify="flex-end" minW="70%" w="70%" gap="1rem">
            <ButtonFilter placeContent="flex-start" w="22.5rem" />
            <ButtonPrimary onClick={() => setDashboardStatus(!dashboardStatus)} w="9rem" p="0 1rem">
              <Icon as={MdApps} mr="1rem" h="24px" w="24px" />
              Dashboard
            </ButtonPrimary>
            <ButtonOutline color="#1E93FF" borderColor="#1E93FF">
              Exportar
            </ButtonOutline>
          </Flex>
        </Flex>
        {dashboardStatus && (
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
        )}
        <TableContainer p="1.5rem 1rem" bg="#fff" borderRadius="12px" mt={!dashboardStatus ? '2rem' : '0'}>
          <Table variant="striped" colorScheme="gray" size="xsm" fontSize="12px">
            <Thead h="3rem">
              <Tr>
                <Th pl="1rem">Status</Th>
                <Th textAlign="center">Data Checkin</Th>
                <Th textAlign="center">Vendedor</Th>
                <Th textAlign="center">Região</Th>
                <Th textAlign="center">Cliente</Th>
                <Th textAlign="center">Pedido</Th>
                <Th textAlign="center">Observação</Th>
                <Th textAlign="center">Motivo Não-Venda</Th>
              </Tr>
            </Thead>
            <Tbody h="3rem">
              {Array.apply(0, Array(10)).map((_, index) => (
                <Tr key={`tr-${index}`} h="3.5rem" fontSize="14px">
                  <Td pl="1rem">
                    {/* <Badge fontSize="12px" color="#1E93FF" p=".75rem" borderRadius="8px" bg="#1E93FF20">
                      Válida
                    </Badge> */}
                    <Badge fontSize="12px" color="#775DA6" p=".75rem" borderRadius="8px" bg="#775DA620">
                      Inválida
                    </Badge>
                  </Td>
                  <Td textAlign="center" cursor="pointer">
                    19/04/2023 as 14h23
                  </Td>
                  <Td textAlign="center">Júlio Cesar</Td>
                  <Td textAlign="center">LMATTOS - Parceiro 1</Td>
                  <Td textAlign="center">Posto Dálmatas Ltda.</Td>
                  <Td
                    textDecor="underline"
                    color="#1E93FF"
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => router.push(`/mobile/order-details/${encodeURIComponent(index)}`)}
                  >
                    21844
                  </Td>
                  <Td textAlign="center">Só Bardal</Td>
                  <Td textAlign="center">Cliente Estocado</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(VisitsPage);
