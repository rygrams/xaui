# XAUI v1 — Plan d'implémentation

> Refonte de `@xaui/native` en librairie React Native pure, inspirée de HeroUI Native, l'existant étant republié figé sous `@xaui/native-legacy` le temps de la migration.

**État de départ** : `@xaui/native` v0.2.8, 47 composants publiés · `@xaui/hybrid` v0.0.14 · `@xaui/core`, `@xaui/icons`, `@xaui/mcp` · monorepo Turborepo/pnpm · docs Next.js, demo Expo.

**Cible** : deux packages publiés — `@xaui/native` et `@xaui/hybrid`. `core`, `icons`, `mcp` disparaissent. `@xaui/native-legacy` existe le temps de la transition (§7).

---

## 1. Principes

Quatorze règles. Elles ne se négocient pas composant par composant — c'est ce qui fait qu'une lib de 47 composants reste apprenable.

**R1 — Composition, pas configuration.**
Un composant = un root `forwardRef` + des slots en dot-notation. Aucune prop ne stylise l'intérieur d'un autre composant.

```tsx
<Button>Basic Button</Button>

<Button variant="primary">
  <Button.Icon as={PlusIcon} />
  <Button.Label>Créer un projet</Button.Label>
</Button>
```

**R2 — `customAppearance` est supprimé.**
Chaque slot porte son propre `style`. L'override est local et visible là où il s'applique.

**R3 — Les children textuels sont auto-wrappés, via `childrenToString`.**
On n'inspecte pas le premier enfant : on tente de **stringifier récursivement** l'arbre. S'il contient le moindre élément React, la fonction rend `null` et les children passent tels quels ; sinon on enveloppe la chaîne concaténée dans le slot texte par défaut. C'est l'implémentation de HeroUI, et elle traite correctement `<Button>{count} items</Button>` — un tableau `[3, ' items']` qu'un simple `isValidElement` aurait manqué.

**R4 — Le layout appartient au root.**
`gap`, `alignItems`, `flexDirection` sont sur le root. **Les slots n'ont aucune marge propre.** Corollaire : l'ordre JSX est l'ordre à l'écran, donc `startContent` / `endContent` disparaissent.

**R5 — Le contexte porte des valeurs résolues.** _(divergence assumée — voir §1 ter)_
Le root résout `variant × size × état` (plus la teinte `color` si fournie) une fois et publie la couleur finale. Les slots ne re-résolvent rien. Valeur memoizée. HeroUI publie les props brutes et laisse chaque slot re-résoudre — c'est gratuit chez eux grâce au cache de `tv()`, ça ne l'est pas sans moteur de classes.

**R6 — Tokens dans les props, valeurs arbitraires dans `style`.**
`size="md"` passe, `size={42}` est une erreur de type. C'est ce qui permet le cache de styles (§3) — l'ouvrir tue le gain de perf. La règle porte sur le **vocabulaire** : `variant`, `size`, `radius`. Les valeurs brutes ont leur propre chemin, **hors du cache** et résolu dans une seconde passe (§3) : `color` et les **props de style** de R14.

**R7 — Deux props d'apparence, pas trois.**
`variant` = apparence sanctionnée par le design system. `color` = une teinte brute qui remplace celle du variant. Ce sont les deux seules props du **vocabulaire** : rien d'autre ne décrit une intention ou une emphase. Les props de style de R14 — `backgroundColor`, `borderColor` — ne sont pas de ce vocabulaire, ce sont des surcharges brutes, la même catégorie que `style`. Une revue qui voit `backgroundColor` là où `variant` suffisait signale la même chose qu'avant ; ce qui change, c'est que le contournement est court et lisible au lieu d'être un objet.

**R8 — Booléens en `isX` / `hasX`.**
`isDisabled`, `isLoading`, `hasError`. `disabled` n'est jamais public ; il est forwardé en interne au `Pressable`.

**R9 — Chaque root forwarde `ref`, `style`, `testID` et les props d'accessibilité.**
Sans ça : pas de gesture-handler, pas de mesure de layout, pas de focus programmatique, pas de `asChild`. **C'est irrattrapable après la 1.0.**
Deux détails que HeroUI applique et qu'il faut reprendre : `accessibilityRole` a une valeur par défaut mais reste surchargeable par les props, et `style` accepte **la forme fonction** de `Pressable` (`(state) => style`), pas seulement un objet.

**R10 — Chaque composant composé exporte son hook de contexte.**
`export { useButton }`, `export { useChip }`. C'est ce qui permet à un tiers d'écrire son propre slot (`<Button.MyThing>`) sans forker la lib. HeroUI le fait sur chaque compound ; sans ça, `system/` ne sert à rien pour l'extérieur.

**R11 — `displayName` est namespacé.**
`'XAUI.Button.Root'`, `'XAUI.Button.Label'`. C'est ce qui rend les stack traces et le React DevTools lisibles quand vingt composants ont un slot `Label`.

**R12 — `asChild` sur chaque root.**
Fusionner les props dans l'enfant au lieu de rendre son propre élément — c'est ce qui branche un `Link` de navigation sur un `Button`, ou un déclencheur maison sur un `Select`. Un `mergeProps` + `mergeRefs` dans `system/slot/`, appliqué uniformément dès le premier composant. **Le rétrofit après coup change la signature de ref des 15 composants du noyau** ; c'est le pendant de R9.

**R13 — Aucun `left` / `right` dans un style.**
`paddingStart` / `paddingEnd`, `marginStart` / `marginEnd`, `start` / `end`. RN gère le RTL tout seul avec ces propriétés et pas avec les autres. Écrire `paddingLeft` coûte zéro aujourd'hui et un audit complet le jour où quelqu'un ouvre l'app en arabe. Une règle ESLint interdit les formes directionnelles dans `src/`.

**R14 — Le style d'un composant se modifie en props.**
Desserrer un contrôle, lui donner une largeur, changer un fond ne doit pas demander d'ouvrir un objet :

```tsx
<Button padding={16} marginTop={8}>Envoyer</Button>
<Button width="100%" backgroundColor="#111">…</Button>
```

**Le nom est celui de la propriété RN, en entier** — `padding`, pas `p` ; `backgroundColor`, pas `bg`. Et donc **la valeur est celle de RN aussi** : `padding={16}` vaut 16 points. Une prop qui porte le nom exact de la clé et en multiplierait la valeur par une échelle serait le piège le plus coûteux de l'API. L'échelle reste explicite : `padding={t.spacing(4)}`.

Le jeu n'est pas une liste mais un type : **les clés de style du nœud du composant** — `ViewStyle`, `TextStyle` sur un slot texte — **moins les formes directionnelles que R13 interdit**, qui ne sont pas exposées du tout.

Trois choses les gardent compatibles avec le reste :

- **La portée s'arrête au nœud sur lequel la prop est écrite.** Jamais un descendant : R1 tient, et c'est ce qui les sépare de `customAppearance`.
- **Elles sont hors du cache**, résolues dans la même seconde passe que `color` (§3). Le nombre de combinaisons de tokens reste fini.
- **Elles perdent contre `style`**, qui reste l'échappatoire finale pour ce qui n'a pas de prop lisible — `transform`, une ombre par plateforme, un objet calculé.

Le détail du jeu et de sa résolution est au §2 ter.

### Ce qu'on garde de l'existant

- **La convention de fichiers** (`.type` / `.hook` / `.style` / `.animation` / `index`), étendue avec `.recipe.ts` et `.context.ts`.
- **Les exports par sous-chemin** (`@xaui/native/button`).
- **Aucun test de composant, de slot, de hook ni de constantes d'animation** — seules les fonctions pures en ont un, dans `__tests__/` en miroir.

---

## 1 bis. Le vocabulaire d'API

### `variant` — union plate, emphase et intention fusionnées

`themeColor` disparaît. `color` est réservé aux valeurs brutes (§1 R7), donc l'intention sémantique remonte dans `variant`, comme le `Button` de HeroUI.

```ts
type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost' // emphase, teinte accent
  | 'success'
  | 'success-soft'
  | 'warning'
  | 'warning-soft'
  | 'danger'
  | 'danger-soft'
```

Dix valeurs sanctionnées. Le suffixe `-soft` est le niveau d'emphase faible d'une intention — c'est ce que HeroUI a dû ajouter à la main pour `danger` seul, généralisé ici aux trois intentions.

### Une variante nomme des tokens, elle ne calcule rien

Avec des tokens sémantiques plats (§4), il n'y a **pas de matrice à résoudre** : chaque variante désigne directement deux ou trois tokens.

| `variant`      | fond          | bordure  | texte                   |
| -------------- | ------------- | -------- | ----------------------- |
| `primary`      | `accent`      | —        | `accentForeground`      |
| `secondary`    | `default`     | —        | `defaultForeground`     |
| `tertiary`     | transparent   | `border` | `foreground`            |
| `ghost`        | transparent   | —        | `foreground`            |
| `success`      | `success`     | —        | `successForeground`     |
| `success-soft` | `successSoft` | —        | `successSoftForeground` |
| `warning`      | `warning`     | —        | `warningForeground`     |
| `warning-soft` | `warningSoft` | —        | `warningSoftForeground` |
| `danger`       | `danger`      | —        | `dangerForeground`      |
| `danger-soft`  | `dangerSoft`  | —        | `dangerSoftForeground`  |

Dix lignes de table, aucune logique de peinture dupliquée : ce sont les tokens qui portent l'information. Le fichier `parse-variant.ts` prévu au §2 devient inutile — il est remplacé par `variant-map.ts`, une simple constante.

### `size` pilote la hauteur, jamais la largeur

Vérifié dans la source de HeroUI Native (`src/styles/components/button.css`) : le root du bouton déclare `flex-direction`, `align-items`, `justify-content`, `border-width` — **et aucune largeur**. `size` ne fixe que la hauteur, le padding horizontal, le `gap` et le rayon.

```css
.button__root--size-md {
  height: 48px;
  padding-inline: 16px;
  gap: 8px;
  border-radius: …;
}
.button__root--is-icon-only {
  padding: 0;
  aspect-ratio: 1;
}
```

Conséquence, en React Native : `alignItems` vaut `stretch` par défaut, donc **un bouton sans largeur remplit son parent en `Column` et épouse son contenu en `Row`**. HeroUI n'a pas de prop `fullWidth` — le comportement natif suffit, et `className="self-start"` sert d'échappatoire.

