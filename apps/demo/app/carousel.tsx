import { ScrollView, Text, View } from 'react-native'
import { Carousel } from '@xaui/native/carousel'
import type { CarouselSize, CarouselVariant } from '@xaui/native/carousel'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: CarouselVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: CarouselSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * Painted panels rather than photographs, and on purpose: what is verified here is the
 * component — the slide's width, its corner, where it snaps, what the indicator does — and
 * a screen that needs the network to show any of that is a screen that lies when it is
 * offline. The colours are flat so a clipped corner is obvious at a glance.
 */
const PHOTOS = [
  { id: 'cactus', label: 'Un', color: '#38bdf8' },
  { id: 'chair', label: 'Deux', color: '#f472b6' },
  { id: 'coat', label: 'Trois', color: '#fbbf24' },
  { id: 'oranges', label: 'Quatre', color: '#34d399' },
  { id: 'avocado', label: 'Cinq', color: '#a78bfa' },
]

const STEPS = ['Discover', 'Develop', 'Deliver', 'Measure', 'Iterate']

/**
 * The verification screen for the `Carousel`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function CarouselScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Le cas par défaut"
        note="Une slide à la fois, les deux flèches par-dessus, les points en dessous. La pastille active suit le doigt pendant le geste plutôt que de sauter au relâchement — à vérifier en faisant glisser lentement."
      >
        <Carousel>
          <Carousel.Content>
            {PHOTOS.map(photo => (
              <Carousel.Item key={photo.id}>
                <Panel photo={photo} height={200} />
              </Carousel.Item>
            ))}
          </Carousel.Content>

          <Carousel.Previous accessibilityLabel="Photo précédente" />
          <Carousel.Next accessibilityLabel="Photo suivante" />
          <Carousel.Indicator />
        </Carousel>
      </Section>

      <Section
        title="Plusieurs slides, et les voisines qui dépassent"
        note="itemsPerView dit combien de slides entières tiennent, peek dit ce qu'on voit de la suivante. La largeur d'une slide vient de celle de la piste, jamais d'une prop : une slide donnée en points est une slide fausse à la taille d'écran d'après."
      >
        <Carousel itemsPerView={1} peek={28}>
          <Carousel.Content>
            {STEPS.map((step, index) => (
              <Carousel.Item key={step}>
                <View
                  style={{
                    height: 160,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.surfaceSecondary,
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: theme.fontSizes.lg,
                      fontWeight: theme.fontWeights.semibold,
                    }}
                  >
                    {step}
                  </Text>
                  <Text style={{ color: theme.colors.muted }}>
                    Slide {index + 1}
                  </Text>
                </View>
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Indicator />
        </Carousel>
      </Section>

      <Section
        title="Deux à la fois"
        note="Le même calcul avec itemsPerView à 2 : la piste se divise en deux slides et un écart, et les points comptent toujours les slides et non les vues."
      >
        <Carousel itemsPerView={2} size="sm">
          <Carousel.Content>
            {PHOTOS.map(photo => (
              <Carousel.Item key={photo.id}>
                <Panel photo={photo} height={120} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Indicator />
        </Carousel>
      </Section>

      <Section
        title="Autoplay"
        note="Avance toutes les 2,5 secondes et s'arrête à la première interaction, pour de bon. Un carrousel qui repart sous un lecteur qui l'a pris en main est un carrousel qui lui résiste."
      >
        <Carousel autoPlayInterval={2500}>
          <Carousel.Content>
            {PHOTOS.map(photo => (
              <Carousel.Item key={photo.id}>
                <Panel photo={photo} height={180} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Indicator />
        </Carousel>
      </Section>

      <Section
        title="Un indicateur composé"
        note="Indicator sans enfants dessine un point par slide. Avec des enfants c'est la forme longue : les points, puis le compteur, qui est ce dont une longue série a besoin et que vingt points ne donnent pas."
      >
        <Carousel>
          <Carousel.Content>
            {PHOTOS.map(photo => (
              <Carousel.Item key={photo.id}>
                <Panel photo={photo} height={180} />
              </Carousel.Item>
            ))}
          </Carousel.Content>

          <Carousel.Indicator style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {PHOTOS.map((photo, index) => (
                <Carousel.Dot key={photo.id} index={index} />
              ))}
            </View>
            <Carousel.Counter />
          </Carousel.Indicator>
        </Carousel>
      </Section>

      <Section
        title="Des vignettes"
        note="Un indicateur qui montre ce qu'il désigne — la seule chose que des points ne savent pas faire. L'anneau autour de la vignette choisie est toujours dessiné et seule sa couleur bouge, sinon chaque sélection décalerait la bande."
      >
        <Carousel>
          <Carousel.Content>
            {PHOTOS.map(photo => (
              <Carousel.Item key={photo.id}>
                <Panel photo={photo} height={180} />
              </Carousel.Item>
            ))}
          </Carousel.Content>

          <Carousel.Thumbnails>
            {PHOTOS.map((photo, index) => (
              <Carousel.Thumbnail key={photo.id} index={index}>
                <Panel photo={photo} />
              </Carousel.Thumbnail>
            ))}
          </Carousel.Thumbnails>
        </Carousel>
      </Section>

      <Section
        title="Les flèches bouclent, ou s'arrêtent"
        note="Sans hasLoop, la flèche du bout reste en place et s'éteint : une commande qui disparaît à la dernière slide emporte sa largeur et décale tout ce qui est à côté. L'autoplay boucle toujours, lui — hasLoop parle de ce que fait une flèche, et un autoplay qui s'arrête au bout est un autoplay qui meurt en silence."
      >
        <Carousel hasLoop>
          <Carousel.Content>
            {PHOTOS.map(photo => (
              <Carousel.Item key={photo.id}>
                <Panel photo={photo} height={140} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous accessibilityLabel="Photo précédente" />
          <Carousel.Next accessibilityLabel="Photo suivante" />
          <Carousel.Indicator />
        </Carousel>
      </Section>

      <Section
        title="Les variantes peignent les commandes, jamais les slides"
        note="Un carrousel de photos et un carrousel de cartes veulent l'inverse à l'intérieur d'une slide, et c'est l'appelant qui sait lequel c'est. ghost n'a pas de fond du tout : c'est ce qu'il faut au-dessus d'une photo sombre et ce qu'il ne faut surtout pas au-dessus d'une claire."
      >
        {VARIANTS.map(variant => (
          <Carousel key={variant} variant={variant} size="sm">
            <Carousel.Content>
              {PHOTOS.slice(0, 3).map(photo => (
                <Carousel.Item key={photo.id}>
                  <Panel photo={photo} height={110} />
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Previous accessibilityLabel="Précédente" />
            <Carousel.Next accessibilityLabel="Suivante" />
            <Carousel.Indicator />
          </Carousel>
        ))}
      </Section>

      <Section
        title="Les tailles bougent les commandes et les écarts"
        note="Jamais une slide : la largeur d'une slide vient de la piste, la hauteur de ce qu'on y met."
      >
        {SIZES.map(size => (
          <Carousel key={size} size={size}>
            <Carousel.Content>
              {PHOTOS.slice(0, 3).map(photo => (
                <Carousel.Item key={photo.id}>
                  <Panel photo={photo} height={110} />
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Previous accessibilityLabel="Précédente" />
            <Carousel.Next accessibilityLabel="Suivante" />
            <Carousel.Indicator />
          </Carousel>
        ))}
      </Section>

      <Section
        title="Une teinte, sur les commandes"
        note="color est une valeur brute (R7) et va là où la variante a posé ses rôles : la pastille active et le chevron. Les points au repos gardent leur gris — ils sont le fond sur lequel la pastille voyage."
      >
        <Carousel color="#e11d48">
          <Carousel.Content>
            {PHOTOS.map(photo => (
              <Carousel.Item key={photo.id}>
                <Panel photo={photo} height={140} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous accessibilityLabel="Précédente" />
          <Carousel.Next accessibilityLabel="Suivante" />
          <Carousel.Indicator />
        </Carousel>
      </Section>

      <Section
        title="Désactivé"
        note="La piste ne défile plus, les flèches et les points ne répondent plus, et l'ensemble s'estompe d'un bloc."
      >
        <Carousel isDisabled>
          <Carousel.Content>
            {PHOTOS.map(photo => (
              <Carousel.Item key={photo.id}>
                <Panel photo={photo} height={120} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous accessibilityLabel="Précédente" />
          <Carousel.Next accessibilityLabel="Suivante" />
          <Carousel.Indicator />
        </Carousel>
      </Section>
    </ScrollView>
  )
}

/** One slide, or one thumbnail when it is given no height: a flat colour and its number. */
function Panel({
  photo,
  height,
}: {
  photo: (typeof PHOTOS)[number]
  height?: number
}) {
  return (
    <View
      style={{
        height: height ?? '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: photo.color,
      }}
    >
      <Text style={{ color: '#0b0b0f', fontWeight: '600' }}>{photo.label}</Text>
    </View>
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
