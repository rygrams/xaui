import { useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import type { ButtonSize, ButtonVariant } from '@xaui/native/button'
import { useXAUITheme } from '@xaui/native/theme'
import { DemoCard, DemoFrame } from './demo-frame'
import { CheckIcon } from './icons'

const VARIANTS: ButtonVariant[] = [
  'primary',
  'secondary',
  'default',
  'tertiary',
  'ghost',
  'danger',
  'danger-soft',
]

const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg']

const TINTS = [
  { name: 'accent', hex: undefined },
  { name: 'violet', hex: '#7c3aed' },
  { name: 'emerald', hex: '#059669' },
  { name: 'orange', hex: '#ea580c' },
  { name: 'pink', hex: '#db2777' },
] as const

export type PlaygroundProp = 'variant' | 'size' | 'color'

/**
 * The preview with its selector: one button on stage, and the prop it is showing switched
 * from the row under it. The row is made of buttons too, so the selector is the component
 * demonstrating itself.
 */
export function PlaygroundScreen({ prop }: { prop: PlaygroundProp }) {
  const [variant, setVariant] = useState<ButtonVariant>('primary')
  const [size, setSize] = useState<ButtonSize>('md')
  const [tint, setTint] = useState<string | undefined>(undefined)

  return (
    <DemoFrame
      title="Brewline Pro"
      subtitle="Free delivery, early access, 10% off every order"
    >
      <DemoCard>
        <Perk text="Free delivery on orders over $10" />
        <Perk text="First sip of every seasonal drink" />
        <Perk text="10% off beans, forever" />
        <Button
          testID="stage-button"
          variant={prop === 'variant' ? variant : 'primary'}
          size={prop === 'size' ? size : 'md'}
          color={prop === 'color' ? tint : undefined}
        >
          Start free trial
        </Button>
      </DemoCard>
      <Selector prop={prop}>
        {prop === 'variant' &&
          VARIANTS.map(value => (
            <Chip
              key={value}
              id={`variant-${value}`}
              label={value}
              isSelected={value === variant}
              onPress={() => setVariant(value)}
            />
          ))}
        {prop === 'size' &&
          SIZES.map(value => (
            <Chip
              key={value}
              id={`size-${value}`}
              label={value}
              isSelected={value === size}
              onPress={() => setSize(value)}
            />
          ))}
        {prop === 'color' &&
          TINTS.map(value => (
            <Button
              key={value.name}
              testID={`tint-${value.name}`}
              isIconOnly
              radius="full"
              color={value.hex}
              accessibilityLabel={value.name}
              onPress={() => setTint(value.hex)}
            >
              {value.hex === tint ? <Button.Icon as={CheckIcon} /> : null}
            </Button>
          ))}
      </Selector>
    </DemoFrame>
  )
}

function Perk({ text }: { text: string }) {
  const theme = useXAUITheme()

  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
      <CheckIcon size={18} color={theme.colors.success} />
      <Text style={{ color: theme.colors.foreground, fontSize: theme.fontSizes.md }}>
        {text}
      </Text>
    </View>
  )
}

function Selector({
  prop,
  children,
}: {
  prop: PlaygroundProp
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 10 }}>
      <Text
        style={{
          color: theme.colors.muted,
          fontSize: theme.fontSizes.xs,
          fontWeight: theme.fontWeights.semibold,
          letterSpacing: 1,
        }}
      >
        {prop.toUpperCase()}
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {children}
      </View>
    </View>
  )
}

function Chip({
  id,
  label,
  isSelected,
  onPress,
}: {
  id: string
  label: string
  isSelected: boolean
  onPress: () => void
}) {
  return (
    <Button
      testID={id}
      size="sm"
      variant={isSelected ? 'default' : 'tertiary'}
      onPress={onPress}
    >
      {label}
    </Button>
  )
}
