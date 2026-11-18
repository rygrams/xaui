import { useState } from 'react'
import type { ReactNode } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { useCascade } from '@xaui/tram/motion'
import { Tabs, useTabs } from '@xaui/tram/tabs'
import type { TabsSize } from '@xaui/tram/tabs'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: TabsSize[] = ['sm', 'md', 'lg']

/** The three that are pale on white, and one that is not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'cobalt']

const FOLDERS = [
  'tout',
  'non lus',
  'marqués',
  'envoyés',
  'brouillons',
  'archives',
  'indésirables',
  'corbeille',
]

/** Milliseconds before the second choice: the rule is on its way, not yet there. */
const INTERRUPT_AFTER = 150

const MAIL: Record<string, string[]> = {
  tout: ['Awa Diallo', 'Équipe produit', 'Banque', 'Moussa'],
  'non lus': ['Équipe produit', 'Moussa'],
  marqués: ['Awa Diallo'],
  envoyés: ['À Awa Diallo', 'À Moussa'],
}

/**
 * Where the Tram `Tabs` are verified, in dark and in light: the three sizes, a controlled
 * row and one that holds its own value, rows of two, four and eight tabs, a disabled tab
 * and disabled tabs, a trigger's render function, `asChild`, a content in cascade, style
 * props, RTL — all without a rule. `Tabs.Indicator` has one section of its own, last.
 */
