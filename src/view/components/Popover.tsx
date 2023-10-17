import * as RdxPopover from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import { cn } from '../../app/utils/cn';

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

function PopoverRoot({ children }: { children: ReactNode }) {
  return (
    <RdxPopover.Root>
      {children}
    </RdxPopover.Root>
  )
}

function PopoverTrigger({ children }: { children: ReactNode }) {
  return (
    <RdxPopover.Trigger className="outline-none" asChild>
      {children}
    </RdxPopover.Trigger>
  )
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        side="bottom"
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className,
        )}>
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  )
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent
}
