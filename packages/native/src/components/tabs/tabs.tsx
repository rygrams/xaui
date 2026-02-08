import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Pressable,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import { runTabsCursorAnimation } from './tabs.animation'
import { useTabsSizeStyles, useTabsVariantStyles } from './tabs.hook'
import { styles } from './tabs.style'
import type { TabsItem, TabsProps } from './tabs.type'

type TabLayout = {
  x: number
  width: number
}

function isTabDisabled(
  item: TabsItem,
  disabledKeys: string[] | undefined,
  isDisabled: boolean
) {
  return (
    isDisabled ||
    item.isDisabled === true ||
    disabledKeys?.includes(item.key) === true
  )
}

function getFallbackKey(
  items: TabsItem[],
  disabledKeys: string[] | undefined,
  isDisabled: boolean
) {
  if (isDisabled) return ''

  const firstEnabled = items.find(item => !isTabDisabled(item, disabledKeys, false))
  return firstEnabled?.key ?? ''
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  selectedKey: controlledSelectedKey,
  defaultSelectedKey,
  onSelectionChange,
  disabledKeys,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  radius = 'full',
  fullWidth = false,
  isDisabled = false,
  disableAnimation = false,
  animationDuration = 220,
  renderTab,
  children,
  customAppearance,
}) => {
  const isControlled = controlledSelectedKey !== undefined
  const initialKey = useMemo(() => {
    if (defaultSelectedKey) return defaultSelectedKey
    return getFallbackKey(items, disabledKeys, isDisabled)
  }, [defaultSelectedKey, disabledKeys, isDisabled, items])

  const [internalSelectedKey, setInternalSelectedKey] = useState(initialKey)
  const [layouts, setLayouts] = useState<Record<string, TabLayout>>({})
  const [listWidth, setListWidth] = useState(0)

  const selectedKey =
    (isControlled ? controlledSelectedKey : internalSelectedKey) ?? ''
  const selectedItem = useMemo(
    () => items.find(item => item.key === selectedKey),
    [items, selectedKey]
  )

  const sizeStyles = useTabsSizeStyles(size)
  const variantStyles = useTabsVariantStyles(color, variant)
  const radiusStyles = useBorderRadiusStyles(radius)

  const cursorTranslateX = useRef(new Animated.Value(0)).current
  const cursorWidth = useRef(new Animated.Value(0)).current
  const cursorScaleX = useRef(new Animated.Value(1)).current
  const prevCursorLayout = useRef<TabLayout | null>(null)

  useEffect(() => {
    if (isControlled || selectedKey) return

    const nextFallback = getFallbackKey(items, disabledKeys, isDisabled)
    if (nextFallback && nextFallback !== selectedKey) {
      setInternalSelectedKey(nextFallback)
    }
  }, [disabledKeys, isControlled, isDisabled, items, selectedKey])

  useEffect(() => {
    if (!selectedKey) return

    const selectedLayout = layouts[selectedKey]
    if (!selectedLayout) return

    const from = prevCursorLayout.current
    prevCursorLayout.current = selectedLayout

    if (disableAnimation || !from) {
      cursorTranslateX.setValue(selectedLayout.x)
      cursorWidth.setValue(selectedLayout.width)
      cursorScaleX.setValue(1)
      return
    }

    runTabsCursorAnimation(
      cursorTranslateX,
      cursorWidth,
      cursorScaleX,
      selectedLayout.x,
      selectedLayout.width,
      animationDuration
    )
  }, [
    animationDuration,
    cursorTranslateX,
    cursorWidth,
    cursorScaleX,
    disableAnimation,
    layouts,
    selectedKey,
  ])

  const onTabLayout = useCallback(
    (key: string, event: LayoutChangeEvent) => {
      const nextLayout = event.nativeEvent.layout

      setLayouts(prev => {
        const current = prev[key]
        if (
          current &&
          current.x === nextLayout.x &&
          current.width === nextLayout.width
        ) {
          return prev
        }

        const isUnderlined = variant === 'underlined'
        const isBordered = variant === 'bordered'
        const isFirstTab = items[0]?.key === key

        let cursorWidth = nextLayout.width
        let cursorX = nextLayout.x

        if (isUnderlined) {
          cursorWidth = nextLayout.width * 0.8
          cursorX = nextLayout.x + (nextLayout.width - cursorWidth) / 2
        } else if (isBordered) {
          cursorWidth = nextLayout.width
          cursorX = nextLayout.x

          if (isFirstTab) {
            cursorWidth = nextLayout.width + variantStyles.listBorderWidth
            cursorX = Math.max(0, nextLayout.x - variantStyles.listBorderWidth)
          }

          if (listWidth > 0) {
            const maxWidth = Math.max(0, listWidth - cursorX)
            cursorWidth = Math.min(cursorWidth, maxWidth)
          }
        }

        return {
          ...prev,
          [key]: { x: cursorX, width: cursorWidth },
        }
      })
    },
    [items, listWidth, setLayouts, variant, variantStyles.listBorderWidth]
  )

  const handleTabPress = useCallback(
    (item: TabsItem) => {
      if (isTabDisabled(item, disabledKeys, isDisabled)) return

      if (!isControlled) {
        setInternalSelectedKey(item.key)
      }

      onSelectionChange?.(item.key)
    },
    [disabledKeys, isControlled, isDisabled, onSelectionChange]
  )

  const shouldShowCursor =
    !!selectedKey && !!layouts[selectedKey] && !isDisabled && items.length > 0

  return (
    <View style={[styles.container, customAppearance?.container]}>
      <View
        onLayout={event => setListWidth(event.nativeEvent.layout.width)}
        style={[
          styles.list,
          {
            borderRadius: radiusStyles.borderRadius,
            backgroundColor: variantStyles.listBackgroundColor,
            borderColor: variantStyles.listBorderColor,
            borderWidth: variantStyles.listBorderWidth,
            borderBottomWidth:
              variant === 'underlined'
                ? (variantStyles.cursorHeight ?? 2)
                : variantStyles.listBorderWidth,
            paddingHorizontal: variantStyles.listPaddingHorizontal,
            ...(variant === 'bordered' && { overflow: 'hidden' }),
          },
          fullWidth && styles.fullWidth,
          customAppearance?.list,
        ]}
      >
        {shouldShowCursor && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.cursor,
              {
                bottom: variantStyles.cursorBottom,
                borderRadius:
                  variant === 'underlined'
                    ? 0
                    : Math.max(
                        0,
                        (radiusStyles.borderRadius as number) -
                          variantStyles.listBorderWidth
                      ),
                width: cursorWidth,
                backgroundColor: variantStyles.cursorColor,
                transform: [
                  { translateX: cursorTranslateX },
                  { scaleX: cursorScaleX },
                ],
                ...(variantStyles.cursorTop !== undefined && {
                  top: variantStyles.cursorTop,
                }),
                ...(variantStyles.cursorHeight !== undefined && {
                  height: variantStyles.cursorHeight,
                }),
                ...(variantStyles.cursorShadow && {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  elevation: 2,
                }),
              },
              customAppearance?.cursor,
            ]}
          />
        )}

        {items.map(item => {
          const isSelected = selectedKey === item.key
          const disabled = isTabDisabled(item, disabledKeys, isDisabled)

          return (
            <Pressable
              key={item.key}
              onLayout={event => onTabLayout(item.key, event)}
              onPress={() => handleTabPress(item)}
              disabled={disabled}
              style={[styles.tabPressable, disabled && styles.disabled]}
            >
              <View
                style={[
                  styles.tab,
                  {
                    minHeight: sizeStyles.minHeight,
                    paddingHorizontal: sizeStyles.paddingHorizontal,
                    paddingVertical: sizeStyles.paddingVertical,
                  },
                  customAppearance?.tab,
                  isSelected && customAppearance?.selectedTab,
                ]}
              >
                {renderTab ? (
                  renderTab(item, { isSelected, isDisabled: disabled })
                ) : (
                  <>
                    {item.startContent}
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.text,
                        {
                          color: isSelected
                            ? variantStyles.selectedTextColor
                            : variantStyles.textColor,
                          fontSize: sizeStyles.fontSize,
                        },
                        customAppearance?.text,
                        isSelected && customAppearance?.selectedText,
                      ]}
                    >
                      {item.title}
                    </Text>
                    {item.endContent}
                  </>
                )}
              </View>
            </Pressable>
          )
        })}
      </View>

      {children !== undefined && (
        <View style={[styles.content, customAppearance?.content]}>
          {typeof children === 'function'
            ? children({ selectedKey, selectedItem })
            : children}
        </View>
      )}
    </View>
  )
}
