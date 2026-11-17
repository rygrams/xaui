# XAUI Tram — Plan d'implémentation

`@xaui/tram` est une troisième bibliothèque du monorepo : **à peu près les mêmes composants
que `@xaui/native`, dessinés dans le langage Metro modernisé** (« Tram »). Ce document fixe
ce que le package est, ce qu'il partage avec Native, et l'ordre du travail.

- Le dessin — valeurs, tailles, courbes, comportement de chaque contrôle — est dans
  `TRAM-DESIGN.md`. Ce plan ne le recopie pas : il dit comment on le construit.
- L'état des tâches est dans `ROADMAP.md`, refs `T*`.
- Le skill qui porte ces règles au quotidien est `xaui-tram`.

## 1. Principes

| #   | Règle                                                                                                                                                                                                                                                                         |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TR1 | **On partage le moteur, pas les composants.** Tram dépend de `@xaui/native` et construit avec `@xaui/native/system`, `@xaui/native/theme` et les hooks de la racine. Aucun composant Native n'est enveloppé, re-stylé par props ni copié-collé.                               |
| TR2 | **La même API v1.** R1–R14 de `XAUI-V1-PLAN.md` s'appliquent telles quelles : root `forwardRef` + slots en notation pointée, `asChild`, `variant` / `color` / `size`, props de style, booléens `isX`, hook de contexte exporté. Seul le dessin change.                        |
| TR3 | **Mêmes noms, mêmes slots, quand le composant existe dans Native.** `@xaui/native/button` → `@xaui/tram/button` doit suffire à changer de style. Une prop ou un slot en plus se justifie par le dessin Metro ; une prop en moins se note dans la table de parité (§5).        |
| TR4 | **Un composant Metro sans équivalent Native est un composant à part** (`Tile`, `Pivot`, `Panorama`, `AppBar`, `JumpList`), pas une variante d'un composant existant. `Pivot` n'est pas `Tabs` : Tram a les deux.                                                              |
| TR5 | **Tram, pas Metro.** La cible est la colonne « Tram » de `TRAM-DESIGN.md` : arrondi 2, cible tactile 48, ressorts interruptibles, texte sur accent selon le contraste. La colonne « Metro » est la référence d'identité, pas la spécification.                                |
| TR6 | **Aplats, jamais de profondeur.** Pas d'ombre, pas de flou, pas de dégradé, pas d'arrondi au-delà de 2 (hors cercles : radio, App Bar). Une surface se distingue par l'espace, la typographie et, au plus, la surface discrète.                                               |
| TR7 | **Le thème est un `XAUITheme`.** Tram le construit avec `createTheme` ; le moteur de recettes et son cache ne sont pas forkés. Ce qui manque à `XAUIThemeConfig` s'ajoute dans Native (skill `xaui-theme`), ou vit dans les tokens propres à Tram (§3) — jamais un 2ᵉ moteur. |
| TR8 | **Le mouvement guide.** 100 % Reanimated, worklets déclarés, `useReducedMotion` respecté partout (fondu de 150 ms). Les courbes et ressorts viennent des tokens de mouvement, jamais d'un littéral dans un composant.                                                         |
| TR9 | **Pas de doc web, pas de README pour l'instant.** Ni page `apps/docs`, ni `README.md` de package ou de dossier, ni `llms.txt`, ni ré-export Hybrid. Chacun attend une tâche explicite (T5).                                                                                   |

## 2. Architecture

```
packages/tram/
  package.json        @xaui/tram — "private": true jusqu'à T5
  tsup.config.ts      mêmes conventions que native : un sous-chemin par composant
  src/
    theme/            tokens Tram, tramTheme, createTramTheme, TramProvider
    motion/           courbes, durées, ressorts, useTramMotion
    system/           primitives propres à Tram, à partir du 2ᵉ usage (tilt, swivel…)
    components/       un dossier par composant, même forme que native
    hooks/ utils/     seulement quand un fichier y entre
    __tests__/        miroir, fonctions pures uniquement
    index.ts
```

- **Dépendances.** `@xaui/native` en `workspace:^` (dépendance, comme Hybrid). Pairs : ceux
  de Native, avec les mêmes optionnels. Rien d'autre sans tâche — en particulier aucune
  dépendance haptique (§4).
- **Imports depuis Native : par les points d'entrée seulement** — `@xaui/native/system`,
  `@xaui/native/theme`, `@xaui/native`. Jamais un chemin profond, jamais un `utils/` privé.
  Si Tram a besoin d'un helper privé de Native, il est promu dans `system/` côté Native
  (skill `xaui-system`), dans un commit à part.
- **Sous-chemins.** `@xaui/tram/<composant>`, `@xaui/tram/theme`, `@xaui/tram/motion`,
  déclarés dans `package.json` **et** `tsup.config.ts`.
