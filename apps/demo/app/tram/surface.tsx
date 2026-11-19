import { ScrollView } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Surface } from '@xaui/tram/surface'
import type { SurfaceSize, SurfaceVariant } from '@xaui/tram/surface'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const VARIANTS: SurfaceVariant[] = ['primary', 'secondary']

const SIZES: SurfaceSize[] = ['sm', 'md', 'lg']

/**
 * Where the Tram `Surface` is verified, in dark and in light: the two grounds, one inside
 * the other, every size, and painted by a named accent and a raw colour.
 */
export default function TramSurfaceScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="les deux sols"
        note="primary : la surface discrète. secondary : la page dans le trait du thème, 3. Aucune ombre."
      >
        {VARIANTS.map(variant => (
          <Surface key={variant} variant={variant}>
            <Typography variant="body">{variant}</Typography>
            <Typography variant="caption" color={theme.colors.muted}>
              un sol pour poser du contenu
            </Typography>
          </Surface>
        ))}
      </TramSection>

      <TramSection
        title="l'un dans l'autre"
        note="Un secondary dans un primary : la surface dedans est tracée par son trait."
      >
        <Surface>
          <Typography variant="body">primary</Typography>
          <Surface variant="secondary" size="sm">
            <Typography variant="caption">secondary</Typography>
          </Surface>
        </Surface>
      </TramSection>

      <TramSection
        title="les tailles"
        note="12, 16 et 20 de marge intérieure. La hauteur est celle du contenu."
      >
        {SIZES.map(size => (
          <Surface key={size} size={size}>
            <Typography variant="body">{size}</Typography>
          </Surface>
        ))}
      </TramSection>

      <TramSection
        title="en couleur"
        note="Un accent nommé remplit primary de sa vraie couleur ; sur secondary il est le trait, en encre. Puis une couleur brute."
      >
        <Surface accent="cobalt">
          <Typography variant="body" color="#FFFFFF">
            primary, cobalt
          </Typography>
        </Surface>
        <Surface accent="lime">
          <Typography variant="body" color="#000000">
            primary, lime
          </Typography>
        </Surface>
        <Surface variant="secondary" accent="yellow">
          <Typography variant="body">
            secondary, yellow : le trait lisible en clair
          </Typography>
        </Surface>
        <Surface variant="secondary" color="#7c3aed">
          <Typography variant="body">secondary, brut</Typography>
        </Surface>
      </TramSection>
    </ScrollView>
  )
}
