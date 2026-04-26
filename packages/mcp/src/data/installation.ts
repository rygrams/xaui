export const installationDocs = {
  packages: {
    native: {
      name: '@xaui/native',
      description:
        'React Native components — targets iOS and Android. Uses React Native Reanimated for animations and React Native Gesture Handler for interactions. Each component renders native views (View, Text, Pressable, etc.).',
      install: 'npx expo install @xaui/native',
      peerDependencies: [
        'react-native-reanimated',
        'react-native-gesture-handler',
        'react-native-safe-area-context',
        'react-native-svg',
      ],
      setup: `// babel.config.js — required for Reanimated
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'],
}`,
    },
    hybrid: {
      name: '@xaui/hybrid',
      description:
        'React web components — targets web browsers and mobile webviews (e.g. Expo WebView, Capacitor). Uses Tailwind CSS v4 for styling and CSS/Framer Motion animations. Each component renders HTML elements (div, button, span, etc.).',
      install: 'npm install @xaui/hybrid',
      peerDependencies: ['tailwindcss'],
      setup: `// tailwind.config — Tailwind v4 required
// @import "@xaui/hybrid/styles" in your CSS entry`,
    },
  },
  nativeVsHybrid: `
## @xaui/native vs @xaui/hybrid

| Feature         | @xaui/native                        | @xaui/hybrid                          |
|-----------------|-------------------------------------|---------------------------------------|
| Target          | iOS / Android                       | Web browser / mobile webview          |
| Renderer        | React Native (native views)         | React DOM (HTML elements)             |
| Styling         | StyleSheet / inline styles          | Tailwind CSS v4                       |
| Animations      | React Native Reanimated             | CSS transitions / Framer Motion       |
| Gestures        | react-native-gesture-handler        | Native browser events                 |
| Import prefix   | @xaui/native/<component>            | @xaui/hybrid/<component>              |

**Choose @xaui/native** when building a React Native app (Expo or RN CLI).
**Choose @xaui/hybrid** when building a web app or a webview inside a mobile app.

Both packages share the same component API (props, behavior, naming) so switching is minimal.
`.trim(),
  mcpSetup: `
## Add XAUI to your AI assistant

### Claude Code
\`\`\`bash
claude mcp add xaui -- npx -y @xaui/ui-mcp@latest
\`\`\`

### MCP config (claude_desktop_config.json / .cursor/mcp.json)
\`\`\`json
{
  "mcpServers": {
    "xaui": {
      "command": "npx",
      "args": ["-y", "@xaui/ui-mcp@latest"]
    }
  }
}
\`\`\`
`.trim(),
}
