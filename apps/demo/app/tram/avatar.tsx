import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Avatar } from '@xaui/tram/avatar'
import type { AvatarSize, AvatarVariant } from '@xaui/tram/avatar'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: AvatarSize[] = ['sm', 'md', 'lg']

const VARIANTS: AvatarVariant[] = ['contained', 'flat', 'outline']

/** One accent that takes black initials, two that take white ones. */
const ACCENTS: TramAccentName[] = ['lime', 'magenta', 'emerald']

const PHOTO = { uri: 'https://picsum.photos/seed/tram-avatar/200/200' }

const BROKEN = { uri: 'https://example.invalid/none.jpg' }

function PersonIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={2} />
      <Path d="M4 21c0-4 4-6 8-6s8 2 8 6" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

/**
 * Where the Tram `Avatar` is verified, in dark and in light: the Metro square at every
 * size, the three drawings, colour, a photo and one that never loads, a glyph, a circle.
 */
export default function TramAvatarScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="dans une liste"
        note="La vignette de Metro : un carré à angles vifs, les initiales découpées dans l'accent."
      >
        {['anna moreau', 'léo dubois', 'kim chen'].map(name => (
          <Row key={name}>
            <Avatar>{initialsOf(name)}</Avatar>
            <Typography variant="subtitle">{name}</Typography>
          </Row>
        ))}
      </TramSection>

      <TramSection title="les tailles" note="40, 56 et 72 de côté.">
        <Row>
          {SIZES.map(size => (
            <Avatar key={size} size={size}>
              am
            </Avatar>
          ))}
        </Row>
      </TramSection>

      <TramSection
        title="les dessins"
        note="contained, flat et outline — ceux du Button. Dans l'accent du thème, puis lime, magenta, emerald et une couleur brute."
      >
        {VARIANTS.map(variant => (
          <Row key={variant}>
            <Avatar variant={variant}>am</Avatar>
            {ACCENTS.map(accent => (
              <Avatar key={accent} variant={variant} accent={accent}>
                ld
              </Avatar>
            ))}
            <Avatar variant={variant} color="#7c3aed">
              kc
            </Avatar>
          </Row>
        ))}
      </TramSection>

      <TramSection
        title="une photo"
        note="La photo arrive sur la courbe Metro, par-dessus les initiales. La seconde ne charge jamais : les initiales restent."
      >
        <Row>
          <Avatar size="lg">
            <Avatar.Image source={PHOTO} />
            <Avatar.Fallback>am</Avatar.Fallback>
          </Avatar>
          <Avatar size="lg">
            <Avatar.Image source={BROKEN} />
            <Avatar.Fallback>ld</Avatar.Fallback>
          </Avatar>
        </Row>
      </TramSection>

      <TramSection
        title="un glyphe, un cercle"
        note="Un Icon dans Fallback prend la taille et l'encre sans qu'on les lui dise. radius='full' : un cercle, si l'appli le veut."
      >
        <Row>
          {VARIANTS.map(variant => (
            <Avatar key={variant} variant={variant}>
              <Avatar.Fallback>
                <Icon as={PersonIcon} />
              </Avatar.Fallback>
            </Avatar>
          ))}
          <Avatar radius="full" size="lg">
            <Avatar.Image source={PHOTO} />
            <Avatar.Fallback>am</Avatar.Fallback>
          </Avatar>
        </Row>
      </TramSection>
    </ScrollView>
  )
}

function initialsOf(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      {children}
    </View>
  )
}
