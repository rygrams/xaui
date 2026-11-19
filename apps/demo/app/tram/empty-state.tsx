import { ScrollView } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { EmptyState } from '@xaui/tram/empty-state'
import type { EmptyStateSize, EmptyStateVariant } from '@xaui/tram/empty-state'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const VARIANTS: EmptyStateVariant[] = ['plain', 'surface', 'outlined']

const SIZES: EmptyStateSize[] = ['sm', 'md', 'lg']

const ACCENTS: TramAccentName[] = ['lime', 'magenta']

/**
 * Where the Tram `EmptyState` is verified, in dark and in light: the empty list, the
 * three grounds, the sizes, the square in another colour.
 */
export default function TramEmptyStateScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="une liste vide"
        note="Au début de la page, comme Metro : un carré d'accent, le titre en title, le détail estompé, puis le Button outline."
      >
        <EmptyState>
          <EmptyState.Header>
            <EmptyState.Media variant="icon">
              <Icon as={FolderIcon} />
            </EmptyState.Media>
            <EmptyState.Title>aucun fichier</EmptyState.Title>
            <EmptyState.Description>
              {"Les fichiers importés ou reçus par mail s'affichent ici."}
            </EmptyState.Description>
          </EmptyState.Header>
          <EmptyState.Content>
            <Button variant="outline">importer</Button>
          </EmptyState.Content>
        </EmptyState>
      </TramSection>

      <TramSection
        title="les trois fonds"
        note="plain sur la page (par défaut), surface la surface discrète, outlined un trait plein de 2 en muted — pas de tirets."
      >
        {VARIANTS.map(variant => (
          <EmptyState key={variant} variant={variant} size="sm">
            <EmptyState.Header>
              <EmptyState.Media variant="icon">
                <Icon as={FolderIcon} />
              </EmptyState.Media>
              <EmptyState.Title>{variant}</EmptyState.Title>
              <EmptyState.Description>Rien à restaurer.</EmptyState.Description>
            </EmptyState.Header>
          </EmptyState>
        ))}
      </TramSection>

      <TramSection
        title="les tailles"
        note="Un carré de 40, 56, 72 — celui de l'Avatar ; le titre en subtitle, title, section."
      >
        {SIZES.map(size => (
          <EmptyState key={size} size={size} variant="outlined">
            <EmptyState.Header>
              <EmptyState.Media variant="icon">
                <Icon as={FolderIcon} />
              </EmptyState.Media>
              <EmptyState.Title>taille {size}</EmptyState.Title>
              <EmptyState.Description>25 Mo au plus.</EmptyState.Description>
            </EmptyState.Header>
            <EmptyState.Content>
              <Button variant="outline" size={size}>
                importer
              </Button>
            </EmptyState.Content>
          </EmptyState>
        ))}
      </TramSection>

      <TramSection
        title="sans carré"
        note="Media plain : le glyphe reste sur la page, en muted."
      >
        <EmptyState variant="surface">
          <EmptyState.Header>
            <EmptyState.Media>
              <Icon as={FolderIcon} />
            </EmptyState.Media>
            <EmptyState.Title>corbeille vide</EmptyState.Title>
          </EmptyState.Header>
        </EmptyState>
      </TramSection>

      <TramSection
        title="la couleur"
        note="lime et magenta sur le carré — l'encre suit : noir sur lime. Puis une couleur brute. Les mots ne changent pas."
      >
        {ACCENTS.map(accent => (
          <EmptyState key={accent} accent={accent} size="sm">
            <EmptyState.Header>
              <EmptyState.Media variant="icon">
                <Icon as={FolderIcon} />
              </EmptyState.Media>
              <EmptyState.Title>{accent}</EmptyState.Title>
            </EmptyState.Header>
          </EmptyState>
        ))}
        <EmptyState color="#7c3aed" size="sm">
          <EmptyState.Header>
            <EmptyState.Media variant="icon">
              <Icon as={FolderIcon} />
            </EmptyState.Media>
            <EmptyState.Title>couleur brute</EmptyState.Title>
          </EmptyState.Header>
        </EmptyState>
      </TramSection>
    </ScrollView>
  )
}

function FolderIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 6h7l2 2h9v11H3z" stroke={color} strokeWidth={2} />
    </Svg>
  )
}
