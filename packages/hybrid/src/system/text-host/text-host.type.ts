import type {
  AriaRole,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
  SyntheticEvent,
} from 'react'

export type AccessibilityRole =
  | 'none'
  | 'button'
  | 'togglebutton'
  | 'link'
  | 'search'
  | 'image'
  | 'keyboardkey'
  | 'text'
  | 'adjustable'
  | 'imagebutton'
  | 'header'
  | 'summary'
  | 'alert'
  | 'checkbox'
  | 'combobox'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'scrollbar'
  | 'spinbutton'
  | 'switch'
  | 'tab'
  | 'tabbar'
  | 'tablist'
  | 'timer'
  | 'list'
  | 'toolbar'

export type AccessibilityState = {
  disabled?: boolean
  selected?: boolean
  checked?: boolean | 'mixed'
  busy?: boolean
  expanded?: boolean
}

export type AccessibilityValue = {
  min?: number
  max?: number
  now?: number
  text?: string
}

type PressEvent = MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>

/** Native-facing text host props whose values are translated at the DOM boundary. */
export type TextHostProps = {
  children?: ReactNode
  adjustsFontSizeToFit?: boolean
  dynamicTypeRamp?:
    | 'caption2'
    | 'caption1'
    | 'footnote'
    | 'subheadline'
    | 'callout'
    | 'body'
    | 'headline'
    | 'title3'
    | 'title2'
    | 'title1'
    | 'largeTitle'
  suppressHighlighting?: boolean
  lineBreakStrategyIOS?: 'none' | 'standard' | 'hangul-word' | 'push-out'
  disabled?: boolean
  selectable?: boolean
  selectionColor?: string
  textBreakStrategy?: 'simple' | 'highQuality' | 'balanced'
  dataDetectorType?: null | 'phoneNumber' | 'link' | 'email' | 'none' | 'all'
  android_hyphenationFrequency?: 'normal' | 'none' | 'full'
  allowFontScaling?: boolean
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
  lineBreakMode?: 'head' | 'middle' | 'tail' | 'clip'
  numberOfLines?: number
  id?: string
  nativeID?: string
  testID?: string
  onLayout?: (event: SyntheticEvent<HTMLElement>) => void
  onTextLayout?: (event: SyntheticEvent<HTMLElement>) => void
  onPress?: (event: PressEvent) => void
  onPressIn?: (event: PointerEvent<HTMLElement>) => void
  onPressOut?: (event: PointerEvent<HTMLElement>) => void
  onLongPress?: (event: PointerEvent<HTMLElement>) => void
  maxFontSizeMultiplier?: number | null
  minimumFontScale?: number
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only'
  pressRetentionOffset?: {
    top: number
    left: number
    bottom: number
    right: number
  }
  accessible?: boolean
  accessibilityActions?: ReadonlyArray<{ name: string; label?: string }>
  accessibilityLabel?: string
  'aria-label'?: string
  accessibilityRole?: AccessibilityRole
  accessibilityState?: AccessibilityState
  'aria-busy'?: boolean
  'aria-checked'?: boolean | 'mixed'
  'aria-disabled'?: boolean
  'aria-expanded'?: boolean
  'aria-selected'?: boolean
  accessibilityHint?: string
  accessibilityValue?: AccessibilityValue
  'aria-valuemax'?: number
  'aria-valuemin'?: number
  'aria-valuenow'?: number
  'aria-valuetext'?: string
  onAccessibilityAction?: (event: SyntheticEvent<HTMLElement>) => void
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants'
  'aria-hidden'?: boolean
  'aria-modal'?: boolean
  role?: AriaRole
  accessibilityLabelledBy?: string | string[]
  'aria-labelledby'?: string
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive'
  'aria-live'?: 'polite' | 'assertive' | 'off'
  screenReaderFocusable?: boolean
  accessibilityElementsHidden?: boolean
  accessibilityViewIsModal?: boolean
  onAccessibilityEscape?: () => void
  onAccessibilityTap?: () => void
  onMagicTap?: () => void
  accessibilityIgnoresInvertColors?: boolean
  accessibilityLanguage?: string
  accessibilityShowsLargeContentViewer?: boolean
  accessibilityLargeContentTitle?: string
  accessibilityRespondsToUserInteraction?: boolean
}
