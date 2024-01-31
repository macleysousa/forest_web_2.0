'use client';

import { Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PanelRegistrationData from './PanelRegistrationData';
import PanelContactData from './PanelContactData';
import PanelLocation from './PanelLocation';
import PanelSegmentation from './PanelSegmentation';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { isPrivatePage } from 'src/contexts/AuthContext';

function NewClientPage() {
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
          <PanelRegistrationData />

          <PanelContactData />

          <PanelLocation />

          <PanelSegmentation />

          <TabPanel>Four</TabPanel>
          <TabPanel>Five</TabPanel>
          <TabPanel>Six</TabPanel>
        </TabPanels>
      </Tabs>
    </PrivateLayout>
  );
}

export default isPrivatePage(NewClientPage);
