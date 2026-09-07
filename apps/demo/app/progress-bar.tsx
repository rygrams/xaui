import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ProgressBar } from '@xaui/native/progress-bar'
import type { ProgressBarSize, ProgressBarVariant } from '@xaui/native/progress-bar'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ProgressBarVariant[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
]
const SIZES: ProgressBarSize[] = ['sm', 'md', 'lg']

/** The rail's thickness at each step, for the row's own label. */
const RAILS: Record<ProgressBarSize, number> = { sm: 4, md: 6, lg: 8 }

/**
 * The verification screen for the `ProgressBar`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 *
 * The one thing only this screen can show is the motion: the first section moves on its
 * own, and the fill has to sweep to each new value rather than jump to it.
 */
export default function ProgressBarScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Moving />

      <Section
        title="R3 — a text child is the label, and the bar comes with it"
        note="A progress bar with no bar is a line of text. Written with no children at all it is the rail alone, which is the form a list row wants."
      >
        <ProgressBar value={40}>Téléchargement</ProgressBar>
        <ProgressBar value={40} />
      </Section>

      <Section
        title="The five variants — one rail, five arcs"
        note="The rail is the room left to go, and that is not success, warning or danger. What the variant names is the fill."
      >
        {VARIANTS.map((variant, index) => (
          <ProgressBar key={variant} variant={variant} value={20 + index * 15}>
            {variant}
          </ProgressBar>
        ))}
      </Section>

      <Section
        title="size — the rail's thickness, never its width"
        note="A bar's length is its parent's business, exactly as a Button's is. That is why there is no fullWidth and why the root spans by default."
      >
        {SIZES.map(size => (
          <ProgressBar key={size} size={size} value={60}>
            {`${size} · rail de ${RAILS[size]}pt`}
          </ProgressBar>
        ))}
      </Section>

      <Section
        title="formatOptions, and a value of your own"
        note="The number goes through Intl, so a French build reads 40 % with its space. Children replace it outright for what Intl has no opinion on."
      >
        <ProgressBar value={0.4} minValue={0} maxValue={1}>
          Une fraction, pas un pourcentage
        </ProgressBar>
        <ProgressBar
          value={1250}
          maxValue={2000}
          formatOptions={{ style: 'currency', currency: 'EUR' }}
        >
          Objectif de collecte
        </ProgressBar>
        <ProgressBar value={7} maxValue={12}>
          <ProgressBar.Header>
            <ProgressBar.Label>Épisodes vus</ProgressBar.Label>
            <ProgressBar.Value>7 sur 12</ProgressBar.Value>
          </ProgressBar.Header>
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      </Section>

      <Section
        title="color, radius, the edges, and isDisabled"
        note="0 and 100 are the two the fill's corner gets wrong when it is a layer over the rail rather than a child of it. Here the rail clips, so one radius rounds both."
      >
        <ProgressBar color="#7c3aed" value={65}>
          #7c3aed
        </ProgressBar>
        <ProgressBar radius="xs" value={65}>
          radius=&quot;xs&quot; — le rail et le remplissage ensemble
        </ProgressBar>
        <ProgressBar value={0}>0 %</ProgressBar>
        <ProgressBar value={100}>100 %</ProgressBar>
        <ProgressBar value={140}>140, ramené à 100</ProgressBar>
        <ProgressBar isDisabled value={45}>
          Indisponible
        </ProgressBar>
      </Section>
    </ScrollView>
  )
}

/** The section a screenshot cannot check: the fill has to sweep, not jump. */
function Moving() {
  const [value, setValue] = useState(15)

  useEffect(() => {
    const timer = setInterval(
      () => setValue(next => (next >= 100 ? 0 : next + 17)),
      1200
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <Section
      title="The fill sweeps to its new value"
      note="A bar that jumped would render a download reporting every 17% as six still frames. animation={false} on the fill is for a value the caller is already animating."
    >
      <ProgressBar value={value}>Sauvegarde</ProgressBar>
      <ProgressBar value={value} variant="success">
        <ProgressBar.Header>
          <ProgressBar.Label>Sans animation</ProgressBar.Label>
          <ProgressBar.Value />
        </ProgressBar.Header>
        <ProgressBar.Track>
          <ProgressBar.Fill animation={false} />
        </ProgressBar.Track>
      </ProgressBar>
    </Section>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 14 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        {note}
      </Text>
      {children}
    </View>
  )
}
