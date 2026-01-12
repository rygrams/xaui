import { XUITheme } from './theme'

export type ThemeAction =
  | { type: 'SET_PRIMARY'; color: string }
  | { type: 'SET_SECONDARY'; color: string }
  | { type: 'SET_SUCCESS'; color: string }
  | { type: 'SET_WARNING'; color: string }
  | { type: 'SET_ERROR'; color: string }
  | { type: 'SET_INFO'; color: string }
  | { type: 'SET_TEXT_PRIMARY'; color: string }
  | { type: 'SET_TEXT_SECONDARY'; color: string }
  | { type: 'SET_TEXT_TERTIARY'; color: string }
  | { type: 'SET_TEXT_DISABLED'; color: string }
  | { type: 'SET_TEXT_INVERSE'; color: string }
  | { type: 'SET_BACKGROUND_PRIMARY'; color: string }
  | { type: 'SET_BACKGROUND_SECONDARY'; color: string }
  | { type: 'SET_BACKGROUND_TERTIARY'; color: string }
  | { type: 'SET_BACKGROUND_INVERSE'; color: string }
  | { type: 'SET_BORDER_PRIMARY'; color: string }
  | { type: 'SET_BORDER_SECONDARY'; color: string }
  | { type: 'SET_BORDER_FOCUS'; color: string }

export function themeReducer(state: XUITheme, action: ThemeAction): XUITheme {
  switch (action.type) {
    case 'SET_PRIMARY':
      if (state.colors.primary === action.color) return state
      return { ...state, colors: { ...state.colors, primary: action.color } }
    case 'SET_SECONDARY':
      if (state.colors.secondary === action.color) return state
      return { ...state, colors: { ...state.colors, secondary: action.color } }
    case 'SET_SUCCESS':
      if (state.colors.success === action.color) return state
      return { ...state, colors: { ...state.colors, success: action.color } }
    case 'SET_WARNING':
      if (state.colors.warning === action.color) return state
      return { ...state, colors: { ...state.colors, warning: action.color } }
    case 'SET_ERROR':
      if (state.colors.error === action.color) return state
      return { ...state, colors: { ...state.colors, error: action.color } }
    case 'SET_INFO':
      if (state.colors.info === action.color) return state
      return { ...state, colors: { ...state.colors, info: action.color } }
    case 'SET_TEXT_PRIMARY':
      if (state.colors.text.primary === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, primary: action.color },
        },
      }
    case 'SET_TEXT_SECONDARY':
      if (state.colors.text.secondary === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, secondary: action.color },
        },
      }
    case 'SET_TEXT_TERTIARY':
      if (state.colors.text.tertiary === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, tertiary: action.color },
        },
      }
    case 'SET_TEXT_DISABLED':
      if (state.colors.text.disabled === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, disabled: action.color },
        },
      }
    case 'SET_TEXT_INVERSE':
      if (state.colors.text.inverse === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, inverse: action.color },
        },
      }
    case 'SET_BACKGROUND_PRIMARY':
      if (state.colors.background.primary === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          background: { ...state.colors.background, primary: action.color },
        },
      }
    case 'SET_BACKGROUND_SECONDARY':
      if (state.colors.background.secondary === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          background: { ...state.colors.background, secondary: action.color },
        },
      }
    case 'SET_BACKGROUND_TERTIARY':
      if (state.colors.background.tertiary === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          background: { ...state.colors.background, tertiary: action.color },
        },
      }
    case 'SET_BACKGROUND_INVERSE':
      if (state.colors.background.inverse === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          background: { ...state.colors.background, inverse: action.color },
        },
      }
    case 'SET_BORDER_PRIMARY':
      if (state.colors.border.primary === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          border: { ...state.colors.border, primary: action.color },
        },
      }
    case 'SET_BORDER_SECONDARY':
      if (state.colors.border.secondary === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          border: { ...state.colors.border, secondary: action.color },
        },
      }
    case 'SET_BORDER_FOCUS':
      if (state.colors.border.focus === action.color) return state
      return {
        ...state,
        colors: {
          ...state.colors,
          border: { ...state.colors.border, focus: action.color },
        },
      }
    default:
      return state
  }
}
