import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authService } from '../../../app/services/authService';
import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-hot-toast';
import { SignupParams } from '../../../app/services/authService/signup';
import { useAuth } from '../../../app/hooks/useAuth';

type FormData = z.infer<typeof schema>

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z
    .string()
    .nonempty('Email é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('Senha é obrigatória')
    .min(8, 'A senha deve conter no minimo 8 digitos.'),
})

export const useRegisterController = () => {
  const {
    handleSubmit: hookFormHandlerSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth()

  const handleSubmit = hookFormHandlerSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken)
    } catch {
      toast.error('Ocorreu um erro ao criar sua conta')
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
