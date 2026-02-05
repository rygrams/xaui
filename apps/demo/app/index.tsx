import { useXUIColors } from '@xaui/native/core'
import { ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@xaui/native/button'
import { useRouter } from 'expo-router'

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
      <Button
        size="sm"
        onPress={() => router.push('/alerts')}
        variant="outlined"
        themeColor="primary"
        style={{ marginBottom: 12 }}
      >
        View Alert Examples
      </Button>
      <Button
        size="sm"
        onPress={() => router.push('/badges')}
        variant="outlined"
        themeColor="success"
        style={{ marginBottom: 12 }}
      >
        View Badge Examples
      </Button>
      <Button
        size="sm"
        onPress={() => router.push('/avatars')}
        variant="outlined"
        themeColor="warning"
      >
        View Avatar Examples
      </Button>
    </ScrollView>
  )
}
