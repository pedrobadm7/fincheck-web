import { Transition } from '@headlessui/react';
import { Logo } from '../components/Logo';
import { Spinner } from '../components/Spinner';

interface LaunchScreenProps {
  isLoading: boolean;
}

export default function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className='bg-teal-900 fixed top-0 left-0 w-full h-full flex justify-center items-center'>
        <div className="flex flex-col items-center gap-4">
          <Logo className="h-10 text-white" />
          <Spinner className="text-teal-900 fill-white" />
        </div>
      </div>
    </Transition>

  )
}
