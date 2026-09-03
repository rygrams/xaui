import { ScrollView, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Icon, IconContext } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The verification screen for P1.5. The criterion is the last row of each slot: a
 * component icon and a raw SVG must take the surrounding colour **with no explicit
 * prop**, which is the whole reason this primitive exists.
 */
export default function IconScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 24, paddingBottom: 48 }}
    >
      <Section title="Inherited — one provider, two very different icons">
        <Slot color={theme.colors.danger} size={28} label="danger, 28">
          <Icon as={TrashIcon} />
          <Icon>
            <RawCheck />
          </Icon>
        </Slot>

        <Slot color={theme.colors.success} size={20} label="success, 20">
          <Icon as={TrashIcon} />
          <Icon>
            <RawCheck />
          </Icon>
        </Slot>
      </Section>

      <Section title="Overridden — an explicit prop wins over the slot">
        <Slot color={theme.colors.danger} size={28} label="slot says danger/28">
          <Icon as={TrashIcon} />
          <Icon as={TrashIcon} color={theme.colors.accent} />
          <Icon as={TrashIcon} size={16} />
        </Slot>
      </Section>

      <Section title="Standalone — no provider, so the theme decides">
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Icon as={TrashIcon} />
          <Icon>
            <RawCheck />
          </Icon>
          <Text style={{ color: theme.colors.foreground }}>
            foreground, at the md font size
          </Text>
        </View>
      </Section>
    </ScrollView>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 8 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.sm,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  )
}

/** Stands in for a component root publishing what its icon slot resolved. */
function Slot({
  color,
  size,
  label,
  children,
}: {
  color: string
  size: number
  label: string
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: theme.radius.md,
        borderWidth: theme.borderWidth.default,
        borderColor: theme.colors.border,
      }}
    >
      <IconContext.Provider value={{ color, size }}>{children}</IconContext.Provider>
      <Text style={{ color: theme.colors.foreground }}>{label}</Text>
    </View>
  )
}

/** A third-party icon: it knows nothing about XAUI, only `size` and `color`. */
function TrashIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

/**
 * A raw SVG with its own size and colour baked in, the way one arrives from a design
 * tool. Both must be overridden by what the slot published.
 */
function RawCheck() {
  return (
    <Svg width={99} height={99} viewBox="0 0 24 24" fill="none" color="magenta">
      <Path
        d="M4 12l5 5L20 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}
