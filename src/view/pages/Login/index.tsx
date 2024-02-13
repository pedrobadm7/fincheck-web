import { Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useLoginController } from './useLoginController';
import { cn } from '../../../app/utils/cn';
import { useDarkMode } from '../../../app/hooks/useDarkMode';

export function Login() {

  const { handleSubmit, register, errors, isLoading } = useLoginController();
  const { isDarkMode } = useDarkMode()

  return (
    <>
      <header className="flex flex-col items-center gap-4" >
        <h1 className={cn("text-2xl font-bold text-gray-900 tracking-[-1px]", isDarkMode && 'text-white')}>
          Entre em sua conta
        </h1>
        <p className="space-x-2">
          <span className={cn("text-gray-700 tracking-[-0.5px]", isDarkMode && 'text-white')}>Novo por aqui?</span>
          <Link className="tracking-[-0.5px] font-medium text-teal-900" to="/register">Crie uma conta</Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button isLoading={isLoading} type="submit" className="mt-2">Entrar</Button>
      </form>
    </>
  )
}
