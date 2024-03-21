import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Image,
  Input,
  Select,
  TabPanel,
  Text,
  Textarea,
} from '@chakra-ui/react';
import IMask from 'imask';
import { useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { InputLabel } from '../../../../components/InputLabel';
import { InputText } from '../../../../components/InputText';

type PanelRegistrationDataProps = {
  formState: any;
  handleSubmit: any;
  onCancel: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onError: any;
  onSubmit: any;
  register: any;
};

export function PanelRegistrationData({
  formState,
  register,
  handleSubmit,
  onSubmit,
  onError,
  onCancel,
}: PanelRegistrationDataProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

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

  const cnpjInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!cnpjInputRef.current) return;

    const cnpjInputMask = IMask(cnpjInputRef.current, {
      mask: '00.000.000/0000-00',
    });

    return () => cnpjInputMask.destroy();
  }, []);

  return (
    <TabPanel p="2rem 0">
      <Box
        bg="#fff"
        borderRadius="8px"
        maxW="53rem"
        p="3rem 2rem 1rem 2rem"
        shadow="sm"
        w={{ lg: '100%', md: '100%', xl: '53rem' }}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Flex
            align={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            direction={{ lg: 'column', md: 'column', xl: 'row' }}
            mb="1rem"
          >
            <Text
              mb={{ base: '0', lg: '1rem', md: '1rem' }}
              minW={{ lg: 'auto', md: 'auto', xl: '7rem' }}
            >
              Avatar
            </Text>
            <Flex
              align="center"
              ml={{ base: '0', lg: '0', xl: '4rem' }}
            >
              {photo ? (
                <Image
                  alt=""
                  borderRadius="50%"
                  h="72px"
                  objectFit="cover"
                  src={photo}
                  w="72px"
                />
              ) : (
                <Box
                  bg="#84818A"
                  borderRadius="50%"
                  h="72px"
                  w="72px"
                />
              )}
              <Button
                h="2rem"
                ml="2rem"
                variant="solid"
                w="9rem"
                onClick={() => fileInput.current?.click()}
              >
                Alterar Foto
              </Button>
              <Input
                ref={fileInput}
                id="import-file"
                name="import-file"
                type="file"
                hidden
                onChange={handlePhotoChange}
              />
              <Button
                borderColor="#1E93FF"
                color="#1E93FF"
                h="2rem"
                ml="1rem"
                variant="outline"
                w="9rem"
              >
                Apagar Foto
              </Button>
            </Flex>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">
              CNPJ
              <Box
                as="span"
                color="red.500"
                ml="0.25rem"
              >
                *
              </Box>
            </Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.cnpj?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <Input
                ml={{ lg: '0', md: '0', xl: '4rem' }}
                placeholder="CNPJ"
                {...register('cnpj')}
                ref={cnpjInputRef}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">
              Razão Social
              <Box
                as="span"
                color="red.500"
                ml="0.25rem"
              >
                *
              </Box>
            </Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.socialName?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <InputText
                ml={{ lg: '0', md: '0', xl: '4rem' }}
                placeholder="Nome da Empresa"
                {...register('socialName')}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">
              Nome Fantasia
              <Box
                as="span"
                color="red.500"
                ml="0.25rem"
              >
                *
              </Box>
            </Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.fantasyName?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <InputText
                ml={{ lg: '0', md: '0', xl: '4rem' }}
                placeholder="Nome Fantasia (Se houver)"
                {...register('fantasyName')}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">IE / IM</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.fantasyName?.message}
              flexDirection="column"
              my="1rem"
              w="100%"
            >
              <Flex w="100%">
                <InputText
                  ml={{ lg: '0', md: '0', xl: '4rem' }}
                  placeholder="Inscrição Estadual"
                  w="100%"
                  {...register('ie')}
                />
                <InputText
                  ml="2rem"
                  placeholder="Inscrição Municipal"
                  w="100%"
                  {...register('im')}
                />
              </Flex>
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Situação</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.fantasyName?.message}
              flexDirection="column"
              my="1rem"
              w="100%"
            >
              <Box
                alignItems="center"
                display="flex"
                width="100%"
              >
                <Select
                  ml={{ lg: '0', md: '0', xl: '4rem' }}
                  placeholder="Situação"
                  w="25rem"
                  {...register('situation')}
                  fontFamily="sans-serif"
                  icon={<MdArrowDropDown />}
                >
                  <option value="Regular">Regular</option>
                  <option value="Irregular">Irregular</option>
                </Select>
                <Checkbox
                  ml="2rem"
                  {...register('incentive')}
                >
                  Termo de incentivo
                </Checkbox>
              </Box>
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="8rem">Avaliação Cliente</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.customerReview?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '92.5%' }}
            >
              <InputText
                ml={{ lg: '0', md: '0', xl: '3rem' }}
                placeholder="Avaliação Cliente"
                {...register('customerReview')}
              />
            </InputLabel>
          </Flex>

          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Observações</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.comments?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <Textarea
                h="9rem"
                maxW="26.625rem"
                ml={{ lg: '0', md: '0', xl: '4rem' }}
                placeholder="Descrição da empresa"
                resize="none"
                w="26.625rem"
                {...register('comments')}
              />
            </InputLabel>
          </Flex>

          <Divider my="2rem" />

          <Flex
            align="center"
            justify="flex-end"
          >
            <Button
              h="2.5rem"
              variant="outline"
              w="5.5rem"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              h="2.5rem"
              ml="1.5rem"
              type="submit"
              variant="solid"
              w="8rem"
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </Box>
    </TabPanel>
  );
}
