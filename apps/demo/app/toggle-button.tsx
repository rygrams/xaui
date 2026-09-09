import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Button } from '@xaui/native/button'
import { ToggleButton } from '@xaui/native/toggle-button'
import type {
  ToggleButtonSize,
  ToggleButtonVariant,
} from '@xaui/native/toggle-button'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ToggleButtonVariant[] = ['primary', 'secondary', 'ghost']
const SIZES: ToggleButtonSize[] = ['xs', 'sm', 'md', 'lg']

export default function ToggleButtonScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, gap: 32, paddingBottom: 64 }}
    >
      <View style={{ gap: 8 }}>
        <Text
          style={{
            color: theme.colors.foreground,
            fontFamily: theme.fontFamilies.heading,
            fontSize: theme.fontSizes['2xl'],
            fontWeight: theme.fontWeights.bold,
          }}
        >
          ToggleButton
        </Text>
        <Text
          style={{
            color: theme.colors.muted,
            fontFamily: theme.fontFamilies.body,
            fontSize: theme.fontSizes.md,
            lineHeight: theme.lineHeights.md,
          }}
        >
          Une action à deux états, inspirée du bouton Like de la référence.
        </Text>
      </View>

      <DemoCard title="Référence — repos et sélection">
        {VARIANTS.map(variant => (
          <View key={variant} style={{ gap: 10 }}>
            <Text
              style={{
                color: theme.colors.muted,
                fontFamily: theme.fontFamilies.body,
                fontSize: theme.fontSizes.sm,
                fontWeight: theme.fontWeights.semibold,
                textTransform: 'capitalize',
              }}
            >
              {variant}
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <LikeButton variant={variant} isSelected={false} />
              <LikeButton variant={variant} isSelected />
            </View>
          </View>
        ))}
      </DemoCard>

      <InteractiveExample />

      <ToggleGroupExample />

      <DemoCard title="Tailles">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {SIZES.map(size => (
            <ToggleButton key={size} size={size} defaultSelected={size === 'lg'}>
              {size}
            </ToggleButton>
          ))}
        </View>
      </DemoCard>

      <DemoCard title="Teinte et états">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ToggleButton color="#7c3aed" defaultSelected>
            Violet
          </ToggleButton>
          <ToggleButton isDisabled>Indisponible</ToggleButton>
          <ToggleButton
            isIconOnly
            defaultSelected
            accessibilityLabel="Ajouter aux favoris"
          >
            {({ isSelected }) => (
              <ToggleButton.Icon
                as={isSelected ? HeartFilledIcon : HeartOutlineIcon}
              />
            )}
          </ToggleButton>
        </View>
      </DemoCard>
    </ScrollView>
  )
}

function LikeButton({
  variant,
  isSelected,
}: {
  variant: ToggleButtonVariant
  isSelected: boolean
}) {
  return (
    <ToggleButton variant={variant} isSelected={isSelected}>
      {({ isSelected: selected }) => (
        <>
          <ToggleButton.Icon as={selected ? HeartFilledIcon : HeartOutlineIcon} />
          <ToggleButton.Label>Like</ToggleButton.Label>
        </>
      )}
    </ToggleButton>
  )
}

function InteractiveExample() {
  const theme = useXAUITheme()
  const [isSelected, setSelected] = useState(false)

  return (
    <DemoCard title="Contrôlé">
      <Text
        style={{
          color: theme.colors.muted,
          fontFamily: theme.fontFamilies.body,
          lineHeight: theme.lineHeights.md,
        }}
      >
        L’état appartient ici à l’écran. Le bouton et le texte restent synchronisés.
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <LikeButtonInteractive
          isSelected={isSelected}
          onSelectedChange={setSelected}
        />
        <Button variant="ghost" onPress={() => setSelected(false)}>
          Réinitialiser
        </Button>
      </View>
      <Text style={{ color: theme.colors.foreground }}>
        {isSelected ? 'Ajouté aux favoris' : 'Pas encore dans les favoris'}
      </Text>
    </DemoCard>
  )
}

function ToggleGroupExample() {
  const [alignment, setAlignment] = useState('start')

  return (
    <DemoCard title="Groupe exclusif">
      <Text style={{ color: useXAUITheme().colors.muted }}>
        Une seule option est active. Chaque bouton rejoint le groupe avec sa valeur.
      </Text>
      <ToggleButton.Group value={alignment} onValueChange={setAlignment}>
        <ToggleButton value="start">Début</ToggleButton>
        <ToggleButton value="center">Centre</ToggleButton>
        <ToggleButton value="end">Fin</ToggleButton>
      </ToggleButton.Group>
    </DemoCard>
  )
}

function LikeButtonInteractive({
  isSelected,
  onSelectedChange,
}: {
  isSelected: boolean
  onSelectedChange: (isSelected: boolean) => void
}) {
  return (
    <ToggleButton
      isSelected={isSelected}
      onSelectedChange={onSelectedChange}
      accessibilityLabel="Aimer"
    >
      {({ isSelected: selected }) => (
        <>
          <ToggleButton.Icon as={selected ? HeartFilledIcon : HeartOutlineIcon} />
          <ToggleButton.Label>Like</ToggleButton.Label>
        </>
      )}
    </ToggleButton>
  )
}

function DemoCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        gap: 18,
        padding: 20,
        borderRadius: theme.radius.xl,
        backgroundColor: theme.colors.surface,
        borderCurve: 'continuous',
        ...theme.shadows.surface,
      }}
    >
      <Text
        style={{
          color: theme.colors.foreground,
          fontFamily: theme.fontFamilies.heading,
          fontSize: theme.fontSizes.lg,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  )
}

function HeartOutlineIcon({ size = 20, color = '#000000' }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function HeartFilledIcon({ size = 20, color = '#000000' }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        fill={color}
      />
    </Svg>
  )
}
