import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Avatar } from '@xaui/tram/avatar'
import { Badge } from '@xaui/tram/badge'
import type { BadgePlacement, BadgeSize, BadgeVariant } from '@xaui/tram/badge'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const VARIANTS: BadgeVariant[] = [
  'primary',
  'secondary',
  'default',
  'tertiary',
  'ghost',
  'success',
  'success-soft',
  'warning',
  'warning-soft',
  'danger',
  'danger-soft',
]

const SIZES: BadgeSize[] = ['sm', 'md', 'lg']

const PLACEMENTS: BadgePlacement[] = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
]

/** One accent that takes black ink, two that take white. */
const ACCENTS: TramAccentName[] = ['lime', 'magenta', 'cobalt']

/**
 * Where the Tram `Badge` is verified, in dark and in light: on a thumbnail, the eleven
 * names, the sizes and the dot, the four corners, and colour.
 */
export default function TramBadgeScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="sur une vignette"
        note="Un rectangle net, posé à ras du coin, sans déborder. Sur une vignette de l'accent il se fond : il ne reste que le chiffre, comme sur une tuile Metro."
      >
        <Row>
          <View>
            <Avatar size="lg">ik</Avatar>
            <Badge placement="top-end">3</Badge>
          </View>
          <View>
            <Avatar size="lg" variant="flat">
              ms
            </Avatar>
            <Badge placement="top-end" isDot />
          </View>
          <View>
            <Avatar size="lg" variant="outline">
              at
            </Avatar>
            <Badge placement="bottom-end" variant="danger" size="sm">
              99+
            </Badge>
          </View>
        </Row>
      </TramSection>

      <TramSection
        title="les onze noms"
        note="Ceux de Native, chacun un aplat. primary par défaut : l'accent, là où Native met danger."
      >
        <Wrap>
          {VARIANTS.map(variant => (
            <View key={variant} style={{ alignItems: 'center', gap: 4 }}>
              <Badge variant={variant}>12</Badge>
              <Typography variant="caption" color={theme.colors.muted}>
                {variant}
              </Typography>
            </View>
          ))}
        </Wrap>
      </TramSection>

      <TramSection
        title="les tailles"
        note="16, 20, 24 de haut ; le point 6, 8, 10."
      >
        <Row>
          {SIZES.map(size => (
            <Badge key={size} size={size}>
              7
            </Badge>
          ))}
          {SIZES.map(size => (
            <Badge key={`dot-${size}`} size={size} isDot />
          ))}
        </Row>
      </TramSection>

      <TramSection
        title="les quatre coins"
        note="placement épingle le badge dans un coin du parent positionné, start et end selon le sens de lecture."
      >
        <View
          style={{
            height: 96,
            backgroundColor: theme.colors.surface,
            alignSelf: 'stretch',
          }}
        >
          {PLACEMENTS.map(placement => (
            <Badge key={placement} placement={placement} variant="tertiary">
              {placement}
            </Badge>
          ))}
        </View>
      </TramSection>

      <TramSection
        title="la couleur"
        note="lime, magenta, cobalt, puis une couleur brute — pleins, puis au trait (tertiary)."
      >
        <Row>
          {ACCENTS.map(accent => (
            <Badge key={accent} accent={accent}>
              24
            </Badge>
          ))}
          <Badge color="#7c3aed">24</Badge>
        </Row>
        <Row>
          {ACCENTS.map(accent => (
            <Badge key={accent} variant="tertiary" accent={accent}>
              24
            </Badge>
          ))}
          <Badge variant="tertiary" color="#7c3aed">
            24
          </Badge>
        </Row>
      </TramSection>
    </ScrollView>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      {children}
    </View>
  )
}

function Wrap({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {children}
    </View>
  )
}
