# Metro UI : synthèse et pistes de modernisation

Nov 17, 2026 · @Bamory GRAMBOUTE

## Origines et principes

Metro est le langage visuel lancé par Microsoft avec Windows Phone 7 en 2010 : texte en grand, aplats de couleur, aucune ombre ni texture. Il reprend des idées de Zune et Media Center, et s'inspire de la signalétique des transports et de la typographie suisse.

- **Contenu avant décor** : pas de cadres ni de fioritures, le contenu se suffit.
- **Typographie comme interface** : police Segoe, titres géants, hiérarchie par la taille et la couleur.
- **Aplats francs** : fond noir ou blanc, une couleur d'accent choisie par l'utilisateur.
- **Mouvement qui guide** : chaque animation indique d'où l'on vient et où l'on va.

Renommé « Modern UI » vers 2012 après un litige de marque avec Metro AG, le style s'est étendu à Windows 8. Windows Phone a échoué commercialement (support de Windows 10 Mobile arrêté fin 2019), mais Metro a ouvert la voie au flat design, repris par iOS 7 dès 2013.

## Spécifications Metro

Les valeurs ci-dessous reprennent les ressources de thème du SDK Windows Phone 7 et 8, en pixels logiques sur une largeur de 480. Elles viennent de mémoire : marges et durées sont approximatives.

### Thèmes

| Ressource                 | Thème sombre | Thème clair |
| ------------------------- | ------------ | ----------- |
| Fond                      | #000000      | #FFFFFF     |
| Texte principal           | #FFFFFF      | #000000     |
| Texte secondaire (subtle) | blanc à 60 % | noir à 40 % |
| Désactivé                 | blanc à 40 % | noir à 40 % |
| Chrome (App Bar, menus)   | #1F1F1F      | #DDDDDD     |
| Épaisseur de bordure      | 3 px         | 3 px        |

### Couleurs d'accent

Windows Phone 7 proposait 10 couleurs, Windows Phone 8 en a proposé 20 :

| Nom         | Hex     | Nom      | Hex     |
| ----------- | ------- | -------- | ------- |
| Lime        | #A4C400 | Rouge    | #E51400 |
| Vert        | #60A917 | Orange   | #FA6800 |
| Émeraude    | #008A00 | Ambre    | #F0A30A |
| Bleu canard | #00ABA9 | Jaune    | #E3C800 |
| Cyan        | #1BA1E2 | Brun     | #825A2C |
| Cobalt      | #0050EF | Olive    | #6D8764 |
| Indigo      | #6A00FF | Acier    | #647687 |
| Violet      | #AA00FF | Mauve    | #76608A |
| Rose        | #F472D0 | Taupe    | #87794E |
| Magenta     | #D80073 | Cramoisi | #A20025 |

### Typographie

Police Segoe WP, en Light, SemiLight, Regular, SemiBold, Bold et Black. Les titres utilisent Light ou SemiLight, le corps Regular.

| Ressource       | Taille              | Usage                         |
| --------------- | ------------------- | ----------------------------- |
| Small           | 18,667 px (14 pt)   | Métadonnées, légendes         |
| Normal          | 20 px (15 pt)       | Texte courant, nom de l'appli |
| Medium          | 22,667 px (17 pt)   | Sous-titres                   |
| MediumLarge     | 25,333 px (19 pt)   | Titres d'éléments de liste    |
| Large           | 32 px (24 pt)       | Titres de section             |
| ExtraLarge      | 42,667 px (32 pt)   | Titres de Pivot               |
| ExtraExtraLarge | 72 px (54 pt)       | Titres de page                |
| Huge            | 186,667 px (140 pt) | Titre de Panorama             |

### Grille, marges et tailles

- **Marges** : environ 12 px de marge système, plus 12 px dans le panneau de contenu, soit environ 24 px entre le bord et le texte.
- **Cibles tactiles** : 9 mm recommandés (environ 34 px), 7 mm au minimum avec 2 mm d'espace entre deux cibles.
- **App Bar** : 4 boutons maximum, icônes de 48 × 48 px, cercle dessiné par le système ; le menu « … » ajoute des entrées texte.
- **Tuiles (images WP8)** : petite 159 × 159, moyenne 336 × 336, large 691 × 336 px. Sur WP7, une seule taille de 173 × 173 px.
- **Icônes** : pictogrammes monochromes au trait, blancs sur fond transparent, recolorés selon le thème.

### Tous les contrôles

