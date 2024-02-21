'use client';

import { Box, Flex, Heading, Select, Text } from '@chakra-ui/react';
import Chart, { ChartType } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { generateRandomId } from 'src/commons/randomId';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { isPrivatePage } from 'src/contexts/AuthContext';

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
  labels: labels,
  datasets: [
    {
      data: data,
      borderColor: '#7cb5ec',
      backgroundColor: '#7cb5ec',
      type: 'bar' as ChartType,
    },
  ],
});

const MyChart = ({ chartData }: ChartProps) => {
  const id = generateRandomId();
  const chartRef = useRef<Chart | null>(null);

  if (chartRef.current) chartRef.current.destroy();

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const canvasElement = document.getElementById(id) as HTMLCanvasElement;
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
  }, [chartData]);

  return (
    <canvas
      ref={canvasCallback}
      id={id}
    ></canvas>
  );
};

function DistributorStockPage() {
  return (
    <PrivateLayout>
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
    </PrivateLayout>
  );
}

export default isPrivatePage(DistributorStockPage);
