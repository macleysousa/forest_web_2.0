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
import { useState } from 'react';
import { scheduleMicrotask } from 'react-query/types/core/utils';

type ErrorType = {
  message: string;
  type: string;
  ref: HTMLElement;
};

const schema = z.object({
  contactName: z.string().min(0, 'O nome do contato é obrigatório'),
  phoneNumber: z.string().min(0, 'O telefone é obrigatório'),
  email: z.string().email('E-mail inválido').min(0, 'O e-mail é obrigatório'),
  financialEmail: z.string().email('E-mail inválido').min(0, 'O e-mail é obrigatório'),
  zip: z.string().min(8, 'CEP inválido'),
  address: z.string().min(3, 'Endereço inválido'),
  number: z.string().min(1, 'Número inválido'),
  complement: z.string(),
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().min(2, 'Estado inválido'),
  cnpj: z
    .string()
    .regex(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/, 'Formato inválido')
    .min(0, 'O CNPJ é obrigatório'),
  socialName: z.string().min(0, 'A Razão Social é obrigatória'),
  fantasyName: z.string(),
  ie: z.string(),
  im: z.string(),
  situation: z.string(),
  customerReview: z.string(),
  comments: z.string(),
  segment: z.string().transform((val) => Number(val)),
  partner: z.string().transform((val) => Number(val)),
  flag: z.string().transform((val) => Number(val)),
  brand: z.string().transform((val) => Number(val)),
});

function NewCustomerPage() {
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);

    postCustomerStore({
      address: {
        city: data.city,
        complement: data.complement,
        number: data.number,
        state: data.state,
        address: data.address,
        zip: data.zip,
        neighborhood: '',
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
    });
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
          <Heading>Clientes/</Heading>
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
          />

          <PanelContactData
            formState={formState}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            onError={onError}
          />

          <PanelLocation
            formState={formState}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            onError={onError}
          />

          <PanelSegmentation
            formState={formState}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            onError={onError}
          />

          <TabPanel>Atributos</TabPanel>
          <TabPanel>Vínculos</TabPanel>
        </TabPanels>
      </Tabs>
    </PrivateLayout>
  );
}

export default isPrivatePage(NewCustomerPage);
