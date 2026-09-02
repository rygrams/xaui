import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { styles } from './segment-button.style'
import { useSegmentVariantStyles } from './segment-button.hook'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import { SegmentButtonContext } from './segment-button-context'
import type { SegmentButtonProps } from './segment-button.type'
import type { SegmentButtonContextValue } from './segment-button-context'

export const SegmentButton: React.FC<SegmentButtonProps> = ({
  children,
  selected: controlledSelected,
  defaultSelected,
  onSelectionChange,
  selectionMode = 'single',
  themeColor = 'primary',
  variant = 'outlined',
  size = 'md',
  radius = 'full',
  fullWidth = false,
  isDisabled = false,
  showCheckmark = true,
  elevation = 0,
  customAppearance,
}) => {
  const isControlled = controlledSelected !== undefined
  const [internalSelected, setInternalSelected] = useState<string | string[]>(
    () => defaultSelected ?? ''
  )

  const selected = isControlled ? controlledSelected : internalSelected

  const selectedKeys = useMemo(() => {
    if (Array.isArray(selected)) return selected
    return selected ? [selected] : []
  }, [selected])

  const variantStyles = useSegmentVariantStyles(themeColor, variant, elevation)
  const radiusStyles = useBorderRadiusStyles(radius)

  const toggleItem = useCallback(
    (key: string) => {
      let nextSelected: string | string[]

      if (selectionMode === 'single') {
        nextSelected = key
      } else {
        const isCurrentlySelected = selectedKeys.includes(key)

        if (isCurrentlySelected && selectedKeys.length > 1) {
          nextSelected = selectedKeys.filter(k => k !== key)
        } else if (!isCurrentlySelected) {
          nextSelected = [...selectedKeys, key]
        } else {
          return
        }
      }

      if (!isControlled) {
        setInternalSelected(nextSelected)
      }
      onSelectionChange?.(nextSelected)
    },
    [selectionMode, selectedKeys, onSelectionChange, isControlled]
  )

  const contextValue: SegmentButtonContextValue = useMemo(
    () => ({
      selectedKeys,
      toggleItem,
      themeColor,
      variant,
      size,
      elevation,
      isDisabled,
      showCheckmark,
    }),
    [
      selectedKeys,
      toggleItem,
      themeColor,
      variant,
      size,
      elevation,
      isDisabled,
      showCheckmark,
    ]
  )

  const showDivider = variant === 'outlined' || variant === 'faded'
  const childrenArray = React.Children.toArray(children)
  const getItemKey = (child: React.ReactNode): React.Key | undefined => {
    if (!React.isValidElement<{ itemKey?: React.Key }>(child)) {
      return undefined
    }
    return child.props.itemKey
  }

  return (
    <SegmentButtonContext.Provider value={contextValue}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: variantStyles.containerBackground,
            borderWidth: variantStyles.containerBorderWidth,
            borderColor: variantStyles.containerBorderColor,
            borderRadius: radiusStyles.borderRadius,
            ...(variantStyles.containerShadow as Record<string, unknown>),
          },
          fullWidth && styles.fullWidth,
          customAppearance?.container,
        ]}
      >
        {childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1
          const childItemKey = getItemKey(child)
          const childKey = childItemKey ?? index

          const isSelected = selectedKeys.includes(String(childKey))
          const nextChildKey = !isLast
            ? getItemKey(childrenArray[index + 1])
            : undefined
          const nextSelected = nextChildKey
            ? selectedKeys.includes(String(nextChildKey))
            : false

          return (
            <React.Fragment key={childKey}>
              {child}
              {showDivider && !isLast && !isSelected && !nextSelected && (
                <View
                  style={[
                    styles.divider,
                    {
                      backgroundColor: variantStyles.containerBorderColor,
                    },
                  ]}
                />
              )}
            </React.Fragment>
          )
        })}
      </View>
    </SegmentButtonContext.Provider>
  )
}
