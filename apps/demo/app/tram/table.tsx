import { useMemo, useState } from 'react'
import { ScrollView } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { EmptyState } from '@xaui/tram/empty-state'
import { Table } from '@xaui/tram/table'
import type { SortDescriptor, TableSize } from '@xaui/tram/table'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

type Device = {
  id: string
  name: string
  seen: string
  /** Minutes since it was last seen: what `seen` sorts by. */
  ago: number
  megabytes: number
}

const DEVICES: Device[] = [
  { id: '1', name: 'Lumia de Léa', seen: 'il y a 2 min', ago: 2, megabytes: 412 },
  {
    id: '2',
    name: 'Surface du salon',
    seen: 'hier, 21:40',
    ago: 1300,
    megabytes: 1288,
  },
  { id: '3', name: 'Montre', seen: 'il y a 1 h', ago: 60, megabytes: 18 },
  {
    id: '4',
    name: 'Portable du bureau',
    seen: '12 nov.',
    ago: 11000,
    megabytes: 2304,
  },
  {
    id: '5',
    name: 'Tablette des enfants',
    seen: '3 nov.',
    ago: 24000,
    megabytes: 96,
  },
]

const COMPARE: Record<string, (a: Device, b: Device) => number> = {
  name: (a, b) => a.name.localeCompare(b.name, 'fr'),
  seen: (a, b) => a.ago - b.ago,
  megabytes: (a, b) => a.megabytes - b.megabytes,
}

const SIZES: TableSize[] = ['sm', 'lg']

const megabytes = (value: number) => value.toLocaleString('fr-FR')

/**
 * Where the Tram `Table` is verified, in dark and in light: sorting and multiple
 * selection with a footer, a wide table that scrolls sideways, single selection, the two
 * other sizes with a named accent and a raw colour, an empty body, and a disabled table.
 */
