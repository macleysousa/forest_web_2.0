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
import { ButtonFilter } from 'src/components/ui/ButtonFilter';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import CardGraphicList from 'src/components/ui/CardGraphicList';
import CardInfo from 'src/components/ui/CardInfo';
import DatePicker from 'src/components/ui/DatePicker';
import { useSession } from 'src/contexts/use-session';
import Authorized from 'src/layouts/authorized/Authorized';

export default function Dashboard() {
  const { user } = useSession();

  const content = [
    { name: 'Montadoras', value: '333.678' },
    { name: 'Postos', value: '234.555' },
    { name: 'Concessionárias Credenciadas', value: '123.456' },
    { name: 'Oficinas', value: '98.765' },
    { name: 'Revendedores', value: '210.987' },
  ];

  return (
    <Authorized>
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
            <DatePicker className="w-48" onChange={(date) => console.log(date)} selectedDate={new Date()} />

            <Popover>
              <PopoverTrigger>
                <Button variant="outline" bg="#fff" w="15rem" p="0 1rem">
                  <Text fontWeight="400" color="#898989" mr=".5rem">
                    Ator:
                  </Text>
                  <Text fontWeight="400">Defina os atores</Text>
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
      <SimpleGrid columns={{ lg: 2, xl: 3, '2xl': 4 }} spacing={5} p="1rem 2rem">
        <CardInfo title="Faturamento" value="R$22.880,50" type="down" variation="21%" month="Jan" />
        <CardInfo title="Volume Mix" value="715" type="up" variation="21%" month="Jan" />
        <CardInfo title="Cobertura" value="209" type="down" variation="21%" month="Jan" />
        <CardInfo title="Ticket Médio" value="R$685,90" type="up" variation="+21%" month="Jan" />
        <CardInfo title="Volume Mix" value="715" type="up" variation="21%" month="Jan" />
        <CardInfo title="Volume Mix" value="715" type="up" variation="21%" month="Jan" />
        <CardInfo title="Volume Mix" value="715" type="up" variation="21%" month="Jan" />
        <CardInfo title="Volume Mix" value="715" type="up" variation="21%" month="Jan" />
      </SimpleGrid>
      <SimpleGrid columns={{ lg: 1, xl: 2, '2xl': 3 }} spacing={7} p="1rem 2rem">
        <CardGraphicList content={content} title="Top Cidades" />
        <CardGraphicList content={content} title="Top Segmentos" />
        <CardGraphicList content={content} title="Top Parceiros" />
      </SimpleGrid>
    </Authorized>
  );
}
