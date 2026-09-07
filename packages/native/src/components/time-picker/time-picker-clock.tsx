import { forwardRef, useCallback, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import {
  angleAtPoint,
  clockAngle,
  clockPoint,
  distanceFrom,
  valueAtAngle,
} from '../../utils/clock'
import { HAND_WIDTH, HUB_SIZE } from './time-picker.recipe'
import { useTimePicker } from './time-picker.context'
import type { TimePickerViewProps } from './time-picker.type'

const HOURS_ON_A_FACE = 12
const MINUTES_IN_AN_HOUR = 60
/** Every fifth minute carries a number; the rest are targets with no label. */
const LABELLED_MINUTE = 5
/** How long a finger rests before a drag round the dial takes over from a tap on a mark. */
const DRAG_HOLD_MS = 220

/**
 * The dial: the marks, the hand, and the hub they turn about.
 *
 * **Two rings on a twenty-four hour face.** 1–12 sit on the outside and 13–00 on the inside,
 * which is the only way twenty-four numbers fit on a circle without the labels touching — and
 * what every platform's clock does.
 *
 * **The minutes show twelve labels and forty-eight bare targets.** A number on every minute
 * is a smudge; an unlabelled minute is still pressable, just not drawn — the reader picks it
 * by dragging the hand onto it rather than by aiming at a dot. `minuteStep` coarsens the
 * targets, for a picker that only wants quarters.
 *
 * **Tap a mark, or hold and turn the hand.** A press on a number is what a reader does by
 * reflex and needs no gesture recogniser. Past that, holding anywhere on the face for a beat
 * hands the dial to a drag: the hand follows the finger and the value under it is chosen,
 * live. The hold is what keeps the two apart — a quick tap still lands on the mark beneath
 * it.
 *
 * Every mark is placed by `clockPoint` — a fixed box pulled back by half of it, which is the
 * only placement that works at every angle without measuring the text.
 */
export const TimePickerClock = forwardRef<View, TimePickerViewProps>(
  function TimePickerClock({ children, style, ...props }, ref) {
    const {
      dialStyle,
      faceStyle,
      markStyle,
      markSelectedStyle,
      markLabelStyle,
      markLabelSelectedStyle,
      handStyle,
      hubStyle,
      dial,
      hours,
      minutes,
      hourCycle,
      minuteStep,
      unit,
      onPickHour,
      onPickMinute,
      isDisabled,
    } = useTimePicker()
    const [styleProps, rest] = useStyleProps(props)

    const center = { x: dial.box / 2, y: dial.box / 2 }
    const radius = dial.box / 2

    const marks = useMemo(() => {
      if (unit === 'hour') {
        const outer = Array.from({ length: HOURS_ON_A_FACE }, (_, index) => {
          // Twelve rather than zero at the top of a twelve-hour face, and 12 rather than 0
          // on a twenty-four hour one — a clock has no hour zero written on it.
          const value = index === 0 ? HOURS_ON_A_FACE : index

          return {
            value,
            label: String(value),
            angle: clockAngle(index, HOURS_ON_A_FACE),
            ring: dial.ring,
          }
        })

        if (hourCycle === 12) return outer

        const inner = Array.from({ length: HOURS_ON_A_FACE }, (_, index) => {
          const value = index === 0 ? 0 : index + HOURS_ON_A_FACE

          return {
            value,
            // `00` rather than `24`: midnight is the start of a day and not its end, and
            // the hour the field reports is 0.
            label: String(value).padStart(2, '0'),
            angle: clockAngle(index, HOURS_ON_A_FACE),
            ring: dial.innerRing,
          }
        })

        return [...outer, ...inner]
      }

      const step = Math.max(1, minuteStep)

      return Array.from(
        { length: Math.floor(MINUTES_IN_AN_HOUR / step) },
        (_, index) => {
          const value = (index * step) % MINUTES_IN_AN_HOUR

          return {
            value,
            label:
              value % LABELLED_MINUTE === 0 ? String(value).padStart(2, '0') : '',
            angle: clockAngle(value, MINUTES_IN_AN_HOUR),
            ring: dial.ring,
          }
        }
      )
    }, [dial.innerRing, dial.ring, hourCycle, minuteStep, unit])

    const chosen = unit === 'hour' ? hours : minutes
    const handAngle =
      unit === 'hour'
        ? clockAngle(hours % HOURS_ON_A_FACE, HOURS_ON_A_FACE)
        : clockAngle(minutes, MINUTES_IN_AN_HOUR)
    // The hand reaches the ring the chosen mark is on, so the inner hours of a twenty-four
    // hour face do not have a hand overshooting past them.
    const handRing =
      unit === 'hour' && hourCycle === 24 && (hours === 0 || hours > HOURS_ON_A_FACE)
        ? dial.innerRing
        : dial.ring

    /**
     * The value the finger is over. For a twenty-four hour face the ring is read from the
     * distance to the centre — the outer numbers are 1–12, the inner ones 13–00.
     */
    const pickAt = useCallback(
      (x: number, y: number) => {
        const point = { x, y }
        const angle = angleAtPoint(center, point)

        if (unit === 'minute') {
          const step = Math.max(1, minuteStep)
          const raw = valueAtAngle(angle, MINUTES_IN_AN_HOUR)
          onPickMinute((Math.round(raw / step) * step) % MINUTES_IN_AN_HOUR)
          return
        }

        const raw = valueAtAngle(angle, HOURS_ON_A_FACE)
        if (hourCycle === 12) {
          onPickHour(raw === 0 ? HOURS_ON_A_FACE : raw)
          return
        }

        const onInner =
          distanceFrom(center, point) < radius * (dial.ring + dial.innerRing) * 0.5
        if (onInner) onPickHour(raw === 0 ? 0 : raw + HOURS_ON_A_FACE)
        else onPickHour(raw === 0 ? HOURS_ON_A_FACE : raw)
      },
      [
        center,
        radius,
        unit,
        minuteStep,
        hourCycle,
        dial.ring,
        dial.innerRing,
        onPickHour,
        onPickMinute,
      ]
    )

    const drag = useMemo(
      () =>
        Gesture.Pan()
          .enabled(!isDisabled)
          // The hold is what keeps a drag from stealing a tap meant for a mark.
          .activateAfterLongPress(DRAG_HOLD_MS)
          .onStart(event => runOnJS(pickAt)(event.x, event.y))
          .onUpdate(event => runOnJS(pickAt)(event.x, event.y)),
      [isDisabled, pickAt]
    )

    return (
      <View ref={ref} {...rest} style={[dialStyle, styleProps, style]}>
        <GestureDetector gesture={drag}>
          <View style={faceStyle}>
            {/* Under the marks, so a chosen mark sits on the hand rather than beneath it. */}
            <View
              style={[
                handStyle,
                {
                  height: radius * handRing,
                  start: center.x - HAND_WIDTH / 2,
                  top: center.y - radius * handRing,
                  transform: [{ rotate: `${handAngle}deg` }],
                },
              ]}
            />
            <View
              style={[
                hubStyle,
                { start: center.x - HUB_SIZE / 2, top: center.y - HUB_SIZE / 2 },
              ]}
            />

            {marks.map(mark => {
              const at = clockPoint(center, radius * mark.ring, mark.angle)
              const isChosen = mark.value === chosen

              return (
                <Pressable
                  key={`${unit}-${mark.value}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isChosen, disabled: isDisabled }}
                  accessibilityValue={{ text: mark.label || String(mark.value) }}
                  disabled={isDisabled}
                  style={[
                    isChosen ? markSelectedStyle : markStyle,
                    { start: at.x - dial.mark / 2, top: at.y - dial.mark / 2 },
                  ]}
                  onPress={() =>
                    unit === 'hour'
                      ? onPickHour(mark.value)
                      : onPickMinute(mark.value)
                  }
                >
                  {mark.label === '' ? null : (
                    <Text style={isChosen ? markLabelSelectedStyle : markLabelStyle}>
                      {mark.label}
                    </Text>
                  )}
                </Pressable>
              )
            })}
            {children}
          </View>
        </GestureDetector>
      </View>
    )
  }
)

TimePickerClock.displayName = 'XAUI.TimePicker.Clock'
