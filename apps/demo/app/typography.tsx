import { ScrollView, Text, View } from 'react-native'
import type { ReactNode } from 'react'
import { TextSpan, Typography } from '@xaui/native/typography'
import type { TypographyVariant } from '@xaui/native/typography'
import { useXAUITheme } from '@xaui/native/theme'

const ROLES: TypographyVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body',
  'body-sm',
  'body-xs',
  'code',
]

/**
 * The verification screen for P3.1. A component is verified here and in the docs preview,
 * in light and in dark — there is no test file for it.
 *
 * Each section states what it is checking: the ten roles are a scale you can read as one,
 * a `TextSpan` inherits from the text around it with nothing declared, `color` tints the
 * only thing a text component has to tint, and the style props are the escape hatch for
 * what has no role.
 */
export default function TypographyScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 64 }}
    >
      <Section
        title="The ten roles"
        note="Six headings, three body steps and inline code. Each role fixes size, line height, weight and family together — which is why there is no size prop and no weight prop to combine them wrongly."
      >
        {ROLES.map(variant => (
          <Typography key={variant} variant={variant}>
            {variant}
          </Typography>
        ))}
      </Section>

      <Section
        title="TextSpan — a fragment, inheriting the rest"
        note="A bare React Native Text. Nesting one inside a Typography inherits size, weight, family and colour from it with nothing declared — the platform does it, so the component does not."
      >
        <Typography variant="h4">
          Supprimer <TextSpan fontWeight="700">trois projets</TextSpan>{' '}
          définitivement
        </Typography>
        <Typography>
          A span inherits the role around it —{' '}
          <TextSpan color={theme.colors.danger}>
            and overrides only what it names
          </TextSpan>
          , here the colour and nothing else.
        </Typography>
        <Typography variant="body-sm">
          It nests as deep as you like:{' '}
          <TextSpan fontStyle="italic">
            italic, <TextSpan fontWeight="700">then bold as well</TextSpan>
          </TextSpan>
          .
        </Typography>
      </Section>

      <Section
        title="color — one raw tint, on the only thing there is to tint"
        note="R7. In a text component there is no ambiguity about where the tint lands, so color needs no companion prop to place it."
      >
        <Typography variant="h5" color="#7c3aed">
          a tinted heading
        </Typography>
        <Typography color={theme.colors.success}>
          a tinted paragraph, from a theme token passed as a raw value
        </Typography>
        <Typography variant="code" color="#7c3aed">
          npm i @xaui/native
        </Typography>
      </Section>

      <Section
        title="Style props — R14"
        note="Full React Native names, full React Native values. They resolve after the role and before style, and they are how a one-off deviation is written without inventing a prop for it."
      >
        <Typography textAlign="center">
          textAlign — a TextStyle key, so R14 already exposes it. No align prop.
        </Typography>
        <Typography fontSize={17} letterSpacing={1}>
          fontSize={'{17}'} — off the scale on purpose, and it says so
        </Typography>
        <Typography variant="h6" numberOfLines={1}>
          numberOfLines is React Native&apos;s own, so truncation needs no prop
          either — this line is far too long to fit on one line of a phone screen
        </Typography>
      </Section>

      <Section
        title="asChild — R12"
        note="The child element becomes the text node and keeps the role's style. It has to be an element that renders text: a View child would take a fontSize it cannot use, and would break the Text inheritance a span depends on."
      >
        <Typography variant="h5" asChild>
          <Text onPress={() => undefined}>
            a Text with its own onPress, wearing the h5 role
          </Text>
        </Typography>
      </Section>

      <Section
        title="Headings announce themselves, explicitly"
        note="h1–h6 name a step on the scale, not a document outline — React Native has none. A screen reader is told with accessibilityRole, which stays the caller's to set."
      >
        <Typography variant="h3" accessibilityRole="header">
          A real heading, announced as one
        </Typography>
      </Section>
    </ScrollView>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 10 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body-xs" color={theme.colors.muted}>
        {note}
      </Typography>
      {children}
    </View>
  )
}