export default function TramTableScreen() {
  const theme = useXAUITheme()
  const [devices, setDevices] = useState(DEVICES)
  const [keys, setKeys] = useState<readonly string[]>(['3'])
  const [sort, setSort] = useState<SortDescriptor | undefined>({
    column: 'name',
    direction: 'ascending',
  })
  const [single, setSingle] = useState<readonly string[]>([])

  // The table never reorders anything: it reports the press and this sorts its own list.
  const sorted = useMemo(() => {
    if (sort === undefined) return devices

    const way = sort.direction === 'ascending' ? 1 : -1
    return [...devices].sort((a, b) => COMPARE[sort.column](a, b) * way)
  }, [devices, sort])

  const disconnect = () => {
    setDevices(current => current.filter(device => !keys.includes(device.id)))
    setKeys([])
  }

  const count =
    keys.length === 0
      ? `${devices.length} appareils`
      : `${keys.length} sélectionné${keys.length > 1 ? 's' : ''}`

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 40, paddingBottom: 96 }}
    >
      <TramSection
        title="les appareils"
        note="Pas de coque ni de trait : les lignes de la page de réglages. La colonne triée passe à l'encre avec un chevron — trois appuis : croissant, décroissant, plus de tri. Une ligne choisie prend la bande douce de l'accent ; le Lumia de Léa n'est pas sélectionnable. Le pied reste hors du défilement."
      >
        <Table
          selectionMode="multiple"
          selectedKeys={keys}
          onSelectionChange={setKeys}
          disabledKeys={['1']}
          sortDescriptor={sort}
          onSortChange={setSort}
        >
          <Table.ScrollContainer>
            <Table.Content minWidth={420}>
              <Table.Header>
                <Table.SelectAllCell />
                <Table.Column id="name" allowsSorting>
                  appareil
                </Table.Column>
                <Table.Column id="seen" allowsSorting width={112}>
                  dernier accès
                </Table.Column>
                <Table.Column
                  id="megabytes"
                  allowsSorting
                  width={72}
                  justifyContent="flex-end"
                >
                  Mo
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {sorted.map(device => (
                  <Table.Row key={device.id} id={device.id}>
                    <Table.SelectionCell />
                    <Table.Cell>{device.name}</Table.Cell>
                    <Table.Cell>
                      <Typography
                        variant="caption"
                        color={theme.colors.muted}
                        numberOfLines={1}
                      >
                        {device.seen}
                      </Typography>
                    </Table.Cell>
                    <Table.Cell alignItems="flex-end">
                      {megabytes(device.megabytes)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          <Table.Footer>
            <Typography variant="caption" color={theme.colors.muted}>
              {count}
            </Typography>
            <Button
              variant="outline"
              size="sm"
              isDisabled={keys.length === 0}
              onPress={disconnect}
            >
              déconnecter
            </Button>
          </Table.Footer>
        </Table>

        <Button
          variant="text"
          size="sm"
          alignSelf="flex-start"
          onPress={() => setDevices(DEVICES)}
        >
          remettre les appareils
        </Button>
      </TramSection>

      <TramSection
        title="un tableau large"
        note="Content est plus large que la racine, qui découpe et ne bouge pas : l'en-tête et les lignes glissent ensemble. Faites glisser."
      >
        <Table>
          <Table.ScrollContainer>
            <Table.Content minWidth={720}>
              <Table.Header>
                <Table.Column width={180}>appareil</Table.Column>
                <Table.Column width={140}>dernier accès</Table.Column>
                <Table.Column width={120}>système</Table.Column>
                <Table.Column width={120}>lieu</Table.Column>
                <Table.Column width={80} justifyContent="flex-end">
                  Mo
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {DEVICES.map(device => (
                  <Table.Row key={device.id}>
                    <Table.Cell>{device.name}</Table.Cell>
                    <Table.Cell>{device.seen}</Table.Cell>
                    <Table.Cell>Windows</Table.Cell>
                    <Table.Cell>Lyon</Table.Cell>
                    <Table.Cell alignItems="flex-end">
                      {megabytes(device.megabytes)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </TramSection>

      <TramSection
        title="une seule ligne"
        note="single remplace au lieu d'ajouter, et un second appui sur la ligne choisie l'efface. Sans case : la ligne entière se choisit, et penche sous le doigt."
      >
        <Table
          selectionMode="single"
          selectedKeys={single}
          onSelectionChange={setSingle}
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column>appareil</Table.Column>
                <Table.Column width={112}>dernier accès</Table.Column>
              </Table.Header>
              <Table.Body>
                {DEVICES.slice(0, 3).map(device => (
                  <Table.Row key={device.id} id={device.id}>
                    <Table.Cell>{device.name}</Table.Cell>
                    <Table.Cell>{device.seen}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        <Typography variant="caption" color={theme.colors.muted}>
          selectedKeys : {single.length === 0 ? '[]' : single.join(', ')}
        </Typography>
      </TramSection>

      {SIZES.map(size => (
        <TramSection
          key={size}
          title={size === 'sm' ? 'petite' : 'grande'}
          note={
            size === 'sm'
              ? 'size sm : des lignes de 40 au moins, un accent nommé (lime) sur la bande et les cases.'
              : 'size lg : des lignes de 56, le texte en subtitle, une couleur brute (#7c3aed).'
          }
        >
          <Table
            size={size}
            accent={size === 'sm' ? 'lime' : undefined}
            color={size === 'lg' ? '#7c3aed' : undefined}
            selectionMode="multiple"
            defaultSelectedKeys={['2']}
          >
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header>
                  <Table.SelectAllCell />
                  <Table.Column>appareil</Table.Column>
                  <Table.Column
                    width={size === 'sm' ? 64 : 88}
                    justifyContent="flex-end"
                  >
                    Mo
                  </Table.Column>
                </Table.Header>
                <Table.Body>
                  {DEVICES.slice(0, 3).map(device => (
                    <Table.Row key={device.id} id={device.id}>
                      <Table.SelectionCell />
                      <Table.Cell>{device.name}</Table.Cell>
                      <Table.Cell alignItems="flex-end">
                        {megabytes(device.megabytes)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </TramSection>
      ))}

      <TramSection
        title="rien à afficher"
        note="Le corps n'est qu'un conteneur : il tient un EmptyState plutôt que des lignes quand la collection est vide."
      >
        <Table>
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column>appareil</Table.Column>
                <Table.Column width={112}>dernier accès</Table.Column>
              </Table.Header>
              <Table.Body paddingVertical={24}>
                <EmptyState size="sm">
                  <EmptyState.Header>
                    <EmptyState.Media variant="icon">
                      <Icon as={DeviceIcon} />
                    </EmptyState.Media>
                    <EmptyState.Title>aucun appareil</EmptyState.Title>
                    <EmptyState.Description>
                      {"Les appareils connectés à ce compte s'affichent ici."}
                    </EmptyState.Description>
                  </EmptyState.Header>
                </EmptyState>
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </TramSection>

      <TramSection
        title="désactivé"
        note="La table s'estompe d'un bloc, les cases grisent, et plus rien ne répond — ni le tri, ni les cases, ni l'appui sur une ligne."
      >
        <Table
          isDisabled
          selectionMode="multiple"
          defaultSelectedKeys={['1']}
          sortDescriptor={{ column: 'name', direction: 'descending' }}
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.SelectAllCell />
                <Table.Column id="name" allowsSorting>
                  appareil
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {DEVICES.slice(0, 2).map(device => (
                  <Table.Row key={device.id} id={device.id}>
                    <Table.SelectionCell />
                    <Table.Cell>{device.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </TramSection>
    </ScrollView>
  )
}

/* A phone, drawn inline so the screen needs no icon set. */
function DeviceIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 2h10v20H7zM11 18h2" stroke={color} strokeWidth={2} />
    </Svg>
  )
}
