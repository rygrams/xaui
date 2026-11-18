import { forwardRef, useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { ImageStyle, LayoutChangeEvent, TextStyle, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  containsElementOfType,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useTramMotion } from '../../motion/use-tram-motion'
import { accentPaintFor } from '../../system/accent-paint'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { tramAccents, tramPicture } from '../../theme/tram-tokens'
import { TileBack, TileFront } from './tile-face'
import { TilePictured } from './tile-image'
import { TileLabel } from './tile-label'
import { TileProvider, useIsInTileGrid } from './tile.context'
import { DEFAULT_SIZE, DEFAULT_VARIANT, tileRecipe } from './tile.recipe'
import type { TileShape } from './tile.recipe'
import type { TileProps } from './tile.type'

/**
 * The live tile — icon, shortcut and widget in one square. Tram's own: Native has no
 * component of this name.
 *
 * ```tsx
 * <Tile size="small" onPress={openMail}>
 *   <Tile.Icon as={MailIcon} />
 *   <Tile.Count>7</Tile.Count>
 * </Tile>
 *
 * const face = useTileFace(4000)
 *
 * <Tile size="medium" face={face} onPress={openWeather}>
 *   <Tile.Front>
 *     <Tile.Count>29°</Tile.Count>
 *     <Tile.Label>Météo</Tile.Label>
 *   </Tile.Front>
 *   <Tile.Back>
 *     <Tile.Label>Orages vers 17 h</Tile.Label>
 *   </Tile.Back>
 * </Tile>
 * ```
 *
 * A text child is the tile's name: `<Tile>Courrier</Tile>` writes it as a `Tile.Label`.
 *
 * `Tile.Image` puts a picture in place of the fill, on the tile or on one face; what is
 * written over it is set in white on a band of black across the foot of the square.
 *
 * A press leans the tile toward the finger and is felt through `TramProvider`'s
 * `onHaptic`. Outside a `Tile.Grid` a tile is a square — a wide one twice as long — as
 * wide as it is told to be.
 */
export const TileRoot = forwardRef<View, TileProps>(function Tile(
  {
    children,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    accent,
    color,
    face = 'front',
    transition = 'flip',
    isDisabled = false,
    asChild = false,
    animation,
    accessibilityRole = 'button',
    accessibilityState,
    style,
    onPressIn,
    onPressOut,
    onLayout,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const haptic = useTramHaptic()
  const animate = useTramMotion()
  const isInGrid = useIsInTileGrid()
  const [isPressed, press] = usePressState({
    // Felt as the finger lands, with the tilt.
    onPressIn: event => {
      haptic('press')
      onPressIn?.(event)
    },
    onPressOut,
  })

  const turn = useSharedValue(face === 'back' ? 1 : 0)
  const height = useSharedValue(0)

  useEffect(() => {
    turn.value = animate(face === 'back' ? 1 : 0, 'tile')
  }, [face, animate, turn])

  const shape: TileShape = isInGrid ? 'filling' : size === 'wide' ? 'wide' : 'square'
  const selection = { variant, size, shape, transition }
  const states = { disabled: isDisabled }

  const styles = tileRecipe.resolve({ theme, selection, states })
  // The surface is the theme's and has no accent in it: only the two accent fills are
  // repainted. A raw `color` is the caller's word and is never corrected.
  const named =
    accent && !color && variant !== 'surface'
      ? accentPaintFor(tramAccents[accent], variant, theme.colors.background)
      : undefined
  const paint = variant === 'surface' ? undefined : (color ?? named?.tint)
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? tileRecipe.tint({ theme, color: paint, selection, states })
    : undefined
  const ink = named?.label

  const context = useMemo(() => {
    const inked = ink ? { color: ink } : undefined
    const icon = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon, inked])
    const foreground = typeof icon.color === 'string' ? icon.color : undefined

    // On a picture neither the variant nor the accent reads: everything is white.
    const white = { color: tramPicture.ink }

    return {
      faceStyle: [styles.face, tint?.face],
      // A recipe slot is typed for a view and a text; this one is an image's, and holds
      // nothing (`overflow: 'scroll'`) an image would refuse.
      imageStyle: styles.image as ImageStyle,
      labelStyle: [styles.label, tint?.label, inked],
      countStyle: [styles.count, tint?.count, inked],
      icon: { size: icon.fontSize, color: foreground },
      foreground,
      bandStyle: styles.band,
      onPicture: {
        labelStyle: [styles.label, white],
        countStyle: [styles.count, white],
        icon: { size: icon.fontSize, color: tramPicture.ink },
        foreground: tramPicture.ink,
      },
      face,
      transition,
      turn,
      height,
      isDisabled,
    }
  }, [styles, tint, ink, face, transition, turn, height, isDisabled])

  const hasFaces =
    containsElementOfType(children, TileFront) ||
    containsElementOfType(children, TileBack)

  // Most general to most specific: the cached recipe, the tint, the style props, `style`.
  const rootStyle = [
    styles.root,
    tint?.root,
    hasFaces ? styles.bare : undefined,
    styleProps,
    typeof style === 'function' ? style({ pressed: isPressed }) : style,
  ]

  const text = childrenToString(children)

  const handleLayout = (event: LayoutChangeEvent) => {
    height.value = event.nativeEvent.layout.height
    onLayout?.(event)
  }

  // Native's scale, highlight and ripple stay off: the press is the Tram tilt alone.
  const motion = resolveAnimation(animation, useAnimationDisabled())
  const Root = motion.scale ? PressTilt : PressableFeedback

  return (
    <TileProvider value={context}>
      <Root
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        animation={motion.disableAll ? 'disable-all' : false}
        accessibilityRole={accessibilityRole}
        // Merged, not spread over: a caller adding `selected` must not drop this one.
        accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
        {...rest}
        style={rootStyle}
        onLayout={handleLayout}
        // After `rest`, and composed: the caller's handlers run inside these.
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {/* Under `asChild` the caller's element is the tile: one child, theirs. */}
        {asChild ? (
          children
        ) : text !== null ? (
          <TileLabel>{text}</TileLabel>
        ) : (
          <TilePictured>{children}</TilePictured>
        )}
      </Root>
    </TileProvider>
  )
})

TileRoot.displayName = 'XAUI.Tram.Tile.Root'
