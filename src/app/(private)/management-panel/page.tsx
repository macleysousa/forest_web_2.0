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
import { PrivateLayout } from 'src/components/PrivateLayout';
import CardGraphicBarLine from 'src/components/ui/CardGraphicBarLine';
import { InputLabel } from 'src/components/ui/InputLabel';
import { isPrivatePage } from 'src/contexts/AuthContext';

function ManagementPanelPage() {
  const generateRandomArray = (quantity: number) =>
    Array.from({ length: quantity }, () => Math.floor(Math.random() * 101));

  const [filters, setFilters] = useState({
    actor: '',
    periodYear: '',
    periodInterval: 'month',
    dashboard: 'sellOut',
  });

  const handleClick = (event: any, key: string, value: string) => {
    event.preventDefault();
    setFilters((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex justify="space-between">
          <Heading>Painel Gerencial</Heading>

          <Flex>
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <Button variant="outline" placeContent="flex-start" w="12.5rem" bg="#fff">
                  <Icon as={MdFilterList} mr=".5rem" />
                  <Text fontSize="14px" fontWeight="400">
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
                        setFilters((val) => ({ ...val, actor: (e.target as HTMLSelectElement)?.value as string }))
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
                        setFilters((val) => ({ ...val, periodYear: (e.target as HTMLSelectElement)?.value as string }))
                      }
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </InputLabel>
                  <Box bg="#e7ebee" p="1rem" m="1rem 0" borderRadius={5}>
                    <Text w="100%" textAlign="end" mb=".5rem">
                      Período
                    </Text>
                    <SimpleGrid columns={2} gap={1}>
                      <Button
                        size="sm"
                        colorScheme={filters.periodInterval === 'month' ? 'blue' : 'gray'}
                        onClick={(event) => handleClick(event, 'periodInterval', 'month')}
                      >
                        Mensal
                      </Button>
                      <Button
                        size="sm"
                        colorScheme={filters.periodInterval === 'acumulated' ? 'blue' : 'gray'}
                        onClick={(event) => handleClick(event, 'periodInterval', 'acumulated')}
                      >
                        Acumulado
                      </Button>
                      <Button
                        size="sm"
                        colorScheme={filters.periodInterval === 'comparison' ? 'blue' : 'gray'}
                        onClick={(event) => handleClick(event, 'periodInterval', 'comparison')}
                      >
                        Comparação
                      </Button>
                      <Button
                        size="sm"
                        // color="#fff"
                        colorScheme={filters.periodInterval === 'pareto' ? 'blue' : 'gray'}
                        onClick={(event) => handleClick(event, 'periodInterval', 'pareto')}
                      >
                        Pareto
                      </Button>
                    </SimpleGrid>
                  </Box>
                  <Box bg="#e7ebee" p="1rem" m="1rem 0" borderRadius={5}>
                    <Text w="100%" textAlign="end" mb=".5rem">
                      Dashboard
                    </Text>
                    <SimpleGrid columns={2} gap={1}>
                      <Button
                        size="sm"
                        colorScheme={filters.dashboard === 'sellOut' ? 'blue' : 'gray'}
                        onClick={(event) => handleClick(event, 'dashboard', 'sellOut')}
                      >
                        Sell Out
                      </Button>
                      <Button
                        size="sm"
                        colorScheme={filters.dashboard === 'positivity' ? 'blue' : 'gray'}
                        onClick={(event) => handleClick(event, 'dashboard', 'positivity')}
                      >
                        Positivação
                      </Button>
                      <Button
                        size="sm"
                        colorScheme={filters.dashboard === 'biling' ? 'blue' : 'gray'}
                        onClick={(event) => handleClick(event, 'dashboard', 'biling')}
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
        <SimpleGrid p="2rem 0" columns={{ md: 1, lg: 2, '2xl': 2 }} spacing={10}>
          <CardGraphicBarLine
            title="Volume Mix"
            barChartData={generateRandomArray(7)}
            lineChartData={generateRandomArray(7)}
          />
          <CardGraphicBarLine
            title="Volume Mix Bonificação"
            barChartData={generateRandomArray(7)}
            lineChartData={generateRandomArray(7)}
          />
          <CardGraphicBarLine
            title="Cobertura"
            barChartData={generateRandomArray(7)}
            lineChartData={generateRandomArray(7)}
          />
          <CardGraphicBarLine
            title="Drop Size"
            barChartData={generateRandomArray(7)}
            lineChartData={generateRandomArray(7)}
          />
        </SimpleGrid>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(ManagementPanelPage);
