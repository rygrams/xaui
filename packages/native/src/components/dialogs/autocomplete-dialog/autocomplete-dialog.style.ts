import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
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
  closeButton: {
    padding: 8,
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
  },
  checkmarkButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    padding: 12,
  },
})
