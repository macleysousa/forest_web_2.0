'use client';
import { Box, Checkbox, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Heading, Icon, Image, Input, Radio, RadioGroup, Select, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaCamera } from 'react-icons/fa';
import { PrivateLayout } from "src/components/PrivateLayout";
import { ButtonOutline } from "src/components/ui/ButtonOutline";
import { ButtonPrimary } from "src/components/ui/ButtonPrimary";
import { isPrivatePage } from "src/contexts/AuthContext";

const range = (stop: number) => new Array(stop).fill(null).map((_, i) => i);

function CreateUserPage() {
  const router = useRouter();
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
      <Box p="2rem">
        <Heading fontSize="1.5rem" lineHeight="1.2" fontWeight="700">
          <Text as="span" color="#898989">Usuário /</Text> Criar Novo
        </Heading>
        <Grid mt="1.5rem" templateColumns="repeat(12, minmax(0, 1fr))" gap="2rem">
          <GridItem colSpan={3}>
            <Box background="#FFFFFF" shadow="base" padding="0.875rem 1rem" borderRadius="0.5rem">
              <Flex maxWidth="12.5rem" aspectRatio="1 / 1" border="1px solid #DCDCDC" borderRadius="6.25rem" alignItems="center" justifyContent="center" marginLeft="auto" marginRight="auto" overflow="hidden">
                {
                  photo
                    ? (<Image src={photo} alt="" width="100%" height="100%" objectFit="cover" />)
                    : (<Icon as={FaCamera} width="4.5rem" height="4.5rem" color="#898989" />)
                }
              </Flex>
              <Text textAlign="center" marginTop="1.5rem" color="#5A5A5A" fontSize="sm">
                Adicione uma foto para o usuário na resolução 800 x 800 pixels
              </Text>
            </Box>
            <Box display="grid" marginTop="1rem">
              <input ref={photoRef} type="file" style={{ display: 'none' }} accept="image/*" onChange={handlePhotoChange} />
              <ButtonOutline size="sm" borderColor="#1E93FF" color="#1E93FF" background="#FFFFFF" onClick={handlePhotoAdd}>
                Adicionar Foto
              </ButtonOutline>
            </Box>
          </GridItem>
          <GridItem colSpan={9}>
            <Grid templateColumns="repeat(2, minmax(0, 1fr))" background="#FFFFFF" padding="1rem 1.5rem 2.75rem 0.75rem" borderRadius="0.5rem" shadow="base" gap="1.5rem">
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Nome</FormLabel>
                  <Input placeholder="Digite o primeiro nome e apenas um sobrenome" fontSize="sm" />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <Box h="21px" mb="0.5rem" />
                  <RadioGroup>
                    <HStack spacing="1.5rem" height="3rem" alignItems="center">
                      <Checkbox>
                        <Text as="span" fontSize="sm">Ativo</Text>
                      </Checkbox>
                      <Checkbox>
                        <Text as="span" fontSize="sm">Utiliza App</Text>
                      </Checkbox>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">E-mail</FormLabel>
                  <Input placeholder="Digite o e-mail do usuário" fontSize="sm" />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Tipo de Usuário</FormLabel>
                  <Select fontSize="sm">
                    <option value="">Defina um Tipo</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Grupos</FormLabel>
                  <Select fontSize="sm">
                    <option value="">Defina um Grupo</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Atores</FormLabel>
                  <Select fontSize="sm">
                    <option value="">Defina os Atores</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Dashboard de Abertura</FormLabel>
                  <Select fontSize="sm">
                    <option value="">Defina um Dashboard</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Ator de Abertura</FormLabel>
                  <Select fontSize="sm">
                    <option value="">Defina o Ator de Abertura</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Telefone</FormLabel>
                  <Input placeholder="Digite o Telefone do Usuário" fontSize="sm" />
                </FormControl>
              </GridItem>
              <GridItem>
                {/** empty space */}
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Senha</FormLabel>
                  <Input placeholder="Defina uma senha" fontSize="sm" />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Confirmação de Senha</FormLabel>
                  <Input placeholder="Repita a senha definida" fontSize="sm" />
                </FormControl>
              </GridItem>
            </Grid>
            <Flex justifyContent="flex-end" gap="1.5rem" marginTop="1.5rem">
              <Link href="/products" passHref legacyBehavior>
                <ButtonOutline as="a" height="2.5rem" color="#202020" borderColor="#DCDCDC" background="#FFFFFF" fontSize="sm">
                  Cancelar
                </ButtonOutline>
              </Link>
              <ButtonPrimary height="2.5rem" background="#1E93FF" fontSize="sm">
                Criar Novo
              </ButtonPrimary>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </PrivateLayout>
  );
}

export default isPrivatePage(CreateUserPage);
