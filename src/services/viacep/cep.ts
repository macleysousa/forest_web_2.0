import { viacep } from '../viacep/index';

/* eslint-disable typescript-sort-keys/interface */
type Address = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};
/* eslint-disable typescript-sort-keys/interface */

async function getCep(cep: string) {
  const response = await viacep.get<Address>(`/${cep}/json`);
  return response.data;
}

export { getCep };
