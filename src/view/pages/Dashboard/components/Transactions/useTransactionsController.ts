import { useEffect, useState } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { TransactionFilters } from '../../../../../app/services/transactionsService/getAll';

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })

  const {
    transactions,
    isLoading,
    isInitialLoading,
    refetchTransactions
  } = useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions])

  function handleChangeMonth(month: number) {
    setFilters(prevState => ({
      ...prevState,
      month
    }))
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false)
  }

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeMonth,
    isFiltersModalOpen,
    filters
  }
}
