'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import { useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import { CardGraphicBarLine } from '../../../components/CardGraphicBarLine';
import { InputLabel } from '../../../components/InputLabel';

export default function ManagementPanelPage() {
  const generateRandomArray = (quantity: number) =>
    Array.from({ length: quantity }, () => Math.floor(Math.random() * 101));

  const [filters, setFilters] = useState({
    actor: '',
    dashboard: 'sellOut',
    periodInterval: 'month',
    periodYear: '',
  });

  const handleClick = (event: any, key: string, value: string) => {
    event.preventDefault();
    setFilters((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
    <Box p="2rem">
      <Flex justify="space-between">
        <Heading>Painel Gerencial</Heading>

        <Flex>
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button
                bg="#fff"
                placeContent="flex-start"
                variant="outline"
                w="12.5rem"
              >
                <Icon
                  as={MdFilterList}
                  mr=".5rem"
                />
                <Text
                  fontSize="14px"
                  fontWeight="400"
                >
                  Filtros
                </Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <InputLabel my="1rem">
                  Ator
                  <Select
                    onChange={(e) =>
                      setFilters((val) => ({
                        ...val,
                        actor: (e.target as HTMLSelectElement)?.value as string,
                      }))
                    }
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </InputLabel>
                <InputLabel my="1rem">
                  Período
                  <Select
                    onChange={(e) =>
                      setFilters((val) => ({
                        ...val,
                        periodYear: (e.target as HTMLSelectElement)
                          ?.value as string,
                      }))
                    }
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </InputLabel>
                <Box
                  bg="#e7ebee"
                  borderRadius={5}
                  m="1rem 0"
                  p="1rem"
                >
                  <Text
                    mb=".5rem"
                    textAlign="end"
                    w="100%"
                  >
                    Período
                  </Text>
                  <SimpleGrid
                    columns={2}
                    gap={1}
                  >
                    <Button
                      size="sm"
                      colorScheme={
                        filters.periodInterval === 'month' ? 'blue' : 'gray'
                      }
                      onClick={(event) =>
                        handleClick(event, 'periodInterval', 'month')
                      }
                    >
                      Mensal
                    </Button>
                    <Button
                      size="sm"
                      colorScheme={
                        filters.periodInterval === 'acumulated'
                          ? 'blue'
                          : 'gray'
                      }
                      onClick={(event) =>
                        handleClick(event, 'periodInterval', 'acumulated')
                      }
                    >
                      Acumulado
                    </Button>
                    <Button
                      size="sm"
                      colorScheme={
                        filters.periodInterval === 'comparison'
                          ? 'blue'
                          : 'gray'
                      }
                      onClick={(event) =>
                        handleClick(event, 'periodInterval', 'comparison')
                      }
                    >
                      Comparação
                    </Button>
                    <Button
                      size="sm"
                      colorScheme={
                        filters.periodInterval === 'pareto' ? 'blue' : 'gray'
                      }
                      onClick={(event) =>
                        handleClick(event, 'periodInterval', 'pareto')
                      }
                    >
                      Pareto
                    </Button>
                  </SimpleGrid>
                </Box>
                <Box
                  bg="#e7ebee"
                  borderRadius={5}
                  m="1rem 0"
                  p="1rem"
                >
                  <Text
                    mb=".5rem"
                    textAlign="end"
                    w="100%"
                  >
                    Dashboard
                  </Text>
                  <SimpleGrid
                    columns={2}
                    gap={1}
                  >
                    <Button
                      size="sm"
                      colorScheme={
                        filters.dashboard === 'sellOut' ? 'blue' : 'gray'
                      }
                      onClick={(event) =>
                        handleClick(event, 'dashboard', 'sellOut')
                      }
                    >
                      Sell Out
                    </Button>
                    <Button
                      size="sm"
                      colorScheme={
                        filters.dashboard === 'positivity' ? 'blue' : 'gray'
                      }
                      onClick={(event) =>
                        handleClick(event, 'dashboard', 'positivity')
                      }
                    >
                      Positivação
                    </Button>
                    <Button
                      size="sm"
                      colorScheme={
                        filters.dashboard === 'biling' ? 'blue' : 'gray'
                      }
                      onClick={(event) =>
                        handleClick(event, 'dashboard', 'biling')
                      }
                    >
                      Faturamento
                    </Button>
                  </SimpleGrid>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
      <SimpleGrid
        columns={{ '2xl': 2, 'lg': 2, 'md': 1 }}
        p="2rem 0"
        spacing={10}
      >
        <CardGraphicBarLine
          barChartData={generateRandomArray(7)}
          lineChartData={generateRandomArray(7)}
          title="Volume Mix"
        />
        <CardGraphicBarLine
          barChartData={generateRandomArray(7)}
          lineChartData={generateRandomArray(7)}
          title="Volume Mix Bonificação"
        />
        <CardGraphicBarLine
          barChartData={generateRandomArray(7)}
          lineChartData={generateRandomArray(7)}
          title="Cobertura"
        />
        <CardGraphicBarLine
          barChartData={generateRandomArray(7)}
          lineChartData={generateRandomArray(7)}
          title="Drop Size"
        />
      </SimpleGrid>
    </Box>
  );
}
