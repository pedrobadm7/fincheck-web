import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useMemo } from 'react';
import { Transaction } from '../../../../../app/entities/transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '../../../../../app/services/transactionsService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import toast from 'react-hot-toast';

const schema = z.object({
  value: z.union([
    z.string().nonempty('Informe o valor'),
    z.number()
  ]),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a categoria'),
  date: z.date()
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {

  const queryClient = useQueryClient();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const { isLoading, mutateAsync } = useMutation(transactionService.update)

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    }
  });

  const handleSubmit = hookFormSubmit(async data => {
    try {

      await mutateAsync({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!'
      );
      onClose();
    } catch {
      toast.error(transaction!.type === 'EXPENSE'
        ? 'Erro ao salvar a despesa!'
        : 'Erro ao salvar a receita!')
    }
  });

  return {
    errors,
    control,
    accounts,
    categories,
    isLoading,
    register,
    handleSubmit
  }
}
