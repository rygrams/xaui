import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Pivot } from '@xaui/tram/pivot'
import { Typography } from '@xaui/tram/typography'

type Mail = { from: string; subject: string; preview: string; isUnread?: boolean }

const MAIL: Mail[] = [
  {
    from: 'Inès Kaboré',
    subject: 'Revue du Pivot demain 10 h',
    preview: 'Je regarde la rangée de titres avant la réunion.',
    isUnread: true,
  },
  {
    from: 'Équipe démo',
    subject: 'Capture Android du Panorama',
    preview: 'La parallaxe tient à 60 images par seconde.',
    isUnread: true,
  },
  {
    from: 'Moussa Traoré',
    subject: 'Re: tokens de mouvement',
    preview: 'Le ressort navigation me va, on garde 22 / 180.',
  },
  {
    from: 'Léa Martin',
    subject: "Selawik dans l'app de démo",
    preview: "La police est chargée par l'app, rien dans le paquet.",
  },
  {
    from: 'Awa Diallo',
    subject: 'Contraste du gris en clair',
    preview: '0,6 sur blanc passe AA, je joins les mesures.',
  },
]

/** Long enough to scroll: a vertical drag in a section is the section's, not the loop's. */
const ARCHIVE: Mail[] = Array.from({ length: 24 }, (_, index) => ({
  from: ['Banque', 'Moussa', 'Équipe produit', 'Inès'][index % 4] ?? 'Banque',
  subject: `Archive n° ${index + 1}`,
  preview: 'Classé le mois dernier.',
}))

function Row({ mail }: { mail: Mail }) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 2 }}>
      <Typography variant="subtitle">{mail.from}</Typography>
      <Typography color={mail.isUnread ? theme.colors.link : undefined}>
        {mail.subject}
      </Typography>
      <Typography variant="caption" color={theme.colors.muted} numberOfLines={1}>
        {mail.preview}
      </Typography>
    </View>
  )
}

/**
 * Where the Tram `Pivot` is verified, in dark and in light: a mailbox in five sections
 * that loop. The first moves the loop from outside, forward to the fourth; the fifth
 * scrolls on its own, to check that a vertical drag stays the section's; the fourth is
 * empty, to check that an empty section still fades.
 */
export default function TramPivotScreen() {
  const theme = useXAUITheme()
  const [folder, setFolder] = useState('all')
  const unread = MAIL.filter(mail => mail.isUnread)

  return (
    <Pivot value={folder} onValueChange={setFolder}>
      <Pivot.Title>MESSAGERIE</Pivot.Title>

      <Pivot.Header value="all">tout</Pivot.Header>
      <Pivot.Header value="unread">non lus</Pivot.Header>
      <Pivot.Header value="flagged">marqués</Pivot.Header>
      <Pivot.Header value="urgent">urgents</Pivot.Header>
      <Pivot.Header value="archive">archives</Pivot.Header>

      <Pivot.Section value="all">
        <View style={{ gap: 18 }}>
          {MAIL.map(mail => (
            <Row key={mail.subject} mail={mail} />
          ))}
        </View>
        <View style={{ marginTop: 24, gap: 12, alignItems: 'flex-start' }}>
          <Typography variant="caption" color={theme.colors.muted}>
            {`dossier : ${folder}`}
          </Typography>
          <Button size="sm" variant="outline" onPress={() => setFolder('urgent')}>
            aller aux urgents
          </Button>
        </View>
      </Pivot.Section>

      <Pivot.Section value="unread">
        <View style={{ gap: 18 }}>
          {unread.map(mail => (
            <Row key={mail.subject} mail={mail} />
          ))}
        </View>
      </Pivot.Section>

      <Pivot.Section value="flagged">
        <View style={{ gap: 18 }}>
          {MAIL.slice(2, 4).map(mail => (
            <Row key={mail.subject} mail={mail} />
          ))}
        </View>
      </Pivot.Section>

      <Pivot.Section value="urgent">
        <Typography variant="subtitle" color={theme.colors.muted}>
          {"rien d'urgent"}
        </Typography>
      </Pivot.Section>

      <Pivot.Section value="archive">
        <ScrollView contentContainerStyle={{ gap: 18, paddingBottom: 48 }}>
          {ARCHIVE.map(mail => (
            <Row key={mail.subject} mail={mail} />
          ))}
        </ScrollView>
      </Pivot.Section>
    </Pivot>
  )
}
