import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Switch, useSwitch } from '@xaui/tram/switch'
import type { SwitchSize } from '@xaui/tram/switch'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: SwitchSize[] = ['sm', 'md', 'lg']

/** The three that are too light to read as a line on white, and two that are not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

/**
 * Where the Tram `Switch` is verified, in dark and in light: the three sizes, a tap and a
 * drag, controlled and not, disabled on and off, named accents, a raw `color`, and the
 * Metro row composed from the three slots.
 */
export default function TramSwitchScreen() {
  const theme = useXAUITheme()
  const [isOn, setIsOn] = useState(true)
  const [changes, setChanges] = useState(0)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les tailles"
        note="sm, md, lg — lg est la taille Windows Phone. La cible tactile atteint 48 partout."
      >
        {SIZES.map(size => (
          <Switch key={size} size={size} defaultSelected={size !== 'sm'}>
            {size}
          </Switch>
        ))}
      </TramSection>

      <TramSection
        title="glisser"
        note={`Toucher bascule ; glisser le curseur et le lâcher au-delà de la moitié aussi. Changements : ${changes}`}
      >
        <Switch
          size="lg"
          accessibilityLabel="glisser"
          onSelectedChange={() => setChanges(count => count + 1)}
        />
      </TramSection>

      <TramSection
        title="non contrôlé"
        note="defaultSelected : le switch garde son propre état."
      >
        <Switch defaultSelected>synchronisation</Switch>
      </TramSection>

      <TramSection
        title="contrôlé"
        note="Deux switchs sur le même état, et un bouton qui l'inverse de l'extérieur."
      >
        <Switch isSelected={isOn} onSelectedChange={setIsOn}>
          {isOn ? 'activé' : 'désactivé'}
        </Switch>
        <Switch size="sm" isSelected={isOn} onSelectedChange={setIsOn}>
          le même état
        </Switch>
        <Row>
          <Button
            variant="outline"
            size="sm"
            onPress={() => setIsOn(value => !value)}
          >
            inverser
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Piste, curseur et texte gris, sans accent — allumé comme éteint."
      >
        <Switch isDisabled defaultSelected>
          allumé
        </Switch>
        <Switch isDisabled>éteint</Switch>
      </TramSection>

      <TramSection
        title="accent"
        note="Le remplissage est un aplat : la vraie couleur, même le jaune sur blanc."
      >
        {ACCENTS.map(accent => (
          <Switch key={accent} accent={accent} defaultSelected>
            {accent}
          </Switch>
        ))}
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette — ici le danger du thème."
      >
        <Switch color={theme.colors.danger} defaultSelected>
          effacer à la fermeture
        </Switch>
      </TramSection>

      <TramSection
        title="la ligne metro"
        note="Un libellé gris au-dessus, l'état écrit en grand au début, le switch à la fin — composé ici avec useSwitch."
      >
        <View>
          <Typography variant="caption" color={theme.colors.muted}>
            wi-fi
          </Typography>
          <Switch
            size="lg"
            defaultSelected
            alignSelf="stretch"
            justifyContent="space-between"
            accessibilityLabel="wi-fi"
          >
            <StateText />
            <Switch.Track>
              <Switch.Thumb />
            </Switch.Track>
          </Switch>
        </View>
      </TramSection>

      <TramSection
        title="props de style"
        note="Toute clé de ViewStyle est une prop ; animation={false} pose le curseur sans glissement."
      >
        <Switch defaultSelected gap={24} opacity={0.7}>
          espacé, à 70 %
        </Switch>
        <Switch defaultSelected>
          <Switch.Label>sans animation</Switch.Label>
          <Switch.Track animation={false}>
            <Switch.Thumb animation={false} />
          </Switch.Track>
        </Switch>
      </TramSection>
    </ScrollView>
  )
}

/** The state, read from the switch it is composed in — a slot written by the app. */
function StateText() {
  const { isSelected } = useSwitch()

  return <Switch.Label>{isSelected ? 'activé' : 'désactivé'}</Switch.Label>
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      {children}
    </View>
  )
}
