import { Text, View } from 'react-native'
import {
  Column,
  ConditionalView,
  Grid,
  GridItem,
  Margin,
  Row,
  SizedBox,
} from '@xaui/native/view'
import { colors } from '@xaui/core/palette'
import { Button } from '@xaui/native/button'
import { useXUITheme } from '@xaui/native/core'
import React, { useEffect } from 'react'
export default function HomeScreen() {
  const [isVisible, setIsVisible] = React.useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])
  const theme = useXUITheme()
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Margin top={48}>
        <Column spacing={16} style={{ padding: 16 }} fullWidth>
          <Row spacing={8} fullWidth>
            <Button themeColor="primary" fullWidth>
              one
            </Button>
            <Button themeColor="secondary" fullWidth>
              two
            </Button>
            <ConditionalView isVisible={isVisible} animation="scale">
              <Button themeColor="tertiary">three</Button>
            </ConditionalView>
          </Row>
          <Grid columns={3} spacing={6}>
            {Array.from({ length: 9 }).map((_, index) => (
              <GridItem
                key={index}
                style={{
                  backgroundColor:
                    Math.random() > 0.5 ? colors.blue[500] : colors.purple[500],
                  flex: 1,
                  height: 65,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Item {index + 1}
                </Text>
              </GridItem>
            ))}
          </Grid>
        </Column>
      </Margin>
      <Margin top={8} left={16}>
        <SizedBox
          height={200}
          width={200}
          style={{
            backgroundColor: theme.colors.danger.main,
            borderRadius: 8,
          }}
        />
      </Margin>
      s
    </View>
  )
}
