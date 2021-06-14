import React from 'react';
import { Transition } from '@headlessui/react';

interface ToastProps {
  show: boolean;
  message: string;
}

export default function Toast({ message, show }: ToastProps): JSX.Element {
  return (
    <Transition
      appear
      show={show}
      className="rounded-lg bg-gray-900 flex items-center justify-items-center transition transform-gpu duration-200"
      enterFrom="opacity-0 scale-75"
      enterTo="opacity-100 scale-100"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-75"
    >
      <span className="p-2 text-sm text-gray-50">
        {message}
      </span>
    </Transition>
  );
}
