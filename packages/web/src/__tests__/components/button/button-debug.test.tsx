import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '../../components/button'

describe('Button Debug', () => {
  it('renders with fullWidth and isLoading', () => {
    render(
      <Button themeColor="primary" isLoading fullWidth>
        Button
      </Button>
    )

    const button = screen.getByRole('button')
    console.log('Button classes:', button.className)

    const spinner = button.querySelector('.inline-flex.mx-1') // spinner class
    console.log('Spinner container classes:', spinner?.className)
    
    if (spinner) {
        console.log('Spinner content HTML:', spinner.innerHTML)
    }
  })
})
