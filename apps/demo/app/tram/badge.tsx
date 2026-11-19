import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Avatar } from '@xaui/tram/avatar'
import { Badge } from '@xaui/tram/badge'
import type { BadgePlacement, BadgeSize, BadgeVariant } from '@xaui/tram/badge'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const VARIANTS: BadgeVariant[] = ['contained', 'flat', 'outline', 'text']

const SIZES: BadgeSize[] = ['sm', 'md', 'lg']

const PLACEMENTS: BadgePlacement[] = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
]

/** What Native calls success, warning and danger: three of the twenty accents. */
const STATUSES: TramAccentName[] = ['green', 'amber', 'red']

/** One accent that takes black ink, two that take white. */
const ACCENTS: TramAccentName[] = ['lime', 'magenta', 'cobalt']

/**
 * Where the Tram `Badge` is verified, in dark and in light: on a thumbnail, the
 * `Button`'s four drawings, a status as a colour, the sizes and the dot, the corners.
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
        note="Un rectangle net, posé à ras du coin, sans déborder. Sur une vignette de l'accent, un badge text ne garde que le chiffre, comme une tuile Metro."
      >
        <Row>
          <View>
            <Avatar size="lg">ik</Avatar>
            <Badge
              placement="top-end"
              variant="text"
              color={theme.colors.accentForeground}
            >
              3
            </Badge>
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
            <Badge placement="bottom-end" accent="red" size="sm">
              99+
            </Badge>
          </View>
        </Row>
      </TramSection>

      <TramSection
        title="les quatre dessins"
        note="Ceux du Button : contained (par défaut), flat, outline, text. Dans l'accent du thème."
      >
        <Row>
          {VARIANTS.map(variant => (
            <View key={variant} style={{ alignItems: 'center', gap: 4 }}>
              <Badge variant={variant}>12</Badge>
              <Typography variant="caption" color={theme.colors.muted}>
                {variant}
              </Typography>
            </View>
          ))}
        </Row>
      </TramSection>

      <TramSection
        title="un statut est une couleur"
        note="green, amber et red pour ce que Native appelle success, warning et danger — dessinés de quatre façons."
      >
        {VARIANTS.map(variant => (
          <Row key={variant}>
            {STATUSES.map(accent => (
              <Badge key={accent} variant={variant} accent={accent}>
                {accent === 'red' ? '99+' : '4'}
              </Badge>
            ))}
          </Row>
        ))}
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
          <Badge isDot variant="outline" />
          <Badge isDot variant="text" />
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
            <Badge key={placement} placement={placement} variant="outline">
              {placement}
            </Badge>
          ))}
        </View>
      </TramSection>

      <TramSection
        title="la couleur"
        note="lime, magenta, cobalt, puis une couleur brute, dans les quatre dessins."
      >
        {VARIANTS.map(variant => (
          <Row key={variant}>
            {ACCENTS.map(accent => (
              <Badge key={accent} variant={variant} accent={accent}>
                24
              </Badge>
            ))}
            <Badge variant={variant} color="#7c3aed">
              24
            </Badge>
          </Row>
        ))}
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
