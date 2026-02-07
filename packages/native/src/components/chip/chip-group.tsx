import React from 'react'
import { View } from 'react-native'
import { styles } from './chip.style'
import type { ChipGroupProps } from './chip.type'
import { ChipGroupContext } from './chip-context'
import { useChipGroupSelection } from './chip-group.hook'

export const ChipGroup: React.FC<ChipGroupProps> = ({
  children,
  isSelectable = false,
  selectMode = 'single',
  variant = 'solid',
  themeColor = 'default',
  size = 'md',
  radius = 'full',
  isDisabled = false,
  selectedValues,
  defaultSelectedValues,
  onSelectionChange,
  spacing = 8,
  customAppearance,
}: ChipGroupProps) => {
  const { currentValues, onToggle } = useChipGroupSelection(
    selectMode,
    selectedValues,
    defaultSelectedValues,
    onSelectionChange,
  )

  const contextValue = React.useMemo(
    () => ({
      variant,
      themeColor,
      size,
      radius,
      isDisabled,
      isSelectable,
      selectMode,
      selectedValues: currentValues,
      onToggle,
    }),
    [
      variant,
      themeColor,
      size,
      radius,
      isDisabled,
      isSelectable,
      selectMode,
      currentValues,
      onToggle,
    ],
  )

  return (
    <ChipGroupContext.Provider value={contextValue}>
      <View
        style={[
          styles.groupContainer,
          { gap: spacing },
          customAppearance?.container,
        ]}
        accessible
      >
        {children}
      </View>
    </ChipGroupContext.Provider>
  )
}
