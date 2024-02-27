'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdArrowDropDown, MdMoreHoriz, MdSearch } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { getProducts } from '../../../services/api/products';

export default function ProductsPage() {
  const toast = useToast();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState<number | null>(null);

  const query = useQuery({
    queryFn: ({ signal }) => getProducts({ signal }),
    queryKey: ['products'],
  });

  useEffect(() => {
    if (!query.error) return;
    toast({ description: query.error.message, status: 'error' });
  }, [query.error, toast]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOffset(0);
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const products = query.data?.categories
    .flatMap((category) => category.products)
    .filter((product) => {
      if (status === null) return true;
      return product.status === status;
    })
    .filter((product) => {
      if (!debouncedSearch) return true;
      const lowerCase = (value: string) => value.toLocaleLowerCase('pt-BR');

      const lowercaseSearch = lowerCase(debouncedSearch);

      const name = lowerCase(product.name);
      if (name.includes(lowercaseSearch)) return true;

      const code = lowerCase(product.code);
      if (code.includes(lowercaseSearch)) return true;

      const categoryName = lowerCase(product.category.name);
      if (categoryName.includes(lowercaseSearch)) return true;

      for (const segment of product.segments) {
        const segmentName = lowerCase(segment.name);
        if (segmentName.includes(lowercaseSearch)) return true;
      }

      return false;
    });

  const handlePageChange = (event: { selected: number }) => {
    if (!products) return;
    setOffset((event.selected * limit) % products.length);
  };

  const handleLimitChange = (value: number) => () => {
    if (value === limit) return;
    setOffset(0);
    setLimit(value);
  };

  const handleStatusChange = (value: number | null) => () => {
    if (value === status) return;
    setOffset(0);
    setStatus(value);
  };

  return (
    <Box padding="2rem">
      <Flex
        align="center"
        gap="1rem"
      >
        <Heading
          flexShrink={0}
          mr="auto"
        >
          Lista de Produtos
        </Heading>
        <InputGroup w="15rem">
          <InputLeftElement pointerEvents="none">
            <Icon
              as={MdSearch}
              color="#898989"
            />
          </InputLeftElement>
          <Input
            bg="white"
            placeholder="Busque um produto"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Menu>
          <MenuButton
            _active={{ bg: 'gray.300' }}
            _hover={{ _disabled: { bg: 'gray.200' }, bg: 'gray.200' }}
            as={Button}
            bg="white"
            border="1px solid #DCDCDC"
            color="gray.800"
            fontWeight="400"
            h="3rem"
            rightIcon={<MdArrowDropDown color="#898989" />}
            size="sm"
          >
            <Text
              as="span"
              color="#898989"
              display="inline-block"
              mr={status !== null ? '0.25rem' : '0'}
            >
              Status{status !== null ? ':' : ''}
            </Text>
            {status !== null && (status ? 'Ativo' : 'Inativo')}
          </MenuButton>
          <MenuList>
            <MenuItem
              fontSize="sm"
              onClick={handleStatusChange(null)}
            >
              Nenhum
            </MenuItem>
            <MenuItem
              fontSize="sm"
              onClick={handleStatusChange(1)}
            >
              Ativo
            </MenuItem>
            <MenuItem
              fontSize="sm"
              onClick={handleStatusChange(0)}
            >
              Inativo
            </MenuItem>
          </MenuList>
        </Menu>
        <Button
          as={Link}
          flexShrink={0}
          href="/products/create"
          size="sm"
          variant="solid"
        >
          Novo Produto
        </Button>
      </Flex>
      <TableContainer
        bg="#FFFFFF"
        borderRadius="0.5rem"
        boxShadow="base"
        mt="2.375rem"
      >
        <Table fontSize="xs">
          <Thead>
            <Tr>
              <Th p="1.25rem 0.75rem"></Th>
              <Th p="1.25rem 0.75rem">Nome</Th>
              <Th p="1.25rem 0.75rem">Código</Th>
              <Th p="1.25rem 0.75rem">Categoria</Th>
              <Th p="1.25rem 0.75rem">Segmento</Th>
              <Th
                p="1.25rem 0.75rem"
                textAlign="center"
              >
                Unid. Venda (Qtd)
              </Th>
              <Th
                p="1.25rem 0.75rem"
                textAlign="center"
              >
                Status
              </Th>
              <Th p="1.25rem 0.75rem"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.slice(offset, offset + limit).map((product, i) => (
              <Tr
                key={product.id}
                bg={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}
              >
                <Td p="1.25rem 0.75rem">
                  {product.image ? (
                    <Image
                      alt=""
                      h="2rem"
                      src={product.image}
                      w="2rem"
                    />
                  ) : (
                    <Box
                      bg="gray.100"
                      display="inline-block"
                      h="2rem"
                      w="2rem"
                    />
                  )}
                </Td>
                <Td p="1.25rem 0.75rem">
                  <Box
                    as="span"
                    display="inline-block"
                    maxW="12rem"
                    whiteSpace="normal"
                  >
                    {product.name}
                  </Box>
                </Td>
                <Td p="1.25rem 0.75rem">{product.code}</Td>
                <Td p="1.25rem 0.75rem">{product.category.name}</Td>
                <Td p="1.25rem 0.75rem">
                  <Box
                    as="span"
                    display="inline-flex"
                    flexShrink={0}
                    flexWrap="wrap"
                    gap="0.5rem"
                    minW="20rem"
                  >
                    {product.segments.map((segment) => (
                      <Badge
                        key={segment.id}
                        bg="#DFEDFA"
                        borderRadius="0.25rem"
                        color="#1E93FF"
                        p="0.125rem 0.5rem"
                        size="sm"
                      >
                        {segment.name}
                      </Badge>
                    ))}
                  </Box>
                </Td>
                <Td
                  padding="1.25rem 0.75rem"
                  textAlign="center"
                >
                  {product.unity}
                </Td>
                <Td
                  padding="1.25rem 0.75rem"
                  textAlign="center"
                >
                  <Badge
                    background={product.status ? '#E9F1F2' : 'gray.100'}
                    borderRadius="0.25rem"
                    color={product.status ? '#70B6C1' : 'gray.800'}
                    p="0.125rem 0.5rem"
                    size="sm"
                  >
                    {product.status ? 'Ativo' : 'Inativo'}
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
                        href={`/products/${product.id}/edit`}
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
      {products && (
        <Flex
          align="center"
          justifyContent="space-between"
          mt="2rem"
        >
          <Box
            fontSize="0.875rem"
            lineHeight="1rem"
          >
            Mostrando&nbsp;
            <Menu>
              <MenuButton
                _active={{ bg: 'gray.300' }}
                _hover={{ _disabled: { bg: 'gray.200' }, bg: 'gray.200' }}
                as={Button}
                bg="white"
                border="1px solid #DCDCDC"
                color="gray.800"
                fontWeight="400"
                h="2rem"
                rightIcon={<MdArrowDropDown color="#898989" />}
                size="sm"
              >
                {limit}
              </MenuButton>
              <MenuList>
                <MenuItem
                  fontSize="sm"
                  onClick={handleLimitChange(10)}
                >
                  10
                </MenuItem>
                <MenuItem
                  fontSize="sm"
                  onClick={handleLimitChange(25)}
                >
                  25
                </MenuItem>
                <MenuItem
                  fontSize="sm"
                  onClick={handleLimitChange(50)}
                >
                  50
                </MenuItem>
                <MenuItem
                  fontSize="sm"
                  onClick={handleLimitChange(100)}
                >
                  100
                </MenuItem>
              </MenuList>
            </Menu>
            <Box
              as="span"
              color="#898989"
            >
              &nbsp;itens por página
            </Box>
          </Box>
          <Box
            sx={{
              '& li a': {
                alignItems: 'center',
                display: 'flex',
                fontSize: '0.857rem',
                justifyContent: 'center',
                lineHeight: '1rem',
                minH: '2rem',
                minW: '2rem',
              },
              '& li.next': {
                ml: '1.25rem',
              },
              '& li.next.disabled, & li.previous.disabled': {
                '& a': { cursor: 'default' },
                'color': '#898989',
              },
              '& li.previous': {
                mr: '1.25rem',
              },
              '& li.selected': {
                bg: 'white',
                border: '1px solid #1e93ff',
                borderRadius: '0.25rem',
              },
              '& li:not(.disabled):hover': {
                textDecoration: 'underline',
              },
              '& ul': {
                display: 'flex',
                gap: '0.5rem',
                listStyle: 'none',
              },
            }}
          >
            <ReactPaginate
              breakLabel="..."
              nextLabel="Próximo"
              pageCount={Math.ceil(products.length / limit)}
              previousLabel="Anterior"
              renderOnZeroPageCount={null}
              onPageChange={handlePageChange}
            />
          </Box>
        </Flex>
      )}
    </Box>
  );
}
