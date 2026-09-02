// ---- sRGB <-> OKLab ------------------------------------------------------
const srgbToLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const linearToSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)
const clamp01 = (n) => Math.min(1, Math.max(0, n))

export function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [parseInt(f.slice(0,2),16)/255, parseInt(f.slice(2,4),16)/255, parseInt(f.slice(4,6),16)/255]
}
export function rgbToHex([r, g, b]) {
  const to = (n) => Math.round(clamp01(n) * 255).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}
export function rgbToOklab([r, g, b]) {
  const R = srgbToLinear(r), G = srgbToLinear(g), B = srgbToLinear(b)
  const l = Math.cbrt(0.4122214708*R + 0.5363325363*G + 0.0514459929*B)
  const m = Math.cbrt(0.2119034982*R + 0.6806995451*G + 0.1073969566*B)
  const s = Math.cbrt(0.0883024619*R + 0.2817188376*G + 0.6299787005*B)
  return [
    0.2104542553*l + 0.7936177850*m - 0.0040720468*s,
    1.9779984951*l - 2.4285922050*m + 0.4505937099*s,
    0.0259040371*l + 0.7827717662*m - 0.8086757660*s,
  ]
}
export function oklabToRgb([L, a, bb]) {
  const l = (L + 0.3963377774*a + 0.2158037573*bb) ** 3
  const m = (L - 0.1055613458*a - 0.0638541728*bb) ** 3
  const s = (L - 0.0894841775*a - 1.2914855480*bb) ** 3
  return [
    linearToSrgb( 4.0767416621*l - 3.3077115913*m + 0.2309699292*s),
    linearToSrgb(-1.2684380046*l + 2.6097574011*m - 0.3413193965*s),
    linearToSrgb(-0.0041960863*l - 0.7034186147*m + 1.7076147010*s),
  ].map(clamp01)
}
export function oklchToHex(L, C, Hdeg) {
  const h = (Hdeg * Math.PI) / 180
  return rgbToHex(oklabToRgb([L, C * Math.cos(h), C * Math.sin(h)]))
}

// ---- API publique : mix / alpha / contrastOn -----------------------------
/** color-mix(in oklab, base (1-amount), other amount) */
export function mix(base, other, amount) {
  const A = rgbToOklab(hexToRgb(base)), B = rgbToOklab(hexToRgb(other))
  return rgbToHex(oklabToRgb(A.map((v, i) => v + (B[i] - v) * amount)))
}
/** équivalent de color-mix(in oklab, c X%, transparent) */
export function alpha(hex, a) {
  const [r, g, b] = hexToRgb(hex).map((v) => Math.round(v * 255))
  return `rgba(${r}, ${g}, ${b}, ${a})`
}
export function lightnessOf(hex) { return rgbToOklab(hexToRgb(hex))[0] }
/** choisit le texte lisible sur `hex` parmi deux primitives */
export function contrastOn(hex, light, dark) { return lightnessOf(hex) > 0.62 ? dark : light }

// ---- contrôle : ratio WCAG ----------------------------------------------
function relLum(hex) {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear)
  return 0.2126*r + 0.7152*g + 0.0722*b
}
export function contrastRatio(a, b) {
  const l1 = relLum(a), l2 = relLum(b)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}
