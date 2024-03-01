'use client';

import {
  Box,
  Center,
  Flex,
  Icon,
  Kbd,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

import { MdSearch } from 'react-icons/md';
import Select, { StylesConfig } from 'react-select';
import { Loading } from '../Loading';
import { Option } from './Option';
import { useGlobalSearch } from './useGlobalSearch';
import type { OptionType } from './index';

const styles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    paddingLeft: '1.75rem',
  }),

  indicatorsContainer: (base) => ({
    ...base,
    display: 'none',
  }),

  option: (base) => ({
    ...base,
    h: '2.5rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }),
};

export function GlobalSearch() {
  const { handleChange, open, options, toggle, pending } = useGlobalSearch();

  if (pending) {
    return (
      <Box
        inset={0}
        position="absolute"
        zIndex={1000}
      >
        <Loading />
      </Box>
    );
  }

  return (
    <>
      <Flex
        _disabled={{ bg: 'gray.200' }}
        _hover={{ _disabled: { bg: 'gray.200' }, bg: 'gray.100' }}
        align="center"
        as="button"
        bg="white"
        borderRadius={4}
        h="2rem"
        justify="space-between"
        px={2}
        sx={{ transitionDuration: '150ms' }}
        type="button"
        // eslint-disable-next-line canonical/sort-keys
        w={{ base: '100%', sm: '12.5rem', lg: '25rem' }}
        onClick={toggle}
      >
        <Icon
          as={MdSearch}
          color="#898989"
        />
        <Box
          as="span"
          color="#898989"
          fontSize="sm"
        >
          Busque por uma página
        </Box>
        <Flex
          as="span"
          gap={1}
        >
          <Kbd color="#898989">Ctrl</Kbd>
          <Kbd color="#898989">K</Kbd>
        </Flex>
      </Flex>
      <Modal
        isOpen={open}
        onClose={toggle}
      >
        <ModalOverlay />
        <Box
          as={ModalContent}
          mx={4}
          position="relative"
        >
          <Select<OptionType, false>
            components={{ Option }}
            options={options}
            placeholder="Busque por uma página"
            styles={styles}
            menuIsOpen
            onChange={handleChange}
          />
          <Center
            color="#898989"
            fontSize="1.5rem"
            h="100%"
            ml="0.25rem"
            position="absolute"
            w="2rem"
          >
            <Icon as={MdSearch} />
          </Center>
        </Box>
      </Modal>
    </>
  );
}
