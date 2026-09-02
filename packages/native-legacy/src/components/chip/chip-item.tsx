import React, { useContext } from 'react'
import { ChipGroupContext } from './chip-context'
import { Chip } from './chip'
import type { ChipItemProps, ChipVariant } from './chip.type'

function getSelectableVariant(
  baseVariant: ChipVariant,
  isSelected: boolean
): ChipVariant {
  if (isSelected) {
    return baseVariant
  }
  if (baseVariant === 'solid' || baseVariant === 'shadow') {
    return 'bordered'
  }
  return 'light'
}

export const ChipItem: React.FC<ChipItemProps> = ({
  value,
  children,
  variant,
  themeColor,
  avatar,
  startContent,
  endContent,
  isDisabled,
  customAppearance,
}: ChipItemProps) => {
  const groupContext = useContext(ChipGroupContext)

  if (!groupContext) {
    return null
  }

  const resolvedVariant = variant ?? groupContext.variant
  const resolvedColor = themeColor ?? groupContext.themeColor
  const resolvedDisabled = isDisabled ?? groupContext.isDisabled
  const isSelected = groupContext.selectedValues.includes(value)

  const chipVariant = groupContext.isSelectable
    ? getSelectableVariant(resolvedVariant, isSelected)
    : resolvedVariant

  const handlePress = groupContext.isSelectable
    ? () => groupContext.onToggle(value)
    : undefined

  return (
    <Chip
      variant={chipVariant}
      themeColor={resolvedColor}
      size={groupContext.size}
      radius={groupContext.radius}
      isDisabled={resolvedDisabled}
      avatar={avatar}
      startContent={startContent}
      endContent={endContent}
      customAppearance={customAppearance}
      onPress={handlePress}
    >
      {children}
    </Chip>
  )
}
