# P2.3 — Revue d'API bloquante

> _« Corriger le pattern ici coûte 1 ; après le noyau, 15. Rien ne démarre en P3 avant
> cette revue. »_ — plan §9, P2.3

La revue porte sur le `Button` (P2.1) **et sur tout ce qu'il a été le premier à exercer** :
le moteur de recettes, les slots, `PressableFeedback`, `Icon`, les hooks partagés, le
packaging. C'est le seul moment où une correction coûte un composant plutôt que quinze.

**Verdict : le pattern tient.** Les treize règles sont applicables telles quelles, la boucle
par composant du §9 se suit sans friction, et les chiffres du §9 bis confirment que le cache
fait ce qu'on lui prête. Dix constats en sont sortis : **six corrigés ici**, quatre
enregistrés avec leur remède et leur échéance — dont un défaut encore ouvert, le ripple,
qui ne bloque aucun composant du noyau.

---

## Ce qui est corrigé

### 1. `require()` échouait sur les quatre sous-chemins — **bloquant**

`exports.require` pointait sur le build **ESM** (`./dist/index.js`) alors que le build CJS
(`index.cjs`) était produit et jamais référencé. Le package déclarant `"type": "module"`,
tout `require('@xaui/native')` levait une `SyntaxError`.

Portée : les trois packages publiés, sur **chaque** sous-chemin. Un consommateur Jest en
CJS, un script Node, une résolution Metro en CJS — aucun ne pouvait charger la librairie.

**Corrigé** sur `@xaui/native` et `@xaui/hybrid`, en forme duale complète : les types sont
déclarés **par condition** (`.d.ts` sous `import`, `.d.cts` sous `require`), sans quoi un
consommateur CJS type-check contre les déclarations ESM.

```json
"./button": {
  "import":  { "types": "./dist/components/button/index.d.ts",  "default": "./dist/components/button/index.js" },
  "require": { "types": "./dist/components/button/index.d.cts", "default": "./dist/components/button/index.cjs" }
}
```

> `@xaui/native-legacy` porte le même défaut sur ses 48 entrées et **n'est pas corrigé
> ici** : il est figé à `0.2.11` et listé dans `ignore` (`.changeset/config.json`), donc
> le corriger demande de l'en sortir le temps d'une release. Voir « Enregistré », point A.

### 2. Le package entier levait au premier rendu — **bloquant**

esbuild émettait `React.createElement` en runtime JSX classique, contre un binding que les
sources n'importent jamais. `"jsx": "react-native"` du `tsconfig` ne se transmet pas — esbuild
le lit comme le runtime classique. **Aucun composant v1 publié n'aurait rendu.**

Corrigé en P2.1 (`esbuildOptions` → `jsx: 'automatic'`). Mentionné ici parce que c'est le
genre de défaut qu'aucune revue de code ne trouve : il n'existe que dans l'artefact publié.

### 3. `asChild` sur `PressableFeedback` fusionnait dans le provider — **bloquant (R12)**

Un `Slot` fusionne ses props dans son enfant unique, et cet enfant était le provider de
contexte. La ref, le style, les handlers et `disabled` atterrissaient donc sur un provider
qui les ignore : l'élément du composeur cessait de réagir au toucher, sans erreur.

R12 est irrattrapable après la 1.0. Corrigé dans #180, avant le `Button`.

### 4. Les overlays débordaient des coins arrondis

`Highlight` et `Ripple` sont des remplissages absolus à coins droits. Sur un contrôle
arrondi — c'est-à-dire **tous** — le lavis peignait hors de la surface aux quatre coins. Le
clip n'existait que pour `scale-ripple`, et seulement sur la branche animée.

