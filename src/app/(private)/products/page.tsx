'use client';
import { Badge, Box, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import { MdMoreHoriz } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage } from 'src/contexts/AuthContext';

function ProductsPage() {
  return (
    <PrivateLayout>
      <Box padding="2rem">
        <Flex alignItems="center">
          <Heading marginRight="auto">
            Lista de Produtos
          </Heading>
          <ButtonFilter marginRight="1rem" isDisabled />
          <Link href="/products/create" passHref legacyBehavior>
            <ButtonPrimary as="a">
              Novo Produto
            </ButtonPrimary>
          </Link>
        </Flex>
        <TableContainer marginTop="2.375rem" background="#FFFFFF" borderRadius="0.5rem" boxShadow="base">
          <Table fontSize="xs">
            <Thead>
              <Tr>
                <Th padding="1.25rem 0.75rem"></Th>
                <Th padding="1.25rem 0.75rem">Nome</Th>
                <Th padding="1.25rem 0.75rem">Código</Th>
                <Th padding="1.25rem 0.75rem">Categoria</Th>
                <Th padding="1.25rem 0.75rem" textAlign="center">Segmento</Th>
                <Th padding="1.25rem 0.75rem" textAlign="center">Unid. Venda (Qtd)</Th>
                <Th padding="1.25rem 0.75rem" textAlign="center">Status</Th>
                <Th padding="1.25rem 0.75rem"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                new Array(6).fill(null).map(() => window.crypto.randomUUID()).map((key, i) => (
                  <Tr key={key} background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}>
                    <Td padding="1.25rem 0.75rem">
                      <Box
                        display="inline-block"
                        width="2rem"
                        height="2rem"
                        background="gray.100"
                      />
                    </Td>
                    <Td padding="1.25rem 0.75rem">
                      <Box as="span" display="inline-block" maxWidth="12rem" whiteSpace="normal">
                        CROT ST-2085BR FLEX TREAT 236ML REV5
                      </Box>
                    </Td>
                    <Td padding="1.25rem 0.75rem">
                      4131205SF
                    </Td>
                    <Td padding="1.25rem 0.75rem">
                      Outros
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Badge background="#DFEDFA" color="#1E93FF" padding="0.25rem 0.75rem" borderRadius="0.25rem">
                        Outros
                      </Badge>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      Un(1)
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Badge background="#E9F1F2" color="#70B6C1" padding="0.25rem 0.75rem" borderRadius="0.25rem">
                        Ativo
                      </Badge>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="end">
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<MdMoreHoriz />}
                          aria-label="Opções"
                          size="sm"
                          variant="ghost"
                          color="#898989"
                        />
                        <MenuList>
                          <Link href={`/products/${key}/edit`} passHref legacyBehavior>
                            <MenuItem as="a" icon={<FaRegEdit fontSize="1rem" />}>
                              Editar
                            </MenuItem>
                          </Link>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(ProductsPage);
