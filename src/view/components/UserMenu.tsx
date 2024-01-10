import { ExitIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from './DropdownMenu'
import { useAuth } from '../../app/hooks/useAuth'

export function UserMenu() {
  const { signout, user } = useAuth()

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

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          onSelect={signout}
          className="flex items-center justify-between"
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
