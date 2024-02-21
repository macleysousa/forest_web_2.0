'use client';
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { PrivateLayout } from 'src/components/PrivateLayout';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { isPrivatePage } from 'src/contexts/AuthContext';

const range = (stop: number) =>
  Array.from({ length: stop })
    .fill(null)
    .map((_, i) => i);

function CreateUserPage() {
  const router = useRouter();
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
    <PrivateLayout>
      <Box p="2rem">
        <Heading
          fontSize="1.5rem"
          fontWeight="700"
          lineHeight="1.2"
        >
          <Text
            as="span"
            color="#898989"
          >
            Usuário /
          </Text>{' '}
          Criar Novo
        </Heading>
        <Grid
          gap="2rem"
          mt="1.5rem"
          templateColumns="repeat(12, minmax(0, 1fr))"
        >
          <GridItem colSpan={3}>
            <Box
              background="#FFFFFF"
              borderRadius="0.5rem"
              padding="0.875rem 1rem"
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
                fontSize="sm"
                marginTop="1.5rem"
                textAlign="center"
              >
                Adicione uma foto para o usuário na resolução 800 x 800 pixels
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
              <ButtonOutline
                background="#FFFFFF"
                borderColor="#1E93FF"
                color="#1E93FF"
                size="sm"
                onClick={handlePhotoAdd}
              >
                Adicionar Foto
              </ButtonOutline>
            </Box>
          </GridItem>
          <GridItem colSpan={9}>
            <Grid
              background="#FFFFFF"
              borderRadius="0.5rem"
              gap="1.5rem"
              padding="1rem 1.5rem 2.75rem 0.75rem"
              shadow="base"
              templateColumns="repeat(2, minmax(0, 1fr))"
            >
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Nome</FormLabel>
                  <Input
                    fontSize="sm"
                    placeholder="Digite o primeiro nome e apenas um sobrenome"
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <Box
                    h="21px"
                    mb="0.5rem"
                  />
                  <RadioGroup>
                    <HStack
                      alignItems="center"
                      height="3rem"
                      spacing="1.5rem"
                    >
                      <Checkbox>
                        <Text
                          as="span"
                          fontSize="sm"
                        >
                          Ativo
                        </Text>
                      </Checkbox>
                      <Checkbox>
                        <Text
                          as="span"
                          fontSize="sm"
                        >
                          Utiliza App
                        </Text>
                      </Checkbox>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">E-mail</FormLabel>
                  <Input
                    fontSize="sm"
                    placeholder="Digite o e-mail do usuário"
                  />
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
                  <Input
                    fontSize="sm"
                    placeholder="Digite o Telefone do Usuário"
                  />
                </FormControl>
              </GridItem>
              <GridItem>{/** empty space */}</GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Senha</FormLabel>
                  <Input
                    fontSize="sm"
                    placeholder="Defina uma senha"
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel fontSize="sm">Confirmação de Senha</FormLabel>
                  <Input
                    fontSize="sm"
                    placeholder="Repita a senha definida"
                  />
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
                <ButtonOutline
                  as="a"
                  background="#FFFFFF"
                  borderColor="#DCDCDC"
                  color="#202020"
                  fontSize="sm"
                  height="2.5rem"
                >
                  Cancelar
                </ButtonOutline>
              </Link>
              <ButtonPrimary
                background="#1E93FF"
                fontSize="sm"
                height="2.5rem"
              >
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
