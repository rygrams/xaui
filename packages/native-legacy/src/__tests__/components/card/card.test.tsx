import { describe, expect, it } from 'vitest'
import type {
  CardBodyProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from '../../../components/card'

describe('Card Types', () => {
  it('exports CardProps type', () => {
    const props: CardProps = {
      children: 'Card content',
      themeColor: 'primary',
      radius: 'lg',
      elevation: 2,
      isPressable: true,
      isHoverable: true,
      isBlurred: false,
      isFooterBlurred: false,
      fullWidth: false,
      isDisabled: false,
      disableAnimation: false,
      disableRipple: false,
      allowTextSelectionOnPress: false,
    }

    expect(props.children).toBe('Card content')
    expect(props.themeColor).toBe('primary')
    expect(props.isPressable).toBe(true)
  })

  it('accepts all elevation values', () => {
    const elevations: Array<CardProps['elevation']> = [0, 1, 2, 3, 4]

    elevations.forEach(elevation => {
      const props: CardProps = {
        children: 'Card content',
        elevation,
      }

      expect(props.elevation).toBe(elevation)
    })
  })

  it('accepts all theme colors', () => {
    const colors: Array<CardProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(themeColor => {
      const props: CardProps = {
        children: 'Card content',
        themeColor,
      }

      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts header/body/footer/title/description types', () => {
    const headerProps: CardHeaderProps = {
      children: 'Header',
    }
    const bodyProps: CardBodyProps = {
      children: 'Body',
    }
    const footerProps: CardFooterProps = {
      children: 'Footer',
    }
    const titleProps: CardTitleProps = {
      children: 'Title',
    }
    const descriptionProps: CardDescriptionProps = {
      children: 'Description',
    }

    expect(headerProps.children).toBe('Header')
    expect(bodyProps.children).toBe('Body')
    expect(footerProps.children).toBe('Footer')
    expect(titleProps.children).toBe('Title')
    expect(descriptionProps.children).toBe('Description')
  })
})
