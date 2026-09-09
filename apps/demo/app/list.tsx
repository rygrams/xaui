import { Text, View } from 'react-native'
import { List } from '@xaui/native/list'
import { ChevronDownIcon, Icon } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

type Person = {
  id: string
  initials: string
  name: string
  description?: string
  action: string
}

const PEOPLE: Person[] = [
  {
    id: '1',
    initials: 'AM',
    name: 'Aminata Mensah',
    description: 'Design produit · Abidjan',
    action: 'Disponible',
  },
  {
    id: '2',
    initials: 'JD',
    name: 'Jean Dupont avec un nom volontairement très long',
    description:
      'Une description sur plusieurs lignes vérifie que les extrémités restent centrées verticalement.',
    action: 'Occupé',
  },
  {
    id: '3',
    initials: 'SK',
    name: 'Sofia Koné',
    action: 'Hors ligne',
  },
  {
    id: '4',
    initials: 'YN',
    name: 'Yao N’Guessan',
    description: 'Dernière ligne, sans séparateur inférieur',
    action: 'Disponible',
  },
]

export default function ListScreen() {
  const theme = useXAUITheme()

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 16, gap: 6 }}>
        <Text
          style={{
            color: theme.colors.foreground,
            fontSize: theme.fontSizes.xl,
            fontWeight: theme.fontWeights.semibold,
          }}
        >
          Équipe
        </Text>
        <Text style={{ color: theme.colors.muted }}>
          FlatList virtualisée · leading, contenu et action centrés
        </Text>
      </View>

      <List
        data={PEOPLE}
        keyExtractor={person => person.id}
        renderItem={({ item }) => (
          <List.Item>
            <List.Leading>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.colors.surfaceSecondary,
                }}
              >
                <Text style={{ color: theme.colors.foreground }}>
                  {item.initials}
                </Text>
              </View>
            </List.Leading>
            <List.Content>
              <List.Title numberOfLines={1}>{item.name}</List.Title>
              {item.description ? (
                <List.Description>{item.description}</List.Description>
              ) : null}
            </List.Content>
            <List.Action flexDirection="row" gap={8}>
              <Text style={{ color: theme.colors.muted }}>{item.action}</Text>
              <Icon as={ChevronDownIcon} />
            </List.Action>
          </List.Item>
        )}
      />
    </View>
  )
}
