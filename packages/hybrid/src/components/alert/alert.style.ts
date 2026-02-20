import { tv } from 'tailwind-variants'

export const alertStyles = tv({
  slots: {
    container:
      'xui-alert flex flex-row items-center w-full gap-3 bg-[var(--xui-alert-bg)] [border-width:var(--xui-alert-border-width)] [border-color:var(--xui-alert-border-color)] px-[var(--xui-spacing-md)] py-[var(--xui-spacing-sm)]',
    mainWrapper: 'flex-1 flex-col justify-center gap-0.5',
    iconWrapper:
      'size-7 rounded-full flex items-center justify-center shrink-0 text-[var(--xui-alert-text)] bg-[var(--xui-alert-icon-bg)] [border-width:var(--xui-alert-icon-border-width)] [border-color:var(--xui-alert-icon-border-color)]',
    title:
      'm-0 leading-tight text-[var(--xui-alert-text)] text-[length:var(--xui-text-sm)] font-[var(--xui-font-semibold)]',
    description:
      'm-0 mt-1 leading-none text-[var(--xui-alert-description)] text-[length:var(--xui-text-xs)] font-[var(--xui-font-normal)]',
    iconText: 'font-[var(--xui-font-semibold)]',
    closeButton:
      'self-start p-1 cursor-pointer bg-transparent border-0 rounded flex text-[var(--xui-alert-text)]',
    extraContent: 'mt-1',
  },
  variants: {
    themeColor: {
      default: {
        container:
          '[--xui-alert-main:var(--xui-default)] [--xui-alert-fg:var(--xui-default-fg)] [--xui-alert-bg-base:var(--xui-default-bg)] [--xui-alert-text-base:var(--xui-foreground)] [--xui-alert-accent:var(--xui-foreground)]',
      },
      primary: {
        container:
          '[--xui-alert-main:var(--xui-primary)] [--xui-alert-fg:var(--xui-primary-fg)] [--xui-alert-bg-base:var(--xui-primary-bg)] [--xui-alert-text-base:var(--xui-primary)] [--xui-alert-accent:var(--xui-primary)]',
      },
      secondary: {
        container:
          '[--xui-alert-main:var(--xui-secondary)] [--xui-alert-fg:var(--xui-secondary-fg)] [--xui-alert-bg-base:var(--xui-secondary-bg)] [--xui-alert-text-base:var(--xui-secondary)] [--xui-alert-accent:var(--xui-secondary)]',
      },
      tertiary: {
        container:
          '[--xui-alert-main:var(--xui-tertiary)] [--xui-alert-fg:var(--xui-tertiary-fg)] [--xui-alert-bg-base:var(--xui-tertiary-bg)] [--xui-alert-text-base:var(--xui-tertiary)] [--xui-alert-accent:var(--xui-tertiary)]',
      },
      success: {
        container:
          '[--xui-alert-main:var(--xui-success)] [--xui-alert-fg:var(--xui-success-fg)] [--xui-alert-bg-base:var(--xui-success-bg)] [--xui-alert-text-base:var(--xui-success)] [--xui-alert-accent:var(--xui-success)]',
      },
      warning: {
        container:
          '[--xui-alert-main:var(--xui-warning)] [--xui-alert-fg:var(--xui-warning-fg)] [--xui-alert-bg-base:var(--xui-warning-bg)] [--xui-alert-text-base:var(--xui-warning)] [--xui-alert-accent:var(--xui-warning)]',
      },
      danger: {
        container:
          '[--xui-alert-main:var(--xui-danger)] [--xui-alert-fg:var(--xui-danger-fg)] [--xui-alert-bg-base:var(--xui-danger-bg)] [--xui-alert-text-base:var(--xui-danger)] [--xui-alert-accent:var(--xui-danger)]',
      },
    },
    variant: {
      solid: {
        container:
          '[--xui-alert-bg:var(--xui-alert-solid-bg)] [--xui-alert-text:var(--xui-alert-solid-text)] [--xui-alert-description:color-mix(in_srgb,var(--xui-alert-solid-text)_75%,transparent)] [--xui-alert-border-width:0px] [--xui-alert-border-color:transparent]',
        iconWrapper:
          '[--xui-alert-icon-bg:var(--xui-alert-solid-icon-bg)] [--xui-alert-icon-border-width:0px] [--xui-alert-icon-border-color:transparent]',
      },
      flat: {
        container:
          '[--xui-alert-bg:var(--xui-alert-flat-bg)] [--xui-alert-text:var(--xui-alert-text-base)] [--xui-alert-description:color-mix(in_srgb,var(--xui-alert-text-base)_75%,transparent)] [--xui-alert-border-width:0px] [--xui-alert-border-color:transparent]',
        iconWrapper:
          '[--xui-alert-icon-bg:color-mix(in_srgb,var(--xui-alert-accent)_12%,transparent)] [--xui-alert-icon-border-width:0px] [--xui-alert-icon-border-color:transparent]',
      },
      bordered: {
        container:
          'border-solid [--xui-alert-bg:transparent] [--xui-alert-text:var(--xui-alert-text-base)] [--xui-alert-description:color-mix(in_srgb,var(--xui-alert-text-base)_75%,transparent)] [--xui-alert-border-width:var(--xui-border-md)] [--xui-alert-border-color:color-mix(in_srgb,var(--xui-alert-main)_75%,transparent)]',
        iconWrapper:
          'border-solid [--xui-alert-icon-bg:color-mix(in_srgb,var(--xui-alert-accent)_12%,transparent)] [--xui-alert-icon-border-width:var(--xui-border-xs)] [--xui-alert-icon-border-color:color-mix(in_srgb,var(--xui-alert-accent)_20%,transparent)]',
      },
      faded: {
        container:
          'border-solid [--xui-alert-bg:color-mix(in_srgb,var(--xui-alert-bg-base)_75%,transparent)] [--xui-alert-text:var(--xui-alert-text-base)] [--xui-alert-description:color-mix(in_srgb,var(--xui-alert-text-base)_75%,transparent)] [--xui-alert-border-width:var(--xui-border-md)] [--xui-alert-border-color:color-mix(in_srgb,var(--xui-alert-accent)_25%,transparent)]',
        iconWrapper:
          'border-solid [--xui-alert-icon-bg:color-mix(in_srgb,var(--xui-alert-accent)_12%,transparent)] [--xui-alert-icon-border-width:var(--xui-border-xs)] [--xui-alert-icon-border-color:color-mix(in_srgb,var(--xui-alert-accent)_20%,transparent)]',
      },
    },
    radius: {
      none: { container: 'rounded-[var(--xui-radius-none)]' },
      sm: { container: 'rounded-[var(--xui-radius-sm)]' },
      md: { container: 'rounded-[var(--xui-radius-md)]' },
      lg: { container: 'rounded-[var(--xui-radius-lg)]' },
      full: { container: 'rounded-[var(--xui-radius-full)]' },
    },
  },
  defaultVariants: {
    themeColor: 'default',
    variant: 'flat',
    radius: 'md',
  },
})
