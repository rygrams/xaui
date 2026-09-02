import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'flex-start',
  },
  fullWidth: {
    width: '100%',
    alignSelf: 'stretch',
  },
  tabPressable: {
    flex: 1,
    zIndex: 1,
  },
  tab: {
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
  cursor: {
    position: 'absolute',
    left: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    marginTop: 12,
  },
})
