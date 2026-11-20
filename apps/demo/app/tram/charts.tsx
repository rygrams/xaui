import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { AreaChart } from '@xaui/tram/area-chart'
import { BarChart } from '@xaui/tram/bar-chart'
import { Button } from '@xaui/tram/button'
import { Card } from '@xaui/tram/card'
import { Chart } from '@xaui/tram/chart'
import type { ChartSize, Curve } from '@xaui/tram/chart'
import { LineChart } from '@xaui/tram/line-chart'
import { PieChart } from '@xaui/tram/pie-chart'
import { RadarChart } from '@xaui/tram/radar-chart'
import { RadialChart } from '@xaui/tram/radial-chart'
import { Skeleton } from '@xaui/tram/skeleton'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const MONTHS = [
  'jan',
  'fév',
  'mar',
  'avr',
  'mai',
  'juin',
  'juil',
  'août',
  'sep',
  'oct',
  'nov',
  'déc',
]

/** Go per month on this phone: one quantity split in two, the case shades are for. */
const DATA = MONTHS.map((month, index) => ({
  month,
  wifi: [6, 7, 9, 8, 11, 12, 14, 13, 12, 15, 16, 18][index],
  mobile: [2, 3, 3, 4, 3, 5, 6, 7, 5, 6, 7, 8][index],
}))

/** Two high readings either side of a low one — where a smooth curve could cheat. */
const VALLEY = [
  { day: 'lun', value: 90 },
  { day: 'mar', value: 92 },
  { day: 'mer', value: 4 },
  { day: 'jeu', value: 95 },
  { day: 'ven', value: 91 },
]

/** A month with a loss in it: the zero axis runs through the middle. */
const BALANCE = MONTHS.slice(0, 6).map((month, index) => ({
  month,
  net: [12, 8, -6, 4, -10, 14][index],
}))

const DEVICES = [
  { device: 'téléphone', sessions: 2166 },
  { device: 'tablette', sessions: 1218 },
  { device: 'ordinateur', sessions: 767 },
  { device: 'montre', sessions: 361 },
]
const SESSIONS = DEVICES.reduce((sum, row) => sum + row.sessions, 0)

const ACTIVITY = [
  { label: 'calories', value: 1623, target: 2000 },
  { label: 'pas', value: 5400, target: 10000 },
  { label: 'exercice', value: 25, target: 60 },
]

/** One row per axis, not per reading — a radar is transposed. */
const SKILLS = [
  { skill: 'vitesse', alice: 80, bob: 55 },
  { skill: 'endurance', alice: 65, bob: 90 },
  { skill: 'précision', alice: 92, bob: 70 },
  { skill: 'force', alice: 50, bob: 78 },
  { skill: 'souplesse', alice: 74, bob: 48 },
]

const INTENTS: TramAccentName[] = ['green', 'amber', 'red']
const SIZES: ChartSize[] = ['sm', 'md', 'lg']

const french = (value: number) => value.toLocaleString('fr-FR')

/**
 * Where the Tram charts are verified, in dark and in light: the frame with no shell around
 * a line, an area and a bar chart, the curves and the points, stacked and grouped, the zero
 * axis through negative values, a pie with its long legend in the footer, a radial and a
 * radar, an empty frame, the intents as accent names, and the three sizes.
 */
