import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  verticalRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  trackContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  verticalTrackContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  verticalTrack: {
    width: 8,
    height: '100%',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  verticalFill: {
    left: 0,
    bottom: 0,
    top: undefined,
  },
  thumb: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mark: {
    position: 'absolute',
    alignItems: 'center',
  },
  stepDot: {
    position: 'absolute',
    borderRadius: 999,
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    fontWeight: '600',
  },
  value: {
    fontWeight: '500',
  },
  markLabel: {
    marginTop: 6,
    fontSize: 12,
  },
})
