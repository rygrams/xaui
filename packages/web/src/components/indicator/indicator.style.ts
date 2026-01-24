import { tv } from 'tailwind-variants'

export const indicatorStyles = tv({
  slots: {
    base: 'relative flex items-center justify-center overflow-hidden',
    track: 'overflow-hidden',
    indicator: '',
  },
  variants: {
    variant: {
      linear: {
        base: 'w-full block',
        track: 'relative w-full h-full overflow-hidden',
        indicator: 'absolute top-0 bottom-0 left-0 transition-all',
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
