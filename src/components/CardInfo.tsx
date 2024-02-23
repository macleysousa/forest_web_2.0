import {
  Box,
  Card,
  CardBody,
  CardProps,
  Center,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';

import {
  MdMoreVert,
  MdOutlineTrendingUp,
  MdTrendingDown,
} from 'react-icons/md';

type CardGraphicProps = CardProps & {
  month: string;
  title: string;
  type: 'up' | 'down';
  value: string;
  variation: string;
};

export function CardInfo({
  type,
  title,
  value,
  variation,
  month,
  ...props
}: CardGraphicProps) {
  return (
    <Card
      h="8rem"
      w="18rem"
      {...props}
    >
      <CardBody>
        <Center
          alignItems="flex-end"
          h="90%"
          justifyContent="space-around"
        >
          <Flex direction="column">
            <Text
              // eslint-disable-next-line canonical/sort-keys
              fontSize={{ 'base': '16px', '3xl': '24px' }}
            >
              {title}
            </Text>
            <Text
              fontSize={{ '3xl': '32px', 'base': '24px' }}
              fontWeight="700"
            >
              {value}
            </Text>
          </Flex>
          <Box color={type === 'up' ? '#00A163' : '#FF7262'}>
            <Icon
              as={type === 'up' ? MdOutlineTrendingUp : MdTrendingDown}
              // eslint-disable-next-line canonical/sort-keys
              h={{ '3xl': '45px', 'base': '30px' }}
              // eslint-disable-next-line canonical/sort-keys
              w={{ 'base': '30px', '3xl': '45px' }}
            />
            <Text
              // eslint-disable-next-line canonical/sort-keys
              fontSize={{ 'base': '11px', '3xl': '18px' }}
              fontWeight="500"
            >
              {type === 'up' ? '+' : '-'}
              {variation}
            </Text>
            <Text
              // eslint-disable-next-line canonical/sort-keys
              fontSize={{ 'base': '11px', '3xl': '18px' }}
              fontWeight="500"
            >
              vs. {month}
            </Text>
          </Box>
        </Center>
      </CardBody>
      <Box>
        <Icon
          as={MdMoreVert}
          cursor="pointer"
          h="24px"
          position="absolute"
          right="5px"
          top="10px"
          w="24px"
        />
      </Box>
    </Card>
  );
}
