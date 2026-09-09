import { ScrollView } from 'react-native'
import { Button } from '@xaui/native/button'
import { Snackbar, SnackbarHost, useSnackbar } from '@xaui/native/snackbar'
import { useXAUITheme } from '@xaui/native/theme'

export default function SnackbarScreen() {
  return (
    <SnackbarHost>
      <Screen />
    </SnackbarHost>
  )
}

function Screen() {
  const theme = useXAUITheme()
  const { toast } = useSnackbar()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Button
        onPress={() =>
          toast({
            variant: 'success',
            render: () => (
              <Snackbar variant="success">
                <Snackbar.Title>Enregistré</Snackbar.Title>
                <Snackbar.Description>
                  Vos modifications sont sur le serveur.
                </Snackbar.Description>
              </Snackbar>
            ),
          })
        }
      >
        Afficher le Snackbar
      </Button>
    </ScrollView>
  )
}
