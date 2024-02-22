'use client';
import { Badge, Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CgMenuGridR } from 'react-icons/cg';
import { MdArrowDropDown, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage, useAuthContext } from 'src/contexts/AuthContext';
import { getCustomersPlanning } from 'src/services/api/customers-planning';
import { getUser } from 'src/services/api/user';

type CustomerPlanning = Awaited<ReturnType<typeof getCustomersPlanning>>

type ActorTree = Awaited<ReturnType<typeof getUser>>['actor_tree'][number];

function CustomerPlanningPage() {
  const toast = useToast();
  const [customersPlanning, setCustomersPlanning] = useState<CustomerPlanning[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('1');
  const [actor, setActor] = useState<ActorTree | null>(null);
  const auth = useAuthContext();

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    const params = {
      actor_id: actor?.actor_id.toString(),
      tree_id: actor?.tree_id.toString(),
      page,
    };

    getCustomersPlanning({ ...params, signal: controller.signal })
      .then((result) => setCustomersPlanning((prev) => prev.concat(result)))
      .catch((error) => error.name !== 'CanceledError' && toast({ status: 'error', title: error.message }))
      .finally(() => setLoading(false));

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
    <PrivateLayout>
      <Box p="2rem">
        <Flex alignItems="center">
          <Heading>
            Planejamento de Clientes
          </Heading>
          <Flex marginLeft="auto" gap="1rem">
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                h="2.5rem"
                bg="white"
                border="1px solid #DCDCDC"
                fontWeight="400"
                rightIcon={<MdArrowDropDown color="#898989" />}
              >
                <Text as="span" color="#898989" display="inline-block" mr="0.25rem">
                  Ator:
                </Text>
                {actor ? actor.name : 'Selecione um ator'}
              </MenuButton>
              <MenuList>
                {auth.is === 'authenticated' && auth.user.actor_tree.map((actorTree) => (
                  <MenuItem
                    key={JSON.stringify(actorTree)}
                    fontSize="sm"
                    onClick={handleActorChange(actorTree)}
                    icon={JSON.stringify(actorTree) === JSON.stringify(actor) ? <MdCheckBox fontSize="1rem" /> : <MdCheckBoxOutlineBlank fontSize="1rem" />}
                  >
                    {actorTree.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <ButtonPrimary leftIcon={<CgMenuGridR fontSize="1.5rem" />} h="2.5rem" isDisabled>
              Dashboard
            </ButtonPrimary>
          </Flex>
        </Flex>
        <Flex marginTop="1.75rem" maxWidth="80rem" justifyContent="space-between" marginLeft="auto" marginRight="auto">
          {
            [
              { label: 'Totais', value: customersPlanning.reduce((total, customerPlanning) => total + customerPlanning.customers_planning.totals.count_customers, 0) },
              { label: 'Ativos', value: customersPlanning.reduce((total, customerPlanning) => total + customerPlanning.customers_planning.totals.count_active, 0) },
              { label: 'Inativos', value: customersPlanning.reduce((total, customerPlanning) => total + customerPlanning.customers_planning.totals.count_inactive, 0) },
              { label: 'Prospects', value: customersPlanning.reduce((total, customerPlanning) => total + customerPlanning.customers_planning.totals.count_prospect, 0) },
              { label: 'Volume Mix', value: customersPlanning.reduce((total, customerPlanning) => total + customerPlanning.customers_planning.totals.sum_volume_mix_target, 0) },
            ]
              .map(({ label, value }) => (
                <Flex
                  background="#FFFFFF"
                  border="1px solid #DCDCDC"
                  textAlign="center"
                  width="9rem"
                  height="6.8125rem"
                  flexDirection="column"
                  borderRadius="0.5rem"
                  paddingTop="1.25rem"
                  paddingBottom="1.25rem"
                  key={label}
                >
                  <Text fontSize="sm">
                    {label}
                  </Text>
                  <Flex flexGrow="1" justifyContent="center" alignItems="center">
                    <Text fontSize="2xl" fontWeight="700">
                      {value.toLocaleString('pt-BR')}
                    </Text>
                  </Flex>
                </Flex>
              ))
          }
        </Flex>
        <TableContainer marginTop="2rem" background="#FFFFFF" borderRadius="0.5rem" boxShadow="base">
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
              {customersPlanning.map((customerPlanning) => customerPlanning.customers_planning.data.map((item, i) => ((
                  <Tr key={item.id} background={i % 2 === 0 ? '#FFFFFF' : '#F9F9F9'}>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        {item.actor_name}
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        {item.segment_name}
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        {item.partner_name}
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs" display="inline-block" maxWidth="4rem" whiteSpace="normal" lineHeight="1rem">
                        {item.flag_name}
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Box display="inline-flex" flexDirection="column" alignItems="center" gap="0.5rem">
                        <Text as="span" fontSize="xs" textDecoration="underline">
                          {item.social_name}
                        </Text>
                        <Text as="span" fontSize="xs" background="#E9F1F2" color="#70B6C1" textAlign="center" width="100%">
                          {item.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')}
                        </Text>
                      </Box>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        {item.city}
                      </Text>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Badge background="#DBEEE7" color="#00A163">
                        {item.customer_status}
                      </Badge>
                    </Td>
                    <Td padding="1.25rem 0.75rem" textAlign="center">
                      <Text as="span" fontSize="xs">
                        -
                      </Text>
                    </Td>
                  </Tr>
              ))))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex mt="2rem" justify="center">
          <Button
            size="sm"
            h="2.5rem"
            color="#1E93FF"
            bg="#FFFFFF"
            border="1px solid #1E93FF"
            onClick={() => setPage(String(Number(page) + 1))}
            isDisabled={loading || !customersPlanning.at(-1)?.customers_planning.next_page_url}
          >
            Carregar mais
          </Button>
        </Flex>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(CustomerPlanningPage);
