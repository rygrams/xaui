import { View, Text } from 'react-native'
import { Button } from '@xaui/native/button'
import { Pager, usePager } from '@xaui/native/pager'
import { useXAUITheme } from '@xaui/native/theme'

const SCREENS = [
  {
    title: 'Plein écran',
    body: "Un Pager n'a pas de hauteur propre : flex={1} le fait remplir ce qu'on lui donne.",
  },
  {
    title: 'Une page est la piste',
    body: "Mesurée, sur les deux axes — donc ici c'est l'écran, sans qu'aucune propriété ne le dise.",
  },
  {
    title: 'Les points par-dessus',
    body: "position absolute + bottom + start + end : ils sont dans le flux par défaut, et sur les pages c'est un jeu de style props.",
  },
]

/**
 * The full-screen verification for the `Pager` — the case a section inside a `ScrollView`
 * cannot show, because a page that fills the screen needs a parent that does.
 *
 * `flex={1}` on the root is the whole answer, and it is the reason the recipe gives the root
 * no size of its own: a `flex: 1` in there would have expanded to a zero flex-basis and
 * overridden an explicit `height`, so a caller reaching for one would have been silently
 * ignored. Here it is the caller who says which of the two they want.
 */
export default function PagerFullScreen() {
  const theme = useXAUITheme()

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Pager flex={1} variant="tertiary">
        <Pager.Content>
          {SCREENS.map((screen, index) => (
            <Pager.Page key={screen.title}>
              <Page index={index} title={screen.title} body={screen.body} />
            </Pager.Page>
          ))}
        </Pager.Content>

        {/* Over the pages rather than under them: a full-screen pager has no room below its
            own content, so the dots sit on it. */}
        <Pager.Indicator position="absolute" bottom={32} start={0} end={0} />
      </Pager>
    </View>
  )
}

const TONES = ['accent', 'foreground', 'danger'] as const

function Page({
  index,
  title,
  body,
}: {
  index: number
  title: string
  body: string
}) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors[TONES[index % TONES.length]],
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingHorizontal: 32,
      }}
    >
      <Text
        style={{
          color: theme.colors.accentForeground,
          fontSize: theme.fontSizes['2xl'],
          fontWeight: theme.fontWeights.bold,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: theme.colors.accentForeground,
          fontSize: theme.fontSizes.md,
          textAlign: 'center',
        }}
      >
        {body}
      </Text>
      <Skip />
    </View>
  )
}

/** A control inside a page, written against the context — it costs no state of its own. */
function Skip() {
  const { goTo, count, index } = usePager()
  const isLast = index === count - 1

  return (
    <Button
      variant="tertiary"
      marginTop={8}
      onPress={() => goTo(isLast ? 0 : count - 1)}
    >
      {isLast ? 'Revenir au début' : 'Passer'}
    </Button>
  )
}
