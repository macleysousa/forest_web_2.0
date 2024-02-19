import { TabPanel, Flex, Select, Divider, Box, Input, Text } from '@chakra-ui/react';
import { ButtonOutline } from 'src/components/ui/ButtonOutline';
import { ButtonPrimary } from 'src/components/ui/ButtonPrimary';
import { InputLabel } from 'src/components/ui/InputLabel';
import { Form } from 'src/components/ui/Form';
import { getSegments } from 'src/services/api/segments';
import { getPartners } from 'src/services/api/partners';
import { getFlags } from 'src/services/api/flags';
import { getBrands } from 'src/services/api/brands';
import { useQuery } from '@tanstack/react-query';
import { MdArrowDropDown } from 'react-icons/md';

interface PanelSegmentationProps {
  formState: any;
  register: any;
  handleSubmit: any;
  onSubmit: any;
  onError: any;
  onCancel: any;
}

export default function PanelSegmentation({
  formState,
  register,
  handleSubmit,
  onSubmit,
  onError,
  onCancel,
}: PanelSegmentationProps) {
  const { data: segments } = useQuery({ queryKey: ['segment'], queryFn: () => getSegments() });
  const { data: partners } = useQuery({ queryKey: ['partners'], queryFn: () => getPartners() });
  const { data: flags } = useQuery({ queryKey: ['flags'], queryFn: () => getFlags() });
  const { data: brands } = useQuery({ queryKey: ['brands'], queryFn: () => getBrands() });

  return (
    <TabPanel p="2rem 0">
      <Box
        maxW="53rem"
        w={{ md: '100%', lg: '100%', xl: '53rem' }}
        borderRadius="8px"
        shadow="sm"
        p="1rem 2rem 1rem 2rem"
        bg="#fff"
      >
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Flex
            align={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Segmento</Text>
            <InputLabel
              my="1rem"
              display="flex"
              alignItems="baseline"
              flexDirection="column"
              w={{ md: '100%', lg: '100%', xl: '90%' }}
              error={formState.errors.segment?.message}
            >
              <Select
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Definir o Segmento"
                {...register('segment')}
                icon={<MdArrowDropDown />}
                fontFamily="sans-serif"
              >
                {segments?.segments.map((segment) => (
                  <option key={`${segment.name}-${segment.id}`} value={segment.id}>
                    {segment.name}
                  </option>
                ))}
              </Select>
            </InputLabel>
          </Flex>
          <Flex
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Parceiro</Text>
            <InputLabel
              my="1rem"
              display="flex"
              alignItems="baseline"
              flexDirection="column"
              w={{ md: '100%', lg: '100%', xl: '90%' }}
              error={formState.errors.partner?.message}
            >
              <Select
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Definir o Parceiro"
                {...register('partner')}
                icon={<MdArrowDropDown />}
                fontFamily="sans-serif"
              >
                {partners?.partners.map((partner) => (
                  <option key={`${partner.name}-${partner.id}`} value={partner.id}>
                    {partner.name}
                  </option>
                ))}
              </Select>
            </InputLabel>
          </Flex>
          <Flex
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Bandeira</Text>
            <InputLabel
              my="1rem"
              display="flex"
              alignItems="baseline"
              flexDirection="column"
              w={{ md: '100%', lg: '100%', xl: '90%' }}
              error={formState.errors.flag?.message}
            >
              <Select
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Definir a Bandeira (quando aplicável)"
                {...register('flag')}
                icon={<MdArrowDropDown />}
                fontFamily="sans-serif"
              >
                {flags?.flags.map((flag) => (
                  <option key={`${flag.name}-${flag.id}`} value={flag.id}>
                    {flag.name}
                  </option>
                ))}
              </Select>
            </InputLabel>
          </Flex>
          <Flex
            alignItems={{ md: 'baseline', lg: 'baseline', xl: 'center' }}
            flexDirection={{ md: 'column', lg: 'column', xl: 'row' }}
          >
            <Text mb={{ base: '0', md: '1rem', lg: '1rem' }} minW="7rem">
              Rede
            </Text>
            <InputLabel
              my="1rem"
              display="flex"
              alignItems="baseline"
              flexDirection="column"
              w={{ md: '100%', lg: '100%', xl: '90%' }}
              error={formState.errors.brand?.message}
            >
              <Select
                ml={{ md: '0', lg: '0', xl: '4rem' }}
                placeholder="Definir a Rede (quando aplicável)"
                {...register('brand')}
                icon={<MdArrowDropDown />}
                fontFamily="sans-serif"
              >
                {brands?.brands.map((brand) => (
                  <option key={`${brand.name}-${brand.id}`} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Select>
            </InputLabel>
          </Flex>

          <Divider my="2rem" />

          <Flex justify="flex-end" align="center">
            <ButtonOutline w="5.5rem" h="2.5rem" onClick={onCancel}>
              Cancelar
            </ButtonOutline>
            <ButtonPrimary type="submit" ml="1.5rem" w="8rem" h="2.5rem">
              Salvar
            </ButtonPrimary>
          </Flex>
        </Form>
      </Box>
    </TabPanel>
  );
}
