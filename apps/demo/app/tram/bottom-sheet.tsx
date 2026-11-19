import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { BottomSheet } from '@xaui/tram/bottom-sheet'
import { Button } from '@xaui/tram/button'
import { NumberField } from '@xaui/tram/number-field'
import { TramSection } from '../../components/tram-section'

const LONG =
  "Pressage d'origine, pochette ouvrante, livret de huit pages. Le disque a été " +
  'nettoyé et écouté de bout en bout : aucun saut, un léger souffle sur la face B. ' +
  'Expédié sous quarante-huit heures dans un carton rigide, suivi compris. Cinq ' +
  'exemplaires au plus par commande, retour possible sous quatorze jours.'

/** A trigger as it is written nine times out of ten: a `Button`, through `asChild`. */
function Opener({ children }: { children: ReactNode }) {
  return (
    <BottomSheet.Trigger asChild>
      <Button variant="outline" alignSelf="flex-start">
        {children}
      </Button>
    </BottomSheet.Trigger>
  )
}

/** The band's head: its title, and the cross that pins itself in the top-end corner. */
function Head({ title }: { title: string }) {
  return (
    <>
      <BottomSheet.Title>{title}</BottomSheet.Title>
      <BottomSheet.Close accessibilityLabel="fermer" />
    </>
  )
}

/** An answer on the band: a contained `Button` — the accent reads on either band. */
function Answer({ children }: { children: string }) {
  return (
    <BottomSheet.Close asChild>
      <Button>{children}</Button>
    </BottomSheet.Close>
  )
}

/**
 * Where the Tram `BottomSheet` is verified, in dark and in light: the band alone with
 * its title and cross, controls on the band, controlled and not, one that must be
 * answered and cannot be dragged, a disabled trigger, `Trigger` and `Close` as text, a
 * long content, the style props, and an opening interrupted halfway.
 */
