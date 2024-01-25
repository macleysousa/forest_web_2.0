'use client';

import { Card, CardHeader, Heading, CardBody, Text, Box, CardProps } from '@chakra-ui/react';
import Chart from 'chart.js/auto';
import { Charis_SIL } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';

interface Props {
  chartData: number[];
}

const generateRandomId = () => {
  const randomPart = Math.floor(Math.random() * 1000000).toString(16);
  const timestampPart = Date.now().toString(16);
  const randomId = randomPart + timestampPart;

  return randomId;
};

const MyChart = ({ chartData }: Props) => {
  const formatData = (data: number[]) => ({
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    datasets: [{ data }],
  });

  const id = useRef<string>(generateRandomId());
  const chartRef = useRef<Chart | null>(null);

  if (chartRef.current) chartRef.current.destroy();

  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];

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
              data: [0, 20, 50, 12, 27, 30, 45],
              borderColor: '#775DA6',
              backgroundColor: '#775DA6',
              order: 1,
              type: undefined,
            },
            {
              label: 'Dataset 2',
              data: [20, 90, 95, 75, 29, 30, 45],
              borderColor: '#70B6C1',
              backgroundColor: '#70B6C1',
              type: 'line',
              order: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
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
              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
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

  return <canvas id={id.current} ref={canvasCallback}></canvas>;
};

interface CardGraphicProps {
  props?: CardProps;
}

export default function CardGraphicBarLine({ ...props }: CardGraphicProps) {
  const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  return (
    <Card {...props}>
      <CardHeader>
        <Heading fontSize="24px" fontWeight="600">
          Vendas
        </Heading>
      </CardHeader>
      <CardBody>
        <Box>
          <MyChart chartData={data} />
        </Box>
      </CardBody>
    </Card>
  );
}