| Contrôle                | Apparence                                                     | Comportement                                            |
| ----------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| Button                  | Rectangle à angles vifs, bordure de 3 px, texte en minuscules | Rempli au toucher (blanc sur WP7, accent sur WP8)       |
| HyperlinkButton         | Texte seul                                                    | Grisé au toucher                                        |
| ToggleSwitch            | Piste rectangulaire, curseur en bloc                          | Piste remplie d'accent quand activé                     |
| CheckBox                | Carré à bordure épaisse                                       | Coche dans la couleur du texte                          |
| RadioButton             | Cercle à bordure épaisse                                      | Rond plein au centre                                    |
| Slider                  | Piste fine, partie remplie en accent, curseur rectangulaire   | Glisser ou toucher                                      |
| ProgressBar             | Barre fine en accent                                          | Indéterminé : cinq points qui filent de gauche à droite |
| TextBox                 | Fond clair, texte noir, même en thème sombre                  | Au focus : fond blanc, bordure d'accent, clavier        |
| ListPicker              | Champ à bordure                                               | Se déplie sur place (peu de choix) ou en plein écran    |
| DatePicker / TimePicker | Champ à bordure                                               | Roues de carrés en boucle, en plein écran               |
| MessageBox              | Bandeau pleine largeur en haut, fond assombri                 | Entre en swivel                                         |
| ContextMenu             | Liste pleine largeur, grand texte                             | Appui long ; la page recule légèrement                  |
| Toast                   | Bandeau en haut de l'écran, couleur d'accent                  | Glisse depuis le haut, disparaît seul                   |
| Jump list               | Grille de lettres en carrés d'accent                          | Touche une lettre pour sauter dans la liste             |
| Pivot / Panorama        | Voir « Composants emblématiques »                             | Balayage horizontal                                     |

Tokens Metro en code :

```ts
export const metro = {
  theme: {
    dark: {
      bg: '#000000',
      fg: '#FFFFFF',
      subtle: 'rgba(255,255,255,0.6)',
      chrome: '#1F1F1F',
    },
    light: {
      bg: '#FFFFFF',
      fg: '#000000',
      subtle: 'rgba(0,0,0,0.4)',
      chrome: '#DDDDDD',
    },
  },
  accents: {
    lime: '#A4C400',
    green: '#60A917',
    emerald: '#008A00',
    teal: '#00ABA9',
    cyan: '#1BA1E2',
    cobalt: '#0050EF',
    indigo: '#6A00FF',
    violet: '#AA00FF',
    pink: '#F472D0',
    magenta: '#D80073',
    crimson: '#A20025',
    red: '#E51400',
    orange: '#FA6800',
    amber: '#F0A30A',
    yellow: '#E3C800',
    brown: '#825A2C',
    olive: '#6D8764',
    steel: '#647687',
    mauve: '#76608A',
    taupe: '#87794E',
  },
  font: {
    family: 'Segoe WP', // alternative libre : Selawik
    size: {
      small: 18.667,
      normal: 20,
      medium: 22.667,
      mediumLarge: 25.333,
      large: 32,
      extraLarge: 42.667,
      xxl: 72,
      huge: 186.667,
    },
  },
  border: 3,
  radius: 0,
  margin: { system: 12, content: 24 },
  touchTarget: { recommended: 34, min: 26 },
  motion: { ease: [0.1, 0.9, 0.2, 1], fast: 80, base: 250, slow: 400 },
}
```

## Composants emblématiques

Les Live Tiles sont le composant qui rendait Metro unique, suivies du Pivot et du Panorama qui naviguaient par la seule typographie.

- **Live Tiles** : à la fois icône, raccourci et widget ; elles affichent messages, météo ou photos sans ouvrir l'appli.
- **Pivot (les tabs)** : titres géants en minuscules, onglet actif en blanc, les autres en gris ; l'actif est toujours collé à gauche, la file boucle à l'infini. Pas de soulignement ni d'indicateur.
- **Panorama** : vue vitrine dont le grand titre et le fond défilent plus lentement que le contenu (parallaxe). Le Pivot filtre, le Panorama présente.
- **App Bar** : barre basse d'icônes rondes au trait fin ; les « … » la font monter pour afficher les libellés.

Structure d'un Pivot (HTML/CSS) :

```html
<div class="app">MESSAGERIE</div>
<div class="pivot-headers">
  <span class="on">tout</span><span>non lus</span><span>marqués</span>
</div>
<div class="pivot-content">…</div>
```

```css
.app {
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.pivot-headers {
  display: flex;
  gap: 20px;
  white-space: nowrap;
  font-size: 38px;
}
.pivot-headers span {
  color: #4d4d4d;
  transition: color 0.3s;
}
.pivot-headers span.on {
  color: #fff;
}
```

