'use client';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { CgMenuGridR } from 'react-icons/cg';

import {
  MdArrowDropDown,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';

import { useAuthContext } from '../../../contexts/AuthContext';
import { getCustomersPlanning } from '../../../services/api/customers-planning';
import { getUser } from '../../../services/api/user';

type CustomerPlanning = Awaited<ReturnType<typeof getCustomersPlanning>>;

type ActorTree = Awaited<ReturnType<typeof getUser>>['actor_tree'][number];

export default function CustomerPlanningPage() {
  const toast = useToast();
  const [customersPlanning, setCustomersPlanning] = useState<
    CustomerPlanning[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('1');
  const [actor, setActor] = useState<ActorTree | null>(null);
  const auth = useAuthContext();

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    const params = {
      actor_id: actor?.actor_id.toString(),
      page,
      tree_id: actor?.tree_id.toString(),
    };

    /* eslint-disable prettier/prettier */
    getCustomersPlanning({ ...params, signal: controller.signal })
      .then((result) => setCustomersPlanning((prev) => prev.concat(result)))
      .catch((error) => error.name !== 'CanceledError' && toast({ status: 'error', title: error.message }))
      .finally(() => setLoading(false));
    /* eslint-enable prettier/prettier */

    return () => controller.abort();
  }, [toast, page, actor]);

  const handleActorChange = (actorTree: ActorTree) => () => {
    setCustomersPlanning([]);
    setPage('1');

    if (JSON.stringify(actor) === JSON.stringify(actorTree)) {
      setActor(null);
      return;
    }

    setActor(actorTree);
  };

  return (
    <Box p="2rem">
      <Flex alignItems="center">
        <Heading>Planejamento de Clientes</Heading>
        <Flex
          gap="1rem"
          marginLeft="auto"
        >
          <Menu>
            <MenuButton
              as={Button}
              bg="white"
              border="1px solid #DCDCDC"
              fontWeight="400"
              h="2.5rem"
              rightIcon={<MdArrowDropDown color="#898989" />}
              size="sm"
            >
              <Text
                as="span"
                color="#898989"
                display="inline-block"
                mr="0.25rem"
              >
                Ator:
              </Text>
              {actor ? actor.name : 'Selecione um ator'}
            </MenuButton>
            <MenuList>
              {auth.is === 'authenticated' &&
                auth.user.actor_tree.map((actorTree) => (
                  <MenuItem
                    key={JSON.stringify(actorTree)}
                    fontSize="sm"
                    icon={
                      JSON.stringify(actorTree) === JSON.stringify(actor) ? (
                        <MdCheckBox fontSize="1rem" />
                      ) : (
                        <MdCheckBoxOutlineBlank fontSize="1rem" />
                      )
                    }
                    onClick={handleActorChange(actorTree)}
                  >
                    {actorTree.name}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
          <Button
            h="2.5rem"
            leftIcon={<CgMenuGridR fontSize="1.5rem" />}
            variant="solid"
            isDisabled
          >
            Dashboard
          </Button>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        marginLeft="auto"
        marginRight="auto"
        marginTop="1.75rem"
        maxWidth="80rem"
      >
        {[
          {
            label: 'Totais',
            value: customersPlanning.reduce(
              (total, customerPlanning) =>
                total +
                customerPlanning.customers_planning.totals.count_customers,
              0,
            ),
          },
          {
            label: 'Ativos',
            value: customersPlanning.reduce(
              (total, customerPlanning) =>
                total + customerPlanning.customers_planning.totals.count_active,
              0,
            ),
          },
          {
            label: 'Inativos',
            value: customersPlanning.reduce(
              (total, customerPlanning) =>
                total +
                customerPlanning.customers_planning.totals.count_inactive,
              0,
            ),
          },
          {
            label: 'Prospects',
            value: customersPlanning.reduce(
              (total, customerPlanning) =>
                total +
                customerPlanning.customers_planning.totals.count_prospect,
              0,
            ),
          },
          {
            label: 'Volume Mix',
            value: customersPlanning.reduce(
              (total, customerPlanning) =>
                total +
                customerPlanning.customers_planning.totals
                  .sum_volume_mix_target,
              0,
            ),
          },
        ].map(({ label, value }) => (
          <Flex
            key={label}
            background="#FFFFFF"
            border="1px solid #DCDCDC"
            borderRadius="0.5rem"
            flexDirection="column"
            height="6.8125rem"
            paddingBottom="1.25rem"
            paddingTop="1.25rem"
            textAlign="center"
            width="9rem"
          >
            <Text fontSize="sm">{label}</Text>
            <Flex
              alignItems="center"
              flexGrow="1"
              justifyContent="center"
            >
              <Text
                fontSize="2xl"
                fontWeight="700"
              >
                {value.toLocaleString('pt-BR')}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <TableContainer
        background="#FFFFFF"
        borderRadius="0.5rem"
        boxShadow="base"
        marginTop="2rem"
      >
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="center">Região</Th>
              <Th textAlign="center">Segmento</Th>
              <Th textAlign="center">Parceiro</Th>
              <Th textAlign="center">Bandeira</Th>
              <Th textAlign="center">Cliente</Th>
              <Th textAlign="center">Cidade</Th>
              <Th textAlign="center">Status</Th>
              <Th textAlign="center">Frentistas/Consultores</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customersPlanning.map((customerPlanning) =>
              customerPlanning.customers_planning.data.map((item, i) => (
                <Tr
                  key={item.id}
                  background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}
                >
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {item.actor_name}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {item.segment_name}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {item.partner_name}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      display="inline-block"
                      fontSize="xs"
                      lineHeight="1rem"
                      maxWidth="4rem"
                      whiteSpace="normal"
                    >
                      {item.flag_name}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Box
                      alignItems="center"
                      display="inline-flex"
                      flexDirection="column"
                      gap="0.5rem"
                    >
                      <Text
                        as="span"
                        fontSize="xs"
                        textDecoration="underline"
                      >
                        {item.social_name}
                      </Text>
                      <Text
                        as="span"
                        background="#E9F1F2"
                        color="#70B6C1"
                        fontSize="xs"
                        textAlign="center"
                        width="100%"
                      >
                        {item.cnpj.replace(
                          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                          '$1.$2.$3/$4-$5',
                        )}
                      </Text>
                    </Box>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      {item.city}
                    </Text>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Badge
                      background="#DBEEE7"
                      color="#00A163"
                    >
                      {item.customer_status}
                    </Badge>
                  </Td>
                  <Td
                    padding="1.25rem 0.75rem"
                    textAlign="center"
                  >
                    <Text
                      as="span"
                      fontSize="xs"
                    >
                      -
                    </Text>
                  </Td>
                </Tr>
              )),
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        justify="center"
        mt="2rem"
      >
        <Button
          bg="#FFFFFF"
          border="1px solid #1E93FF"
          color="#1E93FF"
          h="2.5rem"
          size="sm"
          isDisabled={
            loading ||
            !customersPlanning.at(-1)?.customers_planning.next_page_url
          }
          onClick={() => setPage(String(Number(page) + 1))}
        >
          Carregar mais
        </Button>
      </Flex>
    </Box>
  );
}