export default function TramChartsScreen() {
  const theme = useXAUITheme()
  const [curve, setCurve] = useState<Curve>('linear')
  const [hasPoints, setHasPoints] = useState(false)
  const [isGrouped, setIsGrouped] = useState(false)
  const last = DATA[DATA.length - 1]

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 40, paddingBottom: 96 }}
    >
      <TramSection
        title="le cadre"
        note="Pas de coque : ni fond, ni trait, ni coin — la figure est posée sur la page. Titre en title Light, description en caption gris, valeur en section Light. La légende pose un carré de 10 par série, dans la nuance que la figure a tirée."
      >
        <Row>
          <Toggle isOn={curve === 'linear'} onPress={() => setCurve('linear')}>
            droite
          </Toggle>
          <Toggle isOn={curve === 'monotone'} onPress={() => setCurve('monotone')}>
            monotone
          </Toggle>
          <Toggle isOn={hasPoints} onPress={() => setHasPoints(on => !on)}>
            hasPoints
          </Toggle>
        </Row>
        <Chart seriesCount={2}>
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>données</Chart.Title>
              <Chart.Description>Go par mois, sur ce téléphone</Chart.Description>
              <Chart.Value>{`${last.wifi + last.mobile} Go`}</Chart.Value>
            </Chart.Heading>
            <Chart.Legend labels={['wi-fi', 'mobile']} />
          </Chart.Header>
          <LineChart
            data={DATA}
            xKey="month"
            yKeys={['wifi', 'mobile']}
            curve={curve}
            hasPoints={hasPoints}
          />
          <Chart.Footer>
            <Chart.Description>Douze derniers mois</Chart.Description>
          </Chart.Footer>
        </Chart>
      </TramSection>

      <TramSection
        title="la courbe ne quitte pas ses données"
        note="Droite par défaut, aux angles vifs et aux bouts coupés. monotone reste là : Fritsch–Carlson, qui ne creuse jamais sous la vallée."
      >
        <Chart>
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>une vallée</Chart.Title>
              <Chart.Description>
                monotone, puis droite avec ses carrés
              </Chart.Description>
            </Chart.Heading>
          </Chart.Header>
          <AreaChart
            data={VALLEY}
            xKey="day"
            yKeys={['value']}
            curve="monotone"
            size="sm"
          />
          <LineChart
            data={VALLEY}
            xKey="day"
            yKeys={['value']}
            hasPoints
            size="sm"
          />
        </Chart>
      </TramSection>

      <TramSection
        title="l'aire"
        note="Un aplat à 20 %, sans dégradé. Empilée, chaque série ne remplit que sa bande : le sol ne fonce pas, et l'axe atteint le haut de la pile."
      >
        <Chart seriesCount={2} accent="teal">
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>empilée</Chart.Title>
              <Chart.Description>isStacked, accent teal</Chart.Description>
            </Chart.Heading>
            <Chart.Legend labels={['wi-fi', 'mobile']} />
          </Chart.Header>
          <AreaChart data={DATA} xKey="month" yKeys={['wifi', 'mobile']} isStacked />
        </Chart>
        <Chart seriesCount={2} accent="teal">
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>superposée</Chart.Title>
              <Chart.Description>
                {"la même donnée, l'autre question"}
              </Chart.Description>
            </Chart.Heading>
          </Chart.Header>
          <AreaChart data={DATA} xKey="month" yKeys={['wifi', 'mobile']} />
        </Chart>
      </TramSection>

      <TramSection
        title="les barres"
        note="Des rectangles francs, empilés par défaut sans écart entre les segments ; groupées, elles se partagent la case. radius vaut 0, et 2 au plus."
      >
        <Row>
          <Toggle isOn={!isGrouped} onPress={() => setIsGrouped(false)}>
            empilé
          </Toggle>
          <Toggle isOn={isGrouped} onPress={() => setIsGrouped(true)}>
            isGrouped
          </Toggle>
        </Row>
        <Chart seriesCount={2} accent="violet">
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>données</Chart.Title>
              <Chart.Description>Go par mois</Chart.Description>
            </Chart.Heading>
            <Chart.Legend labels={['wi-fi', 'mobile']} />
          </Chart.Header>
          <BarChart
            data={DATA}
            xKey="month"
            yKeys={['wifi', 'mobile']}
            isGrouped={isGrouped}
          />
        </Chart>
        <Chart>
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>solde</Chart.Title>
              <Chart.Description>
                {"l'axe zéro au milieu, radius 8 tenu à 2"}
              </Chart.Description>
            </Chart.Heading>
          </Chart.Header>
          <BarChart
            data={BALANCE}
            xKey="month"
            yKeys={['net']}
            radius={8}
            formatY={value => `${value} €`}
          />
        </Chart>
      </TramSection>

      <TramSection
        title="la légende sans seriesCount"
        note="Le cadre ne compte pas les séries : sans seriesCount, la légende tire sa propre palette, aussi longue que ses entrées. Une entrée faite de plusieurs morceaux de texte reste un seul libellé."
      >
        <Chart accent="emerald">
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>données</Chart.Title>
            </Chart.Heading>
            <Chart.Legend>
              <Chart.LegendItem index={0}>wi-fi ({last.wifi} Go)</Chart.LegendItem>
              <Chart.LegendItem index={1}>
                mobile ({last.mobile} Go)
              </Chart.LegendItem>
            </Chart.Legend>
          </Chart.Header>
          <BarChart
            data={DATA}
            xKey="month"
            yKeys={['wifi', 'mobile']}
            isGrouped
            size="sm"
          />
        </Chart>
      </TramSection>

      <TramSection
        title="le camembert"
        note="L'écart dessiné de Native : le fond passe entre les parts. Au centre, le chiffre en section Light ; le pied porte la légende longue — nom, valeur, part."
      >
        <Chart seriesCount={DEVICES.length}>
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>appareils</Chart.Title>
              <Chart.Description>Sessions, ce mois-ci</Chart.Description>
            </Chart.Heading>
          </Chart.Header>
          <PieChart data={DEVICES} labelKey="device" valueKey="sessions">
            <Typography variant="section">
              {`${french(Math.round(SESSIONS / 100) / 10)} k`}
            </Typography>
            <Typography variant="caption" color={theme.colors.muted}>
              sessions
            </Typography>
          </PieChart>
          <Chart.Footer>
            <Chart.Legend rowGap={0}>
              {DEVICES.map((row, index) => (
                <Chart.LegendItem
                  key={row.device}
                  index={index}
                  width="100%"
                  minHeight={32}
                >
                  <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
                    <Typography variant="body" flex={1}>
                      {row.device}
                    </Typography>
                    <Typography variant="body" fontVariant={['tabular-nums']}>
                      {french(row.sessions)}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={theme.colors.muted}
                      width={44}
                      textAlign="right"
                      fontVariant={['tabular-nums']}
                    >
                      {`${Math.round((row.sessions / SESSIONS) * 100)} %`}
                    </Typography>
                  </View>
                </Chart.LegendItem>
              ))}
            </Chart.Legend>
          </Chart.Footer>
        </Chart>
        <PieChart
          data={DEVICES}
          labelKey="device"
          valueKey="sessions"
          innerRadius={0}
          gap={0}
          size="sm"
          accent="orange"
        />
      </TramSection>

      <TramSection
        title="le radial"
        note="Chaque anneau contre son objectif. Les bouts sont coupés, la piste est le gris du Skeleton ; trop d'anneaux, ils s'amincissent plutôt que d'en perdre un."
      >
        <Chart seriesCount={ACTIVITY.length} accent="magenta">
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>activité du jour</Chart.Title>
              <Chart.Description>
                Chaque anneau contre son objectif
              </Chart.Description>
            </Chart.Heading>
            <Chart.Legend labels={ACTIVITY.map(row => row.label)} />
          </Chart.Header>
          <RadialChart
            data={ACTIVITY}
            labelKey="label"
            valueKey="value"
            maxKey="target"
          >
            <Typography variant="section">
              {`${Math.round((ACTIVITY[0].value / ACTIVITY[0].target) * 100)} %`}
            </Typography>
            <Typography variant="caption" color={theme.colors.muted}>
              calories
            </Typography>
          </RadialChart>
        </Chart>
        <Row>
          <RadialChart
            data={ACTIVITY}
            labelKey="label"
            valueKey="value"
            maxKey="target"
            hasTrack={false}
            thickness={20}
            gap={2}
            size="sm"
          />
          <RadialChart
            data={MONTHS.slice(0, 6).map((month, index) => ({
              month,
              value: (index + 1) * 15,
            }))}
            labelKey="month"
            valueKey="value"
            maxValue={100}
            size="sm"
            color="#1BA1E2"
          />
        </Row>
      </TramSection>

      <TramSection
        title="le radar"
        note="Anneaux et rayons en lignes de 1 du gris faible, polygones aux angles vifs remplis à 18 %, noms en caption gris autour."
      >
        <Chart seriesCount={2} accent="cobalt">
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>profil</Chart.Title>
              <Chart.Description>Sur 100, même échelle pour tous</Chart.Description>
            </Chart.Heading>
            <Chart.Legend labels={['Alice', 'Bob']} />
          </Chart.Header>
          <RadarChart
            data={SKILLS}
            axisKey="skill"
            yKeys={['alice', 'bob']}
            maxValue={100}
          />
        </Chart>
        <RadarChart
          data={SKILLS}
          axisKey="skill"
          yKeys={['alice']}
          hasLabels={false}
          hasPoints
          levels={3}
          size="sm"
        />
      </TramSection>

      <TramSection
        title="sans données"
        note="Un cadre sans figure est complet : un titre et un bloc qui attend. Une figure sans lignes dessine ses axes."
      >
        <Chart>
          <Chart.Header>
            <Chart.Heading>
              <Chart.Title>sessions</Chart.Title>
              <Chart.Description>Aucune donnée sur la période</Chart.Description>
            </Chart.Heading>
          </Chart.Header>
          <Skeleton height={140} />
        </Chart>
        <LineChart data={[]} xKey="month" yKeys={['wifi']} size="sm" />
      </TramSection>

      <TramSection
        title="dans une carte"
        note="Pour une carte, l'appelant pose le cadre dans un Card Tram : la surface discrète, sans trait ni ombre."
      >
        <Card>
          <Chart seriesCount={1}>
            <Chart.Header>
              <Chart.Heading>
                <Chart.Description>Solde total</Chart.Description>
                <Chart.Value>24 801,32 €</Chart.Value>
              </Chart.Heading>
            </Chart.Header>
            <LineChart
              data={DATA}
              xKey="month"
              yKeys={['wifi']}
              hasGrid={false}
              hasXAxis={false}
              hasYAxis={false}
              size="sm"
            />
          </Chart>
        </Card>
      </TramSection>

      <TramSection
        title="les intentions"
        note="Pas de variant : les trois intentions sont des noms d'accent, comme sur Badge et Chip. color, brut, gagne sur accent."
      >
        {INTENTS.map(accent => (
          <Chart key={accent} accent={accent}>
            <Chart.Header>
              <Chart.Heading>
                <Chart.Description>{`accent="${accent}"`}</Chart.Description>
              </Chart.Heading>
            </Chart.Header>
            <BarChart data={DATA} xKey="month" yKeys={['wifi']} size="sm" />
          </Chart>
        ))}
        <Chart accent="red" color="#647687">
          <Chart.Header>
            <Chart.Heading>
              <Chart.Description>{'accent="red" color="#647687"'}</Chart.Description>
            </Chart.Heading>
          </Chart.Header>
          <LineChart data={DATA} xKey="month" yKeys={['wifi']} size="sm" />
        </Chart>
      </TramSection>

      <TramSection
        title="les tailles"
        note="size est la hauteur du tracé — 140, 200, 280 — jamais sa largeur. Les mots gardent leur rôle à toutes les tailles."
      >
        {SIZES.map(size => (
          <Chart key={size} size={size} seriesCount={2}>
            <Chart.Header>
              <Chart.Heading>
                <Chart.Description>{`size="${size}"`}</Chart.Description>
              </Chart.Heading>
            </Chart.Header>
            <AreaChart data={DATA} xKey="month" yKeys={['wifi', 'mobile']} />
          </Chart>
        ))}
        <Chart isDisabled>
          <Chart.Header>
            <Chart.Heading>
              <Chart.Description>isDisabled</Chart.Description>
            </Chart.Heading>
          </Chart.Header>
          <BarChart data={DATA} xKey="month" yKeys={['wifi']} size="sm" />
        </Chart>
      </TramSection>
    </ScrollView>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
      }}
    >
      {children}
    </View>
  )
}

function Toggle({
  isOn,
  onPress,
  children,
}: {
  isOn: boolean
  onPress: () => void
  children: string
}) {
  return (
    <Button variant={isOn ? 'contained' : 'outline'} size="sm" onPress={onPress}>
      {children}
    </Button>
  )
}
