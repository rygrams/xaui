import { tv } from 'tailwind-variants'

export const buttonStyles = tv({
  slots: {
    base: [
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
    startContent: ['flex', 'items-center', 'shrink-0'],
    endContent: ['flex', 'items-center', 'shrink-0'],
    spinner: ['flex', 'items-center', 'shrink-0'],
  },
  variants: {
    fullWidth: {
      true: {
        base: 'flex w-full',
      },
      false: {
        base: 'inline-flex',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-50 cursor-not-allowed',
      },
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
})
