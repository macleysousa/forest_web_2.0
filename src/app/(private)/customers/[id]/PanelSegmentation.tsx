import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Select,
  TabPanel,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { MdArrowDropDown } from 'react-icons/md';
import { InputLabel } from '../../../../components/InputLabel';
import { getBrands } from '../../../../services/api/brands';
import { getFlags } from '../../../../services/api/flags';
import { getPartners } from '../../../../services/api/partners';
import { getSegments } from '../../../../services/api/segments';

type PanelSegmentationProps = {
  formState: any;
  handleSubmit: any;
  onCancel: any;
  onError: any;
  onSubmit: any;
  register: any;
};

export function PanelSegmentation({
  formState,
  register,
  handleSubmit,
  onSubmit,
  onError,
  onCancel,
}: PanelSegmentationProps) {
  const { data: segments } = useQuery({
    queryFn: () => getSegments(),
    queryKey: ['segment'],
  });
  const { data: partners } = useQuery({
    queryFn: () => getPartners(),
    queryKey: ['partners'],
  });
  const { data: flags } = useQuery({
    queryFn: () => getFlags(),
    queryKey: ['flags'],
  });
  const { data: brands } = useQuery({
    queryFn: () => getBrands(),
    queryKey: ['brands'],
  });

  return (
    <TabPanel p="2rem 0">
      <Box
        bg="#fff"
        borderRadius="8px"
        maxW="53rem"
        p="1rem 2rem 1rem 2rem"
        shadow="sm"
        w={{ lg: '100%', md: '100%', xl: '53rem' }}
      >
        <FormControl onSubmit={handleSubmit(onSubmit, onError)}>
          <Flex
            align={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Segmento</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.segment?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <Select
                ml={{ lg: '0', md: '0', xl: '4rem' }}
                placeholder="Definir o Segmento"
                {...register('segment')}
                fontFamily="sans-serif"
                icon={<MdArrowDropDown />}
              >
                {segments?.segments.map((segment) => (
                  <option
                    key={`${segment.name}-${segment.id}`}
                    value={segment.id}
                  >
                    {segment.name}
                  </option>
                ))}
              </Select>
            </InputLabel>
          </Flex>
          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Parceiro</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.partner?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <Select
                ml={{ lg: '0', md: '0', xl: '4rem' }}
                placeholder="Definir o Parceiro"
                {...register('partner')}
                fontFamily="sans-serif"
                icon={<MdArrowDropDown />}
              >
                {partners?.partners.map((partner) => (
                  <option
                    key={`${partner.name}-${partner.id}`}
                    value={partner.id}
                  >
                    {partner.name}
                  </option>
                ))}
              </Select>
            </InputLabel>
          </Flex>
          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text minW="7rem">Bandeira</Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.flag?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <Select
                ml={{ lg: '0', md: '0', xl: '4rem' }}
                placeholder="Definir a Bandeira (quando aplicável)"
                {...register('flag')}
                fontFamily="sans-serif"
                icon={<MdArrowDropDown />}
              >
                {flags?.flags.map((flag) => (
                  <option
                    key={`${flag.name}-${flag.id}`}
                    value={flag.id}
                  >
                    {flag.name}
                  </option>
                ))}
              </Select>
            </InputLabel>
          </Flex>
          <Flex
            alignItems={{ lg: 'baseline', md: 'baseline', xl: 'center' }}
            flexDirection={{ lg: 'column', md: 'column', xl: 'row' }}
          >
            <Text
              mb={{ base: '0', lg: '1rem', md: '1rem' }}
              minW="7rem"
            >
              Rede
            </Text>
            <InputLabel
              alignItems="baseline"
              display="flex"
              error={formState.errors.brand?.message}
              flexDirection="column"
              my="1rem"
              w={{ lg: '100%', md: '100%', xl: '90%' }}
            >
              <Select
                ml={{ lg: '0', md: '0', xl: '4rem' }}
                placeholder="Definir a Rede (quando aplicável)"
                {...register('brand')}
                fontFamily="sans-serif"
                icon={<MdArrowDropDown />}
              >
                {brands?.brands.map((brand) => (
                  <option
                    key={`${brand.name}-${brand.id}`}
                    value={brand.id}
                  >
                    {brand.name}
                  </option>
                ))}
              </Select>
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
        </FormControl>
      </Box>
    </TabPanel>
  );
}