**Trois décisions pour XAUI :**

1. **Aucune largeur dans le recipe.** Le comportement par défaut est celui de RN, pas une invention de la lib.
2. **`fullWidth` est supprimé.** Dans le code actuel il ajoute `width: '100%'` — quasiment sans effet en `Column` (le bouton y est _déjà_ pleine largeur) et utile seulement en `Row`. Une prop dont le nom décrit le comportement par défaut est un piège. Pour resserrer un bouton, on compose : `<Row><Button/></Row>`, ou `style={{ alignSelf: 'flex-start' }}`. Et le cas où la largeur _est_ voulue s'écrit maintenant `width="100%"` (R14), explicitement, plutôt que par une prop qui prétend décrire un comportement.
3. **`height` fixe, pas `minHeight`.** Le code actuel utilise `minHeight`, ce qui laisse un bouton grandir si son label passe à la ligne. Un contrôle a une hauteur, pas une hauteur minimale ; un label trop long doit être tronqué, pas déformer le bouton.

Corollaire : `isIconOnly` n'a pas besoin de calcul de largeur — `padding: 0` + `aspectRatio: 1` sur une hauteur fixe donne un carré.

Et l'enveloppe `<View>` externe du `Button` actuel disparaît : elle n'existait que pour `fullWidth` et `customAppearance.container`, tous deux supprimés.

### `Typography` — des rôles, pas une échelle Material

Les 13 variantes actuelles (`displayLarge` … `bodySmall`) sont le dernier morceau de vocabulaire MD3 de la lib. Elles deviennent quatre familles × trois tailles, nommées par rôle :

```ts
type TextVariant =
  | 'display-sm'
  | 'display-md'
  | 'display-lg'
  | 'heading-sm'
  | 'heading-md'
  | 'heading-lg'
  | 'body-sm'
  | 'body-md'
  | 'body-lg'
  | 'caption'
```

Chaque rôle fixe **taille, interlignage, graisse et famille ensemble**. Ça supprime les props `size` et `weight` séparées du composant actuel, et avec elles les combinaisons illégales — un titre en `weight="light"`, un caption en `lg`. `style` reste l'échappatoire pour le cas hors système.

Dix valeurs contre trois chez HeroUI : on garde l'échelle typographique que les 13 variantes encodaient déjà, sans en garder le vocabulaire.

### `color` — la teinte, en valeur brute

Une seule prop de couleur dans toute la librairie. Elle ne porte **jamais** de token, seulement une valeur RN (`'#7c3aed'`, `'rgba(…)'`).

`color` n'est pas une propriété CSS, c'est **la teinte du composant** — elle occupe exactement la place que `themeColor` occupait dans le recipe, avec une valeur libre au lieu d'une clé de palette. Où elle se pose découle donc du variant, pas de la prop :

```tsx
<Button variant="primary" color="#7c3aed">   // fond violet, label contrasté
<Button variant="ghost"   color="#7c3aed">   // label violet, pas de fond
<Button variant="tertiary" color="#7c3aed">  // bordure + label violets
<Typography color="#7c3aed">                 // texte violet
<Container color="#7c3aed">                  // fond violet
```

C'est ce qui lève l'ambiguïté sans ajouter de mot : dans un composant texte il n'y a qu'une chose à teinter, dans un conteneur aussi. `Container.color` garde donc son sens actuel — rien à renommer.

### Dérivation de la teinte

Une variante consomme quatre rôles : la couleur pleine, son texte contrasté, sa version douce, son état pressé. Une teinte brute n'en fournit qu'un — les trois autres sortent des **mêmes formules OKLab que la couche dérivée du thème** (§4.3), pas d'une mécanique parallèle :

```ts
const deriveTint = (tint: string, t: XAUITheme) => ({
  base: tint,
  foreground: contrastOn(tint), // snow ou eclipse selon la luminance
  soft: alpha(tint, 0.15),
  pressed: mix(tint, contrastOn(tint), 0.1),
})
```

Une teinte libre se comporte donc exactement comme `accent` ou `danger` : mêmes ratios, même rendu. Fichier : `theme/derive-tint.ts`, qui partage `mix` / `alpha` / `contrastOn` avec `theme/derive-colors.ts`.

### Tout le reste passe par `style`

Bordure d'une couleur différente du fond, ombre teintée, dégradé : `style`. Ce sont des cas rares, et leur donner une prop rouvrirait la porte que R7 ferme.

### Quels composants exposent `variant`

Tous. Ceux qui n'ont pas d'intention légitime (`Card`, `Surface`, `Divider`, `Skeleton`) restreignent simplement leur union aux quatre niveaux d'emphase — c'est un sous-type, pas une prop différente.

---

## 1 ter. Fidélité à HeroUI — l'audit

Vérifié dans leur source (`heroui-inc/heroui-native`), pas dans leur doc.

### Repris à l'identique

| Point                              | Chez eux                                                      | Chez nous                  |
| ---------------------------------- | ------------------------------------------------------------- | -------------------------- |
| Compound + `Object.assign`         | `Object.assign(ButtonRoot, { Label, Background })`            | identique                  |
| `forwardRef` sur root **et** slots | oui                                                           | identique                  |
| Contexte strict, erreur nommée     | `createContext({ name, strict })` + `Error.captureStackTrace` | identique                  |
| Auto-wrap des children             | `childrenToString` récursif                                   | identique (R3)             |
| Hook de contexte exporté           | `export { useButton }`                                        | identique (R10)            |
| `displayName` namespacé            | `'HeroUINative.Button.Root'`                                  | `'XAUI.Button.Root'` (R11) |
| `size` = hauteur, jamais largeur   | aucune largeur au root                                        | identique (§1 bis)         |
| Aucune prop de style profonde      | `className` par slot seulement                                | `style` par slot (R2)      |
| Tokens sémantiques plats           | `--color-accent`, `--color-danger-soft`                       | identique (§4)             |

### Divergences assumées — et pourquoi

**1. Le contexte porte des valeurs résolues, pas les props brutes.**
Leur contexte est `{ size, variant, isDisabled }` et chaque slot rappelle `buttonClassNames.label({ size, variant })`. C'est gratuit parce que `tv()` met en cache des chaînes de classes. Sans moteur de classes, re-résoudre dans chaque slot veut dire re-exécuter le recipe à chaque render de chaque slot. On résout une fois au root (R5).

**2. `-hover` devient `-pressed`.**
Leurs tokens `accent-hover`, `danger-hover`, `danger-soft-hover` alimentent en réalité **l'overlay de press** (`PressableFeedback.Highlight`). Le nom est un vestige de leur version web ; ce qu'il désigne est l'état pressé. On le nomme pour ce qu'il fait.

**3. Pas de `Background` ni de `GlassView`.**
Leur `Button.Background` est une couche absolue qui héberge le flou du thème _glass_. C'est une fonctionnalité de thème à part entière, pas un principe d'API. Hors périmètre 1.0 — à reconsidérer plus tard, l'emplacement du slot reste disponible.

**4. `variant` étend `-soft` aux trois intentions.**
Ils n'ont que `danger-soft`, ajouté à la main. On généralise à `success-soft` et `warning-soft` (§1 bis).

**5. `secondary` et `tertiary` ne seront pas identiques.**
Chez eux les deux ont le même fond (`--color-default`) et ne diffèrent que par la couleur du label. Deux variantes pour une nuance de texte : on garde `secondary` comme surface neutre et `tertiary` comme contour.

### Ce qu'ils ont et qui manquait au plan

**`PressableFeedback` est un composant partagé, pas un fichier d'animation par composant.**
Ils exposent un primitif avec `.Highlight` et `.Ripple` en slots, une prop `feedbackVariant` (`scale-highlight | scale-ripple | scale | none`) et une prop `animation` qui accepte `false`, `'disabled'`, `'disable-all'` ou un objet granulaire par sous-animation.

C'est structurellement meilleur que mon `button.animation.ts` par composant : le retour au toucher est le même partout, il n'a aucune raison d'être réécrit 47 fois. **Il passe dans `system/pressable-feedback/` et devient une dépendance de tous les composants pressables** (`Button`, `Chip`, `Card` cliquable, `ListItem`, `MenuItem`, `SegmentButton`…).

---

## 2. Architecture cible

### Vue d'ensemble du monorepo

```
xaui/
├── tooling/
│   ├── tokens/
│   │   ├── source.ts              # SOURCE UNIQUE des tokens
│   │   └── generate.ts            # émet les deux tokens.gen.ts
│   ├── codemods/                  # legacy-imports, variant-map, slots
│   └── docgen/                    # tables de props depuis les types TS
├── packages/
│   ├── native/                    # @xaui/native — l'API v1
│   ├── native-legacy/             # @xaui/native-legacy — figé, déprécié à la parité (§7)
│   └── hybrid/                    # @xaui/hybrid — même API, renderer web
└── apps/
    ├── docs/                      # Next.js + react-native-web
    └── demo/                      # Expo
```

### `packages/native/src`

Six dossiers de premier niveau, et la règle de placement (§2 bis) dit lequel.

