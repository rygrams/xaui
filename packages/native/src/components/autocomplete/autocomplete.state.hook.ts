import { useCallback, useEffect, useRef, useState } from 'react'
import type { LayoutRectangle } from 'react-native'
import type { View } from 'react-native'

type UseAutocompleteOpenStateProps = {
  isOpened?: boolean
  isDisabled: boolean
  onOpenChange?: (isOpen: boolean) => void
  onClose?: () => void
}

export const useAutocompleteOpenState = ({
  isOpened,
  isDisabled,
  onOpenChange,
  onClose,
}: UseAutocompleteOpenStateProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = isOpened !== undefined ? isOpened : internalIsOpen

  const setOpen = useCallback(
    (open: boolean) => {
      if (isDisabled) {
        return
      }

      if (isOpened === undefined) {
        setInternalIsOpen(open)
      }

      onOpenChange?.(open)

      if (!open) {
        onClose?.()
      }
    },
    [isDisabled, isOpened, onOpenChange, onClose]
  )

  return { isOpen, setOpen }
}

type UseAutocompleteInputStateProps = {
  inputValue?: string
  defaultInputValue?: string
  selectedKey: string | null
  onInputChange?: (value: string) => void
}

export const useAutocompleteInputState = ({
  inputValue,
  defaultInputValue,
  selectedKey,
  onInputChange,
}: UseAutocompleteInputStateProps) => {
  const [internalInputValue, setInternalInputValue] = useState(defaultInputValue ?? '')
  const currentInputValue = inputValue !== undefined ? inputValue : internalInputValue

  const updateInputValue = useCallback(
    (value: string) => {
      if (inputValue === undefined) {
        setInternalInputValue(value)
      }

      onInputChange?.(value)
    },
    [inputValue, onInputChange]
  )

  useEffect(() => {
    if (selectedKey === null && inputValue === undefined) {
      setInternalInputValue('')
    }
  }, [selectedKey, inputValue])

  return { currentInputValue, updateInputValue }
}

type UseAutocompleteSelectionProps = {
  onSelectionChange?: (key: string | null) => void
}

export const useAutocompleteSelection = ({
  onSelectionChange,
}: UseAutocompleteSelectionProps) => {
  const [currentSelectedKey, setCurrentSelectedKey] = useState<string | null>(null)

  const updateSelection = useCallback(
    (key: string | null) => {
      setCurrentSelectedKey(key)

      onSelectionChange?.(key)
    },
    [onSelectionChange]
  )

  return { currentSelectedKey, updateSelection }
}

export const useAutocompleteTriggerMeasurements = () => {
  const triggerRef = useRef<View | null>(null)
  const [triggerWidth, setTriggerWidth] = useState<number>()
  const [triggerHeight, setTriggerHeight] = useState<number>()

  const handleTriggerLayout = useCallback((event: { nativeEvent: { layout: LayoutRectangle } }) => {
    setTriggerWidth(event.nativeEvent.layout.width)
    setTriggerHeight(event.nativeEvent.layout.height)
  }, [])

  return { triggerRef, triggerWidth, triggerHeight, handleTriggerLayout }
}
