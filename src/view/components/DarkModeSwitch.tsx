import { Switch } from './Switch'
import { useDarkMode } from '../../app/hooks/useDarkMode'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'


export function DarkmodeSwitch() {
  const { isDarkMode, handleMode } = useDarkMode()

  return (
    <div className="flex items-center">
      <label className="text-black text-[15px] leading-none pr-[15px]" htmlFor="dark-mode">
        {!isDarkMode ? <SunIcon /> : <MoonIcon color='white' />}
      </label>

      <Switch.Root id="dark-mode" onCheckedChange={handleMode} defaultChecked={isDarkMode}>
        <Switch.Thumb />
      </Switch.Root>
    </div>
  )
}
