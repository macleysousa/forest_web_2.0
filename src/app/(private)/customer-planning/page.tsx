'use client';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { CgMenuGridR } from 'react-icons/cg';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage } from 'src/contexts/AuthContext';

function CustomerPlanningPage() {
  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex alignItems="center">
          <Heading marginRight="auto">Planejamento de Clientes</Heading>
          <ButtonFilter
            justifyContent="flex-start"
            marginRight="1rem"
            width="22.5rem"
            isDisabled
          />
          <ButtonPrimary
            leftIcon={<CgMenuGridR fontSize="1.5rem" />}
            isDisabled
          >
            Dashboard
          </ButtonPrimary>
        </Flex>
        <Flex
          justifyContent="space-between"
          marginLeft="auto"
          marginRight="auto"
          marginTop="1.75rem"
          maxWidth="80rem"
        >
          {[
            { label: 'Totais', value: 364 },
            { label: 'Ativos', value: 364 },
            { label: 'Inativos', value: 364 },
            { label: 'Prospects', value: 364 },
            { label: 'Volume Mix', value: 25 },
          ].map(({ label, value }) => (
            <Flex
              key={label}
              background="#FFFFFF"
              border="1px solid #DCDCDC"
              borderRadius="0.5rem"
              flexDirection="column"
              height="6.8125rem"
              paddingBottom="1.25rem"
              paddingTop="1.25rem"
              textAlign="center"
              width="9rem"
            >
              <Text fontSize="sm">{label}</Text>
              <Flex
                alignItems="center"
                flexGrow="1"
                justifyContent="center"
              >
                <Text
                  fontSize="4xl"
                  fontWeight="700"
                >
                  {value}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
        <TableContainer
          background="#FFFFFF"
          borderRadius="0.5rem"
          boxShadow="base"
          marginTop="2rem"
        >
          <Table>
            <Thead>
              <Tr>
                <Th>Região</Th>
                <Th>Segmento</Th>
                <Th>Parceiro</Th>
                <Th>Bandeira</Th>
                <Th>Cliente</Th>
                <Th>Cidade</Th>
                <Th>Status</Th>
                <Th>Frentistas/Consultores</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({ length: 6 })
                .fill(null)
                .map((_, i) => i)
                .map((key, i) => (
                  <Tr
                    key={key}
                    background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}
                  >
                    <Td
                      padding="1.25rem 0.75rem"
                      textAlign="center"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                      >
                        3R - Vitória
                      </Text>
                    </Td>
                    <Td
                      padding="1.25rem 0.75rem"
                      textAlign="center"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                      >
                        Outros
                      </Text>
                    </Td>
                    <Td
                      padding="1.25rem 0.75rem"
                      textAlign="center"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                      >
                        Bosch
                      </Text>
                    </Td>
                    <Td
                      padding="1.25rem 0.75rem"
                      textAlign="center"
                    >
                      <Text
                        as="span"
                        display="inline-block"
                        fontSize="xs"
                        lineHeight="1rem"
                        maxWidth="4rem"
                        whiteSpace="normal"
                      >
                        Bosch - Integração
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem">
                      <Box
                        display="inline-flex"
                        flexDirection="column"
                        gap="0.5rem"
                      >
                        <Text
                          as="span"
                          fontSize="xs"
                          textDecoration="underline"
                        >
                          DIVEL DISTRI DE VEICULOS LTDA
                        </Text>
                        <Text
                          as="span"
                          background="#E9F1F2"
                          color="#70B6C1"
                          fontSize="xs"
                          textAlign="center"
                        >
                          759.288.380/001-49
                        </Text>
                      </Box>
                    </Td>
                    <Td
                      padding="1.25rem 0.75rem"
                      textAlign="center"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                      >
                        Campinas
                      </Text>
                    </Td>
                    <Td
                      padding="1.25rem 0.75rem"
                      textAlign="center"
                    >
                      <Badge
                        background="#DBEEE7"
                        color="#00A163"
                      >
                        A
                      </Badge>
                    </Td>
                    <Td
                      padding="1.25rem 0.75rem"
                      textAlign="center"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                      >
                        -
                      </Text>
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

export default isPrivatePage(CustomerPlanningPage);
