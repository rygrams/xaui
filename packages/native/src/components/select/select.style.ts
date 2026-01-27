import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  fullWidth: {
    width: '100%',
    alignSelf: 'stretch',
  },
  minWidth: {
    minWidth: 200,
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
  triggerContentColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  valueWrapper: {
    flex: 1,
    gap: 2,
  },
  valueText: {
    flexShrink: 1,
  },
  endSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  clearText: {
    fontSize: 12,
  },
  helperText: {
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  listbox: {
    overflow: 'hidden',
  },
  listboxContent: {
    flex: 1,
  },
  dialogTitle: {
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  outsideLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
})
