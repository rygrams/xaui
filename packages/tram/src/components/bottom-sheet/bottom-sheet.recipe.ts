import { createRecipe } from '@xaui/native/system'
import { accentInk } from '../../theme/accent-ink'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'

const SLOTS = [
  'overlay',
  'content',
  'title',
  'description',
  'trigger',
  'triggerLabel',
  'close',
  'closeLabel',
  'closeCorner',
  'closeBar',
] as const

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
 *
 * No grab bar: the band has one height, its content's. The way out is the cross of an
 * empty `Close`, in the band's top-end corner beside the title; the title keeps clear of
 * that corner whether a cross is there or not.
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
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(6),
        gap: theme.spacing(4),
      },
      title: {
        ...roleType('title', theme),
        color: ink,
        paddingEnd: TRAM_TOUCH_TARGET,
      },
      description: { ...roleType('body', theme), color: quiet },
      trigger: pressed,
      triggerLabel: { ...roleType('body', theme), color: theme.colors.foreground },
      close: { ...pressed, minWidth: TRAM_TOUCH_TARGET, alignItems: 'center' },
      closeLabel: { ...roleType('body', theme), color: ink },
      // The empty `Close`: a box of 48 pinned to the band's top end, beside the title's
      // first line, the cross's own edge on the band's padding.
      closeCorner: {
        position: 'absolute',
        top: theme.spacing(2),
        end: theme.spacing(6) - (TRAM_TOUCH_TARGET - CLOSE_BAR.length) / 2,
        width: TRAM_TOUCH_TARGET,
        height: TRAM_TOUCH_TARGET,
        alignItems: 'center',
        justifyContent: 'center',
      },
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