Pour la boucle, on réordonne les titres à chaque changement pour que l'onglet actif passe en tête :

```js
function headerOrder(tabs, cur) {
  return tabs.map((_, k) => tabs[(cur + k) % tabs.length])
}
```

## Animations

Le mouvement Metro démarre vite et freine fort à la fin (décélération de type exponentielle), sur environ 250 à 400 ms.

| Animation | Où                        | Effet                                                                                              |
| --------- | ------------------------- | -------------------------------------------------------------------------------------------------- |
| Tilt      | Tuiles, éléments de liste | Inclinaison 3D du côté du doigt + légère réduction                                                 |
| Turnstile | Ouverture d'une appli     | Les tuiles pivotent depuis le bord gauche de l'écran, en décalé ; la tuile touchée part en dernier |
| Continuum | Navigation                | L'élément touché s'envole, le titre suivant atterrit à sa place                                    |
| Swivel    | Dialogues, notifications  | Pivot depuis le haut                                                                               |
| Pivot     | Changement d'onglet       | Titres qui défilent ensemble, fondu gris/blanc, contenu en cascade                                 |

Courbe et cascade du contenu d'un onglet :

```css
:root {
  --metro-ease: cubic-bezier(0.1, 0.9, 0.2, 1);
}
@keyframes inR {
  from {
    transform: translateX(70px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
.item {
  animation: inR 0.4s var(--metro-ease) both;
}
.item:nth-child(2) {
  animation-delay: 45ms;
}
.item:nth-child(3) {
  animation-delay: 90ms;
}
```

Tilt selon la position du doigt :

```js
el.addEventListener('pointerdown', e => {
  const r = el.getBoundingClientRect()
  const dx = ((e.clientX - r.left) / r.width - 0.5) * 2
  const dy = ((e.clientY - r.top) / r.height - 0.5) * 2
  const k = r.width > 200 ? 4 : 8 // moins d'inclinaison sur les grands éléments
  el.style.transform = `perspective(600px) rotateY(${dx * k}deg) rotateX(${-dy * k}deg) scale(.97)`
})
el.addEventListener('pointerup', () => {
  el.style.transform = ''
})
```

Turnstile : chaque tuile pivote autour du bord gauche de l'écran, pas du sien.

```js
tile.style.transformOrigin = `${-tile.offsetLeft}px 50%`
tile.style.transition = `transform .28s cubic-bezier(.6,0,.9,.4) ${delay}ms, opacity .28s ${delay}ms`
tile.style.transform = 'rotateY(80deg)'
tile.style.opacity = '0'
```

## Boutons

Réglages retenus : bordure de 3 px, arrondi de 2 px, couleurs d'accent pleines ou en contour, et réduction à 96 % quand on appuie. Sur l'original, les angles étaient parfaitement vifs : l'arrondi de 2 px est une liberté de modernisation.

| Variante  | Repos                                               | Appuyé                         |
| --------- | --------------------------------------------------- | ------------------------------ |
| Plein     | Fond et bordure de la couleur d'accent, texte blanc | Fond blanc, texte noir         |
| Contour   | Fond noir, bordure et texte de la couleur           | Fond de la couleur, texte noir |
| Désactivé | Bordure et texte gris #4d4d4d                       | Aucun effet                    |
| Toggle    | Comme le contour                                    | Activé = fond d'accent         |
| Hyperlink | Texte seul en couleur d'accent                      | Texte gris                     |
| App Bar   | Icône dans un cercle au trait fin                   | Cercle rempli de blanc         |

Couleurs d'accent Windows Phone : cyan #1BA1E2, citron vert #8CBF26, rouge #E51400, orange #F09609, violet #A200FF, magenta #FF0097.

```css
.metro-btn {
  border: 3px solid var(--c);
  background: var(--c);
  color: #fff;
  border-radius: 2px;
  min-height: 56px;
  padding: 8px 14px;
  font-size: 19px;
  transform: scale(1);
  transition: transform 0.18s cubic-bezier(0.1, 0.9, 0.2, 1); /* retour plus doux */
}
.metro-btn.pressed {
  background: #fff;
  border-color: #fff;
  color: #000;
  transform: scale(0.96);
  transition: transform 0.08s ease-out; /* enfoncement rapide */
}
.metro-btn.outline {
  background: #000;
  color: var(--c);
}
.metro-btn.outline.pressed {
  background: var(--c);
  color: #000;
}
.metro-btn.disabled {
  border-color: #4d4d4d;
  color: #4d4d4d;
  background: #000;
}
```