```
src/
├── theme/                         # les tokens et leur accès
│   ├── tokens.gen.ts              #   généré — ne jamais éditer
│   ├── colors.gen.ts              #   généré — les deux jeux plats light / dark
│   ├── palette.ts                 #   la palette brute, hors du thème
│   ├── theme.type.ts              #   XAUITheme, XAUIColors, Size, Radius…
│   ├── theme-context.ts           #   le contexte nu
│   ├── theme-hooks.ts             #   useXAUITheme, useThemeColor, useColorMode
│   ├── create-theme.ts            #   API publique de configuration (§4.5)
│   ├── derive-colors.ts           #   couche source → ~30 tokens dérivés (§4.3)
│   ├── derive-tint.ts             #   teinte brute `color` → mêmes rôles (§1 bis)
│   └── index.ts
│
├── provider/                      # le point d'entrée applicatif
│   ├── xui-provider.tsx           #   compose theme + portal host + color mode
│   ├── xui-provider.type.ts
│   └── index.ts                   #   UNIQUE — partagé par legacy et v1
│
├── system/                        # ce avec quoi on CONSTRUIT les composants
│   ├── recipe/
│   │   ├── create-recipe.ts       #   le moteur
│   │   ├── variant-map.ts         #   'danger-soft' → { bg: 'dangerSoft', fg: 'danger' }
│   │   ├── style-cache.ts         #   Map + StyleSheet.create paresseux
│   │   ├── resolve-tint.ts        #   la passe hors cache
│   │   └── recipe.type.ts
│   ├── slot/
│   │   ├── create-slot-context.ts #   contexte strict + erreur nommée hors parent
│   │   ├── children-to-string.ts  #   stringification récursive — auto-wrap R3
│   │   ├── merge-props.ts         #   support de `asChild` (R12)
│   │   ├── merge-refs.ts
│   │   └── slot.type.ts
│   ├── pressable-feedback/        #   le retour au toucher, partagé (§1 ter)
│   │   ├── pressable-feedback.tsx
│   │   ├── pressable-feedback-highlight.tsx
│   │   ├── pressable-feedback-ripple.tsx
│   │   ├── pressable-feedback.animation.ts
│   │   ├── pressable-feedback.type.ts
│   │   └── index.ts
│   ├── portal/                    #   repris de core/portal — Dialog, Sheet, Drawer, Snackbar
│   │   ├── portal.tsx
│   │   ├── portal-host.tsx
│   │   ├── portal-context.ts
│   │   └── index.ts
│   ├── icon/                      #   le primitif Icon (§5)
│   │   ├── icon.tsx
│   │   ├── icon.context.ts        #   taille + couleur héritées du slot parent
│   │   ├── icon.type.ts
│   │   └── index.ts
│   └── index.ts                   # exporté publiquement : @xaui/native/system
│
├── hooks/                         # hooks partagés entre composants
│   ├── use-controllable-state.ts  #   controlled / uncontrolled
│   ├── use-press-state.ts         #   isPressed, sans re-render inutile
│   ├── use-merged-ref.ts
│   ├── use-previous.ts
│   └── index.ts
│
├── utils/                         # helpers internes, NON exportés
│   ├── merge-props.ts
│   ├── merge-refs.ts
│   ├── compose-styles.ts
│   ├── colors.ts                  #   OKLab : mix, alpha, contrastOn, contrastRatio (§4.3)
│   ├── is-text-child.ts           #   support de R3
│   ├── warn-dev.ts                #   __DEV__ uniquement
│   └── index.ts
│
├── types/                         # types transverses
│   ├── common.type.ts             #   Size, Radius, Variant, EdgeInsets, Alignment…
│   ├── polymorphic.type.ts        #   asChild / as
│   └── index.ts
│
├── components/                    # un dossier par composant (détail ci-dessous)
│   ├── button/
│   ├── typography/
│   └── …
│
├── __tests__/                     # miroir exact de l'arborescence
│   ├── system/recipe/style-cache.test.ts
│   └── components/button/button.test.tsx
│
└── index.ts                       # réexporte theme + provider + system + components
```

### Un dossier de composant

La convention actuelle (`.type` / `.hook` / `.style` / `.animation` / `index`) est conservée et complétée par `.recipe.ts` et `.context.ts`. `.style.ts` ne garde que les styles vraiment statiques — tout ce qui dépend d'un token ou d'un variant vit désormais dans le recipe.

```
components/button/
├── button.recipe.ts        # variantes → tokens — source de vérité du style
├── button.context.ts       # createSlotContext : valeurs RÉSOLUES + export de useButton (R10)
├── button.type.ts          # ButtonProps, ButtonLabelProps, ButtonIconProps…
├── button.hook.ts          # logique non visuelle (loading, état composé)
├── button.style.ts         # StyleSheet statique (overflow…) — souvent minuscule
├── button.tsx              # le root
├── button-label.tsx        # un fichier par slot
├── button-icon.tsx
├── button-spinner.tsx
└── index.ts                # Object.assign(ButtonRoot, { Label, Icon, Spinner })
```

Un composant sans slot (`Divider`, `Skeleton`) n'a ni `.context.ts` ni fichiers de slot. Un composant sans animation n'a pas de `.animation.ts`. **Aucun fichier vide « pour respecter la convention ».**

---

## 2 bis. Où va un nouveau fichier

Sans cette règle, tout finit dans `utils/` en six mois.

| Question                                                                      | Réponse | Dossier                      |
| ----------------------------------------------------------------------------- | ------- | ---------------------------- |
| C'est une valeur de design (couleur, espacement, rayon) ?                     | oui     | `theme/`                     |
| C'est ce qui enveloppe l'app une seule fois ?                                 | oui     | `provider/`                  |
| Un développeur tiers en aurait-il besoin pour écrire **son** composant XAUI ? | oui     | `system/`                    |
| C'est un hook React réutilisé par ≥ 2 composants ?                            | oui     | `hooks/`                     |
| C'est une fonction pure, sans React, interne ?                                | oui     | `utils/`                     |
| C'est un type utilisé par ≥ 2 composants ?                                    | oui     | `types/`                     |
| Sinon                                                                         | —       | dans le dossier du composant |

Deux frontières à tenir :

- **`system/` est public, `utils/` est privé.** `system/` est publié comme `@xaui/native/system` et suit le semver ; `utils/` peut changer à tout moment. Si un helper devient utile à l'extérieur, il **déménage** dans `system/` — il n'est pas réexporté depuis `utils/`.
- **Un fichier utilisé par un seul composant reste chez lui.** La promotion vers `hooks/` ou `utils/` se fait au deuxième usage, jamais par anticipation.

### Exports

| Sous-chemin                  | Contenu                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `@xaui/native`               | provider + theme + system + tous les composants v1                                         |
| `@xaui/native/button`        | un composant v1                                                                            |
| `@xaui/native/provider`      | `XAUIProvider` seul — pour le fichier racine de l'app                                      |
| `@xaui/native/theme`         | `createTheme`, `useXAUITheme`, `useThemeColor`, `useColorMode`, `palette`                  |
| `@xaui/native/system`        | `createRecipe`, `createSlotContext`, `Portal`, `Icon` — pour écrire ses propres composants |
| `@xaui/native-legacy/button` | un composant legacy — **autre package** (§7)                                               |

> **Bug actuel à corriger** : `packages/native/src/index.ts` contient `export {}`. Un `import { Button } from '@xaui/native'` rend `undefined` sans erreur lisible. Le root doit réexporter le tree v1.

### Dépendances

Les six peer deps actuelles sont **toutes obligatoires** (`peerDependenciesMeta` est vide), donc `npm i @xaui/native` réclame cinq paquets natifs même pour un simple `Button`. La v1 sépare le socle du reste.

| Paquet                                             | Statut     | Pourquoi                                                                                                  |
| -------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| `react`, `react-native`                            | requis     | —                                                                                                         |
| `react-native-reanimated`, `react-native-worklets` | **requis** | `PressableFeedback` en dépend, et le retour au toucher sur le thread UI est un argument central de la lib |
| `react-native-gesture-handler`                     | optionnel  | `Slider`, `BottomSheet`, `Drawer`, `Carousel`                                                             |
| `react-native-svg`                                 | optionnel  | `Icon` en mode SVG, `Chart`, `Progress` circulaire                                                        |
| `react-native-safe-area-context`                   | optionnel  | `Screen`, `AppBar`, `BottomTabBar`                                                                        |

Les optionnelles sont déclarées dans `peerDependenciesMeta` et importées **uniquement** par les composants qui les utilisent — un import au niveau du barrel racine annulerait l'intérêt. Chaque composant concerné lève une erreur explicite en dev si son paquet manque, plutôt qu'un `undefined is not a function`.

Conséquence sur le code existant : **45 fichiers utilisent encore l'`Animated` legacy de RN contre 11 seulement pour Reanimated.** Le tree v1 est 100 % Reanimated ; le tree legacy garde son `Animated` tel quel, il est figé.

`@xaui/core` et `@xaui/icons` disparaissent aussi des `dependencies` — le package v1 n'a plus aucune dépendance runtime.

### Suppression des trois packages

**`@xaui/core` → dissous.** Les tokens deviennent `theme/tokens.gen.ts` dans chaque package (§4). Les types partagés (`EdgeInsets`, `Alignment`, `Border`, `ShadowConfig`…) sont recopiés dans `native/src/theme/theme.type.ts` — ils sont purement déclaratifs, la duplication ne coûte rien. Le tree legacy reçoit un `core-shim.ts` qui réexporte sous les anciens noms pour que rien n'y soit touché.

**`@xaui/icons` → supprimé.** Les 520 SVG partent. À la place, un primitif `Icon` dans `system/` qui adapte n'importe quelle lib tierce (Ionicons, Lucide, react-native-svg) **et lit le contexte de slot pour la couleur et la taille** (§5). C'est précisément le point faible de HeroUI Native — leur doc oblige l'utilisateur à résoudre la couleur d'icône à la main via `useThemeColor`.

**`@xaui/mcp` → supprimé.** Sa `src/data/` est de la doc écrite à la main, déjà dupliquée avec `apps/docs` et les README. Elle est régénérée depuis la source unique de doc (§6) et servie par le site en `llms.txt` — la route `app/docs/llms-txt` existe déjà.

---

## 2 ter. Les props de style

R14 en détail. Le problème qu'elles règlent est banal et permanent : desserrer un contrôle,
lui donner une largeur, changer un fond. Chacun de ces cas oblige aujourd'hui à ouvrir un
objet `style`, ce qui est disproportionné pour une valeur.

```tsx
<Button padding={16} marginTop={8}>Envoyer</Button>
<Button width="100%" borderRadius={12}>…</Button>
<Card backgroundColor="#111" borderColor="#333">…</Card>
```

### Le nom est celui de la propriété RN, en entier

Pas d'abréviations. `padding`, pas `p` ; `marginTop`, pas `mt` ; `backgroundColor`, pas
`bg`. Ce sont des props, elles se lisent au point d'appel, et une API de raccourcis oblige
à apprendre une table de correspondance pour rien.

**La contrepartie est que la valeur doit être celle de RN aussi.** `padding={16}` vaut 16
points, comme `style={{ padding: 16 }}`. Une prop qui porte le nom exact de la clé RN et en
multiplie silencieusement la valeur par une échelle serait le piège le plus coûteux de
toute l'API — celui qu'on ne voit qu'en mesurant à l'écran.

L'échelle reste accessible, explicitement :

```tsx
const t = useXAUITheme()
<Button padding={t.spacing(4)} borderRadius={t.radius.lg}>…</Button>
```

C'est un mot de plus et zéro ambiguïté. Le design system continue de vivre dans `variant`,
`size` et les tokens ; les props de style sont l'échappatoire courte, pas le vocabulaire.

