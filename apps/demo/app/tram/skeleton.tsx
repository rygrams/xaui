import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Divider } from '@xaui/tram/divider'
import { Skeleton } from '@xaui/tram/skeleton'
import { Switch } from '@xaui/tram/switch'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const FILES = [
  { ext: 'pdf', name: 'revue-T4.pdf', meta: '1,8 Mo · aujourd’hui' },
  { ext: 'jpg', name: 'maquette-pivot.jpg', meta: '640 Ko · hier' },
  { ext: 'doc', name: 'plan-tram.docx', meta: '92 Ko · lun.' },
]

/** Each row's two lines, a little different, so the list reads as text and not a grid. */
const LINES = [
  ['70%', '40%'],
  ['56%', '32%'],
  ['78%', '44%'],
] as const

const THUMB = 52

/**
 * Where the Tram `Skeleton` is verified, in dark and in light: a list that loads behind
 * its gate, a block, the three thumbnail sizes, a circle, and a block held still.
 */
export default function TramSkeletonScreen() {
  const theme = useXAUITheme()
  const [isLoading, setIsLoading] = useState(true)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="une liste qui charge"
        note="Un carré de 52 et deux lignes par fichier, tous au même battement. isLoading à faux rend les vraies lignes."
      >
        <Switch isSelected={isLoading} onSelectedChange={setIsLoading}>
          chargement
        </Switch>
        <View accessibilityState={{ busy: isLoading }}>
          {FILES.map((file, index) => (
            <View key={file.name}>
              {index > 0 ? <Divider /> : null}
              <Row>
                <Skeleton isLoading={isLoading} width={THUMB} height={THUMB}>
                  <View
                    style={{
                      width: THUMB,
                      height: THUMB,
                      justifyContent: 'flex-end',
                      padding: 6,
                      backgroundColor: theme.colors.accent,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color={theme.colors.accentForeground}
                    >
                      {file.ext}
                    </Typography>
                  </View>
                </Skeleton>
                <View style={{ flex: 1, gap: 8 }}>
                  <Skeleton
                    isLoading={isLoading}
                    width={LINES[index][0]}
                    height={16}
                  >
                    <Typography variant="subtitle">{file.name}</Typography>
                  </Skeleton>
                  <Skeleton
                    isLoading={isLoading}
                    width={LINES[index][1]}
                    height={12}
                  >
                    <Typography variant="caption" color={theme.colors.muted}>
                      {file.meta}
                    </Typography>
                  </Skeleton>
                </View>
              </Row>
            </View>
          ))}
        </View>
      </TramSection>

      <TramSection
        title="un bloc"
        note="Aucune taille propre : width et height sont toute l'API. Carré, sans ombre."
      >
        <Skeleton height={96} />
      </TramSection>

      <TramSection
        title="vignettes et cercle"
        note="Les trois côtés de l'Avatar, 40, 56, 72 ; radius full laisse passer le cercle."
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Skeleton width={40} height={40} />
          <Skeleton width={56} height={56} />
          <Skeleton width={72} height={72} />
          <Skeleton width={56} height={56} radius="full" />
        </View>
      </TramSection>

      <TramSection
        title="immobile"
        note="animation à faux : le bloc ne bat pas, aucun worklet n'est monté. Mouvement réduit : pareil."
      >
        <Skeleton height={20} animation={false} />
      </TramSection>

      <TramSection
        title="une couleur"
        note="Une couleur brute est la parole de l'appli, tracée telle quelle."
      >
        <Skeleton height={20} color={theme.colors.accentSoft} />
      </TramSection>
    </ScrollView>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
      }}
    >
      {children}
    </View>
  )
}
