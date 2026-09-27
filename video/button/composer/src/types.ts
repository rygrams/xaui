/** The shape of src/data.json, written by scripts/prepare.mjs. Frames are at 30 fps. */
export type Layout = 'intro' | 'hero' | 'split' | 'codeSplit' | 'outro'

export type Keyframe = { frame: number; scale: number; x: number; y: number }

export type Tap = { target: string; frame: number; rx: number; ry: number }

export type CalloutData = {
  type: 'circle' | 'arrow'
  target: string
  x: number
  y: number
  r?: number
  fromFrame: number
  toFrame: number
}

export type Word = { w: string; start: number; end: number }

export type Token = { content: string; color?: string }

export type SceneData = {
  id: string
  layout: Layout
  /** First frame in the composition, crossfade overlap included. */
  from: number
  durationInFrames: number
  /** Frames of crossfade with the previous scene; 0 is a straight cut. */
  transitionIn: number
  caption: {
    parts: { text: string; accent: boolean }[]
    onScreen: boolean
    enterFrame: number
  }
  voice: {
    src: string
    startFrame: number
    durationInFrames: number
    words: Word[]
  } | null
  clip: {
    src: string
    trimBeforeFrames: number
    playbackRate: number
    /** Frames the clip plays; after them its last frame is held. */
    playFrames: number
  } | null
  camera: Keyframe[]
  taps: Tap[]
  cursor: boolean
  callouts: CalloutData[]
  code: {
    label: string
    lines: Token[][]
    highlightLines: number[]
    firstLineFrame: number
    lineStagger: number
    highlightFrame: number
  } | null
  appearance: 'light' | 'dark'
}

export type VideoData = {
  fps: number
  durationInFrames: number
  scenes: SceneData[]
  music: { src: string; name: string } | null
  transitions: number[]
}

export type VideoProps = {
  withVoice: boolean
  withSfx: boolean
}