### Le jeu est le type de style, moins ce que R13 interdit

Il n'y a pas de liste à maintenir. Un composant expose **les clés de style de son propre
nœud** :

- un root ou un slot vue : `ViewStyle`
- un slot texte : `TextStyle` (donc `color`, `fontSize`, `fontWeight`, `letterSpacing`…)
- un slot image : `ImageStyle`

**Moins les formes directionnelles que R13 interdit** — `left`, `right`, `paddingLeft`,
`paddingRight`, `marginLeft`, `marginRight`, `borderLeftWidth`, `borderRightColor`,
`borderTopLeftRadius`… Elles ne sont pas exposées du tout : `paddingStart` / `paddingEnd`,
`start` / `end`, `borderStartWidth`. Une API de props est exactement l'endroit où quelqu'un
écrirait `paddingLeft` sans y penser, donc le type le rend impossible plutôt que de compter
sur une revue.

```ts
type StyleProps = Omit<ViewStyle, DirectionalStyleKey>
```

### La portée s'arrête au nœud du composant

Une prop de style stylise **la boîte du composant sur lequel elle est écrite**, jamais
celle d'un descendant — R1 tient exactement comme avant. Chaque slot porte les siennes,
comme il porte déjà son `style` (R2) :

```tsx
<Button padding={20}>
  <Button.Label fontSize={18} letterSpacing={1}>
    Envoyer
  </Button.Label>
</Button>
```

C'est ce qui les distingue de l'ancien `customAppearance`, qui atteignait l'intérieur d'un
composant depuis l'extérieur : ici l'endroit où on écrit la prop est l'endroit où elle
s'applique.

### `color` garde son sens, et ce n'est pas une exception

Sur un **root**, `color` est la teinte de R7 : une valeur brute que le variant place — fond
pour `primary`, label pour `ghost`, bordure pour `tertiary` (§1 bis).

Sur un **slot texte**, `color` est le `color` de `TextStyle`. Les deux coïncident au lieu de
se contredire : §1 bis dit déjà que dans un composant texte il n'y a qu'une chose à teinter.

Le fond brut d'un root n'est donc pas `color` mais `backgroundColor`, qui dit ce qu'il fait.

### Ce que R7 devient

R7 ne disparaît pas, elle se précise. Il y a deux **vocabulaires**, et un seul est le
design system :

|                            | Rôle                                                           | Exemple                      |
| -------------------------- | -------------------------------------------------------------- | ---------------------------- |
| `variant`, `color`, `size` | Le vocabulaire sanctionné. Ce qu'on écrit d'habitude           | `variant="danger" size="lg"` |
| Props de style             | Des surcharges brutes, la même catégorie que `style`           | `backgroundColor="#111"`     |
| `style`                    | Le reste : transformations, ombres, tout ce qui est typé large | `style={{ transform: […] }}` |

Une revue qui voit `backgroundColor="#7c3aed"` là où `variant="primary"` suffisait signale
la même chose qu'avant : le design system est contourné. Ce qui change, c'est que le
contournement est court à écrire et lisible, au lieu d'être un objet.

### Où elles se résolvent

**Hors du cache**, dans la même seconde passe que la teinte (§3). C'est la condition pour
que R6 tienne : le cache reste indexé par un nombre fini de combinaisons de tokens, et il
ne grandit pas avec les valeurs que les appelants écrivent.

L'ordre complet, du plus général au plus spécifique :

```
base → paint → variants → compoundVariants → states → teinte → props de style → style du slot
```

`style` gagne en dernier, et reste l'échappatoire finale pour ce qui n'a pas de prop
lisible : `transform`, une ombre plateforme par plateforme, un objet calculé.

### Les props du composant l'emportent

`size` est une prop du `Button`, pas `width`. Quand un nom de prop de composant existe déjà,
c'est lui qui gagne, et le type l'exprime : la prop de style du même nom n'est pas exposée.
La liste par composant vit dans son `.type.ts`, donc un conflit est une erreur de
compilation et non une surprise à l'écran.

Deux cas valent d'être notés :

- **`height` bat la hauteur que `size` a choisie**, puisque les props de style se résolvent
  après la recette. C'est une échappatoire, pas le chemin normal : un contrôle dont on
  redresse la hauteur à la main est en général un contrôle dont la taille manque à
  l'échelle.
- **`width="100%"` remplace l'ancien `fullWidth`** (§1 bis), dit explicitement plutôt que
  par une prop dont le nom décrit le comportement par défaut.

### Où le code vit

`system/style-props/` — un résolveur partagé, pas une réimplémentation par composant. Il
est public au même titre que le reste de `system/` : un tiers qui écrit son composant XAUI
en a besoin pour offrir la même API.

Deux fonctions, l'une pure et testée, l'autre triviale :

```ts
// utils/, pur, testé : sépare les clés de style du reste, sans rien transformer
splitStyleProps(props) // { padding: 16, onPress } → [{ padding: 16 }, { onPress }]

// system/style-props/, React : la même chose, memoizée sur les valeurs
const [styleProps, rest] = useStyleProps(props)
```

Le root applique `styleProps` entre la teinte et son `style`, et forwarde `rest`.

### Ce que ça coûte

Deux choses, et aucune n'est gratuite :

- **Une allocation d'objet par rendu**, sur les composants dont l'appelant a écrit au moins
  une prop de style. Même arbitrage que `color`, et §9 bis doit gagner une ligne : la ligne
  de base reste vraie pour un composant sans prop de style, et une seconde la mesure avec.
- **Une surface de props large.** C'est le prix du choix, et il est assumé : le type dérive
  de `ViewStyle` au lieu d'être écrit à la main, donc il ne dérive pas dans le temps ; mais
  l'autocomplétion d'un composant montre désormais des dizaines d'entrées, et la
  documentation générée (§6) doit séparer les props du composant des props de style plutôt
  que de les lister ensemble.

---

## 3. Le moteur de style

### Le problème actuel

`useSizesStyles`, `useVariantSizesStyles`, `useTextStyles` renvoient chacun un **objet neuf**, jamais un ID `StyleSheet.create`. Et le `useMemo` du provider dépend de la prop `theme` **par référence** :

```tsx
// XAUIProvider — le memo est invalidé à chaque render du parent
const appTheme = React.useMemo(
  () => ({ ...defaultTheme, ...theme /* … */ }),
  [colorScheme, theme]
)
```

Un `<XAUIProvider theme={{ colors: {...} }}>` avec un objet littéral recrée le thème à chaque render, ce qui recrée tous les styles de tous les composants de l'app. **Bug de perf réel, corrigeable en une heure** — et prérequis de tout le reste.

### La correction

Le provider calcule un `themeId` stable (hash du thème résolu, recalculé seulement quand le contenu change) et le publie avec le thème. Le `themeId` devient la première composante de la clé de cache.

### `createRecipe`

```ts
// system/recipe.ts
export const buttonRecipe = createRecipe({
  slots: ['root', 'label', 'icon', 'spinner'],
  base: t => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: t.spacing.sm,
      overflow: 'hidden',
    },
    label: { fontWeight: '500', textAlign: 'center' },
  }),
  // `variant` nomme des tokens (§1 bis) — aucune logique de peinture ici.
  variantTokens: {
    primary: { bg: 'accent', fg: 'accentForeground' },
    secondary: { bg: 'default', fg: 'defaultForeground' },
    tertiary: { border: 'border', fg: 'foreground' },
    ghost: { fg: 'foreground' },
    success: { bg: 'success', fg: 'successForeground' },
    'success-soft': { bg: 'successSoft', fg: 'success' },
    warning: { bg: 'warning', fg: 'warningForeground' },
    'warning-soft': { bg: 'warningSoft', fg: 'warning' },
    danger: { bg: 'danger', fg: 'dangerForeground' },
    'danger-soft': { bg: 'dangerSoft', fg: 'danger' },
  },
  variants: {
    size: {
      xs: t => ({
        root: { paddingHorizontal: t.spacing.sm, minHeight: t.controlHeights.xs },
        label: { fontSize: t.fontSizes.xs },
      }),
      // sm, md, lg…
    },
  },
  states: {
    disabled: () => ({ root: { opacity: 0.5 }, label: { opacity: 0.7 } }),
    pressed: () => ({ root: { opacity: 0.9 } }),
  },
  defaultVariants: { variant: 'primary', size: 'md', radius: 'md' },
})
```

### Ordre de résolution — à figer maintenant

```
base → variants → compoundVariants → états (pressed/disabled/focused)
     → props du slot → style du slot          ← gagne toujours
```

### Le cache

```
clé = `${themeId}|${variant}|${size}|${radius}|${states}`
```

`Map<string, Record<Slot, RegisteredStyle>>` au niveau module. `StyleSheet.create` est appelé **une fois par combinaison rencontrée dans la vie de l'app**, et les slots reçoivent ensuite des références stables — donc `React.memo` fonctionne vraiment, et le press ne réalloue rien.

Ça ne marche que si toutes les valeurs de la clé sont des tokens finis (R6). Accepter `padding={13}` dans la clé ferait exploser la table.

### `color` est hors du cache

`color` accepte une valeur arbitraire (R7) et **ne rentre donc jamais dans la clé de cache**. Le recipe résout deux fois :

1. la passe **cachée**, depuis les tokens (`variant`, `size`, `radius`, états) → références `StyleSheet` stables ;
2. la passe **teinte**, uniquement si `color` est fourni : `deriveTint(color)` puis application au(x) slot(s) que le variant désigne.

```tsx
style={[cached.root, tint?.root, style]}
```

Une petite allocation, seulement quand la prop est passée. La table de cache reste bornée par le nombre de combinaisons de tokens, pas par le nombre de couleurs que les utilisateurs inventent.

`deriveTint` est lui-même mémoïsé par valeur de teinte — la conversion sRGB → OKLab et retour n'est pas gratuite à chaque render.

---

## 4. Le thème : deux couches, comme HeroUI

### 4.1 La découverte structurante

HeroUI n'écrit pas tous ses tokens. Il en écrit **une petite couche source**, et **dérive tout le reste** par calcul :

| Fichier                | Rôle                                                     | Volume       |
| ---------------------- | -------------------------------------------------------- | ------------ |
| `styles/variables.css` | tokens **sources**, écrits à la main, par mode           | ~25 par mode |
| `styles/theme.css`     | tokens **dérivés**, calculés en `color-mix(in oklab, …)` | ~30          |