```html
<div class="metro-btn" role="button" tabindex="0" style="--c:#1BA1E2">envoyer</div>
```

Note : dans certains environnements, le style par défaut des balises `<button>` écrase ces règles ; un élément `role="button"` évite le problème.

## Toast

Sur Windows Phone, le toast est un bandeau pleine largeur collé en haut, à la place de la barre d'état. Le rectangle détaché avec marges vient plutôt des toasts de Windows 8 sur PC (en haut à droite) ; c'est la référence retenue pour Tram.

| Propriété | Metro (Windows Phone)                                                | Tram                                                     |
| --------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| Position  | Haut, pleine largeur                                                 | Haut, sous l'encoche, marges de 10 px                    |
| Forme     | Rectangle, angles vifs                                               | Rectangle, arrondi 2 px                                  |
| Fond      | Couleur d'accent                                                     | Couleur d'accent, texte blanc ou noir selon le contraste |
| Contenu   | Icône carrée de 22 px, nom de l'appli en gras, message sur une ligne | Idem                                                     |
| Entrée    | Swivel depuis le haut (rotateX -90° → 0), 350 ms                     | Glissement depuis le haut avec rebond de ressort         |
| Sortie    | Balayage vers la droite, ou seul après environ 10 s                  | Balayage vers la droite ou le haut                       |
| Toucher   | Ouvre l'appli                                                        | Ouvre l'appli                                            |

```css
.toast {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: var(--accent);
  color: #fff;
  transform-origin: 50% 0;
}
.toast .icon {
  width: 22px;
  height: 22px;
  background: #fff;
  color: var(--accent);
}
.toast .text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.toast.tram {
  top: 28px;
  left: 10px;
  right: 10px;
  border-radius: 2px;
}

@keyframes swivelIn {
  from {
    transform: perspective(600px) rotateX(-90deg);
  }
  to {
    transform: none;
  }
}
.toast.enter {
  animation: swivelIn 0.35s cubic-bezier(0.1, 0.9, 0.2, 1) both;
}
.toast.tram.enter {
  animation: none;
  transition: transform 0.5s cubic-bezier(0.2, 1.35, 0.4, 1);
}
```

## ToggleSwitch

Le switch Metro est une piste rectangulaire à bordure blanche, remplie d'accent jusqu'au milieu du curseur, avec un curseur en bloc blanc qui dépasse en haut et en bas. L'état est écrit en grand à gauche (« activé » / « désactivé »), sous un libellé gris.

| Taille                    | Piste      | Bordure | Marge intérieure | Curseur    | Dépassement | Texte d'état | Libellé |
| ------------------------- | ---------- | ------- | ---------------- | ---------- | ----------- | ------------ | ------- |
| sm                        | 40 × 18 px | 2 px    | 3 px             | 12 × 26 px | 4 px        | 15 px        | 12 px   |
| md (défaut)               | 56 × 24 px | 2 px    | 4 px             | 16 × 34 px | 5 px        | 18 px        | 13 px   |
| lg (taille Windows Phone) | 80 × 34 px | 3 px    | 6 px             | 22 × 48 px | 7 px        | 24 px        | 15 px   |

- **Curseur** : bordure noire (couleur du fond) qui le découpe de la piste ; position de 0 à largeur de piste moins largeur du curseur.
- **Désactivé** : piste, curseur et textes en #4d4d4d.
- **Interaction** : toucher pour basculer, ou glisser le curseur (bascule si relâché au-delà de la moitié).
- **Tram** : arrondi 2 px, curseur sur ressort qui s'écrase à 92 % à l'appui, haptique de sélection, zone tactile portée à 48 dp (`hitSlop`) pour sm et md.

```css
.switch {
  position: relative;
  width: var(--w);
  height: var(--h);
}
.switch .track {
  position: absolute;
  inset: 0;
  border: var(--b) solid #fff;
  box-sizing: border-box;
}
.switch .fill {
  position: absolute;
  left: var(--g);
  top: var(--g);
  bottom: var(--g);
  width: 0;
  background: var(--accent);
}
.switch .thumb {
  position: absolute;
  left: 0;
  top: var(--tt);
  width: var(--tw);
  height: var(--th);
  background: #fff;
  border: var(--b) solid #000;
  box-sizing: border-box;
  transition: left 0.22s cubic-bezier(0.1, 0.9, 0.2, 1);
}
.switch.sm {
  --w: 40px;
  --h: 18px;
  --b: 2px;
  --g: 3px;
  --tw: 12px;
  --th: 26px;
  --tt: -4px;
}
.switch.md {
  --w: 56px;
  --h: 24px;
  --b: 2px;
  --g: 4px;
  --tw: 16px;
  --th: 34px;
  --tt: -5px;
}
.switch.lg {
  --w: 80px;
  --h: 34px;
  --b: 3px;
  --g: 6px;
  --tw: 22px;
  --th: 48px;
  --tt: -7px;
}
```

