# Direction artistique : fusion « Widget of the Week » × showcase minimaliste XAUI

Ce document est la charte visuelle de toutes les vidéos XAUI. Les prompts `02` à `05` s'y
réfèrent : applique-le strictement.

**Principe** : la narration et le rythme de Flutter Widget of the Week (une idée par scène,
légende courte, alternance démo/code, callouts), avec l'esthétique premium et épurée des
previews XAUI (fond neutre, iPhone réaliste, mouvements de caméra doux). Création 100 %
originale : aucun élément de marque Flutter, Google ou autre.

## Palette

- Fond de toutes les scènes : `#F4F4F4` (jamais de fond bleu saturé)
- Texte principal : `#1A1A1A`. Texte secondaire : `#777`
- UN seul accent : bleu XAUI `#0A84FF`, réservé au mot-clé de la légende, à la ligne de
  code surlignée et au trait de l'intro
- Gris structurels pour les formes : `#C8C8C8`, `#D0D0D0`, `#E2E2E2`
- Surlignage de code : `#EAF3FF`

## Typographie

- Inter (ou SF Pro Display si disponible), poids 500 pour les légendes, 400 pour le reste
- Légendes : 2 lignes max, 64–80 px en 1080p, la 2e ligne ou le mot-clé en bleu accent
- Code : JetBrains Mono ou SF Mono, 30–34 px (≥ 44 px en format vertical)

## Téléphone

- Cadre iPhone réaliste noir (Dynamic Island, bord ~14 px), ombre très douce et large
  (blur 80 px, opacité 8 %), aucun reflet
- Barre d'état propre 9:41 (`xcrun simctl status_bar booted override ...`)
- Une fois présenté, le téléphone est figé : aucun flottement. Seule la caméra bouge
  (un flottement de ±4 px, doublé par un push-in à 2×, se lit comme un tremblement). Ce
  sont les mouvements de caméra, le curseur et l'écran qui évitent le plan statique

## Caméra (signature XAUI)

- Plan large : téléphone entier centré ou à droite
- Push-in : zoom progressif (scale 1 → 1.8–2.2) centré sur la zone du composant, courbe
  easeInOutCubic, 20–30 frames
- Pendant le zoom, le téléphone sort du cadre en haut et en bas : c'est voulu
- Pull-out avant chaque changement de scène majeur
- Jamais plus d'un mouvement de caméra à la fois
- Séquence type d'une démo : plan large → push-in sur le composant → tap avec ripple →
  résultat → pull-out

## Interactions

- Curseur main (pointer macOS) qui glisse vers la cible (spring doux, ~12 frames)
- Ripple : cercle gris translucide `rgba(0,0,0,0.12)` avec contour fin, qui grandit de 0 à
  44 px et s'efface en 10 frames
- Callouts adoucis : cercle de contour 2 px bleu accent autour d'un élément, ou petite
  flèche bleue. Maximum un callout à l'écran

## Gabarits (3 seulement)

1. `Hero` : téléphone centré, sans texte (ouverture de démo, zooms)
2. `Split` : légende à gauche (40 %), téléphone à droite, fond gris clair
3. `CodeSplit` : carte de code blanche à gauche (coins 28 px, bordure 1 px `#E2E2E2`,
   3 pastilles grises façon fenêtre), téléphone réduit à droite qui montre le résultat en
   direct. Petite légende grise au-dessus de la carte

## Intro (≈ 3 s)

Formes géométriques animées (cercle plein, cercle contour, rectangle hachuré, barre) en
gris, avec un seul cercle bleu. Surtitre « XAUI · COMPONENT OF THE WEEK » en petites
capitales espacées, nom du composant en grand, trait pointillé bleu qui se dessine.

## Outro (≈ 3 s)

Fond `#F4F4F4`, logo XAUI (`video/assets/xaui-logo.svg`) qui arrive en scale 0.9 → 1 avec
fondu, URL ui.xtartapp.com en dessous.

Le carré arrondi du logo est lui-même `#F4F4F4` : sur ce fond il disparaît et seul le
glyphe se lit. Pour montrer la forme de l'icône, lui donner l'ombre du téléphone
(blur 80 px, opacité 8 %).

## Rythme et son

- Scènes de 3–6 s, coupes franches entre légendes, crossfade de 8 frames entre gabarits
- Musique légère, électronique et minimaliste. Petit « tick » doux sur chaque ripple
- La légende entre 4 à 6 frames avant la voix de la scène

## À ne jamais faire

- Fond coloré saturé, dégradés criards, néons
- Plus d'une couleur d'accent
- Texte de plus de 2 lignes à l'écran
- Plan statique de plus de 3 s (2 s en short)
