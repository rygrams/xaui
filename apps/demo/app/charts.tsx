import { ScrollView, Text, View } from 'react-native'
import { AreaChart } from '@xaui/native/area-chart'
import { BarChart } from '@xaui/native/bar-chart'
import type { ChartVariant } from '@xaui/native/chart'
import { LineChart } from '@xaui/native/line-chart'
import { PieChart } from '@xaui/native/pie-chart'
import { RadarChart } from '@xaui/native/radar-chart'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ChartVariant[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
]

const MONTHS = [
  'Jan',
  'Fév',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Août',
  'Sep',
  'Oct',
  'Nov',
  'Déc',
]

const TRAFFIC = MONTHS.map((month, index) => ({
  month,
  organic: [2, 15, 8, 12, 15, 8, 18, 18, 20, 17, 22, 15][index] * 1000,
  paid: [1, 10, 11, 14, 8, 9, 12, 10, 5, 13, 18, 9][index] * 1000,
}))

const SALES = MONTHS.map((month, index) => ({
  month,
  units: [17, 31, 27, 44, 37, 51, 41, 54, 47, 59, 52, 57][index],
}))

/** Two high readings either side of a low one — the shape a smooth curve gets wrong. */
const VALLEY = [
  { day: 'L', value: 90 },
  { day: 'M', value: 92 },
  { day: 'M', value: 4 },
  { day: 'J', value: 95 },
  { day: 'V', value: 91 },
]

/** One row per axis, not per reading — a radar is transposed, and that is the trap. */
const SKILLS = [
  { skill: 'Vitesse', alice: 80, bob: 55 },
  { skill: 'Endurance', alice: 65, bob: 90 },
  { skill: 'Précision', alice: 92, bob: 70 },
  { skill: 'Force', alice: 45, bob: 85 },
  { skill: 'Agilité', alice: 88, bob: 60 },
  { skill: 'Tactique', alice: 70, bob: 78 },
]

const DEVICES = [
  { device: 'Mobile', count: 2800 },
  { device: 'Desktop', count: 1200 },
  { device: 'Tablet', count: 500 },
]

/**
 * The verification screen for the four charts. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for any of them, though everything
 * they are made of is: `chart-scale`, `chart-path` and `chart-palette` are 49 cases.
 *
 * What only this screen can show: that a second series is a *shade* of the first rather than
 * a colour from a list, that the four read the same because they share one plot, and that
 * the curve never dips under a valley — which the tests pin down and the eye confirms.
 */
