import { useCallback, useEffect, useRef } from 'react'
import type { CSSObject } from '@emotion/react'
import type {
  AriaRole,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
} from 'react'
import type { TextHostProps } from './text-host.type'

type DOMTextProps = HTMLAttributes<HTMLElement> & {
  'data-testid'?: string
}

const ACCESSIBILITY_ROLE: Partial<
  Record<NonNullable<TextHostProps['accessibilityRole']>, AriaRole>
> = {
  adjustable: 'slider',
  header: 'heading',
  image: 'img',
  imagebutton: 'button',
  keyboardkey: 'button',
  tabbar: 'tablist',
  text: 'none',
  togglebutton: 'button',
}

export function useTextHostProps(props: TextHostProps): {
  domProps: DOMTextProps
  hostStyle: CSSObject
} {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const state = props.accessibilityState
  const value = props.accessibilityValue
  const disabled = props.disabled || state?.disabled || props['aria-disabled']

  useEffect(
    () => () => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current)
    },
    []
  )

  const onClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (!disabled) props.onPress?.(event)
    },
    [disabled, props.onPress]
  )
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (disabled || (event.key !== 'Enter' && event.key !== ' ')) return
      event.preventDefault()
      props.onPress?.(event)
    },
    [disabled, props.onPress]
  )
  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (disabled) return
      if (longPressTimer.current) clearTimeout(longPressTimer.current)
      props.onPressIn?.(event)
      if (props.onLongPress) {
        longPressTimer.current = setTimeout(() => props.onLongPress?.(event), 500)
      }
    },
    [disabled, props.onLongPress, props.onPressIn]
  )
  const onPointerEnd = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current)
      longPressTimer.current = null
      if (!disabled) props.onPressOut?.(event)
    },
    [disabled, props.onPressOut]
  )

  const role = props.role ?? resolveRole(props.accessibilityRole)
  // Each fallback stays optional: a plain `aria-hidden="false"` on every text node is a
  // leak, not a default — Native renders no such attribute.
  const hidden =
    props['aria-hidden'] ??
    props.accessibilityElementsHidden ??
    (props.importantForAccessibility === 'no-hide-descendants' ? true : undefined)
  const labelledBy =
    props['aria-labelledby'] ??
    (Array.isArray(props.accessibilityLabelledBy)
      ? props.accessibilityLabelledBy.join(' ')
      : props.accessibilityLabelledBy)

  return {
    domProps: {
      id: props.id ?? props.nativeID,
      role,
      lang: props.accessibilityLanguage,
      tabIndex: props.onPress && !disabled ? 0 : undefined,
      'data-testid': props.testID,
      'aria-label': props['aria-label'] ?? props.accessibilityLabel,
      'aria-description': props.accessibilityHint,
      'aria-labelledby': labelledBy,
      'aria-live':
        props['aria-live'] ??
        (props.accessibilityLiveRegion === 'none'
          ? 'off'
          : props.accessibilityLiveRegion),
      'aria-hidden': hidden,
      'aria-modal': props['aria-modal'] ?? props.accessibilityViewIsModal,
      'aria-busy': props['aria-busy'] ?? state?.busy,
      'aria-checked': props['aria-checked'] ?? state?.checked,
      'aria-disabled': props['aria-disabled'] ?? state?.disabled ?? props.disabled,
      'aria-expanded': props['aria-expanded'] ?? state?.expanded,
      'aria-selected': props['aria-selected'] ?? state?.selected,
      'aria-valuemax': props['aria-valuemax'] ?? value?.max,
      'aria-valuemin': props['aria-valuemin'] ?? value?.min,
      'aria-valuenow': props['aria-valuenow'] ?? value?.now,
      'aria-valuetext': props['aria-valuetext'] ?? value?.text,
      onClick: props.onPress ? onClick : undefined,
      onKeyDown: props.onPress ? onKeyDown : undefined,
      onPointerDown:
        props.onPressIn || props.onLongPress ? onPointerDown : undefined,
      onPointerUp: props.onPressOut || props.onLongPress ? onPointerEnd : undefined,
      onPointerCancel:
        props.onPressOut || props.onLongPress ? onPointerEnd : undefined,
      onPointerLeave:
        props.onPressOut || props.onLongPress ? onPointerEnd : undefined,
    },
    hostStyle: textHostStyle(props),
  }
}

function resolveRole(
  role: TextHostProps['accessibilityRole']
): AriaRole | undefined {
  if (!role || role === 'none') return undefined
  return ACCESSIBILITY_ROLE[role] ?? (role as AriaRole)
}

function textHostStyle(props: TextHostProps): CSSObject {
  const style: CSSObject = {
    pointerEvents:
      props.pointerEvents === 'box-none'
        ? 'none'
        : props.pointerEvents === 'box-only'
          ? 'auto'
          : props.pointerEvents,
    userSelect:
      props.selectable === undefined
        ? undefined
        : props.selectable
          ? 'text'
          : 'none',
    hyphens:
      props.android_hyphenationFrequency === 'none'
        ? 'none'
        : props.android_hyphenationFrequency
          ? 'auto'
          : undefined,
  }

  if (props.pointerEvents === 'box-none') {
    style['& > *'] = { pointerEvents: 'auto' }
  } else if (props.pointerEvents === 'box-only') {
    style['& > *'] = { pointerEvents: 'none' }
  }

  if (props.selectionColor) {
    style['&::selection'] = { backgroundColor: props.selectionColor }
  }
  const lineCount = resolveLineCount(props.numberOfLines)
  if (lineCount === undefined) return style

  style.overflow = 'hidden'
  if (lineCount === 1) {
    style.display = 'inline-block'
    style.whiteSpace = 'nowrap'
    style.textOverflow = ellipsisFor(props)
    return style
  }

  style.display = '-webkit-box'
  style.WebkitBoxOrient = 'vertical'
  style.WebkitLineClamp = lineCount
  return style
}

function resolveLineCount(value: number | undefined): number | undefined {
  if (value === undefined || !Number.isFinite(value) || value < 1) return undefined
  return Math.floor(value)
}

function ellipsisFor(props: TextHostProps): 'clip' | 'ellipsis' {
  const mode = props.ellipsizeMode ?? props.lineBreakMode ?? 'tail'
  return mode === 'clip' ? 'clip' : 'ellipsis'
}
