/**
 * One timing for the whole flip. The track's colour and the knob's slide are two worklets
 * on two nodes, and they have to arrive together — which they only do if neither owns the
 * number.
 *
 * 175ms is HeroUI's, and it is the length of the platform's own switch.
 */
export const SWITCH_DURATION = 175
