import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

function DropdownMenuRoot({ children }: { children: ReactNode }) {
  return (
    <RdxDropdownMenu.Root>
      {children}
    </RdxDropdownMenu.Root>
  )
}

function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none">
      {children}
    </RdxDropdownMenu.Trigger>
  )
}
//
function DropdownMenuContent({ children }: { children: ReactNode }) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content className="rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  )
}

function DropdownMenuItem({ children }: { children: ReactNode }) {
  return (
    <RdxDropdownMenu.Item className="min-h-[48px] outline-none flex items-center p-2 text-gray-800 text-sm hover:bg-gray-50 rounded-2xl transition-colors">
      {children}
    </RdxDropdownMenu.Item>
  )
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
}
