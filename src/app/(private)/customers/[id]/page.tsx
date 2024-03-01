'use client';

import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getCustomers } from '../../../../services/api/customer';
import { postCustomerStore } from '../../../../services/api/customerStore';
import { putCustomerUpdate } from '../../../../services/api/customerUpdate';
import { PanelContactData } from './PanelContactData';
import { PanelLocation } from './PanelLocation';
import { PanelRegistrationData } from './PanelRegistrationData';
import { PanelSegmentation } from './PanelSegmentation';

type ErrorType = {
  message: string;
  ref: HTMLElement;
  type: string;
};

const configSelectSchema = z.union([
  z.string().transform((val) => Number(val)),
  z.number(),
]);

const schema = z.object({
  address: z.string(),
  brand: configSelectSchema,
  city: z.string(),
  cnpj: z.string().min(0, 'O CNPJ é obrigatório'),
  comments: z.string(),
  complement: z.string(),
  contactName: z.string().min(0, 'O nome do contato é obrigatório'),
  customerReview: z.string(),
  email: z.string().email('E-mail inválido').min(0, 'O e-mail é obrigatório'),
  fantasyName: z.string().min(0, 'O Nome Fantasia é obrigatório'),
  financialEmail: z.string().email('E-mail inválido'),
  flag: configSelectSchema,
  ie: z.string(),
  im: z.string(),
  incentive: z
    .boolean()
    .transform((val) => Boolean(val))
    .optional(),
  neighborhood: z.string(),
  number: z.string(),
  partner: configSelectSchema,
  phoneNumber: z.string(),
  segment: configSelectSchema,
  situation: z.string(),
  socialName: z.string().min(0, 'A Razão Social é obrigatória'),
  state: z.string(),
  zip: z.string(),
});

