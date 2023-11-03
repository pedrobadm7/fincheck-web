import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { bankAccountsService } from '../../../../../app/services/bankAccountService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import toast from 'react-hot-toast';

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da Conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória')
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const {
    isNewAccountModalopen,
    closeNewAccountModal
  } = useDashboard();

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    register,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isLoading, mutateAsync } = useMutation(bankAccountsService.create)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {

      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      toast.success('Conta foi cadastrada com sucesso!');
      closeNewAccountModal();
      reset({
        initialBalance: "0",
        name: '',
        type: 'CHECKING',
        color: ''
      });
    } catch {
      toast.error('Erro ao cadastrar a conta')
    }
  });

  return {
    isNewAccountModalopen,
    errors,
    control,
    closeNewAccountModal,
    register,
    handleSubmit,
    isLoading
  }
}