```js
function place(x) {
  // x de 0 à W - TW
  thumb.style.left = x + 'px'
  fill.style.width = Math.max(0, x + TW / 2 - G) + 'px' // l'accent s'arrête au milieu du curseur
}
```

```tsx
// React Native : tailles du MetroSwitch
export const switchSizes = {
  sm: { w: 40, h: 18, border: 2, gap: 3, thumbW: 12, thumbH: 26 },
  md: { w: 56, h: 24, border: 2, gap: 4, thumbW: 16, thumbH: 34 },
  lg: { w: 80, h: 34, border: 3, gap: 6, thumbW: 22, thumbH: 48 },
}
const hit = s => Math.max(0, (48 - s.thumbH) / 2) // hitSlop pour atteindre 48 dp
```

## RadioButton

Le radio Metro est un cercle à bordure blanche épaisse, avec un point blanc au centre quand il est sélectionné, et le libellé en grand à droite. Il suit la même échelle sm, md et lg que le switch.

| Taille                    | Cercle | Bordure | Retrait du point | Espace avant le texte | Texte |
| ------------------------- | ------ | ------- | ---------------- | --------------------- | ----- |
| sm                        | 20 px  | 2 px    | 3 px             | 10 px                 | 15 px |
| md (défaut)               | 26 px  | 2 px    | 5 px             | 12 px                 | 18 px |
| lg (taille Windows Phone) | 34 px  | 3 px    | 6 px             | 14 px                 | 24 px |

- **Appuyé** : cercle rempli de la couleur d'accent.
- **Sélectionné** : point blanc, apparition rapide (120 ms).
- **Désactivé** : cercle, point et texte en #4d4d4d.
- **Tram** : point qui apparaît sur ressort avec un léger rebond, ligne réduite à 97 % à l'appui, haptique de sélection, zone tactile de 48 dp.

```css
.radio {
  display: flex;
  align-items: center;
  gap: var(--sp);
  padding: 6px 0;
}
.radio .circle {
  position: relative;
  width: var(--d);
  height: var(--d);
  border: var(--b) solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
}
.radio .dot {
  position: absolute;
  inset: var(--in);
  border-radius: 50%;
  background: #fff;
  transform: scale(0);
  transition: transform 0.12s ease-out;
}
.radio.checked .dot {
  transform: scale(1);
}
.radio.pressed .circle {
  background: var(--accent);
  border-color: var(--accent);
}
.radio.disabled .circle {
  border-color: #4d4d4d;
}
.radio.disabled .dot {
  background: #4d4d4d;
}
.radio.disabled .label {
  color: #4d4d4d;
}

.radio.sm {
  --d: 20px;
  --b: 2px;
  --in: 3px;
  --sp: 10px;
}
.radio.md {
  --d: 26px;
  --b: 2px;
  --in: 5px;
  --sp: 12px;
}
.radio.lg {
  --d: 34px;
  --b: 3px;
  --in: 6px;
  --sp: 14px;
}

.tram .radio .dot {
  transition: transform 0.4s cubic-bezier(0.2, 1.6, 0.4, 1);
} /* rebond */
```

```tsx
// React Native : tailles du MetroRadio
export const radioSizes = {
  sm: { d: 20, border: 2, inset: 3, gap: 10, font: 15 },
  md: { d: 26, border: 2, inset: 5, gap: 12, font: 18 },
  lg: { d: 34, border: 3, inset: 6, gap: 14, font: 24 },
}
// Point : scale.value = checked ? withSpring(1, { damping: 12, stiffness: 300 }) : withTiming(0, { duration: 100 });
```

## Tuiles

L'écran d'accueil est une grille de 4 colonnes où les tuiles occupent 1×1, 2×2 ou 4×2 cases, séparées d'environ 7 px.

| Taille  | Cases | Exemple             | Comportement                          |
| ------- | ----- | ------------------- | ------------------------------------- |
| Petite  | 1×1   | Téléphone, courrier | Icône + compteur                      |
| Moyenne | 2×2   | Contacts, météo     | Retournement ou glissement du contenu |
| Large   | 4×2   | Calendrier, photos  | Prochain rendez-vous, diaporama       |

