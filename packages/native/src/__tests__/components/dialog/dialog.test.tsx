import { describe, expect, it } from 'vitest'
import type {
  DialogBackdrop,
  DialogBodyProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogPlacement,
  DialogProps,
  DialogSize,
} from '../../../components/dialog'

describe('Dialog Types', () => {
  it('exports DialogProps type with core fields', () => {
    const props: DialogProps = {
      isOpen: true,
      children: 'Dialog content',
      size: 'md',
      placement: 'center',
      radius: 'lg',
      backdrop: 'opaque',
      closeOnBackdropPress: true,
      hideBackdrop: false,
      animationType: 'fade',
      disableAnimation: false,
    }

    expect(props.isOpen).toBe(true)
    expect(props.children).toBe('Dialog content')
    expect(props.size).toBe('md')
    expect(props.placement).toBe('center')
    expect(props.radius).toBe('lg')
    expect(props.backdrop).toBe('opaque')
    expect(props.closeOnBackdropPress).toBe(true)
    expect(props.hideBackdrop).toBe(false)
    expect(props.animationType).toBe('fade')
    expect(props.disableAnimation).toBe(false)
  })

  it('exports union types', () => {
    const sizes: DialogSize[] = ['sm', 'md', 'lg', 'full']
    const placements: DialogPlacement[] = ['top', 'center', 'bottom']
    const backdrops: DialogBackdrop[] = ['transparent', 'blurred', 'opaque']

    expect(sizes).toHaveLength(4)
    expect(placements).toHaveLength(3)
    expect(backdrops).toHaveLength(3)
  })

  it('exports subcomponent prop types', () => {
    const headerProps: DialogHeaderProps = {
      children: 'Header',
      isClosable: true,
    }
    const bodyProps: DialogBodyProps = {
      children: 'Body',
    }
    const footerProps: DialogFooterProps = {
      children: 'Footer',
    }

    expect(headerProps.isClosable).toBe(true)
    expect(bodyProps.children).toBe('Body')
    expect(footerProps.children).toBe('Footer')
  })
})

