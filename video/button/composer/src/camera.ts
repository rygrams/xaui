import { interpolate } from 'remotion'
import { easeInOutCubic, HEIGHT } from './theme'
import type { Keyframe } from './types'

export type Camera = { scale: number; x: number; y: number }

/** The screen of the phone, in composition pixels, before the camera. */
export type ScreenBox = { left: number; top: number; width: number; height: number }

const WIDE: Camera = { scale: 1, x: 0.5, y: 0.5 }

/** The camera at `frame`, eased between the storyboard's keyframes. */
export function cameraAt(keyframes: Keyframe[], frame: number): Camera {
  if (!keyframes.length) return WIDE
  if (frame <= keyframes[0].frame) return keyframes[0]
  const last = keyframes[keyframes.length - 1]
  if (frame >= last.frame) return last
  const i = keyframes.findIndex(k => k.frame > frame) - 1
  const a = keyframes[i]
  const b = keyframes[i + 1]
  const t = interpolate(frame, [a.frame, b.frame], [0, 1], {
    easing: easeInOutCubic,
  })
  return {
    scale: a.scale + (b.scale - a.scale) * t,
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  }
}

/**
 * The focus point, and where it is shown. The point stays in its column and drifts to the
 * frame's vertical middle as the zoom grows: at 1.8× it is centred, so the phone leaves
 * the frame at the top and the bottom — as the art direction wants.
 */
export function focus(box: ScreenBox, camera: Camera) {
  const fx = box.left + camera.x * box.width
  const fy = box.top + camera.y * box.height
  const t = Math.min(1, Math.max(0, (camera.scale - 1) / 0.8))
  return { fx, fy, dx: fx, dy: fy + (HEIGHT / 2 - fy) * t }
}

/** The CSS transform that applies the camera to anything laid out in the phone's space. */
export function cameraTransform(box: ScreenBox, camera: Camera) {
  const { fx, fy, dx, dy } = focus(box, camera)
  return {
    transformOrigin: `${fx}px ${fy}px`,
    transform: `translate(${dx - fx}px, ${dy - fy}px) scale(${camera.scale})`,
  }
}

/** Where a point of the screen (0–1) lands in the frame once the camera is applied. */
export function project(box: ScreenBox, camera: Camera, rx: number, ry: number) {
  const { fx, fy, dx, dy } = focus(box, camera)
  const px = box.left + rx * box.width
  const py = box.top + ry * box.height
  return { x: dx + (px - fx) * camera.scale, y: dy + (py - fy) * camera.scale }
}
