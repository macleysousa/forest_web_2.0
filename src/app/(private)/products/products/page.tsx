'use client';

import {
  Badge,
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Table,
  TableContainer,
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdFilterList, MdMoreHoriz } from 'react-icons/md';
import ReactPaginate from 'react-paginate';

import {
  GetProductsFilters,
  getProducts,
} from '../../../../services/api/products';

function getScrollParent(node: ParentNode | null) {
  if (node == null) {
    return null;
  }

  if (!(node instanceof Element)) {
    throw new Error('Expect node is instance of Element');
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  }

  return getScrollParent(node.parentNode);
}

export default function ProductsPage() {
  const toast = useToast();
  const [page, setPage] = useState('1');
  const [filters, setFilters] = useState<GetProductsFilters>({});
  const [popoverOpen, setPopoverOpen] = useState(false);

  const query = useQuery({
    queryFn: ({ signal }) => getProducts({ ...filters, page, signal }),
    queryKey: ['products', { ...filters, page }],
  });

  useEffect(() => {
    if (!query.error) return;
    toast({ description: query.error.message, status: 'error' });
  }, [query.error, toast]);

  const handlePaginateClick = (event: React.MouseEvent) => {
    const element = event.target;

    if (!(element instanceof HTMLAnchorElement)) return;
    const parent = element.parentNode;
    if (!(parent instanceof HTMLLIElement)) return;
    const disabled = parent.classList.contains('disabled');
    const selected = parent.classList.contains('selected');
    if (disabled || selected) return;

    getScrollParent(parent)?.scroll({ behavior: 'smooth', top: 0 });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const fields = ['code', 'category', 'segment', 'dsh_dso', 'unity'] as const;
    const newFiltersState: GetProductsFilters = {};

    for (const field of fields) {
      const value = formData.get(field);
      if (typeof value !== 'string') continue;
      if (value === '') continue;
      newFiltersState[field] = value;
    }

    setFilters(newFiltersState);
    setPopoverOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        flexWrap="wrap"
        gap={4}
        justifyContent={{ md: 'space-between' }}
      >
        <Heading flexShrink={0}>Produtos</Heading>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={4}
        >
          <Popover
            isOpen={popoverOpen}
            placement="bottom-start"
            isLazy
            onClose={() => setPopoverOpen(false)}
          >
            <PopoverTrigger>
              <Button
                isLoading={query.isFetching}
                leftIcon={<Icon as={MdFilterList} />}
                variant="outline"
                onClick={() => setPopoverOpen(true)}
              >
                Filtros
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent
                as="form"
                width="20rem"
                onSubmit={handleSubmit}
              >
                <PopoverArrow />
                <PopoverHeader py={3}>
                  <Heading size="sm">Filtros</Heading>
                </PopoverHeader>
                <PopoverCloseButton
                  right={2}
                  top={2}
                  onClick={() => setPopoverOpen(false)}
                />
                <PopoverBody
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  sx={{ '& > *': { flexShrink: 0 } }}
                >
                  <InputGroup>
                    <InputLeftAddon width="6.5rem">Produto</InputLeftAddon>
                    <Input
                      defaultValue={filters.code ?? ''}
                      isDisabled={query.isFetching}
                      name="code"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon width="6.5rem">Categoria</InputLeftAddon>
                    <Input
                      defaultValue={filters.category ?? ''}
                      isDisabled={query.isFetching}
                      name="category"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon width="6.5rem">Segmento</InputLeftAddon>
                    <Input
                      defaultValue={filters.segment ?? ''}
                      isDisabled={query.isFetching}
                      name="segment"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon width="6.5rem">DSH/DSO</InputLeftAddon>
                    <Input
                      defaultValue={filters.dsh_dso ?? ''}
                      isDisabled={query.isFetching}
                      name="dsh_dso"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon width="6.5rem">Unidade</InputLeftAddon>
                    <Input
                      defaultValue={filters.unity ?? ''}
                      isDisabled={query.isFetching}
                      name="unity"
                    />
                  </InputGroup>
                </PopoverBody>
                <PopoverFooter
                  display="flex"
                  flexDirection="column"
                >
                  <Button type="submit">Aplicar</Button>
                </PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
          <Button
            as={Link}
            href="/products/products/create"
          >
            Novo Produto
          </Button>
        </Box>
      </Box>

      {(filters.code ||
        filters.category ||
        filters.segment ||
        filters.dsh_dso ||
        filters.unity) && (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          mt={6}
        >
          {filters.code && (
            <Tag colorScheme="blue">
              <TagLabel>Produto: {filters.code}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, code: undefined })}
              />
            </Tag>
          )}
          {filters.category && (
            <Tag colorScheme="blue">
              <TagLabel>Categoria: {filters.category}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, category: undefined })}
              />
            </Tag>
          )}
          {filters.segment && (
            <Tag colorScheme="blue">
              <TagLabel>Segmento: {filters.segment}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, segment: undefined })}
              />
            </Tag>
          )}
          {filters.dsh_dso && (
            <Tag colorScheme="blue">
              <TagLabel>DSH/DSO: {filters.dsh_dso}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, dsh_dso: undefined })}
              />
            </Tag>
          )}
          {filters.unity && (
            <Tag colorScheme="blue">
              <TagLabel>Unidade: {filters.unity}</TagLabel>
              <TagCloseButton
                onClick={() => setFilters({ ...filters, unity: undefined })}
              />
            </Tag>
          )}
        </Box>
      )}

      {/* eslint-disable prettier/prettier */}
      <TableContainer background="white" borderRadius="sm" boxShadow="base" marginTop={6}>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Nome</Th>
              <Th>Código</Th>
              <Th>Categoria</Th>
              <Th>Segmento</Th>
              <Th textAlign="center">Unid. Venda (Qtd)</Th>
              <Th textAlign="center">Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {query.data?.products.data.map((product, i) => (
              <Tr key={product.id} bg={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}>
                <Td>
                  {product.image && <Image alt="" h="4rem" src={product.image} w="4rem" />}
                  {!product.image && <Box bg="gray.100" display="inline-block" h="4rem" w="4rem" />}
                </Td>
                <Td maxW="16rem" whiteSpace="normal">{product.name}</Td>
                <Td>{product.code}</Td>
                <Td>{product.category.name}</Td>
                <Td>
                  <Box display="inline-flex" flexWrap="wrap" gap={2} maxW="20rem">
                    {product.segments.map((segment) => (
                      <Badge key={segment.id} colorScheme="blue">
                        {segment.name}
                      </Badge>
                    ))}
                  </Box>
                </Td>
                <Td textAlign="center">{product.unity}({product.amount})</Td>
                <Td textAlign="center">
                  <Badge colorScheme={product.status ? 'green' : 'red'}>
                    {product.status ? 'Ativo' : 'Inativo'}
                  </Badge>
                </Td>
                <Td textAlign="end">
                  <Menu>
                    <MenuButton
                      aria-label="Opções"
                      as={IconButton}
                      icon={<Icon as={MdMoreHoriz} />}
                      variant="ghost"
                    />
                    <MenuList>
                      <MenuItem
                        as={Link}
                        href={`/products/${product.id}/edit`}
                        icon={<Icon as={FaRegEdit} />}
                      >
                        Editar
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* eslint-enable prettier/prettier */}

      {query.data && (
        <Box
          display={{ md: 'center' }}
          justifyContent={{ md: 'center' }}
          marginTop={6}
          sx={{
            /* eslint-disable prettier/prettier, canonical/sort-keys */
            ul: {
              display: 'flex',
              gap: 2,
              listStyle: 'none',

              li: {
                a: { color: 'blue.500' },
                '&.previous': { mr: { base: 'auto', md: 2 } },
                '&.next': { ml: { base: 'auto', md: 2 } },
                '&:is(.disabled, .selected)': { a: { color: 'gray.500', cursor: 'default' } },
                '&:not(:is(.disabled, .selected)):hover': { textDecoration: 'underline' },
              },
            },
            /* eslint-enable prettier/prettier, canonical/sort-keys */
          }}
          onClick={handlePaginateClick}
        >
          <ReactPaginate
            breakLabel="..."
            forcePage={query.data.products.current_page - 1}
            nextLabel="Próximo"
            pageCount={query.data.products.last_page}
            previousLabel="Anterior"
            renderOnZeroPageCount={null}
            onPageChange={({ selected }) => setPage((selected + 1).toString())}
          />
        </Box>
      )}
    </>
  );
}
