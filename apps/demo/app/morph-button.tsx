import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Button } from '@xaui/native/button'
import { MorphButton, useMorphButton } from '@xaui/native/morph-button'
import type { MorphButtonSize, MorphButtonVariant } from '@xaui/native/morph-button'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: MorphButtonVariant[] = [
  'primary',
  'secondary',
  'default',
  'tertiary',
  'ghost',
  'danger',
  'danger-soft',
]

const SIZES: MorphButtonSize[] = ['sm', 'md', 'lg']

/**
 * The verification screen for the `MorphButton`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: one corner reads as a pill at the collapsed
 * height and as a card once open, the seven variants name tokens and nothing else, `size`
 * moves both insets and the type and never a width, a raw `color` lands where the variant
 * put its tokens, the morph is drivable from outside and from inside a face, and
 * `animation={false}` puts it in the other shape with no travel at all.
 */
export default function MorphButtonScreen() {
  const theme = useXAUITheme()
  const [driven, setDriven] = useState(false)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Une pilule qui devient une carte"
        note="Le bouton est la forme qui voyage : une seule face est montée à la fois, donc la boîte prend la taille de celle-là et la transition de layout l'anime entre les deux. Rien n'est mesuré. Appuyez sur la pilule."
      >
        <MorphButton alignSelf="flex-start">
          <MorphButton.Collapsed>
            <MorphButton.Label>Primary</MorphButton.Label>
          </MorphButton.Collapsed>

          <MorphButton.Expanded>
            <MorphButton.Title>Primary</MorphButton.Title>
            <MorphButton.Description>
              High-contrast inverted surface for floating buttons over app content.
            </MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>
      </Section>

      <Section
        title="Un seul rayon pour les deux formes"
        note="La moitié de la hauteur repliée : à cette hauteur c'est exactement une gélule, et sur la carte plus haute c'est un coin proportionné à l'échelle du contrôle. Deux clés de rayon auraient demandé un compound de size et radius."
      >
        {VARIANTS.map(variant => (
          <MorphButton key={variant} variant={variant} alignSelf="flex-start">
            <MorphButton.Collapsed>
              <MorphButton.Label>{variant}</MorphButton.Label>
            </MorphButton.Collapsed>

            <MorphButton.Expanded>
              <MorphButton.Title>{variant}</MorphButton.Title>
              <MorphButton.Description>
                Le titre et la phrase prennent le même premier plan que le label ; la
                phrase est la même couleur, en moins.
              </MorphButton.Description>
            </MorphButton.Expanded>
          </MorphButton>
        ))}
      </Section>

      <Section
        title="Les trois tailles"
        note="size déplace la hauteur repliée, les deux marges intérieures, les écarts, le coin et la typographie — jamais une largeur. xs est absent : une carte qui s'ouvre d'un contrôle de 32 points aurait moins de place que sa propre marge."
      >
        {SIZES.map(size => (
          <MorphButton
            key={size}
            size={size}
            variant="secondary"
            alignSelf="flex-start"
          >
            <MorphButton.Collapsed>
              <MorphButton.Label>{size}</MorphButton.Label>
            </MorphButton.Collapsed>

            <MorphButton.Expanded>
              <MorphButton.Title>Taille {size}</MorphButton.Title>
              <MorphButton.Description>
                La pilule a une hauteur fixe, la carte est aussi haute que ce
                qu&apos;elle contient.
              </MorphButton.Description>
            </MorphButton.Expanded>
          </MorphButton>
        ))}
      </Section>

      <Section
        title="Une marque, et un tint"
        note="Une seule taille de glyphe pour les deux formes : la marque est ce que l'œil suit à travers la métamorphose, et une marque qui changeait aussi de taille lirait comme une seconde animation. color est une valeur brute, dérivée en OKLab comme l'accent."
      >
        <MorphButton color="#7c3aed" alignSelf="flex-start">
          <MorphButton.Collapsed>
            <MorphButton.Icon as={SparkIcon} />
            <MorphButton.Label>Améliorer</MorphButton.Label>
          </MorphButton.Collapsed>

          <MorphButton.Expanded>
            <MorphButton.Icon as={SparkIcon} />
            <MorphButton.Title>Améliorer</MorphButton.Title>
            <MorphButton.Description>
              Le tint suit la variante : le fond d&apos;un primary, le label
              d&apos;un ghost, la bordure et le label d&apos;un tertiary.
            </MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>

        <MorphButton color="#7c3aed" variant="tertiary" alignSelf="flex-start">
          <MorphButton.Collapsed>
            <MorphButton.Icon as={SparkIcon} />
            <MorphButton.Label>Tertiary</MorphButton.Label>
          </MorphButton.Collapsed>

          <MorphButton.Expanded>
            <MorphButton.Title>Tertiary</MorphButton.Title>
            <MorphButton.Description>
              La bordure et le label prennent le tint, le fond reste transparent.
            </MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>
      </Section>

      <Section
        title="Piloté de l'extérieur, et de l'intérieur"
        note="isExpanded / defaultExpanded / onExpandedChange, contrôlé ou non, comme partout dans la librairie. useMorphButton().toggle est ce qu'une commande posée dans une face appelle, et il ne coûte aucun état."
      >
        <MorphButton
          isExpanded={driven}
          onExpandedChange={setDriven}
          variant="default"
          alignSelf="flex-start"
        >
          <MorphButton.Collapsed>
            <MorphButton.Label>Contrôlé</MorphButton.Label>
          </MorphButton.Collapsed>

          <MorphButton.Expanded>
            <MorphButton.Title>Contrôlé</MorphButton.Title>
            <MorphButton.Description>
              L&apos;état vit dehors ; le bouton dessous et la pression disent la
              même chose.
            </MorphButton.Description>
            <Close />
          </MorphButton.Expanded>
        </MorphButton>

        <Button
          variant="tertiary"
          alignSelf="flex-start"
          onPress={() => setDriven(current => !current)}
        >
          {driven ? 'Replier' : 'Déplier'}
        </Button>
      </Section>

      <Section
        title="Déplié au montage"
        note="defaultExpanded ouvre directement sur la carte. Les faces ne se fondent qu'à partir de la deuxième forme : Reanimated joue une animation d'entrée au premier montage aussi, et sans ça chaque bouton de l'écran apparaîtrait en fondu."
      >
        <MorphButton defaultExpanded variant="secondary" alignSelf="flex-start">
          <MorphButton.Collapsed>
            <MorphButton.Label>Replié</MorphButton.Label>
          </MorphButton.Collapsed>

          <MorphButton.Expanded>
            <MorphButton.Title>Déplié au montage</MorphButton.Title>
            <MorphButton.Description>
              Appuyez pour le replier.
            </MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>
      </Section>

      <Section
        title="Sans animation, et désactivé"
        note="animation={false} pose le bouton dans l'autre forme sans aucun voyage — la boîte saute et les faces s'échangent sans fondu. isDisabled le fige. L'objet retune le ressort : {stiffness, damping, mass}."
      >
        <MorphButton animation={false} variant="default" alignSelf="flex-start">
          <MorphButton.Collapsed>
            <MorphButton.Label>Sans voyage</MorphButton.Label>
          </MorphButton.Collapsed>

          <MorphButton.Expanded>
            <MorphButton.Title>Sans voyage</MorphButton.Title>
            <MorphButton.Description>
              Le changement de forme est instantané.
            </MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>

        <MorphButton
          animation={{ stiffness: 320, damping: 26, mass: 1 }}
          variant="default"
          alignSelf="flex-start"
        >
          <MorphButton.Collapsed>
            <MorphButton.Label>Ressort mou</MorphButton.Label>
          </MorphButton.Collapsed>

          <MorphButton.Expanded>
            <MorphButton.Title>Ressort mou</MorphButton.Title>
            <MorphButton.Description>
              Plus lent et plus ample que le ressort par défaut.
            </MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>

        <MorphButton isDisabled alignSelf="flex-start">
          <MorphButton.Collapsed>
            <MorphButton.Label>Figé</MorphButton.Label>
          </MorphButton.Collapsed>

          <MorphButton.Expanded>
            <MorphButton.Title>Inatteignable</MorphButton.Title>
            <MorphButton.Description>Ne répond pas.</MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>
      </Section>

      <Section
        title="Étiré, comme un Button"
        note="Il n'y a pas de fullWidth : sans alignSelf, la boîte remplit sa colonne dans les deux formes, ce qui est le comportement de RN et celui du Button. Le label reste centré dans la pilule."
      >
        <MorphButton variant="danger">
          <MorphButton.Collapsed>
            <MorphButton.Label>Supprimer le projet</MorphButton.Label>
          </MorphButton.Collapsed>

          <MorphButton.Expanded>
            <MorphButton.Title>Supprimer le projet</MorphButton.Title>
            <MorphButton.Description>
              Les quarante-deux fichiers qu&apos;il contient partent avec lui, et
              rien ne les rappelle.
            </MorphButton.Description>
          </MorphButton.Expanded>
        </MorphButton>
      </Section>
    </ScrollView>
  )
}

/** A control inside a face, written against the context — it costs no state of its own. */
function Close() {
  const { toggle } = useMorphButton()
  const theme = useXAUITheme()

  return (
    <Pressable onPress={toggle} hitSlop={12}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.sm,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        ← Replier
      </Text>
    </Pressable>
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
    <View style={{ gap: 12 }}>
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

function SparkIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
