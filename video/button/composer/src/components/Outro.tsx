import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { colors, fonts, phone } from '../theme'
import { Background } from './Stage'

const LOGO = 260
/** The logo's own corner radius: 229 on its 1024 grid. */
const LOGO_RADIUS = (229 / 1024) * LOGO

/**
 * The logo arrives (scale 0.9 → 1, fading in) with the URL under it. Its rounded square
 * is the same #F4F4F4 as the ground, so it wears the phone's shadow to keep its shape.
 */
export function Outro({ url }: { url: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const arrive = spring({
    frame: frame - 4,
    fps,
    config: { damping: 20, stiffness: 90 },
  })
  const text = interpolate(frame, [16, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <Background>
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 46,
        }}
      >
        <div
          style={{
            width: LOGO,
            height: LOGO,
            borderRadius: LOGO_RADIUS,
            boxShadow: phone.shadow,
            opacity: arrive,
            transform: `scale(${0.9 + 0.1 * arrive})`,
          }}
        >
          <Img
            src={staticFile('logo.svg')}
            style={{ width: LOGO, height: LOGO, display: 'block' }}
          />
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontWeight: 500,
            fontSize: 46,
            letterSpacing: '-0.01em',
            color: colors.text,
            opacity: text,
            transform: `translateY(${(1 - text) * 12}px)`,
          }}
        >
          {url}
        </div>
      </AbsoluteFill>
    </Background>
  )
}
