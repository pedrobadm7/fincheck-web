import { ExitIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from './DropdownMenu'
import { useAuth } from '../../app/hooks/useAuth'
import { DarkmodeSwitch } from './DarkModeSwitch';
import { cn } from '../../app/utils/cn';
import { useDarkMode } from '../../app/hooks/useDarkMode';

export function UserMenu() {
  const { signout, user } = useAuth()
  const { isDarkMode } = useDarkMode()

  const firstName = user?.name.split(' ')[0];
  const lastName = user?.name.split(' ')[1]
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger >
        <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100">
          <span className='text-sm tracking-[-0.5px] text-teal-900 font-medium'>
            {firstName?.charAt(0)}{lastName?.charAt(0)}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className={cn("w-32", isDarkMode && 'bg-gray-900')}>
        <DropdownMenu.Item
          onSelect={signout}
          className={cn("flex items-center justify-between", isDarkMode && 'text-white data-[highlighted]:bg-teal-900')}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className={cn("flex items-center justify-between", isDarkMode && 'data-[highlighted]:bg-teal-900')}
        >
          <DarkmodeSwitch />
        </DropdownMenu.Item>
      </DropdownMenu.Content>

    </DropdownMenu.Root>
  )
}