```css
/* dérivé — personne n'écrit ces valeurs */
--color-accent-hover: color-mix(
  in oklab,
  var(--accent) 90%,
  var(--accent-foreground) 10%
);
--color-accent-soft: color-mix(in oklab, var(--accent) 15%, transparent);
--color-accent-soft-foreground: color-mix(
  in oklab,
  var(--accent) 80%,
  var(--foreground) 20%
);
--color-background-secondary: color-mix(
  in oklab,
  var(--background) 96%,
  var(--foreground) 4%
);
--radius-xl: calc(var(--radius) * 1.5);
```

**C'est le vrai avantage DX du système**, et je l'avais manqué : on surcharge `accent`, et `accentPressed`, `accentSoft`, `accentSoftForeground` suivent tout seuls. Avec la liste plate que je proposais avant, changer la couleur de marque demandait douze valeurs à la main.

**React Native n'a pas `color-mix()`.** La dérivation se fait donc en JS, au moment de la construction du thème. HeroUI fait déjà du calcul de couleur en JS avec son `colorKit` (`colorKit.setAlpha(...)` dans leur `Button.tsx`) — on fait pareil, en amont plutôt qu'en CSS.

### 4.2 La couche source — ce qu'on écrit, ce qu'on surcharge

Par mode. C'est **la seule surface de personnalisation**.

```ts
type XAUISourceColors = {
  // Base
  background: string
  foreground: string

  // Surface — composants non flottants : cartes, accordéons
  surface: string
  surfaceForeground: string
  surfaceSecondary: string
  surfaceSecondaryForeground: string
  surfaceTertiary: string
  surfaceTertiaryForeground: string

  // Overlay — composants flottants : dialogs, popovers, menus
  overlay: string
  overlayForeground: string
  backdrop: string

  muted: string

  // Neutre et marque
  default: string
  defaultForeground: string
  accent: string
  accentForeground: string

  // Champs de saisie
  fieldBackground: string
  fieldForeground: string
  fieldPlaceholder: string
  fieldBorder: string

  // Intentions
  success: string
  successForeground: string
  warning: string
  warningForeground: string
  danger: string
  dangerForeground: string

  // Segment — contrôles segmentés
  segment: string
  segmentForeground: string

  // Divers
  border: string
  separator: string
  focus: string
  link: string
}
```

Plus quelques primitives constantes entre les deux modes — `white`, `black`, `snow`, `eclipse` — reprises telles quelles.

### 4.3 La couche dérivée — calculée, jamais écrite

Une fonction `deriveColors(source)` applique les formules de HeroUI, transposées en JS :

```ts
// états de press (leurs `-hover`, renommés — voir §1 ter)
accentPressed  = mix(accent,  accentForeground,  0.10)
successPressed = mix(success, successForeground, 0.10)
warningPressed = mix(warning, warningForeground, 0.10)
dangerPressed  = mix(danger,  dangerForeground,  0.10)
defaultPressed = mix(default, defaultForeground, 0.04)
surfacePressed = mix(surface, surfaceForeground, 0.08)

// variantes douces
accentSoft            = alpha(accent, 0.15)
accentSoftForeground  = mix(accent, foreground, 0.20)
accentSoftPressed     = alpha(accent, 0.20)
dangerSoft            = alpha(danger, 0.15)
dangerSoftForeground  = mix(danger, foreground, 0.20)
warningSoftForeground = mix(warning, foreground, 0.35)   // ratio propre
successSoftForeground = mix(success, foreground, 0.30)   // ratio propre
defaultSoft           = alpha(default, 0.50)

// niveaux de fond
backgroundSecondary = mix(background, foreground, 0.04)
backgroundTertiary  = mix(background, foreground, 0.08)
backgroundInverse   = foreground

// niveaux de bordure et de séparateur
borderSecondary     = mix(surface, surfaceForeground, 0.22)
borderTertiary      = mix(surface, surfaceForeground, 0.34)
separatorSecondary  = mix(surface, surfaceForeground, 0.15)
separatorTertiary   = mix(surface, surfaceForeground, 0.19)

// champs
fieldPressed        = mix(fieldBackground, fieldForeground, 0.10)
fieldBorderPressed  = mix(fieldBorder, fieldForeground, 0.12)
fieldBorderFocus    = mix(fieldBorder, fieldForeground, 0.26)
```

Deux contraintes natives :

- **`mix` doit opérer en OKLab**, pas en sRGB, sinon les mélanges virent au gris. Une implémentation sRGB→OKLab→sRGB fait une quarantaine de lignes ; à mettre dans `utils/colors.ts` avec des tests de non-régression sur les valeurs.
- **Pas d'`oklch()` dans les valeurs finales.** Leurs sources sont en oklch ; RN ne le comprend pas. La génération convertit en hex, et `tokens.gen.ts` ne contient que du hex.

### 4.4 Le reste du thème

```ts
type XAUITheme = {
  mode: 'light' | 'dark'
  colors: XAUIColors // source + dérivé, aplati

  spacing: (n: number) => number // base 4 — spacing(3) === 12
  radius: XAUIRadius // dérivé d'une base unique
  borderWidth: { default: number; field: number }

  fontSizes: Record<FontSizeKey, number>
  lineHeights: Record<FontSizeKey, number>
  fontWeights: Record<FontWeightKey, TextStyle['fontWeight']>
  fontFamilies: { body: string; heading: string; mono: string }

  shadows: { surface: ViewStyle; overlay: ViewStyle; field: ViewStyle }
  opacity: { disabled: number }

  controlHeights: Record<Size, number>
}
```

**Le rayon découle d'une base unique.** Une valeur à changer pour redessiner toute la lib :

```ts
radius = {
  xs: r * 0.25,
  sm: r * 0.5,
  md: r * 0.75,
  lg: r,
  xl: r * 1.5,
  '2xl': r * 2,
  '3xl': r * 3,
  '4xl': r * 4,
  field: r * 1.75,
  full: 9999,
}
```

**Les ombres sont sémantiques, pas une échelle.** Trois rôles — `surface`, `overlay`, `field` — et non `sm | md | lg | xl`. Corollaire important : en mode sombre HeroUI **supprime** l'ombre de surface et remplace celle d'overlay par un liseré interne clair. Une échelle `sm→xl` ne peut pas exprimer ça ; trois rôles, si.

**`spacing` est une fonction, pas une table.** Base 4 px, comme Tailwind. `spacing(3) === 12`. Ça supprime la question « quel nom pour 12 px » et aligne les valeurs de leur CSS (`calc(var(--spacing) * 12)` = hauteur 48 du bouton `md`).

### 4.5 Configurer le thème — l'API

**`HeroUINativeProvider` n'a aucune prop de thème.** Son `config` ne contient que `textProps`, `textInputProps`, `toast`, `animation`, `devInfo`, `isRTL`. Le thème se configure entièrement en CSS, lu via `useCSSVariable` de **Uniwind**, leur moteur de classes. C'est ce que XAUI ne peut pas faire — et ne doit pas vouloir faire, c'est la prémisse du projet.

#### `createTheme` au niveau module

```ts
// app/theme.ts
import { createTheme } from '@xaui/native/theme'

export const appTheme = createTheme({
  colors: {
    light: { accent: '#3b82f6' },
    dark: { accent: '#60a5fa' },
  },
  radius: 8, // base — toute l'échelle en découle
  fontFamilies: { body: 'Inter', heading: 'Inter-SemiBold' },
  controlHeights: { md: 48 },
})
```

```tsx
// app/_layout.tsx
import { appTheme } from './theme'
;<XAUIProvider theme={appTheme}>
  <App />
</XAUIProvider>
```

**Ce n'est pas une préférence de style, c'est ce qui rend le bug de mémoïsation impossible.** Un `<XAUIProvider theme={{ … }}>` en objet littéral change d'identité à chaque render du parent, invalide le memo et reconstruit tous les styles de l'app — c'est exactement le bug du provider actuel (§3). Défini au niveau module, `appTheme` est stable par construction.

Deux bénéfices en plus : `createTheme` calcule le `themeId` une seule fois, à l'import — aucun hachage à l'exécution ; et il fusionne en profondeur sur le thème par défaut, donc on n'écrit que ce qu'on change.

Le provider accepte aussi un objet inline pour un prototype, mais la doc ne montre que `createTheme`.

#### Ce qu'on peut surcharger

**La couche source (§4.2)** est le chemin normal. On écrit `accent`, on reçoit `accentPressed`, `accentSoft`, `accentSoftForeground` gratuitement.

**Un token dérivé** peut être forcé individuellement, comme échappatoire — la formule est bonne en général, pas toujours pour une couleur de marque particulière :

```ts
createTheme({
  colors: {
    light: {
      accent: '#3b82f6',
      accentSoft: 'rgba(59,130,246,0.22)', // la dérivation à 15 % était trop pâle ici
    },
  },
})
```

L'ordre est : défaut → source de l'utilisateur → `deriveColors` → surcharges explicites de tokens dérivés. Les surcharges gagnent toujours, et le fait qu'elles arrivent **après** la dérivation est ce qui rend ce mélange sûr.

#### Le mode clair / sombre

```tsx
<XAUIProvider theme={appTheme} />                     // 'system' par défaut
<XAUIProvider theme={appTheme} colorMode="dark" />    // forcé
```

`colorMode` est **contrôlé** : la lib ne possède ni l'état ni sa persistance. Pas de dépendance à un stockage, pas de préférence cachée quelque part — une app qui veut un sélecteur tient son état et le passe. `useColorMode()` rend le mode résolu (`'light' | 'dark'`), jamais `'system'`.

#### Lire le thème

```ts
const theme = useXAUITheme() // l'objet complet, résolu
const accent = useThemeColor('accent') // un token
const [bg, fg] = useThemeColor(['background', 'foreground'])
```

`useThemeColor` reprend la signature de HeroUI, y compris la surcharge tableau. C'est ce dont un utilisateur a besoin pour colorer une icône tierce ou un composant maison.

#### Plusieurs thèmes

Autant de `createTheme` que voulu, échangés par la prop. Un `themeId` différent invalide les clés de cache, les styles se reconstruisent une fois, puis tout est de nouveau en cache.

#### Ce qui n'est pas dans le thème

Une couleur ponctuelle sur un composant n'est **pas** une surcharge de thème : c'est la prop `color` (§1 bis) ou `style`. Le thème décrit le système ; il ne sert pas à contourner un cas isolé.

