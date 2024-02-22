'use client';

import { Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Toast, useToast } from '@chakra-ui/react';
import PanelRegistrationData from './PanelRegistrationData';
import PanelContactData from './PanelContactData';
import PanelLocation from './PanelLocation';
import PanelSegmentation from './PanelSegmentation';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { isPrivatePage } from 'src/contexts/AuthContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postCustomerStore } from 'src/services/api/customerStore';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCustomers } from 'src/services/api/customer';
import { useRouter } from 'next/navigation';
import { putCustomerUpdate } from 'src/services/api/customerUpdate';

type ErrorType = {
  message: string;
  type: string;
  ref: HTMLElement;
};

const configSelectSchema = z.union([z.string().transform((val) => Number(val)), z.number()]);

const schema = z.object({
  contactName: z.string().min(0, 'O nome do contato é obrigatório'),
  phoneNumber: z.string(),
  email: z.string().email('E-mail inválido').min(0, 'O e-mail é obrigatório'),
  financialEmail: z.string().email('E-mail inválido'),
  zip: z.string(),
  address: z.string(),
  number: z.string(),
  complement: z.string(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  cnpj: z.string().min(0, 'O CNPJ é obrigatório'),
  socialName: z.string().min(0, 'A Razão Social é obrigatória'),
  fantasyName: z.string().min(0, 'O Nome Fantasia é obrigatório'),
  ie: z.string(),
  im: z.string(),
  situation: z.string(),
  incentive: z.boolean().optional(),
  customerReview: z.string(),
  comments: z.string(),
  segment: configSelectSchema,
  partner: configSelectSchema,
  flag: configSelectSchema,
  brand: configSelectSchema,
});

function NewCustomerPage() {
  const toast = useToast();
  const params = useParams();
  const router = useRouter();

  const [pageStatus, setPageStatus] = useState<'edit' | 'create'>('edit');

  const isValidParam = params?.id !== ' ' && !!Number(params?.id);

  useEffect(() => {
    if (isValidParam) setPageStatus('edit');
    else setPageStatus('create');
  }, [isValidParam, params.id]);

  const { data: customer } = useQuery({
    queryKey: ['customer', params.id],
    enabled: isValidParam && pageStatus === 'edit',
    queryFn: () => getCustomers({ customerId: Number(params?.id) }),
  });

  const customerData = customer && customer[0];

  const customerStoreMutation = useMutation({
    mutationFn: postCustomerStore,
    onSuccess: (data: { status: string; message: string; customer_id: number }) => {
      router.replace(`/customers/${data?.customer_id}`);
      toast({ status: 'success', description: 'Cliente cadastrado com sucesso' });
    },
    onError: (error) => {
      console.error('customerStoreMutationError', error);
      toast({ status: 'error', description: 'Erro ao cadastrar cliente' });
    },
  });

  const customerUpdateMutation = useMutation({
    mutationFn: putCustomerUpdate,
    onSuccess: () => {
      toast({ status: 'success', description: 'Cliente atualizado com sucesso' });
    },
    onError: (error) => {
      console.error('customerUpdateMutationError', error);
      toast({ status: 'error', description: 'Erro ao atualizar cliente' });
    },
  });

  const { register, handleSubmit, reset, formState, setValue } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (customerData) {
      setValue('contactName', customerData?.contact_name ?? '');
      setValue('phoneNumber', customerData.phone ?? '');
      setValue('email', customerData.email ?? '');
      setValue('financialEmail', customerData.email_billing ?? '');
      setValue('zip', customerData.address.zip);
      setValue('address', customerData.address.address);
      setValue('number', customerData.address.number);
      setValue('complement', customerData.address.complement ?? '');
      setValue('city', customerData.address.city);
      setValue('state', customerData.address.state);
      setValue('cnpj', customerData.cnpj);
      setValue('socialName', customerData.social_name);
      setValue('fantasyName', customerData.fantasy_name ?? '');
      setValue('ie', customerData.ie ?? '');
      setValue('im', customerData.im ?? '');
      setValue('situation', customerData.situation);
      setValue('incentive', customerData.incentive ?? false);
      // setValue('customerReview', customerData.validated ?? 0);
      setValue('comments', customerData.comments ?? '');
      setValue('segment', customerData.segment_id);
      setValue('partner', customerData.partner_id ?? 0);
      setValue('flag', customerData.flag_id ?? 0);
      setValue('brand', customerData.brand_id ?? 0);
    }
  }, [customerData, setValue]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (pageStatus === 'create') {
      customerStoreMutation.mutate({
        address: {
          city: data.city,
          complement: data.complement,
          number: data.number,
          state: data.state,
          address: data.address,
          zip: data.zip,
          neighborhood: data.neighborhood,
          latitude: 0,
          longitude: 0,
        },
        cnpj: data.cnpj,
        comments: data.comments,
        contact_name: data.contactName,
        email: data.email,
        email_billing: data.financialEmail,
        fantasy_name: data.fantasyName,
        ie: data.ie,
        im: data.im,
        phone: data.phoneNumber,
        social_name: data.socialName,
        address_id: 1,
        brand_id: data.brand,
        flag_id: data.flag,
        partner_id: data.partner,
        segment_id: data.segment,
        customer_info: {
          customer_id: 0,
          visit_frequency: '',
          postos_galonagem: 0,
          postos_frentistas: 0,
          postos_tem_troca_oleo: false,
          postos_tem_lavagem: false,
          postos_tem_conveniencia: false,
          postos_gerente: '',
          postos_chefe_pista: '',
          postos_lubrificador: '',
          postos_melhor_frentista: '',
          postos_tem_expositor_chao: false,
          postos_tem_expositor_bomba: false,
          postos_tem_expositor_acrilico: false,
          postos_tem_banners: false,
          postos_tem_adesivos: false,
          mont_conc_ca_passagem: 0,
          mont_conc_ca_consultores: 0,
          mont_conc_ca_gerente_pecas: '',
          mont_conc_ca_gerente_vendas: '',
          mont_conc_ca_chefe_oficina: '',
          mont_conc_ca_melhor_consultor: '',
          ca_qtd_elevadores: 0,
          ca_qtd_mecanicos: 0,
          ca_qtd_atendentes: 0,
          todos_decisor_nome: '',
          todos_decisor_email: '',
          todos_decisor_telefone: '',
          todos_decisor_aniversario: '',
          todos_melhor_horario: '',
          avaliacao_geral: 0,
          tem_meta_diaria_agentes_vendas: false,
          tem_comissao_venda_agentes: false,
          responsavel_acompanhamento_meta_diaria: '',
          multiplicador_nome: '',
          comments: '',
        },
      });
    }

    if (pageStatus === 'edit') {
      customerUpdateMutation.mutate({
        customer_id: Number(params.id),
        address: {
          city: data.city,
          complement: data.complement,
          number: data.number,
          state: data.state,
          address: data.address,
          zip: data.zip,
          neighborhood: data.neighborhood,
          latitude: 0,
          longitude: 0,
          address_id: customerData?.address_id ?? 0,
          geo_update_mode: 'API',
          update_mode: 'API',
        },
        situation: data.situation,
        customer_matrix_id: 1,
        update_mode: 'API',
        validated: customerData?.validated ?? 0,
        cnpj: data.cnpj,
        comments: data.comments,
        contact_name: data.contactName,
        email: data.email,
        email_billing: data.financialEmail,
        fantasy_name: data.fantasyName,
        ie: data.ie,
        im: data.im,
        phone: data.phoneNumber,
        social_name: data.socialName,
        address_id: customerData?.address_id ?? 0,
        brand_id: data.brand,
        flag_id: data.flag,
        partner_id: data.partner,
        segment_id: data.segment,
        customer_info: {
          actor_id: customerData?.customer_data[0]?.actor_id ?? 0,
          visit_frequency: customerData?.customer_info?.visit_frequency ?? '',
          postos_galonagem: customerData?.customer_info.postos_galonagem ?? 0,
          postos_frentistas: customerData?.customer_info.postos_frentistas ?? 0,
          postos_tem_troca_oleo: (customerData?.customer_info?.postos_tem_troca_oleo as unknown as boolean) ?? false,
          postos_tem_lavagem: (customerData?.customer_info?.postos_tem_lavagem as unknown as boolean) ?? false,
          postos_tem_conveniencia:
            (customerData?.customer_info?.postos_tem_conveniencia as unknown as boolean) ?? false,
          postos_gerente: customerData?.customer_info?.postos_gerente ?? '',
          postos_chefe_pista: customerData?.customer_info?.postos_chefe_pista ?? '',
          postos_lubrificador: customerData?.customer_info?.postos_lubrificador ?? '',
          postos_melhor_frentista: customerData?.customer_info?.postos_melhor_frentista ?? '',
          postos_tem_expositor_chao:
            (customerData?.customer_info?.postos_tem_expositor_chao as unknown as boolean) ?? false,
          postos_tem_expositor_bomba:
            (customerData?.customer_info?.postos_tem_expositor_bomba as unknown as boolean) ?? false,
          postos_tem_expositor_acrilico:
            (customerData?.customer_info?.postos_tem_expositor_acrilico as unknown as boolean) ?? false,
          postos_tem_banners: (customerData?.customer_info?.postos_tem_banners as unknown as boolean) ?? false,
          postos_tem_adesivos: (customerData?.customer_info?.postos_tem_adesivos as unknown as boolean) ?? false,
          mont_conc_ca_passagem: customerData?.customer_info?.mont_conc_ca_passagem ?? 0,
          mont_conc_ca_consultores: customerData?.customer_info?.mont_conc_ca_consultores ?? 0,
          mont_conc_ca_gerente_pecas: customerData?.customer_info?.mont_conc_ca_gerente_pecas ?? '',
          mont_conc_ca_gerente_vendas: customerData?.customer_info?.mont_conc_ca_gerente_vendas ?? '',
          mont_conc_ca_chefe_oficina: customerData?.customer_info?.mont_conc_ca_chefe_oficina ?? '',
          mont_conc_ca_melhor_consultor: customerData?.customer_info?.mont_conc_ca_melhor_consultor ?? '',
          ca_qtd_elevadores: customerData?.customer_info?.ca_qtd_elevadores ?? 0,
          ca_qtd_mecanicos: customerData?.customer_info?.ca_qtd_mecanicos ?? 0,
          ca_qtd_atendentes: customerData?.customer_info?.ca_qtd_atendentes ?? 0,
          todos_decisor_nome: customerData?.customer_info?.todos_decisor_nome ?? '',
          todos_decisor_email: customerData?.customer_info?.todos_decisor_email ?? '',
          todos_decisor_telefone: customerData?.customer_info?.todos_decisor_telefone ?? '',
          todos_decisor_aniversario: customerData?.customer_info?.todos_decisor_aniversario ?? '',
          todos_melhor_horario: customerData?.customer_info?.todos_melhor_horario ?? '',
          avaliacao_geral: customerData?.customer_info?.avaliacao_geral ?? 0,
          tem_meta_diaria_agentes_vendas:
            (customerData?.customer_info?.tem_meta_diaria_agentes_vendas as unknown as boolean) ?? false,
          tem_comissao_venda_agentes:
            (customerData?.customer_info?.tem_comissao_venda_agentes as unknown as boolean) ?? false,
          responsavel_acompanhamento_meta_diaria:
            customerData?.customer_info?.responsavel_acompanhamento_meta_diaria ?? '',
          multiplicador_nome: customerData?.customer_info?.multiplicador_nome ?? '',
          comments: customerData?.customer_info?.comments ?? '',
        },
      });
    }
  };

  const onCancel = (event: Event) => {
    event.preventDefault();
    reset();
    router.back();
  };

  const onError = (errors: z.inferFormattedError<typeof schema>) => {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const element = errors[key as keyof typeof errors] as unknown as ErrorType;
        toast({ status: 'error', description: element.message });
      }
    }
  };

  return (
    <PrivateLayout>
      <Box p="2rem">
        <Flex>
          <Heading>
            <Box as="span" color="#898989">
              Clientes/
            </Box>
            {customerData?.social_name || ''}
          </Heading>
        </Flex>
      </Box>
      <Tabs p="1rem 2rem">
        <TabList>
          <Tab>Dados Cadastrais</Tab>
          <Tab>Dados de contato</Tab>
          <Tab>Localização</Tab>
          <Tab>Segmentação</Tab>
          <Tab>Atributos</Tab>
          <Tab>Vínculos</Tab>
        </TabList>
        <TabPanels>
          <PanelRegistrationData
            formState={formState}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            onError={onError}
            onCancel={onCancel}
          />

          <PanelContactData
            formState={formState}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            onError={onError}
            onCancel={onCancel}
          />

          <PanelLocation
            formState={formState}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            onError={onError}
            onCancel={onCancel}
          />

          <PanelSegmentation
            formState={formState}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            onError={onError}
            onCancel={onCancel}
          />

          <TabPanel>Atributos</TabPanel>
          <TabPanel>Vínculos</TabPanel>
        </TabPanels>
      </Tabs>
    </PrivateLayout>
  );
}

export default isPrivatePage(NewCustomerPage);
