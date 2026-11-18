import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { useAnimationDisabled } from '@xaui/native/system'
import { useTramEase } from '../../motion/use-tram-ease'
import { createCascadeTurns } from '../../system/cascade-turns'
import { useCascade } from '../../system/use-cascade'

/** How a list — or a group of them — arrives, read by everything that arrives in it. */
export type ListBoxEntrance = {
  /** The turn of the header, row or footer named `key` in the cascade. */
  turnOf: (key: string) => number
  /** Whether the list has mounted: a row that renders after that was added later. */
  hasEntered: () => boolean
  /** The rows arrive in a cascade: asked for, motion not reduced, no `disable-all`. */
  isCascading: boolean
  /** A row added or removed later opens or closes: motion not reduced, no `disable-all`. */
  isSizing: boolean
  /** The whole list fades in once, short: what is left of the cascade, motion reduced. */
  isFading: boolean
}

const EntranceContext = createContext<ListBoxEntrance | null>(null)
EntranceContext.displayName = 'XAUI.Tram.ListBox.Entrance'

export const ListBoxEntranceProvider = EntranceContext.Provider

/** The entrance of the group around a list, or `null` for a list on its own. */
export function useInheritedEntrance(): ListBoxEntrance | null {
  return useContext(EntranceContext)
}

/** The entrance of the group a header or a footer is in. A group always hands one down. */
export function useGroupEntrance(): ListBoxEntrance {
  const entrance = useContext(EntranceContext)

  if (entrance === null) {
    throw new Error(
      'XAUI: ListBoxGroup.Header and ListBoxGroup.Footer must be rendered inside ' +
        '<ListBoxGroup>: they arrive in its cascade.'
    )
  }

  return entrance
}

/**
 * The entrance a group — or a list on its own — hands to what is inside it. One per
 * group, so the cascade runs on through every section: the second header waits for the
 * last row of the first list.
 */
export function useEntranceOwner(hasEntrance: boolean): ListBoxEntrance {
  const [turns] = useState(createCascadeTurns)
  const entered = useRef(false)
  const isReduced = useReducedMotion()
  const isStill = useAnimationDisabled()

  // After the first commit: everything rendered with the list has taken its turn.
  useEffect(() => {
    entered.current = true
  }, [])

  return useMemo(
    () => ({
      turnOf: turns.turnOf,
      hasEntered: () => entered.current,
      isCascading: hasEntrance && !isReduced && !isStill,
      isSizing: !isReduced && !isStill,
      isFading: hasEntrance && isReduced && !isStill,
    }),
    [turns, hasEntrance, isReduced, isStill]
  )
}

/**
 * The fade of a whole list, with motion reduced: 150 ms, once, at mount. The rows are
 * placed where they are; the list is what appears.
 */
export function useEntranceFade(entrance: ListBoxEntrance) {
  const glide = useTramEase()
  // The value it starts from is the one the first render asked for, and stays so.
  const [isFading] = useState(entrance.isFading)
  const shown = useSharedValue(isFading ? 0 : 1)

  useEffect(() => {
    if (isFading) shown.value = glide(1)
  }, [isFading, glide, shown])

  return useAnimatedStyle(() => {
    'worklet'
    return { opacity: shown.value }
  }, [shown])
}

/**
 * How one header, row or footer arrives: its turn in the cascade, taken as it first
 * renders — so in the order the group is read — and whether it was added after the list
 * mounted, in which case it has no turn and opens in place instead.
 */
export function useArrival(entrance: ListBoxEntrance) {
  const key = useId()
  const [turn] = useState(() =>
    entrance.hasEntered() ? LATE : entrance.turnOf(key)
  )
  const isLate = turn === LATE
  const isPlaced = isLate || !entrance.isCascading

  const style = useCascade({
    isOpen: true,
    rank: Math.max(turn, 0),
    // Placed: there from its first frame, not one frame later.
    isKept: isPlaced,
    isStill: isPlaced,
  })

  return { style, isLate }
}

/** No turn: what a row rendered after the list mounted is given. */
const LATE = -1