### 4.6 Génération

```
tooling/tokens/source.ts     →  packages/native/src/theme/tokens.gen.ts   (nombres, hex)
                             →  packages/hybrid/src/theme/tokens.gen.ts   (em, via toEm)
```

`generate.ts` écrit **les deux couches déjà résolues** pour les thèmes par défaut clair et sombre — aucun calcul de couleur au démarrage de l'app. `deriveColors` n'est exécuté à l'exécution que si l'utilisateur surcharge la couche source.

`generate.ts` applique aussi la convention `em` de hybrid (documentée dans CLAUDE.md) et éclate les shorthands RN (`paddingVertical` → `paddingTop`/`paddingBottom`) côté web.

**Trois garde-fous CI :**

1. `pnpm tokens:check` régénère et compare — un diff fait échouer le build.
2. Les clés de `light` et `dark` doivent être identiques — un token présent d'un seul côté est une erreur de build, pas un `undefined` en production.
3. Les couples `X` / `XForeground` doivent atteindre un contraste minimum dans les deux modes. C'est le test qui rattrape une surcharge de marque mal choisie.

## 5. Le primitif `Icon`

Le problème que HeroUI n'a pas résolu : une icône est un composant tiers, le contexte de slot ne l'atteint pas, donc l'utilisateur doit calculer la couleur à la main.

```tsx
// L'icône reçoit couleur et taille du contexte du Button — rien à calculer
<Button variant="danger">
  <Button.Icon as={TrashIcon} />
  <Button.Label>Supprimer</Button.Label>
</Button>

// Override local si besoin
<Button.Icon as={TrashIcon} color="warning" size="sm" />
```

`Icon` accepte trois formes : `as={Component}` (props `size`/`color` injectées — couvre Lucide, Ionicons, vector-icons), `children` SVG brut (`react-native-svg`, props clonées), ou `source` image. `react-native-svg` reste une peerDependency **optionnelle**.

---

## 6. La documentation

`apps/docs` a déjà `react-native-web` en dépendance et un dossier `components/preview` — le socle est là.

**Alias Next.js** `react-native` → `react-native-web` : les vrais composants s'affichent en live et éditables dans la doc. Contrainte à respecter dans le code : pas d'API RN-only dans le chemin de rendu (Reanimated et `react-native-svg` ont tous deux un support web).

### Une page par composant, structure fixe

1. **Aperçu** — preview live + code
2. **Anatomie** — l'arbre des slots, explicitement
3. **Usage** — basique, puis composé
4. **Props** du root — **table générée depuis les types TS** (`ts-morph` ou `react-docgen-typescript`)
5. **Slots** — une table de props par slot
6. **Variantes** — les dix valeurs de `variant` × les tailles, rendues
7. **Accessibilité** — rôles, labels, ordre de focus
8. **Migration depuis legacy** — table avant/après

Les tables générées depuis les types sont ce qui empêche la doc de mentir. Tout ce qui peut dériver doit être généré.

### Ce qui remplace `@xaui/mcp`

La même source alimente `llms.txt` (route déjà présente). Un fichier de doc à maintenir au lieu de trois.

---

## 7. Legacy : un package npm séparé

### La décision

L'ancien tree ne devient **pas** un sous-chemin de `@xaui/native`. Il est republié tel quel sous un **nouveau nom npm** :

| Package               | Contenu                          | Version                                                                                                                                                                                 |
| --------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@xaui/native-legacy` | les 47 composants actuels, figés | `0.2.11` — le dernier numéro que le package a réellement porté avant sa publication (le `0.2.8` visé à l'origine a été dépassé par les trois patchs de P0 : core-shim, icônes inlinées) |
| `@xaui/native`        | l'API v1, repart de zéro         | `1.0.0`                                                                                                                                                                                 |
| `@xaui/hybrid`        | gelé pendant P0–P4               | `0.9.x-alpha.x` — thème seulement, publié sur le tag `alpha` ; `latest` reste sur `0.0.14`                                                                                              |

C'est plus propre que le sous-chemin sur trois points concrets :

- **La config tsup du nouveau package démarre à 15 entrées, pas 62.** Dans le modèle sous-chemin, `@xaui/native` embarquait les deux trees et déclarait 47 entrées legacy plus les entrées v1.
- **La config tsup de legacy, c'est le fichier actuel, inchangé.** Rien à préfixer, rien à réécrire.
- **Les deux lignes de version se séparent.** Un correctif dans un composant legacy ne bouge plus le numéro du package neuf, et `1.0.0` sur `@xaui/native` dit exactement ce qu'il s'est passé après `0.2.8`.

### La condition — non négociable

**Il ne doit exister qu'un seul `XAUIProvider` chargé à l'exécution.** Deux copies du provider, c'est deux contextes React distincts : un `Button` legacy placé sous le provider v1 lèverait « must be used within XAUIProvider », et la migration écran par écran disparaîtrait.

Donc `@xaui/native-legacy` **ne contient aucun code de thème** et déclare `@xaui/native` en peer dependency :

```jsonc
// packages/native-legacy/package.json
{
  "name": "@xaui/native-legacy",
  "peerDependencies": {
    "@xaui/native": ">=1.0.0",
    "react": "…",
    "react-native": "…",
  },
}
```

Son `core-shim.ts` importe les tokens plats depuis `@xaui/native/theme` et **reconstruit la forme MD3** (`{ main, onMain, container, onContainer }`) que les 47 composants attendent — ainsi aucun fichier legacy n'est modifié.

Corollaire à vérifier au moment du `pnpm pack` : `@xaui/native` ne doit apparaître qu'une fois dans l'arbre de résolution. Un doublon de version donnerait deux modules, donc deux contextes, donc le bug qu'on vient d'éviter.

### La tension avec « deux packages seulement »

Ça en fait trois pendant la transition. C'est assumé : `@xaui/native-legacy` n'est pas un package du système, c'est un artefact de migration avec une date de péremption. Il n'apparaît pas dans la doc en dehors de la page de migration, et il est déprécié sur npm le jour où le tree v1 couvre les 47 composants.

### Mise en place

```bash
git mv packages/native packages/native-legacy
mkdir -p packages/native/src           # le nouveau, vide
```

Le nouveau `packages/native` se construit à partir de là, selon l'arborescence du §2. `native-legacy` garde son `src/` intact ; seuls changent son `name`, ses peer deps, et l'ajout du `core-shim.ts`.

### Règles

- **Legacy est figé.** Correctifs de bugs uniquement. Aucun nouveau composant, aucune nouvelle prop.
- Ses tests sont conservés tels quels — ils protègent la migration.
- Chaque composant dont l'équivalent v1 existe reçoit un `@deprecated` pointant vers le remplacement.
- `npm deprecate @xaui/native-legacy` le jour de la parité, suppression du dossier ensuite.

### Migration côté utilisateur

Une dépendance à ajouter, puis un changement de scope dans les imports :

```diff
+ pnpm add @xaui/native-legacy

- import { Button } from '@xaui/native/button'
+ import { Button } from '@xaui/native-legacy/button'
```

Un codemod (`pnpm xaui-codemod legacy-imports`) le fait sur tout un projet. Avec la base d'utilisateurs actuelle, c'est très largement suffisant.

### Correspondance legacy → v1

La transformation est déterministe, donc entièrement automatisable :

```
variant="solid"    + themeColor="primary"   → variant="primary"
variant="flat"     + themeColor="primary"   → variant="secondary"
variant="bordered" + themeColor="primary"   → variant="tertiary"
variant="light"    + themeColor="primary"   → variant="ghost"
variant="faded"    + themeColor="primary"   → variant="secondary"  (+ bordure via style)

variant="solid"    + themeColor="danger"    → variant="danger"
variant="flat"     + themeColor="danger"    → variant="danger-soft"
… idem success, warning

