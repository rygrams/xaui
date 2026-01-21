import { tv } from 'tailwind-variants'

export const progressStyles = tv({
  slots: {
    base: 'relative flex items-center justify-center overflow-hidden',
    track: 'w-full bg-slate-200 dark:bg-slate-700 overflow-hidden',
    indicator: 'h-full bg-blue-600 transition-all',
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
        track: 'fill-none stroke-slate-200 dark:stroke-slate-700',
        indicator: 'fill-none stroke-blue-600',
      },
    },
  },
  defaultVariants: {
    variant: 'linear',
  },
})
