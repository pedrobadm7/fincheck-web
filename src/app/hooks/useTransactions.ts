import { useQuery } from '@tanstack/react-query';
import { transactionService } from '../services/transactionsService';

export function useTransactions() {
  const { data, isFetching, isInitialLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.getAll({
      month: 0,
      year: 2024,
    }),
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading
  }
}
