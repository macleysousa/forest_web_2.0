'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
} from '@chakra-ui/react';
import Chart, { ChartType } from 'chart.js/auto';
import { useMemo, useCallback, useRef, useEffect } from 'react';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { isPrivatePage } from 'src/contexts/AuthContext';
import { generateRandomId } from 'src/commons/randomId';
import { IoSearch } from 'react-icons/io5';

const generateRandomArray = (quantity: number) =>
  Array.from({ length: quantity }, () => Math.floor(Math.random() * 101));

interface ChartProps {
  chartData: number[];
}

const MyChart = ({ chartData }: ChartProps) => {
  const labels = useMemo(
    () => ['ST-723BR', 'ST-98234BR', 'ST-843BR', 'ST-723BR', 'ST-98234BR', 'ST-843BR', 'ST-394BR'],
    []
  );

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

  return <canvas id={id.current} ref={canvasCallback}></canvas>;
};

function DistributorStockPage() {
  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex align="flex-end" justify="space-between">
          <Heading width="60%">Estoque Clientes</Heading>
          <Flex
            border="1px solid #00000020"
            borderRadius={5}
            justify="center"
            align="center"
            h="2.5rem"
            w="20rem"
            bg="white"
          >
            <Text color="#898989" mx="10px">
              Distribuidor:
            </Text>
            <Select variant="unstyled" placeholder="Escolha um da lista">
              <option value="">Escolha um da lista</option>
            </Select>
          </Flex>
        </Flex>
        <Flex direction="column" mt="2rem">
          <Text mb="1rem" fontSize="24px" fontStyle="700">
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
