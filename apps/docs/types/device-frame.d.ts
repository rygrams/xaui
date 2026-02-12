declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'device-frame': React.HTMLAttributes<HTMLElement> & {
        model?: string
        mode?: string
        footer?: string
        shadow?: string
        padded?: string
        time?: string
        theme?: string
        statusbar?: string
      }
    }
  }
}
