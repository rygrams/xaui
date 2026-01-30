import { useCallback, useEffect, useRef, useState } from 'react'
import type { LayoutChangeEvent, View } from 'react-native'
import type { SelectSelectionMode } from './select.type'

type TriggerPosition = {
  x: number
  y: number
  height: number
  width: number
}

type SelectOpenConfig = {
  isOpened?: boolean
  isDisabled: boolean
  onOpenChange?: (isOpen: boolean) => void
  onClose?: () => void
}

type SelectSelectionConfig = {
  selectionMode: SelectSelectionMode
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  onClear?: () => void
}

export const useSelectOpenState = ({
  isOpened,
  isDisabled,
  onOpenChange,
  onClose,
}: SelectOpenConfig) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = isOpened ?? internalOpen

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen && isDisabled) {
        return
      }

      if (isOpened === undefined) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)

      if (!nextOpen) {
        onClose?.()
      }
    },
    [isDisabled, isOpened, onOpenChange, onClose]
  )

  return { isOpen, setOpen }
}

export const useSelectSelection = ({
  selectionMode,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  onClear,
}: SelectSelectionConfig) => {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState(
    defaultSelectedKeys ?? []
  )

  const isControlledSelection = selectedKeys !== undefined
  const currentSelectedKeys = isControlledSelection
    ? (selectedKeys ?? [])
    : internalSelectedKeys

  const updateSelection = useCallback(
    (nextKeys: string[]) => {
      if (!isControlledSelection) {
        setInternalSelectedKeys(nextKeys)
      }

      onSelectionChange?.(nextKeys)

      if (nextKeys.length === 0) {
        onClear?.()
      }
    },
    [isControlledSelection, onSelectionChange, onClear]
  )

  const getNextSelection = useCallback(
    (key: string) => {
      const isAlreadySelected = currentSelectedKeys.includes(key)

      if (selectionMode === 'multiple') {
        return isAlreadySelected
          ? currentSelectedKeys.filter(existingKey => existingKey !== key)
          : [...currentSelectedKeys, key]
      }

      if (!isAlreadySelected) {
        return [key]
      }

      return currentSelectedKeys
    },
    [currentSelectedKeys, selectionMode]
  )

  return { currentSelectedKeys, updateSelection, getNextSelection }
}

export const useSelectTriggerMeasurements = (isOpen: boolean) => {
  const triggerRef = useRef<View>(null)
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null)
  const [triggerPosition, setTriggerPosition] = useState<TriggerPosition | null>(null)

  const handleTriggerLayout = useCallback((event: LayoutChangeEvent) => {
    setTriggerWidth(event.nativeEvent.layout.width)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const measureTrigger = () => {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerPosition({ x, y, width, height })
      })
    }

    const frameId = globalThis.setTimeout(measureTrigger, 0)

    return () => globalThis.clearTimeout(frameId)
  }, [isOpen])

  return { triggerRef, triggerWidth, triggerPosition, handleTriggerLayout }
}
