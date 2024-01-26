import { Box, Flex, Heading, Icon, SimpleGrid } from '@chakra-ui/react';
import CardGraphicBarLine from 'src/components/ui/CardGraphicBarLine';
import Authorized from 'src/layouts/authorized/Authorized';

export default function ManagementPanel() {
  const generateRandomArray = (quantity: number) =>
    Array.from({ length: quantity }, () => Math.floor(Math.random() * 101));

  return (
    <Authorized>
      <Box p="2rem">
        <Flex>
          <Heading>Painel Gerencial</Heading>
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
    </Authorized>
  );
}
