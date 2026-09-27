import { AbsoluteFill, useCurrentFrame } from 'remotion'
import type { ReactNode } from 'react'
import { cameraAt, cameraTransform, type ScreenBox } from '../camera'
import { colors, phone } from '../theme'
import type { SceneData } from '../types'
import { Callout } from './Callout'
import { Cursor, TapRipples } from './Cursor'
import { IPhone } from './IPhone'

export function Background({ children }: { children?: ReactNode }) {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {children}
    </AbsoluteFill>
  )
}

/**
 * The phone's screen, centred on (cx, 540), `height` px tall. It does not float: under a
 * 2× push-in a 4 px drift doubles and reads as a shake, so once presented the phone holds
 * still and only the camera moves.
 */
export function useScreenBox(cx: number, height: number): ScreenBox {
  const width = (height * phone.screenPoints.width) / phone.screenPoints.height
  return { left: cx - width / 2, top: 540 - height / 2, width, height }
}

/**
 * The phone under the virtual camera, with everything that points at it: callouts move
 * with the zoom, the cursor and the ripple stay the size they are on a real screen.
 */
export function PhoneStage({ scene, box }: { scene: SceneData; box: ScreenBox }) {
  const frame = useCurrentFrame()
  const camera = cameraAt(scene.camera, frame)

  return (
    <AbsoluteFill>
      <AbsoluteFill style={cameraTransform(box, camera)}>
        <IPhone box={box} clip={scene.clip} />
      </AbsoluteFill>
      {scene.callouts.map(c => (
        <Callout
          key={`${c.target}-${c.fromFrame}`}
          callout={c}
          box={box}
          camera={camera}
        />
      ))}
      <TapRipples taps={scene.taps} box={box} camera={camera} />
      {scene.cursor ? <Cursor taps={scene.taps} box={box} camera={camera} /> : null}
    </AbsoluteFill>
  )
}
