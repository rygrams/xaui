import React, { Children } from 'react'
import { View } from 'react-native'
import { useXUITheme } from '../../core'
import { styles } from './list.style'

export const ListDivider: React.FC = () => {
  const theme = useXUITheme()

  return (
    <View
      style={[styles.divider, { backgroundColor: theme.colors.foreground + '30' }]}
    />
  )
}

export const ListChildren: React.FC<{
  children: React.ReactNode
  showDivider: boolean
}> = ({ children, showDivider }) => {
  if (!showDivider) {
    return <>{children}</>
  }

  const childArray = Children.toArray(children)

  return (
    <>
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < childArray.length - 1 && <ListDivider />}
        </React.Fragment>
      ))}
    </>
  )
}
