import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Slider } from '@xaui/tram/slider'
import type { SliderSize, SliderValue } from '@xaui/tram/slider'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const SIZES: SliderSize[] = ['sm', 'md', 'lg']

/** The three that are too light to read as a line on white, and two that are not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

const STARTS: Record<SliderSize, number> = { sm: 30, md: 55, lg: 70 }

/**
 * Where the Tram `Slider` is verified, in dark and in light: the three sizes, a touch and
 * a drag, controlled and not, a range, a step of 10 and none, vertical, disabled, named
 * accents, a raw `color`, and a formatted `Slider.Output`.
 */
export default function TramSliderScreen() {
  const theme = useXAUITheme()
  const [volume, setVolume] = useState<SliderValue>(40)
  const [changes, setChanges] = useState(0)
  const [committed, setCommitted] = useState<SliderValue>(50)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les tailles"
        note="sm, md, lg — le curseur est celui du Switch, taille pour taille. La cible tactile atteint 48 partout."
      >
        {SIZES.map(size => (
          <Slider key={size} size={size} defaultValue={STARTS[size]}>
            <Slider.Output>{value => `${size} · ${value}`}</Slider.Output>
            <Plain label={size} />
          </Slider>
        ))}
      </TramSection>

      <TramSection
        title="toucher et glisser"
        note={`Toucher la piste y amène le curseur, glisser le déplace. onValueChange : ${changes} · onValueCommit : ${String(committed)}`}
      >
        <Slider
          size="lg"
          defaultValue={50}
          onValueChange={() => setChanges(count => count + 1)}
          onValueCommit={setCommitted}
        >
          <Plain label="toucher et glisser" />
        </Slider>
      </TramSection>

      <TramSection
        title="non contrôlé"
        note="defaultValue : le slider garde sa propre valeur."
      >
        <Slider defaultValue={25}>
          <Slider.Output />
          <Plain label="non contrôlé" />
        </Slider>
      </TramSection>

      <TramSection
        title="contrôlé"
        note="Deux sliders sur la même valeur, et des boutons qui la changent de l'extérieur."
      >
        <Slider value={volume} onValueChange={setVolume}>
          <Slider.Output>{value => `volume ${value}`}</Slider.Output>
          <Plain label="volume" />
        </Slider>
        <Slider size="sm" value={volume} onValueChange={setVolume}>
          <Plain label="le même volume" />
        </Slider>
        <Row>
          <Button variant="outline" size="sm" onPress={() => setVolume(0)}>
            0
          </Button>
          <Button variant="outline" size="sm" onPress={() => setVolume(50)}>
            50
          </Button>
          <Button variant="outline" size="sm" onPress={() => setVolume(100)}>
            100
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="une plage"
        note="Une paire fait deux curseurs, qui ne se croisent pas ; le remplissage est entre eux."
      >
        <Slider defaultValue={[20, 60]}>
          <Slider.Output />
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb index={0} accessibilityLabel="minimum" />
            <Slider.Thumb index={1} accessibilityLabel="maximum" />
          </Slider.Track>
        </Slider>
      </TramSection>

      <TramSection
        title="le pas"
        note="Un pas de 10 : le curseur rejoint chaque cran sur le ressort. Un pas de 0 : continu, sous le doigt."
      >
        <Slider defaultValue={40} step={10}>
          <Slider.Output>{value => `pas de 10 · ${value}`}</Slider.Output>
          <Plain label="pas de 10" />
        </Slider>
        <Slider defaultValue={0.5} min={0} max={1} step={0}>
          <Slider.Output>
            {value => `continu · ${(value as number).toFixed(3)}`}
          </Slider.Output>
          <Plain label="continu" />
        </Slider>
      </TramSection>

      <TramSection
        title="vertical"
        note="Compté depuis le bas ; le curseur est couché. Une plage aussi."
      >
        <Row>
          <Slider orientation="vertical" defaultValue={60}>
            <Plain label="vertical" />
            <Slider.Output />
          </Slider>
          <Slider orientation="vertical" size="lg" defaultValue={[20, 70]} step={10}>
            <Slider.Track height={160}>
              <Slider.Fill />
              <Slider.Thumb index={0} accessibilityLabel="bas" />
              <Slider.Thumb index={1} accessibilityLabel="haut" />
            </Slider.Track>
            <Slider.Output />
          </Slider>
        </Row>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Piste, remplissage et curseur gris, sans accent — et rien ne bouge."
      >
        <Slider isDisabled defaultValue={45}>
          <Slider.Output />
          <Plain label="désactivé" />
        </Slider>
        <Slider isDisabled accent="magenta" defaultValue={[30, 80]}>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb index={0} accessibilityLabel="minimum désactivé" />
            <Slider.Thumb index={1} accessibilityLabel="maximum désactivé" />
          </Slider.Track>
        </Slider>
      </TramSection>

      <TramSection
        title="accent"
        note="Le remplissage est un aplat : la vraie couleur, même le jaune sur blanc."
      >
        {ACCENTS.map((accent, index) => (
          <Slider key={accent} accent={accent} defaultValue={30 + index * 12}>
            <Plain label={accent} />
          </Slider>
        ))}
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette — ici le danger du thème. Elle l'emporte sur accent."
      >
        <Slider color={theme.colors.danger} accent="lime" defaultValue={65}>
          <Plain label="color" />
        </Slider>
      </TramSection>

      <TramSection
        title="output formaté"
        note="Slider.Output reçoit la valeur : une durée, une plage de prix."
      >
        <Slider defaultValue={80} min={0} max={240} step={5}>
          <Slider.Output>{value => duration(value as number)}</Slider.Output>
          <Plain label="durée" />
        </Slider>
        <Slider defaultValue={[150, 600]} min={0} max={1000} step={50} accent="teal">
          <Slider.Output>
            {value => {
              const [from, to] = value as readonly [number, number]
              return `de ${from} € à ${to} €`
            }}
          </Slider.Output>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb
              index={0}
              accessibilityLabel="prix minimum"
              accessibilityValueText={price => `${price} euros`}
            />
            <Slider.Thumb
              index={1}
              accessibilityLabel="prix maximum"
              accessibilityValueText={price => `${price} euros`}
            />
          </Slider.Track>
        </Slider>
      </TramSection>

      <TramSection
        title="props de style"
        note="Toute clé de ViewStyle est une prop, sur la racine comme sur les slots. asChild : la racine est l'élément de l'appelant."
      >
        <Slider defaultValue={35} width="60%" opacity={0.7} radius="xs">
          <Plain label="étroit, à 70 %" />
        </Slider>
        <Slider asChild defaultValue={60} accent="orange">
          <View testID="slider-as-child" style={{ paddingVertical: 8 }}>
            <Slider.Output>{value => `asChild · ${value}`}</Slider.Output>
            <Plain label="asChild" />
          </View>
        </Slider>
      </TramSection>
    </ScrollView>
  )
}

/** The track of a plain slider: the fill and its one thumb. */
function Plain({ label }: { label: string }) {
  return (
    <Slider.Track>
      <Slider.Fill />
      <Slider.Thumb accessibilityLabel={label} />
    </Slider.Track>
  )
}

function duration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = String(minutes % 60).padStart(2, '0')

  return hours > 0 ? `${hours} h ${rest}` : `${minutes} min`
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 32,
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  )
}
