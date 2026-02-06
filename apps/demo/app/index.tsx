import { useXUIColors } from '@xaui/native/core'
import { ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@xaui/native/button'
import { useRouter } from 'expo-router'
import { Margin } from '@xaui/native/view'

export default function HomeScreen() {
  const colors = useXUIColors()
  const router = useRouter()

  const [, setValue] = useState(0.1)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => prevValue + 0.06)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ScrollView
      style={{
        paddingVertical: 55,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
        gap: 12,
      }}
    >
      <Margin bottom={5}>
        <Button
          size="sm"
          onPress={() => router.push('/alerts')}
          variant="outlined"
          themeColor="primary"
        >
          View Alert Examples
        </Button>
      </Margin>
      <Margin bottom={5}>
        <Button
          size="sm"
          onPress={() => router.push('/badges')}
          variant="outlined"
          themeColor="secondary"
        >
          View Badge Examples
        </Button>
      </Margin>
      <Margin bottom={5}>
        <Button
          size="sm"
          onPress={() => router.push('/avatars')}
          variant="outlined"
          themeColor="primary"
        >
          View Avatar Examples
        </Button>
      </Margin>
      <Margin bottom={5}>
        <Button
          size="sm"
          onPress={() => router.push('/menus')}
          variant="outlined"
          themeColor="secondary"
        >
          View Menu Examples
        </Button>
      </Margin>
      <Margin bottom={5}>
        <Button
          size="sm"
          onPress={() => router.push('/datepicker')}
          variant="outlined"
          themeColor="primary"
        >
          View Datepicker Examples
        </Button>
      </Margin>
    </ScrollView>
  )
}
