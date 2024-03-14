'use client';

import {
  Box,
  Center,
  Flex,
  Icon,
  IconButton,
  Kbd,
  Modal,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
} from '@chakra-ui/react';

import { MdSearch } from 'react-icons/md';
import Select, { StylesConfig } from 'react-select';
import { theme } from '../../configs/chakra';
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

  const [isLargerThanMd] = useMediaQuery(
    `(min-width: ${theme.breakpoints.md})`,
  );

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
      {isLargerThanMd ? (
        <Flex
          _disabled={{ bg: 'gray.200' }}
          _hover={{ _disabled: { bg: 'gray.200' }, bg: 'gray.100' }}
          align="center"
          as="button"
          bg="white"
          borderRadius={4}
          gap="0.5rem"
          h="2rem"
          justify={{ base: 'flex-start', md: 'space-between' }}
          maxW="37.5vw"
          px={2}
          sx={{ transitionDuration: '150ms' }}
          type="button"
          w="100%"
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
      ) : (
        <IconButton
          _hover={{ bg: '#1D1242', color: '#1E93FF' }}
          aria-label="Busque por uma página"
          color="white"
          size="lg"
          variant="ghost"
          icon={
            <Icon
              as={MdSearch}
              fontSize="2xl"
            />
          }
          onClick={toggle}
        />
      )}
      <Modal
        isOpen={open}
        size="lg"
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
