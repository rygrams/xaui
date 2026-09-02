import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropTransparent: {
    backgroundColor: 'transparent',
  },
  backdropBlurred: {
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  backdropOpaque: {
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },
  placementBase: {
    flex: 1,
    paddingHorizontal: 16,
  },
  placementTop: {
    justifyContent: 'flex-start',
    paddingTop: 44,
    paddingBottom: 16,
  },
  placementCenter: {
    justifyContent: 'center',
    paddingVertical: 16,
  },
  placementBottom: {
    justifyContent: 'flex-end',
    paddingTop: 16,
    paddingBottom: 28,
  },
  dialog: {
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
  sizeSm: {
    maxWidth: 360,
  },
  sizeMd: {
    maxWidth: 520,
  },
  sizeLg: {
    maxWidth: 700,
  },
  sizeFull: {
    maxWidth: '100%',
    flex: 1,
  },
  header: {
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    paddingTop: 8,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  closeButton: {
    padding: 4,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
