import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

// eslint-disable-next-line import/no-named-as-default
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { MdMoreVert } from 'react-icons/md';
import type { ChartType } from 'chart.js/auto';

type Props = {
  barChartData: number[];
  lineChartData: number[];
};

const generateRandomId = () => {
  const randomPart = Math.floor(Math.random() * 1000000).toString(16);
  const timestampPart = Date.now().toString(16);
  const randomId = randomPart + timestampPart;

  return randomId;
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

const formatData = (barData: number[], lineData: number[]) => ({
  datasets: [
    {
      backgroundColor: '#775DA6',
      borderColor: '#775DA6',
      data: barData,
      order: 1,
      type: 'bar' as ChartType,
    },
    {
      backgroundColor: '#70B6C1',
      borderColor: '#70B6C1',
      data: lineData,
      order: 0,
      type: 'line' as ChartType,
    },
  ],
  labels: labels,
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
        data: {
          datasets: [
            {
              backgroundColor: '#775DA6',
              borderColor: '#775DA6',
              data: [0, 0, 0, 0, 0, 0, 0],
              label: 'Dataset 1',
              order: 1,
              type: undefined,
            },
            {
              backgroundColor: '#70B6C1',
              borderColor: '#70B6C1',
              data: [0, 0, 0, 0, 0, 0, 0],
              label: 'Dataset 2',
              order: 0,
              type: 'line',
            },
          ],
          labels: labels,
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          responsive: true,
          scales: {
            y: {
              display: true,
              position: 'left',
              type: 'linear',
            },
            y1: {
              display: true,
              grid: {
                drawOnChartArea: false,
              },
              position: 'right',
              type: 'linear',
            },
          },
        },
        type: 'bar',
      });
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = formatData(barChartData, lineChartData);
      chartRef.current.update();
    }
  }, [barChartData, lineChartData]);

  return (
    <canvas
      ref={canvasCallback}
      id={id}
    ></canvas>
  );
};

type CardGraphicProps = CardProps & {
  barChartData: number[];
  lineChartData: number[];
  title: string;
};

export function CardGraphicBarLine({
  title,
  barChartData,
  lineChartData,
  ...props
}: CardGraphicProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <Flex justify="space-between">
          <Heading
            fontSize="24px"
            fontWeight="600"
          >
            {title}
          </Heading>
          <Menu>
            <MenuButton>
              <Icon
                as={MdMoreVert}
                cursor="pointer"
                h="24px"
                w="24px"
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Mudar para visualização diária</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardHeader>
      <CardBody>
        <Box
          position="relative"
          height={{
            '2xl': '20rem',
            '3xl': '24rem',
            'lg': '12rem',
            'xl': '16rem',
          }}
        >
          <MyChart
            barChartData={barChartData}
            lineChartData={lineChartData}
          />
        </Box>
        <Box>
          <TableContainer overflowX={{ '2xl': 'hidden', 'lg': 'auto' }}>
            <Table
              colorScheme="gray"
              variant="striped"
              w="100%"
            >
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
