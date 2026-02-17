import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  previewSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
  hexLabel: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  groupContainer: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  groupName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  swatch: {
    borderRadius: 6,
  },
  swatchSelected: {
    borderWidth: 3,
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 4,
  },
  triggerSwatch: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
  },
})
