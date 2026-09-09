import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext } from '../../system/icon'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListActionProps } from './list.type'

export const ListAction = forwardRef<View, ListActionProps>(function ListAction(
  { children, style, ...props },
  ref
) {
  const { actionStyle, actionIcon } = useList()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <IconContext.Provider value={actionIcon}>
      <View ref={ref} {...rest} style={[actionStyle, styleProps, style]}>
        {children}
      </View>
    </IconContext.Provider>
  )
})

ListAction.displayName = 'XAUI.List.Action'
