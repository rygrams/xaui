import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  horizontalItem: {
    flex: 1,
    alignItems: 'center',
    minWidth: 0,
  },
  verticalItem: {
    width: '100%',
  },
  horizontalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  verticalRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  line: {
    flex: 1,
    borderRadius: 99,
    overflow: 'hidden',
  },
  lineProgressWrap: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  lineProgressHorizontal: {
    alignItems: 'flex-start',
  },
  lineProgressVertical: {
    justifyContent: 'flex-start',
  },
  lineProgress: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
  },
  verticalLineWrap: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  locked: {
    opacity: 0.75,
  },
  disabled: {
    opacity: 0.5,
  },
  horizontalContent: {
    alignItems: 'center',
    width: '100%',
  },
  verticalContent: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
  },
  titleVertical: {
    textAlign: 'left',
  },
  description: {
    textAlign: 'center',
    fontWeight: '400',
  },
  descriptionVertical: {
    textAlign: 'left',
  },
})
