import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ColorPicker, TAILWIND_PALETTE } from '@xaui/native/color-picker'
import type { ColorPickerProps } from '@xaui/native/color-picker'
import { FieldGroup } from '@xaui/native/field-group'
import { useXAUITheme } from '@xaui/native/theme'

/** Two ramps out of the eighteen — enough to see a hand-composed grid work. */
const BRAND = TAILWIND_PALETTE.filter(group =>
  ['Violet', 'Sky'].includes(group.name)
)

export default function ColorPickerScreen() {
  const theme = useXAUITheme()
  const [brand, setBrand] = useState<string | undefined>('#7c3aed')

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, gap: 28, paddingBottom: 160 }}
    >
      <PickerDemo
        label="Brand colour"
        description="Opens the full Tailwind palette"
        value={brand}
        onValueChange={setBrand}
      />
      <Text style={{ color: theme.colors.muted }}>Chosen: {brand ?? '—'}</Text>

      <PickerDemo label="Empty" placeholder="Pick a colour" />
      <PickerDemo label="Tinted ring" color="#f97316" defaultValue="#ea580c" />
      <PickerDemo label="Stays open" closeOnSelect={false} defaultValue="#22c55e" />
      <PickerDemo label="Disabled" isDisabled defaultValue="#3b82f6" />
      <PickerDemo
        label="Invalid"
        isInvalid
        error="That colour fails contrast on white."
      />
      <PickerDemo
        label="Inside label"
        labelPlacement="inside"
        defaultValue="#ec4899"
      />
      <PickerDemo label="Fully rounded" radius="full" defaultValue="#14b8a6" />

      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <PickerDemo key={size} size={size} label={size} defaultValue="#6366f1" />
      ))}

      {(['primary', 'secondary', 'tertiary', 'ghost'] as const).map(variant => (
        <PickerDemo
          key={variant}
          variant={variant}
          label={variant}
          defaultValue="#f43f5e"
        />
      ))}

      <View style={{ gap: 12 }}>
        <Text style={{ color: theme.colors.foreground, fontWeight: '600' }}>
          Grid on the page — no field, no dialog
        </Text>
        <ColorPicker
          value={brand}
          onValueChange={setBrand}
          colors={BRAND}
          closeOnSelect={false}
        >
          <ColorPicker.Grid scrollEnabled={false} />
        </ColorPicker>
      </View>

      <PickerDemo label="Mosaic" layout="mosaic" defaultValue="#0ea5e9" />

      <View style={{ gap: 12 }}>
        <Text style={{ color: theme.colors.foreground, fontWeight: '600' }}>
          Mosaic on the page — no labels, everything touching
        </Text>
        <ColorPicker
          value={brand}
          onValueChange={setBrand}
          layout="mosaic"
          closeOnSelect={false}
        >
          <ColorPicker.Grid scrollEnabled={false} />
        </ColorPicker>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={{ color: theme.colors.foreground, fontWeight: '600' }}>
          A group of its own
        </Text>
        <ColorPicker value={brand} onValueChange={setBrand} closeOnSelect={false}>
          <ColorPicker.Group name="Recently used">
            <ColorPicker.Swatch color="#7c3aed" accessibilityLabel="Violet 600" />
            <ColorPicker.Swatch color="#0ea5e9" accessibilityLabel="Sky 500" />
            <ColorPicker.Swatch color="#f43f5e" accessibilityLabel="Rose 500" />
            <ColorPicker.Swatch color="#ffffff" accessibilityLabel="White" />
          </ColorPicker.Group>
        </ColorPicker>
      </View>
    </ScrollView>
  )
}

type PickerDemoProps = ColorPickerProps & {
  label: string
  placeholder?: string
  description?: string
  error?: string
}

function PickerDemo({
  label,
  placeholder = 'Pick a colour',
  description,
  error,
  ...props
}: PickerDemoProps) {
  return (
    <ColorPicker {...props}>
      <ColorPicker.Label>{label}</ColorPicker.Label>
      <FieldGroup>
        <FieldGroup.Prefix isDecorative>
          <ColorPicker.Preview />
        </FieldGroup.Prefix>
        <ColorPicker.Field placeholder={placeholder} />
      </FieldGroup>
      {description ? (
        <ColorPicker.Description>{description}</ColorPicker.Description>
      ) : null}
      {error ? <ColorPicker.Error>{error}</ColorPicker.Error> : null}
      <ColorPicker.Overlay />
      <ColorPicker.Content>
        <ColorPicker.Title>Pick a colour</ColorPicker.Title>
        <ColorPicker.Grid />
      </ColorPicker.Content>
    </ColorPicker>
  )
}
