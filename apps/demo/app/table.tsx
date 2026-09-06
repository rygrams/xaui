import { useMemo, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Chip } from '@xaui/native/chip'
import { Table } from '@xaui/native/table'
import type { SortDescriptor, TableSize, TableVariant } from '@xaui/native/table'
import { useXAUITheme } from '@xaui/native/theme'

type Person = {
  id: string
  name: string
  role: string
  status: 'active' | 'away' | 'off'
}

const PEOPLE: Person[] = [
  { id: '1', name: 'Amélie Roux', role: 'Design', status: 'active' },
  { id: '2', name: 'Bakary Traoré', role: 'Ingénierie', status: 'active' },
  { id: '3', name: 'Camille Weber', role: 'Produit', status: 'away' },
  { id: '4', name: 'Diane Fortin', role: 'Ingénierie', status: 'off' },
  { id: '5', name: 'Émile Nadeau', role: 'Design', status: 'active' },
]

const VARIANTS: TableVariant[] = ['primary', 'secondary']
const SIZES: TableSize[] = ['sm', 'md', 'lg']

const STATUS_LABEL: Record<Person['status'], string> = {
  active: 'En poste',
  away: 'Absent',
  off: 'Parti',
}

const STATUS_VARIANT = {
  active: 'success-soft',
  away: 'warning-soft',
  off: 'secondary',
} as const

