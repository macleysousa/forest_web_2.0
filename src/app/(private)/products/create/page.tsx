'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';

export default function CreateProductPage() {
  const photoRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoAdd = () => {
    photoRef.current?.click();
  };

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
    <Box padding="2rem">
      <Grid
        gap="2rem"
        templateColumns="repeat(12, minmax(0, 1fr))"
      >
        <GridItem colSpan={3}>
          <Text
            fontSize="2xl"
            fontWeight="600"
          >
            <Text
              as="span"
              color="#898989"
            >
              Produto /
            </Text>{' '}
            Criar Novo
          </Text>
          <Box
            background="#FFFFFF"
            borderRadius="0.5rem"
            marginTop="1.5rem"
            padding="0.875rem 1.5rem"
            shadow="base"
          >
            <Flex
              alignItems="center"
              aspectRatio="1 / 1"
              border="1px solid #DCDCDC"
              borderRadius="6.25rem"
              justifyContent="center"
              marginLeft="auto"
              marginRight="auto"
              maxWidth="12.5rem"
              overflow="hidden"
            >
              {photo ? (
                <Image
                  alt=""
                  height="100%"
                  objectFit="cover"
                  src={photo}
                  width="100%"
                />
              ) : (
                <Icon
                  as={FaCamera}
                  color="#898989"
                  height="4.5rem"
                  width="4.5rem"
                />
              )}
            </Flex>
            <Text
              color="#5A5A5A"
              marginTop="1.5rem"
              textAlign="center"
            >
              Adicione uma foto para o produto na resolução 1024x800 pixels
            </Text>
          </Box>
          <Box
            display="grid"
            marginTop="1rem"
          >
            <input
              ref={photoRef}
              accept="image/*"
              style={{ display: 'none' }}
              type="file"
              onChange={handlePhotoChange}
            />
            <Button
              background="#FFFFFF"
              borderColor="#1E93FF"
              color="#1E93FF"
              size="xs"
              variant="outline"
              onClick={handlePhotoAdd}
            >
              Adicionar Foto
            </Button>
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
                <Grid
                  background="#FFFFFF"
                  borderRadius="0.5rem"
                  gap="1.5rem"
                  padding="1rem 1.5rem 2.75rem 0.75rem"
                  shadow="base"
                  templateColumns="repeat(12, minmax(0, 1fr))"
                >
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
                        <Button
                          borderColor="#1E93FF"
                          color="#1E93FF"
                          leftIcon={<IoAdd />}
                          variant="outline"
                        >
                          Nova
                        </Button>
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
                      <FormLabel fontSize="sm">
                        Quantidade e Unidade de Venda
                      </FormLabel>
                      <InputGroup>
                        <Input placeholder="Ex.: 1" />
                        <InputRightElement
                          borderLeft="1px solid var(--chakra-colors-gray-300)"
                          width="auto"
                        >
                          <Select
                            borderColor="transparent"
                            borderLeftRadius="0"
                            height="3rem"
                          >
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
                <Flex
                  gap="1.5rem"
                  justifyContent="flex-end"
                  marginTop="1.5rem"
                >
                  <Link
                    href="/products"
                    legacyBehavior
                    passHref
                  >
                    <Button
                      as="a"
                      background="#FFFFFF"
                      borderColor="#DCDCDC"
                      color="#202020"
                      height="2.5rem"
                      variant="outline"
                    >
                      Cancelar
                    </Button>
                  </Link>
                  <Button
                    background="#1E93FF"
                    height="2.5rem"
                    variant="solid"
                  >
                    Salvar Novo
                  </Button>
                </Flex>
              </TabPanel>
              <TabPanel padding="1rem 0rem"></TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
}
