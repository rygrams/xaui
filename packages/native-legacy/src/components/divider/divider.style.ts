import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    width: '100%',
  },
  vertical: {
    width: 1,
    alignSelf: 'stretch',
  },
})
