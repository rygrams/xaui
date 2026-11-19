import { createRecipe } from '@xaui/native/system'

const SLOTS = [
  'box',
  'field',
  'decorator',
  'rule',
  'rulePrefix',
  'ruleSuffix',
] as const

/** The `TextField`'s line — the `Button`'s 2 — for the rule between a key and the text. */
const LINE_WIDTH = 2

/**
 * One box around a cell, the field and a cell. The line's width, the corner, the ground and
 * the height are the `TextField`'s, read off its field style by the root — so a group and a
 * plain field on the same form are the same box. What is here is how the three are laid.
 *
 * The rule is the `NumberField`'s: `muted`, softer than the box's ink, so the box stays one
 * control and the key beside the text reads as part of it.
 */
export const fieldGroupRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    box: {
      flexDirection: 'row',
      alignItems: 'stretch',
      borderColor: theme.colors.fieldBorder,
      backgroundColor: theme.colors.fieldBackground,
      overflow: 'hidden',
    },
    // The box draws the line. A written `borderColor` also tells the field's own animated
    // line to step aside.
    field: {
      flex: 1,
      minWidth: 0,
      borderWidth: 0,
      borderRadius: 0,
      borderColor: theme.colors.fieldBackground,
      backgroundColor: theme.colors.fieldBackground,
    },
    decorator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rule: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: LINE_WIDTH,
      backgroundColor: theme.colors.muted,
    },
    // Each rule faces the text: the prefix's on its trailing side, the suffix's on its
    // leading one.
    rulePrefix: { end: 0 },
    ruleSuffix: { start: 0 },
  }),
})
