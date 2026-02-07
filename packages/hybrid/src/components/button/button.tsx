import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ActivityIndicator } from '../indicator'
import { buttonStyles } from './button.style'
import { useButtonStyles } from './button.hook'
import type { ButtonProps } from './button.type'

export const Button: React.FC<ButtonProps> = ({
  children,
  themeColor = 'primary',
  variant = 'solid',
  size = 'md',
  radius = 'md',
  startContent,
  endContent,
  spinnerPlacement = 'start',
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  elevation = 0,
  className,
  style: userStyle,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...restProps
}) => {
  const [isPressed, setIsPressed] = useState(false)

  const { base } = buttonStyles({ fullWidth, isDisabled })

  const { sizeStyles, radiusStyles, variantStyles, textColor, spinnerSize } =
    useButtonStyles(themeColor, variant, size, radius, elevation)

  const handleMouseDown: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (!isDisabled && !isLoading) {
      setIsPressed(true)
    }
    onMouseDown?.(event)
  }

  const handleMouseUp: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (!isDisabled && !isLoading) {
      setIsPressed(false)
    }
    onMouseUp?.(event)
  }

  const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (!isDisabled && !isLoading) {
      setIsPressed(false)
    }
    onMouseLeave?.(event)
  }

  const spinnerElement = (
    <ActivityIndicator
      variant="circular"
      showTrack={false}
      themeColor={variant === 'solid' ? undefined : themeColor}
      color={variant === 'solid' ? textColor : undefined}
      size={spinnerSize}
    />
  )

  return (
    <motion.button
      type="button"
      className={base({ className })}
      disabled={isDisabled || isLoading}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...restProps}
      style={{
        ...sizeStyles,
        ...radiusStyles,
        ...variantStyles,
        ...userStyle,
      }}
      animate={{
        scale: isPressed ? 0.99 : 1,
        opacity: isPressed ? 0.8 : 1,
      }}
      transition={{
        duration: 0.1,
        ease: 'easeInOut',
      }}
    >
      {startContent && (
        <span className="inline-flex items-center shrink-0">{startContent}</span>
      )}
      {isLoading && spinnerPlacement === 'start' && spinnerElement}
      {children}
      {isLoading && spinnerPlacement === 'end' && spinnerElement}
      {endContent && (
        <span className="inline-flex items-center shrink-0">{endContent}</span>
      )}
    </motion.button>
  )
}
