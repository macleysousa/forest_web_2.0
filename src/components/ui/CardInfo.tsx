import { Box, Card, CardBody, CardProps, Center, Flex, Icon, Text } from '@chakra-ui/react';
import { MdMoreVert } from 'react-icons/md';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { MdTrendingDown } from 'react-icons/md';

interface CardGraphicProps {
  type: 'up' | 'down';
  title: string;
  value: string;
  variation: string;
  month: string;
  props?: CardProps;
}

export default function CardInfo({ type, title, value, variation, month, ...props }: CardGraphicProps) {
  return (
    <Card h="8rem" w="18rem" {...props}>
      <CardBody>
        <Center justifyContent="space-around" alignItems="flex-end" h="90%">
          <Flex direction="column">
            <Text fontSize="16px">{title}</Text>
            <Text fontSize="24px" fontWeight="700">
              {value}
            </Text>
          </Flex>
          <Box color={type === 'up' ? '#00A163' : '#FF7262'}>
            <Icon h="30px" w="30px" as={type === 'up' ? MdOutlineTrendingUp : MdTrendingDown} />
            <Text fontSize="11px" fontWeight="500">
              {type === 'up' ? '+' : '-'}
              {variation}
            </Text>
            <Text fontSize="11px" fontWeight="500">
              vs. {month}
            </Text>
          </Box>
        </Center>
      </CardBody>
      <Box>
        <Icon position="absolute" top="10px" right="5px" w="24px" h="24px" cursor="pointer" as={MdMoreVert} />
      </Box>
    </Card>
  );
}
