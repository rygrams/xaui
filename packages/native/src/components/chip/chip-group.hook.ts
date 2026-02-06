import { useCallback, useMemo, useState } from 'react'
import type { ChipSelectMode } from './chip.type'

export function useChipGroupSelection(
  selectMode: ChipSelectMode,
  selectedValues?: string[],
  defaultSelectedValues?: string[],
  onSelectionChange?: (values: string[]) => void,
) {
  const [internalValues, setInternalValues] = useState<string[]>(
    defaultSelectedValues ?? [],
  )

  const isControlled = selectedValues !== undefined
  const currentValues = isControlled ? selectedValues : internalValues

  const onToggle = useCallback(
    (value: string) => {
      const isSelected = currentValues.includes(value)

      let nextValues: string[]

      if (selectMode === 'single') {
        nextValues = isSelected ? [] : [value]
      } else {
        nextValues = isSelected
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value]
      }

      if (!isControlled) {
        setInternalValues(nextValues)
      }
      onSelectionChange?.(nextValues)
    },
    [currentValues, isControlled, onSelectionChange, selectMode],
  )

  return useMemo(
    () => ({ currentValues, onToggle }),
    [currentValues, onToggle],
  )
}
