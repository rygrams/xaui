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
  triggerWrapper: {
    position: 'relative',
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
  inputWrapper: {
    flex: 1,
    gap: 2,
  },
  input: {
    flexShrink: 1,
    padding: 0,
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
  helperText: {
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  listbox: {
    overflow: 'hidden',
    marginTop: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 50,
    elevation: 4,
  },
  listboxContent: {
    flexShrink: 1,
  },
  emptyMessage: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlign: 'center',
  },
  outsideLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
})
