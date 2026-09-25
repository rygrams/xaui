import { ImageResponse } from 'next/og'
import { OG_IMAGE } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * The card every shared link shows, rendered once at build time. A route rather than the
 * `opengraph-image` convention: the export writes that one without an extension, and
 * nginx would serve it as a download instead of `image/png`.
 */
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 96,
        background: '#0B0B0F',
        color: '#FFFFFF',
      }}
    >
      <div style={{ fontSize: 40, color: '#A78BFA' }}>@xaui/native</div>
      <div
        style={{ fontSize: 88, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}
      >
        React Native UI components
      </div>
      <div style={{ fontSize: 36, color: '#A1A1AA', marginTop: 32 }}>
        Composable slots · Reanimated motion · Semantic theming · TypeScript
      </div>
    </div>,
    { width: OG_IMAGE.width, height: OG_IMAGE.height }
  )
}
