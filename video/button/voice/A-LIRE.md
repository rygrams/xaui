# Voix off · Button

Vidéo longue : 74 s, voix ≈ 61,6 s (83 %).
Short : 47 mots, ≈ 17,7 s.
Anglais, débit visé 160 mots/min.

## 1. Consignes d'enregistrement

- Format : WAV ou M4A, 48 kHz si possible, pièce calme, micro à 15–20 cm.
- 1 s de silence au début et à la fin, environ 0,8 s entre chaque segment.
- Phrase ratée : marquer une pause, puis la relire en entier. Le montage garde la
  dernière prise.
- Ton : complice, léger, rapide. On sourit, on ne vend rien.
- Prononciation à confirmer avant d'enregistrer : « xtart-app » dans l'URL, écrit ici
  comme il se lit. Adapter le champ `spoken` du JSON si la marque se dit autrement,
  puis relancer `node scripts/voice-sheet.mjs`.

## 2. Version par scène

### Scène 01 · intro · ≈ 2,3 s (scène : 3 s)

This week: the thing everyone **presses**.

_Ton : complice, comme une confidence._

### Scène 02 · problem · ≈ 3,4 s (scène : 4 s)

Great order. Lovely total. Now, how does anyone **pay**?

_Ton : pince-sans-rire, petite attente avant « Now »._

### Scène 03 · solution · ≈ 4,5 s (scène : 5 s)

Import it, wrap your label, pass an on-press. That's the **whole** setup.

### Scène 04 · basic · ≈ 3,4 s (scène : 4 s)

Color, height and press feedback: **already** decided for you.

### Scène 05 · press · ≈ 4,9 s (scène : 7 s)

Tap it: is-loading drops in a **spinner** and ignores the **nervous** double tap.

_Ton : amusé sur « nervous double tap »._

### Scène 06 · variants-code · ≈ 4,1 s (scène : 5 s)

Primary **shouts**, ghost **whispers**, danger **means** it. Same prop, different volume.

_Ton : trois temps bien détachés._

### Scène 07 · variants-live · ≈ 4,9 s (scène : 6 s)

Swap the variant and only the **tokens** change. No new component, no restyling.

### Scène 08 · sizes-code · ≈ 3,0 s (scène : 4 s)

Four sizes move **height**, padding, radius and type.

### Scène 09 · sizes-live · ≈ 4,1 s (scène : 5 s)

Width stays **yours**: it fills a column and hugs a row.

### Scène 10 · compose-code · ≈ 4,5 s (scène : 5 s)

Slots render in J-S-X order: the icon sits **where** you put it.

### Scène 11 · compose-live · ≈ 4,5 s (scène : 5 s)

Add to cart: the spinner slides in, and the button **doesn't** jump.

### Scène 12 · color-code · ≈ 3,4 s (scène : 4 s)

Pass one **hex**; the **variant** decides where it lands.

### Scène 13 · color-live · ≈ 4,1 s (scène : 5 s)

Soft and pressed shades are **derived** in okay-lab. No palette **meetings**.

_Ton : sec, un sourire sur « No palette meetings »._

### Scène 14 · dark · ≈ 4,1 s (scène : 5 s)

Flip the system to dark. **Same** code, and the tokens follow.

### Scène 15 · ship-it · ≈ 3,8 s (scène : 4 s)

Screen readers hear a button, and hear when it's **busy**.

_Ton : plus posé, on conclut._

### Scène 16 · outro · ≈ 2,6 s (scène : 3 s)

Docs at U-I dot xtart-app dot com.

_Ton : lent et clair, chaque syllabe de l'URL._

## 3. Version en une seule prise

