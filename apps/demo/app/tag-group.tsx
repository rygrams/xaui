import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TagGroup } from '@xaui/native/tag-group'
import type { TagGroupSize, TagGroupVariant } from '@xaui/native/tag-group'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: TagGroupVariant[] = ['default', 'surface']
const SIZES: TagGroupSize[] = ['sm', 'md', 'lg']
const TAGS = [
  'Design',
  'Recherche',
  'Accessibilité',
  'Typographie',
  'Couleur',
  'Motion',
]

/**
 * The verification screen for the `TagGroup`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it, only one for the selection
 * rule.
 */
export default function TagGroupScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Tags you can turn on"
        note="This is not a row of Chips. A chip is a piece of metadata that is always the same; a tag is one you can turn on, take off, or both. The selection state and the removal are the component — the pill around them is the least of it. A selected tag leaves its variant's ground and takes the accent's soft slice."
      >
        <Selectable mode="multiple" />
      </Section>

      <Section
        title="One at a time, or none at all"
        note="selectionMode is 'none' by default: a group of tags is a set of labels until you say otherwise. 'single' replaces rather than adding, and pressing the selected one clears it unless isDeselectable is off."
      >
        <Selectable mode="single" />
        <Selectable mode="single" isDeselectable={false} />
      </Section>

      <Section
        title="Two grounds, not two emphases"
        note="default is the theme's neutral fill, surface the card colour — they swap so a tag never disappears into what is behind it. A group on a card wants default; a group on the page wants surface."
      >
        {VARIANTS.map(variant => (
          <Selectable key={variant} mode="multiple" variant={variant} />
        ))}
      </Section>

      <Section
        title="Sizes"
        note="HeroUI's three, step for step: the padding, the corner and the type all move together, and the remove button's box moves with the label so a tag with a cross is never taller than a tag without."
      >
        {SIZES.map(size => (
          <Removable key={size} size={size} />
        ))}
      </Section>

      <Section
        title="Removal, and why the cross can be absent"
        note="TagGroup.ItemRemoveButton renders nothing unless the group was given an onRemove. Removing a tag is your list changing, and a cross that appeared to work while the list stayed put would be worse than one that is plainly not there. The first group below has a handler; the second does not."
      >
        <Removable />
        <Selectable mode="none" withCross />
      </Section>

      <Section
        title="Disabled, one and all"
        note="disabledKeys takes single ids; isDisabled on the root covers the group. A disabled tag takes no press — and neither does its cross, because a disabled tag that can still be removed is not disabled."
      >
        <Selectable mode="multiple" disabledKeys={['Accessibilité', 'Couleur']} />
        <Selectable mode="multiple" isDisabled />
      </Section>

      <Section
        title="A tint (R7)"
        note="color is a raw value, never a token. It paints the selected face — the ground and the label together, and the cross with them. An unselected tag keeps the theme's neutral, because tinting both would leave the selection nothing to say."
      >
        <Selectable mode="multiple" color="#7c3aed" />
      </Section>
    </ScrollView>
  )
}

function Selectable({
  mode,
  variant,
  color,
  disabledKeys,
  isDisabled,
  isDeselectable,
  withCross,
}: {
  mode: 'none' | 'single' | 'multiple'
  variant?: TagGroupVariant
  color?: string
  disabledKeys?: string[]
  isDisabled?: boolean
  isDeselectable?: boolean
  withCross?: boolean
}) {
  return (
    <TagGroup
      selectionMode={mode}
      variant={variant}
      color={color}
      disabledKeys={disabledKeys}
      isDisabled={isDisabled}
      isDeselectable={isDeselectable}
      defaultSelectedKeys={mode === 'none' ? undefined : ['Design']}
    >
      <TagGroup.List>
        {TAGS.map(tag => (
          <TagGroup.Item key={tag} id={tag}>
            <TagGroup.ItemLabel>{tag}</TagGroup.ItemLabel>
            {withCross ? <TagGroup.ItemRemoveButton /> : null}
          </TagGroup.Item>
        ))}
      </TagGroup.List>
    </TagGroup>
  )
}

function Removable({ size }: { size?: TagGroupSize }) {
  const [tags, setTags] = useState(TAGS)

  return (
    <TagGroup
      size={size}
      selectionMode="multiple"
      onRemove={id => setTags(current => current.filter(tag => tag !== id))}
    >
      <TagGroup.List>
        {tags.map(tag => (
          <TagGroup.Item key={tag} id={tag}>
            <TagGroup.ItemLabel>{tag}</TagGroup.ItemLabel>
            <TagGroup.ItemRemoveButton accessibilityLabel={`Retirer ${tag}`} />
          </TagGroup.Item>
        ))}
      </TagGroup.List>
    </TagGroup>
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