export default function ChartsScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 96 }}
    >
      <Section
        title="AreaChart — the line with the ground under it filled"
        note="The fill is a gradient rather than a wash: the ink belongs at the line, where the number is. That is also what keeps two overlaid areas legible, since neither is solid enough to hide the other."
      >
        <Card title="Chiffre d'affaires">
          <AreaChart
            data={TRAFFIC}
            xKey="month"
            yKeys={['organic']}
            formatY={value => `${Math.round(value / 1000)}k`}
          />
        </Card>
        <Card title="Trafic — empilé">
          <AreaChart
            data={TRAFFIC}
            xKey="month"
            yKeys={['organic', 'paid']}
            isStacked
            formatY={value => `${Math.round(value / 1000)}k`}
          />
        </Card>
        <Card title="Superposé — la même donnée, l'autre question">
          <AreaChart
            data={TRAFFIC}
            xKey="month"
            yKeys={['organic', 'paid']}
            formatY={value => `${Math.round(value / 1000)}k`}
          />
        </Card>
      </Section>

      <Section
        title="The curve never leaves its data"
        note="Fritsch–Carlson, not a midpoint cubic: the tangent at a turning point is flattened to zero, so a smooth line through two high readings either side of a low one cannot bow under the low one. On an area chart that bow is ink below the axis."
      >
        <Card title="Une vallée">
          <AreaChart data={VALLEY} xKey="day" yKeys={['value']} size="sm" />
        </Card>
        <Card title="La même, en droites">
          <LineChart
            data={VALLEY}
            xKey="day"
            yKeys={['value']}
            curve="linear"
            hasPoints
            size="sm"
          />
        </Card>
      </Section>

      <Section
        title="LineChart — a shade per series, not a colour per series"
        note="A chart's series are usually one quantity split, so shades of one colour say “parts of a whole” where a rainbow says “unrelated things”. A caller changing the accent changes the whole chart with it."
      >
        <Card title="Source du trafic">
          <Legend labels={['Organique', 'Payant']} />
          <LineChart
            data={TRAFFIC}
            xKey="month"
            yKeys={['organic', 'paid']}
            formatY={value => `${Math.round(value / 1000)}k`}
          />
        </Card>
        <Card title="Sans axes ni grille">
          <LineChart
            data={TRAFFIC}
            xKey="month"
            yKeys={['organic']}
            hasGrid={false}
            hasXAxis={false}
            hasYAxis={false}
            size="sm"
          />
        </Card>
      </Section>

      <Section
        title="BarChart — grouped compares, stacked totals"
        note="The corner is half the bar, computed from the slot the scale gave it, so the capsule survives four bars and forty — and it is clamped to the bar's own height, which is what keeps the shortest bar a stadium rather than a knot."
      >
        <Card title="Ventes quotidiennes">
          <BarChart data={SALES} xKey="month" yKeys={['units']} />
        </Card>
        <Card title="Groupé">
          <BarChart
            data={TRAFFIC}
            xKey="month"
            yKeys={['organic', 'paid']}
            isGrouped
            formatY={value => `${Math.round(value / 1000)}k`}
          />
        </Card>
        <Card title="Empilé, coins carrés">
          <BarChart
            data={TRAFFIC}
            xKey="month"
            yKeys={['organic', 'paid']}
            radius={2}
            formatY={value => `${Math.round(value / 1000)}k`}
          />
        </Card>
      </Section>

      <Section
        title="PieChart — the whole, and its parts"
        note="innerRadius is a fraction, not points: the hole stays in proportion at every size. What sits in it is React Native rather than SVG — a Text in the middle of a ring is a Text, and takes the theme's font."
      >
        <Card title="Appareils connectés">
          <PieChart data={DEVICES} labelKey="device" valueKey="count">
            <Text
              style={{
                color: theme.colors.foreground,
                fontSize: theme.fontSizes['2xl'],
                fontWeight: theme.fontWeights.bold,
              }}
            >
              4,5K
            </Text>
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}
            >
              Appareils
            </Text>
          </PieChart>
          <Legend labels={DEVICES.map(row => row.device)} />
        </Card>
        <Card title="Sans trou, et sans écart">
          <PieChart
            data={DEVICES}
            labelKey="device"
            valueKey="count"
            innerRadius={0}
            gap={0}
            size="sm"
          />
        </Card>
        <Card title="Une seule part">
          <PieChart
            data={[{ device: 'Mobile', count: 1 }]}
            labelKey="device"
            valueKey="count"
            size="sm"
          />
        </Card>
      </Section>

      <Section
        title="RadarChart — several quantities at once"
        note="The data is transposed: a row is an axis, not a reading along one. The vertices are the axes, so the edges are always straight — a curve between two of them would draw a reading on an axis that does not exist."
      >
        <Card title="Profils">
          <Legend labels={['Alice', 'Bob']} />
          <RadarChart
            data={SKILLS}
            axisKey="skill"
            yKeys={['alice', 'bob']}
            maxValue={100}
          />
        </Card>
        <Card title="Une série, sans étiquettes, avec ses points">
          <RadarChart
            data={SKILLS}
            axisKey="skill"
            yKeys={['alice']}
            hasLabels={false}
            hasPoints
            levels={3}
            size="sm"
          />
        </Card>
      </Section>

      <Section
        title="The five levels, and a tint"
        note="The ProgressBar's five, for the ProgressBar's reasons: primary and secondary are the two emphases, and the three intents are for when the number itself is the news."
      >
        {VARIANTS.map(variant => (
          <Card key={variant} title={variant}>
            <BarChart
              data={SALES}
              xKey="month"
              yKeys={['units']}
              variant={variant}
              size="sm"
            />
          </Card>
        ))}
        <Card title="color=#7c3aed">
          <AreaChart
            data={TRAFFIC}
            xKey="month"
            yKeys={['organic', 'paid']}
            color="#7c3aed"
            isStacked
            size="sm"
            formatY={value => `${Math.round(value / 1000)}k`}
          />
        </Card>
        <Card title="isDisabled">
          <LineChart
            data={TRAFFIC}
            xKey="month"
            yKeys={['organic']}
            isDisabled
            size="sm"
          />
        </Card>
        <Card title="Aucune donnée">
          <BarChart data={[]} xKey="month" yKeys={['units']} size="sm" />
        </Card>
      </Section>
    </ScrollView>
  )
}

/** The ground a chart is read against. The charts draw none of their own. */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius['2xl'],
        padding: 16,
        gap: 12,
      }}
    >
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  )
}

/**
 * The legend is the caller's, deliberately: which series a dot stands for is a sentence in
 * the caller's language, and the palette is the one thing they need from the chart.
 */
function Legend({ labels }: { labels: string[] }) {
  const theme = useXAUITheme()

  return (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
      {labels.map((label, index) => (
        <View
          key={label}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.colors.accent,
              opacity: 1 - index * 0.3,
            }}
          />
          <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
            {label}
          </Text>
        </View>
      ))}
    </View>
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
