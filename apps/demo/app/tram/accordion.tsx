import { useState } from 'react'
import { ScrollView } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Accordion } from '@xaui/tram/accordion'
import type { AccordionValue, AccordionVariant } from '@xaui/tram/accordion'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

type Question = { value: string; title: string; answer: string }

const HELP: Question[] = [
  {
    value: 'corbeille',
    title: 'Où vont les fichiers supprimés ?',
    answer:
      'Dans la corbeille, pendant 30 jours. Ensuite ils sont effacés du compte.',
  },
  {
    value: 'espace',
    title: "Combien d'espace me reste-t-il ?",
    answer: '4,2 Go sur 15 Go. Les photos en pleine résolution comptent double.',
  },
  {
    value: 'wifi',
    title: 'Synchroniser hors Wi-Fi',
    answer: 'Désactivé par défaut. Activez-le dans les réglages du compte.',
  },
]

const VARIANTS: AccordionVariant[] = ['ghost', 'primary', 'secondary', 'tertiary']

const ACCENTS: TramAccentName[] = ['magenta', 'lime']

/**
 * Where the Tram `Accordion` is verified, in dark and in light: no line anywhere, the
 * plus that lies down into a minus, the open title in the accent, the four grounds, the
 * modes, a disabled row, colour.
 */
export default function TramAccordionScreen() {
  const theme = useXAUITheme()
  const [open, setOpen] = useState<AccordionValue>('corbeille')

  const answer = (text: string) => (
    <Typography variant="body" color={theme.colors.muted}>
      {text}
    </Typography>
  )

  const rows = (questions: Question[]) =>
    questions.map(question => (
      <Accordion.Item key={question.value} value={question.value}>
        <Accordion.Trigger>
          {question.title}
          <Accordion.Indicator />
        </Accordion.Trigger>
        <Accordion.Content>{answer(question.answer)}</Accordion.Content>
      </Accordion.Item>
    ))

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="aide"
        note="ghost, une à la fois, refermable. Aucun trait entre les lignes : l'espace les sépare. Ouverte, la ligne passe à l'accent et son plus se couche en moins."
      >
        <Accordion value={open} onValueChange={setOpen}>
          {rows(HELP)}
        </Accordion>
        <Typography variant="caption" color={theme.colors.muted}>
          ouverte : {Array.isArray(open) ? open.join(', ') : open || 'aucune'}
        </Typography>
      </TramSection>

      <TramSection
        title="les quatre fonds"
        note="ghost (par défaut) sur la page, primary sur la surface discrète, secondary sur la tranche douce de l'accent. tertiary garde le nom de Native et se dessine comme ghost."
      >
        {VARIANTS.map(variant => (
          <Accordion key={variant} variant={variant} defaultValue="a">
            <Accordion.Item value="a">
              <Accordion.Trigger>
                {variant}
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                {answer('Le panneau se déroule sur la courbe Metro.')}
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="b">
              <Accordion.Trigger>
                une seconde ligne
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                {answer('Sans trait au-dessus.')}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        ))}
      </TramSection>

      <TramSection
        title="plusieurs ouvertes"
        note="primary, sm, selectionMode multiple : les deux lignes s'ouvrent ensemble."
      >
        <Accordion
          variant="primary"
          size="sm"
          selectionMode="multiple"
          defaultValue={['formats']}
        >
          <Accordion.Item value="formats">
            <Accordion.Trigger>
              Formats acceptés
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              {answer('PDF, images, audio et documents Office.')}
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="partage">
            <Accordion.Trigger>
              Partage
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              {answer('Un lien en lecture seule, valable 7 jours.')}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </TramSection>

      <TramSection
        title="les tailles"
        note="Le titre en body, subtitle, title ; des lignes de 48, 56, 64."
      >
        {(['sm', 'md', 'lg'] as const).map(size => (
          <Accordion key={size} size={size}>
            {rows(HELP.slice(0, 1).map(q => ({ ...q, title: `taille ${size}` })))}
          </Accordion>
        ))}
      </TramSection>

      <TramSection
        title="toujours une ouverte"
        note="isCollapsible à false : appuyer sur la ligne ouverte ne la referme pas."
      >
        <Accordion isCollapsible={false} defaultValue="corbeille">
          {rows(HELP)}
        </Accordion>
      </TramSection>

      <TramSection
        title="désactivée"
        note="Une ligne désactivée s'estompe et ne bouge pas ; ses couleurs restent."
      >
        <Accordion>
          {rows(HELP.slice(0, 1))}
          <Accordion.Item value="verrou" isDisabled>
            <Accordion.Trigger>
              Réservé aux comptes pro
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>{answer('—')}</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </TramSection>

      <TramSection
        title="la couleur"
        note="magenta et lime nommés : le titre ouvert dans leur encre, et secondary sur leur tranche. Puis une couleur brute, et un glyphe à la place du plus."
      >
        {ACCENTS.map(accent => (
          <Accordion key={accent} accent={accent} defaultValue="a">
            <Accordion.Item value="a">
              <Accordion.Trigger>
                {accent}
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                {answer("Le titre ouvert est l'accent, lu comme une encre.")}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        ))}
        <Accordion variant="secondary" accent="magenta" defaultValue="a">
          {rows([
            { value: 'a', title: 'secondary, magenta', answer: 'Sa tranche douce.' },
          ])}
        </Accordion>
        <Accordion color="#7c3aed" defaultValue="a">
          <Accordion.Item value="a">
            <Accordion.Trigger>
              couleur brute, un chevron
              <Accordion.Indicator as={ChevronIcon} />
            </Accordion.Trigger>
            <Accordion.Content>
              {answer('#7c3aed, jamais corrigée.')}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </TramSection>
    </ScrollView>
  )
}

function ChevronIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth={2} />
    </Svg>
  )
}
