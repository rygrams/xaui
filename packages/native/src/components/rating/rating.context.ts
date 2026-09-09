import { createSlotContext } from '../../system/slot'
import type { RatingContextValue, RatingLayerContextValue } from './rating.type'

/**
 * R10 — `useRating` is exported so a control beside the row can read or set the value, and
 * so a caller can write their own mark against the same `select` the built-in ones call.
 * Outside a `<Rating>` it throws by name.
 */
export const [RatingProvider, useRating] =
  createSlotContext<RatingContextValue>('Rating')

/**
 * Which of a mark's two layers a glyph is drawn in.
 *
 * It exists so `Rating.Icon` needs no prop to know its colour: a mark is the same glyph
 * twice, once in the neutral ground and once in the filled colour clipped to the fraction
 * given, and the caller writes that glyph **once**. A `tone` prop would have made them write
 * it twice and keep the two in step.
 */
export const [RatingLayerProvider, useRatingLayer] =
  createSlotContext<RatingLayerContextValue>('Rating.Layer')
