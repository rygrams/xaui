import { forwardRef } from 'react'
import type { View } from 'react-native'
import { SnackbarAction } from './snackbar-action'
import type { SnackbarCloseProps } from './snackbar.type'

export const SnackbarClose = forwardRef<View, SnackbarCloseProps>(
  function SnackbarClose(props, ref) {
    return <SnackbarAction ref={ref} {...props} isCloseOnPress />
  }
)
SnackbarClose.displayName = 'XAUI.Snackbar.Close'
