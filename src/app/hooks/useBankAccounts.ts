import { useQuery } from '@tanstack/react-query';
import { bankAccountsService } from '../services/bankAccountService';

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ['banksAccounts'],
    queryFn: bankAccountsService.getAll
  });

  return {
    accounts: data ?? [],
    isFetching
  };
}
