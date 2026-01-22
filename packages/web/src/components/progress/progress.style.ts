import { tv } from 'tailwind-variants'

export const progressStyles = tv({
  slots: {
    base: 'relative flex items-center justify-center overflow-hidden',
    track: 'w-full overflow-hidden',
    indicator: 'h-full transition-all bg-blue-400',
  },
  variants: {
    variant: {
      linear: {
        base: 'w-full',
        track: 'h-full',
        indicator: 'h-full',
      },
      circular: {
        base: 'inline-flex',
        track: 'fill-none',
        indicator: 'fill-none',
      },
    },
  },
  defaultVariants: {
    variant: 'linear',
  },
})
