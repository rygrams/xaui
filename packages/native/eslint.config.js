import baseConfig from '../../eslint.config.base.js'

// R13 — RN resolves RTL only through the Start/End style properties; the
// Left/Right forms silently keep pointing the same way in a mirrored layout.
const DIRECTIONAL_STYLE_PROPS = [
  'left',
  'right',
  'paddingLeft',
  'paddingRight',
  'marginLeft',
  'marginRight',
  'borderLeftWidth',
  'borderRightWidth',
  'borderLeftColor',
  'borderRightColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
]
const DIRECTIONAL_STYLE_PROP_PATTERN = `^(${DIRECTIONAL_STYLE_PROPS.join('|')})$`

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        // `warnDev` is the one place either is allowed: a development-only warning,
        // guarded so it never reaches a release bundle.
        console: 'readonly',
        __DEV__: 'readonly',
      },
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: `Property[key.name=/${DIRECTIONAL_STYLE_PROP_PATTERN}/], Property[key.value=/${DIRECTIONAL_STYLE_PROP_PATTERN}/]`,
          message:
            'R13: use the Start/End style property instead (paddingStart/paddingEnd, marginStart/marginEnd, start/end, borderStartWidth/borderEndWidth…) — RN only mirrors those under RTL.',
        },
      ],
    },
  },
  {
    files: [
      '**/__tests__/**/*.ts',
      '**/__tests__/**/*.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    languageOptions: {
      globals: {
        HTMLElement: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
        console: 'readonly',
      },
    },
  },
]
