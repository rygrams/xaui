import { Composition } from 'remotion'
import { ButtonVideo, data } from './Video'
import { FPS, HEIGHT, WIDTH } from './theme'
import type { VideoProps } from './types'

export function Root() {
  return (
    <>
      <Composition
        id="Button16x9"
        component={ButtonVideo}
        durationInFrames={data.durationInFrames}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ withVoice: true, withSfx: true } satisfies VideoProps}
      />
      {/* For the docs: the same picture, no voice and no interface sounds. */}
      <Composition
        id="Button16x9NoSound"
        component={ButtonVideo}
        durationInFrames={data.durationInFrames}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ withVoice: false, withSfx: false } satisfies VideoProps}
      />
    </>
  )
}