- **`displayName`** : `'XAUI.Tram.Button.Root'`.
- **Publication.** `"private": true` tant que T5 n'est pas lancé : changesets ignore le
  package, rien ne part sur npm par accident. Pas de changeset pour Tram d'ici là.
- **Démo.** Chaque composant a son écran `apps/demo/app/tram/<composant>.tsx`, sous un
  `TramProvider`, vérifié en sombre **et** en clair. C'est la seule vérification d'un
  composant (règle de test du dépôt inchangée).

## 3. Thème et tokens

`tramTheme` est un `XAUIThemeSet` produit par `createTheme`, avec les valeurs Tram :

| Entrée `createTheme` | Valeur Tram                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| `background`         | `#000000` sombre, `#FFFFFF` clair                                            |
| `foreground`         | `#FFFFFF` sombre, `#000000` clair                                            |
| `muted`              | blanc à 64 % / noir à 60 % — contraste AA vérifié                            |
| `surface`            | `#0F0F0F` sombre, `#F2F2F2` clair (la surface discrète)                      |
| `accent`             | cyan `#1BA1E2` par défaut ; `accentForeground` blanc ou noir selon contraste |
| `radius`             | base telle que l'échelle plafonne à 2                                        |
| `borderWidth`        | `default: 3`, `field: 3`                                                     |
| `shadows`            | toutes neutralisées (opacité 0, élévation 0)                                 |
| `fontFamilies`       | `Selawik` — le package n'embarque aucune police, l'appli la charge           |
| `controlHeights`     | `md` ≥ 48 ; à figer sur le `Button` de référence                             |

Ce que `XAUITheme` ne sait pas porter vit dans `theme/tram-tokens.ts`, **écrit à la main,
en données pures** :

- `accents` — les 20 couleurs Windows Phone 8, par nom.
- `onAccent(hex)` — blanc ou noir selon la luminance ; fonction pure, testée. Le seuil est
  0,4 et non le 0,45 de `TRAM-DESIGN.md` : l'ambre est à 0,447 et passerait en blanc.
- `type` — l'échelle Tram (`caption` 13 → `hero` 120) avec sa graisse par rôle.
- `tileColumns` — 4 / 6 / 8.
- `touchTarget` — 48.

`createTramTheme({ accent, ...config })` enveloppe `createTheme` : un accent choisi par nom
ou en valeur brute, `accentForeground` calculé par `onAccent`, le reste passé tel quel.
`TramProvider` est `XAUIProvider` monté avec `tramTheme` par défaut.

Les couleurs sémantiques (`success`, `warning`, `danger`) se prennent dans les 20 accents
(`green`, `amber`, `red`) ; les dérivées (`*Pressed`, `*Soft`) restent celles de
`deriveColors`. Si une dérivée contredit le dessin (un appui Metro **inverse** les couleurs
au lieu de les assombrir), c'est la recette du composant qui le dit dans ses états, pas un
second moteur de dérivation.

## 4. Mouvement et haptique

`motion/` exporte des données et un hook, rien d'autre :

- `ease` : `metro` `(0.1, 0.9, 0.2, 1)`, `exit` `(0.6, 0, 0.9, 0.4)`.
- `duration` : `fast` 80, `base` 250, `slow` 400, `reduced` 150.
- `spring` : `press`, `navigation`, `tile` (valeurs de `TRAM-DESIGN.md`).
- `useTramMotion()` : renvoie le ressort demandé, ou le fondu de 150 ms si l'utilisateur a
  réduit les animations.

Les animations de signature — tilt, turnstile, continuum, swivel, cascade — sont des
primitives de `system/` dès qu'un deuxième composant s'en sert ; avant, elles restent dans
le dossier du composant.

**Haptique : aucune dépendance.** Un composant Tram expose l'instant (`onPressIn`,
`onValueChange`, `onTabChange`) et l'appli branche `expo-haptics` si elle veut. Embarquer
une bibliothèque haptique est une décision de plan, pas de composant.

## 5. Parité avec Native

Trois familles, traitées dans cet ordre.

**A — un original Metro existe.** Le dessin vient de `TRAM-DESIGN.md`, colonne Tram.

