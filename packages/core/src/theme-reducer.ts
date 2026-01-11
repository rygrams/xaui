import { XAUITheme } from './theme'

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

export function themeReducer(state: XAUITheme, action: ThemeAction): XAUITheme {
  switch (action.type) {
    case 'SET_PRIMARY':
      return { ...state, colors: { ...state.colors, primary: action.color } }
    case 'SET_SECONDARY':
      return { ...state, colors: { ...state.colors, secondary: action.color } }
    case 'SET_SUCCESS':
      return { ...state, colors: { ...state.colors, success: action.color } }
    case 'SET_WARNING':
      return { ...state, colors: { ...state.colors, warning: action.color } }
    case 'SET_ERROR':
      return { ...state, colors: { ...state.colors, error: action.color } }
    case 'SET_INFO':
      return { ...state, colors: { ...state.colors, info: action.color } }
    case 'SET_TEXT_PRIMARY':
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, primary: action.color },
        },
      }
    case 'SET_TEXT_SECONDARY':
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, secondary: action.color },
        },
      }
    case 'SET_TEXT_TERTIARY':
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, tertiary: action.color },
        },
      }
    case 'SET_TEXT_DISABLED':
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, disabled: action.color },
        },
      }
    case 'SET_TEXT_INVERSE':
      return {
        ...state,
        colors: {
          ...state.colors,
          text: { ...state.colors.text, inverse: action.color },
        },
      }
    case 'SET_BACKGROUND_PRIMARY':
      return {
        ...state,
        colors: {
          ...state.colors,
          background: { ...state.colors.background, primary: action.color },
        },
      }
    case 'SET_BACKGROUND_SECONDARY':
      return {
        ...state,
        colors: {
          ...state.colors,
          background: { ...state.colors.background, secondary: action.color },
        },
      }
    case 'SET_BACKGROUND_TERTIARY':
      return {
        ...state,
        colors: {
          ...state.colors,
          background: { ...state.colors.background, tertiary: action.color },
        },
      }
    case 'SET_BACKGROUND_INVERSE':
      return {
        ...state,
        colors: {
          ...state.colors,
          background: { ...state.colors.background, inverse: action.color },
        },
      }
    case 'SET_BORDER_PRIMARY':
      return {
        ...state,
        colors: {
          ...state.colors,
          border: { ...state.colors.border, primary: action.color },
        },
      }
    case 'SET_BORDER_SECONDARY':
      return {
        ...state,
        colors: {
          ...state.colors,
          border: { ...state.colors.border, secondary: action.color },
        },
      }
    case 'SET_BORDER_FOCUS':
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
