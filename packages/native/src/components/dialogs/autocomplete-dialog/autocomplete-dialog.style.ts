import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogContainer: {
    flex: 1,
    zIndex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingRight: 40,
    borderRadius: 8,
    fontSize: 16,
  },
  clearInputButton: {
    position: 'absolute',
    right: 8,
    padding: 4,
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingBottom: 80,
  },
  checkmarkButtonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  checkmarkButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
})
