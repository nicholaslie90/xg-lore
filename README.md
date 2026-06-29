# Xenogears Lorebook

An interactive **fan-made** lorebook for **Xenogears** — its ten-thousand-year
history, its floating empires, and the cycle of reincarnation that binds its heroes.

🌐 **Live:** https://nicholaslie90.github.io/xg-lore/

## ⚖️ Copyright

**All copyrights belong to Square Enix.** *Xenogears*, its story, characters,
music, and artwork are © **SQUARE ENIX CO., LTD.** (originally Squaresoft).

This is a **non-commercial, fan-made website** created out of love for the game.
It is **not affiliated with, endorsed by, or sponsored by Square Enix**. No
copyrighted assets are redistributed here:

- All **character portraits** and **event illustrations** are original vector
  graphics drawn in code — no official art or screenshots are used.

If you are a rights holder and have any concerns, please open an issue.

## Features

- **Timeline** — a chronological spine from the fall of the Eldridge ten thousand
  years ago to the end of the cycle. **Click any incident** to expand a deeper
  account and an original illustration, color-coded by period.
- **Characters** — a force-directed **web of souls** (~30 characters drawn as
  vector portraits) and an alphabetical **Grid** roster. Search by name/role,
  then open a **dossier** with the character's temperament, story role, expanded
  background, a die-hard "Did you know?", and clickable connections. **Hover a tie**
  for a tooltip or select a character to see its links labelled inline. Tie types:
  ♥ love · ✦ bond · ⛓ family · ◈ same soul (reincarnation / shared soul) · ⚔ enmity.
- **Compendium** — cards organized into *The Divine & the Machine*, *Powers &
  Peoples*, and *Souls & the Cycle* (Deus, the Zohar, the Wave Existence, Solaris,
  Gears, reincarnation, and more).
- **Sealed Record spoiler toggle** — a "Sealed / Unsealed" switch (default off)
  hides the big twists behind redaction; unsealing also reveals hidden "same soul"
  ties, so the reincarnation web visibly grows as you unlock it.
- **Light / dark theme** — a deep oxblood "night" theme, or an aged-manuscript
  parchment light theme. Remembered across visits.

## Run it

Static site, no build step. Open the live link, or serve the folder locally:

```bash
python3 -m http.server   # then visit http://localhost:8000
```

## Project structure

```
index.html          markup + script/style includes
css/styles.css       all styling (dark + light themes)
js/data.js           lore data: characters, relationships, events, compendium
js/portraits.js      parametric vector character portraits (+ a Chu-Chu special)
js/scenes.js         vector illustrations for timeline incidents
js/app.js            timeline, graph, search, dossier, view + spoiler + theme logic
```

Content is data-driven — add or correct characters, ties, and events by editing
`js/data.js`.

Part of a set of lorebooks sharing one engine, alongside
[FFVII](https://github.com/nicholaslie90/ffvii-lore) and
[Kingdom Hearts](https://github.com/nicholaslie90/kh-lore).
