import { Fragment } from 'react'
import { AbsoluteFill } from 'remotion'
import { linearTiming, TransitionSeries } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'
import rawData from './data.json'
import { AudioMix } from './components/AudioMix'
import { Intro } from './components/Intro'
import { CodeSplit, Hero, Split } from './components/Layouts'
import { Outro } from './components/Outro'
import type { SceneData, VideoData, VideoProps } from './types'

export const data = rawData as VideoData

function Scene({ scene }: { scene: SceneData }) {
  switch (scene.layout) {
    case 'intro':
      return <Intro name="Button" />
    case 'outro':
      return <Outro url="ui.xtartapp.com" />
    case 'hero':
      return <Hero scene={scene} />
    case 'codeSplit':
      return <CodeSplit scene={scene} />
    default:
      return <Split scene={scene} />
  }
}

/**
 * The scenes in order: a straight cut inside a layout, an 8-frame crossfade between two.
 * The sound is laid out on the absolute timeline, beside the pictures, so a crossfade
 * never plays a voice twice.
 */
export function ButtonVideo({ withVoice, withSfx }: VideoProps) {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {data.scenes.map(scene => (
          <Fragment key={scene.id}>
            {scene.transitionIn ? (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: scene.transitionIn })}
              />
            ) : null}
            <TransitionSeries.Sequence durationInFrames={scene.durationInFrames}>
              <Scene scene={scene} />
            </TransitionSeries.Sequence>
          </Fragment>
        ))}
      </TransitionSeries>
      <AudioMix data={data} withVoice={withVoice} withSfx={withSfx} />
    </AbsoluteFill>
  )
}
