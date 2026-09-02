import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  fullWidth: {
    flexShrink: 1,
    flexBasis: 'auto',
    width: '100%',
  },
  disabled: {
    opacity: 0.55,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    includeFontPadding: false,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    includeFontPadding: false,
  },
})
