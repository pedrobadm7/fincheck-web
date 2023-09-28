import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authService } from '../../../app/services/authService';
import { SigninParams } from '../../../app/services/authService/signin';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../../app/hooks/useAuth';

type FormData = z.infer<typeof schema>

const schema = z.object({
  email: z
    .string()
    .nonempty('Email é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('Senha é obrigatória')
    .min(8, 'A senha deve conter no minimo 8 digitos.'),
})

export function useLoginController() {
  const {
    handleSubmit: hookFormHandlerSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });


  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth()

  const handleSubmit = hookFormHandlerSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error('Credenciais inválidas!')
    }
  });
  return { handleSubmit, register, errors, isLoading };
}
