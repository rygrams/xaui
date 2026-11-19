import { createRecipe } from '@xaui/native/system'
import { accentInk } from '../../theme/accent-ink'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'

const SLOTS = [
  'overlay',
  'content',
  'handle',
  'handleBar',
  'title',
  'description',
  'trigger',
  'triggerLabel',
  'close',
  'closeLabel',
  'closeBar',
] as const

/** The grab bar, in points: straight, where Native's is a pill. */
export const HANDLE_BAR = { width: 40, height: 4 } as const

/**
 * The box the bar sits in, in points: tall enough to set the bar off the band's top edge,
 * and reached to 48 by `hitSlop` when it is pressed.
 */
export const HANDLE_BOX = 24

/** The cross of an empty `Close`: two bars of 2, the `CloseButton`'s, 20 points across. */
export const CLOSE_BAR = { length: 20, line: 2 } as const

/**
 * The Metro sheet: a band the width of the screen, rising from the bottom, in the theme's
 * contrast — the `foreground` as its ground, the `background` as its ink: white on the
 * dark theme, black on the light one, as the `Menu`'s band is. No line, no shadow, no
 * corner. It sits over the page dimmed by the `Dialog`'s `backdrop`, flat, no blur.
 *
 * What is quieter than the title — the description — is `muted` as an ink on the band:
 * `muted` alone stays under 4.5:1 on either band.
 */
export const bottomSheetRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const band = theme.colors.foreground
    const ink = theme.colors.background
    const quiet = accentInk(theme.colors.muted, band)
    // A trigger or a way out left as plain text is still pressed like a control of 48.
    const pressed = {
      minHeight: TRAM_TOUCH_TARGET,
      justifyContent: 'center',
      alignSelf: 'flex-start',
    } as const

    return {
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
        backgroundColor: theme.colors.backdrop,
      },
      content: {
        alignSelf: 'stretch',
        backgroundColor: band,
        paddingHorizontal: theme.spacing(6),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(6),
        gap: theme.spacing(4),
      },
      handle: {
        alignSelf: 'center',
        width: TRAM_TOUCH_TARGET,
        height: HANDLE_BOX,
        alignItems: 'center',
        justifyContent: 'center',
      },
      // Half the band's ink: there, without reading as a line of text.
      handleBar: {
        width: HANDLE_BAR.width,
        height: HANDLE_BAR.height,
        backgroundColor: ink,
        opacity: 0.5,
      },
      title: { ...roleType('title', theme), color: ink },
      description: { ...roleType('body', theme), color: quiet },
      trigger: pressed,
      triggerLabel: { ...roleType('body', theme), color: theme.colors.foreground },
      close: { ...pressed, minWidth: TRAM_TOUCH_TARGET, alignItems: 'center' },
      closeLabel: { ...roleType('body', theme), color: ink },
      closeBar: {
        position: 'absolute',
        width: CLOSE_BAR.length,
        height: CLOSE_BAR.line,
        backgroundColor: ink,
      },
    }
  },

  states: {
    /** Grey. Not dimmed: the grey is the state. */
    disabled: theme => ({ triggerLabel: { color: theme.colors.muted } }),
  },
})
