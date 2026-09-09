import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext } from '../../system/icon'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListLeadingProps } from './list.type'

export const ListLeading = forwardRef<View, ListLeadingProps>(function ListLeading(
  { children, style, ...props },
  ref
) {
  const { leadingStyle, leadingIcon } = useList()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <IconContext.Provider value={leadingIcon}>
      <View ref={ref} {...rest} style={[leadingStyle, styleProps, style]}>
        {children}
      </View>
    </IconContext.Provider>
  )
})

ListLeading.displayName = 'XAUI.List.Leading'
