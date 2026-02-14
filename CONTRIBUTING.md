# Contributing to XAUI

Merci de contribuer a XAUI. Ce document formalise les specs, l'architecture et les regles de contribution du repo.

## Specs du projet

- Stack principale: TypeScript, React Native, Reanimated, Next.js, Vitest.
- Mode repo: monorepo Turborepo avec workspaces `pnpm`.
- Packages coeur:
- `@xaui/core`: tokens et theming (`useXUITheme`, `useColorMode`).
- `@xaui/native`: composants React Native (API inspiree Flutter).
- `@xaui/icons`: bibliotheque d'icones tree-shakable.
- Applications:
- `apps/demo`: bac a sable Expo.
- `apps/docs`: site de documentation Next.js.

## Architecture

Structure globale:

```text
apps/
  demo/
  docs/
packages/
  core/
  native/
  icons/
```

Principes:

- `packages/core` est la source de verite des tokens/theme.
- Les composants `packages/native` consomment le theme core.
- Les exports composants sont maintenus dans `packages/native/tsup.config.ts`.
- La doc composants est centralisee dans `apps/docs/lib/data/components.ts`.

## Regles de dev

- Utiliser `pnpm` uniquement (pas `npm`, pas `yarn`).
- Node.js: version 20+ recommandee.
- Respecter Prettier/ESLint (no semicolons, single quotes, print width 90).
- Eviter `any` sauf justification technique claire.
- Eviter les `console.log`, `console.error`, `debugger`.
- Favoriser des retours anticipes pour limiter l'imbrication.
- Garder les APIs coherentes avec l'approche Flutter-like.

## Workflow local

Installation:

```bash
pnpm install
```

Commandes utiles:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm type-check
pnpm test
```

Commande ciblee:

```bash
pnpm --filter <workspace> <command>
```

Exemples:

```bash
pnpm --filter docs dev
pnpm --filter @xaui/native test
```

## Regles composants

- Un composant doit inclure ses types/hook/style dans son dossier.
- Ajouter/mettre a jour les tests associes dans `packages/native/src/__tests__`.
- Exporter le composant via son `index.ts`.
- Mettre a jour les exports publics dans `packages/native/tsup.config.ts` si nouveau composant.
- Mettre a jour la doc dans `apps/docs/lib/data/components.ts`.

## Regles documentation

- Les pages docs doivent privilegier API, imports, types et usage.
- Ne pas imposer de demos interactives quand non necessaire.
- Garder descriptions courtes, precises et consistantes.

## Regles release

Ce repo utilise Changesets.

- Creer un changeset pour chaque changement de package:

```bash
pnpm changeset
```

- Ne pas lancer localement:
- `pnpm changeset version`
- `pnpm version-packages`
- `pnpm release`

Ces etapes sont gerees par la CI.

## Pull Request

Avant PR:

- Executer `pnpm lint`, `pnpm type-check`, `pnpm test`.
- Ajouter les fichiers de changeset si un package est impacte.
- Verifier que la doc est alignee avec les exports reels.

Dans la PR:

- Expliquer le `What`, `Why`, `How`.
- Mentionner les impacts potentiels (breaking changes, migration, design tokens).
