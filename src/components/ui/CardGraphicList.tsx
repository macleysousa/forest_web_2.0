import { Card, CardBody, CardHeader, CardProps, Heading, Text, Box, Flex, Tooltip } from '@chakra-ui/react';

interface CardGraphicProps extends CardProps {
  title: string;
  data: {
    name: string;
    value: string;
  }[];
  props?: CardProps;
}

export default function CardGraphicList({ title, data, ...props }: CardGraphicProps) {
  return (
    <Card h="30rem" w={{ lg: '100%', xl: '24rem', '3xl': '32rem' }} {...props}>
      <CardHeader>
        <Heading fontSize="24px" fontWeight="600">
          {title}
        </Heading>
      </CardHeader>
      <CardBody p="0 1.25rem">
        {data.map((item, index) => (
          <Flex key={index} justify="space-between" gap="1rem" align="center" m=".75rem 0">
            <Text maxW="8rem" w="8rem" isTruncated>
              <Tooltip label={item.name} aria-label={item.name} placement="top">
                {item.name}
              </Tooltip>
            </Text>
            <Box borderRadius="1rem" w="7.5rem" bg="#1E93FF" h=".5rem">
              <Box bg="#fff" h=".5rem" w="10%" />
            </Box>
            <Text minW="4rem">{item.value}</Text>
          </Flex>
        ))}
      </CardBody>
    </Card>
  );
}
