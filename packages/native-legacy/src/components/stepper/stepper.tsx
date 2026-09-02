import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import { StepperContext } from './stepper-context'
import { styles } from './stepper.style'
import type { StepperProps } from './stepper.type'

export const Stepper: React.FC<StepperProps> = ({
  children,
  direction = 'horizontal',
  showLines = true,
  lineDisplayMode = 'progress',
  activeKey,
  defaultActiveKey,
  onStepChange,
  themeColor = 'primary',
  size = 'md',
  isDisabled = false,
  style,
  customAppearance,
}) => {
  const items = React.Children.toArray(children)

  const keys = useMemo(
    () =>
      items
        .map(child => {
          if (!React.isValidElement<{ itemKey?: string }>(child)) return undefined
          return child.props.itemKey
        })
        .filter((key): key is string => typeof key === 'string'),
    [items]
  )

  const [internalActiveKey, setInternalActiveKey] = useState<string | undefined>(
    defaultActiveKey ?? keys[0]
  )

  const isControlled = typeof activeKey === 'string'
  const resolvedActiveKey = isControlled ? activeKey : internalActiveKey
  const activeIndex =
    resolvedActiveKey === undefined ? -1 : keys.indexOf(resolvedActiveKey)

  const handleStepChange = (key: string) => {
    if (!isControlled) {
      setInternalActiveKey(key)
    }

    onStepChange?.(key)
  }

  const contextValue = useMemo(
    () => ({
      activeKey: resolvedActiveKey,
      activeIndex,
      keys,
      direction,
      showLines,
      lineDisplayMode,
      isDisabled,
      themeColor,
      size,
      customAppearance,
      onStepChange: handleStepChange,
    }),
    [
      resolvedActiveKey,
      activeIndex,
      keys,
      direction,
      showLines,
      lineDisplayMode,
      isDisabled,
      themeColor,
      size,
      customAppearance,
    ]
  )

  return (
    <StepperContext.Provider value={contextValue}>
      <View
        style={[
          styles.container,
          direction === 'horizontal'
            ? styles.horizontalContainer
            : styles.verticalContainer,
          style,
          customAppearance?.container,
        ]}
      >
        {children}
      </View>
    </StepperContext.Provider>
  )
}
