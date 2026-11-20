import { ScrollView } from 'react-native'
import { useState } from 'react'
import { useXAUITheme } from '@xaui/native/theme'
import { Avatar } from '@xaui/tram/avatar'
import { Badge } from '@xaui/tram/badge'
import { tramAccents } from '@xaui/tram/theme'
import { ToggleButton } from '@xaui/tram/toggle-button'
import { Typography } from '@xaui/tram/typography'
import { Column, Grid, Row, Stack } from '@xaui/tram/view'
import { TramSection } from '../../components/tram-section'

/** Tram's photo band: white on black at 60 %, as `Tile.Image` writes over a picture. */
const PICTURE = { ink: '#FFFFFF', band: 'rgba(0, 0, 0, 0.6)' }

const APPS = ['photos', 'mail', 'agenda', 'météo', 'musique', 'cartes', 'notes']

/**
 * Where `@xaui/tram/view` is verified: Native's `Row`, `Column`, `Stack` and `Grid`,
 * imported from Tram, laying out Tram components — the same module, so nothing here is
 * drawn by the layout itself.
 */
export default function TramViewScreen() {
  const theme = useXAUITheme()
  const [columns, setColumns] = useState('4')

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="Row, Column"
        note="Une ligne et une colonne : gap, alignItems et le reste sont les clés de style de React Native, en props."
      >
        <Row gap={12} alignItems="center">
          <Avatar>LM</Avatar>
          <Column gap={2} flexShrink={1}>
            <Typography variant="body">Léa Martin</Typography>
            <Typography variant="caption" color={theme.colors.muted}>
              a partagé 12 photos
            </Typography>
          </Column>
        </Row>
      </TramSection>

      <TramSection
        title="Stack"
        note="Le premier enfant donne la taille ; les Stack.Item flottent dessus, placés par start, end, top et bottom."
      >
        <Stack height={160}>
          <Column flex={1} backgroundColor={tramAccents.teal} />
          <Stack.Item
            bottom={0}
            start={0}
            end={0}
            paddingHorizontal={12}
            paddingVertical={10}
            backgroundColor={PICTURE.band}
          >
            <Typography variant="body" color={PICTURE.ink}>
              Lisbonne, au lever du jour
            </Typography>
          </Stack.Item>
          <Stack.Item top={0} end={0}>
            <Badge>12</Badge>
          </Stack.Item>
        </Stack>
      </TramSection>

      <TramSection
        title="Grid"
        note="Des colonnes fixes, mesurées ; Grid.Item span={2} couvre deux colonnes et l'écart entre elles."
      >
        <ToggleButton.Group
          value={columns}
          onValueChange={next => next && setColumns(next)}
        >
          {['2', '3', '4'].map(count => (
            <ToggleButton key={count} value={count}>
              {`${count} col.`}
            </ToggleButton>
          ))}
        </ToggleButton.Group>
        <Grid columns={Number(columns)} gap={8}>
          {APPS.map((name, index) =>
            index === 1 ? (
              <Grid.Item key={name} span={2}>
                <Cell name={name} color={theme.colors.accent} />
              </Grid.Item>
            ) : (
              <Cell
                key={name}
                name={name}
                color={index % 3 === 2 ? theme.colors.surface : theme.colors.accent}
              />
            )
          )}
        </Grid>
      </TramSection>
    </ScrollView>
  )
}

function Cell({ name, color }: { name: string; color: string }) {
  const theme = useXAUITheme()
  const isSurface = color === theme.colors.surface

  return (
    <Column
      height={72}
      justifyContent="flex-end"
      padding={8}
      backgroundColor={color}
    >
      <Typography
        variant="caption"
        color={isSurface ? theme.colors.foreground : theme.colors.accentForeground}
      >
        {name}
      </Typography>
    </Column>
  )
}
