'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

// eslint-disable-next-line import/no-named-as-default
import Chart, { ChartType } from 'chart.js/auto';

import { useEffect, useId, useRef } from 'react';
import { ButtonFilter } from '../../../../components/ButtonFilter';
import { InputSearch } from '../../../../components/InputSearch';

const generateRandomArray = (quantity: number) =>
  Array.from({ length: quantity }, () => Math.floor(Math.random() * 101));

const actions = [
  {
    handler(chart: Chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = generateRandomArray(7);
      });
      chart.update();
    },
    name: 'Randomize',
  },
  {
    handler(chart: Chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = generateRandomArray(7);
      });
      chart.update();
    },
    name: 'Randomize',
  },
];

type ChartProps = {
  chartData: number[];
};

const labels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
];

const formatData = (data: number[]) => ({
  datasets: [
    {
      backgroundColor: '#7cb5ec',
      borderColor: '#7cb5ec',
      data: data,
      type: 'bar' as ChartType,
    },
  ],
  labels: labels,
});

const MyChart = ({ chartData }: ChartProps) => {
  const id = useId();
  const chartRef = useRef<Chart | null>(null);

  if (chartRef.current) chartRef.current.destroy();

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const canvasElement = document.getElementById(id) as HTMLCanvasElement;
    const ctx = canvasElement?.getContext('2d');
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        data: {
          datasets: [
            {
              backgroundColor: '#7cb5ec',
              borderColor: '#7cb5ec',
              data: [0, 0, 0, 0, 0, 0, 0],
              label: 'Dataset 1',
              order: 1,
              type: undefined,
            },
          ],
          labels: labels,
        },
        options: {
          interaction: {
            intersect: true,
          },
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
          responsive: true,
        },
        type: 'bar',
      });
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = formatData(chartData);
      chartRef.current.update();
    }
  }, [chartData]);

  return (
    <Box height="fit-content">
      <Box height="20rem">
        <canvas
          ref={canvasCallback}
          id={id}
        ></canvas>
      </Box>
      <Flex
        gap="1rem"
        height="fit-content"
        mt="1rem"
      >
        {actions.map((action, index) => (
          <Button
            key={index}
            bg="#8d9bc5"
            borderRadius="2rem"
            color="#fff"
            size="sm"
            onClick={() => action.handler(chartRef.current!)}
          >
            {action.name}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default function ClientStockPage() {
  return (
    <Box p="2rem">
      <Heading>Estoque Clientes</Heading>
      <Flex
        direction="column"
        mt="1rem"
      >
        <Flex direction="column">
          <Text
            fontSize="20px"
            fontStyle="600"
            mb="1rem"
          >
            Estoque de faturamento
          </Text>
          <MyChart chartData={generateRandomArray(7)} />
        </Flex>
        <TableContainer
          bg="#fff"
          borderRadius="12px"
          mt="2rem"
          p="1.5rem 1rem"
        >
          <Flex
            align="center"
            mb="1rem"
          >
            <Text
              fontSize="20px"
              fontStyle="600"
              width="40%"
            >
              Faturamento e estoque do mês
            </Text>
            <Flex
              gap="1rem"
              justify="flex-end"
              width="60%"
            >
              <InputSearch placeholder="Buscar" />
              <ButtonFilter />
              <Button
                borderColor="#1E93FF"
                color="#1E93FF"
                variant="outline"
              >
                Exportar
              </Button>
            </Flex>
          </Flex>
          <Table
            colorScheme="gray"
            fontSize="12px"
            size="xsm"
            variant="striped"
          >
            <Thead h="3rem">
              <Tr bg="#47599b">
                <Th
                  color="#fff"
                  height="5rem"
                  pl="1rem"
                  style={{ textWrap: 'wrap' }}
                >
                  Produto
                </Th>
                <Th
                  color="#fff"
                  textAlign="center"
                  whiteSpace="break-spaces"
                >
                  Quantidade Mix
                </Th>
                <Th
                  color="#fff"
                  textAlign="center"
                  whiteSpace="break-spaces"
                >
                  Valor Total de Compra
                </Th>
                <Th
                  color="#fff"
                  textAlign="center"
                  whiteSpace="break-spaces"
                >
                  Valor Total de Venda
                </Th>
                <Th
                  color="#fff"
                  textAlign="center"
                  whiteSpace="break-spaces"
                >
                  Venda/Compra
                </Th>
                <Th
                  color="#fff"
                  textAlign="center"
                  whiteSpace="break-spaces"
                >
                  Lucro
                </Th>
                <Th
                  color="#fff"
                  textAlign="center"
                  whiteSpace="break-spaces"
                >
                  Quantidade em Estoque
                </Th>
                <Th
                  color="#fff"
                  textAlign="center"
                  whiteSpace="break-spaces"
                >
                  Média Venda 3 Últimos Meses
                </Th>
                <Th
                  color="#fff"
                  textAlign="center"
                  whiteSpace="break-spaces"
                >
                  Dias Restantes de Estoque
                </Th>
              </Tr>
            </Thead>
            <Tbody h="3rem">
              {Array.apply(0, Array(10)).map((_, index) => (
                <Tr
                  key={`tr-${index}`}
                  fontSize="14px"
                  h="3.5rem"
                >
                  <Td pl="1rem">ST-9182374</Td>
                  <Td
                    cursor="pointer"
                    textAlign="center"
                  >
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
  );
}
