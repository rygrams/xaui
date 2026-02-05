import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  title: {
    fontWeight: '600',
  },
  description: {
    fontWeight: '400',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontWeight: '600',
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 4,
  },
  extraContent: {
    marginTop: 4,
  },
})
