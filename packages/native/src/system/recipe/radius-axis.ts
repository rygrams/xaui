import type { RadiusKey } from '../../theme/theme.type'
import type { StyleFn } from './recipe.type'

/**
 * The `radius` axis, which is the same ten lines in every component that has one — a key
 * of the radius scale, applied to one slot, overriding whatever `size` chose.
 *
 * It is written here rather than a third time in a recipe because that is the rule §2 bis
 * states: extract at the second use, and by the end of P3 this axis exists in a dozen
 * components. Nothing about it is component-specific except which slot carries the corner.
 *
 * ```ts
 * variants: { size: { … }, radius: radiusAxis('root') }
 * ```
 *
 * **More than one slot when a second node has to square off with the first.** A `Switch`
 * whose track lost its capsule and kept a circular knob is half-rounded, so the axis moves
 * both: `radiusAxis('track', 'thumb')`.
 *
 * The same named corner on each, not an inset-corrected one. Nesting rules would say the
 * inner radius is the outer less the gap, but here that reaches zero before the outer does
 * — at `xs` a 3pt track would hold a sharp-cornered knob — and two matched corners read
 * better than one correct one.
 *
 * Variadic rather than an array because every call but that one passes a single slot, and
 * `radiusAxis('root')` reads better than `radiusAxis(['root'])`.
 *
 * The return type is a full `Record<RadiusKey, …>` rather than a partial one, so
 * `createRecipe` still infers `radius="3xl"` as the axis's value union and a typo in a
 * caller's `radius` is a type error rather than a silently ignored key.
 */
export function radiusAxis<Slot extends string>(
  ...slots: Slot[]
): Record<RadiusKey, StyleFn<Slot>> {
  const axis = {} as Record<RadiusKey, StyleFn<Slot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme =>
      Object.fromEntries(
        slots.map(slot => [slot, { borderRadius: theme.radius[key] }])
      ) as ReturnType<StyleFn<Slot>>
  }

  return axis
}

/**
 * Listed rather than derived from a theme: the axis is built once at module load, before
 * any theme exists, and `RadiusKey` is a type that no longer exists at runtime.
 */
/**
 * Every radius the axis covers, in scale order.
 *
 * Exported because a recipe that *derives* a value from the corner — a nested well, an
 * inner border — has to walk the same list the axis is built on, and a second copy of it
 * would be a list that drifts.
 */
export const RADIUS_KEYS = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  'field',
  'full',
] as const satisfies readonly RadiusKey[]

/**
 * The list and the type describe the same set, and nothing but this pins them together —
 * `satisfies` above only proves every entry is a key, not that every key is an entry. A
 * radius added to the scale and forgotten here fails `type-check` naming it, instead of
 * shipping a `radius` value the axis silently ignores.
 */
type Assert<Drift extends never> = Drift
type _MissingFromAxis = Assert<Exclude<RadiusKey, (typeof RADIUS_KEYS)[number]>>