Trois façons de rendre une tuile vivante :

- **Retournement** : rotation 3D verticale qui montre le dos de la tuile.
- **Glissement** : le contenu monte pour révéler un second panneau.
- **Tuiles image** : diaporama Photos (la nouvelle image pousse l'ancienne vers le haut, zoom lent), mosaïque Contacts (une vignette sur neuf se retourne au hasard), pochette Musique en plein cadre. Le nom est posé sur une bande noire semi-transparente pour rester lisible.

Grille et retournement :

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 78px;
  gap: 7px;
}
.tile.medium {
  grid-column: span 2;
  grid-row: span 2;
}
.tile.wide {
  grid-column: span 4;
  grid-row: span 2;
}

.flip {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
}
.flip.on {
  transform: rotateX(180deg);
}
.face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}
.face.back {
  transform: rotateX(180deg);
}
```

```js
setInterval(() => flip.classList.toggle('on'), 4000) // une cadence différente par tuile
```

Mosaïque : une vignette se replie, change d'image, puis se déplie.

```js
setInterval(() => {
  const cell = cells[Math.floor(Math.random() * cells.length)]
  cell.style.transform = 'rotateX(90deg)'
  setTimeout(() => {
    cell.innerHTML = nextAvatar()
    cell.style.transform = 'none'
  }, 230)
}, 1300)
```

## Affichage du contenu (sans cards)

Metro n'avait pas de cards : ni bordure, ni ombre, ni fond gris. Le contenu est posé sur le fond, séparé par l'espace vide, la typographie et des vignettes carrées.

- **À la une** : grande image pleine largeur, titre en 22 px, ligne d'infos grise.
- **Liste avec vignette** : carré de 68 px à gauche ; titre blanc, catégorie en accent, détail gris.
- **Grille de vignettes** : carrés sur 2 colonnes, légende en petites majuscules dessous, jamais par-dessus.
- **Texte seul** (courrier) : expéditeur en grand, objet en accent si non lu, aperçu gris, heure à droite.

```html
<div class="row">
  <img class="thumb" src="…" />
  <div>
    <div class="title">Coucher de soleil record</div>
    <div class="category">Météo</div>
    <div class="detail">Les photos les plus partagées</div>
  </div>
