import { createSlotContext } from '@xaui/native/system'
import type { RatingContextValue, RatingLayerContextValue } from './rating.type'

/**
 * `useRating` is exported so a control beside the row can read or set the value, and so a
 * caller can write their own mark against the same `select`. Outside a `<Rating>` it
 * throws by name.
 */
export const [RatingProvider, useRating] =
  createSlotContext<RatingContextValue>('Tram.Rating')

/**
 * Which of a mark's two layers a glyph is drawn in: the caller writes the glyph once, and
 * each copy reads its colour from here.
 */
export const [RatingLayerProvider, useRatingLayer] =
  createSlotContext<RatingLayerContextValue>('Tram.Rating.Layer')
