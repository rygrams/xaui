import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { XAUIProvider, createTheme } from '@xaui/native/theme'
import { Badge } from '../components/badge'
import { Chip } from '../components/chip'
import { Typography } from '../components/typography'

const themed = createTheme({ colors: { light: { accent: '#3b82f6' } } })

/**
 * The migration guarantee, not a component test: legacy holds no theme of its own, so a
 * frozen component must resolve its colours from the single v1 provider. This is the file
 * that fails loudly if theme state is ever put back into this package.
 */
describe('legacy under the v1 provider', () => {
  it('renders without a context error', () => {
    const { getByText } = render(
      <XAUIProvider>
        <Badge content="3" themeColor="primary">
          <Typography>Inbox</Typography>
        </Badge>
        <Chip label="tag" themeColor="danger" variant="flat" />
      </XAUIProvider>
    )
    expect(getByText('Inbox')).toBeTruthy()
  })

  it('renders under a themed provider in dark mode', () => {
    const { container } = render(
      <XAUIProvider theme={themed} colorMode="dark">
        <Badge content="9" themeColor="primary">
          <Typography>Themed</Typography>
        </Badge>
      </XAUIProvider>
    )
    expect(container.textContent).toContain('Themed')
  })

  it('throws the v1 named error outside any provider', () => {
    expect(() => render(<Chip label="Orphan" />)).toThrow(/XAUIProvider/)
  })
})
