import { useXUITheme } from '../../../../packages/cor/core/dist'
import { View } from 'react-native'

export default function TabTwoScreen() {
  const { colors } = useXUITheme()

  return (
    <View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary.foreground,
          height: 100,
          width: 100,
        }}
      ></View>
    </View>
  )
}
