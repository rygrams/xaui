import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { FieldGroup } from '@xaui/native/field-group'
import { SearchField } from '@xaui/native/search-field'
import type { SearchFieldProps } from '@xaui/native/search-field'
import { useXAUITheme } from '@xaui/native/theme'

export default function SearchFieldScreen() {
  const theme = useXAUITheme()
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState<string | null>(null)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, gap: 28, paddingBottom: 160 }}
      keyboardShouldPersistTaps="handled"
    >
      <SearchDemo
        value={query}
        onValueChange={setQuery}
        onSearch={setSearched}
        label="Find products"
        description="Search by name, category, or SKU"
      />
      <Text style={{ color: theme.colors.muted }}>
        Typed: {query || '—'} · Searched: {searched ?? '—'}
      </Text>

      <SearchDemo variant="secondary" label="On a surface" />
      <SearchDemo defaultValue="chaussures" label="With a query to clear" />
      <SearchDemo isDisabled defaultValue="disabled" label="Disabled" />
      <SearchDemo isInvalid label="Invalid" error="Nothing matched that query." />
      <SearchDemo color="#7c3aed" defaultValue="tinted" label="Tinted" />
      <SearchDemo labelPlacement="inside" label="Inside label" />
      <SearchDemo radius="full" label="Fully rounded" />

      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <SearchDemo key={size} size={size} label={size} />
      ))}

      <View style={{ gap: 12 }}>
        <SearchDemo label="No clear button" withClear={false} />
      </View>
    </ScrollView>
  )
}

type SearchDemoProps = SearchFieldProps & {
  label: string
  description?: string
  error?: string
  withClear?: boolean
}

function SearchDemo({
  label,
  description,
  error,
  withClear = true,
  ...props
}: SearchDemoProps) {
  return (
    <SearchField {...props}>
      <SearchField.Label>{label}</SearchField.Label>
      <FieldGroup>
        <FieldGroup.Prefix isDecorative>
          <SearchField.Icon />
        </FieldGroup.Prefix>
        <SearchField.Field placeholder="Search…" />
        {withClear ? (
          <SearchField.Clear accessibilityLabel="Clear the search" />
        ) : null}
      </FieldGroup>
      {description ? (
        <SearchField.Description>{description}</SearchField.Description>
      ) : null}
      {error ? <SearchField.Error>{error}</SearchField.Error> : null}
    </SearchField>
  )
}
