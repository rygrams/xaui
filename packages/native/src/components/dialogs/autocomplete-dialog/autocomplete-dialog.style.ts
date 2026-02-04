import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
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
  },
  listContentContainer: {
    paddingBottom: 80,
  },
  checkmarkButtonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'flex-end',
  },
  checkmarkButton: {
    padding: 12,
  },
})
