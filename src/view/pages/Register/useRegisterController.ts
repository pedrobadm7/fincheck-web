import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
    formState: {errors}
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandlerSubmit((data) => {
    console.log(data)
  });

  return {handleSubmit, register, errors}
}
