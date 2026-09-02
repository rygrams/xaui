import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    paddingBottom: 24,
  },
  sheetTitle: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  optionItemDisabled: {
    opacity: 0.4,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 20,
  },
})
