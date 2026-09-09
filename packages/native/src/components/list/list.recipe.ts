import { StyleSheet } from 'react-native'
import { createRecipe } from '../../system/recipe'
import type { ListSlot } from './list.type'

const SLOTS = [
  'root',
  'item',
  'separator',
  'leading',
  'content',
  'title',
  'description',
  'action',
] as const satisfies readonly ListSlot[]

export const listRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'column' },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(3),
      paddingVertical: theme.spacing(3),
      paddingHorizontal: theme.spacing(4),
    },
    separator: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.separator,
    },
    leading: {
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.muted,
      fontSize: theme.fontSizes.lg,
    },
    content: {
      flex: 1,
      flexDirection: 'column',
      gap: theme.spacing(0.5),
    },
    title: {
      color: theme.colors.foreground,
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      fontSize: theme.fontSizes.md,
      lineHeight: theme.lineHeights.md,
    },
    description: {
      color: theme.colors.muted,
      fontFamily: theme.fontFamilies.body,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    },
    action: {
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.muted,
      fontSize: theme.fontSizes.lg,
    },
  }),
})
