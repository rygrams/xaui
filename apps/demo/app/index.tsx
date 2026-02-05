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
        paddingVertical: 32,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
      }}
    >
      <Button
        size="lg"
        onPress={() => router.push('/alerts')}
        variant="outlined"
        themeColor="primary"
      >
        View Alert Examples
      </Button>
    </ScrollView>
  )
}
