import { forwardRef, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { clockAngle, clockPoint } from '../../utils/clock'
import { useTimePicker } from './time-picker.context'
import type { TimePickerViewProps } from './time-picker.type'

const HOURS_ON_A_FACE = 12
const MINUTES_IN_AN_HOUR = 60
/** Every fifth minute carries a number; the rest are marks with no label. */
const LABELLED_MINUTE = 5

/**
 * The dial: the marks, the hand, and the hub they turn about.
 *
 * **Two rings on a twenty-four hour face.** 1–12 sit on the outside and 13–00 on the inside,
 * which is the only way twenty-four numbers fit on a circle without the labels touching — and
 * what every platform's clock does.
 *
 * **The minutes show sixty marks and twelve labels.** A number on every minute is a smudge;
 * a mark on every minute is what makes a reader believe they can pick 07 as well as 05.
 * `minuteStep` coarsens both, for a picker that only wants quarters.
 *
 * **Tap the mark, not the face.** A drag round the dial needs a gesture recogniser and a
 * hit test against a moving angle; a press on a number needs neither and is what a reader
 * does anyway. The hand still travels to the choice, so the gesture reads as one motion.
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

    return (
      <View ref={ref} {...rest} style={[dialStyle, styleProps, style]}>
        <View style={faceStyle}>
          {/* Under the marks, so a chosen mark sits on the hand rather than beneath it. */}
          <View
            style={[
              handStyle,
              {
                height: radius * handRing,
                start: center.x - 1,
                top: center.y - radius * handRing,
                transform: [{ rotate: `${handAngle}deg` }],
              },
            ]}
          />
          <View style={[hubStyle, { start: center.x - 4, top: center.y - 4 }]} />

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
                  unit === 'hour' ? onPickHour(mark.value) : onPickMinute(mark.value)
                }
              >
                {mark.label === '' ? (
                  // An unlabelled minute is still a target, and a dot is what says so.
                  <View
                    style={[
                      hubStyle,
                      { position: 'relative', width: 4, height: 4, borderRadius: 2 },
                    ]}
                  />
                ) : (
                  <Text style={isChosen ? markLabelSelectedStyle : markLabelStyle}>
                    {mark.label}
                  </Text>
                )}
              </Pressable>
            )
          })}
          {children}
        </View>
      </View>
    )
  }
)

TimePickerClock.displayName = 'XAUI.TimePicker.Clock'
