import React from 'react'
import { Text, View } from 'react-native'
import { useXUITheme } from '../../core'
import type { AvatarGroupProps, AvatarProps } from './avatar.type'
import { Avatar } from './avatar'
import { resolveAvatarSize } from './avatar.hook'
import { styles } from './avatar.style'

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  total,
  size = 'md',
  radius = 'full',
  themeColor = 'default',
  isBordered = false,
  isDisabled = false,
  isGrid = false,
  renderCount,
  style,
}: AvatarGroupProps) => {
  const theme = useXUITheme()
  const resolvedSize = resolveAvatarSize(size)
  const spacing = theme.spacing.xs
  const overlap = Math.round(resolvedSize * 0.28)

  const allChildren = React.Children.toArray(children).filter(child =>
    React.isValidElement(child)
  ) as React.ReactElement<AvatarProps>[]

  const totalCount = total ?? allChildren.length
  const maxCount = max ?? totalCount
  const visibleChildren = allChildren.slice(0, maxCount)
  const remaining = Math.max(0, totalCount - maxCount)

  const enhanced = visibleChildren.map((child, index) => {
    const childProps = child.props as AvatarProps
    return (
      <View
        key={child.key ?? index}
        style={
          isGrid
            ? { marginRight: spacing, marginBottom: spacing }
            : { marginLeft: index === 0 ? 0 : -overlap, zIndex: index }
        }
      >
        {React.cloneElement(child, {
          size: childProps.size ?? size,
          radius: childProps.radius ?? radius,
          themeColor: childProps.themeColor ?? themeColor,
          isBordered: childProps.isBordered ?? isBordered,
          isDisabled: childProps.isDisabled ?? isDisabled,
        })}
      </View>
    )
  })

  const countNode =
    remaining > 0
      ? renderCount?.(remaining) ?? (
          <Avatar
            name={`+${remaining}`}
            showFallback
            size={size}
            radius={radius}
            themeColor={themeColor}
            isBordered={isBordered}
            isDisabled={isDisabled}
            fallback={
              <Text
                style={{
                  color: theme.colors.foreground,
                  fontSize: Math.max(10, Math.round(resolvedSize * 0.35)),
                  fontWeight: '600',
                }}
              >
                +{remaining}
              </Text>
            }
          />
        )
      : null

  if (countNode) {
    enhanced.push(
      <View
        key="avatar-count"
        style={
          isGrid
            ? { marginRight: spacing, marginBottom: spacing }
            : {
                marginLeft: enhanced.length === 0 ? 0 : -overlap,
                zIndex: enhanced.length,
              }
        }
      >
        {countNode}
      </View>
    )
  }

  return (
    <View
      style={[isGrid ? styles.grid : styles.group, style]}
      accessible
    >
      {enhanced}
    </View>
  )
}