</div>
```

```css
.row {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}
.thumb {
  width: 68px;
  height: 68px;
  object-fit: cover;
  flex: none;
}
.title {
  font-size: 19px;
  color: #fff;
}
.category {
  font-size: 13px;
  color: var(--accent);
}
.detail {
  font-size: 13px;
  color: #9a9a9a;
}
```

Piste moderne : une card très discrète (fond gris très sombre, sans bordure ni ombre), à utiliser avec parcimonie.

## Modernisation : « Tram »

Nom proposé : **Tram**, un clin d'œil à Metro. Le métro roule sous terre, le tram glisse en surface, plus léger et plus fluide. Alternative : Mosaic.

| On garde (l'identité)           | On ajoute (le moderne)                                                         |
| ------------------------------- | ------------------------------------------------------------------------------ |
| Contenu avant décor             | Tuiles interactives (répondre, mettre en pause depuis la tuile)                |
| Typographie géante              | Tuiles contextuelles (taille et ordre selon l'heure ou le lieu)                |
| Aplats francs, couleur d'accent | Police variable animée, vrai noir OLED, accent tiré du fond d'écran            |
| Mouvement qui guide             | Animations à ressort interruptibles, retours haptiques                         |
| Pivot, tilt, turnstile          | Accessibilité : texte adaptatif, contrastes, option « réduire les animations » |
| Grille de tuiles                | Grilles adaptées aux tablettes et pliables, zones sûres                        |

À éviter : ombres, flou, arrondis marqués. Un arrondi de 2 px est la limite.

Réduire les animations quand l'utilisateur le demande :

```css
@media (prefers-reduced-motion: reduce) {
  .tile,
  .item,
  .metro-btn {
    animation: none !important;
    transition: none !important;
  }
}
```

## Spécifications Tram (modernisation)

Tram garde les tokens Metro et ne change que ce qu'exigent les écrans, l'accessibilité et les attentes actuelles. Les valeurs sont des propositions de départ, à ajuster en test.

### Tokens : Metro → Tram

| Token            | Metro             | Tram                                                                      |
| ---------------- | ----------------- | ------------------------------------------------------------------------- |
| Fond sombre      | #000000           | #000000 (vrai noir OLED)                                                  |
| Surface discrète | aucune            | #0F0F0F en sombre, #F2F2F2 en clair, sans bordure ni ombre                |
| Texte secondaire | blanc à 60 %      | blanc à 64 %, contraste AA (4,5:1) vérifié                                |
| Accents          | 20 couleurs fixes | Les 20 + accent tiré du fond d'écran                                      |
| Texte sur accent | toujours blanc    | Blanc ou noir selon le contraste (noir sur lime, jaune, ambre)            |
| Police           | Segoe WP          | Selawik ou une police variable libre, graisse animée                      |
| Tailles de texte | fixes en px       | En sp, suivent la taille de texte du système                              |
| Espacements      | 12 / 24 px        | Échelle de 4 : 4, 8, 12, 16, 24, 32 ; marge 24 (téléphone), 32 (tablette) |
| Cible tactile    | 34 px             | 48 dp minimum                                                             |
| Bordure          | 3 px              | 3 px                                                                      |
| Arrondi          | 0                 | 2 px maximum                                                              |
| Grille de tuiles | 4 colonnes        | 4 (téléphone), 6 (tablette), 8 (pliable ouvert)                           |
| Mouvement        | Courbes fixes     | Ressorts interruptibles ; fondus de 150 ms si « réduire les animations »  |
| Haptique         | aucune            | Légère (appui), sélection (changement d'onglet), moyenne (appui long)     |

### Échelle typographique Tram

| Style    | Taille                         | Graisse   |
| -------- | ------------------------------ | --------- |
| caption  | 13 sp                          | Regular   |
| body     | 16 sp                          | Regular   |
| subtitle | 19 sp                          | Regular   |
| title    | 25 sp                          | SemiLight |
| section  | 32 sp                          | Light     |
| pivot    | 42 sp                          | Light     |
| page     | 64 sp                          | Light     |
| hero     | 120 sp, grossissement plafonné | Light     |

### Évolution des composants

| Composant    | Metro                          | Tram                                                                                              |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| Button       | Bordure 3 px, angles vifs      | Plein ou contour en accent, arrondi 2 px, réduction à 96 % sur ressort, haptique légère           |
| Pivot        | Titres géants en boucle        | Idem, défilement lié au doigt, haptique au changement, rôle « tablist » pour les lecteurs d'écran |
| Live Tile    | Retournement, glissement       | Plus actions directes (répondre, pause) et taille ou ordre selon le contexte                      |
| Tuile image  | Diaporama, mosaïque            | Idem, images chargées progressivement, bande de lisibilité conservée                              |
| Liste        | Vignette + 3 niveaux de texte  | Idem, plus actions au balayage latéral                                                            |
| Card         | Inexistante                    | Surface discrète optionnelle, sans bordure ni ombre                                               |
| ToggleSwitch | Piste rectangulaire            | Curseur sur ressort, haptique de sélection                                                        |
| TextBox      | Fond clair même en sombre      | Fond adapté au thème, bordure d'accent au focus, erreur sous le champ                             |
| App Bar      | Icônes rondes, libellés cachés | Libellés visibles en option, respecte la zone sûre du bas                                         |
| Dialog       | Bandeau en haut, swivel        | Idem, fond assombri, fermeture au balayage                                                        |
| Toast        | Bandeau d'accent en haut       | Idem, sous l'encoche, fermeture au balayage                                                       |

Tokens Tram en code :

```ts
import { metro } from './metro'

export const tram = {
  ...metro,
  theme: {
    dark: {
      ...metro.theme.dark,
      surface: '#0F0F0F',
      subtle: 'rgba(255,255,255,0.64)',
    },
    light: { ...metro.theme.light, surface: '#F2F2F2', subtle: 'rgba(0,0,0,0.6)' },
  },
  onAccent: (hex: string) => (luminance(hex) > 0.45 ? '#000000' : '#FFFFFF'),
  font: {
    family: 'Selawik',
    size: {
      caption: 13,
      body: 16,
      subtitle: 19,
      title: 25,
      section: 32,
      pivot: 42,
      page: 64,
      hero: 120,
    },
  },
  space: [4, 8, 12, 16, 24, 32],
  margin: { phone: 24, tablet: 32 },
  touchTarget: 48,
  radius: 2,
  tileColumns: { phone: 4, tablet: 6, foldable: 8 },
  spring: {
    press: { damping: 20, stiffness: 400 },
    navigation: { damping: 22, stiffness: 180 },
    tile: { damping: 18, stiffness: 120 },
  },
}
```

Ressort, animations réduites et haptique dans React Native :

```tsx
import { withSpring, withTiming, useReducedMotion } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

