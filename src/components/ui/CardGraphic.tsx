import { Card, CardBody, CardHeader, CardProps, Heading, Text, Box, Flex, Tooltip } from '@chakra-ui/react';

interface CardGraphicProps {
  title: string;
  content: {
    name: string;
    value: string;
  }[];
  props?: CardProps;
}

export default function CardGraphic({ title, content, ...props }: CardGraphicProps) {
  return (
    <Card h="30rem" w="24rem" {...props}>
      <CardHeader>
        <Heading fontSize="24px" fontWeight="600">
          {title}
        </Heading>
      </CardHeader>
      <CardBody p="0 1.25rem">
        {content.map((item, index) => (
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
