import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Rating } from '@xaui/tram/rating'
import type { RatingSize } from '@xaui/tram/rating'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: RatingSize[] = ['sm', 'md', 'lg']

/** A mark of the screen's own: a flat square, the tiles' shape. */
function SquareMark({ size = 24, color }: IconComponentProps) {
  const side = Math.round(size * 0.75)

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: side, height: side, backgroundColor: color }} />
    </View>
  )
}

/**
 * Where the Tram `Rating` is verified, in dark and in light: a rating given and held by
 * the screen, an average shown, the three sizes, halves, a named accent and a raw colour,
 * a mark of one's own, and disabled.
 */
export default function TramRatingScreen() {
  const theme = useXAUITheme()
  const [score, setScore] = useState(4)
  const [half, setHalf] = useState(2.5)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="une note"
        note="Les marques données en accent, les autres dans le gris du Skeleton. Un appui serre la marque et la remplit d'un coup."
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Rating
            value={score}
            onValueChange={setScore}
            accessibilityLabel="votre note"
          />
          <Typography variant="body" color={theme.colors.muted}>
            {`${score} sur 5`}
          </Typography>
        </View>
      </TramSection>

      <TramSection
        title="une moyenne"
        note="En lecture seule, 4,3 remplit trois dixièmes de la cinquième marque."
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Typography variant="section">4,3</Typography>
          <View style={{ gap: 4 }}>
            <Rating value={4.3} isReadOnly size="sm" />
            <Typography variant="caption" color={theme.colors.muted}>
              128 avis
            </Typography>
          </View>
        </View>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — des marques de 16, 24, 32."
      >
        {SIZES.map((size, index) => (
          <Rating key={size} size={size} value={3 + index * 0.5} isReadOnly />
        ))}
      </TramSection>

      <TramSection
        title="à la moitié"
        note="precision 0,5 : la moitié gauche d'une marque vaut une demie."
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Rating value={half} onValueChange={setHalf} precision={0.5} size="lg" />
          <Typography variant="body" color={theme.colors.muted}>
            {String(half).replace('.', ',')}
          </Typography>
        </View>
      </TramSection>

      <TramSection
        title="couleurs et marque"
        note="Un accent nommé, une couleur brute, et une marque de l'écran : un carré, la forme des tuiles."
      >
        <Rating accent="amber" defaultValue={3} />
        <Rating color={theme.colors.foreground} defaultValue={2} />
        <Rating accent="teal" defaultValue={4} size="lg">
          <Rating.Icon as={SquareMark} />
        </Rating>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Les marques données passent au gris ; aucun appui."
      >
        <Rating isDisabled defaultValue={3} />
      </TramSection>
    </ScrollView>
  )
}
