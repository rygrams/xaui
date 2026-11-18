import { createRecipe } from '@xaui/native/system'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'

const SLOTS = [
  'overlay',
  'content',
  'title',
  'description',
  'trigger',
  'close',
  'label',
] as const

export const dialogRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    // A trigger or a way out left as plain text is still pressed like a control of 48.
    const pressed = {
      minHeight: TRAM_TOUCH_TARGET,
      justifyContent: 'center',
      alignSelf: 'flex-start',
    } as const

    return {
      // The page's ground, dimmed: flat black at the theme's own strength. No blur.
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
        backgroundColor: theme.colors.backdrop,
      },
      // A band across the top of the screen, edge to edge: the discreet surface and
      // nothing around it — no line, no shadow, no corner.
      content: {
        alignSelf: 'stretch',
        maxHeight: '100%',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing(6),
        gap: theme.spacing(4),
        backfaceVisibility: 'hidden',
      },
      title: { ...roleType('title', theme), color: theme.colors.foreground },
      description: { ...roleType('body', theme), color: theme.colors.muted },
      trigger: pressed,
      close: pressed,
      label: { ...roleType('body', theme), color: theme.colors.foreground },
    }
  },

  states: {
    /** Grey. Not dimmed: the grey is the state. */
    disabled: theme => ({ label: { color: theme.colors.muted } }),
  },
})
