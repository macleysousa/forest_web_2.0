'use client';
import { Box, Flex, Heading, Select, Text } from '@chakra-ui/react';

// eslint-disable-next-line import/no-named-as-default
import Chart, { ChartType } from 'chart.js/auto';

import { useEffect, useId, useRef } from 'react';

const generateRandomArray = (quantity: number) =>
  Array.from({ length: quantity }, () => Math.floor(Math.random() * 101));

type ChartProps = {
  chartData: number[];
};

const labels = [
  'ST-723BR',
  'ST-98234BR',
  'ST-843BR',
  'ST-723BR',
  'ST-98234BR',
  'ST-843BR',
  'ST-394BR',
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
    <canvas
      ref={canvasCallback}
      id={id}
    ></canvas>
  );
};

export default function DistributorStockPage() {
  return (
    <Box p="2rem">
      <Flex
        align="flex-end"
        justify="space-between"
      >
        <Heading width="60%">Estoque Clientes</Heading>
        <Flex
          align="center"
          bg="white"
          border="1px solid #00000020"
          borderRadius={5}
          h="2.5rem"
          justify="center"
          w="20rem"
        >
          <Text
            color="#898989"
            mx="10px"
          >
            Distribuidor:
          </Text>
          <Select
            placeholder="Escolha um da lista"
            variant="unstyled"
          >
            <option value="">Escolha um da lista</option>
          </Select>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        mt="2rem"
      >
        <Text
          fontSize="24px"
          fontStyle="700"
          mb="1rem"
        >
          15 Produtos mais vendidos
        </Text>
        <Box height="20rem">
          <MyChart chartData={generateRandomArray(7)} />
        </Box>
      </Flex>
    </Box>
  );
}
