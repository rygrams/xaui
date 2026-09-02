import React from 'react'
import { Text } from 'react-native'
import { describe, it, expect } from 'vitest'
import type { AutocompleteDialogProps } from '../../../components/dialogs/autocomplete-dialog/autocomplete-dialog.type'

describe('AutocompleteDialog Types', () => {
  it('exports AutocompleteDialogProps type', () => {
    const props: AutocompleteDialogProps = {
      visible: true,
      inputValue: 'test',
      placeholder: 'Search...',
      children: <Text>Item</Text>,
      onInputChange: () => {},
      onClose: () => {},
    }

    expect(props).toBeDefined()
    expect(props.visible).toBe(true)
    expect(props.inputValue).toBe('test')
  })

  it('accepts optional title prop', () => {
    const props: AutocompleteDialogProps = {
      visible: true,
      inputValue: '',
      title: 'Select an option',
      children: <Text>Item</Text>,
    }

    expect(props.title).toBe('Select an option')
  })

  it('accepts showCheckmark prop', () => {
    const props: AutocompleteDialogProps = {
      visible: true,
      inputValue: '',
      showCheckmark: false,
      children: <Text>Item</Text>,
    }

    expect(props.showCheckmark).toBe(false)
  })

  it('accepts custom checkmark icon', () => {
    const customIcon = <Text>✓</Text>
    const props: AutocompleteDialogProps = {
      visible: true,
      inputValue: '',
      checkmarkIcon: customIcon,
      children: <Text>Item</Text>,
    }

    expect(props.checkmarkIcon).toBe(customIcon)
  })

  it('accepts style props', () => {
    const props: AutocompleteDialogProps = {
      visible: true,
      inputValue: '',
      style: { backgroundColor: 'red' },
      inputTextStyle: { fontSize: 18 },
      children: <Text>Item</Text>,
    }

    expect(props.style).toEqual({ backgroundColor: 'red' })
    expect(props.inputTextStyle).toEqual({ fontSize: 18 })
  })

  it('accepts callback props', () => {
    const onInputChange = () => {}
    const onClose = () => {}
    const onCheckmark = () => {}
    const onFocus = () => {}
    const onBlur = () => {}

    const props: AutocompleteDialogProps = {
      visible: true,
      inputValue: '',
      children: <Text>Item</Text>,
      onInputChange,
      onClose,
      onCheckmark,
      onFocus,
      onBlur,
    }

    expect(props.onInputChange).toBe(onInputChange)
    expect(props.onClose).toBe(onClose)
    expect(props.onCheckmark).toBe(onCheckmark)
    expect(props.onFocus).toBe(onFocus)
    expect(props.onBlur).toBe(onBlur)
  })

  it('accepts placeholder prop', () => {
    const props: AutocompleteDialogProps = {
      visible: true,
      inputValue: '',
      placeholder: 'Type to search...',
      children: <Text>Item</Text>,
    }

    expect(props.placeholder).toBe('Type to search...')
  })

  it('accepts visible false', () => {
    const props: AutocompleteDialogProps = {
      visible: false,
      inputValue: 'test',
      children: <Text>Item</Text>,
    }

    expect(props.visible).toBe(false)
  })
})
