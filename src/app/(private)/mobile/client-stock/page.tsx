'use client';

import {
  Text,
  Box,
  Flex,
  Heading,
  Button,
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Chart, { ChartType } from 'chart.js/auto';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import InputSearch from 'src/components/ui/InputSearch';
import { isPrivatePage } from 'src/contexts/AuthContext';
import { generateRandomId } from 'src/commons/randomId';

const generateRandomArray = (quantity: number) =>
  Array.from({ length: quantity }, () => Math.floor(Math.random() * 101));

const actions = [
  {
    name: 'Randomize',
    handler(chart: Chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = generateRandomArray(7);
      });
      chart.update();
    },
  },
  {
    name: 'Randomize',
    handler(chart: Chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = generateRandomArray(7);
      });
      chart.update();
    },
  },
];

interface ChartProps {
  chartData: number[];
}

const MyChart = ({ chartData }: ChartProps) => {
  const labels = useMemo(() => ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'], []);

  const formatData = useCallback(
    (data: number[]) => ({
      labels: labels,
      datasets: [
        {
          data: data,
          borderColor: '#7cb5ec',
          backgroundColor: '#7cb5ec',
          type: 'bar' as ChartType,
        },
      ],
    }),
    [labels]
  );

  const id = useRef<string>(generateRandomId());
  const chartRef = useRef<Chart | null>(null);

  if (chartRef.current) chartRef.current.destroy();

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const canvasElement = document.getElementById(id.current) as HTMLCanvasElement;
    const ctx = canvasElement?.getContext('2d');
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: [0, 0, 0, 0, 0, 0, 0],
              borderColor: '#7cb5ec',
              backgroundColor: '#7cb5ec',
              order: 1,
              type: undefined,
            },
          ],
        },
        options: {
          interaction: {
            intersect: true,
          },
          responsive: true,
          maintainAspectRatio: false,
          onResize: () => {
            if (chartRef?.current) return;
            chartRef?.current?.resize();
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = formatData(chartData);
      chartRef.current.update();
    }
  }, [chartData, formatData]);

  return (
    <Box height="fit-content">
      <Box height="20rem">
        <canvas id={id.current} ref={canvasCallback}></canvas>
      </Box>
      <Flex gap="1rem" mt="1rem" height="fit-content">
        {actions.map((action, index) => (
          <Button
            borderRadius="2rem"
            color="#fff"
            bg="#8d9bc5"
            size="sm"
            key={index}
            onClick={() => action.handler(chartRef.current!)}
          >
            {action.name}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

function ClientStockPage() {
  return (
    <PrivateLayout>
      <Box p="2rem">
        <Heading>Estoque Clientes</Heading>
        <Flex mt="1rem" direction="column">
          <Flex direction="column">
            <Text mb="1rem" fontSize="20px" fontStyle="600">
              Estoque de faturamento
            </Text>
            <MyChart chartData={generateRandomArray(7)} />
          </Flex>
          <TableContainer mt="2rem" p="1.5rem 1rem" bg="#fff" borderRadius="12px">
            <Flex mb="1rem" align="center">
              <Text width="40%" fontSize="20px" fontStyle="600">
                Faturamento e estoque do mês
              </Text>
              <Flex width="60%" gap="1rem" justify="flex-end">
                <InputSearch placeholder="Buscar" />
                <ButtonFilter />
                <ButtonOutline color="#1E93FF" borderColor="#1E93FF">
                  Exportar
                </ButtonOutline>
              </Flex>
            </Flex>
            <Table variant="striped" colorScheme="gray" size="xsm" fontSize="12px">
              <Thead h="3rem">
                <Tr bg="#47599b">
                  <Th pl="1rem" color="#fff" height="5rem" style={{ textWrap: 'wrap' }}>
                    Produto
                  </Th>
                  <Th color="#fff" textAlign="center" whiteSpace="break-spaces">
                    Quantidade Mix
                  </Th>
                  <Th color="#fff" textAlign="center" whiteSpace="break-spaces">
                    Valor Total de Compra
                  </Th>
                  <Th color="#fff" textAlign="center" whiteSpace="break-spaces">
                    Valor Total de Venda
                  </Th>
                  <Th color="#fff" textAlign="center" whiteSpace="break-spaces">
                    Venda/Compra
                  </Th>
                  <Th color="#fff" textAlign="center" whiteSpace="break-spaces">
                    Lucro
                  </Th>
                  <Th color="#fff" textAlign="center" whiteSpace="break-spaces">
                    Quantidade em Estoque
                  </Th>
                  <Th color="#fff" textAlign="center" whiteSpace="break-spaces">
                    Média Venda 3 Últimos Meses
                  </Th>
                  <Th color="#fff" textAlign="center" whiteSpace="break-spaces">
                    Dias Restantes de Estoque
                  </Th>
                </Tr>
              </Thead>
              <Tbody h="3rem">
                {Array.apply(0, Array(10)).map((_, index) => (
                  <Tr key={`tr-${index}`} h="3.5rem" fontSize="14px">
                    <Td pl="1rem">ST-9182374</Td>
                    <Td textAlign="center" cursor="pointer">
                      -
                    </Td>
                    <Td textAlign="center">-</Td>
                    <Td textAlign="center">123.53</Td>
                    <Td textAlign="center">0</Td>
                    <Td textAlign="center">21 cx</Td>
                    <Td textAlign="center">83 cx</Td>
                    <Td textAlign="center">713 cx</Td>
                    <Td textAlign="center">713 cx</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(ClientStockPage);
