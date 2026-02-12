class DeviceFrame extends HTMLElement {
  static tagName = 'device-frame'

  static attrs = {
    footer: 'footer',
    mode: 'mode',
    model: 'model',
    statusbar: 'statusbar',
    padded: 'padded',
    shadow: 'shadow',
    theme: 'theme',
    time: 'time',
  }

  static style = `
:host {
    --df-aspect-ratio: var(--df-ar, 9/19.25);
    --df-camera-size: var(--df-camera, .8rem);
    --df-internal-bg: var(--df-background, transparent);
    --df-internal-fg: var(--df-foreground, inherit);
    --df-internal-border: var(--df-internal-border-width, .4rem) solid var(--df-internal-fg);
    --df-island-bg: var(--df-background, #111);
    --df-outer-bezel: var(--df-bezel, 0);
    --df-internal-shadow-hsl: var(--df-shadow-hsl, 0deg 0% 75%);
    --df-padding-start: var(--df-padding, 0);
    --df-padding-end: var(--df-padding, 0);
    --df-radius-outer: var(--df-radius, 3rem);
    --df-font-family: system-ui, sans-serif;
}
:host([${DeviceFrame.attrs.mode}="light"]) {
    --df-internal-bg: var(--df-background, #fff);
    --df-internal-fg: var(--df-foreground, #111);
}
:host([${DeviceFrame.attrs.mode}="dark"]) {
    --df-internal-bg: var(--df-background, #222);
    --df-internal-fg: var(--df-foreground, #fff);
    --df-internal-border: var(--df-internal-border-width, .4rem) solid var(--df-island-bg);
    --df-internal-shadow-hsl: var(--df-shadow-hsl, 0deg 0% 25%);
    --df-island-bg: var(--df-background, #111);
}
:host([${DeviceFrame.attrs.padded}]) {
    --df-padding-start: 3rem;
    --df-padding-end: 1rem;
}
:host([${DeviceFrame.attrs.padded}=top]) {
    --df-padding-end: 0;
}
:host([${DeviceFrame.attrs.model}="pixel"]) .device {
    --df-aspect-ratio: 9/19.5;
    --df-camera-size: 1.2rem;
    --df-radius-outer: var(--df-radius, 3.35rem);
}
.device {
    aspect-ratio: var(--df-aspect-ratio);
    background: var(--df-internal-bg);
    border-radius: var(--df-radius-outer);
    border: var(--df-internal-border);
    color: var(--df-internal-fg);
    display: grid;
    font-family: var(--df-font-family);
    font-size: 1rem;
    font-weight: 400;
    grid-template-areas: "hed-left hed-center hed-right"
    "screen screen screen";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr;
    overflow: hidden;
    position: relative;
}
:host([${DeviceFrame.attrs.shadow}]) .device {
    border: var(--df-internal-border);
    box-shadow: 0px 0.3px 0.5px hsl(var(--df-internal-shadow-hsl) / 0),
        0.1px 2.4px 3.6px hsl(var(--df-internal-shadow-hsl) / 0.07),
        0.1px 4.3px 6.5px hsl(var(--df-internal-shadow-hsl) / 0.14),
        0.2px 6.7px 10.1px hsl(var(--df-internal-shadow-hsl) / 0.22),
        0.3px 10.6px 15.9px hsl(var(--df-internal-shadow-hsl) / 0.29),
        0.5px 16.5px 24.8px hsl(var(--df-internal-shadow-hsl) / 0.36);
}
:host([${DeviceFrame.attrs.statusbar}]) .hed-left,
:host([${DeviceFrame.attrs.statusbar}]) .hed-right {
    display: none;
}
:host([${DeviceFrame.attrs.statusbar}="none"]) .hed {
    display: none;
}
:host([${DeviceFrame.attrs.statusbar}]) .hed {
    grid-area: hed-center;
    grid-template-columns: auto;
}
:host([${DeviceFrame.attrs.statusbar}]) .hed-island {
    grid-area: 1 / 1 / 1 / 1;
}
.hed {
    align-items: center;
    display: grid;
    grid-area: 1 / hed-left / 1 / hed-right;
    grid-template-columns: 1fr 1fr 1fr;
    font-size: 1rem;
    font-weight: 500;
    max-height: 3.6rem;
    text-align: center;
    transform: translateY(-7px);
    z-index: 1;
}
.pixel .hed-island {
    background: transparent;
    justify-content: center;
    padding: 0;
    width: auto;
}
.hed-island {
    align-items: center;
    box-sizing: border-box;
    background: var(--df-island-bg);
    border-radius: 3rem;
    display: flex;
    justify-content: flex-end;
    margin-block: var(--df-camera-size);
    margin-inline: auto;
    padding: calc(var(--df-camera-size) * .5) calc(var(--df-camera-size) * .75);
    width: 85%;
    transform: translateY(-2px);
}
.hed-island::after {
    background-color: var(--df-island-bg);
    background-image: radial-gradient(50% 50% at 50% 50%, #393752 10%, #0F0F2A 11%, #0F0F2A 40%, #161424 40.01%, #161424 65%, #0E0B0F 65.01%);
    border-radius: 100%;
    content: '';
    display: block;
    height: var(--df-camera-size);
    width: var(--df-camera-size);
    z-index: 1;
}
.hed-left {
    justify-self: start;
    padding-left: 1.25rem;
    font-size: 0.9rem;
    text-align: left;
}
.hed-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1.25rem;
}
.main {
    border-radius: calc(var(--df-radius-outer) - .75rem);
    grid-area: hed-left / hed-left / footer / span 3;
    overflow: auto;
    padding: var(--df-padding-start) var(--df-outer-bezel) var(--df-padding-end);
    scrollbar-width: none;
}
.main::-webkit-scrollbar {
  height: 0.4rem;
  width: 0.4rem;
  display: none;
}
.main::-webkit-scrollbar-thumb {
  background-color: var(--df-internal-fg);
  border-radius: 0.4rem;
  border: 0;
}
.main::-webkit-scrollbar-track {
  background: red;
  border-radius: 0.4rem;
}
.main > ::slotted(img:only-child),
.main > ::slotted(iframe:only-child) {
    display: flex;
}
:host([${DeviceFrame.attrs.theme}]) .main::before {
    background: var(--df-theme);
    content: '';
    height: var(--df-padding-start);
    position: absolute;
    top: 0;
    width: 100%;
}
:host([${DeviceFrame.attrs.footer}="bar"]) .device::after {
    background-color: var(--df-island-bg);
    border-radius: var(--df-camera-size);
    content: '';
    bottom: calc(var(--df-camera-size) * .5);
    display: block;
    height: calc(var(--df-camera-size) * .44);
    left: 0;
    opacity: .6;
    margin-inline: auto;
    right: 0;
    position: absolute;
    width: 44%;
    z-index: 1;
}
`

  setMode(isDarkMode: boolean) {
    this.setAttribute(DeviceFrame.attrs.mode, isDarkMode ? 'dark' : 'light')
  }

  connectedCallback() {
    if (!('replaceSync' in CSSStyleSheet.prototype) || this.shadowRoot) {
      return
    }

    const shadowroot = this.attachShadow({ mode: 'open' })

    const sheet = new CSSStyleSheet()
    sheet.replaceSync(DeviceFrame.style)
    shadowroot.adoptedStyleSheets = [sheet]

    const template = document.createElement('template')

    const prefersDarkMode = matchMedia('(prefers-color-scheme: dark)')
    if (!this.hasAttribute(DeviceFrame.attrs.mode)) {
      this.setMode(prefersDarkMode.matches)
      prefersDarkMode.addEventListener('change', e => {
        this.setMode((e as MediaQueryListEvent).matches)
      })
    }

    const model = this.getAttribute(DeviceFrame.attrs.model) || 'iphone'
    const time = this.getAttribute(DeviceFrame.attrs.time) || '9:41'
    const theme = this.getAttribute(DeviceFrame.attrs.theme)

    template.innerHTML = `
      <div class="device ${model}" ${theme !== null ? `style="--df-theme: ${theme};"` : ''}>
        <div class="hed">
          <div class="hed-left">${time}</div>
          <div class="hed-island"></div>
          <div class="hed-right">
            ${
              model === 'iphone'
                ? `<svg width="57" height="10" viewBox="0 0 76 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".35" d="M48.528 4A3.472 3.472 0 0152 .528h17A3.472 3.472 0 0172.472 4v5A3.473 3.473 0 0169 12.473H52A3.473 3.473 0 0148.528 9V4z" stroke="currentColor" stroke-width="1.055"/><path opacity=".4" d="M74 5v4.22A2.29 2.29 0 0074 5z" fill="currentColor"/><path d="M50 4a2 2 0 012-2h17a2 2 0 012 2v5a2 2 0 01-2 2H52a2 2 0 01-2-2V4z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M33.5 2.588c2.467 0 4.84.967 6.627 2.702.134.134.35.132.482-.004l1.287-1.326a.37.37 0 00-.003-.518 11.953 11.953 0 00-16.786 0 .369.369 0 00-.003.518l1.287 1.326a.337.337 0 00.482.004 9.515 9.515 0 016.628-2.702zm.036 4.084a5.4 5.4 0 013.666 1.443.34.34 0 00.483-.006l1.285-1.326a.37.37 0 00-.005-.522 7.851 7.851 0 00-10.856 0 .37.37 0 00-.004.522l1.285 1.326a.34.34 0 00.482.006 5.4 5.4 0 013.664-1.443zm2.614 2.67a.36.36 0 01-.105.263l-2.223 2.29a.344.344 0 01-.494 0l-2.224-2.29a.36.36 0 01.011-.52 3.75 3.75 0 014.92 0 .36.36 0 01.115.258z" fill="currentColor"/><path d="M10 3a1 1 0 011-1h1a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1V3zM15 1a1 1 0 011-1h1a1 1 0 011 1v10a1 1 0 01-1 1h-1a1 1 0 01-1-1V1zM5 6.5a1 1 0 011-1h1a1 1 0 011 1V11a1 1 0 01-1 1H6a1 1 0 01-1-1V6.5zM0 9a1 1 0 011-1h1a1 1 0 011 1v2a1 1 0 01-1 1H1a1 1 0 01-1-1V9z" fill="currentColor"/></svg>`
                : `<svg width="46" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.609 14.609h14.608V0L16.61 14.609zM8.681 14.688l8.667-10.727C17.013 3.71 13.674 1 8.674 1 3.666 1 .335 3.71 0 3.961l8.666 10.727.008.008.007-.008zM45.028 1.46h-1.22V0h-2.921v1.46h-1.22a.976.976 0 00-.971.972V13.63c0 .54.438.979.971.979h5.354c.54 0 .979-.439.979-.972V2.432a.976.976 0 00-.972-.971z" fill="currentColor"/></svg>`
            }
          </div>
        </div>
        <div class="main"><slot></slot></div>
      </div>`

    shadowroot.appendChild(template.content.cloneNode(true))
  }
}

if (typeof window !== 'undefined' && 'customElements' in window) {
  customElements.define(DeviceFrame.tagName, DeviceFrame)
}

export type { DeviceFrame }
