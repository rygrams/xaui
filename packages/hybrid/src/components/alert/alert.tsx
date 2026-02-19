'use client'

import React from 'react'
import type { AlertProps } from './alert.type'
import { alertStyles } from './alert.style'
import {
  DefaultAlertCloseButton,
  useAlertCloseButtonNode,
  useAlertContentNodes,
  useAlertIconNode,
  useAlertVisibility,
} from './alert.hook'

export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  icon,
  themeColor = 'default',
  variant = 'flat',
  radius = 'md',
  isClosable = false,
  hideIcon = false,
  closeButton,
  isVisible,
  customAppearance,
  children,
  onClose,
  onVisibleChange,
}) => {
  const slots = alertStyles({ variant, themeColor, radius })
  const { shouldRender, animState, handleClose, handleAnimationEnd } =
    useAlertVisibility({
      isVisible,
      onClose,
      onVisibleChange,
    })
  const shouldShowClose = Boolean(closeButton || isClosable || onClose)
  const iconNode = useAlertIconNode({ hideIcon, icon, themeColor, slots })
  const { titleNode, descriptionNode, childrenNode } = useAlertContentNodes({
    title,
    description,
    children,
    customAppearance,
    slots,
  })
  const closeButtonNode = useAlertCloseButtonNode({ closeButton, handleClose })

  if (!shouldRender) return null

  return (
    <div
      role="alert"
      data-xui-state={animState}
      className={slots.container()}
      style={customAppearance?.container}
      onAnimationEnd={handleAnimationEnd}
    >
      {!hideIcon && <div className={slots.iconWrapper()}>{iconNode}</div>}
      <div className={slots.mainWrapper()}>
        {titleNode}
        {descriptionNode}
        {childrenNode && <div className={slots.extraContent()}>{childrenNode}</div>}
      </div>
      {shouldShowClose && (
        <div>
          {closeButtonNode ?? (
            <DefaultAlertCloseButton
              onClick={handleClose}
              className={slots.closeButton()}
            />
          )}
        </div>
      )}
    </div>
  )
}
