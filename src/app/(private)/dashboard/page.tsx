'use client';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import { MdArrowDropDown } from 'react-icons/md';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import CardGraphicList from 'src/components/ui/CardGraphicList';
import CardInfo from 'src/components/ui/CardInfo';
import DatePicker from 'src/components/ui/DatePicker';
import { PrivatePageProps, isPrivatePage } from 'src/contexts/AuthContext';

function DashboardPage({ user }: PrivatePageProps) {
  const content = [
    { name: 'Montadoras', value: '333.678' },
    { name: 'Postos', value: '234.555' },
    { name: 'Concessionárias Credenciadas', value: '123.456' },
    { name: 'Oficinas', value: '98.765' },
    { name: 'Revendedores', value: '210.987' },
  ];

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex w="100%" justify="space-between">
          <Heading minW="30%" w="30%">
            <Text fontSize="36px" fontWeight="600">
              Olá, {user?.user.name}
            </Text>
            <Text fontSize="14px" fontWeight="400" mt="1rem">
              Visualização das principais KPIs
            </Text>
          </Heading>
          <Flex align="flex-end" justify="flex-end" minW="70%" w="70%" gap="1rem">
            <DatePicker onChange={(date) => console.log(date)} selectedDate={new Date()} />

            <Popover>
              <PopoverTrigger>
                <Button variant="outline" bg="#fff" w={{ lg: '12rem', xl: '16rem' }} p="0 1rem">
                  <Text fontWeight="400" color="#898989" mr=".5rem">
                    Ator:
                  </Text>
                  <Text fontWeight="400" overflow="hidden" textOverflow="ellipsis">
                    Defina os atores
                  </Text>
                  <Icon ml="auto" as={MdArrowDropDown} />
                </Button>
              </PopoverTrigger>
              <PopoverContent w="17rem" p="1rem">
                <Text fontWeight="600" fontSize="24px" mb=".75rem">
                  Atores
                </Text>
                <Checkbox my=".5rem">3R</Checkbox>
                <Checkbox my=".5rem">3R - Vale do Aço</Checkbox>
                <Checkbox my=".5rem">3R - Vitória</Checkbox>
                <Checkbox my=".5rem">Activelub</Checkbox>
                <Checkbox my=".5rem">Estar</Checkbox>
                <Checkbox my=".5rem">Eutotech</Checkbox>
              </PopoverContent>
            </Popover>

            <ButtonFilter w="8rem" />
            <ButtonPrimary minW="5.5rem">Atualizar</ButtonPrimary>
          </Flex>
        </Flex>
      </Box>
      <SimpleGrid columns={{ lg: 2, xl: 3, '2xl': 4, '3xl': 4 }} spacing={5} p="1rem 2rem">
        <CardInfo
          title="Faturamento"
          value="R$22.880,50"
          type="down"
          variation="21%"
          month="Jan"
          w={{ '3xl': '25rem' }}
          h={{ '3xl': '11rem' }}
        />
        <CardInfo
          title="Volume Mix"
          value="715"
          type="up"
          variation="21%"
          month="Jan"
          w={{ '3xl': '25rem' }}
          h={{ '3xl': '11rem' }}
        />
        <CardInfo
          title="Cobertura"
          value="209"
          type="down"
          variation="21%"
          month="Jan"
          w={{ '3xl': '25rem' }}
          h={{ '3xl': '11rem' }}
        />
        <CardInfo
          title="Ticket Médio"
          value="R$685,90"
          type="up"
          variation="+21%"
          month="Jan"
          w={{ '3xl': '25rem' }}
          h={{ '3xl': '11rem' }}
        />
        <CardInfo
          title="Volume Mix"
          value="715"
          type="up"
          variation="21%"
          month="Jan"
          w={{ '3xl': '25rem' }}
          h={{ '3xl': '11rem' }}
        />
        <CardInfo
          title="Volume Mix"
          value="715"
          type="up"
          variation="21%"
          month="Jan"
          w={{ '3xl': '25rem' }}
          h={{ '3xl': '11rem' }}
        />
        <CardInfo
          title="Volume Mix"
          value="715"
          type="up"
          variation="21%"
          month="Jan"
          w={{ '3xl': '25rem' }}
          h={{ '3xl': '11rem' }}
        />
        <CardInfo
          title="Volume Mix"
          value="715"
          type="up"
          variation="21%"
          month="Jan"
          w={{ '3xl': '25rem' }}
          h={{ '3xl': '11rem' }}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ md: 1, lg: 2, xl: 2, '2xl': 3 }} spacing={7} p="1rem 2rem">
        <CardGraphicList data={content} title="Top Cidades" />
        <CardGraphicList data={content} title="Top Segmentos" />
        <CardGraphicList data={content} title="Top Parceiros" />
      </SimpleGrid>
    </PrivateLayout>
  );
}

export default isPrivatePage(DashboardPage);
