import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { ColorPicker } from '@xaui/tram/color-picker'
import type { ColorGroup, ColorPickerSize } from '@xaui/tram/color-picker'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: ColorPickerSize[] = ['sm', 'md', 'lg']

/** A palette of one's own, with names: two short ramps, read as "bleu 300". */
const BRAND: ColorGroup[] = [
  {
    name: 'bleu',
    swatches: [
      { shade: '300', value: '#7DB7F0' },
      { shade: '500', value: '#2F7FD8' },
      { shade: '700', value: '#1A4F8F' },
    ],
  },
  {
    name: 'corail',
    swatches: [
      { shade: '300', value: '#FFA28F' },
      { shade: '500', value: '#F2674B' },
      { shade: '700', value: '#B23D26' },
    ],
  },
]

/**
 * Where the Tram `ColorPicker` is verified, in dark and in light: the field and the page
 * it swivels in, in `ramps` (the WP7 list); the grid alone in `mosaic` (the WP8 grid); a
 * palette of one's own, composed and passed as `colors`; the sizes; invalid and disabled.
 */
export default function TramColorPickerScreen() {
  const theme = useXAUITheme()
  const [accent, setAccent] = useState('#1BA1E2')
  const [tile, setTile] = useState('#0050EF')
  const [recent, setRecent] = useState<string | undefined>(undefined)
  const [brand, setBrand] = useState<string | undefined>('#2F7FD8')
  const [missing, setMissing] = useState<string | undefined>(undefined)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="le champ et sa page"
        note="La boîte du DummyField : la puce de la couleur, son nom, le chevron. Elle ouvre une page qui pivote sur son bord haut, les vingt accents en cascade. Le nom choisi passe à sa couleur lue comme encre ; le retour système ou la croix ferment."
      >
        <ColorPicker value={accent} onValueChange={setAccent}>
          <ColorPicker.Label>couleur d’accent</ColorPicker.Label>
          <ColorPicker.Field placeholder="choisir une couleur" />
          <ColorPicker.Description>
            les tuiles, les liens et les cases cochées la prennent.
          </ColorPicker.Description>
          <ColorPicker.Overlay />
          <ColorPicker.Content>
            <ColorPicker.Title>accents</ColorPicker.Title>
            <ColorPicker.Close accessibilityLabel="fermer" />
            <ColorPicker.Grid />
          </ColorPicker.Content>
        </ColorPicker>
        <Typography variant="caption" color={theme.colors.muted}>
          valeur : {accent}
        </Typography>
      </TramSection>

      <TramSection
        title="la grille seule, en mosaic"
        note="Pas de champ, rien à ouvrir. Des carrés serrés à 2 d'écart, cinq par rangée, sans nom. Le choisi est cerné d'une ligne de 2 à l'encre, en retrait de 3."
      >
        <ColorPicker
          layout="mosaic"
          closeOnSelect={false}
          value={tile}
          onValueChange={setTile}
        >
          <ColorPicker.Grid scrollEnabled={false} />
        </ColorPicker>
        <ColorPicker layout="mosaic" value={tile} onValueChange={setTile}>
          <ColorPicker.Label>la même, dans une page</ColorPicker.Label>
          <ColorPicker.Field />
          <ColorPicker.Content>
            <ColorPicker.Title>accents</ColorPicker.Title>
            <ColorPicker.Close accessibilityLabel="fermer" />
            <ColorPicker.Grid />
          </ColorPicker.Content>
        </ColorPicker>
      </TramSection>

      <TramSection
        title="une palette à soi"
        note="Composée en Group et Swatch, ou passée en colors : chaque groupe a son titre, chaque nuance son nom, « bleu 500 » dans le champ."
      >
        <ColorPicker closeOnSelect={false} value={recent} onValueChange={setRecent}>
          <ColorPicker.Grid scrollEnabled={false}>
            <ColorPicker.Group name="récentes">
              <ColorPicker.Swatch color="#A20025" name="crimson" />
              <ColorPicker.Swatch color="#00ABA9" name="teal" />
              <ColorPicker.Swatch color="#F0A30A" name="amber" />
            </ColorPicker.Group>
          </ColorPicker.Grid>
        </ColorPicker>
        <ColorPicker colors={BRAND} value={brand} onValueChange={setBrand}>
          <ColorPicker.Label>couleur de marque</ColorPicker.Label>
          <ColorPicker.Field placeholder="choisir une nuance" />
          <ColorPicker.Content>
            <ColorPicker.Title>marque</ColorPicker.Title>
            <ColorPicker.Close accessibilityLabel="fermer" />
            <ColorPicker.Grid />
          </ColorPicker.Content>
        </ColorPicker>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — 40, 48, 56 de haut ; la puce fait la hauteur moins 20."
      >
        {SIZES.map(size => (
          <ColorPicker
            key={size}
            size={size}
            value={accent}
            onValueChange={setAccent}
          >
            <ColorPicker.Label>{size}</ColorPicker.Label>
            <ColorPicker.Field />
            <ColorPicker.Content>
              <ColorPicker.Title>accents</ColorPicker.Title>
              <ColorPicker.Close accessibilityLabel="fermer" />
              <ColorPicker.Grid />
            </ColorPicker.Content>
          </ColorPicker>
        ))}
      </TramSection>

      <TramSection
        title="invalide et désactivé"
        note="Invalide : la ligne en danger, la puce vide en attente. Désactivé : rien ne s'ouvre, la grille ne répond plus et ses noms passent au gris."
      >
        <ColorPicker isInvalid={!missing} value={missing} onValueChange={setMissing}>
          <ColorPicker.Label>couleur du calendrier</ColorPicker.Label>
          <ColorPicker.Field placeholder="aucune" />
          {missing ? null : (
            <ColorPicker.Error>choisissez une couleur.</ColorPicker.Error>
          )}
          <ColorPicker.Overlay isDismissable={false} />
          <ColorPicker.Content>
            <ColorPicker.Title>accents</ColorPicker.Title>
            <ColorPicker.Close accessibilityLabel="fermer" />
            <ColorPicker.Grid />
          </ColorPicker.Content>
        </ColorPicker>
        <ColorPicker isDisabled defaultValue="#6D8764">
          <ColorPicker.Label>verrouillée</ColorPicker.Label>
          <ColorPicker.Field />
          <ColorPicker.Content>
            <ColorPicker.Grid />
          </ColorPicker.Content>
        </ColorPicker>
        <ColorPicker isDisabled defaultValue="#6D8764" closeOnSelect={false}>
          <ColorPicker.Grid scrollEnabled={false}>
            <ColorPicker.Group>
              <ColorPicker.Swatch color="#6D8764" name="olive" />
              <ColorPicker.Swatch color="#647687" name="steel" />
            </ColorPicker.Group>
          </ColorPicker.Grid>
        </ColorPicker>
      </TramSection>

      <TramSection
        title="accent et props de style"
        note="Sous le doigt, la ligne du champ est l'accent nommé, lu comme encre ; la palette n'en est pas teinte. Toute clé de style est une prop."
      >
        <ColorPicker
          accent="magenta"
          maxWidth={260}
          value={accent}
          onValueChange={setAccent}
        >
          <ColorPicker.Label>magenta, étroit</ColorPicker.Label>
          <ColorPicker.Field />
          <ColorPicker.Content>
            <ColorPicker.Title>accents</ColorPicker.Title>
            <ColorPicker.Close accessibilityLabel="fermer" />
            <ColorPicker.Grid />
          </ColorPicker.Content>
        </ColorPicker>
      </TramSection>
    </ScrollView>
  )
}
