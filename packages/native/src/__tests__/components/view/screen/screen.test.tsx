import { describe, expect, it } from 'vitest'
import type { ScreenProps } from '../../../../components/view/screen/screen.type'

describe('Screen Types', () => {
  it('exports ScreenProps with theme background default behavior', () => {
    const props: ScreenProps = {
      children: 'Screen content',
    }

    expect(props).toBeDefined()
    expect(props.children).toBe('Screen content')
  })

  it('supports padding and safe area options', () => {
    const props: ScreenProps = {
      children: 'Screen content',
      padding: 16,
      safeArea: true,
    }

    expect(props.padding).toBe(16)
    expect(props.safeArea).toBe(true)
  })

  it('supports custom background color override', () => {
    const props: ScreenProps = {
      children: 'Screen content',
      backgroundColor: '#101010',
      style: { justifyContent: 'center' },
    }

    expect(props.backgroundColor).toBe('#101010')
    expect(props.style).toBeDefined()
  })
})
