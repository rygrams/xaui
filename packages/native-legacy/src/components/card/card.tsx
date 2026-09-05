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
 * `header`, `body`, `footer`, `title` and `description` become the five slots of the same
 * names, and `customAppearance` goes with them: each slot carries its own `style` and its
 * own style props. `themeColor` becomes the four-level emphasis `variant` or a raw `color`.
 *
 * `padding` and `elevation` are what `size` and `variant` already decide. `fullWidth` is
 * gone — a card with no width already fills its column, which is React Native's own
 * behaviour. `isHoverable`, `isBlurred` and `isFooterBlurred` have no v1 equivalent: there
 * is no hover on a touch surface, and a blur is a theme rather than a card prop.
 *
 * `Card.Background` is new, and it is where a cover image goes: the root paints it first
 * wherever it is written, and the layer carries the clip so the card keeps its shadow.
 *
 * ```tsx
 * // legacy
 * <Card themeColor="default" elevation={2} customAppearance={{ title: { fontSize: 20 } }}>
 *   <CardHeader><CardTitle>Facture</CardTitle></CardHeader>
 * </Card>
 *
 * // v1
 * <Card>
 *   <Card.Header><Card.Title fontSize={20}>Facture</Card.Title></Card.Header>
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
