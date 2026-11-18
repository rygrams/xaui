import { Platform } from 'react-native'
import type { Role } from 'react-native'

/**
 * The list's role. React Native's `Role` has `option` and `combobox` but no `listbox`: a
 * phone is told `list`, which is what it can announce, and the web — where
 * `react-native-web` hands the role to the DOM as written — gets the real one, the role
 * `aria-controls` on the trigger and `aria-selected` on the options are read against.
 */
export const LIST_ROLE = (Platform.OS === 'web' ? 'listbox' : 'list') as Role
