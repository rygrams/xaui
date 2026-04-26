'use client'

import React, { useEffect, useRef } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import type { ContainerProps } from './container.type'
import {
  resolveEdgeInsets,
  resolveAlignment,
  resolveBorderRadius,
  resolveBorder,
  resolveShadow,
  resolveTransform,
} from './container.utils'

const buildStyle = (props: ContainerProps): CSSProperties => ({
  ...(props.width !== undefined && { width: props.width }),
  ...(props.height !== undefined && { height: props.height }),
  ...(props.minWidth !== undefined && { minWidth: props.minWidth }),
  ...(props.maxWidth !== undefined && { maxWidth: props.maxWidth }),
  ...(props.minHeight !== undefined && { minHeight: props.minHeight }),
  ...(props.maxHeight !== undefined && { maxHeight: props.maxHeight }),
  ...(props.aspectRatio !== undefined && { aspectRatio: props.aspectRatio }),
  ...(props.flex !== undefined && { flex: props.flex }),
  ...(props.color !== undefined && { backgroundColor: props.color }),
  ...(props.clip && { overflow: 'hidden' as const }),
  ...(props.opacity !== undefined && { opacity: props.opacity }),
  ...(props.padding !== undefined && resolveEdgeInsets(props.padding, 'padding')),
  ...(props.margin !== undefined && resolveEdgeInsets(props.margin, 'margin')),
  ...(props.alignment !== undefined && resolveAlignment(props.alignment)),
  ...(props.borderRadius !== undefined && resolveBorderRadius(props.borderRadius)),
  ...(props.border !== undefined && resolveBorder(props.border)),
  ...(props.shadow !== undefined && resolveShadow(props.shadow)),
  ...(props.transform !== undefined && resolveTransform(props.transform)),
  boxSizing: 'border-box',
})

export const Container: React.FC<ContainerProps> = (props) => {
  const {
    children,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    disabled = false,
    ariaLabel,
    role,
    tabIndex,
    testID,
    style,
    className,
  } = props

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerStyle = buildStyle(props)
  const mergedStyle: CSSProperties = { ...containerStyle, ...style }
  const isInteractive = !!(onPress ?? onLongPress ?? onPressIn ?? onPressOut)

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  useEffect(() => cancelLongPress, [])

  const handlePointerDown = () => {
    onPressIn?.()
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress()
      }, 500)
    }
  }

  const handlePointerUp = () => {
    onPressOut?.()
    cancelLongPress()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onPress?.()
    }
  }

  if (isInteractive) {
    return (
      <div
        role={role ?? 'button'}
        tabIndex={disabled ? undefined : (tabIndex ?? 0)}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        data-testid={testID}
        className={className}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...mergedStyle,
        }}
        onClick={disabled ? undefined : onPress}
        onPointerDown={disabled ? undefined : handlePointerDown}
        onPointerUp={disabled ? undefined : handlePointerUp}
        onPointerCancel={disabled ? undefined : cancelLongPress}
        onPointerLeave={disabled ? undefined : cancelLongPress}
        onKeyDown={disabled ? undefined : handleKeyDown}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      data-testid={testID}
      className={className}
      style={mergedStyle}
    >
      {children}
    </div>
  )
}

Container.displayName = 'Container'
