import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Carousel } from '@xaui/tram/carousel'
import type { CarouselSize } from '@xaui/tram/carousel'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: CarouselSize[] = ['sm', 'md', 'lg']

/** One that takes black on it, and two that take white. */
const ACCENTS: TramAccentName[] = ['lime', 'magenta', 'cobalt']

/**
 * Flat panels in their own colours rather than photographs: the slides are the caller's,
 * so they keep these whatever the accent — which is the point to check — and a clipped
 * edge shows at a glance. No network needed.
 */
const PLACES = [
  { id: 'lisbonne', note: 'mars · 24 photos', color: '#FA6800' },
  { id: 'oslo', note: 'janvier · 9 photos', color: '#0050EF' },
  { id: 'kyoto', note: 'avril · 41 photos', color: '#D80073' },
  { id: 'dakar', note: 'août · 17 photos', color: '#008A00' },
  { id: 'lima', note: 'octobre · 30 photos', color: '#6A00FF' },
]

type Place = (typeof PLACES)[number]

/** What is written on a picture: white, whatever the theme — a slide is not the theme's. */
const PICTURE_INK = '#FFFFFF'

/**
 * Where the Tram `Carousel` is verified, in dark and in light, and with reduced motion
 * (an arrow then puts the track on its slide at once): arrows, squares and autoplay; peek,
 * counter and thumbnails; several slides at once and looping arrows; the three sizes;
 * named accents and a raw `color` on the bar; disabled.
 */
export default function TramCarouselScreen() {
  const theme = useXAUITheme()
  const [index, setIndex] = useState(0)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="flèches et carrés"
        note="Glisser, ou les flèches : un carré du fond de la page, la taille d'une touche, posé à 8 du bord. Au bout, sans boucle, la flèche reste et son chevron passe en gris. Le carré actif s'allonge en barre et suit le doigt. Défile seul toutes les 3,2 s jusqu'au premier geste."
      >
        <Carousel autoPlayInterval={3200}>
          <Carousel.Content>
            {PLACES.map(place => (
              <Carousel.Item key={place.id}>
                <Slide place={place} height={176} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous accessibilityLabel="photo précédente" />
          <Carousel.Next accessibilityLabel="photo suivante" />
          <Carousel.Indicator />
        </Carousel>
      </TramSection>

      <TramSection
        title="peek, compteur, vignettes"
        note="Sans flèches : la voisine dépasse de 32. Le compteur en chiffres tabulaires, le total en gris. La vignette choisie est cernée comme une couleur du ColorPicker — l'anneau est toujours là, seule sa couleur change."
      >
        <Carousel peek={32}>
          <Carousel.Content>
            {PLACES.map(place => (
              <Carousel.Item key={place.id}>
                <Slide place={place} height={132} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Counter />
          <Carousel.Thumbnails>
            {PLACES.map((place, at) => (
              <Carousel.Thumbnail key={place.id} index={at}>
                <View style={{ flex: 1, backgroundColor: place.color }} />
              </Carousel.Thumbnail>
            ))}
          </Carousel.Thumbnails>
        </Carousel>
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`index vient de l'écran : les carrés au début, le compteur au bout de la même ligne. Slide ${index + 1}.`}
      >
        <Carousel index={index} onIndexChange={setIndex}>
          <Carousel.Content>
            {PLACES.map(place => (
              <Carousel.Item key={place.id}>
                <Slide place={place} height={132} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous accessibilityLabel="photo précédente" />
          <Carousel.Next accessibilityLabel="photo suivante" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Carousel.Indicator />
            <Carousel.Counter />
          </View>
        </Carousel>
      </TramSection>

      <TramSection
        title="deux à la fois, en boucle"
        note="itemsPerView={2} : la piste se partage en deux slides et un écart. hasLoop : les flèches passent du dernier au premier."
      >
        <Carousel itemsPerView={2} hasLoop>
          <Carousel.Content>
            {PLACES.map(place => (
              <Carousel.Item key={place.id}>
                <Slide place={place} height={112} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous accessibilityLabel="précédentes" />
          <Carousel.Next accessibilityLabel="suivantes" />
          <Carousel.Indicator />
        </Carousel>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — des flèches et des vignettes de 32, 40 et 48, des carrés de 6, 8 et 10, un écart de 8, 12 et 16 entre les slides. Jamais une slide."
      >
        {SIZES.map(size => (
          <Carousel key={size} size={size} peek={24}>
            <Carousel.Content>
              {PLACES.map(place => (
                <Carousel.Item key={place.id}>
                  <Slide place={place} height={96} />
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Previous accessibilityLabel="précédente" />
            <Carousel.Next accessibilityLabel="suivante" />
            <Carousel.Indicator />
            <Carousel.Thumbnails>
              {PLACES.map((place, at) => (
                <Carousel.Thumbnail key={place.id} index={at}>
                  <View style={{ flex: 1, backgroundColor: place.color }} />
                </Carousel.Thumbnail>
              ))}
            </Carousel.Thumbnails>
          </Carousel>
        ))}
      </TramSection>

      <TramSection
        title="accent et color"
        note="La barre seule prend l'accent nommé, puis une teinte brute — le danger du thème. Les slides gardent leurs couleurs."
      >
        {ACCENTS.map(accent => (
          <Carousel key={accent} accent={accent} defaultIndex={1}>
            <Carousel.Content>
              {PLACES.slice(0, 3).map(place => (
                <Carousel.Item key={place.id}>
                  <Slide place={place} height={80} />
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Indicator />
          </Carousel>
        ))}
        <Carousel color={theme.colors.danger}>
          <Carousel.Content>
            {PLACES.slice(0, 3).map(place => (
              <Carousel.Item key={place.id}>
                <Slide place={place} height={80} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Indicator />
        </Carousel>
      </TramSection>

      <TramSection
        title="désactivé"
        note="La piste ne défile plus, rien ne répond, la barre perd l'accent et l'ensemble s'estompe."
      >
        <Carousel isDisabled>
          <Carousel.Content>
            {PLACES.map(place => (
              <Carousel.Item key={place.id}>
                <Slide place={place} height={112} />
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Previous accessibilityLabel="précédente" />
          <Carousel.Next accessibilityLabel="suivante" />
          <Carousel.Indicator />
        </Carousel>
      </TramSection>
    </ScrollView>
  )
}

/** A slide of the caller's: a flat colour, the place's name and a note, in white. */
function Slide({ place, height }: { place: Place; height: number }) {
  return (
    <View
      style={{
        height,
        padding: 16,
        justifyContent: 'flex-end',
        backgroundColor: place.color,
      }}
    >
      <Typography variant="section" color={PICTURE_INK}>
        {place.id}
      </Typography>
      {height > 100 ? (
        <Typography variant="caption" color={PICTURE_INK}>
          {place.note}
        </Typography>
      ) : null}
    </View>
  )
}
