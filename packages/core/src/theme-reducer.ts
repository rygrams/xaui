import { XUITheme } from './theme-config'

export type ThemeAction =
  | { type: 'SET_PRIMARY'; color: string }
  | { type: 'SET_ON_PRIMARY'; color: string }
  | { type: 'SET_PRIMARY_SURFACE'; color: string }
  | { type: 'SET_SECONDARY'; color: string }
  | { type: 'SET_ON_SECONDARY'; color: string }
  | { type: 'SET_SECONDARY_SURFACE'; color: string }
  | { type: 'SET_NEUTRAL'; color: string }
  | { type: 'SET_ON_NEUTRAL'; color: string }
  | { type: 'SET_NEUTRAL_SURFACE'; color: string }
  | { type: 'SET_DANGER'; color: string }
  | { type: 'SET_ON_DANGER'; color: string }
  | { type: 'SET_DANGER_SURFACE'; color: string }
  | { type: 'SET_WARNING'; color: string }
  | { type: 'SET_ON_WARNING'; color: string }
  | { type: 'SET_WARNING_SURFACE'; color: string }
  | { type: 'SET_SUCCESS'; color: string }
  | { type: 'SET_ON_SUCCESS'; color: string }
  | { type: 'SET_SUCCESS_SURFACE'; color: string }
  | { type: 'SET_INVERSE'; color: string }
  | { type: 'SET_ON_INVERSE'; color: string }
  | { type: 'SET_INVERSE_SURFACE'; color: string }
  | { type: 'SET_DEFAULT'; color: string }

export function themeReducer(state: XUITheme, action: ThemeAction): XUITheme {
  switch (action.type) {
    case 'SET_PRIMARY':
      if (state.colors.primary === action.color) return state
      return { ...state, colors: { ...state.colors, primary: action.color } }
    case 'SET_ON_PRIMARY':
      if (state.colors.onPrimary === action.color) return state
      return { ...state, colors: { ...state.colors, onPrimary: action.color } }
    case 'SET_PRIMARY_SURFACE':
      if (state.colors.primarySurface === action.color) return state
      return { ...state, colors: { ...state.colors, primarySurface: action.color } }
    case 'SET_SECONDARY':
      if (state.colors.secondary === action.color) return state
      return { ...state, colors: { ...state.colors, secondary: action.color } }
    case 'SET_ON_SECONDARY':
      if (state.colors.onSecondary === action.color) return state
      return { ...state, colors: { ...state.colors, onSecondary: action.color } }
    case 'SET_SECONDARY_SURFACE':
      if (state.colors.secondarySurface === action.color) return state
      return { ...state, colors: { ...state.colors, secondarySurface: action.color } }
    case 'SET_NEUTRAL':
      if (state.colors.neutral === action.color) return state
      return { ...state, colors: { ...state.colors, neutral: action.color } }
    case 'SET_ON_NEUTRAL':
      if (state.colors.onNeutral === action.color) return state
      return { ...state, colors: { ...state.colors, onNeutral: action.color } }
    case 'SET_NEUTRAL_SURFACE':
      if (state.colors.neutralSurface === action.color) return state
      return { ...state, colors: { ...state.colors, neutralSurface: action.color } }
    case 'SET_DANGER':
      if (state.colors.danger === action.color) return state
      return { ...state, colors: { ...state.colors, danger: action.color } }
    case 'SET_ON_DANGER':
      if (state.colors.onDanger === action.color) return state
      return { ...state, colors: { ...state.colors, onDanger: action.color } }
    case 'SET_DANGER_SURFACE':
      if (state.colors.dangerSurface === action.color) return state
      return { ...state, colors: { ...state.colors, dangerSurface: action.color } }
    case 'SET_WARNING':
      if (state.colors.warning === action.color) return state
      return { ...state, colors: { ...state.colors, warning: action.color } }
    case 'SET_ON_WARNING':
      if (state.colors.onWarning === action.color) return state
      return { ...state, colors: { ...state.colors, onWarning: action.color } }
    case 'SET_WARNING_SURFACE':
      if (state.colors.warningSurface === action.color) return state
      return { ...state, colors: { ...state.colors, warningSurface: action.color } }
    case 'SET_SUCCESS':
      if (state.colors.success === action.color) return state
      return { ...state, colors: { ...state.colors, success: action.color } }
    case 'SET_ON_SUCCESS':
      if (state.colors.onSuccess === action.color) return state
      return { ...state, colors: { ...state.colors, onSuccess: action.color } }
    case 'SET_SUCCESS_SURFACE':
      if (state.colors.successSurface === action.color) return state
      return { ...state, colors: { ...state.colors, successSurface: action.color } }
    case 'SET_INVERSE':
      if (state.colors.inverse === action.color) return state
      return { ...state, colors: { ...state.colors, inverse: action.color } }
    case 'SET_ON_INVERSE':
      if (state.colors.onInverse === action.color) return state
      return { ...state, colors: { ...state.colors, onInverse: action.color } }
    case 'SET_INVERSE_SURFACE':
      if (state.colors.inverseSurface === action.color) return state
      return { ...state, colors: { ...state.colors, inverseSurface: action.color } }
    case 'SET_DEFAULT':
      if (state.colors.default === action.color) return state
      return { ...state, colors: { ...state.colors, default: action.color } }
    default:
      return state
  }
}