export default function TramBottomSheetScreen() {
  const theme = useXAUITheme()
  const [isOpen, setOpen] = useState(false)
  const [isHalfway, setHalfway] = useState(false)

  /** Opens, then closes before the way in has ended: the band sinks from where it is. */
  const interrupt = () => {
    setHalfway(true)
    setTimeout(() => setHalfway(false), 140)
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="la bande"
        note="Une bande de toute la largeur, dans le contraste du thème — blanche en sombre, noire en clair — sur la page assombrie. Elle monte à la hauteur de son contenu sur la courbe Metro, sans poignée ni second niveau ; la croix en haut à droite ou un glissement vers le bas la renvoie."
      >
        <BottomSheet>
          <Opener>ouvrir</Opener>
          <BottomSheet.Overlay />
          <BottomSheet.Content>
            <Head title="nuits de lagos" />
            <BottomSheet.Description>
              fela & co. · 1979 · 34 €
            </BottomSheet.Description>
            <Answer>ajouter au panier</Answer>
          </BottomSheet.Content>
        </BottomSheet>
      </TramSection>

      <TramSection
        title="des contrôles sur la bande"
        note="Ce qui est posé sur la bande lit l'autre mode : le thème clair sur une app sombre, le sombre sur une app claire. Le NumberField et le Button outline s'y dessinent dans l'encre de la bande, sans rien leur dire."
      >
        <BottomSheet>
          <Opener>commander</Opener>
          <BottomSheet.Overlay />
          <BottomSheet.Content>
            <Head title="nuits de lagos" />
            <NumberField defaultValue={1} min={1} max={5}>
              <NumberField.Label>exemplaires</NumberField.Label>
              <NumberField.Group>
                <NumberField.Decrement accessibilityLabel="un de moins" />
                <NumberField.Field />
                <NumberField.Increment accessibilityLabel="un de plus" />
              </NumberField.Group>
              <NumberField.Description>
                cinq au plus par commande
              </NumberField.Description>
            </NumberField>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <BottomSheet.Close asChild>
                <Button flex={1}>ajouter au panier</Button>
              </BottomSheet.Close>
              <BottomSheet.Close asChild>
                <Button flex={1} variant="outline">
                  plus tard
                </Button>
              </BottomSheet.Close>
            </View>
          </BottomSheet.Content>
        </BottomSheet>
      </TramSection>

      <TramSection
        title="contrôlée"
        note={`isOpen et onOpenChange : l'état vit ici — ${isOpen ? 'ouverte' : 'fermée'}. Le bouton l'ouvre sans Trigger.`}
      >
        <Button
          variant="outline"
          alignSelf="flex-start"
          onPress={() => setOpen(true)}
        >
          {"ouvrir de l'extérieur"}
        </Button>
        <BottomSheet isOpen={isOpen} onOpenChange={setOpen}>
          <BottomSheet.Overlay />
          <BottomSheet.Content>
            <Head title="moussolou" />
            <BottomSheet.Description>oumou sangaré · 1989</BottomSheet.Description>
            <Answer>ajouter au panier</Answer>
          </BottomSheet.Content>
        </BottomSheet>
      </TramSection>

      <TramSection
        title="l'entrée interrompue"
        note="Ouvre, puis referme 140 ms plus tard : la bande redescend d'où elle est, le fond avec elle."
      >
        <Button variant="outline" alignSelf="flex-start" onPress={interrupt}>
          ouvrir puis refermer
        </Button>
        <BottomSheet isOpen={isHalfway} onOpenChange={setHalfway}>
          <BottomSheet.Overlay />
          <BottomSheet.Content>
            <BottomSheet.Title>à peine entrevue</BottomSheet.Title>
          </BottomSheet.Content>
        </BottomSheet>
      </TramSection>

      <TramSection
        title="il faut répondre"
        note="isDismissable à false sur Overlay et isSwipeable à false sur Content : ni le fond, ni le retour du système, ni le glissement ne ferment."
      >
        <BottomSheet>
          <Opener>conditions</Opener>
          <BottomSheet.Overlay isDismissable={false} />
          <BottomSheet.Content isSwipeable={false}>
            <BottomSheet.Title>accepter les conditions de vente ?</BottomSheet.Title>
            <BottomSheet.Description>
              sans réponse, la commande ne continue pas.
            </BottomSheet.Description>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <BottomSheet.Close asChild>
                <Button flex={1}>accepter</Button>
              </BottomSheet.Close>
              <BottomSheet.Close asChild>
                <Button flex={1} variant="flat">
                  refuser
                </Button>
              </BottomSheet.Close>
            </View>
          </BottomSheet.Content>
        </BottomSheet>
      </TramSection>

      <TramSection
        title="désactivée"
        note="isDisabled : le Trigger est gris et n'ouvre pas — le Button de asChild comme le texte seul."
      >
        <BottomSheet isDisabled>
          <Opener>un button</Opener>
          <BottomSheet.Content>
            <BottomSheet.Title>jamais ouverte</BottomSheet.Title>
          </BottomSheet.Content>
        </BottomSheet>
        <BottomSheet isDisabled>
          <BottomSheet.Trigger>du texte seul</BottomSheet.Trigger>
          <BottomSheet.Content>
            <BottomSheet.Title>jamais ouverte</BottomSheet.Title>
          </BottomSheet.Content>
        </BottomSheet>
      </TramSection>

      <TramSection
        title="trigger et close en texte"
        note="Un texte seul est posé en body : dans l'encre de la page pour le Trigger, dans celle de la bande pour Close, à sa place dans le contenu. Vide, Close est la croix du coin."
      >
        <BottomSheet>
          <BottomSheet.Trigger>ouvrir, en texte seul</BottomSheet.Trigger>
          <BottomSheet.Overlay />
          <BottomSheet.Content>
            <BottomSheet.Title>la commande est partie</BottomSheet.Title>
            <BottomSheet.Close>fermer, en texte seul</BottomSheet.Close>
          </BottomSheet.Content>
        </BottomSheet>
      </TramSection>

      <TramSection
        title="un contenu long"
        note="La description passe à la ligne ; la bande prend la hauteur qu'il lui faut."
      >
        <BottomSheet>
          <Opener>contenu long</Opener>
          <BottomSheet.Overlay />
          <BottomSheet.Content>
            <Head title="rail band — buffet hôtel de la gare, bamako, 1973" />
            <BottomSheet.Description>{LONG}</BottomSheet.Description>
            <Answer>ajouter au panier</Answer>
          </BottomSheet.Content>
        </BottomSheet>
      </TramSection>

      <TramSection
        title="props de style"
        note="Les style props et style sur chaque slot : le fond plus dense (sa couleur ; son opacité reste celle de l'animation), la bande plus resserrée, le titre plus grand."
      >
        <BottomSheet>
          <Opener>habillée</Opener>
          <BottomSheet.Overlay backgroundColor="rgba(0, 0, 0, 0.8)" />
          <BottomSheet.Content paddingHorizontal={32} gap={8}>
            <BottomSheet.Title fontSize={32}>batterie faible</BottomSheet.Title>
            <BottomSheet.Description>
              il reste 5 % de charge.
            </BottomSheet.Description>
          </BottomSheet.Content>
        </BottomSheet>
      </TramSection>
    </ScrollView>
  )
}