export default function TramTabsScreen() {
  const theme = useXAUITheme()
  const [folder, setFolder] = useState('tout')
  const [ruled, setRuled] = useState('tout')

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les tailles"
        note="subtitle, title et section ; 40, 48 et 56 de haut. sm atteint 48 par son hitSlop."
      >
        {SIZES.map(size => (
          <Tabs key={size} size={size} defaultValue="a">
            <Tabs.List>
              <Tabs.Trigger value="a">{size}</Tabs.Trigger>
              <Tabs.Trigger value="b">choisi</Tabs.Trigger>
              <Tabs.Trigger value="c">autre</Tabs.Trigger>
            </Tabs.List>
          </Tabs>
        ))}
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`value et onValueChange. Dossier : ${folder}`}
      >
        <Tabs value={folder} onValueChange={setFolder}>
          <Tabs.List>
            {FOLDERS.slice(0, 4).map(name => (
              <Tabs.Trigger key={name} value={name}>
                {name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {FOLDERS.slice(0, 4).map(name => (
            <Tabs.Content key={name} value={name}>
              <Rows names={MAIL[name] ?? []} />
            </Tabs.Content>
          ))}
        </Tabs>
      </TramSection>

      <TramSection
        title="non contrôlé, deux onglets"
        note="defaultValue : les onglets gardent leur valeur. Le contenu entre du côté de l'onglet choisi."
      >
        <Tabs defaultValue="jour">
          <Tabs.List>
            <Tabs.Trigger value="jour">jour</Tabs.Trigger>
            <Tabs.Trigger value="semaine">semaine</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="jour">
            <Typography>{"Trois trajets aujourd'hui."}</Typography>
          </Tabs.Content>
          <Tabs.Content value="semaine">
            <Typography>Quatorze trajets cette semaine.</Typography>
          </Tabs.Content>
        </Tabs>
      </TramSection>

      <TramSection
        title="huit onglets"
        note="La rangée dépasse : elle défile sans barre, et l'onglet choisi est amené en vue, son bord sur la marge."
      >
        <Tabs defaultValue="tout">
          <Tabs.List>
            {FOLDERS.map(name => (
              <Tabs.Trigger key={name} value={name}>
                {name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {FOLDERS.map(name => (
            <Tabs.Content key={name} value={name}>
              <Typography>{`Le dossier « ${name} ».`}</Typography>
            </Tabs.Content>
          ))}
        </Tabs>
      </TramSection>

      <TramSection
        title="un onglet désactivé"
        note="Gris, atténué, et il ne se choisit pas ; les flèches du clavier le sautent."
      >
        <Tabs defaultValue="tout">
          <Tabs.List>
            <Tabs.Trigger value="tout">tout</Tabs.Trigger>
            <Tabs.Trigger value="archives" isDisabled>
              archives
            </Tabs.Trigger>
            <Tabs.Trigger value="envoyés">envoyés</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </TramSection>

      <TramSection
        title="désactivés"
        note="isDisabled sur la racine : toute la rangée est grise, et l'onglet choisi reste le moins atténué."
      >
        <Tabs defaultValue="non lus" isDisabled>
          <Tabs.List>
            <Tabs.Trigger value="tout">tout</Tabs.Trigger>
            <Tabs.Trigger value="non lus">non lus</Tabs.Trigger>
            <Tabs.Trigger value="marqués">marqués</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </TramSection>

      <TramSection
        title="fonction de rendu"
        note="Le Trigger remet isSelected, isPressed et isDisabled : ici le compte ne paraît que sur l'onglet choisi."
      >
        <Tabs defaultValue="non lus">
          <Tabs.List>
            {['tout', 'non lus', 'marqués'].map(name => (
              <Tabs.Trigger key={name} value={name} gap={8}>
                {({ isSelected }) => (
                  <>
                    <Tabs.Label>{name}</Tabs.Label>
                    {isSelected ? (
                      <Typography variant="caption" color={theme.colors.muted}>
                        {String(MAIL[name]?.length ?? 0)}
                      </Typography>
                    ) : null}
                  </>
                )}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs>
      </TramSection>

      <TramSection
        title="asChild"
        note="Le Trigger donne son rôle, son état et sa pression à l'élément du caller."
      >
        <Tabs defaultValue="carte">
          <Tabs.List>
            {['carte', 'liste'].map(name => (
              <Tabs.Trigger key={name} value={name} asChild>
                <Pressable testID={`as-child-${name}`}>
                  <Tabs.Label>{name}</Tabs.Label>
                </Pressable>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs>
      </TramSection>

      <TramSection
        title="contenu en cascade"
        note="À la main du caller : les lignes lisent travel et towardEnd dans useTabs et arrivent l'une après l'autre."
      >
        <Tabs defaultValue="tout">
          <Tabs.List>
            {FOLDERS.slice(0, 4).map(name => (
              <Tabs.Trigger key={name} value={name}>
                {name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {FOLDERS.slice(0, 4).map(name => (
            <Tabs.Content key={name} value={name} gap={8}>
              {(MAIL[name] ?? []).map((line, rank) => (
                <CascadeRow key={line} rank={rank}>
                  <Typography variant="subtitle">{line}</Typography>
                </CascadeRow>
              ))}
            </Tabs.Content>
          ))}
        </Tabs>
      </TramSection>

      <TramSection
        title="props de style"
        note="gap sur la racine, contentContainerStyle sur la rangée, une couleur de texte sur un Label."
      >
        <Tabs defaultValue="a" gap={24}>
          <Tabs.List contentContainerStyle={{ gap: 40 }}>
            <Tabs.Trigger value="a">large</Tabs.Trigger>
            <Tabs.Trigger value="b">
              <Tabs.Label color={theme.colors.danger}>à la main</Tabs.Label>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            value="a"
            padding={12}
            backgroundColor={theme.colors.default}
          >
            <Typography>Un panneau sur la surface discrète.</Typography>
          </Tabs.Content>
          <Tabs.Content value="b">
            <Typography>Le style du caller a le dernier mot.</Typography>
          </Tabs.Content>
        </Tabs>
      </TramSection>

      <TramSection
        title="RTL"
        note="La rangée part de la droite ; avancer fait entrer le contenu par la gauche, qui est la fin."
      >
        <View style={{ direction: 'rtl' }}>
          <Tabs defaultValue="tout">
            <Tabs.List>
              {FOLDERS.map(name => (
                <Tabs.Trigger key={name} value={name}>
                  {name}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {FOLDERS.map(name => (
              <Tabs.Content key={name} value={name}>
                <Typography>{`Le dossier « ${name} ».`}</Typography>
              </Tabs.Content>
            ))}
          </Tabs>
        </View>
      </TramSection>

      <TramSection
        title="avec Indicator, en supplément"
        note="Tabs.Indicator écrit dans la rangée : un trait sous le titre choisi, dans l'accent lu comme encre. accent et color n'ont d'effet que sur lui."
      >
        {ACCENTS.map(accent => (
          <Tabs key={accent} accent={accent} defaultValue="a">
            <Tabs.List>
              <Tabs.Indicator />
              <Tabs.Trigger value="a">{accent}</Tabs.Trigger>
              <Tabs.Trigger value="b">un titre plus long</Tabs.Trigger>
              <Tabs.Trigger value="c">fin</Tabs.Trigger>
            </Tabs.List>
          </Tabs>
        ))}

        <Tabs color="#FF2D95" defaultValue="a">
          <Tabs.List>
            <Tabs.Indicator />
            <Tabs.Trigger value="a">color brut</Tabs.Trigger>
            <Tabs.Trigger value="b">jamais corrigé</Tabs.Trigger>
          </Tabs.List>
        </Tabs>

        <Tabs defaultValue="b" isDisabled>
          <Tabs.List>
            <Tabs.Indicator />
            <Tabs.Trigger value="a">désactivés</Tabs.Trigger>
            <Tabs.Trigger value="b">trait gris</Tabs.Trigger>
          </Tabs.List>
        </Tabs>

        <Tabs value={ruled} onValueChange={setRuled}>
          <Tabs.List>
            <Tabs.Indicator />
            {FOLDERS.map(name => (
              <Tabs.Trigger key={name} value={name}>
                {name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs>
        <Button
          variant="outline"
          alignSelf="flex-start"
          onPress={() => {
            // The last tab, then the first before the rule has arrived: the second trip
            // has to set off from where the rule is.
            setRuled(FOLDERS[FOLDERS.length - 1] ?? 'tout')
            setTimeout(() => setRuled('tout'), INTERRUPT_AFTER)
          }}
        >
          dernier, puis premier
        </Button>
      </TramSection>
    </ScrollView>
  )
}

function Rows({ names }: { names: string[] }) {
  return (
    <View style={{ gap: 8 }}>
      {names.map(name => (
        <Typography key={name} variant="subtitle">
          {name}
        </Typography>
      ))}
    </View>
  )
}

/**
 * A row of a content that cascades by hand: the tabs say which way the change went, and
 * the row comes from that side, a stagger behind the one before, once the panel before
 * has faded out.
 */
function CascadeRow({ rank, children }: { rank: number; children: ReactNode }) {
  const { travel, towardEnd, isStill } = useTabs()
  const arriving = useCascade({
    isOpen: true,
    rank,
    isStill,
    side: travel * towardEnd,
  })

  return <Animated.View style={arriving}>{children}</Animated.View>
}
