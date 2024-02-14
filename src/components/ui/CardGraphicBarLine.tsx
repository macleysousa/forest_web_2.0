'use client';

import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Box,
  CardProps,
  Th,
  Table,
  TableContainer,
  Tr,
  Thead,
  Tbody,
  Td,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Chart, { ChartType } from 'chart.js/auto';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';

interface Props {
  barChartData: number[];
  lineChartData: number[];
}

const generateRandomId = () => {
  const randomPart = Math.floor(Math.random() * 1000000).toString(16);
  const timestampPart = Date.now().toString(16);
  const randomId = randomPart + timestampPart;

  return randomId;
};

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];

const formatData = (barData: number[], lineData: number[]) => ({
  labels: labels,
  datasets: [
    {
      data: barData,
      borderColor: '#775DA6',
      backgroundColor: '#775DA6',
      type: 'bar' as ChartType,
      order: 1,
    },
    {
      data: lineData,
      borderColor: '#70B6C1',
      backgroundColor: '#70B6C1',
      type: 'line' as ChartType,
      order: 0,
    },
  ],
});

const MyChart = ({ barChartData, lineChartData }: Props) => {
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
              borderColor: '#775DA6',
              backgroundColor: '#775DA6',
              order: 1,
              type: undefined,
            },
            {
              label: 'Dataset 2',
              data: [0, 0, 0, 0, 0, 0, 0],
              borderColor: '#70B6C1',
              backgroundColor: '#70B6C1',
              type: 'line',
              order: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          onResize: () => {
            chartRef.current?.resize();
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = formatData(barChartData, lineChartData);
      chartRef.current.update();
    }
  }, [barChartData, lineChartData]);

  return <canvas id={id} ref={canvasCallback}></canvas>;
};

interface CardGraphicProps extends CardProps {
  title: string;
  barChartData: number[];
  lineChartData: number[];
}

export default function CardGraphicBarLine({ title, barChartData, lineChartData, ...props }: CardGraphicProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <Flex justify="space-between">
          <Heading fontSize="24px" fontWeight="600">
            {title}
          </Heading>
          <Menu>
            <MenuButton>
              <Icon w="24px" h="24px" cursor="pointer" as={MdMoreVert} />
            </MenuButton>
            <MenuList>
              <MenuItem>Mudar para visualização diária</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Box position="relative" height={{ lg: '12rem', xl: '16rem', '2xl': '20rem', '3xl': '24rem' }}>
          <MyChart barChartData={barChartData} lineChartData={lineChartData} />
        </Box>
        <Box>
          <TableContainer overflowX={{ lg: 'auto', '2xl': 'hidden' }}>
            <Table variant="striped" colorScheme="gray" w="100%">
              <Thead>
                <Tr>
                  <Th>Visão</Th>
                  <Th textAlign="center">Meta</Th>
                  <Th textAlign="center">Realizado</Th>
                  <Th textAlign="center">Resultado</Th>
                  <Th textAlign="center">Desvio</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Geral</Td>
                  <Td textAlign="center">10,393</Td>
                  <Td textAlign="center">4,038</Td>
                  <Td textAlign="center">39%</Td>
                  <Td textAlign="center">-6,355</Td>
                </Tr>

                <Tr>
                  <Td>Diretoria</Td>
                  <Td textAlign="center">10,393</Td>
                  <Td textAlign="center">4,038</Td>
                  <Td textAlign="center">39%</Td>
                  <Td textAlign="center">-6,355</Td>
                </Tr>

                <Tr>
                  <Td>Ajustes</Td>
                  <Td textAlign="center">-</Td>
                  <Td textAlign="center">0</Td>
                  <Td textAlign="center">-</Td>
                  <Td textAlign="center">-</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </CardBody>
    </Card>
  );
}
