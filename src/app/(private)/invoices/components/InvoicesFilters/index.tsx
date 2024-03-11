'use client';

import {
  Button,
  Heading,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverFooter,
  PopoverHeader,
} from '@chakra-ui/react';

import IMask from 'imask';
import { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { GetNFEsFilters } from '../../../../../services/api/nfes';
import { InvoicesFilter } from './InvoiceFilter';
import { InvoicePeriodFilterModal } from './InvoicePeriodFilterModal';

type InvoicesFiltersProps = {
  defaultPeriod: string;
  disabled: boolean;
  filters: GetNFEsFilters;
  onApply: (filters: GetNFEsFilters) => void;
  onClose: () => void;
};

export function InvoicesFilters({
  disabled,
  filters,
  onApply,
  onClose,
}: InvoicesFiltersProps) {
  const [data, setData] = useState({ ...filters });
  const [periodModalOpen, setPeriodModalOpen] = useState(false);
  const nfeNumberInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!nfeNumberInputRef.current) return;

    const nfeNumberInputMask = IMask(nfeNumberInputRef.current, {
      mask: Number,
      max: Number.MAX_SAFE_INTEGER,
      min: 1,
      scale: 0,
    });

    return () => nfeNumberInputMask.destroy();
  }, []);

  const handleChange = (key: keyof typeof data) => (text: string) =>
    setData((previousState) => ({ ...previousState, [key]: text }));

  const handleApplyFilters = () => {
    const map = new Map<string, string | undefined>(Object.entries(data));
    for (const [key, value] of map) if (!value) map.set(key, undefined);
    onApply(Object.fromEntries(map) as GetNFEsFilters);
    onClose();
  };

  return (
    <>
      <PopoverArrow />
      <PopoverHeader py={3}>
        <Heading size="sm">Filtros</Heading>
      </PopoverHeader>
      <PopoverCloseButton
        right={2}
        top={2}
        onClick={onClose}
      />
      <PopoverBody
        display="flex"
        flexDirection="column"
        gap={2}
        height="40dvh"
        overflow="auto"
        sx={{ '& > *': { flexShrink: 0 } }}
      >
        <InvoicesFilter
          disabled={disabled}
          inputRef={nfeNumberInputRef}
          label="Nº NF"
          value={data.number_nfe ?? ''}
          onTextChange={handleChange('number_nfe')}
        />
        <>
          <InvoicesFilter
            disabled={disabled}
            label="Data"
            value={data.period}
            readOnly
            onClick={() => setPeriodModalOpen(true)}
          />
          <InvoicePeriodFilterModal
            open={periodModalOpen}
            onClose={() => setPeriodModalOpen(false)}
            onSubmit={handleChange('period')}
          />
        </>
        <InvoicesFilter
          disabled={disabled}
          label="Cliente"
          value={data.customer ?? ''}
          onTextChange={handleChange('customer')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="Árvore"
          value={data.tree_name ?? ''}
          // eslint-disable-next-line prettier/prettier
          onTextChange={(text) => handleChange('tree_name')(text.toLocaleUpperCase('pt-BR'))}
        />
        <InvoicesFilter
          disabled={disabled}
          label="Tipo"
          value={data.type ?? ''}
          onTextChange={handleChange('type')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="Cidade"
          value={data.city ?? ''}
          onTextChange={handleChange('city')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="UF"
          value={data.uf ?? ''}
          onTextChange={handleChange('uf')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="Cliente Emissor"
          value={data.customer_emitter ?? ''}
          onTextChange={handleChange('customer_emitter')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="Segmento"
          value={data.segment ?? ''}
          onTextChange={handleChange('segment')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="Parceiro"
          value={data.partner ?? ''}
          onTextChange={handleChange('partner')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="Bandeira"
          value={data.flag ?? ''}
          onTextChange={handleChange('flag')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="Rede"
          value={data.brand ?? ''}
          onTextChange={handleChange('brand')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="Produto"
          value={data.product ?? ''}
          onTextChange={handleChange('product')}
        />
        <InvoicesFilter
          disabled={disabled}
          label="DSH/DSO"
          value={data.dsh_dso ?? ''}
          onTextChange={handleChange('dsh_dso')}
        />
        <InvoicesFilter
          disabled={disabled}
          // eslint-disable-next-line prettier/prettier
          inputLeftAddonProps={{ fontSize: 'xs', lineHeight: '0.75rem', px: '0.25rem' }}
          label="Nº Pedido Parceiro"
          value={data.order_number_customer ?? ''}
          onTextChange={handleChange('order_number_customer')}
        />
        <InvoicesFilter
          disabled={disabled}
          // eslint-disable-next-line prettier/prettier
          inputLeftAddonProps={{ fontSize: 'xs', lineHeight: '0.75rem', px: '0.25rem' }}
          label="Nº Pedido Faturamento"
          value={data.order_number_billing ?? ''}
          onTextChange={handleChange('order_number_billing')}
        />
      </PopoverBody>
      <PopoverFooter
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <Button
          size="sm"
          onClick={handleApplyFilters}
        >
          Aplicar
        </Button>
      </PopoverFooter>
    </>
  );
}
