import { Easing } from 'remotion'
import { loadFont as loadInter } from '@remotion/google-fonts/Inter'
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono'

/**
 * Every value of video/prompts/01-direction-artistique.md, in one place. A component
 * never hard-codes a colour, a size or a timing: it reads it here.
 */
const inter = loadInter('normal', { weights: ['400', '500'], subsets: ['latin'] })
const mono = loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] })

export const FPS = 30
export const WIDTH = 1920
export const HEIGHT = 1080

export const colors = {
  background: '#F4F4F4',
  text: '#1A1A1A',
  textSecondary: '#777777',
  /** The one accent: caption keyword, highlighted code line, intro stroke. */
  accent: '#0A84FF',
  shape1: '#C8C8C8',
  shape2: '#D0D0D0',
  shape3: '#E2E2E2',
  codeHighlight: '#EAF3FF',
  card: '#FFFFFF',
  cardBorder: '#E2E2E2',
  phoneBody: '#0B0B0C',
  ripple: 'rgba(0, 0, 0, 0.12)',
  rippleStroke: 'rgba(0, 0, 0, 0.28)',
} as const

export const fonts = {
  sans: inter.fontFamily,
  mono: mono.fontFamily,
} as const

export const type = {
  captionSize: 72,
  captionWeight: 500,
  captionLineHeight: 1.12,
  smallCaptionSize: 36,
  codeSize: 30,
  codeLineHeight: 1.62,
  bodyWeight: 400,
} as const

/** The phone: a black frame around the simulator's own screen (which has the island). */
export const phone = {
  /** iPhone 17 Pro, in points: the recordings are 3× this. */
  screenPoints: { width: 402, height: 874 },
  bezel: 14,
  screenRadiusRatio: 0.071,
  shadow: '0 40px 80px rgba(0, 0, 0, 0.08)',
  /** Screen height on each layout, in px at 1080p. */
  heroScreenHeight: 900,
  splitScreenHeight: 900,
  codeSplitScreenHeight: 780,
} as const

export const layout = {
  splitCaptionLeft: 150,
  splitCaptionWidth: 640,
  splitPhoneCenterX: 1290,
  codeCardLeft: 110,
  codeCardWidth: 1040,
  codeCardRadius: 28,
  codePhoneCenterX: 1545,
} as const

export const timing = {
  /** Crossfade between two different layouts. Same layout: a straight cut. */
  crossfadeFrames: 8,
  /** The caption enters this many frames before the scene's voice. */
  captionLeadFrames: 5,
  captionEnterFrames: 12,
  captionRisePx: 16,
  pushFrames: 26,
  cursorGlideFrames: 12,
  cursorLeadFrames: 22,
  rippleFrames: 10,
  rippleSizePx: 44,
  codeLineStaggerFrames: 4,
  codeLineEnterFrames: 10,
  highlightEnterFrames: 6,
} as const

export const easeInOutCubic = Easing.bezier(0.65, 0, 0.35, 1)

export const audio = {
  /** Music sits 28 dB under the voice, 20 dB when nobody talks. */
  musicUnderVoiceDb: -28,
  musicInGapsDb: -20,
  musicRampFrames: 8,
  musicFadeInSec: 1,
  musicFadeOutSec: 1.5,
  tickDb: -24,
  whooshDb: -30,
} as const

export const dbToGain = (db: number) => 10 ** (db / 20)