```text
This week: the thing everyone presses.
[pause]
Great order. Lovely total. Now, how does anyone pay?
[pause]
Import it, wrap your label, pass an on-press. That's the whole setup.
[pause]
Color, height and press feedback: already decided for you.
[pause]
Tap it: is-loading drops in a spinner and ignores the nervous double tap.
[pause]
Primary shouts, ghost whispers, danger means it. Same prop, different volume.
[pause]
Swap the variant and only the tokens change. No new component, no restyling.
[pause]
Four sizes move height, padding, radius and type.
[pause]
Width stays yours: it fills a column and hugs a row.
[pause]
Slots render in J-S-X order: the icon sits where you put it.
[pause]
Add to cart: the spinner slides in, and the button doesn't jump.
[pause]
Pass one hex; the variant decides where it lands.
[pause]
Soft and pressed shades are derived in okay-lab. No palette meetings.
[pause]
Flip the system to dark. Same code, and the tokens follow.
[pause]
Screen readers hear a button, and hear when it's busy.
[pause]
Docs at U-I dot xtart-app dot com.
```

## 4. Version ElevenLabs

```text
This week: the thing everyone presses. <break time="0.8s" />
Great order. Lovely total. Now, how does anyone pay? <break time="0.8s" />
Import it, wrap your label, pass an on-press. That's the whole setup. <break time="0.8s" />
Color, height and press feedback: already decided for you. <break time="0.8s" />
Tap it: is-loading drops in a spinner and ignores the nervous double tap. <break time="0.8s" />
Primary shouts, ghost whispers, danger means it. Same prop, different volume. <break time="0.8s" />
Swap the variant and only the tokens change. No new component, no restyling. <break time="0.8s" />
Four sizes move height, padding, radius and type. <break time="0.8s" />
Width stays yours: it fills a column and hugs a row. <break time="0.8s" />
Slots render in J-S-X order: the icon sits where you put it. <break time="0.8s" />
Add to cart: the spinner slides in, and the button doesn't jump. <break time="0.8s" />
Pass one hex; the variant decides where it lands. <break time="0.8s" />
Soft and pressed shades are derived in okay-lab. No palette meetings. <break time="0.8s" />
Flip the system to dark. Same code, and the tokens follow. <break time="0.8s" />
Screen readers hear a button, and hear when it's busy. <break time="0.8s" />
Docs at U-I dot xtart-app dot com.
```

## 5. Version short

### Par phrase

### Phrase 1 · hook · ≈ 3,8 s

Your pay button deserves better than a **sad** grey rectangle.

_Ton : accroche, sourire dans la voix._

### Phrase 2 · import · ≈ 2,3 s

One import, and it's **already** themed.

### Phrase 3 · press · ≈ 2,6 s

Tap it: a spinner, no **double** charges.

### Phrase 4 · props · ≈ 2,6 s

**Seven** variants, **four** sizes, **any** brand tint.

_Ton : rapide, énuméré._

### Phrase 5 · dark · ≈ 2,6 s

Dark mode follows all on its **own**.

### Phrase 6 · outro · ≈ 3,8 s

Docs for **Button** live at U-I dot xtart-app dot com.

_Ton : lent et clair sur l'URL._

### En une seule prise

```text
Your pay button deserves better than a sad grey rectangle.
[pause]
One import, and it's already themed.
[pause]
Tap it: a spinner, no double charges.
[pause]
Seven variants, four sizes, any brand tint.
[pause]
Dark mode follows all on its own.
[pause]
Docs for Button live at U-I dot xtart-app dot com.
```

### ElevenLabs

```text
Your pay button deserves better than a sad grey rectangle. <break time="0.5s" />
One import, and it's already themed. <break time="0.5s" />
Tap it: a spinner, no double charges. <break time="0.5s" />
Seven variants, four sizes, any brand tint. <break time="0.5s" />
Dark mode follows all on its own. <break time="0.5s" />
Docs for Button live at U-I dot xtart-app dot com.
```

## 6. Où déposer les fichiers

- Une seule prise pour toute la vidéo : `video/button/voice/input/voiceover.(wav|m4a|mp3)`
- OU un fichier par scène : `video/button/voice/input/<sceneId>.(wav|m4a|mp3)`
- Short : `video/button/voice/input/short.(wav|m4a|mp3)`
- Puis lancer `03b-import-voix-manuelle.md`