| Tram (`@xaui/tram/…`)                        | Original Metro          | Note                                               |
| -------------------------------------------- | ----------------------- | -------------------------------------------------- |
| `button`                                     | Button                  | la référence (T1)                                  |
| `typography`                                 | échelle de texte        | rôles Tram : `caption` … `hero`                    |
| `switch`                                     | ToggleSwitch            | piste rectangulaire, curseur en bloc               |
| `checkbox`                                   | CheckBox                | carré à bordure épaisse                            |
| `radio`                                      | RadioButton             | cercle, point sur ressort                          |
| `slider`                                     | Slider                  | curseur rectangulaire                              |
| `progress-bar`                               | ProgressBar             | indéterminé : cinq points                          |
| `text-field`, `text-area`                    | TextBox                 | fond adapté au thème, bordure d'accent au focus    |
| `select`                                     | ListPicker              | sur place ou plein écran                           |
| `date-picker`, `time-picker`, `wheel-picker` | DatePicker / TimePicker | roues de carrés                                    |
| `dialog`                                     | MessageBox              | bandeau en haut, swivel                            |
| `menu`                                       | ContextMenu             | pleine largeur, la page recule                     |
| `toast`                                      | Toast                   | rectangle d'accent sous l'encoche                  |
| `list`                                       | liste à vignette        | vignette + trois niveaux de texte                  |
| `tabs`                                       | —                       | onglets Metro ; **`pivot` est à part** (famille C) |
| `toggle-button`, `close-button`, `fab`       | Button, App Bar         | dérivés du `Button`                                |

**B — pas d'original, on dessine avec les tokens Tram.** Tout le reste de Native : même
API, aplats, bordure 3, arrondi 2, aucune ombre. `card` et `surface` sont la surface
discrète, sans bordure. Un composant dont le dessin Native repose sur la profondeur
(`bottom-sheet`, `popover`) est redessiné en aplat et en bord franc, pas abandonné.

**C — propres à Tram.** `tile` (retournement, glissement, image, tilt), `pivot`,
`panorama`, `app-bar`, `jump-list`.

Un composant Native que Tram n'aura pas se marque `dropped` dans la roadmap, avec la raison
dans le titre de la tâche.

## 6. La boucle par composant

1. Lire le composant Native du même nom : API, slots, états. C'est le contrat.
2. Lire sa section dans `TRAM-DESIGN.md`. Pas de section : famille B, les tokens décident.
3. Écrire types → recette → contexte → root → slots, forme du `Button` Tram.
4. Écran de démo `apps/demo/app/tram/<composant>.tsx`, sombre et clair, animations réduites.
5. Sous-chemin dans `package.json` et `tsup.config.ts`, export dans le barrel.
6. Ligne `T*` de la roadmap à `done`, dans le même commit.
7. `xaui-review` + la checklist de `xaui-tram`.

## 7. Phasage

| Phase  | Quoi                                                                                                    | Sort                          |
| ------ | ------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **T0** | Socle : package privé, build, lint, tests, `theme/`, `motion/`, `TramProvider`, section Tram de la démo | rien                          |
| **T1** | Le `Button` de référence + **revue d'API bloquante** (vocabulaire `variant`, hauteurs, états d'appui)   | rien                          |
| **T2** | Les contrôles de la famille A                                                                           | rien                          |
| **T3** | La signature : `Tile`, `Pivot`, `Panorama`, `AppBar`, `JumpList`, turnstile, continuum                  | rien                          |
| **T4** | La famille B, jusqu'à la parité avec Native                                                             | rien                          |
| **T5** | README, pages `apps/docs`, `llms.txt`, levée de `private`, première publication — sur tâche explicite   | `@xaui/tram@0.1.0`, à décider |

L'ordre des phases n'est pas indicatif : le thème avant le `Button`, la revue du `Button`
avant tout autre composant. Dans une phase, l'ordre est libre.

## 8. Questions que T1 doit trancher

La revue du `Button` de référence fige ces points pour tout le package ; avant elle, ils
sont des propositions.

- **`variant`.** Tranché : quatre valeurs, `contained` (plein dans la vraie couleur),
  `flat` (plein dans sa tranche douce), `outline` (trait et texte dans la couleur) et
  `text` (texte seul). Ce ne sont pas les noms de Native, exprès : Tram n'a qu'une couleur
  à dépenser, donc une variante dit comment la boîte est dessinée, pas une intention.
- **`accent`.** Tranché : un nom parmi les vingt accents (`accent="magenta"`) repeint un
  bouton sans changer de thème. `color` reste la teinte brute hors palette, et gagne.
- **Bordure du bouton.** Tranché : 2, un point sous le 3 du thème.
- **État appuyé.** Tranché : `contained` inverse (fond `foreground`) ; `flat` et `outline`
  se remplissent de la vraie couleur ; `text` grise. Le mouvement est le tilt des tuiles —
  la boîte s'incline vers le doigt, 6° au bord, et réduit à 98 % — pas une réduction
  centrée.
- **Casse.** Metro écrit les libellés en minuscules ; Tram ne transforme pas le texte de
  l'appli — proposition : aucune `textTransform` imposée.
- **`size`.** `sm` / `md` / `lg` comme le switch et le radio de `TRAM-DESIGN.md` ; `xs`
  existe-t-il dans Tram ?
- **Mode clair.** Vérifier que les 20 accents tiennent le contraste sur blanc ; sinon
  `onAccent` et les bordures s'ajustent par mode.
