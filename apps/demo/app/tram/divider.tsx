import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Divider } from '@xaui/tram/divider'
import type { DividerSize } from '@xaui/tram/divider'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: DividerSize[] = ['sm', 'md', 'lg']

const MAIL = [
  { from: 'inès kaboré', subject: 'revue du close button' },
  { from: 'moussa sanou', subject: 'les maquettes du pivot' },
  { from: 'awa traoré', subject: 're: ordre de la famille B' },
]

/**
 * Where the Tram `Divider` is verified, in dark and in light: between rows, the three
 * thicknesses, vertical in a row, and a raw colour drawn whole.
 */
export default function TramDividerScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="entre des lignes"
        note="Un point de muted effacé — à moitié en sombre, au quart en clair : l'espace sépare encore, comme dans Metro."
      >
        <View>
          {MAIL.map((mail, index) => (
            <View key={mail.from}>
              {index > 0 ? <Divider /> : null}
              <View style={{ paddingVertical: 12 }}>
                <Typography variant="subtitle">{mail.from}</Typography>
                <Typography variant="body" color={theme.colors.muted}>
                  {mail.subject}
                </Typography>
              </View>
            </View>
          ))}
        </View>
      </TramSection>

      <TramSection
        title="les épaisseurs"
        note="sm 1, md 2 (le trait du Button), lg 3 (la bordure du thème)."
      >
        {SIZES.map(size => (
          <View key={size} style={{ gap: 6 }}>
            <Typography variant="caption" color={theme.colors.muted}>
              {size}
            </Typography>
            <Divider size={size} />
          </View>
        ))}
      </TramSection>

      <TramSection
        title="à la verticale"
        note="Dans une rangée, la règle prend la hauteur de son parent."
      >
        <Row>
          <Typography variant="body">pivot</Typography>
          <Divider orientation="vertical" size="md" />
          <Typography variant="body">panorama</Typography>
          <Divider orientation="vertical" size="md" />
          <Typography variant="body">tile</Typography>
        </Row>
      </TramSection>

      <TramSection
        title="une couleur"
        note="Une couleur brute est la parole de l'appli : tracée entière, pas effacée."
      >
        <Divider size="md" color="#E51400" />
        <Divider size="md" color={theme.colors.accent} />
      </TramSection>
    </ScrollView>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'stretch', gap: 12, height: 32 }}
    >
      {children}
    </View>
  )
}
