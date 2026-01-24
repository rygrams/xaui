import { tv } from 'tailwind-variants'

export const buttonStyles = tv({
  slots: {
    base: [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'overflow-hidden',
      'font-medium',
      'text-center',
      'outline-none',
      'cursor-pointer',
      'select-none',
      'transition-all',
    ],
    contentContainer: ['flex', 'items-center', 'justify-center', 'gap-2'],
    startContent: ['inline-flex', 'mr-1'],
    endContent: ['inline-flex', 'ml-1'],
    spinner: ['inline-flex', 'mx-1'],
  },
  variants: {
    fullWidth: {
      true: {
        base: 'w-full',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-50 cursor-not-allowed',
      },
    },
  },
})