themeColor="secondary" | "tertiary"         → supprimé (c'étaient des niveaux, pas des couleurs)
themeColor="default"                        → variant="secondary"

customAppearance={{ text: s }}              → <X.Label style={s}>
customAppearance={{ container: s }}         → style={s}
startContent={<I/>} / endContent={<I/>}     → <X.Icon/> placé dans l'ordre voulu
```

`Container.color` et `Typography.color` gardent leur sens actuel : sous le modèle « `color` = la teinte », un conteneur ne peut teinter que son fond et un texte que son tracé. Rien à renommer.

### Versions

| Package               | Version         | Contenu                                                                                                                                                                                            |
| --------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@xaui/native-legacy` | `0.2.11`        | publié une fois, figé — et figé pour de bon : le package est dans `ignore` (`.changeset/config.json`), donc changesets ne le versionne plus. Un correctif `0.2.x` demande de le sortir de la liste |
| `@xaui/native`        | `0.9.x-alpha.x` | le noyau arrive composant par composant, API instable et annoncée comme telle                                                                                                                      |
| `@xaui/native`        | `1.0.0`         | noyau de 15 composants + doc complète                                                                                                                                                              |
| `@xaui/native`        | `1.x`           | les 32 composants restants                                                                                                                                                                         |
| `@xaui/native`        | `2.0.0`         | plus rien à voir avec legacy — `native-legacy` est déprécié bien avant                                                                                                                             |

Les préversions `0.9.x-alpha` remplacent les `0.4.x – 0.9.x` du modèle précédent : comme `@xaui/native` repart de zéro, publier des mineures qui ne contiennent que deux ou trois composants donnerait un package inutilisable sous un numéro qui promet le contraire. Un tag `alpha` dit la vérité.

Concrètement, le dépôt est en **pre mode changesets** (`.changeset/pre.json`, tag `alpha`) : `changeset publish` pousse `native` et `hybrid` sous le dist-tag `alpha`, et `latest` reste sur les dernières releases qui portent réellement des composants — `@xaui/native@0.2.8` et `@xaui/hybrid@0.0.14`. Un `npm i @xaui/native` continue donc de renvoyer `0.2.8` ; l'opt-in est `@xaui/native@alpha`. Trois conséquences à garder en tête :

- **Le pre mode est global au dépôt, et il contamine les dépendants.** Il n'y a même pas besoin d'un changeset sur `@xaui/native-legacy` : comme il déclare `@xaui/native` en peer dep, la release `0.9.1-alpha.0` l'a bumpé en `0.2.12-alpha.0` au passage. C'est pour ça que legacy est dans `ignore` (`.changeset/config.json`) — sinon chaque alpha de `native` lui collerait un numéro d'alpha alors qu'il est figé. `demo` et `docs` y sont aussi, parce que changesets exige que tout dépendant d'un package ignoré le soit également.
- **Le tag d'un premier publish ne se négocie pas en pre mode.** `getReleaseTag` (`@changesets/cli`) donne le tag pre à tout package dont `publishedState !== "only-pre"`, ce qui inclut `"never"` : un package jamais publié sort donc taggé `alpha`, sans tag `latest` du tout. Et il n'y a pas d'échappatoire propre — `changeset publish --tag` est refusé en pre mode, et `changeset pre exit` ne suffit pas (le `preState` est passé au publish quel que soit son mode ; seul le `changeset version` suivant supprime `pre.json`, en graduant `native` et `hybrid` sur `latest` au passage). La sortie de secours est en aval : publier sous `alpha`, puis `npm dist-tag add <pkg>@<version> latest`. C'est ce qui a été fait pour `@xaui/native-legacy@0.2.11`.
- **`changeset pre exit` avant `1.0.0`**, sinon la version stable n'atteindrait jamais le tag `latest`.

---

## 8. Anatomie de référence — `Button`

C'est le patron que les 46 autres suivent. À écrire en premier, à relire à deux fois, puis à copier.

```
components/button/
├── button.recipe.ts     # variantes, source de vérité du style
├── button.context.ts    # valeurs RÉSOLUES publiées aux slots
├── button.type.ts
├── button.tsx           # root : Pressable + layout + auto-wrap
├── button-label.tsx
├── button-icon.tsx
├── button-spinner.tsx
└── index.ts
```

### Le root

```tsx
export const ButtonRoot = forwardRef<View, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    radius = 'md',
    isDisabled = false,
    isLoading = false,
    isIconOnly = false,
    asChild = false,
    color,
    style,
    ...pressableProps
  },
  ref
) {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  const styles = buttonRecipe.resolve(theme, {
    variant,
    size,
    radius,
    states: { disabled: isDisabled || isLoading, pressed: isPressed },
    tint: color, // hors cache — voir §3
  })

  // R3 — stringification récursive, pas une inspection du premier enfant
  const text = childrenToString(children)

  const context = useMemo(
    () => ({
      labelStyle: styles.label,
      iconStyle: styles.icon,
      size,
      isDisabled,
      isLoading,
    }),
    [styles.label, styles.icon, size, isDisabled, isLoading]
  )

  return (
    <ButtonContext.Provider value={context}>
      <Pressable
        ref={ref}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
        disabled={isDisabled || isLoading}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={[styles.root, styles.tint?.root, isIconOnly && sheet.iconOnly, style]}
        {...pressableProps}
      >
        {text !== null ? <ButtonLabel>{text}</ButtonLabel> : children}
      </Pressable>
    </ButtonContext.Provider>
  )
})

export const Button = Object.assign(ButtonRoot, {
  Label: ButtonLabel,
  Icon: ButtonIcon,
  Spinner: ButtonSpinner,
})
```

Quatre choses à noter :

- **`childrenToString`** (dans `system/slot/`) implémente R3 une seule fois pour toute la lib.
- **Le contexte porte `styles.label`**, un ID `StyleSheet` stable — pas des tokens à re-résoudre.
- **La profondeur passe de 4 vues à 1.** L'actuel empile `View > Pressable > Animated.View > View > Text` ; le nouveau est `Pressable > (Text | Icon)`.
- **`accessibilityRole` et `accessibilityState` sont sur le root**, pas optionnels.

### Un slot

```tsx
export const ButtonLabel = forwardRef<Text, ButtonLabelProps>(function ButtonLabel(
  { children, style, ...rest },
  ref
) {
  const ctx = useButtonContext('Button.Label') // throw explicite si hors Button
  return (
    <Text ref={ref} style={[ctx.labelStyle, style]} {...rest}>
      {children}
    </Text>
  )
})
```

### La question du spinner

`isLoading` affiche-t-il le spinner automatiquement, ou faut-il `<Button.Spinner />` ?

**Décision : automatique.** Si `isLoading` et qu'aucun `Button.Spinner` n'est présent, le root en insère un en tête. Le scan des children est le coût — mais le refuser rendrait `<Button isLoading>Envoi…</Button>` impossible, ce qui est le cas d'usage majoritaire. La règle « ce que je compose est ce que je vois » cède ici, et seulement ici, et c'est documenté.

---

## 9. Phasage

### Comment lire une tâche

Chaque ligne est un **résultat vérifiable**, pas une intention. Le critère qui suit `→` est ce qui autorise à cocher. La **première ligne de chaque phase débloque les autres** : elle se fait en premier, le reste peut s'ordonner librement.

---

### P0 — Socle (~1 semaine) · **breaking**

Renommer le package npm casse par définition. La phase se termine par une publication, pas par un déploiement silencieux.

1. **Séparer les deux packages.** `git mv packages/native packages/native-legacy`, `name` → `@xaui/native-legacy`, `@xaui/native` déclaré en peer dep, `packages/native/src` créé vide.
   → `pnpm build` passe sur les deux, `native-legacy/dist` est identique à l'ancien `native/dist`.
2. **Source unique des tokens.** `tooling/tokens/source.ts` + `generate.ts` + job CI `tokens:check`.
   → Régénérer ne produit aucun diff ; les clés de `light` et `dark` sont identiques.
3. **Moteur de couleurs.** `utils/colors.ts` — `mix`, `alpha`, `contrastOn`, `contrastRatio` en OKLab.
   → Tests de valeurs figées : `mix('#dc2626','#18181b',.20) === '#b22b28'`.
4. **Couche dérivée.** `theme/derive-colors.ts` — les 32 formules du §4.3.
   → Les 128 valeurs correspondent à la référence publiée.
5. **Garde-fou de contraste.** Job CI sur chaque couple `X` / `XForeground`, deux modes.
   → 24 couples au-dessus de 4.5 ; abaisser `accent` à `purple-500` fait échouer le build.
6. **API de configuration.** `theme/create-theme.ts` — fusion profonde, dérivation, `themeId` à l'import.
   → Deux appels avec le même objet rendent le même `themeId` ; un `accent` changé le change.
7. **Provider.** `provider/xaui-provider.tsx` — `colorMode` contrôlée, `PortalHost`, plus de memo sur identité de prop.
   → Un parent qui re-render 100 fois ne recalcule le thème aucune fois.
8. **Shim legacy.** `native-legacy/core-shim.ts` — reconstruction MD3 depuis les tokens plats.
   → Un `Button` legacy rendu sous `XAUIProvider` s'affiche sans erreur de contexte.
9. **Hygiène du package.** `peerDependenciesMeta.optional` sur gesture-handler / svg / safe-area, zéro dépendance runtime.
   → `npm i @xaui/native` sur un projet nu n'émet aucun warning de peer manquante.
10. **Règle ESLint R13.** `left`, `right`, `paddingLeft`… interdits dans `packages/native/src`.
    → La règle est active et `pnpm lint` passe.
11. **Publier `@xaui/native-legacy@0.2.11`** + le codemod `legacy-imports`.
    → Un projet témoin migre ses imports et compile.

> **Deux tâches ont disparu de cette liste** : « `forwardRef` sur tous les roots » et « `style`/`testID`/a11y sur tous les roots ». Elles visaient les 47 composants quand legacy et v1 partageaient un tree. Legacy est maintenant figé et déprécié — les rétrofiter serait du travail mort. Pour la v1, ce ne sont pas des tâches mais les règles R9 et R12, appliquées à l'écriture de chaque composant.

---

### P1 — Système (~1 semaine)

1. **Le moteur.** `system/recipe/` — `createRecipe`, `variant-map`, `style-cache`, `resolve-tint`.
   → Deux résolutions des mêmes tokens rendent la **même référence** d'objet ; une teinte `color` différente n'ajoute aucune entrée au cache.
2. **Les slots.** `system/slot/` — `createSlotContext` strict, `childrenToString`, `mergeProps`, `mergeRefs`.
   → `childrenToString([3,' items'])` rend `'3 items'` ; avec un élément dedans, `null`. Un hook hors parent lève une erreur nommée.
3. **Le retour au toucher.** `system/pressable-feedback/` — `Highlight`, `Ripple`, `feedbackVariant`, prop `animation`.
   → Les quatre valeurs de `feedbackVariant` rendent ; `animation={false}` ne monte aucun worklet.
4. **Portal.** `system/portal/` — déplacé tel quel depuis `core/portal/`.
   → Les tests existants passent sans modification.
5. **Icône.** `system/icon/` — `as`, children SVG, `source` ; taille et couleur héritées du contexte de slot.
   → Une icône Lucide et un SVG brut prennent tous deux la couleur du variant parent sans prop explicite.
6. **Hooks partagés.** `useControllableState`, `usePressState`, `useMergedRef`.
   → `useControllableState` couvre les deux modes et le passage de l'un à l'autre en dev — vérifié sur un écran de démo, pas par un test : un hook n'est pas testé unitairement ici.
7. **Contrôle d'unicité.** `pnpm pack` sur les deux packages.
   → `@xaui/native` n'apparaît qu'une fois dans l'arbre de résolution — un doublon donnerait deux contextes.

_Rien n'est publié en P1 : un package d'UI sans aucun composant n'a pas de sens sur npm._

---

### La boucle par composant

Identique pour P2, P3 et P5. C'est **la** tâche répétée 47 fois ; l'écrire une fois évite de la paraphraser à chaque ligne.

1. `.recipe.ts` — les variantes nomment des tokens, **aucune valeur en dur**
2. `.context.ts` + le hook `useX` exporté (R10)
3. root en `forwardRef`, avec `asChild`, a11y, `style` en forme fonction, `displayName` namespacé (R9, R11, R12)
4. un fichier par slot, sans marge propre (R4)
5. test en miroir : slots, hook hors parent, `asChild`, **stabilité des références de style**
6. écran dans `apps/demo`
7. page de doc selon la structure du §6

**Fait quand** : `pnpm lint && pnpm type-check && pnpm test` passent, l'écran de démo rend correctement en clair et en sombre, et l'équivalent legacy porte un `@deprecated` pointant vers le remplacement.

---

### P2 — Le `Button` de référence (~1 semaine)

1. **Le composant**, selon la boucle ci-dessus et l'anatomie du §8.
   → Profondeur de vue réduite à `Pressable > (Text | Icon)` ; l'enveloppe `<View>` a disparu.
2. **La mesure de référence.** Liste de 200 boutons : re-renders et allocations de style.
   → Un chiffre écrit dans le plan. C'est le seuil que les 46 autres devront tenir, et la seule preuve que le cache fait ce qu'on prétend. **Mesuré — voir §9 bis.**
3. **Revue d'API — bloquante.**
   → Corriger le pattern ici coûte 1 ; après le noyau, 15. Rien ne démarre en P3 avant cette revue. **Faite — `P2-API-REVIEW.md` : neuf constats, six corrigés, trois datés. Verdict : le pattern tient, P3 peut démarrer.**
4. **Publier `@xaui/native` sur le tag `alpha`** (la ligne `0.9.x-alpha.x` est déjà ouverte, cf. §Versions).
   → La démo consomme le package publié, pas le workspace. **Le dépôt est prêt — voir §9 ter.**

---

### 9 bis. La ligne de base — mesurée sur le `Button`

`pnpm perf:button` (`tooling/perf/`). Deux cents boutons, dix variantes × quatre tailles,
soit **quarante combinaisons de tokens distinctes**. Chaque nombre est une borne haute :
c'est le seuil que les 46 composants suivants doivent tenir.

| Mesure                                                    | Chiffre                                | Ce qu'il prouve                                                                    |
| --------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| `StyleSheet.create` au montage de 200 boutons             | **40**                                 | Une allocation par combinaison, pas par bouton — le cache tient sa promesse        |
| `StyleSheet.create` au second montage de la même liste    | **0**                                  | Le cache vit le temps de l'app, pas celui de l'arbre                               |
| `StyleSheet.create` au premier appui sur une combinaison  | **1**                                  | L'état pressé est une combinaison de plus, pas un recalcul                         |
| `StyleSheet.create` aux appuis suivants                   | **0**                                  | Un appui n'alloue rien                                                             |
| `StyleSheet.create` avec un `color` brut, puis un second  | **0** et **0**                         | La table grandit avec les tokens, jamais avec les couleurs inventées (R7)          |
| Composants hôtes re-rendus quand **un** bouton est pressé | **2** (sur 400)                        | L'état de press appartient au root qui le porte ; la liste au-dessus n'entend rien |
| Composants hôtes au montage                               | **400** = 200 × (`Pressable` + `Text`) | Profondeur de vue de 1 : aucune `View` intermédiaire (§8)                          |

Les deux chiffres qui comptent en une phrase : **200 boutons coûtent 40 feuilles de style,
et un appui en coûte 0**.

La mesure tourne avec `animation={false}`, qui emprunte la branche statique — aucun hook
Reanimated n'est atteint, ce que le fichier vérifie plutôt que de le supposer.

---

### 9 ter. P2.4 — ce que la publication demande, et ce qui reste après

**La publication n'est pas une commande locale.** Merger vers `main` ouvre ou met à jour la
PR « Version Packages » ; merger celle-là publie. `changeset version`, `version-packages` et
`release` ne se lancent jamais à la main (§Release).

Les changesets de P2 sont posés : le `Button`, le correctif `asChild`, et les correctifs de
la revue d'API. En pre mode `alpha`, ils donnent `@xaui/native@0.9.2-alpha.0` sur le
dist-tag `alpha`. `latest` ne bouge pas.

**La barrière avant la publication.** `pnpm pack:check` répond maintenant à deux questions
sur le tarball plutôt qu'une :

1. `@xaui/native` ne se résout qu'une fois — un doublon donnerait deux contextes de thème
   (P1.7, §10).
2. **Chaque sous-chemin d'`exports` pointe sur un fichier que le tarball contient
   réellement.** C'est ce qui attrape un composant déclaré dans `package.json` et oublié
   dans `tsup.config.ts` — P3 aura quarante-six occasions de le faire — et c'est la classe
   de défaut qui a fait pointer `require` sur un fichier ESM sur _chaque_ sous-chemin des
   trois packages (revue d'API, point 1). Le job CI construit désormais avant de packer,
   sans quoi la question n'a pas de sens.

**Ce qui reste, une fois la version sur npm** — dans cet ordre, et pas avant :

1. `apps/demo` passe de `workspace:*` à `@xaui/native@alpha`. C'est le critère d'acceptation
   de P2.4 : la démo doit consommer ce que les gens installent, pas l'arbre de travail.
   **Attention au risque du §10** : `@xaui/native-legacy` déclare `@xaui/native` en peer, et
   la démo dépend des deux. Un range qui ne se résout pas sur la même version mettrait deux
   copies dans l'arbre, donc deux contextes de thème. `pnpm pack:check` vérifie le range ;
   c'est lui qui doit rester vert.
2. Rien d'autre. `@xaui/native` a déjà un `latest` (`0.2.8`), donc le piège du premier
   publish en pre mode décrit au §Release ne s'applique pas ici.

---

### P3 — Le noyau (~4 semaines)

**Quinze entrées**, le lot `view/` comptant pour une. Dans cet ordre, parce que chacune s'appuie sur les précédentes :

| #   | Entrée                    | Slots                                        | Note                                                                             |
| --- | ------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| 1   | `Typography` + `TextSpan` | —                                            | Fixer les valeurs de l'échelle en rôles (§1 bis) ; `TextSpanContext` existe déjà |
| 2   | `Icon`                    | —                                            | Sortie de `system/`, exposé publiquement                                         |
| 3   | `view/`                   | —                                            | `Row`, `Column`, `Container`, `Padding`, `Center`, `Spacer`, `Stack`… un lot     |
| 4   | `Card`                    | Header · Body · Title · Description · Footer | Les clés existent dans `CardCustomAppearance`, conversion mécanique              |
| 5   | `Chip`                    | Label · Dot · Avatar · Close                 |                                                                                  |
| 6   | `Alert`                   | Icon · Title · Description · Close           |                                                                                  |
| 7   | `Input`                   | Label · Field · Description · Error          | Premier usage réel des tokens `field*`                                           |
| 8   | `Checkbox`                | Indicator · Label                            |                                                                                  |
| 9   | `Radio`                   | Indicator · Label                            |                                                                                  |
| 10  | `Switch`                  | Thumb · Track                                |                                                                                  |
| 11  | `Avatar`                  | Image · Fallback                             |                                                                                  |
| 12  | `Badge`                   | —                                            | plat                                                                             |
| 13  | `Divider`                 | —                                            | plat                                                                             |
| 14  | `Skeleton`                | —                                            | plat                                                                             |
| 15  | `Spinner`                 | —                                            | plat ; dépendance de `Button.Spinner`, à sortir de `Indicator`                   |

> `Alert` utilise `style` / `titleStyle` / `descriptionStyle` là où `Button` et `Card` utilisent `customAppearance`. **Deux conventions d'échappatoire coexistent déjà** dans la lib ; la v1 les remplace toutes les deux par des slots.

---

### P4 — Doc et 1.0 (~1 semaine)

1. **Previews live.** Alias `react-native` → `react-native-web` dans Next.js.
   → Les 15 composants rendent dans la doc, en clair et en sombre.
2. **Tables de props générées** depuis les types TS.
   → Ajouter une prop met la table à jour sans édition manuelle.
3. **Les 15 pages** selon la structure du §6.
4. **Guide de migration** legacy → v1, avec la table de correspondance du §7.
5. **Régénérer `llms.txt`**, dépublier `@xaui/mcp` et `@xaui/icons`.
6. **Publier `@xaui/native@1.0.0`.**

---

### P5 — Les 32 restants (au fil de l'eau, sous `1.x`)

Même boucle par composant. Commencer par les dix qui ont déjà un contexte de groupe — `Select`, `Stepper`, `Toolbar`, `List`, `Menu`, `SegmentButton`, `Autocomplete`, `ExpansionPanel`, `BottomTabBar`, `Menubox` : pour eux c'est une couche de slots posée sur un contexte existant, le coût est faible.

**Jalon de parité** : quand les 47 sont là, `npm deprecate @xaui/native-legacy "migré vers @xaui/native v1 — voir le guide de migration"`.

---

### P6 — Hybrid (après la 1.0)

`@xaui/hybrid` est **gelé de P0 à P4** : aucun nouveau composant, aucun changement d'API. Sinon chaque décision se paie deux fois avant d'être stabilisée.

Il reprend ensuite avec la même arborescence, les mêmes noms de fichiers et les mêmes tests. Seuls `.style.ts` et le renderer diffèrent — `createRecipe` est repris tel quel, c'est de la résolution pure et le renderer n'intervient qu'au bout.

---

### P7 — v2

Suppression du dossier `packages/native-legacy` et de son entrée dans le workspace. Pas avant le jalon de parité de P5.

---

## 10. Risques

| Risque                                                                  | Parade                                                                   |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Le pattern est mauvais et se réplique 47 fois                           | Revue d'API bloquante en fin de P2, avant tout autre composant           |
| `react-native-web` ne rend pas certains composants                      | Fallback vidéo par composant ; ne pas bloquer la doc entière dessus      |
| Legacy et v1 divergent sur le thème                                     | Un seul provider, hors des deux trees. Non négociable                    |
| Les tokens divergent entre native et hybrid                             | Job CI `tokens:check` dès P0                                             |
| Deux copies d'`@xaui/native` dans l'arbre npm → deux contextes de thème | Peer dependency stricte côté legacy, contrôle au `pnpm pack` dès P1 (§7) |
| Le périmètre glisse et la 1.0 n'arrive jamais                           | Le noyau est **quinze** composants. Tout le reste attend `1.x`           |

---

## 11. La première session de code

L'ordre de P0 n'est pas indicatif : le `git mv` vient en premier, sinon tout le reste s'écrit dans un dossier qui va bouger.

1. `git mv packages/native packages/native-legacy` — renommage npm, peer dep, `packages/native/src` vide
2. `tooling/tokens/source.ts` + `generate.ts` — tout le reste en dépend
3. `utils/colors.ts` (OKLab) puis `theme/derive-colors.ts` — avec les tests de valeurs figées
4. `theme/create-theme.ts` puis `provider/xaui-provider.tsx`
5. `native-legacy/core-shim.ts` — premier point de vérification réel : un `Button` legacy doit rendre sous le nouveau provider

Fin de la première session. `@xaui/native-legacy@0.2.11` peut être publié ici ; `@xaui/native` attend d'avoir un composant, en P2.
