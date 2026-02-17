import React from 'react'
import { Pressable, Text, View, NativeModules } from 'react-native'
import { CopyIcon } from '@xaui/icons'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import { styles } from './snippet.style'
import { useCopyButtonPositionStyles, useSnippetColors } from './snippet.hook'
import type { SnippetProps } from './snippet.type'

const copyText = async (text: string): Promise<boolean> => {
  const runtime = globalThis as {
    navigator?: {
      clipboard?: {
        writeText: (value: string) => Promise<void>
      }
    }
  }

  const writeText = runtime.navigator?.clipboard?.writeText

  if (typeof writeText === 'function') {
    await writeText(text)
    return true
  }

  const modules = NativeModules as {
    RNCClipboard?: { setString?: (value: string) => void }
    Clipboard?: { setString?: (value: string) => void }
  }

  const setString = modules.RNCClipboard?.setString ?? modules.Clipboard?.setString

  if (typeof setString === 'function') {
    setString(text)
    return true
  }

  return false
}

export const Snippet: React.FC<SnippetProps> = ({
  value,
  themeColor = 'primary',
  variant = 'outlined',
  radius = 'md',
  copyButtonPosition = 'top-right',
  copyLabel = 'Copy',
  copiedLabel = 'Copied',
  copyResetDelay = 1500,
  fullWidth = true,
  isDisabled = false,
  numberOfLines,
  fontSize = 14,
  fontWeight = '400',
  onCopy,
  customAppearance,
}: SnippetProps) => {
  const [isCopied, setIsCopied] = React.useState(false)
  const resetTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const radiusStyles = useBorderRadiusStyles(radius)
  const colors = useSnippetColors(themeColor, variant, isDisabled)
  const { isTop, isLeft } = useCopyButtonPositionStyles(copyButtonPosition)

  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const handleCopy = React.useCallback(async () => {
    if (isDisabled) {
      return
    }

    let isSuccess = false

    try {
      isSuccess = await copyText(value)
      setIsCopied(isSuccess)
    } catch {
      setIsCopied(false)
    }

    onCopy?.(value, isSuccess)

    if (!isSuccess) {
      return
    }

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
    }

    resetTimerRef.current = setTimeout(() => {
      setIsCopied(false)
    }, copyResetDelay)
  }, [copyResetDelay, isDisabled, onCopy, value])

  return (
    <View
      style={[
        styles.container,
        !fullWidth && styles.noFullWidth,
        isDisabled && styles.disabled,
        customAppearance?.container,
      ]}
    >
      <View
        style={[
          styles.snippet,
          radiusStyles,
          {
            backgroundColor: colors.containerBackground,
            borderColor: colors.containerBorder,
          },
        ]}
      >
        <Pressable
          onPress={handleCopy}
          accessibilityRole="button"
          accessibilityLabel={isCopied ? copiedLabel : copyLabel}
          disabled={isDisabled}
          style={[
            styles.copyButton,
            radiusStyles,
            isTop ? styles.top : styles.bottom,
            isLeft ? styles.left : styles.right,
            {
              backgroundColor: colors.copyButtonBackground,
              borderColor: colors.copyButtonBorder,
            },
            customAppearance?.copyButton,
          ]}
        >
          <CopyIcon size={14} color={colors.copyButtonText} />
          <Text
            style={[
              styles.copyButtonText,
              { color: colors.copyButtonText },
              customAppearance?.copyButtonText,
            ]}
          >
            {isCopied ? copiedLabel : copyLabel}
          </Text>
        </Pressable>

        <View
          style={[
            styles.content,
            isTop ? styles.topInset : styles.bottomInset,
            customAppearance?.content,
          ]}
        >
          <Text
            selectable
            numberOfLines={numberOfLines}
            style={[
              styles.text,
              {
                color: colors.text,
                fontSize,
                lineHeight: Math.round(fontSize * 1.45),
                fontWeight,
              },
              customAppearance?.text,
            ]}
          >
            {value}
          </Text>
        </View>
      </View>
    </View>
  )
}
