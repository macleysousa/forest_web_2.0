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

import { useEffect, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { ButtonFilter } from '../../../components/ButtonFilter';
import { CardGraphicList } from '../../../components/CardGraphicList';
import { CardInfo } from '../../../components/CardInfo';
import { DatePicker } from '../../../components/DatePicker';
import { AuthUser, useAuthContext } from '../../../contexts/AuthContext';

const content = [
  { name: 'Montadoras', value: '333.678' },
  { name: 'Postos', value: '234.555' },
  { name: 'Concessionárias Credenciadas', value: '123.456' },
  { name: 'Oficinas', value: '98.765' },
  { name: 'Revendedores', value: '210.987' },
];

export default function DashboardPage() {
  const auth = useAuthContext();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(auth.is === 'authenticated' ? auth.user : null);
  }, [auth]);

  return (
    <>
      <Box p="2rem">
        <Flex
          justify="space-between"
          w="100%"
        >
          <Heading
            minW="30%"
            w="30%"
          >
            <Text
              fontSize="36px"
              fontWeight="600"
            >
              Olá, {user?.user.name}
            </Text>
            <Text
              fontSize="14px"
              fontWeight="400"
              mt="1rem"
            >
              Visualização das principais KPIs
            </Text>
          </Heading>
          <Flex
            align="flex-end"
            gap="1rem"
            justify="flex-end"
            minW="70%"
            w="70%"
          >
            <DatePicker onChange={(date) => console.log(date)} />
            <Popover>
              <PopoverTrigger>
                <Button
                  bg="#fff"
                  p="0 1rem"
                  variant="outline"
                  w={{ lg: '12rem', xl: '16rem' }}
                >
                  <Text
                    color="#898989"
                    fontWeight="400"
                    mr=".5rem"
                  >
                    Ator:
                  </Text>
                  <Text
                    fontWeight="400"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    Defina os atores
                  </Text>
                  <Icon
                    as={MdArrowDropDown}
                    ml="auto"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                p="1rem"
                w="17rem"
              >
                <Text
                  fontSize="24px"
                  fontWeight="600"
                  mb=".75rem"
                >
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
            <Button>Atualizar</Button>
          </Flex>
        </Flex>
      </Box>
      <SimpleGrid
        // eslint-disable-next-line canonical/sort-keys
        columns={{ 'lg': 2, 'xl': 3, '2xl': 4, '3xl': 4 }}
        p="1rem 2rem"
        spacing={5}
      >
        <CardInfo
          h={{ '3xl': '11rem' }}
          month="Jan"
          title="Faturamento"
          type="down"
          value="R$22.880,50"
          variation="21%"
          w={{ '3xl': '25rem' }}
        />
        <CardInfo
          h={{ '3xl': '11rem' }}
          month="Jan"
          title="Volume Mix"
          type="up"
          value="715"
          variation="21%"
          w={{ '3xl': '25rem' }}
        />
        <CardInfo
          h={{ '3xl': '11rem' }}
          month="Jan"
          title="Cobertura"
          type="down"
          value="209"
          variation="21%"
          w={{ '3xl': '25rem' }}
        />
        <CardInfo
          h={{ '3xl': '11rem' }}
          month="Jan"
          title="Ticket Médio"
          type="up"
          value="R$685,90"
          variation="+21%"
          w={{ '3xl': '25rem' }}
        />
        <CardInfo
          h={{ '3xl': '11rem' }}
          month="Jan"
          title="Volume Mix"
          type="up"
          value="715"
          variation="21%"
          w={{ '3xl': '25rem' }}
        />
        <CardInfo
          h={{ '3xl': '11rem' }}
          month="Jan"
          title="Volume Mix"
          type="up"
          value="715"
          variation="21%"
          w={{ '3xl': '25rem' }}
        />
        <CardInfo
          h={{ '3xl': '11rem' }}
          month="Jan"
          title="Volume Mix"
          type="up"
          value="715"
          variation="21%"
          w={{ '3xl': '25rem' }}
        />
        <CardInfo
          h={{ '3xl': '11rem' }}
          month="Jan"
          title="Volume Mix"
          type="up"
          value="715"
          variation="21%"
          w={{ '3xl': '25rem' }}
        />
      </SimpleGrid>
      <SimpleGrid
        // eslint-disable-next-line canonical/sort-keys
        columns={{ 'md': 1, 'lg': 2, 'xl': 2, '2xl': 3 }}
        p="1rem 2rem"
        spacing={7}
      >
        <CardGraphicList
          data={content}
          title="Top Cidades"
        />
        <CardGraphicList
          data={content}
          title="Top Segmentos"
        />
        <CardGraphicList
          data={content}
          title="Top Parceiros"
        />
      </SimpleGrid>
    </>
  );
}
