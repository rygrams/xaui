import React from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import { styles } from './card.style'
import {
  useCardContainerStyles,
  useCardElevationStyles,
  useCardFooterStyles,
  useCardTextStyles,
} from './card.hook'
import type {
  CardBodyProps,
  CardCustomAppearance,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from './card.type'
import type { ThemeColor } from '../../types'

type CardContextValue = {
  themeColor: ThemeColor
  isFooterBlurred: boolean
  customAppearance?: CardCustomAppearance
}

const CardContext = React.createContext<CardContextValue>({
  themeColor: 'default',
  isFooterBlurred: false,
})

/**
 * @deprecated Use `Card` from `@xaui/native/card`. This tree is frozen and receives fixes
 * only.
 *
 * The v1 replacement composes instead of configuring: `themeColor` becomes the four-level
 * `variant` union or a raw `color`, `customAppearance` becomes a `style` on each slot,
 * `padding` and `elevation` are what `size` and `variant` already decide, and `fullWidth`
 * is gone — a card with no width already fills a column. `isHoverable`, `isBlurred` and
 * `isFooterBlurred` have no v1 equivalent: there is no hover on a touch surface, and the
 * blur is a theme rather than a card prop.
 *
 * ```tsx
 * // legacy
 * <Card themeColor="default" elevation={2} customAppearance={{ title: { fontSize: 20 } }}>
 *   <CardHeader>
 *     <CardTitle>Facture</CardTitle>
 *   </CardHeader>
 * </Card>
 *
 * // v1
 * <Card>
 *   <Card.Header>
 *     <Card.Title fontSize={20}>Facture</Card.Title>
 *   </Card.Header>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  themeColor = 'default',
  radius = 'lg',
  padding = 16,
  elevation = 0,
  fullWidth = false,
  isHoverable = false,
  isPressable = false,
  isBlurred = false,
  isFooterBlurred = false,
  isDisabled = false,
  disableAnimation = false,
  disableRipple: _disableRipple = false,
  allowTextSelectionOnPress: _allowTextSelectionOnPress = false,
  customAppearance,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
}: CardProps) => {
  const animatedScale = React.useRef(new Animated.Value(1)).current
  const animatedOpacity = React.useRef(new Animated.Value(1)).current

  const radiusStyles = useBorderRadiusStyles(radius)
  const containerStyles = useCardContainerStyles(themeColor, isBlurred)
  const elevationStyles = useCardElevationStyles(elevation)

  const contextValue = React.useMemo(
    () => ({
      themeColor,
      isFooterBlurred,
      customAppearance,
    }),
    [customAppearance, isFooterBlurred, themeColor]
  )

  const animateTo = React.useCallback(
    (scale: number, opacity: number, duration: number) => {
      if (disableAnimation) {
        animatedScale.setValue(scale)
        animatedOpacity.setValue(opacity)
        return
      }
      Animated.parallel([
        Animated.timing(animatedScale, {
          toValue: scale,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: opacity,
          duration,
          useNativeDriver: true,
        }),
      ]).start()
    },
    [animatedOpacity, animatedScale, disableAnimation]
  )

  const handlePressIn = React.useCallback(
    (event: Parameters<NonNullable<CardProps['onPressIn']>>[0]) => {
      if (!isDisabled && isPressable) {
        animateTo(0.985, 0.95, 110)
      }
      onPressIn?.(event)
    },
    [animateTo, isDisabled, isPressable, onPressIn]
  )

  const handlePressOut = React.useCallback(
    (event: Parameters<NonNullable<CardProps['onPressOut']>>[0]) => {
      if (!isDisabled && isPressable) {
        animateTo(1, 1, 140)
      }
      onPressOut?.(event)
    },
    [animateTo, isDisabled, isPressable, onPressOut]
  )

  const handleHoverIn = React.useCallback(() => {
    if (!isDisabled && isHoverable && !isPressable) {
      animateTo(1.01, 1, 130)
    }
  }, [animateTo, isDisabled, isHoverable, isPressable])

  const handleHoverOut = React.useCallback(() => {
    if (!isDisabled && isHoverable && !isPressable) {
      animateTo(1, 1, 130)
    }
  }, [animateTo, isDisabled, isHoverable, isPressable])

  const cardContent = (
    <Animated.View
      style={[
        styles.card,
        radiusStyles,
        containerStyles,
        elevationStyles,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        {
          padding,
          transform: [{ scale: animatedScale }],
          opacity: animatedOpacity,
        },
        customAppearance?.container,
      ]}
    >
      <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
    </Animated.View>
  )

  if (!isPressable) {
    return cardContent
  }

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      onLongPress={isDisabled ? undefined : onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={isHoverable ? handleHoverIn : undefined}
      onHoverOut={isHoverable ? handleHoverOut : undefined}
      disabled={isDisabled}
    >
      {cardContent}
    </Pressable>
  )
}

/**
 * @deprecated Use `Card.Header` from `@xaui/native/card`. This tree is frozen and
 * receives fixes only.
 *
 * The v1 header is a slot on the root, styled through its own `style` and style props
 * rather than through `customAppearance.header`.
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  customAppearance,
}: CardHeaderProps) => {
  const cardContext = React.useContext(CardContext)

  return (
    <View
      style={[
        styles.header,
        cardContext.customAppearance?.header,
        customAppearance?.container,
      ]}
    >
      {children}
    </View>
  )
}

/**
 * @deprecated Use `Card.Body` from `@xaui/native/card`. This tree is frozen and receives
 * fixes only.
 *
 * The v1 body is a slot on the root, styled through its own `style` and style props
 * rather than through `customAppearance.body`.
 */
export const CardBody: React.FC<CardBodyProps> = ({
  children,
  customAppearance,
}: CardBodyProps) => {
  const cardContext = React.useContext(CardContext)

  return (
    <View
      style={[
        styles.body,
        cardContext.customAppearance?.body,
        customAppearance?.container,
      ]}
    >
      {children}
    </View>
  )
}

/**
 * @deprecated Use `Card.Footer` from `@xaui/native/card`. This tree is frozen and
 * receives fixes only.
 *
 * The v1 footer is a slot on the root and a row by default. `isFooterBlurred` has no
 * equivalent: the blur is a theme rather than a card prop.
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  customAppearance,
}: CardFooterProps) => {
  const cardContext = React.useContext(CardContext)
  const footerStyles = useCardFooterStyles(
    cardContext.themeColor,
    cardContext.isFooterBlurred
  )

  return (
    <View
      style={[
        styles.footer,
        footerStyles,
        cardContext.customAppearance?.footer,
        customAppearance?.container,
      ]}
    >
      {children}
    </View>
  )
}

/**
 * @deprecated Use `Card.Title` from `@xaui/native/card`. This tree is frozen and receives
 * fixes only.
 *
 * The v1 title is a slot on the root, styled through its own `style` and style props
 * rather than through `customAppearance.title`.
 */
export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  customAppearance,
}: CardTitleProps) => {
  const cardContext = React.useContext(CardContext)
  const { titleColor } = useCardTextStyles(cardContext.themeColor)

  return (
    <Text
      style={[
        styles.title,
        { color: titleColor },
        cardContext.customAppearance?.title,
        customAppearance?.text,
      ]}
    >
      {children}
    </Text>
  )
}

/**
 * @deprecated Use `Card.Description` from `@xaui/native/card`. This tree is frozen and
 * receives fixes only.
 *
 * The v1 description is a slot on the root, styled through its own `style` and style
 * props rather than through `customAppearance.description`.
 */
export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  customAppearance,
}: CardDescriptionProps) => {
  const cardContext = React.useContext(CardContext)
  const { descriptionColor } = useCardTextStyles(cardContext.themeColor)

  return (
    <Text
      style={[
        styles.description,
        { color: descriptionColor },
        cardContext.customAppearance?.description,
        customAppearance?.text,
      ]}
    >
      {children}
    </Text>
  )
}