**Corrigé** : `clipFor()` pose `overflow: 'hidden'` dès qu'un overlay par défaut est monté,
sur les deux branches. Pas quand il n'y en a pas — cela couperait silencieusement un enfant
qui déborde légitimement (un badge au coin d'un bouton), et un composant qui rend son propre
overlay a choisi `scale` précisément pour en décider lui-même.

### 5. `accessibilityState` était écrasé, pas fusionné

`{...rest}` passait après `accessibilityState`, donc un appelant ajoutant `expanded` ou
`selected` effaçait `disabled` et `busy`. Un lecteur d'écran cessait d'annoncer un bouton
désactivé — silencieusement, et le pattern se serait répliqué sur les 46 suivants.

**Corrigé** : fusion, les clés de l'appelant l'emportant sur les nôtres.

### 6. `defaultVariants` narrowait le type `Variant` du recipe entier

L'inférence lisait `Variant` sur le seul littéral `{ variant: 'primary' }` et réduisait la
recette à cette valeur : toutes les autres variantes devenaient des erreurs de type au point
d'appel. Le `Button` s'en sortait par un `as ButtonVariant` — que **les 47 composants**
auraient recopié.

**Corrigé dans le moteur** : `defaultVariants?: Selection<NoInfer<Variant>, A>`.
L'annotation disparaît du `Button`.

---

## Ce qui est enregistré, avec son échéance

### A. `@xaui/native-legacy` a le défaut de packaging du point 1

48 entrées, même `require` cassé, déjà publié en `0.2.11`. Le corriger demande de le sortir
d'`ignore` le temps d'une release — ce qu'AGENTS.md §Release décrit comme la procédure d'un
correctif `0.2.x` légitime.

**Échéance :** au prochain correctif legacy, pas avant. Un tree figé qu'on ne republie pas
ne gagne rien à être corrigé dans le dépôt seul.

### B. L'axe `radius` est dix lignes que 46 composants recopieront

```ts
radius: {
  xs: t => ({ root: { borderRadius: t.radius.xs } }),
  sm: t => ({ root: { borderRadius: t.radius.sm } }),
  … huit autres
}
```

Dix clés × 47 composants = 470 lignes qui ne disent rien. Un `radiusAxis('root')` dans
`system/recipe/` les remplacerait par une.

**Non fait ici, délibérément** : la règle du dépôt est _promotion au deuxième usage, jamais
par anticipation_ (§2 bis). Le `Button` est le premier usage.

**Échéance :** P3 #4, le `Card` — le deuxième composant à exposer un `radius`. Le
constat est consigné pour que la promotion se fasse à ce moment-là plutôt que d'être
redécouverte.

### C. Le `style` de `Icon` ne s'applique qu'à la forme `source`

`IconProps.style` est typé `StyleProp<ImageStyle>` et n'atteint que la branche `Image`.
`<Button.Icon as={TrashIcon} style={{ opacity: 0.5 }} />` ne fait donc **rien**,
silencieusement — ce qui frotte contre R2 (« chaque slot porte son propre `style` »).

**Non corrigé** : les deux autres formes ne sont pas des vues que nous rendons. Une
`<View>` d'emballage rétablirait `style` au prix d'un niveau de profondeur sur chaque icône
de la librairie — exactement ce que le §8 a supprimé. `size` et `color` restent
l'échappatoire, et le type le documente maintenant.

**Échéance :** à revoir si un composant du noyau en a réellement besoin. Sinon, c'est une
limite assumée du fait d'envelopper un composant tiers.

### D. Le ripple — **corrigé**

`feedbackVariant="scale-ripple"` ne dessinait rien. La cause était structurelle et se lit
directement dans la source de HeroUI : **les handlers de toucher ne sont pas sur le
`Pressable`, ils sont sur la `View` du ripple lui-même.**

`Pressable` porte le système de responder — il décide si un toucher devient un appui — et
avale les props de toucher brutes qu'on lui passe. Un `onTouchStart` posé sur lui n'arrive
jamais. Chez eux, `PressableFeedback.Ripple` rend son propre conteneur en remplissage
absolu, et c'est **lui** qui porte `onTouchStart` / `onTouchEnd` / `onTouchCancel`. Il ne
réclame pas le responder, donc l'appui en dessous est intact.

Le ripple est donc redevenu autonome : il se mesure lui-même, garde ses deux vagues, et ne
demande plus rien au root que le réglage `animation` global. Une vague va de `0 → 1` tant
que le doigt est posé et de `1 → 2` quand il se lève — sa durée est celle de l'appui plus
une traîne, et non un one-shot qui s'éteint sous un doigt encore posé.

**Ce qui reste à la charge du composant : l'encre.** Un primitif ne peut pas savoir sur
quoi il est posé. Le défaut est le `foreground` du thème, qui se lit sur une surface neutre
et disparaît sur une surface saturée — du noir à 12 % sur du violet n'est pas un indicateur
d'appui. Un composant, lui, connaît sa surface : il choisit `feedbackVariant="scale"` et
donne à l'onde la couleur contrastée que sa variante a déjà résolue, via le `style` du
`Ripple`. L'écran de démo montre les deux côte à côte.

Trois mécanismes avaient été essayés avant celui-là, et ce qu'ils ont écarté vaut d'être
gardé : les couches étaient bien montées (vérifié dans le DOM du rendu web), leur géométrie
ne dépend plus d'une lecture de valeur partagée dans un worklet — le rayon est posé depuis
un état React — et le problème n'était pas une durée trop courte, puisqu'une onde poussée à
huit secondes ne se voyait pas davantage.

> **Corrigé depuis, deux fois.** Les handlers sur la `View` du ripple étaient la mauvaise
> moitié de la réponse : l'overlay est un *frère* des enfants du composant, pas leur parent,
> donc il n'entend jamais un toucher sur le label d'un bouton — l'onde marchait sur le
> padding et rien sur le texte. Ils sont revenus sur le `Pressable`, qui est la surface
> tactile, et le root pilote les deux vagues et les publie.
>
> **L'encre n'est plus à la charge du composant.** Un primitif ne peut pas savoir sur quoi
> il est posé, mais le *root* si : il aplatit son propre `style`, lit `backgroundColor` et
> prend le côté contrasté — plus rien à passer. Un token `…Soft` translucide retombe sur le
> `foreground` du thème, faute de luminance lisible ; c'est ce que le harnais de perf a
> attrapé, `contrastOn` lançant sur les `rgba()`.

### E. `accentPressed` éclaircit en mode clair — **ouvert**

Pas le ripple, mais découvert en le corrigeant, et bien plus large : **un contrôle rempli
s'éclaircit quand on l'enfonce**, en mode clair.

```ts
accentPressed: mix(s.accent, s.accentForeground, 0.1)
```

Le mélange va vers **le texte de la variante**, qui est quasi-blanc sur un fond saturé :
`#9333ea` → `#9c4eee`. En mode sombre le texte est sombre, donc le résultat est correct par
accident. Ça touche `accentPressed`, `successPressed`, `warningPressed`, `dangerPressed` —
donc l'état pressé de toutes les variantes remplies du `Button`, pas seulement la démo.

**Ce n'est pas un bug évident, c'est un arbitrage à trancher.** La couche d'état de Material
est bien `onColor` à faible alpha — donc _plus clair_ sur un fond sombre, ce que la formule
actuelle produit. iOS, lui, assombrit. Les deux conventions existent ; ce qui ne va pas,
c'est que la nôtre change de direction selon le mode sans que ce soit une décision.

Deux options, à décider avant P3 puisque les quinze composants du noyau en héritent :

- **Une direction constante** — mélanger vers `colors.foreground` (l'encre du mode) plutôt
  que vers le texte de la variante : plus sombre en clair, plus clair en sombre. C'est ce
  que fait `deriveTint` pour une teinte brute, donc ça aligne aussi les deux chemins.
- **Assumer Material** — garder la formule et documenter que l'état pressé éclaircit.

**Échéance :** avant P3. C'est une décision de la couche thème, pas d'un composant.

---

## Ce qui a été vérifié et tient

| Règle                          | Verdict                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| R1 · composition               | Root `forwardRef` + `Label` / `Icon` / `Spinner`. Aucune prop ne stylise l'intérieur d'un autre composant |
| R2 · pas de `customAppearance` | Chaque slot porte son `style` — sauf la nuance C ci-dessus                                                |
| R3 · auto-wrap                 | `childrenToString`, récursif. `<Button>{count} items</Button>` fonctionne                                 |
| R4 · layout au root            | `gap` au root, **zéro marge** sur les trois slots. Pas de `startContent`                                  |
| R5 · contexte résolu           | Styles résolus, memoizés. Aucun slot ne rappelle la recette                                               |
| R6 · tokens dans les props     | `size={42}` est une erreur de type. `color` est l'exception prévue                                        |
| R7 · deux props d'apparence    | `variant` et `color`. Rien d'autre                                                                        |
| R8 · `isX`                     | `isDisabled`, `isLoading`, `isIconOnly`. `disabled` n'est pas public                                      |
| R9 · le root forwarde tout     | `ref`, `testID`, a11y, et `style` **en forme fonction** — résolue au root, qui possède l'état de press    |
| R10 · hook exporté             | `useButton`                                                                                               |
| R11 · `displayName`            | `XAUI.Button.Root` / `.Label` / `.Icon` / `.Spinner`                                                      |
| R12 · `asChild`                | Branche de rendu réelle, via `Slot` — après #180                                                          |
| R13 · RTL                      | `paddingHorizontal`, aucun `left`/`right`. La règle ESLint passe                                          |

**Vocabulaire.** Les sept variantes nomment des tokens et ne calculent rien ; la recette ne
contient ni hex ni pixel — les seuls nombres sont des _pas_ sur l'échelle d'espacement et des
valeurs structurelles (`borderWidth: 0`, `aspectRatio: 1`). `size` pilote la hauteur et
jamais la largeur, en `height` fixe. Pas de `fullWidth`.

**Perf.** §9 bis : 200 boutons coûtent 28 feuilles de style, un appui en coûte 0, et un appui
re-rend 2 composants hôtes sur 400.

**Un écart assumé au plan.** `radius` n'a **pas** de valeur par défaut, là où l'exemple du §8
écrit `radius = 'md'`. Avec `md` (9 px sur une base de 12), chaque bouton serait presque
carré et ne ressemblerait pas à sa référence. La taille impose la forme ; `radius` la
remplace quand on le demande.

---

## Deux décisions que la revue confirme

**Un seul traitement de l'état pressé.** La recette peint le token `…Pressed` de la variante
et le root ne monte aucun overlay. Le lavis neutre par-dessus assombrirait deux fois. Les 46
suivants doivent choisir de la même manière : la recette **ou** l'overlay.

**Le contexte porte des styles résolus, pas des props.** C'est la divergence 1 du §1 ter, et
elle se paie ici : l'objet `ResolvedStyles` change d'identité à l'appui, donc le memo se
reconstruit et les slots du bouton pressé re-rendent. Mesuré : **2 composants hôtes, pas
400**. Résoudre deux fois — une passe sans états pour les slots — supprimerait ces deux
rendus, au prix d'un invariant fragile : « aucun état ne touche un slot », vrai pour le
`Button` et faux au premier composant qui change la couleur de son label sous le doigt.
**Non fait.** Le coût mesuré ne le justifie pas.

---

## Conclusion

P3 peut démarrer. Le premier composant du noyau — `Typography` — se copie sur
`components/button/` sans réserve, en gardant devant soi les quatre points enregistrés :
promouvoir `radiusAxis` au `Card`, ne pas s'étonner du `style` d'`Icon`, corriger le
packaging de legacy à sa prochaine release, et faire rendre le ripple avant le `Chip`.
