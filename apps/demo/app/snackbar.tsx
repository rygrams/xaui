import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Snackbar } from '@xaui/native/snackbar'
import { useXAUITheme } from '@xaui/native/theme'

export default function SnackbarScreen() {
  const theme = useXAUITheme()
  const [isVisible, setVisible] = useState(false)
  const [isPersistentVisible, setPersistentVisible] = useState(false)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 96 }}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Button onPress={() => setVisible(true)}>Afficher</Button>
        <Button variant="tertiary" onPress={() => setPersistentVisible(true)}>
          Avec action
        </Button>
        <Button
          variant="secondary"
          onPress={() => {
            setVisible(true)
            setPersistentVisible(true)
          }}
        >
          Afficher la pile
        </Button>
      </View>

      <Snackbar.Stack position="bottom" spacing={8}>
        <Snackbar isVisible={isVisible} onVisibleChange={setVisible}>
          <Snackbar.Message>
            Vos modifications ont été enregistrées.
          </Snackbar.Message>
        </Snackbar>

        <Snackbar
          isVisible={isPersistentVisible}
          onVisibleChange={setPersistentVisible}
          duration={0}
        >
          <Snackbar.Message>L’envoi a échoué.</Snackbar.Message>
          <Snackbar.Actions>
            <Snackbar.Action onPress={() => {}}>Réessayer</Snackbar.Action>
          </Snackbar.Actions>
        </Snackbar>
      </Snackbar.Stack>
    </ScrollView>
  )
}
