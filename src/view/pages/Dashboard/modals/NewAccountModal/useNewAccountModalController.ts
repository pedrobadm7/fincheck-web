import { z } from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
    handleSubmit: hookFormSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log({ data })
  });

  return {
    isNewAccountModalopen,
    errors,
    control,
    closeNewAccountModal,
    register,
    handleSubmit,
  }
}
