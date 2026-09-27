import { AbsoluteFill } from 'remotion'
import { colors, layout, phone, type } from '../theme'
import type { SceneData } from '../types'
import { Caption } from './Caption'
import { CodeCard } from './CodeCard'
import { Background, PhoneStage, useScreenBox } from './Stage'

/** Template 1: the phone alone, centred, no text. Openings and zooms. */
export function Hero({ scene }: { scene: SceneData }) {
  const box = useScreenBox(960, phone.heroScreenHeight)
  return (
    <Background>
      <PhoneStage scene={scene} box={box} />
    </Background>
  )
}

/** Template 2: the caption on the left 40 %, the phone on the right. */
export function Split({ scene }: { scene: SceneData }) {
  const box = useScreenBox(layout.splitPhoneCenterX, phone.splitScreenHeight)
  return (
    <Background>
      <PhoneStage scene={scene} box={box} />
      {scene.caption.onScreen ? (
        <AbsoluteFill
          style={{ justifyContent: 'center', paddingLeft: layout.splitCaptionLeft }}
        >
          <Caption
            caption={scene.caption}
            style={{ width: layout.splitCaptionWidth }}
          />
        </AbsoluteFill>
      ) : null}
    </Background>
  )
}

/** Template 3: the code card on the left, a smaller phone showing the result live. */
export function CodeSplit({ scene }: { scene: SceneData }) {
  const box = useScreenBox(layout.codePhoneCenterX, phone.codeSplitScreenHeight)
  return (
    <Background>
      <PhoneStage scene={scene} box={box} />
      <AbsoluteFill
        style={{ justifyContent: 'center', paddingLeft: layout.codeCardLeft }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <Caption
            caption={scene.caption}
            size={type.smallCaptionSize}
            color={colors.textSecondary}
            style={{ paddingLeft: 6 }}
          />
          {scene.code ? <CodeCard code={scene.code} /> : null}
        </div>
      </AbsoluteFill>
    </Background>
  )
}
