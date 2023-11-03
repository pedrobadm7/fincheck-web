import { BankAccount } from '../../entities/bankAccount';
import { httpClient } from '../httpClient';

type BanksAccountResponse = Array<BankAccount>

export async function getAll() {
  const { data } = await httpClient.get<BanksAccountResponse>('/bank-accounts');

  return data;
}

