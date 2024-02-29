import {
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { MdArrowDropDown, MdCheckCircle } from 'react-icons/md';
import { ButtonFilter } from './ButtonFilter';

type FilterType = {
  editable: boolean;
  name: string;
  value: string;
};

type OptionsType = {
  label: string;
  value: string;
};

type FilterModalProps = {
  applyCallback?: (queryParams: Array<{ name: string; value: string }>) => void;
  options: OptionsType[];
};

const emptyFilter: FilterType = {
  editable: true,
  name: '',
  value: '',
};

const setQueryParams = (filters: FilterType[]) => {
  const query = filters.filter((filter) => filter.name && filter.value);

  const queryParams = query.reduce((params, filter) => {
    params[filter.name.toLowerCase()] = filter.value.toLowerCase();
    return params;
  }, {});

  return new URLSearchParams(queryParams);
};

export function FilterModal({ options, applyCallback }: FilterModalProps) {
  const toast = useToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const allParamsInUrl: FilterType[] = [];
  for (const [key, value] of searchParams) {
    allParamsInUrl.push({ editable: false, name: key, value });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState<FilterType[]>([
    ...(allParamsInUrl.length > 0 ? allParamsInUrl : [emptyFilter]),
  ]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>(emptyFilter);

  const remainingOptions = options.filter(
    (option) => !filters.find((filter) => filter.name === option.value),
  );

  const handleAddFilter = () => {
    setFilters((prevState) => [
      ...prevState,
      {
        ...emptyFilter,
      },
    ]);
  };

  const handleConfirmFilter = (index: number) => {
    if (currentFilter.name === '' || currentFilter.value === '') {
      toast({ description: 'Preencha todos os campos', status: 'error' });
      return;
    }

    setFilters((prevState) =>
      prevState.map((filter, i) =>
        i === index
          ? {
              editable: false,
              name: currentFilter.name,
              value: currentFilter.value,
            }
          : filter,
      ),
    );
    setCurrentFilter(emptyFilter);
    setFilters((prevState) => [
      ...prevState,
      {
        ...emptyFilter,
      },
    ]);
  };

  const handleRemoveFilter = (index: number) => {
    if (filters.length > 0)
      setFilters((prevState) => {
        return prevState.filter((_, i) => i !== index);
      });
  };

  const handleApplyFilters = (onCloseCallback: () => void) => {
    if (applyCallback) applyCallback(filters);
    onCloseCallback();
  };

  return (
    <>
      <ButtonFilter
        w="8rem"
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtros</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              {filters.map((filter, index) => (
                <Flex
                  key={`flex-${index}`}
                  align="center"
                  w="100%"
                >
                  {filter.editable ? (
                    <Select
                      fontFamily="sans-serif"
                      h="3rem"
                      icon={<MdArrowDropDown />}
                      mr="1rem"
                      placeholder="Selecione um filtro"
                      w="35rem"
                      autoFocus={
                        filter.editable && index === filters.length - 1
                      }
                      onChange={(e) =>
                        setCurrentFilter((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }))
                      }
                    >
                      {remainingOptions.map((option, indexOption) => (
                        <option
                          key={`${option}-${indexOption}`}
                          value={option.value}
                        >
                          {option.label.toUpperCase()}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      h="3rem"
                      mr="1rem"
                      type="text"
                      value={filter.name.toUpperCase()}
                      w="34rem"
                      readOnly
                    />
                  )}
                  <Input
                    defaultValue={filter.value}
                    h="3rem"
                    mr="1.5rem"
                    textTransform="uppercase"
                    type="text"
                    w="34rem"
                    onChange={(e) =>
                      setCurrentFilter((prevState) => ({
                        ...prevState,
                        value: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleConfirmFilter(index);
                    }}
                  />

                  {filter.editable ? (
                    <Icon
                      as={MdCheckCircle}
                      cursor="pointer"
                      h="24px"
                      w="24px"
                      onClick={() => handleConfirmFilter(index)}
                    />
                  ) : (
                    <Icon
                      as={IoMdTrash}
                      cursor="pointer"
                      h="24px"
                      w="24px"
                      onClick={() => handleRemoveFilter(index)}
                    />
                  )}
                </Flex>
              ))}
            </VStack>
            <Button
              mt="2rem"
              variant="outline"
              onClick={handleAddFilter}
            >
              Adicionar Filtro
            </Button>
          </ModalBody>

          <ModalFooter>
            <Link
              href={`${pathname}?${setQueryParams(filters)}`}
              legacyBehavior
              passHref
            >
              <Button
                as="a"
                colorScheme="blue"
                onClick={() => handleApplyFilters(onClose)}
              >
                Aplicar
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
