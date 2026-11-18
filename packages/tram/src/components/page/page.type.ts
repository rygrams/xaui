import type { ReactNode } from 'react'
import type { ViewProps } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { TramPageTransition } from '../../theme/tram-pages'

export type PageSlot = 'root'

type PageOwnProps = {
  /** This page's own way in and out, over the one `TramProvider` was given. */
  transition?: TramPageTransition
  children?: ReactNode
}

export type PageProps = PageOwnProps &
  Omit<ViewProps, keyof PageOwnProps> &
  Omit<ViewStyleProps, keyof PageOwnProps | keyof ViewProps>
