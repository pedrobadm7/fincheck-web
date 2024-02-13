import { Outlet } from 'react-router-dom'
import illustration from '../../assets/images/illustration.png'
import { Logo } from '../components/Logo'
import { DarkmodeSwitch } from '../components/DarkModeSwitch'
import { cn } from '../../app/utils/cn'
import { useDarkMode } from '../../app/hooks/useDarkMode'

export function AuthLayout() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className={cn('flex w-full h-full', isDarkMode && 'bg-gray-900')}>

      <div className='w-full h-full flex items-center justify-center flex-col gap-16 lg:w-1/2'>
        <div className='absolute top-5 left-5'>
          <DarkmodeSwitch />
        </div>

        <Logo className={cn("h-6 text-gray-500", isDarkMode && 'text-white')} />

        <div className="w-full max-w-[504px] px-8 lg:px-0">
          <Outlet />
        </div>
      </div>

      <div className='w-1/2 h-full justify-center items-center p-8 relative hidden lg:flex'>
        <img
          src={illustration}
          className='object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]'
        />

        <div className={cn("max-w-[656px] bottom-8 mx-8 bg-white p-10 absolute rounded-b-[32px]", isDarkMode && 'bg-gray-800')}>
          <Logo className='text-teal-900 h-8 ' />
          <p className={cn("text-gray-700 font-medium text-xl mt-6", isDarkMode && 'text-white')}>
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor, totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  )
}
