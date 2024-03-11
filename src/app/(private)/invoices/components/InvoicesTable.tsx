'use client';

import {
  Badge,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { GetNFEsResult } from '../../../../services/api/nfes';

type InvoicesTableProps = {
  pages: GetNFEsResult[] | undefined;
};

const formatCNPJ = (cnpj: string) =>
  cnpj.replace(/^(\d{3})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

export function InvoicesTable({ pages }: InvoicesTableProps) {
  if (!pages) {
    return null;
  }

  const nfes = pages.flatMap((page) => page.nfes.data);

  if (nfes.length === 0) {
    return (
      <Box
        bg="white"
        borderRadius="md"
        p={4}
        shadow="base"
      >
        <Text
          color="gray.500"
          fontSize="sm"
          textAlign="center"
        >
          Nenhuma nota fiscal encontrada
        </Text>
      </Box>
    );
  }

  return (
    <TableContainer
      background="#FFFFFF"
      borderRadius="sm"
      boxShadow="base"
    >
      <Table>
        <Thead>
          <Tr>
            <Th textTransform="none">Emissor</Th>
            <Th
              textAlign="center"
              textTransform="none"
            >
              Número
            </Th>
            <Th
              textAlign="center"
              textTransform="none"
            >
              Tipo
            </Th>
            <Th
              textAlign="center"
              textTransform="none"
            >
              Data de Emissão
            </Th>
            <Th
              textAlign="center"
              textTransform="none"
            >
              Cliente
            </Th>
            <Th
              textAlign="center"
              textTransform="none"
            >
              Cidade/UF
            </Th>
            <Th
              textAlign="center"
              textTransform="none"
            >
              Segmento
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {nfes.map((nfe, i) => (
            <Tr
              key={`${nfe.id}-${i}`}
              background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}
            >
              <Td padding="1.25rem 0.75rem">
                <Box
                  alignItems="center"
                  display="inline-flex"
                  flexDirection="column"
                  gap="0.5rem"
                  w="100%"
                >
                  <Text
                    as="span"
                    fontSize="xs"
                    textDecoration="underline"
                  >
                    {nfe.customer_emitter_social_name}
                  </Text>
                  <Text
                    as="span"
                    background="#E9F1F2"
                    color="#70B6C1"
                    fontSize="xs"
                    textAlign="center"
                    w="100%"
                  >
                    {formatCNPJ(nfe.customer_emitter_cnpj)}
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
                  {nfe.number_nfe}
                </Text>
              </Td>
              <Td
                padding="1.25rem 0.75rem"
                textAlign="center"
              >
                <Badge
                  background="#E9E6EF"
                  color="#775DA6"
                >
                  {nfe.type}
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
                  {(nfe.date.split(' ')[0] ?? '')
                    .split('-')
                    .reverse()
                    .join('/')}
                </Text>
                <br />
                <Text
                  as="span"
                  fontSize="xs"
                >
                  {(nfe.date.split(' ')[1] ?? '').replace(
                    /^(\d{2}:\d{2}):\d{2}$/,
                    '$1',
                  )}
                </Text>
              </Td>
              <Td padding="1.25rem 0.75rem">
                <Box
                  alignItems="center"
                  display="inline-flex"
                  flexDirection="column"
                  gap="0.5rem"
                  w="100%"
                >
                  <Text
                    as="span"
                    fontSize="xs"
                    textDecoration="underline"
                  >
                    {nfe.customer_receiver_social_name}
                  </Text>
                  <Text
                    as="span"
                    background="#E9F1F2"
                    color="#70B6C1"
                    fontSize="xs"
                    textAlign="center"
                    w="100%"
                  >
                    {formatCNPJ(nfe.customer_receiver_cnpj)}
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
                  {nfe.city} - {nfe.state}
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
                  {nfe.segment_name}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
