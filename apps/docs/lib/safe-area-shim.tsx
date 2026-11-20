import type { ReactNode } from 'react'
import { View } from 'react-native'
import type { ViewProps } from 'react-native'

/**
 * `react-native-safe-area-context` in the docs' previews. Its web build still reaches
 * React Native's codegen through a deep import the `react-native-web` alias cannot catch,
 * and the device frame has no notch or home indicator to keep clear of: every inset is 0.
 * Only the demo screens import it — the libraries take the app's hook as a prop.
 */
const NO_INSETS = { top: 0, right: 0, bottom: 0, left: 0 }
const WINDOW_FRAME = { x: 0, y: 0, width: 390, height: 844 }

export const initialWindowMetrics = { insets: NO_INSETS, frame: WINDOW_FRAME }

export function useSafeAreaInsets() {
  return NO_INSETS
}

export function useSafeAreaFrame() {
  return WINDOW_FRAME
}

export function SafeAreaProvider({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

export function SafeAreaView(props: ViewProps) {
  return <View {...props} />
}
