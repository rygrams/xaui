# List

## Overview

`List` virtualise une collection avec le `FlatList` de React Native. Il fournit la
structure visuelle d'une ligne sans lui attribuer de comportement de sélection ou de
pression.

## Anatomy

```tsx
<List>
  <List.Item>
    <List.Leading />
    <List.Content>
      <List.Title />
      <List.Description />
    </List.Content>
    <List.Action />
  </List.Item>
</List>
```

## Usage

```tsx
<List
  data={people}
  keyExtractor={person => person.id}
  renderItem={({ item }) => (
    <List.Item>
      <List.Leading>{item.avatar}</List.Leading>
      <List.Content>
        <List.Title>{item.name}</List.Title>
        <List.Description>{item.role}</List.Description>
      </List.Content>
      <List.Action>{item.action}</List.Action>
    </List.Item>
  )}
/>
```

## Props

Le root accepte les props verticales de `FlatList`, ainsi que les style props de vue. Les
props qui changeraient son orientation ou son séparateur sont volontairement réservées afin
de garantir le contrat visuel du composant. `asChild` permet de les fusionner dans un root
personnalisé compatible avec `FlatList`.

## Slots

`Item` compose une ligne. `Leading` et `Action` centrent leurs contenus. `Content` prend
l'espace restant et empile `Title` et `Description`.

## Variants

`List` n'a pas de variant d'apparence : son fond reste celui de son parent et ses espacements
proviennent du thème.

## Accessibility

Le root est annoncé comme une liste. Chaque ligne conserve les propriétés d'accessibilité
fournies à `List.Item`, et le contrôle placé dans `Action` conserve sa propre sémantique.

## Migration from legacy

Contrairement à `ListBuilder`, la nouvelle API reçoit le contrat standard de `FlatList` et
compose la ligne avec des slots. La sélection et la pression appartiennent au contrôle rendu
par l'application, pas à la liste.
