import { Freeze, OffthreadVideo, Sequence, staticFile } from 'remotion'
import type { CSSProperties } from 'react'
import { colors, phone } from '../theme'
import type { ScreenBox } from '../camera'
import type { SceneData } from '../types'

/** The recording, played, slowed or held on its last frame to fill the scene. */
function Clip({ clip }: { clip: NonNullable<SceneData['clip']> }) {
  const video = (
    <OffthreadVideo
      src={staticFile(clip.src)}
      trimBefore={clip.trimBeforeFrames || undefined}
      playbackRate={clip.playbackRate}
      muted
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
  return (
    <>
      <Sequence durationInFrames={clip.playFrames} layout="none">
        {video}
      </Sequence>
      <Sequence from={clip.playFrames} layout="none">
        <Freeze frame={Math.max(0, clip.playFrames - 1)}>{video}</Freeze>
      </Sequence>
    </>
  )
}

function SideButton({ style }: { style: CSSProperties }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: 5,
        borderRadius: 3,
        background: colors.phoneBody,
        ...style,
      }}
    />
  )
}

/**
 * A black iPhone frame around the simulator's own screen, which already carries the
 * Dynamic Island and the 9:41 status bar. A soft, wide shadow and no reflection.
 */
export function IPhone({
  box,
  clip,
  style,
}: {
  box: ScreenBox
  clip: SceneData['clip']
  style?: CSSProperties
}) {
  const bezel = phone.bezel
  const radius = box.height * phone.screenRadiusRatio
  const outer = { width: box.width + bezel * 2, height: box.height + bezel * 2 }
  const scale = box.height / 900

  return (
    <div
      style={{
        position: 'absolute',
        left: box.left - bezel,
        top: box.top - bezel,
        ...outer,
        ...style,
      }}
    >
      <SideButton style={{ left: -4, top: 170 * scale, height: 34 * scale }} />
      <SideButton style={{ left: -4, top: 232 * scale, height: 64 * scale }} />
      <SideButton style={{ left: -4, top: 310 * scale, height: 64 * scale }} />
      <SideButton style={{ right: -4, top: 260 * scale, height: 100 * scale }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius + bezel,
          background: colors.phoneBody,
          boxShadow: `${phone.shadow}, inset 0 0 0 1.5px #2B2B2E`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: bezel,
          top: bezel,
          width: box.width,
          height: box.height,
          borderRadius: radius,
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {clip ? <Clip clip={clip} /> : null}
      </div>
    </div>
  )
}
