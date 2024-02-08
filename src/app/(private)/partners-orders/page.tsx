'use client';

import {
  Badge,
  Box,
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
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { isPrivatePage } from 'src/contexts/AuthContext';

function PartnersOrdersPage() {
  const cardsContent = [
    { name: 'Periodo', value: 'de 03/04 a 06/09' },
    { name: 'Qtd. Pedida', value: '76.321' },
    { name: 'Qtd. Faturada', value: '37.097' },
    { name: 'Valor Pedidos', value: 'R$ 3.250.103,99' },
    { name: 'Valor Faturado', value: 'R$ 3.250.103,99' },
    { name: 'Valor Total', value: 'R$ 3.250.103,99' },
  ];

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex>
          <Heading w="30%" minW="30%">
            Visitas
          </Heading>
          <Flex align="flex-end" justify="flex-end" minW="70%" w="70%" gap="1rem">
            <ButtonFilter placeContent="flex-start" w="22rem" />
            <ButtonOutline color="#1E93FF" borderColor="#1E93FF">
              Logs
            </ButtonOutline>
            <ButtonOutline color="#1E93FF" borderColor="#1E93FF">
              Importar
            </ButtonOutline>
            <ButtonOutline color="#1E93FF" borderColor="#1E93FF">
              Exportar
            </ButtonOutline>
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
              <Text
                w={index === 0 ? '6rem' : 'auto'}
                textAlign={index === 0 ? 'center' : 'initial'}
                fontWeight="700"
                fontSize={{ base: '12px', xl: '12px', '2xl': '18px' }}
              >
                {card.value}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
        <TableContainer p="1.5rem 1rem" bg="#fff" borderRadius="12px" mt="2rem">
          <Table variant="striped" colorScheme="gray" size="xsm" fontSize="12px">
            <Thead h="3rem">
              <Tr>
                <Th pl="1rem">Status</Th>
                <Th>Parceiro</Th>
                <Th>Ator</Th>
                <Th>Razão Social</Th>
                <Th>CNPJ</Th>
                <Th>Código DN</Th>
                <Th>Número</Th>
              </Tr>
            </Thead>
            <Tbody h="3rem">
              {Array.apply(0, Array(10)).map((_, index) => (
                <Tr key={`tr-${index}`} h="3rem" fontSize="14px">
                  <Td pl="1rem">
                    <Badge fontSize="12px" color="#F9837C" p="5px" borderRadius="8px" bg="#F9837C20">
                      Pendente
                    </Badge>
                  </Td>
                  <Td>Jeep</Td>
                  <Td>KFP - CONCESSIONÁRIA CE I</Td>
                  <Td>NEWSEDAN COMERCIO</Td>
                  <Td>45.567.567/0001-45</Td>
                  <Td>Agro</Td>
                  <Td>Rio Branco / AC</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(PartnersOrdersPage);
