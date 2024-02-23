'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import { ButtonFilter } from '../../../components/ButtonFilter';

export default function ProductsPage() {
  return (
    <Box padding="2rem">
      <Flex alignItems="center">
        <Heading marginRight="auto">Lista de Produtos</Heading>
        <ButtonFilter
          marginRight="1rem"
          isDisabled
        />
        <Link
          href="/products/create"
          legacyBehavior
          passHref
        >
          <Button
            as="a"
            variant="solid"
          >
            Novo Produto
          </Button>
        </Link>
      </Flex>
      <TableContainer
        background="#FFFFFF"
        borderRadius="0.5rem"
        boxShadow="base"
        marginTop="2.375rem"
      >
        <Table fontSize="xs">
          <Thead>
            <Tr>
              <Th padding="1.25rem 0.75rem"></Th>
              <Th padding="1.25rem 0.75rem">Nome</Th>
              <Th padding="1.25rem 0.75rem">Código</Th>
              <Th padding="1.25rem 0.75rem">Categoria</Th>
              <Th
                padding="1.25rem 0.75rem"
                textAlign="center"
              >
                Segmento
              </Th>
              <Th
                padding="1.25rem 0.75rem"
                textAlign="center"
              >
                Unid. Venda (Qtd)
              </Th>
              <Th
                padding="1.25rem 0.75rem"
                textAlign="center"
              >
                Status
              </Th>
              <Th padding="1.25rem 0.75rem"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 6 })
              .fill(null)
              .map(() => window.crypto.randomUUID())
              .map((key, i) => (
                <Tr
                  key={key}
                  background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}
                >
                  <Td padding="1.25rem 0.75rem">
                    <Box
                      background="gray.100"
                      display="inline-block"
                      height="2rem"
                      width="2rem"
                    />
                  </Td>
                  <Td padding="1.25rem 0.75rem">
                    <Box
                      as="span"
                      display="inline-block"
                      maxWidth="12rem"
                      whiteSpace="normal"
                    >
                      CROT ST-2085BR FLEX TREAT 236ML REV5
                    </Box>
                  </Td>
                  <Td padding="1.25rem 0.75rem">4131205SF</Td>
                  <Td padding="1.25rem 0.75rem">Outros</Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Badge
                      background="#DFEDFA"
                      borderRadius="0.25rem"
                      color="#1E93FF"
                      padding="0.25rem 0.75rem"
                    >
                      Outros
                    </Badge>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    Un(1)
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Badge
                      background="#E9F1F2"
                      borderRadius="0.25rem"
                      color="#70B6C1"
                      padding="0.25rem 0.75rem"
                    >
                      Ativo
                    </Badge>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="end"
                  >
                    <Menu>
                      <MenuButton
                        aria-label="Opções"
                        as={IconButton}
                        color="#898989"
                        icon={<MdMoreHoriz />}
                        size="sm"
                        variant="ghost"
                      />
                      <MenuList>
                        <Link
                          href={`/products/${key}/edit`}
                          legacyBehavior
                          passHref
                        >
                          <MenuItem
                            as="a"
                            icon={<FaRegEdit fontSize="1rem" />}
                          >
                            Editar
                          </MenuItem>
                        </Link>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
