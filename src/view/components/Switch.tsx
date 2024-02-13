import * as RdxSwitch from '@radix-ui/react-switch';
import { ReactNode } from 'react';


function SwitchRoot({ children, id, defaultChecked, onCheckedChange }: {
  children: ReactNode,
  id: string,
  defaultChecked: boolean,
  onCheckedChange(): void
}) {
  return (
    <RdxSwitch.Root
      className="w-[42px] h-[25px] bg-gray-300 rounded-full relative border-1 shadow-sm data-[state=checked]:bg-gray-700 outline-none cursor-default"
      id={id}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
    >
      {children}
    </RdxSwitch.Root>
  )
}

function SwitchThumb() {
  return (
    <RdxSwitch.Thumb
      className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
    />
  )
}

export const Switch = {
  Root: SwitchRoot,
  Thumb: SwitchThumb
}
