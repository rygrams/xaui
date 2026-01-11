# @xui/colors

A comprehensive color palette for XUI Library, inspired by Tailwind CSS. Includes 20+ color families with 11 shades each (50-950), utility functions, and full TypeScript support.

## Installation

```bash
pnpm add @xui/colors
```

## Usage

### Basic Import

```typescript
import { colors } from '@xui/colors'

// Access colors directly
const primaryColor = colors.blue[500]  // '#3b82f6'
const textColor = colors.slate[700]     // '#334155'
```

### Using Utility Functions

```typescript
import { getColor, withOpacity } from '@xui/colors'

// Get a color with default shade (500)
const blue = getColor('blue')           // '#3b82f6'

// Get a specific shade
const lightBlue = getColor('blue', 100) // '#dbeafe'

// Add opacity to a color
const blueWithOpacity = withOpacity(colors.blue[500], 0.5)  // '#3b82f680'
```

### TypeScript Support

```typescript
import type { ColorName, ColorShade, ColorValue } from '@xui/colors'

// ColorName: 'slate' | 'gray' | 'blue' | 'red' | ...
// ColorShade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
// ColorValue: string
```

## Color Palette

### Neutral Colors

- **slate** - Cool gray tones
- **gray** - Balanced gray tones
- **zinc** - Modern gray tones
- **neutral** - True gray tones
- **stone** - Warm gray tones

### Brand Colors

- **red** - Error states, danger
- **orange** - Warnings, highlights
- **amber** - Alerts, attention
- **yellow** - Caution, warnings
- **lime** - Success, growth
- **green** - Success, confirmation
- **emerald** - Premium, nature
- **teal** - Calm, trust
- **cyan** - Information, links
- **sky** - Light, airy
- **blue** - Primary, trust
- **indigo** - Deep, professional
- **violet** - Creative, unique
- **purple** - Luxury, premium
- **fuchsia** - Vibrant, energetic
- **pink** - Playful, friendly
- **rose** - Romantic, soft

### Special Colors

- **black** - `#000000`
- **white** - `#ffffff`
- **transparent** - `transparent`

## API Reference

### `colors`

The main color palette object containing all color families.

```typescript
colors.blue[500]      // '#3b82f6'
colors.black          // '#000000'
colors.transparent    // 'transparent'
```

### `getColor(color, shade?)`

Get a color value from the palette with an optional shade.

**Parameters:**
- `color` (ColorName) - Color name (e.g., 'blue', 'red')
- `shade` (ColorShade, optional) - Color shade (50-950), defaults to 500

**Returns:** ColorValue (string)

```typescript
getColor('blue')        // '#3b82f6' (defaults to 500)
getColor('blue', 700)   // '#1d4ed8'
getColor('black')       // '#000000'
```

### `withOpacity(color, opacity)`

Add opacity to a color value.

**Parameters:**
- `color` (string) - Base color hex value
- `opacity` (number) - Opacity value (0-1)

**Returns:** string (color with opacity)

```typescript
withOpacity('#3b82f6', 0.5)   // '#3b82f680'
withOpacity('#000000', 0.1)   // '#0000001a'
```

## License

MIT
