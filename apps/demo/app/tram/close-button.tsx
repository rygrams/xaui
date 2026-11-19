import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { CloseButton } from '@xaui/tram/close-button'
import type { CloseButtonSize, CloseButtonVariant } from '@xaui/tram/close-button'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: CloseButtonSize[] = ['sm', 'md', 'lg']

const VARIANTS: CloseButtonVariant[] = ['outline', 'contained', 'text']

/** One accent that takes a black cross on its disc, two that take a white one. */
const ACCENTS: TramAccentName[] = ['lime', 'magenta', 'cobalt']

const RAW = '#7c3aed'

function BackIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 12H5M11 5l-7 7 7 7" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

/**
 * Where the Tram `CloseButton` is verified, in dark and in light: in a page's title row and
 * in the corner of a panel, then every drawing at every size, painted by the page's ink, a
 * named accent and a raw colour, disabled, and with a glyph of its own.
 */
export default function TramCloseButtonScreen() {
  const theme = useXAUITheme()
  const [count, setCount] = useState(0)
  const [isNoticeShown, setIsNoticeShown] = useState(true)
  const press = () => setCount(value => value + 1)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="dans une page"
        note={`Le cercle de l'App Bar, dans l'encre de la page, au bout de la rangée du titre. Appuis : ${count}`}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Typography variant="pivot" style={{ flex: 1 }}>
            brouillon
          </Typography>
          <CloseButton accessibilityLabel="fermer le brouillon" onPress={press} />
        </View>
      </TramSection>

      <TramSection
        title="dans un panneau"
        note="text, sm : la croix seule, dans le coin de la surface discrète. Elle masque l'avis."
      >
        {isNoticeShown ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
              padding: 12,
              paddingEnd: 4,
              backgroundColor: theme.colors.surface,
            }}
          >
            <View style={{ flex: 1, gap: 2 }}>
              <Typography variant="body" color={theme.colors.surfaceForeground}>
                Synchronisation en pause
              </Typography>
              <Typography variant="caption" color={theme.colors.muted}>
                Le Wi-Fi est coupé. Les messages partiront au retour du réseau.
              </Typography>
            </View>
            <CloseButton
              variant="text"
              size="sm"
              accessibilityLabel="masquer l'avis"
              onPress={() => setIsNoticeShown(false)}
            />
          </View>
        ) : (
          <Row>
            <CloseButton
              variant="contained"
              size="sm"
              accessibilityLabel="remettre l'avis"
              onPress={() => setIsNoticeShown(true)}
            >
              <Icon as={BackIcon} />
            </CloseButton>
            <Typography variant="caption" color={theme.colors.muted}>
              remettre l'avis
            </Typography>
          </Row>
        )}
      </TramSection>

      <TramSection
        title="les variantes"
        note="outline : un trait de 2 et la croix. contained : un disque, la croix découpée dans le fond. text : la croix seule. Dans l'encre de la page, puis lime, magenta, cobalt et une couleur brute."
      >
        {VARIANTS.map(variant => (
          <Row key={variant} label={variant}>
            <CloseButton
              variant={variant}
              accessibilityLabel={`${variant}, encre`}
              onPress={press}
            />
            {ACCENTS.map(accent => (
              <CloseButton
                key={accent}
                variant={variant}
                accent={accent}
                accessibilityLabel={`${variant}, ${accent}`}
                onPress={press}
              />
            ))}
            <CloseButton
              variant={variant}
              color={RAW}
              accessibilityLabel={`${variant}, brut`}
              onPress={press}
            />
          </Row>
        ))}
      </TramSection>

      <TramSection
        title="les tailles"
        note="32, 40 et 48 de diamètre, la croix sur 16, 20 et 24. Toutes se pressent comme 48 : le hitSlop fait le reste."
      >
        {VARIANTS.map(variant => (
          <Row key={variant} label={variant}>
            {SIZES.map(size => (
              <CloseButton
                key={size}
                variant={variant}
                size={size}
                accessibilityLabel={`${variant}, ${size}`}
                onPress={press}
              />
            ))}
          </Row>
        ))}
      </TramSection>

      <TramSection
        title="désactivé"
        note="Le gris est l'état : un trait et une croix gris, ou un disque gris où la croix est découpée. Rien n'est atténué, et l'accent n'y change rien."
      >
        {VARIANTS.map(variant => (
          <Row key={variant} label={variant}>
            <CloseButton
              variant={variant}
              isDisabled
              accessibilityLabel={`${variant}, désactivé`}
            />
            <CloseButton
              variant={variant}
              accent="magenta"
              isDisabled
              accessibilityLabel={`${variant}, magenta, désactivé`}
            />
          </Row>
        ))}
      </TramSection>

      <TramSection
        title="un glyphe à soi"
        note="Un Icon en enfant remplace la croix et prend sa taille et son encre sans qu'on les lui dise."
      >
        <Row>
          {VARIANTS.map(variant => (
            <CloseButton
              key={variant}
              variant={variant}
              accent="lime"
              accessibilityLabel={`retour, ${variant}`}
              onPress={press}
            >
              <Icon as={BackIcon} />
            </CloseButton>
          ))}
        </Row>
      </TramSection>
    </ScrollView>
  )
}

type RowProps = { children: ReactNode; label?: string }

function Row({ children, label }: RowProps) {
  const theme = useXAUITheme()

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      {label ? (
        <Typography
          variant="caption"
          color={theme.colors.muted}
          style={{ width: 72 }}
        >
          {label}
        </Typography>
      ) : null}
      {children}
    </View>
  )
}
