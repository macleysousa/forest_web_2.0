import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import CardGraphicBarLine from 'src/components/ui/CardGraphicBarLine';
import Authorized from 'src/layouts/authorized/Authorized';

export default function ManagementPanel() {
  return (
    <Authorized>
      <Box p="2rem">
        <Flex>
          <Heading>Painel Gerencial</Heading>
        </Flex>
        <SimpleGrid p="2rem 0" columns={2} spacing={10}>
          <CardGraphicBarLine />
          <CardGraphicBarLine />
          <CardGraphicBarLine />
          <CardGraphicBarLine />
        </SimpleGrid>
      </Box>
    </Authorized>
  );
}
