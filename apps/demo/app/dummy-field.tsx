import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DummyField } from '@xaui/native/dummy-field'
import type { DummyFieldProps } from '@xaui/native/dummy-field'
import { FieldGroup } from '@xaui/native/field-group'
import { useXAUITheme } from '@xaui/native/theme'

type Variant = NonNullable<DummyFieldProps['variant']>
type FieldSize = NonNullable<DummyFieldProps['size']>

const VARIANTS: Variant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: FieldSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * The verification screen for `DummyField`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function DummyFieldScreen() {
  const theme = useXAUITheme()
  const [pressCount, setPressCount] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState('France')
  const [fileName, setFileName] = useState<string | null>(null)

  const pickFile = () => {
    setFileName('contrat.pdf')
    setPressCount(c => c + 1)
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="Les quatre variantes"
        note="Les quatre niveaux d'emphase du TextField — primary (fond fieldBackground + ombre field), secondary (fond neutre default), tertiary (bordure seule) et ghost (sans bordure)."
      >
        {VARIANTS.map(variant => (
          <DummyField
            key={variant}
            variant={variant}
            onPress={() => setPressCount(c => c + 1)}
          >
            <DummyField.Label>{variant}</DummyField.Label>
            <DummyField.Field placeholder="Sélectionner une option">
              {selectedCountry}
            </DummyField.Field>
          </DummyField>
        ))}
      </Section>

      <Section
        title="Les quatre tailles"
        note="La taille pilote la hauteur, le padding horizontal, les écarts et la typographie. xs, sm, md et lg."
      >
        {SIZES.map(size => (
          <DummyField
            key={size}
            size={size}
            onPress={() => setPressCount(c => c + 1)}
          >
            <DummyField.Label>Taille {size}</DummyField.Label>
            <DummyField.Field placeholder="Sélectionner">
              {size === 'xs' ? 'XS' : `Valeur en taille ${size}`}
            </DummyField.Field>
          </DummyField>
        ))}
      </Section>

      <Section
        title="Avec indicateur chevron"
        note="DummyField.Indicator s'insère à la suite de DummyField.Value pour offrir le chevron classique de déclencheur."
      >
        <DummyField onPress={() => setPressCount(c => c + 1)}>
          <DummyField.Label>Pays de résidence</DummyField.Label>
          <DummyField.Field>
            <DummyField.Value placeholder="Choisir un pays...">
              {selectedCountry}
            </DummyField.Value>
            <DummyField.Indicator />
          </DummyField.Field>
          <DummyField.Description>
            Votre pays pour la facturation.
          </DummyField.Description>
        </DummyField>

        <DummyField variant="primary" onPress={() => setPressCount(c => c + 1)}>
          <DummyField.Label>Devise (vide)</DummyField.Label>
          <DummyField.Field>
            <DummyField.Value placeholder="Sélectionner une devise..." />
            <DummyField.Indicator />
          </DummyField.Field>
        </DummyField>
      </Section>

      <Section
        title="Label à l'intérieur"
        note="labelPlacement='inside' remonte le label dans la boîte, hors flux, sans changer l'ordre du JSX."
      >
        <DummyField
          labelPlacement="inside"
          onPress={() => setPressCount(c => c + 1)}
        >
          <DummyField.Label>Catégorie</DummyField.Label>
          <DummyField.Field placeholder="Choisir une catégorie">
            Vêtements & Accessoires
          </DummyField.Field>
        </DummyField>

        <DummyField
          labelPlacement="inside"
          size="lg"
          variant="primary"
          onPress={() => setPressCount(c => c + 1)}
        >
          <DummyField.Label>Date de rendez-vous</DummyField.Label>
          <DummyField.Field>
            <DummyField.Value placeholder="Sélectionner...">
              12 Octobre 2026
            </DummyField.Value>
            <DummyField.Indicator />
          </DummyField.Field>
        </DummyField>
      </Section>

      <Section
        title="États d'erreur et désactivé"
        note="isInvalid peint la bordure, le label et la description en danger. isDisabled atténue l'opacité et bloque le press."
      >
        <DummyField isInvalid onPress={() => setPressCount(c => c + 1)}>
          <DummyField.Label>Document obligatoire</DummyField.Label>
          <DummyField.Field placeholder="Téléverser un justificatif" />
          <DummyField.Error>Ce champ est requis pour continuer.</DummyField.Error>
        </DummyField>

        <DummyField isDisabled onPress={() => setPressCount(c => c + 1)}>
          <DummyField.Label>Champ désactivé</DummyField.Label>
          <DummyField.Field placeholder="Non modifiable">
            Valeur figée
          </DummyField.Field>
          <DummyField.Description>
            Ce champ ne peut être modifié.
          </DummyField.Description>
        </DummyField>

        <DummyField color="#7c3aed" onPress={() => setPressCount(c => c + 1)}>
          <DummyField.Label>Teinte personnalisée (violet)</DummyField.Label>
          <DummyField.Field placeholder="Champ teinté">
            Couleur personnalisée
          </DummyField.Field>
        </DummyField>
      </Section>

      <Section
        title="File input composé"
        note="Aucun slot dédié : DummyField.Field est une boîte pressable stylable en props (R14). Une bordure pointillée, une colonne et un contenu personnalisé suffisent à composer un déclencheur de fichier."
      >
        <DummyField onPress={pickFile}>
          <DummyField.Label>Pièce jointe</DummyField.Label>
          <DummyField.Field
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 8,
              minHeight: 104,
              borderStyle: 'dashed',
            }}
          >
            <DummyField.Value placeholder="Téléverser un document (PDF, PNG)">
              {fileName ?? undefined}
            </DummyField.Value>
            <DummyField.Description>Taille maximale 5 Mo.</DummyField.Description>
          </DummyField.Field>
        </DummyField>

        <DummyField isInvalid onPress={pickFile}>
          <DummyField.Label>Justificatif obligatoire</DummyField.Label>
          <DummyField.Field
            placeholder="Téléverser un justificatif"
            style={{ borderStyle: 'dashed' }}
          />
          <DummyField.Error>Ce document est requis.</DummyField.Error>
        </DummyField>
      </Section>

      <Section
        title="Dans un FieldGroup"
        note="DummyField.Field s'intègre naturellement dans un FieldGroup avec préfixe et suffixe décoratifs."
      >
        <DummyField onPress={() => setPressCount(c => c + 1)}>
          <DummyField.Label>Fichier attaché</DummyField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <FieldGroup.Icon as={SampleFileIcon} />
            </FieldGroup.Prefix>
            <DummyField.Field placeholder="Choisir un fichier..." />
          </FieldGroup>
        </DummyField>
      </Section>

      <Section
        title="Interactivité et compteur"
        note="Chaque appui sur le champ incrémente le compteur."
      >
        <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
          {`Nombre d'appuis : ${pressCount}`}
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Poke
            label="Changer pays: Japon"
            onPress={() => setSelectedCountry('Japon')}
          />
          <Poke
            label="Changer pays: France"
            onPress={() => setSelectedCountry('France')}
          />
          <Poke
            label="Fichier: contrat.pdf"
            onPress={() => setFileName('contrat.pdf')}
          />
          <Poke label="Reset" onPress={() => setPressCount(0)} />
        </View>
      </Section>
    </ScrollView>
  )
}

function SampleFileIcon({ size, color }: { size?: number; color?: string }) {
  return <Text style={{ fontSize: (size ?? 16) * 0.8, color }}>📄</Text>
}

function Poke({ label, onPress }: { label: string; onPress: () => void }) {
  const theme = useXAUITheme()

  return (
    <Text
      onPress={onPress}
      style={{
        color: theme.colors.accent,
        fontSize: theme.fontSizes.xs,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: theme.radius.field,
        backgroundColor: theme.colors.default,
      }}
    >
      {label}
    </Text>
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
