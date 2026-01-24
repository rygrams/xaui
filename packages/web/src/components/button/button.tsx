import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ActivityIndicator } from '../indicator'
import { buttonStyles } from './button.style'
import { useButtonStyles } from './button.hook'
import type { ButtonProps } from './button.type'

export const Button: React.FC<ButtonProps> = ({
  children,
  themeColor = 'default',
  variant = 'solid',
  size = 'md',
  radius = 'md',
  startContent,
  endContent,
  spinnerPlacement = 'start',
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  className,
  style: userStyle,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...restProps
}) => {
  const [isPressed, setIsPressed] = useState(false)

  const {
    base,
    contentContainer,
    startContent: startContentClass,
    endContent: endContentClass,
    spinner,
  } = buttonStyles({ fullWidth, isDisabled })

  const { sizeStyles, radiusStyles, variantStyles, textColor, spinnerSize } =
    useButtonStyles(themeColor, variant, size, radius)

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
      themeColor={variant === 'solid' || variant === 'elevated' ? undefined : themeColor}
      color={variant === 'solid' || variant === 'elevated' ? textColor : undefined}
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
        scale: isPressed ? 0.95 : 1,
        opacity: isPressed ? 0.8 : 1,
      }}
      transition={{
        duration: 0.1,
        ease: 'easeInOut',
      }}
    >
      <div className={contentContainer()}>
        {startContent && !isLoading && (
          <div className={startContentClass()}>{startContent}</div>
        )}

        {isLoading && spinnerPlacement === 'start' && (
          <div className={spinner()}>{spinnerElement}</div>
        )}

        <span>{children}</span>

        {isLoading && spinnerPlacement === 'end' && (
          <div className={spinner()}>{spinnerElement}</div>
        )}

        {endContent && !isLoading && (
          <div className={endContentClass()}>{endContent}</div>
        )}
      </div>
    </motion.button>
  )
}