export default function NewCustomerPage() {
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
    enabled: isValidParam && pageStatus === 'edit',
    queryFn: () => getCustomers({ customerId: Number(params?.id) }),
    queryKey: ['customer', params.id],
  });

  const customerData = customer && customer[0];

  const customerStoreMutation = useMutation({
    mutationFn: postCustomerStore,
    onError: (error) => {
      console.error('customerStoreMutationError', error);
      toast({ description: 'Erro ao cadastrar cliente', status: 'error' });
    },
    onSuccess: (data: {
      customer_id: number;
      message: string;
      status: string;
    }) => {
      router.replace(`/customers/${data?.customer_id}`);
      toast({
        description: 'Cliente cadastrado com sucesso',
        status: 'success',
      });
    },
  });

  const customerUpdateMutation = useMutation({
    mutationFn: putCustomerUpdate,
    onError: (error) => {
      console.error('customerUpdateMutationError', error);
      toast({ description: 'Erro ao atualizar cliente', status: 'error' });
    },
    onSuccess: () => {
      toast({
        description: 'Cliente atualizado com sucesso',
        status: 'success',
      });
    },
  });

  const { register, handleSubmit, reset, formState, setValue } = useForm<
    z.infer<typeof schema>
  >({
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
          address: data.address,
          city: data.city,
          complement: data.complement,
          latitude: 0,
          longitude: 0,
          neighborhood: data.neighborhood,
          number: data.number,
          state: data.state,
          zip: data.zip,
        },
        address_id: 1,
        brand_id: data.brand,
        cnpj: data.cnpj,
        comments: data.comments,
        contact_name: data.contactName,
        customer_info: {
          avaliacao_geral: 0,
          ca_qtd_atendentes: 0,
          ca_qtd_elevadores: 0,
          ca_qtd_mecanicos: 0,
          comments: '',
          customer_id: 0,
          mont_conc_ca_chefe_oficina: '',
          mont_conc_ca_consultores: 0,
          mont_conc_ca_gerente_pecas: '',
          mont_conc_ca_gerente_vendas: '',
          mont_conc_ca_melhor_consultor: '',
          mont_conc_ca_passagem: 0,
          multiplicador_nome: '',
          postos_chefe_pista: '',
          postos_frentistas: 0,
          postos_galonagem: 0,
          postos_gerente: '',
          postos_lubrificador: '',
          postos_melhor_frentista: '',
          postos_tem_adesivos: false,
          postos_tem_banners: false,
          postos_tem_conveniencia: false,
          postos_tem_expositor_acrilico: false,
          postos_tem_expositor_bomba: false,
          postos_tem_expositor_chao: false,
          postos_tem_lavagem: false,
          postos_tem_troca_oleo: false,
          responsavel_acompanhamento_meta_diaria: '',
          tem_comissao_venda_agentes: false,
          tem_meta_diaria_agentes_vendas: false,
          todos_decisor_aniversario: '',
          todos_decisor_email: '',
          todos_decisor_nome: '',
          todos_decisor_telefone: '',
          todos_melhor_horario: '',
          visit_frequency: '',
        },
        email: data.email,
        email_billing: data.financialEmail,
        fantasy_name: data.fantasyName,
        flag_id: data.flag,
        ie: data.ie,
        im: data.im,
        incentive: data.incentive ?? false,
        partner_id: data.partner,
        phone: data.phoneNumber,
        segment_id: data.segment,
        social_name: data.socialName,
      });
    }

    if (pageStatus === 'edit') {
      customerUpdateMutation.mutate({
        address: {
          address: data.address,
          address_id: customerData?.address_id ?? 0,
          city: data.city,
          complement: data.complement,
          geo_update_mode: 'API',
          latitude: 0,
          longitude: 0,
          neighborhood: data.neighborhood,
          number: data.number,
          state: data.state,
          update_mode: 'API',
          zip: data.zip,
        },
        address_id: customerData?.address_id ?? 0,
        brand_id: data.brand,
        cnpj: data.cnpj,
        comments: data.comments,
        contact_name: data.contactName,
        customer_id: Number(params.id),
        customer_info: {
          actor_id: customerData?.customer_data[0]?.actor_id ?? 0,
          avaliacao_geral: customerData?.customer_info?.avaliacao_geral ?? 0,
          ca_qtd_atendentes:
            customerData?.customer_info?.ca_qtd_atendentes ?? 0,
          ca_qtd_elevadores:
            customerData?.customer_info?.ca_qtd_elevadores ?? 0,
          ca_qtd_mecanicos: customerData?.customer_info?.ca_qtd_mecanicos ?? 0,
          comments: customerData?.customer_info?.comments ?? '',
          mont_conc_ca_chefe_oficina:
            customerData?.customer_info?.mont_conc_ca_chefe_oficina ?? '',
          mont_conc_ca_consultores:
            customerData?.customer_info?.mont_conc_ca_consultores ?? 0,
          mont_conc_ca_gerente_pecas:
            customerData?.customer_info?.mont_conc_ca_gerente_pecas ?? '',
          mont_conc_ca_gerente_vendas:
            customerData?.customer_info?.mont_conc_ca_gerente_vendas ?? '',
          mont_conc_ca_melhor_consultor:
            customerData?.customer_info?.mont_conc_ca_melhor_consultor ?? '',
          mont_conc_ca_passagem:
            customerData?.customer_info?.mont_conc_ca_passagem ?? 0,
          multiplicador_nome:
            customerData?.customer_info?.multiplicador_nome ?? '',
          postos_chefe_pista:
            customerData?.customer_info?.postos_chefe_pista ?? '',
          postos_frentistas: customerData?.customer_info.postos_frentistas ?? 0,
          postos_galonagem: customerData?.customer_info.postos_galonagem ?? 0,
          postos_gerente: customerData?.customer_info?.postos_gerente ?? '',
          postos_lubrificador:
            customerData?.customer_info?.postos_lubrificador ?? '',
          postos_melhor_frentista:
            customerData?.customer_info?.postos_melhor_frentista ?? '',
          postos_tem_adesivos:
            (customerData?.customer_info
              ?.postos_tem_adesivos as unknown as boolean) ?? false,
          postos_tem_banners:
            (customerData?.customer_info
              ?.postos_tem_banners as unknown as boolean) ?? false,
          postos_tem_conveniencia:
            (customerData?.customer_info
              ?.postos_tem_conveniencia as unknown as boolean) ?? false,
          postos_tem_expositor_acrilico:
            (customerData?.customer_info
              ?.postos_tem_expositor_acrilico as unknown as boolean) ?? false,
          postos_tem_expositor_bomba:
            (customerData?.customer_info
              ?.postos_tem_expositor_bomba as unknown as boolean) ?? false,
          postos_tem_expositor_chao:
            (customerData?.customer_info
              ?.postos_tem_expositor_chao as unknown as boolean) ?? false,
          postos_tem_lavagem:
            (customerData?.customer_info
              ?.postos_tem_lavagem as unknown as boolean) ?? false,
          postos_tem_troca_oleo:
            (customerData?.customer_info
              ?.postos_tem_troca_oleo as unknown as boolean) ?? false,
          responsavel_acompanhamento_meta_diaria:
            customerData?.customer_info
              ?.responsavel_acompanhamento_meta_diaria ?? '',
          tem_comissao_venda_agentes:
            (customerData?.customer_info
              ?.tem_comissao_venda_agentes as unknown as boolean) ?? false,
          tem_meta_diaria_agentes_vendas:
            (customerData?.customer_info
              ?.tem_meta_diaria_agentes_vendas as unknown as boolean) ?? false,
          todos_decisor_aniversario:
            customerData?.customer_info?.todos_decisor_aniversario ?? '',
          todos_decisor_email:
            customerData?.customer_info?.todos_decisor_email ?? '',
          todos_decisor_nome:
            customerData?.customer_info?.todos_decisor_nome ?? '',
          todos_decisor_telefone:
            customerData?.customer_info?.todos_decisor_telefone ?? '',
          todos_melhor_horario:
            customerData?.customer_info?.todos_melhor_horario ?? '',
          visit_frequency: customerData?.customer_info?.visit_frequency ?? '',
        },
        customer_matrix_id: 1,
        email: data.email,
        email_billing: data.financialEmail,
        fantasy_name: data.fantasyName,
        flag_id: data.flag,
        ie: data.ie,
        im: data.im,
        incentive: data.incentive ?? false,
        partner_id: data.partner,
        phone: data.phoneNumber,
        segment_id: data.segment,
        situation: data.situation,
        social_name: data.socialName,
        update_mode: 'API',
        validated: customerData?.validated ?? 0,
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
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        const element = errors[
          key as keyof typeof errors
        ] as unknown as ErrorType;
        toast({ description: element.message, status: 'error' });
      }
    }
  };

  return (
    <>
      <Box p="2rem">
        <Flex>
          <Heading>
            <Box
              as="span"
              color="#898989"
            >
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
            register={register}
            onCancel={onCancel}
            onError={onError}
            onSubmit={onSubmit}
          />

          <PanelContactData
            formState={formState}
            handleSubmit={handleSubmit}
            register={register}
            onCancel={onCancel}
            onError={onError}
            onSubmit={onSubmit}
          />

          <PanelLocation
            formState={formState}
            handleSubmit={handleSubmit}
            register={register}
            setValue={setValue}
            onCancel={onCancel}
            onError={onError}
            onSubmit={onSubmit}
          />

          <PanelSegmentation
            formState={formState}
            handleSubmit={handleSubmit}
            register={register}
            onCancel={onCancel}
            onError={onError}
            onSubmit={onSubmit}
          />

          <TabPanel>Atributos</TabPanel>
          <TabPanel>Vínculos</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
