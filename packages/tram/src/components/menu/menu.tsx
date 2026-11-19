import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import type { StyleProp, TextStyle, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import { useAnimationDisabled } from '@xaui/native/system'
import type { IconContextValue } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { createNodeSlot } from '../../system/node-slot'
import { moveFocusTo } from '../../system/move-focus'
import { useTramPages } from '../../theme/tram-pages'
import type { TramPageStage } from '../../theme/tram-pages'
import { MenuProvider } from './menu.context'
import { centreOffset, within } from './menu.place'
import type { MenuOffset, MenuRect } from './menu.place'
import { MENU_INDICATOR, menuRecipe } from './menu.recipe'
import type { MenuAnchor, MenuProps } from './menu.type'

const NOWHERE: MenuRect = { x: 0, y: 0, width: 0, height: 0 }
const CENTRED: MenuOffset = { x: 0, y: 0 }

/**
 * A list of actions on what it was opened from — the Native `Menu`'s API, drawn as the
 * Metro context menu: a band the width of the screen against its trigger, in big text,
 * which swivels in on the edge it shares with the trigger. Behind it the page is dimmed
 * and steps back, and the trigger stays in front, in place and at its size.
 *
 * ```tsx
 * <Menu>
 *   <Menu.Trigger asChild opensOn="longPress">
 *     <ListBox.ItemButton onPress={openMessage}>…</ListBox.ItemButton>
 *   </Menu.Trigger>
 *   <Menu.Overlay />
 *   <Menu.Content>
 *     <Menu.Item onPress={reply}>
 *       <Menu.ItemTitle>répondre</Menu.ItemTitle>
 *     </Menu.Item>
 *     <Menu.Item variant="danger" onPress={remove}>
 *       <Menu.ItemTitle>supprimer</Menu.ItemTitle>
 *     </Menu.Item>
 *   </Menu.Content>
 * </Menu>
 * ```
 *
 * **The root renders no node.** It holds the open state, where the trigger was when the
 * menu opened and the styles the slots read. The page that recedes is the focused `Page`
 * (`@xaui/tram/page`); with none, the ground is only dimmed. `radius` is Native's and
 * draws nothing.
 */
export function MenuRoot({
  children,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  isDisabled = false,
}: MenuProps) {
  const theme = useXAUITheme()
  const isStill = useAnimationDisabled()
  const { stage } = useTramPages()

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [anchor, setAnchor] = useState<MenuAnchor | null>(null)
  const [isDismissable, setDismissable] = useState(true)
  const [backdrop] = useState(createNodeSlot)
  const holder = useRef<View>(null)
  const bounds = useRef<MenuRect | null>(null)
  const trigger = useRef<View>(null)
  const depth = useSharedValue(0)
  const offset = useSharedValue(CENTRED)

  const styles = menuRecipe.resolve({ theme, states: { disabled: isDisabled } })
  const danger = menuRecipe.resolve({ theme, selection: { tone: 'danger' } })
  const grey = menuRecipe.resolve({ theme, states: { disabled: true } })

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen])

  // Measured as it opens — the trigger, and the page it is on — and not before: the list
  // may have scrolled since the trigger last laid out.
  useEffect(() => {
    if (!isOpen) return

    let isCurrent = true
    setAnchor(null)
    measureAnchor(
      holder.current,
      bounds.current,
      stage.current,
      (rect, page, from) => {
        if (!isCurrent) return
        offset.value = from
        setAnchor({ rect, stage: page })
      }
    )

    return () => {
      isCurrent = false
    }
  }, [isOpen, stage, offset])

  // Back where it came from, once the menu is asked to go — not on the first render.
  const wasOpen = useRef(isOpen)
  useEffect(() => {
    if (wasOpen.current && !isOpen) moveFocusTo(trigger.current)
    wasOpen.current = isOpen
  }, [isOpen])

  const motion = useMemo(() => ({ depth, offset }), [depth, offset])

  const context = useMemo(() => {
    const title = {
      default: styles.itemTitle,
      danger: danger.itemTitle,
      grey: grey.itemTitle,
    }

    return {
      triggerStyle: styles.trigger,
      triggerLabelStyle: styles.triggerLabel,
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      labelStyle: styles.label,
      separatorStyle: styles.separator,
      groupStyle: styles.group,
      itemStyle: styles.item,
      itemTitleStyle: title,
      itemDescriptionStyle: styles.itemDescription,
      itemIndicatorStyle: styles.itemIndicator,
      glyph: {
        default: glyphOf(title.default),
        danger: glyphOf(title.danger),
        grey: glyphOf(title.grey),
      },
      isOpen,
      isDisabled,
      isStill,
      open,
      close,
      toggle,
      anchor,
      motion,
      isDismissable,
      setDismissable,
      backdrop,
      holder,
      bounds,
      trigger,
    }
  }, [
    styles,
    danger,
    grey,
    isOpen,
    isDisabled,
    isStill,
    open,
    close,
    toggle,
    anchor,
    motion,
    isDismissable,
    backdrop,
  ])

  return <MenuProvider value={context}>{children}</MenuProvider>
}

MenuRoot.displayName = 'XAUI.Tram.Menu.Root'

/** A glyph in a row is drawn at the size of the indicator's box, in the title's ink. */
function glyphOf(title: StyleProp<TextStyle>): IconContextValue {
  const { color } = StyleSheet.flatten<TextStyle>(title)

  return {
    size: MENU_INDICATOR,
    // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot hand to
    // a third-party component expecting a string.
    color: typeof color === 'string' ? color : undefined,
  }
}

type Measured = (
  rect: MenuRect,
  stage: TramPageStage | null,
  offset: MenuOffset
) => void

/**
 * Where the trigger is in the window, and how far the centre of the view around it is
 * from the page's — that view is what stays in front. The trigger is placed inside it
 * from its own layout rather than measured: measured, it would come back leaning under
 * the finger that just held it.
 *
 * With no trigger — a menu only ever opened by its state — the panel goes to the top; with
 * no focused `Page`, nothing recedes and the trigger has nothing to stay in front of.
 */
function measureAnchor(
  holder: View | null,
  bounds: MenuRect | null,
  stage: TramPageStage | null,
  done: Measured
) {
  if (!holder) {
    done(NOWHERE, null, CENTRED)
    return
  }

  holder.measureInWindow((x, y, width, height) => {
    const held = { x, y, width, height }
    const rect = bounds ? within(held, bounds) : held
    if (!stage) {
      done(rect, null, CENTRED)
      return
    }

    stage.measure(page => done(rect, stage, centreOffset(held, page)))
  })
}
