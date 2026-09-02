import { describe, expect, it } from 'vitest'
import type { DrawerPosition, DrawerProps } from '../../../components/drawer'

describe('Drawer Types', () => {
  it('exports DrawerProps type', () => {
    const props: DrawerProps = {
      children: 'Drawer content',
      isOpen: true,
      position: 'left',
      themeColor: 'primary',
      width: 320,
      height: 280,
      showOverlay: true,
      disableAnimation: false,
    }

    expect(props.children).toBe('Drawer content')
    expect(props.isOpen).toBe(true)
    expect(props.position).toBe('left')
    expect(props.themeColor).toBe('primary')
    expect(props.width).toBe(320)
    expect(props.height).toBe(280)
    expect(props.showOverlay).toBe(true)
    expect(props.disableAnimation).toBe(false)
  })

  it('exports DrawerPosition type', () => {
    const left: DrawerPosition = 'left'
    const right: DrawerPosition = 'right'
    const top: DrawerPosition = 'top'
    const bottom: DrawerPosition = 'bottom'

    expect(left).toBe('left')
    expect(right).toBe('right')
    expect(top).toBe('top')
    expect(bottom).toBe('bottom')
  })

  it('accepts all drawer positions', () => {
    const positions: DrawerPosition[] = ['left', 'right', 'top', 'bottom']
    expect(positions).toHaveLength(4)
  })

  it('accepts custom styles', () => {
    const props: DrawerProps = {
      children: 'Content',
      isOpen: true,
      customStyle: { backgroundColor: 'red' },
    }

    expect(props.customStyle).toBeDefined()
    expect(props.customStyle?.backgroundColor).toBe('red')
  })

  it('accepts onClose callback', () => {
    const onClose = () => {
      return
    }
    const props: DrawerProps = {
      children: 'Content',
      isOpen: true,
      onClose,
    }

    expect(props.onClose).toBe(onClose)
  })
})