export function useTramMotion() {
  const reduced = useReducedMotion()
  return (to: number, kind: keyof typeof tram.spring = 'press') => {
    'worklet'
    return reduced
      ? withTiming(to, { duration: 150 })
      : withSpring(to, tram.spring[kind])
  }
}

// Appui sur un bouton
const animate = useTramMotion()
const onPressIn = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  scale.value = animate(0.96)
}

// Changement d'onglet du Pivot
const onTabChange = () => Haptics.selectionAsync()
```

## React Native : faisabilité et prochaines étapes

C'est réaliste : tuiles, Pivot et boutons ne sont que des rectangles, du texte et des transformations 3D.

- **Reanimated** : rotations 3D avec perspective (retournement, tilt, turnstile), animations sur le thread UI.
- **Gesture Handler** : balayage du Pivot et suivi du doigt.
- **Points d'attention** : `backfaceVisibility` et perspective à tester sur Android ; `transformOrigin` (versions récentes de React Native) pour le pivot du turnstile.
- **Police** : Segoe n'est pas libre ; Selawik, l'alternative open source de Microsoft, est très proche.

Bouton Metro (réduction à 96 %, inversion des couleurs) :

```tsx
import { Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'

const metroEase = Easing.bezier(0.1, 0.9, 0.2, 1)

export function MetroButton({ label, color = '#1BA1E2', onPress }) {
  const down = useSharedValue(0) // état immédiat (couleurs)
  const scale = useSharedValue(1) // état animé (taille)

  const box = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: down.value ? '#fff' : color,
    borderColor: down.value ? '#fff' : color,
  }))
  const text = useAnimatedStyle(() => ({ color: down.value ? '#000' : '#fff' }))

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        down.value = 1
        scale.value = withTiming(0.96, { duration: 80 })
      }}
      onPressOut={() => {
        down.value = 0
        scale.value = withTiming(1, { duration: 180, easing: metroEase })
      }}
    >
      <Animated.View
        style={[
          {
            borderWidth: 3,
            borderRadius: 2,
            minHeight: 56,
            paddingHorizontal: 14,
            justifyContent: 'center',
            alignItems: 'center',
          },
          box,
        ]}
      >
        <Animated.Text style={[{ fontSize: 19, fontFamily: 'Selawik' }, text]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  )
}
```

Tilt d'une tuile selon la position du doigt :

```tsx
const rx = useSharedValue(0),
  ry = useSharedValue(0),
  s = useSharedValue(1)
const [size, setSize] = useState({ w: 1, h: 1 })

const tilt = useAnimatedStyle(() => ({
  transform: [
    { perspective: 600 },
    { rotateX: `${rx.value}deg` },
    { rotateY: `${ry.value}deg` },
    { scale: s.value },
  ],
}))

const onPressIn = e => {
  const { locationX, locationY } = e.nativeEvent
  const dx = (locationX / size.w - 0.5) * 2,
    dy = (locationY / size.h - 0.5) * 2
  const k = size.w > 200 ? 4 : 8
  ry.value = withTiming(dx * k, { duration: 80 })
  rx.value = withTiming(-dy * k, { duration: 80 })
  s.value = withTiming(0.97, { duration: 80 })
}
const onPressOut = () => {
  rx.value = withTiming(0, { duration: 180, easing: metroEase })
  ry.value = withTiming(0, { duration: 180, easing: metroEase })
  s.value = withTiming(1, { duration: 180, easing: metroEase })
}
// <Pressable onLayout={e => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })} …>
```

Live Tile qui se retourne :

```tsx
const r = useSharedValue(0)
useEffect(() => {
  const id = setInterval(() => {
    r.value = withTiming(r.value === 0 ? 180 : 0, {
      duration: 900,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    })
  }, 4000)
  return () => clearInterval(id)
}, [])

const front = useAnimatedStyle(() => ({
  transform: [{ perspective: 800 }, { rotateX: `${r.value}deg` }],
}))
const back = useAnimatedStyle(() => ({
  transform: [{ perspective: 800 }, { rotateX: `${r.value + 180}deg` }],
}))
// Deux Animated.View en position absolue, chacune avec backfaceVisibility: 'hidden'
```

Prochaines étapes :

1. Poser les tokens : couleurs d'accent, tailles de texte, courbe `metroEase`, durées.
2. Coder MetroButton et MetroTile (tilt + retournement).
3. Construire le Pivot avec boucle infinie et contenu en cascade.
4. Ajouter le turnstile entre l'accueil et une appli.
5. Tester iOS et Android, puis la version « Tram » (haptique, ressorts, accessibilité).
