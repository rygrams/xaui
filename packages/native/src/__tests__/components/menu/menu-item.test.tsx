import { describe, it, expect } from 'vitest'
import type { MenuItemProps } from '../../../components/menu'

describe('MenuItem Types', () => {
  it('exports MenuItemProps type', () => {
    const props: MenuItemProps = {
      title: 'Test Item',
      isDisabled: false,
      dense: false,
    }

    expect(props).toBeDefined()
    expect(props.title).toBe('Test Item')
    expect(props.isDisabled).toBe(false)
    expect(props.dense).toBe(false)
  })

  it('accepts string title', () => {
    const props: MenuItemProps = {
      title: 'Menu Item',
    }
    expect(props.title).toBe('Menu Item')
  })

  it('accepts ReactNode title', () => {
    const customTitle = 'Custom'
    const props: MenuItemProps = {
      title: customTitle,
    }
    expect(props.title).toBe(customTitle)
  })

  it('accepts startContent and endContent', () => {
    const startContent = 'S'
    const endContent = 'E'
    const props: MenuItemProps = {
      title: 'Item',
      startContent,
      endContent,
    }
    expect(props.startContent).toBe(startContent)
    expect(props.endContent).toBe(endContent)
  })

  it('accepts isDisabled prop', () => {
    const props: MenuItemProps = {
      title: 'Item',
      isDisabled: true,
    }
    expect(props.isDisabled).toBe(true)
  })

  it('accepts dense prop', () => {
    const props: MenuItemProps = {
      title: 'Item',
      dense: true,
    }
    expect(props.dense).toBe(true)
  })

  it('accepts onPress callback', () => {
    const onPress = () => {}
    const props: MenuItemProps = {
      title: 'Item',
      onPress,
    }
    expect(props.onPress).toBe(onPress)
  })

  it('accepts customAppearance styles', () => {
    const customAppearance = {
      container: { backgroundColor: 'red' },
      content: { padding: 10 },
      title: { fontSize: 18 },
    }
    const props: MenuItemProps = {
      title: 'Item',
      customAppearance,
    }
    expect(props.customAppearance).toBe(customAppearance)
  })

  it('accepts accessibilityLabel', () => {
    const props: MenuItemProps = {
      title: 'Item',
      accessibilityLabel: 'Custom Label',
    }
    expect(props.accessibilityLabel).toBe('Custom Label')
  })
})
