import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';

const schema = z.object({
  value: z.string().nonempty('Informe o valor da transação'),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a categoria'),
  date: z.date()
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal
  } = useDashboard();

  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormSubmit(data => {
    console.log(data)
  });

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    errors,
    control,
    accounts,
    categories,
    register,
    closeNewTransactionModal,
    handleSubmit
  }
}
