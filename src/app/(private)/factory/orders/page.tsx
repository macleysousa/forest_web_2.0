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
import { useState } from 'react';
import { MdApps } from 'react-icons/md';
import ModalFactoryImport from 'src/components/ModalFactoryImport';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { isPrivatePage } from 'src/contexts/AuthContext';

const cardsContent = [
  { name: 'Pedidos', value: '12' },
  { name: 'Pendentes', value: '9' },
  { name: 'Faturados', value: '2' },
  { name: 'Cobertura', value: '1' },
  { name: 'Programados', value: '46' },
  { name: 'Bonificação', value: '84' },
];

function FabricOrdersPage() {
  const [dashboardStatus, setDashboardStatus] = useState(true);

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex>
          <Heading
            minW="30%"
            w="30%"
          >
            Pedidos Fábrica
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
            <ModalFactoryImport
              buttonTitle="Importar"
              buttonProps={{
                color: '#1E93FF',
                borderColor: '#1E93FF',
                variant: 'outline',
              }}
            />
            <ButtonOutline
              borderColor="#1E93FF"
              color="#1E93FF"
            >
              Exportar
            </ButtonOutline>
            <Button
              borderColor={!dashboardStatus ? '#89898970' : 'auto'}
              color={!dashboardStatus ? '#898989' : 'inherit'}
              p="0 1rem"
              variant={!dashboardStatus ? 'outline' : 'primary'}
              w="9rem"
              onClick={() => setDashboardStatus(!dashboardStatus)}
            >
              <Icon
                as={MdApps}
                h="24px"
                mr="1rem"
                w="24px"
              />
              Dashboard
            </Button>
          </Flex>
        </Flex>

        {dashboardStatus && (
          <SimpleGrid
            columns={{ sm: 2, md: 3, lg: 3, xl: 6 }}
            p="2rem 0"
            spacing={{ sm: 5, md: 5, lg: 7 }}
          >
            {cardsContent.map((card, index) => (
              <Card
                key={index}
                align="center"
                h={{ 'base': '6rem', 'xl': '6rem', '2xl': '9rem' }}
                justify="center"
                variant="outline"
                w={{ 'base': '9rem', 'xl': '9rem', '2xl': '11rem' }}
              >
                <Text
                  fontSize={{ 'base': '14px', 'xl': '14px', '2xl': '20px' }}
                  fontWeight="500"
                >
                  {card.name}
                </Text>
                <Text
                  fontSize={{ 'base': '36px', 'xl': '36px', '2xl': '42px' }}
                  fontWeight="700"
                >
                  {card.value}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        )}
        <TableContainer
          bg="#fff"
          borderRadius="12px"
          mt={!dashboardStatus ? '2rem' : '0'}
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
                <Th pl="1rem">Status</Th>
                <Th textAlign="center">Data</Th>
                <Th textAlign="center">pedido</Th>
                <Th textAlign="center">Ator</Th>
                <Th textAlign="center">Cliente</Th>
                <Th w="4%">UF</Th>
                <Th textAlign="center">Pgto</Th>
              </Tr>
            </Thead>
            <Tbody h="3rem">
              {Array.apply(0, Array(10)).map((_, index) => (
                <Tr
                  key={`tr-${index}`}
                  h="3rem"
                >
                  <Td pl="1rem">
                    <Badge
                      bg="#775DA620"
                      borderRadius="8px"
                      color="#775DA6"
                      fontSize="12px"
                      p="5px"
                    >
                      Faturamento
                    </Badge>
                  </Td>
                  <Td
                    textAlign="center"
                    textDecor="underline"
                  >
                    27/04/2023 13h23
                  </Td>
                  <Td textAlign="center">
                    17823{' '}
                    <Badge
                      bg="#775DA620"
                      borderRadius="8px"
                      color="#775DA6"
                      fontSize="12px"
                      p="5px"
                    >
                      B
                    </Badge>
                  </Td>
                  <Td textAlign="center">Aline Magalhães</Td>
                  <Td textAlign="center">
                    PPK DIst. Autopeças LTDA 43.823.823/0001-41
                  </Td>
                  <Td>UF</Td>
                  <Td textAlign="center">DL28</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(FabricOrdersPage);
