import { tv } from 'tailwind-variants'

export const progressStyles = tv({
  slots: {
    base: 'relative flex items-center justify-center overflow-hidden',
    track: 'overflow-hidden',
    indicator: '',
  },
  variants: {
    variant: {
      linear: {
        base: 'w-full',
        track: 'w-full h-full',
        indicator: 'h-full bg-blue-400 transition-all',
      },
      circular: {
        base: 'inline-flex shrink-0',
        track: 'fill-none w-auto h-auto',
        indicator: 'fill-none w-auto h-auto',
      },
    },
  },
  defaultVariants: {
    variant: 'linear',
  },
})
