import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Button } from '@xaui/native/button'
import { Rating } from '@xaui/native/rating'
import type { RatingSize, RatingVariant } from '@xaui/native/rating'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: RatingVariant[] = ['primary', 'secondary', 'tertiary']
const SIZES: RatingSize[] = ['xs', 'sm', 'md', 'lg']
const AVERAGES = [0, 1.5, 2.7, 4.3, 5]

/**
 * The verification screen for the `Rating`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it, only one for the pure fill
 * and snap functions.
 *
 * What each section checks is in its subtitle: a fill is a fraction so an average shows
 * part of a mark, a press rounds up so the first sliver is never zero, the glyph is written
 * once and drawn in both layers, the three variants name tokens and nothing else, `size`
 * moves the mark and the gap and never a width, and read-only announces the value on the row
 * instead of five buttons that do nothing.
 */
export default function RatingScreen() {
  const theme = useXAUITheme()
  const [score, setScore] = useState(3)
  const [halves, setHalves] = useState(2.5)
  const [hearts, setHearts] = useState(4)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Donner une note"
        note="Une pression lit où le doigt a atterri — locationX sur la largeur de la marque — et arrondit vers le haut : une pression n'importe où dans la première marque vaut une étoile, jamais zéro. Arrondir au plus proche ferait voter zéro à la première lamelle de chaque marque."
      >
        <Rating value={score} onValueChange={setScore} />
        <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
          {score} sur 5
        </Text>
      </Section>

      <Section
        title="Des demies"
        note="precision ne gouverne que la saisie : la moitié gauche de la troisième marque vaut 2,5 et la droite 3. Une valeur d'une précision quelconque s'affiche telle quelle, quoi que dise cette propriété."
      >
        <Rating value={halves} onValueChange={setHalves} precision={0.5} />
        <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
          {halves} sur 5
        </Text>
      </Section>

      <Section
        title="Une moyenne, en lecture seule"
        note="Le remplissage d'une marque est une fraction, pas un booléen : 4,3 montre trois dixièmes de la cinquième. Un booléen par marque aurait dû arrondir, et arrondir est exactement ce qu'une moyenne ne doit pas faire."
      >
        {AVERAGES.map(average => (
          <View
            key={average}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
          >
            <Rating value={average} isReadOnly />
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}
            >
              {average}
            </Text>
          </View>
        ))}
      </Section>

      <Section
        title="Une glyphe à soi"
        note="Écrite une fois et dessinée deux : la couche neutre décide de la largeur, la couche pleine est épinglée par-dessus dans un cadre coupé à la fraction. Laquelle des deux, c'est la couche qui le dit — pas une propriété — donc l'appelant n'a jamais deux copies à tenir d'accord."
      >
        <Rating value={hearts} onValueChange={setHearts} color="#e11d48">
          <Rating.Icon as={HeartIcon} />
        </Rating>

        <Rating value={3.4} isReadOnly color="#f59e0b" size="lg">
          <Rating.Icon as={FlameIcon} />
        </Rating>
      </Section>

      <Section
        title="Les trois variantes, et l'ambre"
        note="Elles nomment la couleur d'une marque pleine. L'ambre des boutiques n'est pas un token — ce n'est pas un rôle sur lequel le thème a un avis — c'est color. warning n'est volontairement pas proposé à sa place : c'est un statut, et un avis quatre étoiles n'est pas un avertissement."
      >
        {VARIANTS.map(variant => (
          <View
            key={variant}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
          >
            <Rating variant={variant} value={4} isReadOnly />
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}
            >
              {variant}
            </Text>
          </View>
        ))}

        <Rating value={4} isReadOnly color="#f59e0b" />
      </Section>

      <Section
        title="Les quatre tailles"
        note="size déplace la marque et l'écart, jamais une largeur : une marque est aussi large que la glyphe qui l'occupe. Les deux couches prennent la même taille — une couche pleine décalée d'un point montrerait un liseré de celle du dessous sur chaque bord."
      >
        {SIZES.map(size => (
          <View
            key={size}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
          >
            <Rating size={size} value={3.5} isReadOnly />
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}
            >
              {size}
            </Text>
          </View>
        ))}
      </Section>

      <Section
        title="Effaçable, sans propriété pour ça"
        note="Appuyer sur la marque déjà choisie pour revenir à rien est un geste que la moitié des composants ont et l'autre pas, donc ce n'est un défaut ni dans un sens ni dans l'autre. Qui le veut tient la valeur et compare — trois mots, et ça dit quel comportement il a choisi."
      >
        <Rating
          value={score}
          onValueChange={next => setScore(next === score ? 0 : next)}
        />

        <Button
          variant="tertiary"
          alignSelf="flex-start"
          onPress={() => setScore(0)}
        >
          Remettre à zéro
        </Button>
      </Section>

      <Section
        title="Sept marques, et désactivé"
        note="max dit combien il y en a, donc la racine les rend : sept marques écrites à la main sont une rangée qui se contredit dès qu'on touche à l'une des deux. isDisabled éteint la rangée entière."
      >
        <Rating max={7} value={5} isReadOnly />
        <Rating isDisabled value={3} />
      </Section>
    </ScrollView>
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

function HeartIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 21s-7.5-4.7-9.3-9A5.3 5.3 0 0112 5.6 5.3 5.3 0 0121.3 12c-1.8 4.3-9.3 9-9.3 9z" />
    </Svg>
  )
}

function FlameIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2c2 4-1 5-1 8a3 3 0 006 0c0-1 0-2-.5-3 2 2 3.5 4.5 3.5 7a8 8 0 01-16 0c0-5 4-8 8-12z" />
    </Svg>
  )
}
