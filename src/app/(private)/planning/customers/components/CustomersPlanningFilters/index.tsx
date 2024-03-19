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

import { useState } from 'react';
import { GetCustomersPlanningFilters } from '../../../../../../services/api/customers-planning';
import { CustomersPlanningFilter } from './CustomersPlanningFilter';

type CustomersPlanningFiltersProps = {
  disabled: boolean;
  filters: GetCustomersPlanningFilters;
  onApply: (filters: GetCustomersPlanningFilters) => void;
  onClose: () => void;
};

export function CustomersPlanningFilters({
  disabled,
  filters,
  onApply,
  onClose,
}: CustomersPlanningFiltersProps) {
  const [data, setData] = useState({ ...filters });

  const handleChange = (key: keyof typeof data) => (text: string) =>
    setData((previousState) => ({ ...previousState, [key]: text }));

  const handleApplyFilters = () => {
    const map = new Map<string, string | undefined>(Object.entries(data));
    for (const [key, value] of map) if (!value) map.set(key, undefined);
    onApply(Object.fromEntries(map) as GetCustomersPlanningFilters);
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
        <CustomersPlanningFilter
          disabled={disabled}
          label="Segmento"
          value={data.segment ?? ''}
          onTextChange={handleChange('segment')}
        />
        <CustomersPlanningFilter
          disabled={disabled}
          label="Bandeira"
          value={data.flag ?? ''}
          onTextChange={handleChange('flag')}
        />
        <CustomersPlanningFilter
          disabled={disabled}
          label="Parceiro"
          value={data.partner ?? ''}
          onTextChange={handleChange('partner')}
        />
        <CustomersPlanningFilter
          disabled={disabled}
          label="Rede"
          value={data.brand ?? ''}
          onTextChange={handleChange('brand')}
        />
        <CustomersPlanningFilter
          disabled={disabled}
          label="Cliente"
          value={data.customer_name ?? ''}
          onTextChange={handleChange('customer_name')}
        />
        <CustomersPlanningFilter
          disabled={disabled}
          label="Cidade"
          value={data.city ?? ''}
          onTextChange={handleChange('city')}
        />
        <CustomersPlanningFilter
          disabled={disabled}
          label="Status"
          value={data.status ?? ''}
          onTextChange={handleChange('status')}
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
