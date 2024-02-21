'use client';

import { Box, Card, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { CalendarPanel } from 'chakra-dayzed-datepicker';
import { dayNames, monthNames } from 'src/commons/dateUtils';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { isPrivatePage } from 'src/contexts/AuthContext';

function VisitsMapPage() {
  const cardsContent = [
    { name: 'Roteiros', value: '3' },
    { name: 'Realizadas', value: '9' },
    { name: 'Válidas', value: '46' },
    { name: 'Fora de Rota', value: '22' },
    { name: 'Fora de Roteiro', value: '0' },
    { name: 'Inválidas', value: '40' },
    { name: 'Pedidos', value: '40' },
    { name: 'Até Ontem', value: '40' },
    { name: 'Em Roteiro', value: '40' },
    { name: 'Visitados', value: '40' },
  ];

  return (
    <PrivateLayout>
      <Flex p="2rem">
        <Flex w="65%">
          <Image
            alt="visits map"
            h="100vh"
            src="/visits-map.jpg"
            w="100%"
          />
        </Flex>
        <Flex
          align="center"
          direction="column"
          ml="1rem"
          w="35%"
        >
          <ButtonFilter w="100%" />
          <SimpleGrid
            columns={2}
            mt="1rem"
            rowGap={10}
            columnGap={{
              'lg': '2rem',
              'xl': '3rem',
              '2xl': '4rem',
              '3xl': '5rem',
            }}
          >
            {cardsContent.map((card, index) => (
              <Card
                key={index}
                align="center"
                justify="center"
                variant="outline"
                h={{
                  'base': '6rem',
                  'xl': '6rem',
                  '2xl': '7rem',
                  '3xl': '7rem',
                }}
                w={{
                  'lg': '8rem',
                  'xl': '10rem',
                  '2xl': '11rem',
                  '3xl': '15rem',
                }}
              >
                <Text
                  fontWeight="500"
                  fontSize={{
                    'base': '14px',
                    'xl': '14px',
                    '2xl': '14px',
                    '3xl': '20px',
                  }}
                >
                  {card.name}
                </Text>
                <Text
                  fontSize={{ 'base': '30px', 'xl': '30px', '2xl': '36px' }}
                  fontWeight="700"
                >
                  {card.value}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
          <Box
            bg="#fff"
            mt="1rem"
            w="100%"
          >
            <CalendarPanel
              configs={{
                dateFormat: 'dd/MM/yyyy',
                monthNames,
                dayNames,
                firstDayOfWeek: 0,
              }}
              dayzedHookProps={{
                showOutsideDays: true,
                onDateSelected: (date) => console.log(date),
              }}
              propsConfigs={{
                calendarPanelProps: {
                  bodyProps: {
                    width: '100%',
                  },
                  contentProps: {
                    width: '100%',
                  },
                },
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </PrivateLayout>
  );
}

export default isPrivatePage(VisitsMapPage);
