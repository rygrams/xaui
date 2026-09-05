import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type TabsSlot =
  | 'root'
  | 'list'
  | 'trigger'
  | 'label'
  | 'indicator'
  | 'content'

/**
 * Two shapes, not two emphases. `primary` is the segmented control — a pill sliding under
 * the chosen tab inside a filled track; `secondary` is the underline, a rule moving along
 * the bottom edge. They are different affordances rather than the same one louder, which
 * is why the union is two rather than the usual four.
 */
export type TabsVariant = 'primary' | 'secondary'

export type TabsSize = Exclude<Size, 'xs'>

/** Where a trigger sits, so the indicator knows where to slide. */
export type TabRect = { x: number; width: number }

type TabsOwnProps = {
  children?: ReactNode
  variant?: TabsVariant
  size?: TabsSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. */
  color?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  isDisabled?: boolean
}

export type TabsProps = TabsOwnProps &
  Omit<ViewProps, keyof TabsOwnProps> &
  Omit<ViewStyleProps, keyof TabsOwnProps | keyof ViewProps>

type TabsListOwnProps = { children?: ReactNode }

export type TabsListProps = TabsListOwnProps &
  Omit<ViewProps, keyof TabsListOwnProps> &
  Omit<ViewStyleProps, keyof TabsListOwnProps | keyof ViewProps>

/** What a trigger's render function is handed. */
export type TabsTriggerRenderState = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}

type TabsTriggerOwnProps = {
  value: string
  isDisabled?: boolean
  children?: ReactNode | ((state: TabsTriggerRenderState) => ReactNode)
  asChild?: boolean
}

export type TabsTriggerProps = TabsTriggerOwnProps &
  Omit<PressableProps, keyof TabsTriggerOwnProps> &
  Omit<ViewStyleProps, keyof TabsTriggerOwnProps | keyof PressableProps>

type TabsLabelOwnProps = { children?: ReactNode }

export type TabsLabelProps = TabsLabelOwnProps &
  Omit<TextProps, keyof TabsLabelOwnProps> &
  Omit<TextStyleProps, keyof TabsLabelOwnProps | keyof TextProps>

/** The indicator takes no props of its own — where it goes is the root's business. */
export type TabsIndicatorProps = Omit<ViewProps, 'children'> & ViewStyleProps

type TabsContentOwnProps = { value: string; children?: ReactNode }

export type TabsContentProps = TabsContentOwnProps &
  Omit<ViewProps, keyof TabsContentOwnProps> &
  Omit<ViewStyleProps, keyof TabsContentOwnProps | keyof ViewProps>

/** R5 — resolved style ids and the state the slots read. */
export type TabsContextValue = {
  listStyle: StyleProp<ViewStyle>
  triggerStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  labelSelectedStyle: StyleProp<TextStyle>
  indicatorStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  variant: TabsVariant
  value: string | undefined
  isDisabled: boolean
  select: (value: string) => void
  /** Every trigger's measured rectangle, keyed by value. The indicator reads one. */
  rects: Readonly<Record<string, TabRect>>
  setRect: (value: string, rect: TabRect) => void
}

/** One trigger's own state, for the label inside it. */
export type TabsTriggerContextValue = TabsTriggerRenderState