/**
 * The verification screen for the `Table`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function TableScreen() {
  const theme = useXAUITheme()
  const [keys, setKeys] = useState<readonly string[]>([])
  const [single, setSingle] = useState<readonly string[]>([])
  const [sort, setSort] = useState<SortDescriptor | undefined>()

  // The table never reorders anything: it reports the press and this sorts its own list.
  const sorted = useMemo(() => {
    if (sort === undefined) return PEOPLE

    const field = sort.column as keyof Person
    const way = sort.direction === 'ascending' ? 1 : -1

    return [...PEOPLE].sort(
      (a, b) => String(a[field]).localeCompare(String(b[field])) * way
    )
  }, [sort])

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Le cas complet"
        note="Le tableau ne réordonne rien : il rapporte la pression et l'appelant trie sa propre collection — un tableau qui trierait à votre place devrait comprendre la valeur de chaque cellule, et la seule chose qui la comprend est le code qui a construit la ligne. Appuyez sur « Nom » trois fois : croissant, décroissant, plus de tri."
      >
        <Table
          selectionMode="multiple"
          selectedKeys={keys}
          onSelectionChange={setKeys}
          disabledKeys={['4']}
          sortDescriptor={sort}
          onSortChange={setSort}
        >
          <Table.ScrollContainer>
            <Table.Content minWidth={520}>
              <Table.Header>
                <Table.SelectAllCell />
                <Table.Column id="name" allowsSorting>
                  Nom
                </Table.Column>
                <Table.Column id="role" allowsSorting width={140}>
                  Rôle
                </Table.Column>
                <Table.Column width={120}>Statut</Table.Column>
              </Table.Header>

              <Table.Body>
                {sorted.map(person => (
                  <Table.Row key={person.id} id={person.id}>
                    <Table.SelectionCell />
                    <Table.Cell>{person.name}</Table.Cell>
                    <Table.Cell>{person.role}</Table.Cell>
                    <Table.Cell>
                      <Chip size="sm" variant={STATUS_VARIANT[person.status]}>
                        {STATUS_LABEL[person.status]}
                      </Chip>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          <Table.Footer>
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}
            >
              {keys.length} sur {PEOPLE.length} — Diane est désactivée
            </Text>
          </Table.Footer>
        </Table>
      </Section>

      <Section
        title="Une seule ligne à la fois"
        note="single remplace au lieu d'ajouter, et appuyer de nouveau sur la ligne choisie l'efface : une liste à choix unique sans retour à « rien » est une liste qu'on ne peut se tromper qu'une fois."
      >
        <Table
          selectionMode="single"
          selectedKeys={single}
          onSelectionChange={setSingle}
          size="sm"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column>Nom</Table.Column>
                <Table.Column width={130}>Rôle</Table.Column>
              </Table.Header>
              <Table.Body>
                {PEOPLE.slice(0, 3).map(person => (
                  <Table.Row key={person.id} id={person.id}>
                    <Table.Cell>{person.name}</Table.Cell>
                    <Table.Cell>{person.role}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
          selectedKeys : {single.length === 0 ? '[]' : single.join(', ')}
        </Text>
      </Section>

      <Section
        title="Trois nœuds, et chacun gagne sa place"
        note="La racine est la coque, qui découpe et ne bouge pas ; ScrollContainer est le défileur horizontal ; Content est la colonne à l'intérieur qui a le droit d'être plus large que la coque. Les replier ferait qu'un tableau large découpe ses propres lignes ou traîne sa bordure de travers. Faites glisser celui-ci."
      >
        <Table size="sm">
          <Table.ScrollContainer>
            <Table.Content minWidth={760}>
              <Table.Header>
                <Table.Column width={180}>Nom</Table.Column>
                <Table.Column width={160}>Rôle</Table.Column>
                <Table.Column width={140}>Statut</Table.Column>
                <Table.Column width={140}>Bureau</Table.Column>
                <Table.Column width={140}>Depuis</Table.Column>
              </Table.Header>
              <Table.Body>
                {PEOPLE.map(person => (
                  <Table.Row key={person.id}>
                    <Table.Cell>{person.name}</Table.Cell>
                    <Table.Cell>{person.role}</Table.Cell>
                    <Table.Cell>{STATUS_LABEL[person.status]}</Table.Cell>
                    <Table.Cell>Paris</Table.Cell>
                    <Table.Cell>2021</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Section>

      <Section
        title="Les deux coques"
        note="primary est une carte soulevée, pour un tableau posé sur une page parmi d'autres choses. secondary est plat — le fond de la page avec un bandeau d'en-tête rempli — pour un tableau qui est l'écran."
      >
        {VARIANTS.map(variant => (
          <Table key={variant} variant={variant} size="sm">
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header>
                  <Table.Column>{variant}</Table.Column>
                  <Table.Column width={120}>Rôle</Table.Column>
                </Table.Header>
                <Table.Body>
                  {PEOPLE.slice(0, 2).map(person => (
                    <Table.Row key={person.id}>
                      <Table.Cell>{person.name}</Table.Cell>
                      <Table.Cell>{person.role}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        ))}
      </Section>

      <Section
        title="Les tailles, et une teinte"
        note="size bouge la hauteur de ligne, l'inset des cellules et la typo. La hauteur est fixe : une valeur trop longue est coupée plutôt que de déformer le tableau. color va sur la ligne choisie et sur la marque de tri."
      >
        {SIZES.map(size => (
          <Table
            key={size}
            size={size}
            color="#0ea5e9"
            selectionMode="multiple"
            defaultSelectedKeys={['2']}
          >
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header>
                  <Table.SelectAllCell />
                  <Table.Column>{size}</Table.Column>
                  <Table.Column width={130}>Rôle</Table.Column>
                </Table.Header>
                <Table.Body>
                  {PEOPLE.slice(0, 3).map(person => (
                    <Table.Row key={person.id} id={person.id}>
                      <Table.SelectionCell />
                      <Table.Cell>{person.name}</Table.Cell>
                      <Table.Cell>{person.role}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        ))}
      </Section>

      <Section
        title="Désactivé"
        note="La coque s'estompe d'un bloc et plus rien ne répond — ni le tri, ni les cases, ni la pression sur une ligne."
      >
        <Table
          isDisabled
          selectionMode="multiple"
          defaultSelectedKeys={['1']}
          size="sm"
        >
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.SelectAllCell />
                <Table.Column id="name" allowsSorting>
                  Nom
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {PEOPLE.slice(0, 2).map(person => (
                  <Table.Row key={person.id} id={person.id}>
                    <Table.SelectionCell />
                    <Table.Cell>{person.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Section>
    </ScrollView>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 12 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        {note}
      </Text>
      {children}
    </View>
  )
}
