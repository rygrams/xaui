import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useToolbarColors, useToolbarVariantStyles } from './toolbar.hook'
import { styles } from './toolbar.style'
import { ToolbarContext } from './toolbar-context'
import type { ToolbarProps } from './toolbar.type'

export const Toolbar: React.FC<ToolbarProps> = ({
  title,
  subtitle,
  variant = 'small',
  position = 'relative',
  isVisible = true,
  themeColor = 'primary',
  navigationIcon,
  onNavigationPress,
  navigationAccessibilityLabel,
  showDivider = true,
  isElevated = false,
  children,
  style,
  customAppearance,
}: ToolbarProps) => {
  const variantStyles = useToolbarVariantStyles(variant)
  const colors = useToolbarColors(themeColor)

  if (!isVisible) return null

  const isTwoRows = variant === 'medium' || variant === 'large'

  const renderText = (
    content: React.ReactNode,
    textStyle: React.ComponentProps<typeof Text>['style']
  ) => {
    if (typeof content === 'string' || typeof content === 'number') {
      return <Text style={textStyle}>{content}</Text>
    }

    return content
  }

  const positionStyle =
    position === 'absolute-top'
      ? styles.absoluteTop
      : position === 'absolute-bottom'
        ? styles.absoluteBottom
        : null

  return (
    <ToolbarContext.Provider
      value={{
        actionColor: colors.action,
        actionPressedColor: colors.pressed,
        actionSize: variantStyles.iconSize,
      }}
    >
      <View
        style={[
          styles.container,
          {
            minHeight: variantStyles.containerMinHeight,
            backgroundColor: colors.background,
            borderBottomColor: showDivider ? colors.divider : 'transparent',
            borderBottomWidth: showDivider ? 1 : 0,
          },
          isElevated && [styles.elevated, { shadowColor: colors.shadow }],
          positionStyle,
          style,
          customAppearance?.container,
        ]}
      >
        <View
          style={[
            styles.topRow,
            {
              minHeight: variantStyles.topRowMinHeight,
            },
            customAppearance?.topRow,
          ]}
        >
          <View style={styles.navSlot}>
            {navigationIcon ? (
              <Pressable
                onPress={onNavigationPress}
                accessibilityRole="button"
                accessibilityLabel={navigationAccessibilityLabel}
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    width: variantStyles.actionSize,
                    height: variantStyles.actionSize,
                    backgroundColor: pressed ? colors.pressed : 'transparent',
                  },
                  customAppearance?.navigationButton,
                ]}
              >
                {navigationIcon}
              </Pressable>
            ) : null}
          </View>

          {!isTwoRows && (
            <View style={styles.titleSlot}>
              {renderText(title, [
                styles.title,
                {
                  fontSize: variantStyles.titleSize,
                  color: colors.title,
                  fontWeight: variantStyles.headlineWeight,
                  textAlign: variantStyles.centeredTitle ? 'center' : 'left',
                },
                variantStyles.centeredTitle && styles.centeredTitle,
                customAppearance?.title,
              ])}

              {subtitle
                ? renderText(subtitle, [
                    styles.subtitle,
                    {
                      fontSize: variantStyles.subtitleSize,
                      color: colors.subtitle,
                      textAlign: variantStyles.centeredTitle ? 'center' : 'left',
                    },
                    customAppearance?.subtitle,
                  ])
                : null}
            </View>
          )}

          <View style={[styles.actions, customAppearance?.actionsContainer]}>
            {children}
          </View>
        </View>

        {isTwoRows && (
          <View
            style={[
              styles.headlineContainer,
              {
                paddingBottom: variantStyles.headlinePaddingBottom,
              },
              customAppearance?.headlineContainer,
            ]}
          >
            {renderText(title, [
              styles.title,
              {
                fontSize: variantStyles.titleSize,
                color: colors.title,
                fontWeight: variantStyles.headlineWeight,
              },
              customAppearance?.title,
            ])}

            {subtitle
              ? renderText(subtitle, [
                  styles.subtitle,
                  {
                    fontSize: variantStyles.subtitleSize,
                    color: colors.subtitle,
                  },
                  customAppearance?.subtitle,
                ])
              : null}
          </View>
        )}
      </View>
    </ToolbarContext.Provider>
  )
}
