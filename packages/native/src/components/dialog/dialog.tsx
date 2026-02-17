import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import { withOpacity } from '@xaui/core'
import { useBorderRadiusStyles, useXUITheme } from '../../core/theme-hooks'
import { CloseIcon } from '@xaui/icons'
import { styles } from './dialog.style'
import type {
  DialogBackdrop,
  DialogBodyProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogPlacement,
  DialogProps,
  DialogSize,
} from './dialog.type'

type DialogContextValue = {
  onClose?: () => void
  customAppearance?: DialogProps['customAppearance']
}

const DialogContext = createContext<DialogContextValue>({})

const sizeStyles: Record<DialogSize, object> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  full: styles.sizeFull,
}

const placementStyles: Record<DialogPlacement, object> = {
  top: styles.placementTop,
  center: styles.placementCenter,
  bottom: styles.placementBottom,
}

const backdropStyles: Record<DialogBackdrop, object> = {
  transparent: styles.backdropTransparent,
  blurred: styles.backdropBlurred,
  opaque: styles.backdropOpaque,
}

const resolveChildrenContent = (
  content: React.ReactNode,
  textStyle: object
): React.ReactNode => {
  if (content === undefined || content === null) return null

  if (typeof content === 'string' || typeof content === 'number') {
    return <Text style={textStyle}>{content}</Text>
  }

  return content
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  isOpen,
  onClose,
  onOpenChange,
  size = 'md',
  placement = 'center',
  radius = 'lg',
  backdrop = 'opaque',
  closeOnBackdropPress = true,
  hideBackdrop = false,
  animationType = 'fade',
  disableAnimation = false,
  style,
  customAppearance,
}) => {
  const theme = useXUITheme()
  const radiusStyles = useBorderRadiusStyles(radius)

  const resolvedAnimationType = disableAnimation ? 'none' : animationType

  const handleClose = useCallback(() => {
    onOpenChange?.(false)
    onClose?.()
  }, [onClose, onOpenChange])

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      handleClose()
    }
  }

  const dialogContextValue = useMemo(
    () => ({
      onClose: handleClose,
      customAppearance,
    }),
    [customAppearance, handleClose]
  )

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType={resolvedAnimationType}
      onRequestClose={handleClose}
    >
      <View style={styles.root}>
        {!hideBackdrop && (
          <Pressable
            style={[
              styles.backdrop,
              backdropStyles[backdrop],
              customAppearance?.backdrop,
            ]}
            onPress={handleBackdropPress}
          />
        )}

        <View style={[styles.placementBase, placementStyles[placement]]}>
          <DialogContext.Provider value={dialogContextValue}>
            <Pressable onPress={event => event.stopPropagation()}>
              <View
                style={[
                  styles.dialog,
                  sizeStyles[size],
                  radiusStyles,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: withOpacity(theme.colors.foreground, 0.14),
                  },
                  theme.shadows.lg,
                  customAppearance?.container,
                  style,
                ]}
              >
                {children}
              </View>
            </Pressable>
          </DialogContext.Provider>
        </View>
      </View>
    </Modal>
  )
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  children,
  isClosable = false,
  closeButton,
  onClose,
  style,
}) => {
  const theme = useXUITheme()
  const { onClose: contextClose, customAppearance } = useContext(DialogContext)
  const close = onClose ?? contextClose

  return (
    <View style={[styles.header, customAppearance?.header, style]}>
      <View style={styles.headerContent}>
        {resolveChildrenContent(children, [
          styles.headerText,
          { color: theme.colors.foreground },
          customAppearance?.headerText,
        ])}
      </View>
      {isClosable && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
          onPress={close}
          style={[styles.closeButton, customAppearance?.closeButton]}
        >
          {closeButton ?? <CloseIcon size={22} color={theme.colors.foreground} />}
        </Pressable>
      )}
    </View>
  )
}

export const DialogBody: React.FC<DialogBodyProps> = ({ children, style }) => {
  const theme = useXUITheme()
  const { customAppearance } = useContext(DialogContext)

  return (
    <View style={[styles.body, customAppearance?.body, style]}>
      {resolveChildrenContent(children, [
        styles.bodyText,
        { color: withOpacity(theme.colors.foreground, 0.9) },
        customAppearance?.bodyText,
      ])}
    </View>
  )
}

export const DialogFooter: React.FC<DialogFooterProps> = ({ children, style }) => {
  const { customAppearance } = useContext(DialogContext)

  return (
    <View style={[styles.footer, customAppearance?.footer, style]}>{children}</View>
  )
}
