import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Modal, Pressable, Text, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
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

const ENTER_DURATION = 240
const EXIT_DURATION = 180

function getTranslateOffset(
  placement: DialogPlacement,
  animationType: DialogProps['animationType']
): number {
  if (animationType === 'slide') {
    if (placement === 'top') return -28
    if (placement === 'bottom') return 28
    return 18
  }

  if (placement === 'top') return -18
  if (placement === 'bottom') return 18
  return 10
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
  const [shouldRender, setShouldRender] = useState(isOpen)
  const openRef = useRef(isOpen)

  const shouldAnimate = !disableAnimation && animationType !== 'none'
  const initialOffset = getTranslateOffset(placement, animationType)
  const backdropOpacity = useSharedValue(isOpen ? 1 : 0)
  const dialogOpacity = useSharedValue(isOpen ? 1 : 0)
  const dialogTranslate = useSharedValue(isOpen ? 0 : initialOffset)
  const dialogScale = useSharedValue(isOpen ? 1 : placement === 'center' ? 0.98 : 1)

  const requestClose = useCallback(() => {
    onOpenChange?.(false)
    onClose?.()
  }, [onClose, onOpenChange])

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      requestClose()
    }
  }

  const finishClosing = useCallback(() => {
    if (!openRef.current) {
      setShouldRender(false)
    }
  }, [])

  useEffect(() => {
    openRef.current = isOpen
  }, [isOpen])

  useEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true)
    }
  }, [isOpen, shouldRender])

  useEffect(() => {
    if (!shouldRender) return

    if (!shouldAnimate) {
      backdropOpacity.value = isOpen ? 1 : 0
      dialogOpacity.value = isOpen ? 1 : 0
      dialogTranslate.value = 0
      dialogScale.value = 1

      if (!isOpen) {
        setShouldRender(false)
      }
      return
    }

    const offset = getTranslateOffset(placement, animationType)

    if (isOpen) {
      backdropOpacity.value = 0
      dialogOpacity.value = 0
      dialogTranslate.value = offset
      dialogScale.value = placement === 'center' ? 0.98 : 1

      backdropOpacity.value = withTiming(1, {
        duration: 210,
        easing: Easing.out(Easing.quad),
      })
      dialogOpacity.value = withTiming(1, {
        duration: 220,
        easing: Easing.out(Easing.quad),
      })
      dialogTranslate.value = withTiming(0, {
        duration: ENTER_DURATION,
        easing: Easing.out(Easing.cubic),
      })
      dialogScale.value = withTiming(1, {
        duration: 220,
        easing: Easing.out(Easing.quad),
      })
      return
    }

    backdropOpacity.value = withTiming(0, {
      duration: 150,
      easing: Easing.in(Easing.quad),
    })
    dialogTranslate.value = withTiming(offset, {
      duration: EXIT_DURATION,
      easing: Easing.in(Easing.cubic),
    })
    dialogScale.value = withTiming(placement === 'center' ? 0.98 : 1, {
      duration: 150,
      easing: Easing.in(Easing.quad),
    })

    dialogOpacity.value = withTiming(
      0,
      {
        duration: EXIT_DURATION,
        easing: Easing.in(Easing.quad),
      },
      finished => {
        if (finished) {
          scheduleOnRN(finishClosing)
        }
      }
    )
  }, [
    animationType,
    backdropOpacity,
    dialogOpacity,
    dialogScale,
    dialogTranslate,
    finishClosing,
    isOpen,
    placement,
    shouldAnimate,
    shouldRender,
  ])

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }))

  const dialogAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dialogOpacity.value,
    transform: [{ translateY: dialogTranslate.value }, { scale: dialogScale.value }],
  }))

  const dialogContextValue = useMemo(
    () => ({
      onClose: requestClose,
      customAppearance,
    }),
    [customAppearance, requestClose]
  )

  if (!shouldRender) return null

  return (
    <Modal
      visible
      transparent
      animationType="none"
      onRequestClose={requestClose}
    >
      <View style={styles.root}>
        {!hideBackdrop && (
          <AnimatedPressable
            style={[
              styles.backdrop,
              backdropStyles[backdrop],
              backdropAnimatedStyle,
              customAppearance?.backdrop,
            ]}
            onPress={handleBackdropPress}
          />
        )}

        <View style={[styles.placementBase, placementStyles[placement]]}>
          <DialogContext.Provider value={dialogContextValue}>
            <Pressable onPress={event => event.stopPropagation()}>
              <Animated.View
                style={[
                  styles.dialog,
                  sizeStyles[size],
                  radiusStyles,
                  dialogAnimatedStyle,
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
              </Animated.View>
            </Pressable>
          </DialogContext.Provider>
        </View>
      </View>
    </Modal>
  )
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

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
