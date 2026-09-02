import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    gap: 6,
    position: 'relative',
  },
  fullWidth: {
    flexShrink: 1,
    flexBasis: 'auto',
    width: '100%',
  },
  minWidth: {
    minWidth: 170,
  },
  label: {
    fontWeight: '500',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  triggerText: {
    flex: 1,
  },
  clearButton: {
    padding: 2,
    paddingLeft: 4,
    marginRight: -4,
  },
  helperText: {
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  outsideLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
})
