import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Flex,
  Heading,
  Text,
  Tooltip,
} from '@chakra-ui/react';

type CardGraphicProps = CardProps & {
  data: Array<{ name: string; value: string }>;
  props?: CardProps;
  title: string;
};

export function CardGraphicList({ title, data, ...props }: CardGraphicProps) {
  return (
    <Card
      h="30rem"
      // eslint-disable-next-line canonical/sort-keys
      w={{ 'lg': '100%', 'xl': '24rem', '3xl': '32rem' }}
      {...props}
    >
      <CardHeader>
        <Heading
          fontSize="24px"
          fontWeight="600"
        >
          {title}
        </Heading>
      </CardHeader>
      <CardBody p="0 1.25rem">
        {data.map((item, index) => (
          <Flex
            key={index}
            align="center"
            gap="1rem"
            justify="space-between"
            m=".75rem 0"
          >
            <Text
              maxW="8rem"
              w="8rem"
              isTruncated
            >
              <Tooltip
                aria-label={item.name}
                label={item.name}
                placement="top"
              >
                {item.name}
              </Tooltip>
            </Text>
            <Box
              bg="#1E93FF"
              borderRadius="1rem"
              h=".5rem"
              w="7.5rem"
            >
              <Box
                bg="#fff"
                h=".5rem"
                w="10%"
              />
            </Box>
            <Text minW="4rem">{item.value}</Text>
          </Flex>
        ))}
      </CardBody>
    </Card>
  );
}
