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

import { ButtonFilter } from '../../../components/ButtonFilter';

export default function PartnersOrdersPage() {
  const cardsContent = [
    { name: 'Periodo', value: 'de 03/04 a 06/09' },
    { name: 'Qtd. Pedida', value: '76.321' },
    { name: 'Qtd. Faturada', value: '37.097' },
    { name: 'Valor Pedidos', value: 'R$ 3.250.103,99' },
    { name: 'Valor Faturado', value: 'R$ 3.250.103,99' },
    { name: 'Valor Total', value: 'R$ 3.250.103,99' },
  ];

  return (
    <Box p="2rem">
      <Flex>
        <Heading
          minW="30%"
          w="30%"
        >
          Visitas
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
            w="22rem"
          />
          <Button
            borderColor="#1E93FF"
            color="#1E93FF"
            variant="outline"
          >
            Logs
          </Button>
          <Button
            borderColor="#1E93FF"
            color="#1E93FF"
            variant="outline"
          >
            Importar
          </Button>
          <Button
            borderColor="#1E93FF"
            color="#1E93FF"
            variant="outline"
          >
            Exportar
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid
        // eslint-disable-next-line canonical/sort-keys
        columns={{ sm: 2, md: 3, lg: 3, xl: 6 }}
        p="2rem 0"
        // eslint-disable-next-line canonical/sort-keys
        spacing={{ sm: 5, md: 5, lg: 7 }}
      >
        {cardsContent.map((card, index) => (
          <Card
            key={index}
            align="center"
            // eslint-disable-next-line canonical/sort-keys
            h={{ 'base': '6rem', 'xl': '6rem', '2xl': '9rem' }}
            justify="center"
            variant="outline"
            // eslint-disable-next-line canonical/sort-keys
            w={{ 'base': '9rem', 'xl': '9rem', '2xl': '11rem' }}
          >
            <Text
              // eslint-disable-next-line canonical/sort-keys
              fontSize={{ 'base': '14px', 'xl': '14px', '2xl': '20px' }}
              fontWeight="500"
            >
              {card.name}
            </Text>
            <Text
              // eslint-disable-next-line canonical/sort-keys
              fontSize={{ 'base': '12px', 'xl': '12px', '2xl': '18px' }}
              fontWeight="700"
              textAlign={index === 0 ? 'center' : 'initial'}
              w={index === 0 ? '6rem' : 'auto'}
            >
              {card.value}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
      <TableContainer
        bg="#fff"
        borderRadius="12px"
        mt="2rem"
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
              <Tr
                key={`tr-${index}`}
                fontSize="14px"
                h="3rem"
              >
                <Td pl="1rem">
                  <Badge
                    bg="#F9837C20"
                    borderRadius="8px"
                    color="#F9837C"
                    fontSize="12px"
                    p="5px"
                  >
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
  );
}
