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
  cep: z.string().min(8, 'CEP inválido'),
  street: z.string().min(3, 'Endereço inválido'),
  number: z.string().min(1, 'Número inválido'),
  addressComplement: z.string(),
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().min(2, 'Estado inválido'),
  cnpj: z
    .string()
    .regex(/(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/, 'Formato inválido')
    .min(0, 'O CNPJ é obrigatório'),
  corporateReason: z.string().min(0, 'A Razão Social é obrigatória'),
  fantasyName: z.string(),
  ie: z.string(),
  im: z.string(),
  situation: z.string(),
  customerReview: z.string(),
  comments: z.string(),
  segment: z.string().min(1, 'Segmento inválido'),
  partner: z.string().min(1, 'Parceiro inválido'),
  flag: z.string(),
  net: z.string(),
});

function NewCustomerPage() {
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
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
