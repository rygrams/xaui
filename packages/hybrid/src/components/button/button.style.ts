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
      'subpixel-antialiased',
      'tap-highlight-transparent',
      'transform-gpu',
    ],
  },
  variants: {
    fullWidth: {
      true: {
        base: 'w-full',
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
