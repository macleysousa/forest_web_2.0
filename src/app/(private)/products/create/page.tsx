'use client';
import { Box, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Icon, Image, Input, InputGroup, InputRightElement, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { isPrivatePage } from 'src/contexts/AuthContext';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';

function CreateProductPage() {
  const photoRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoAdd = () => {
    photoRef.current?.click();
  };

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files.item(0);

    if (file === null) {
      setPhoto(null);
      return;
    }

    const promise = new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });

    promise.then(setPhoto);
  };

  return (
    <PrivateLayout>
      <Box padding="2rem">
        <Grid templateColumns="repeat(12, minmax(0, 1fr))" gap="2rem">
          <GridItem colSpan={3}>
            <Text fontSize="2xl" fontWeight="600">
              <Text as="span" color="#898989">Produto /</Text> Criar Novo
            </Text>
            <Box background="#FFFFFF" shadow="base" marginTop="1.5rem" padding="0.875rem 1.5rem" borderRadius="0.5rem">
              <Flex maxWidth="12.5rem" aspectRatio="1 / 1" border="1px solid #DCDCDC" borderRadius="6.25rem" alignItems="center" justifyContent="center" marginLeft="auto" marginRight="auto" overflow="hidden">
                {
                  photo
                    ? (<Image src={photo} alt="" width="100%" height="100%" objectFit="cover" />)
                    : (<Icon as={FaCamera} width="4.5rem" height="4.5rem" color="#898989" />)
                }
              </Flex>
              <Text textAlign="center" marginTop="1.5rem" color="#5A5A5A">
                Adicione uma foto para o produto na resolução 1024x800 pixels
              </Text>
            </Box>
            <Box display="grid" marginTop="1rem">
              <input ref={photoRef} type="file" style={{ display: 'none' }} accept="image/*" onChange={handlePhotoChange} />
              <ButtonOutline size="xs" borderColor="#1E93FF" color="#1E93FF" background="#FFFFFF" onClick={handlePhotoAdd}>
                Adicionar Foto
              </ButtonOutline>
            </Box>
          </GridItem>
          <GridItem colSpan={9}>
            <Tabs>
              <TabList>
                <Tab>Dados do Produto</Tab>
                <Tab>Linha do Tempo</Tab>
              </TabList>
              <TabPanels>
                <TabPanel padding="1rem 0rem">
                  <Grid templateColumns="repeat(12, minmax(0, 1fr))" background="#FFFFFF" padding="1rem 1.5rem 2.75rem 0.75rem" borderRadius="0.5rem" shadow="base" gap="1.5rem">
                    <GridItem colSpan={5}>
                      <FormControl>
                        <FormLabel fontSize="sm">Código</FormLabel>
                        <Input placeholder="XXXXXXXXXXX" />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={7}>
                      <FormControl>
                        <FormLabel fontSize="sm">Nome do Produto</FormLabel>
                        <Input placeholder="Digite o Nome do Produto" />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <FormControl>
                        <FormLabel fontSize="sm">Categoria</FormLabel>
                        <Flex gap="1.5rem">
                          <Input placeholder="Defina uma Categoria" />
                          <ButtonOutline borderColor="#1E93FF" color="#1E93FF" leftIcon={<IoAdd />}>
                            Nova
                          </ButtonOutline>
                        </Flex>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <FormControl>
                        <FormLabel fontSize="sm">Segmento Atendido</FormLabel>
                        <Input placeholder="Digite os Segmento" />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                      <FormControl>
                        <FormLabel fontSize="sm">Quantidade e Unidade de Venda</FormLabel>
                        <InputGroup>
                          <Input placeholder="Ex.: 1" />
                          <InputRightElement borderLeft="1px solid var(--chakra-colors-gray-300)" width="auto">
                            <Select borderColor="transparent" borderLeftRadius="0" height="3rem">
                              <option value="">Un</option>
                            </Select>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                      <FormControl>
                        <FormLabel fontSize="sm">Código de Barras</FormLabel>
                        <Input placeholder="Digite o Código de Barras Padrão" />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Flex justifyContent="flex-end" gap="1.5rem" marginTop="1.5rem">
                    <Link href="/products" passHref legacyBehavior>
                      <ButtonOutline as="a" height="2.5rem" color="#202020" borderColor="#DCDCDC" background="#FFFFFF">
                        Cancelar
                      </ButtonOutline>
                    </Link>
                    <ButtonPrimary height="2.5rem" background="#1E93FF">
                      Salvar Novo
                    </ButtonPrimary>
                  </Flex>
                </TabPanel>
                <TabPanel padding="1rem 0rem">
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
        </Grid>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(CreateProductPage);
