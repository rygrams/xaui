import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Panorama } from '@xaui/tram/panorama'
import { Tile } from '@xaui/tram/tile'
import { Typography } from '@xaui/tram/typography'

function NoteIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18V5l11-2v13" stroke={color} strokeWidth={2} />
      <Circle cx={6} cy={18} r={3} stroke={color} strokeWidth={2} />
      <Circle cx={17} cy={16} r={3} stroke={color} strokeWidth={2} />
    </Svg>
  )
}

function FilmIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 5h18v14H3zM7 5v14M17 5v14M3 12h18"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

const LIBRARY = ['musique', 'vidéos', 'podcasts', 'radio']

const RELEASES = Array.from({ length: 14 }, (_, index) => ({
  key: `sortie-${index}`,
  title: ['Awa Koné', 'Marc', 'la ville', 'Inès', 'lagune', 'ondes', 'soleil bas'][
    index % 7
  ],
  detail: index % 3 === 2 ? 'film · 1 h 42' : `album · ${8 + (index % 5)} titres`,
}))

/**
 * Where the Tram `Panorama` is verified, in dark and in light: a music hub in four
 * sections under a giant title, over a backdrop of flat blocks of the soft grey. The
 * first section moves the track from outside; the third scrolls on its own, to check that
 * a vertical drag stays the section's.
 */
export default function TramPanoramaScreen() {
  const theme = useXAUITheme()
  const [section, setSection] = useState('collection')
  const block = {
    position: 'absolute',
    backgroundColor: theme.colors.default,
  } as const

  return (
    <Panorama value={section} onValueChange={setSection}>
      <Panorama.Background>
        <View style={[block, { top: 40, start: 60, width: 220, height: 220 }]} />
        <View style={[block, { top: 330, start: 360, width: 300, height: 180 }]} />
        <View style={[block, { top: 120, start: 640, width: 180, height: 360 }]} />
      </Panorama.Background>

      <Panorama.Title>musique + vidéos</Panorama.Title>

      <Panorama.Section value="collection">
        <Panorama.Header>collection</Panorama.Header>
        <View style={{ gap: 8 }}>
          {LIBRARY.map(label => (
            <Typography key={label} variant="section">
              {label}
            </Typography>
          ))}
        </View>
        <View style={{ marginTop: 24, gap: 12, alignItems: 'flex-start' }}>
          <Typography variant="caption" color={theme.colors.muted}>
            {`section : ${section}`}
          </Typography>
          <Button size="sm" variant="outline" onPress={() => setSection('boutique')}>
            aller à la boutique
          </Button>
        </View>
      </Panorama.Section>

      <Panorama.Section value="historique">
        <Panorama.Header>historique</Panorama.Header>
        <Tile.Grid>
          <Tile size="medium" accessibilityLabel="nuit blanche">
            <Tile.Icon as={NoteIcon} size={40} />
            <Tile.Label>nuit blanche</Tile.Label>
          </Tile>
          <Tile size="small" accent="teal" accessibilityLabel="lagune">
            <Tile.Icon as={NoteIcon} />
          </Tile>
          <Tile size="small" accessibilityLabel="la ville">
            <Tile.Icon as={FilmIcon} />
          </Tile>
          <Tile size="small" variant="surface" accessibilityLabel="ondes">
            <Tile.Icon as={NoteIcon} />
          </Tile>
          <Tile size="small" accent="teal" accessibilityLabel="soleil bas">
            <Tile.Icon as={NoteIcon} />
          </Tile>
        </Tile.Grid>
      </Panorama.Section>

      <Panorama.Section value="nouveautés">
        <Panorama.Header>nouveautés</Panorama.Header>
        <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 48 }}>
          {RELEASES.map(release => (
            <View
              key={release.key}
              style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: theme.colors.accent,
                }}
              />
              <View>
                <Typography variant="subtitle">{release.title}</Typography>
                <Typography variant="caption" color={theme.colors.muted}>
                  {release.detail}
                </Typography>
              </View>
            </View>
          ))}
        </ScrollView>
      </Panorama.Section>

      <Panorama.Section value="boutique">
        <Panorama.Header>boutique</Panorama.Header>
        <View style={{ gap: 8 }}>
          <Typography variant="section">albums</Typography>
          <Typography variant="section">films</Typography>
          <Typography variant="body" color={theme.colors.muted}>
            la dernière section se cale contre le bord de fin de l'écran
          </Typography>
        </View>
        <View style={{ marginTop: 24, alignItems: 'flex-start' }}>
          <Button
            size="sm"
            variant="outline"
            onPress={() => setSection('collection')}
          >
            revenir au début
          </Button>
        </View>
      </Panorama.Section>
    </Panorama>
  )
}
