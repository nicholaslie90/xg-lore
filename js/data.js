/* ============================================================
   XENOGEARS LOREBOOK — DATA
   Loaded first; later scripts read these globals.
   ============================================================ */

const FACTIONS = {
  party:    { name: "Fei's Company", color: "#d8a23a" },
  shevat:   { name: "Shevat & Nisan", color: "#4fc8c0" },
  solaris:  { name: "Solaris", color: "#6a8fb8" },
  ethos:    { name: "The Ethos", color: "#c8a45a" },
  ministry: { name: "Deus & the Ministry", color: "#c0506a" },
  past:     { name: "Souls of the Past", color: "#9a6cff" },
  ally:     { name: "Independent", color: "#9a8a7a" },
};

// entry (period) → tag color
const ENTRY = {
  "The Lost Era":  "#c0506a",
  "Zeboim":        "#6ac8c0",
  "Age of Solaris":"#6a8fb8",
  "The Collapse":  "#9a6cff",
  "Aveh & Kislev": "#d8a23a",
  "Disc One":      "#c8a45a",
  "Disc Two":      "#c0506a",
};

/* Character fields: id, name, faction, role, personality, bio, spoilerBio?,
   background? (paragraphs), bgSpoiler?, tidbit, portrait, short?, keys? */
const CHARACTERS = [
  /* ---------- FEI'S COMPANY ---------- */
  { id:"fei", name:"Fei Fong Wong", short:"Fei", keys:["Fei"], faction:"party", role:"Pilot of Weltall · The Contact",
    personality:"Gentle, kind and a little passive on the surface, Fei avoids conflict and clings to the quiet life he's built. Beneath that calm lies a buried well of rage and grief, and a will far stronger — and more dangerous — than he wants to admit.",
    bio:"An amnesiac young man living in the remote village of Lahan, gifted painter and martial artist, who is drawn into a world-spanning conflict as the pilot of the Gear Weltall.",
    background:[
      "Fei was left in Lahan three years before the story begins, with no memory of who he was or where he came from — only a vague unease and a talent for art and fighting. He wants nothing more than to be left in peace.",
      "That peace shatters when a Gear battle reaches Lahan and a violent second self, Id, erupts from within him, leveling the village. Horrified and exiled, Fei sets out with the doctor Citan, slowly uncovering that his mind holds three people: gentle Fei, destructive Id, and a buried original self fractured by childhood trauma at his mother's and father's hands.",
      "Worse, his is an ancient soul. Fei is the latest in a line of reincarnations — the boy Abel who first contacted God, the painter Lacan, the scientist Kim — a 'Contact' the universe keeps returning, again and again, to the same struggle. To save the world (and himself) he must finally integrate every fractured piece and confront the god that made humanity as spare parts."
    ],
    bgSpoiler:true,
    tidbit:"Xenogears was conceived as 'Episode V' of a six-part saga, and is steeped in Jungian psychology and Kabbalah — Fei's three selves (the persona, the shadow 'Id', and the buried true self) are a near-literal dramatization of Jung's model of the psyche.",
    portrait:{ skin:"#e0b48a", hair:"#241c18", style:"messy", eyes:"#6a4a2e", clothes:"#a83a2a" } },

  { id:"id", name:"Id", keys:["Id"], faction:"past", role:"Fei's shadow self",
    personality:"Cold, cruel and gleefully destructive, Id is rage without restraint — the part of Fei that decided the world was an enemy to be unmade. Powerful, nihilistic, and utterly without mercy.",
    bio:"A violent alternate personality dwelling within Fei, who pilots with terrifying power and leaves devastation wherever he surfaces.",
    spoilerBio:"Id is the self Fei built to survive unbearable childhood trauma — the rage and pain split off into a separate person. Manipulated by Grahf and the Ministry as a weapon, Id seeks to return everything to nothing. Fei can only become whole by reclaiming, rather than destroying, him.",
    tidbit:"'Id' is the Freudian/Jungian term for the primal, instinctive psyche — and the name is a deliberate clue. Reintegrating Id, rather than defeating him, is the psychological heart of Fei's arc.",
    portrait:{ skin:"#e0b48a", hair:"#1a1410", style:"spiky", eyes:"#e23a3a", glow:true, clothes:"#3a1a1a" } },

  { id:"elly", name:"Elhaym Van Houten", short:"Elly", keys:["Elly","Elhaym"], faction:"party", role:"Solaris officer · The Antitype",
    personality:"Earnest, principled and quietly strong-willed, Elly begins as a loyal soldier and grows into someone who questions everything she was raised to believe. Compassionate, brave, and bound to Fei by something older than either of them.",
    bio:"An idealistic young officer of the Solaris military who defects after seeing how the empire treats the surface-dwellers, becoming Fei's closest companion.",
    spoilerBio:"Elly is the 'Antitype' — the eternal counterpart to the immortal Miang, and the recurring soul who has loved Fei's incarnations across millennia (as Sophia, and others). Her bond with Fei is literally written into the cycle the world's god depends on.",
    tidbit:"Fei and Elly's relationship is built on reincarnation across thousands of years — the game frames their love less as romance-at-first-sight than as two souls who have found each other again and again, life after life.",
    portrait:{ skin:"#f0caa0", hair:"#e8d28a", style:"short", eyes:"#5a86c8", clothes:"#3a4a6a" } },

  { id:"citan", name:"Citan Uzuki", short:"Citan", keys:["Citan","Hyuga"], faction:"party", role:"Village doctor · Solaris agent",
    personality:"Brilliant, unfailingly polite and perpetually smiling, Citan is the wise mentor figure — and far more dangerous and conflicted than his gentle manner suggests. He carries divided loyalties with quiet, painful grace.",
    bio:"The erudite doctor of Lahan, a master swordsman and scientist who becomes Fei's guide and confidant.",
    spoilerBio:"Citan's true name is Hyuga Ricdeau, an elite agent of Solaris assigned to observe Fei. Torn between his orders, his conscience, and his genuine bond with Fei, he ultimately chooses the surface world — but his early secrecy makes him one of the saga's great morally grey figures.",
    tidbit:"Citan is famously overpowered if kept in the party — a sword-wielding, ether-slinging doctor who outclasses much of the cast — a sly mechanical hint that the humble 'village doctor' is anything but.",
    portrait:{ skin:"#e8c096", hair:"#1c1814", style:"neat", eyes:"#3a2e2e", clothes:"#2a3a3a", acc:["glasses","ponytail"] } },

  { id:"bart", name:"Bartholomew Fatima", short:"Bart", keys:["Bart"], faction:"party", role:"Pirate prince of Aveh",
    personality:"Brash, hot-blooded and theatrical, Bart leads with bravado and a whip in hand. Beneath the swashbuckling is a dispossessed prince carrying real responsibility for his people.",
    bio:"The eyepatched 'Wildcat' — exiled prince of the desert kingdom Aveh and captain of the land-cruiser Yggdrasil, waging a rebel war to reclaim his throne.",
    tidbit:"Bart's land-battleship Yggdrasil sails the desert sands like a sea — one of Xenogears' striking images — and his royal blood ties him to the secret history of Aveh and the Fatima dynasty's guardianship of an ancient relic.",
    portrait:{ skin:"#e8c096", hair:"#e8c14a", style:"messy", eyes:"#5a86c8", clothes:"#6a4a2a", acc:["eyepatch"] } },

  { id:"billy", name:"Billy Lee Black", short:"Billy", keys:["Billy"], faction:"party", role:"Etone of the Ethos",
    personality:"Devout, gentle and burdened, Billy is a soft-spoken young man who shoulders impossible duties — caring for orphans while serving a church he comes to distrust. Quietly courageous and deeply principled.",
    bio:"A young gunman and 'Etone' (holy exorcist) of the Ethos church, who supports an orphanage and uncovers the rot at the heart of his own faith.",
    spoilerBio:"Billy's faith is shattered when he learns the Ethos is a front for Solaris, recovering and hoarding Gears and machinery rather than serving the people. His arc is the loss — and quiet rebuilding — of belief.",
    tidbit:"Billy dual-wields handguns at a time when the cast mostly punches and swords things — and his tragic family (an estranged father, a lost mother, and the children he protects) gives Xenogears one of its most grounded subplots.",
    portrait:{ skin:"#f0caa0", hair:"#d8d2e0", style:"long", eyes:"#5a86c8", clothes:"#cfd2d4" } },

  { id:"rico", name:"Rico Banderas", short:"Rico", keys:["Rico"], faction:"party", role:"Champion of the Kislev arena",
    personality:"Gruff, proud and slow to trust, Rico has armored himself in strength after a lifetime of being treated as less than human. Beneath the brawler is a lonely man hungry for belonging and recognition.",
    bio:"The undefeated 'Battling' champion of the Kislev empire's Gear-fighting arena, a powerful demi-human with a hidden royal lineage.",
    spoilerBio:"Rico is the illegitimate son of the Kislev Kaiser, cast out for being a demi-human — a child of the underclass Xenogears uses to indict its world's bigotry. His search for a father who rejected him drives much of his story.",
    tidbit:"Rico belongs to the 'demi-humans,' a persecuted underclass in Xenogears' rigidly stratified society — the game repeatedly uses its sci-fi setting to examine prejudice, class, and who gets counted as a 'person.'",
    portrait:{ skin:"#7a93a0", hair:"#1c1c22", style:"bald", eyes:"#d6443a", glow:true, clothes:"#4a3a3a", acc:["scar"] } },

  { id:"emeralda", name:"Emeralda", keys:["Emeralda"], faction:"party", role:"Nanomachine being of Zeboim",
    personality:"Childlike, curious and learning to be a person, Emeralda meets the world with the wonder (and bluntness) of someone seeing it for the first time — though she is, in truth, far older than anyone in the party.",
    bio:"A being of living nanomachines who can reshape her body at will, awakened after thousands of years and joining Fei's group as a young girl.",
    spoilerBio:"Emeralda was created in the ancient Zeboim civilization by the scientist Kim Kasim and the woman he loved — past incarnations of Fei and Elly — as a 'child.' Her existence makes her a living link between the present and a love that has spanned ages.",
    tidbit:"Emeralda is made of green nanomachines and can morph her body into weapons and grow to adult form — and her origin quietly reveals that Fei and Elly's bond produced a 'daughter' thousands of years before they were born as Fei and Elly.",
    portrait:{ skin:"#8ad0a0", hair:"#5ab080", style:"short", eyes:"#3a9e6a", clothes:"#3a5a4a" } },

  { id:"chuchu", name:"Chu-Chu", keys:["Chu-Chu","Chu"], faction:"party", role:"Companion creature",
    personality:"Excitable, devoted and comically dramatic, Chu-Chu is the heart-on-sleeve mascot of the group — small, fluffy, and far braver than her size suggests.",
    bio:"A small creature who attaches herself to the party, capable of growing to enormous size to fight when her friends are in danger.",
    tidbit:"Chu-Chu provides Xenogears' comic relief, but her ability to balloon into a giant kaiju-sized fighter for one late battle is one of the game's most beloved tonal whiplashes.",
    portrait:{ style:"chuchu", clothes:"#e8a8b8" } },

  { id:"maria", name:"Maria Balthasar", short:"Maria", keys:["Maria"], faction:"party", role:"Pilot of Seibzehn",
    personality:"Sweet, brave and steadfast, Maria is a kind young girl thrust into war who pilots a towering Gear out of love for the family it represents. Gentle but unshakable when those she cares for are threatened.",
    bio:"A young girl who pilots the giant ancient Gear Seibzehn, originally built by her father, and allies with Shevat against Solaris.",
    spoilerBio:"Maria is the daughter of Balthasar, one of the immortal Three Sages; Seibzehn is bound to her by her father's love. Her arc ties the party to the deep history of the floating nations and the engineers who shaped the war.",
    tidbit:"Maria's Gear, Seibzehn ('seventeen' in German), is a hulking, antique-looking machine — Xenogears loves naming Gears after numbers and concepts in German and Hebrew, reinforcing its dense layering of myth and machine.",
    portrait:{ skin:"#f0caa0", hair:"#3a2e26", style:"braid", eyes:"#5a4636", clothes:"#4a4a6a" } },

  { id:"sigurd", name:"Sigurd Harcourt", short:"Sigurd", keys:["Sigurd"], faction:"party", role:"First mate of the Yggdrasil",
    personality:"Calm, capable and quietly authoritative, Sigurd is the steady hand behind Bart's bravado — the older-brother figure who keeps the rebellion (and the ship) running.",
    bio:"The composed first mate of the Yggdrasil and Bart's most trusted lieutenant, with a past tied to Solaris.",
    spoilerBio:"Sigurd is Bart's half-brother, and a half-Solarian who escaped the empire's underclass — his hidden heritage links the Aveh royal line to Solaris itself.",
    tidbit:"Sigurd's measured competence makes him the de facto adult in the room aboard the Yggdrasil — and his quiet backstory is one of many threads tying the surface 'Lambs' to the floating empire that farms them.",
    portrait:{ skin:"#6e4a35", hair:"#1c1c22", style:"bald", eyes:"#3a2e2e", clothes:"#3a3a4a", acc:["shades"] } },

  { id:"margie", name:"Marguerite", short:"Margie", keys:["Margie","Marguerite"], faction:"shevat", role:"Holy Mother of Nisan",
    personality:"Devout, warm and braver than her years, Margie carries the weight of a faith and a people on young shoulders, leading with sincerity rather than authority.",
    bio:"The young Holy Mother (pope) of the Nisan Sect, Bart's cousin, and a steadfast spiritual leader in the war against Solaris.",
    tidbit:"The Nisan Sect — founded on the legacy of the martyred Holy Mother Sophia — is Xenogears' 'good' religion, deliberately contrasted with the corrupt, Solaris-controlled Ethos church.",
    portrait:{ skin:"#f0caa0", hair:"#c87a8a", style:"long", eyes:"#5a4636", clothes:"#c83a5a" } },

  { id:"zephyr", name:"Queen Zephyr", short:"Zephyr", keys:["Zephyr"], faction:"shevat", role:"Ruler of Shevat",
    personality:"Stately, wise and resolute, Zephyr bears the long memory of a nation that has resisted Solaris for ages, guiding the last free sky-city with quiet steel.",
    bio:"The queen of Shevat, the floating city that has defied the empire of Solaris since ancient times and shelters the resistance.",
    tidbit:"Shevat is the airborne counterweight to Solaris — a flying city of the 'good' descendants of the old world, named (like much of Xenogears) for a Hebrew month and steeped in the game's Kabbalistic symbolism.",
    portrait:{ skin:"#e8c8a0", hair:"#cfcabc", style:"long", eyes:"#4a3a4a", clothes:"#3a5a5a" } },

  { id:"dan", name:"Dan", keys:["Dan"], faction:"ally", role:"Fei's friend from Lahan",
    personality:"Earnest and hot-headed, Dan is a young man hardened by tragedy into a grudge — chasing the strength to avenge his ruined home, even when it points him at a friend.",
    bio:"Fei's energetic young friend from Lahan and the brother of Alice, who blames Fei for the village's destruction and sets out to grow strong.",
    tidbit:"Dan's resentment of Fei after Lahan's destruction is one of Xenogears' quiet gut-punches — the hero's amnesiac innocence doesn't spare the people his other self hurt.",
    portrait:{ skin:"#e8c096", hair:"#5a4030", style:"short", eyes:"#5a4636", clothes:"#5a6a4a" } },

  { id:"khan", name:"Khan Wong / Wiseman", short:"Khan", keys:["Khan","Wiseman"], faction:"ally", role:"Fei's father · the masked Wiseman",
    personality:"Grave and self-sacrificing, Khan fights a war inside his own body, surfacing as the cryptic, masked 'Wiseman' to aid his son against the darkness that wears his face.",
    bio:"A mysterious masked warrior called Wiseman who appears to guide Fei — and, in truth, Fei's own father.",
    spoilerBio:"Khan Wong, Fei's father, has been possessed by Grahf — the will of Lacan, Fei's past incarnation. As 'Wiseman', Khan fights for control of his body to protect his son, making him both ally and the vessel of an enemy.",
    tidbit:"The reveal that the helpful 'Wiseman' and the villainous 'Grahf' share the same body — Fei's father — is one of Xenogears' signature identity twists, folding family tragedy into its reincarnation mythos.",
    portrait:{ skin:"#d8b48c", hair:"#3a342e", style:"neat", eyes:"#3a2e2e", clothes:"#2a2a3a", acc:["beard"] } },

  /* ---------- DEUS & THE MINISTRY ---------- */
  { id:"krelian", name:"Krelian", keys:["Krelian","Karellen"], faction:"ministry", role:"Scientist-priest · architect of God's return",
    personality:"Soft-spoken, brilliant and utterly resolved, Krelian pursues a terrible mercy with the calm of a man past doubt. His coldness is grief refined into purpose — he would dissolve the whole world to end its pain.",
    bio:"The genius scientist and former priest behind Solaris's deepest projects, who seeks to resurrect God and reunite all of humanity within it.",
    background:[
      "Krelian was once a devout man of Nisan who loved the Holy Mother Sophia. When she sacrificed herself in the war five centuries past, his faith curdled into something colder: a conviction that a world where such loss is possible is a world that should be remade.",
      "Across lifetimes of research he becomes Solaris's chief scientist, pioneering nanotechnology, the Gears, and the means to manipulate the human soul. His goal is not conquest but transcendence — to awaken Deus, the slumbering 'God', and merge every human heart into a single, painless divine whole.",
      "He is the rare antagonist whose monstrous plan is born entirely of love and loss — and whose final reckoning is less a defeat than a question about grief, godhood, and whether suffering is the price of being a self at all."
    ],
    bgSpoiler:true,
    tidbit:"Krelian (Karellen in the Japanese script) takes his name from the alien overseer in Arthur C. Clarke's 'Childhood's End' — fitting for a man orchestrating humanity's forced ascension into a single collective being.",
    portrait:{ skin:"#ecdcd0", hair:"#d8d2e0", style:"long", eyes:"#6a6ca8", clothes:"#cfd2d4" } },

  { id:"grahf", name:"Grahf", keys:["Grahf"], faction:"ministry", role:"Seeker of Power",
    personality:"Booming, grandiose and seductive, Grahf preys on pain and ambition, forever offering 'power' as the answer to suffering. A force of ruinous will that has refused, for centuries, to die.",
    bio:"A caped, masked figure of immense strength who haunts Fei, urging him toward power and destruction.",
    spoilerBio:"Grahf is the surviving will of Lacan — a past incarnation of Fei — who, after losing everything, sought the power of God and became the 'Executioner.' He persists by possessing the body of Khan Wong, Fei's father, making him a dark mirror of Fei's own soul.",
    tidbit:"Grahf is, in essence, Fei fighting a past version of himself: Lacan's despair and lust for power, refusing to reincarnate cleanly, clinging to a stolen body across the centuries.",
    portrait:{ style:"hood", clothes:"#2a1a2a", eyes:"#e23a3a" } },

  { id:"cain", name:"Emperor Cain", short:"Cain", keys:["Cain"], faction:"ministry", role:"Immortal ruler of Solaris",
    personality:"Weary, gentle and sorrowful, Cain is an immortal who has watched humanity suffer for ten thousand years and quietly longs to set it free — a 'tyrant' far kinder than the system he sits atop.",
    bio:"The undying emperor of Solaris, one of the first humans, who has ruled the floating empire since the dawn of recorded history.",
    spoilerBio:"Cain and Miang are the original man and woman, created by Deus to shepherd humanity until the 'God' could be revived. Unlike Miang and the Ministry, Cain comes to pity the people he was made to manage — and is murdered by his own Ministry for trying to protect them.",
    tidbit:"Cain and Miang are Xenogears' Adam and Eve — the engineered 'first' humans whose names nod to Genesis — created not in a garden but as caretaker-components for a crashed god-weapon.",
    portrait:{ skin:"#ecdcd0", hair:"#cfcabc", style:"long", eyes:"#6a6ca8", clothes:"#4a3a5a" } },

  { id:"miang", name:"Miang", keys:["Miang","Myyah"], faction:"ministry", role:"The immortal Mother",
    personality:"Alluring, patient and pitiless, Miang manipulates from the shadows with the confidence of someone who has done this a thousand times. To her, every person is a tool toward a foreordained end.",
    bio:"A recurring, ageless woman who steers humanity's rulers toward the revival of God, reappearing across every era of history.",
    spoilerBio:"Miang (Myyah) is the immortal 'Mother' counterpart to Cain — a will that survives by possessing a new female host each generation. She exists to ensure Deus is reborn, and is the eternal Antitype's dark opposite: where Elly's soul loves, Miang's manages.",
    tidbit:"Miang's body-hopping immortality means she is, across the game, many different women — and the slow realization that the same ancient will is wearing them all is one of Xenogears' most unsettling reveals.",
    portrait:{ skin:"#e8c8a0", hair:"#2a2026", style:"long", eyes:"#c0506a", glow:true, clothes:"#5a3a4a" } },

  { id:"ramsus", name:"Kahran Ramsus", short:"Ramsus", keys:["Ramsus"], faction:"solaris", role:"Commander of Gebler",
    personality:"Proud, driven and brittle, Ramsus masks a desperate inferiority behind military discipline. His need to prove his worth — to be the one who matters — curdles into obsession.",
    bio:"The cold, gifted commander of Solaris's Gebler forces, who pursues Fei with a personal, near-fanatical hatred.",
    spoilerBio:"Ramsus was engineered as a potential 'Contact' — a vessel for the cycle — but was rejected by the Wave Existence in favor of Fei's soul. His entire identity is the rage of the 'failure' against the 'chosen,' a wound Miang exploits to keep him obedient.",
    tidbit:"Ramsus's obsession with Fei is the resentment of an artificial being made to be special who was passed over — Xenogears repeatedly pairs its heroes with foils who are, in some sense, defective copies of them.",
    portrait:{ skin:"#ecdcd0", hair:"#cfd2d8", style:"messy", eyes:"#5a86c8", clothes:"#3a4a6a" } },

  { id:"elements", name:"The Elements", short:"Elements", keys:["Elements"], faction:"solaris", role:"Ramsus's elite squad",
    personality:"Four loyal, lethal soldiers — playful Seraphita, severe Dominia, sardonic Tolone, and devout Kelvena — bound to Ramsus and the empire above all.",
    bio:"An elite quartet of female Gear pilots who serve as Ramsus's personal guard and Solaris's finest aces.",
    tidbit:"The four Elements (Seraphita, Dominia, Tolone, Kelvena) are named for ranks of angels — part of Xenogears' relentless angelic-and-Kabbalistic naming, where even the empire's soldiers are 'angels' serving a false god.",
    portrait:{ skin:"#f0caa0", hair:"#b06a8a", style:"short", eyes:"#5a86c8", clothes:"#3a4a6a" } },

  { id:"stone", name:"Bishop Stone", short:"Stone", keys:["Stone"], faction:"ethos", role:"Corrupt prelate of the Ethos",
    personality:"Unctuous, ambitious and ruthless, Stone wears piety as a mask over naked self-interest, serving whoever holds true power while preaching to the faithful.",
    bio:"A high-ranking bishop of the Ethos church whose schemes help expose the faith's rotten foundations.",
    tidbit:"Bishop Stone embodies the Ethos's hypocrisy — a 'holy man' who is really an agent of Solaris's machinery-hoarding operation, weaponizing faith to keep the surface world ignorant and dependent.",
    portrait:{ skin:"#d8b48c", hair:"#cfcabc", style:"bald", eyes:"#3a2e2e", clothes:"#c8a45a", acc:["beard"] } },

  { id:"deus", name:"Deus", keys:["Deus"], faction:"ministry", role:"The slumbering 'God'",
    personality:"Not a mind so much as a purpose: an engineered will to consume, reconstitute, and propagate. Deus does not hate — it simply intends to wake, and to use every human soul as its parts.",
    bio:"The colossal 'God' at the center of the world's religions — in truth a dormant interplanetary weapon system whose revival is the goal of the Ministry.",
    spoilerBio:"Deus is a biological invasion weapon that crashed with the starship Eldridge ten thousand years ago. Humanity was grown from its systems as replacement components; every faith, war, and empire has been machinery to regenerate and reawaken it as a 'god.'",
    tidbit:"The central twist of Xenogears is theological sci-fi: 'God' is a weapon, humanity is its spare parts, and salvation means killing the god that made you — a premise so bold it remains one of the most ambitious in the medium.",
    portrait:{ style:"alien", skin:"#a05c8a", hair:"#6a2a5a", eyes:"#d6443a", glow:true, clothes:"#2a1424" } },

  /* ---------- SOULS OF THE PAST ---------- */
  { id:"lacan", name:"Lacan", keys:["Lacan"], faction:"past", role:"The painter · past life of Fei",
    personality:"Sensitive, devoted and ultimately broken, Lacan loved deeply and lost utterly — and chose power over grief, with catastrophic results.",
    bio:"A gifted painter of five centuries ago, a past incarnation of Fei, whose love for the Holy Mother Sophia ended in tragedy.",
    spoilerBio:"When Sophia died in war, Lacan abandoned his art and sought the power of God to bring her back, becoming the 'Executioner' and triggering the Day of Collapse. His will endures, refusing to rest, as Grahf.",
    tidbit:"Lacan's portrait of Sophia, and his fall from artist to destroyer, is the romantic-tragic origin of the entire modern conflict — grief, untamed, echoing down five hundred years.",
    portrait:{ skin:"#e0b48a", hair:"#3a2a22", style:"messy", eyes:"#6a4a2e", clothes:"#5a4a6a" } },

  { id:"kim", name:"Kim Kasim", short:"Kim", keys:["Kim"], faction:"past", role:"Zeboim scientist · past life of Fei",
    personality:"Idealistic, brilliant and warm, Kim believed science could build a kinder world, and poured that hope into a 'child' of nanomachines even as his civilization burned.",
    bio:"A scientist of the ancient Zeboim civilization, a past incarnation of Fei, who created the nanomachine being Emeralda with the woman he loved.",
    spoilerBio:"Kim and his love (an incarnation of Elly) built Emeralda as their daughter before Zeboim destroyed itself in war. Kim's death is one more turn of the wheel that keeps reuniting — and separating — the same two souls.",
    tidbit:"Kim and his partner appear in a flashback so tender and self-contained that many players remember the Zeboim 'date' sequence as one of gaming's earliest genuinely affecting depictions of ordinary domestic love.",
    portrait:{ skin:"#e0b48a", hair:"#241c18", style:"short", eyes:"#6a4a2e", clothes:"#cfd2d4", acc:["glasses"] } },

  { id:"abel", name:"Abel", keys:["Abel"], faction:"past", role:"The first Contact",
    personality:"A frightened, lonely child reaching out for something to hold — and, in reaching, touching God.",
    bio:"A young boy who survived the crash of the Eldridge ten thousand years ago — the first incarnation of Fei, and the original 'Contact' with the Wave Existence.",
    spoilerBio:"In his terror and loneliness aboard the dying Eldridge, the child Abel reached out and made contact with the Wave Existence — the true God — binding that divine power to his soul. Every later incarnation, Fei included, descends from that first desperate connection.",
    tidbit:"Abel's contact with the Wave Existence is the genesis of the whole reincarnation cycle — a single lonely child's cry across ten thousand years, the seed of both humanity's salvation and its long suffering.",
    portrait:{ skin:"#e8c096", hair:"#241c18", style:"short", eyes:"#6a4a2e", clothes:"#6a6a8a" } },

  { id:"sophia", name:"Sophia", keys:["Sophia"], faction:"past", role:"Holy Mother of Nisan · past life of Elly",
    personality:"Selfless, luminous and resolute, Sophia gave herself entirely to her people — a saint whose death set five hundred years of grief in motion.",
    bio:"The beloved Holy Mother of the Nisan Sect five centuries ago, a past incarnation of Elly, who sacrificed herself to protect the faithful.",
    spoilerBio:"Sophia's death in the war broke both Lacan (who became Grahf) and Krelian (who would remake the world rather than endure such loss) — making her martyrdom the shared wound from which the entire modern tragedy grows.",
    tidbit:"'Sophia' means wisdom — and in Gnostic thought, a divine feminine principle — another thread in Xenogears' dense weave of religious symbolism, where the martyred mother becomes the pivot of history.",
    portrait:{ skin:"#f0caa0", hair:"#d8c07a", style:"long", eyes:"#5a86c8", clothes:"#cfd2d4" } },

  { id:"waveexistence", name:"The Wave Existence", short:"Wave Existence", keys:["Wave Existence"], faction:"past", role:"The true God",
    personality:"Vast, gentle and sorrowful, the Wave Existence is an intelligence from beyond, imprisoned and used — longing only to be free of the machine that chains it.",
    bio:"An interdimensional being of pure energy — the genuine 'God' — bound into this reality through the relic known as the Zohar and exploited as a power source.",
    spoilerBio:"The Wave Existence was dragged into our dimension and trapped within the Zohar, its limitless power harnessed to run Deus and the world's machines. It contacted the child Abel long ago, and seeks, through his reincarnations, to finally be released.",
    tidbit:"The 'true God' of Xenogears is a victim, not a tyrant — a being imprisoned and drained to power a false god (Deus). Freeing it, with the ultimate Gear Xenogears, is the literal and spiritual climax of the game.",
    portrait:{ style:"alien", skin:"#e8d6a0", hair:"#caa84a", eyes:"#f0e0a0", glow:true, clothes:"#3a3320" } },

  /* ---------- INDEPENDENT ---------- */
  { id:"sages", name:"The Three Sages", short:"Sages", keys:["Sages","Balthasar","Melchior","Gaspar"], faction:"ally", role:"The immortal wise men",
    personality:"Patient, learned and weary with long life, the three sages guide humanity from the margins, having seen empires rise and fall for millennia.",
    bio:"Balthasar, Melchior, and Gaspar — long-lived survivors of the old world who shepherd knowledge and quietly aid the resistance against Solaris.",
    tidbit:"The Three Sages share the names of the biblical Magi (the three wise men) — and one of them, Taura Melchior, is closely tied to the engineers and scientists, including Citan, who shape the war from behind the scenes.",
    portrait:{ skin:"#d8b48c", hair:"#cfcabc", style:"elder", eyes:"#4a3a4a", clothes:"#4a4a6a", acc:["beard"] } },

  { id:"maison", name:"Maison", keys:["Maison"], faction:"ally", role:"Steward of the Yggdrasil",
    personality:"Impeccable, unflappable and quietly devoted, Maison keeps order aboard a pirate warship with the poise of a born butler.",
    bio:"The loyal steward of the Fatima family who serves aboard Bart's land-cruiser, the steady backbone of its crew.",
    tidbit:"Maison's prim butler routine aboard a desert battleship of pirates is a running source of warmth and comedy — the unflappable servant keeping a rebellion's teacups in order.",
    portrait:{ skin:"#e0c0a0", hair:"#cfcabc", style:"neat", eyes:"#4a3a3a", clothes:"#2a2a3a", acc:["mustache"] } },

  { id:"hammer", name:"Hammer", keys:["Hammer"], faction:"ally", role:"Demi-human opportunist",
    personality:"Eager, anxious and self-serving, Hammer wants nothing more than to climb out of the underclass — and isn't above selling out his friends to do it.",
    bio:"A nervous demi-human who attaches himself to the party as a helper, driven by a desperate hunger for status and security.",
    spoilerBio:"Hammer's longing to escape demi-human poverty leads him to betray the party to Solaris in exchange for 'human' status — a small, sad illustration of how the world's bigotry corrupts its victims.",
    tidbit:"Hammer's betrayal isn't villainy so much as the despair of an underclass character offered the one thing he's been denied — dignity — at the price of his friends. Xenogears rarely lets its world's cruelty off the hook.",
    portrait:{ skin:"#9a8a6a", hair:"#3a2e22", style:"short", eyes:"#5a4636", clothes:"#5a5a3a" } },
];

// relationship types (Xenogears)
const RTYPE = {
  love:   { stroke:"#e87a98", icon:"♥", label:"love",   dash:"" },
  bond:   { stroke:"#5aa6c8", icon:"✦", label:"bond",   dash:"" },
  family: { stroke:"#d8b24a", icon:"⛓", label:"family", dash:"" },
  soul:   { stroke:"#9a6cff", icon:"◈", label:"same soul", dash:"3 4" },
  enemy:  { stroke:"#d6443a", icon:"⚔", label:"enmity", dash:"4 5" },
};

/* [from, to, type, label?, spoilerTrue?] — spoiler ties hidden until unsealed.
   "soul" = reincarnation / shared soul / possession across lifetimes. */
const RELATIONS = [
  // the company
  ["fei","elly","love","across lifetimes"],
  ["fei","citan","bond","guide"],
  ["fei","bart","bond","comrades"],
  ["fei","billy","bond","comrades"],
  ["fei","rico","bond","comrades"],
  ["fei","emeralda","bond","protects"],
  ["fei","chuchu","bond","companion"],
  ["fei","dan","bond","Lahan friends"],
  ["bart","sigurd","family","half-brothers"],
  ["bart","margie","family","cousins"],
  ["bart","maison","bond","loyal steward"],
  ["maria","sages","family","Balthasar's daughter"],
  ["maria","citan","bond","Shevat allies"],
  ["margie","zephyr","bond","Shevat & Nisan"],
  ["emeralda","elly","bond","her 'parents'"],
  ["billy","stone","enemy","corrupt church"],
  ["hammer","fei","bond","joins the party"],
  ["khan","fei","bond","the masked Wiseman"],
  // the souls of the past (cluster)
  ["lacan","sophia","love","the painter & the saint"],
  ["kim","emeralda","family","created her"],
  ["abel","waveexistence","bond","the Contact"],
  ["waveexistence","deus","enemy","imprisoned by"],
  // ministry / solaris
  ["krelian","deus","bond","would revive it"],
  ["cain","miang","bond","first man & woman"],
  ["miang","ramsus","bond","manipulates"],
  ["ramsus","elements","bond","his squad"],
  ["grahf","id","bond","awakens him"],
  // enmities
  ["fei","grahf","enemy","the Seeker of Power"],
  ["fei","ramsus","enemy","obsessed rival"],
  ["fei","deus","enemy","the false god"],
  ["fei","krelian","enemy","God's architect"],
  ["bart","ramsus","enemy","rebellion vs empire"],
  // ---- spoiler ties ----
  ["fei","id","soul","his shadow self", true],
  ["fei","abel","soul","first incarnation", true],
  ["fei","lacan","soul","past incarnation", true],
  ["fei","kim","soul","past incarnation", true],
  ["elly","sophia","soul","past incarnation", true],
  ["elly","miang","soul","Antitype & Type", true],
  ["grahf","lacan","soul","Lacan's will", true],
  ["grahf","khan","soul","possesses him", true],
  ["khan","fei","family","father", true],
  ["citan","cain","bond","Solaris agent", true],
  ["ramsus","cain","soul","failed copy", true],
  ["krelian","sophia","love","loved her", true],
  ["cain","deus","family","made by Deus", true],
  ["miang","deus","family","made by Deus", true],
  ["sophia","margie","bond","Nisan's founder", true],
];

const EVENTS = [
  // ---- The Lost Era ----
  { era:"The Lost Era", entry:"The Lost Era", yr:"~10,000 yrs ago", title:"The Fall of the Eldridge", art:"eldridge",
    blurb:"A vast colony starship, the Eldridge, carries a dormant interplanetary weapon called Deus. When the weapon begins to activate, the crew scuttles the ship — and it crashes onto a remote world, scattering its god across the planet.",
    detail:"Rather than let Deus seize control, the Eldridge's captain orders the ship destroyed, and it falls to an unnamed planet below. Among the few survivors is a lonely child, Abel, who in his terror reaches out and makes 'contact' with the Wave Existence — the true God, trapped within the relic Zohar that powered the weapon. That single connection seeds the reincarnation cycle that will span ten thousand years." },
  { era:"The Lost Era", entry:"The Lost Era", yr:"~10,000 yrs ago", title:"The Making of Humanity", art:"genesis",
    blurb:"To regenerate itself, the crippled Deus grows a new species from its own biology: humanity — the 'Lambs.' Two engineered caretakers, the immortal Cain and Miang, are left to shepherd them until God can wake again.",
    detail:"Humanity is not the planet's children but Deus's spare parts — a self-renewing reservoir of components and energy meant to one day rebuild and reawaken the weapon as a 'god.' Cain and Miang, the first man and woman, are tasked with managing this herd across the ages. Every later empire, faith, and war is, at root, machinery tending the harvest." },

  // ---- Zeboim ----
  { era:"Zeboim", entry:"Zeboim", yr:"~4,000 yrs ago", title:"Zeboim & the Birth of Emeralda", art:"zeboim",
    blurb:"Humanity climbs to a brilliant technological height in the civilization of Zeboim — where the scientist Kim Kasim and the woman he loves create a nanomachine 'child', Emeralda — before the age ends in self-inflicted ruin.",
    detail:"Kim (a past incarnation of Fei) and his love (an incarnation of Elly) build Emeralda from living nanomachines as the child they cannot otherwise have. But Zeboim, like every advanced age before it, destroys itself in war, and Emeralda is sealed away to sleep for millennia — a living memory of two souls who keep finding, and losing, each other." },

  // ---- Age of Solaris ----
  { era:"Age of Solaris", entry:"Age of Solaris", yr:"the long age", title:"Solaris Ascendant", art:"solaris",
    blurb:"The floating empire of Solaris rises above the clouds to secretly rule the surface 'Lambs,' farming them for resources and souls while the sky-city of Shevat stands as the last free holdout.",
    detail:"Hidden in the sky, Solaris engineers the surface nations' endless wars, harvests their populations, and rations technology through the puppet church of the Ethos — all to keep humanity productive and ignorant. Only Shevat, the rival flying city, resists. To the people below, Solaris is a rumor; to Solaris, the people below are livestock." },
  { era:"Age of Solaris", entry:"Age of Solaris", yr:"the long age", title:"The Gazel Ministry", art:"ministry",
    blurb:"Solaris's true rulers are the Gazel Ministry — the disembodied minds of the old world's elite, wired into a network and obsessed with one purpose: the resurrection of God.",
    detail:"The Ministry are the original survivors of the Eldridge's leadership, their consciousnesses preserved and arranged like nodes on a sephirotic tree, ruling through Emperor Cain as a figurehead. They tolerate no deviation from the plan to revive Deus — and will discard even Cain himself the moment his conscience makes him an obstacle." },

  // ---- The Collapse ----
  { era:"The Collapse", entry:"The Collapse", yr:"~500 yrs ago", title:"Lacan, Sophia & the Day of Collapse", spoiler:true, art:"collapse",
    blurb:"Five centuries ago the painter Lacan loses his love, the Holy Mother Sophia, in war. In his grief he seeks the power of God — and the catastrophe that follows, the 'Day of Collapse,' devastates the world.",
    detail:"Sophia (a past life of Elly) sacrifices herself to shield her people; Lacan (a past life of Fei) cannot bear it. Abandoning his art, he reaches for divine power to undo death and becomes the 'Executioner.' The resulting disaster shatters nations and begins the modern dark age — and Lacan's refusal to let go becomes the immortal will called Grahf. The same loss curdles the priest Krelian into the man who will try to end suffering by ending the self." },
  { era:"The Collapse", entry:"The Collapse", yr:"since the Collapse", title:"Grahf, the Seeker of Power", spoiler:true, art:"grahf",
    blurb:"Lacan's despair refuses to die. As the masked 'Seeker of Power' Grahf, his will endures by possessing the body of Khan Wong — and he stalks the new Contact, Fei, whispering that power is the only answer to pain.",
    detail:"Grahf is Fei's own past self, unwilling to reincarnate cleanly and clinging to a stolen body across the centuries. He possesses Khan Wong — Fei's father — who fights back from within as the helpful 'Wiseman.' Grahf's goal is to claim the Contact's connection to God for himself, making Fei's central enemy a literal echo of his own buried grief." },

  // ---- Aveh & Kislev ----
  { era:"Aveh & Kislev", entry:"Aveh & Kislev", yr:"the present", title:"The Endless War", art:"war",
    blurb:"On the surface, the desert kingdom of Aveh and the empire of Kislev wage a centuries-long war, secretly armed and prolonged by Solaris to cull and harvest humanity. Aveh's rightful king is overthrown by a Solaris puppet.",
    detail:"Solaris feeds both sides Gears and reasons to keep fighting, treating the carnage as routine maintenance of the herd. When Aveh's king is deposed by the Solaris-backed Shakhan, the young prince Bart is driven into exile to lead a rebellion — one of countless surface struggles that Solaris has quietly stage-managed for generations." },

  // ---- Disc One ----
  { era:"Disc One", entry:"Disc One", yr:"Year 0", title:"The Destruction of Lahan", art:"lahan",
    blurb:"When a Gear battle spills into the remote village of Lahan, the amnesiac Fei climbs into an abandoned Gear to defend his home — and his buried second self, Id, awakens and annihilates the village instead.",
    detail:"Fei has lived three quiet years in Lahan with no memory of his past. The invading Gears force him into the cockpit of Weltall, but the trauma triggers Id, who erupts with monstrous power and levels Lahan, killing many Fei loved. Branded a destroyer and consumed with guilt, Fei flees with the village doctor Citan — the journey, and the unraveling of his own mind, begins." },
  { era:"Disc One", entry:"Disc One", yr:"Year 0", title:"The Yggdrasil & the Sky Pirate", art:"yggdrasil",
    blurb:"Fei and Citan fall in with Bart, the exiled prince of Aveh, and his desert land-cruiser the Yggdrasil — and a band of companions begins to form across the warring nations.",
    detail:"Aboard the sand-sailing battleship Yggdrasil, Fei is swept into Bart's rebellion against the Solaris-backed regime. Across Aveh, Kislev, and the holy land of Nisan the party grows — Billy the gunman-priest, Rico the arena champion, and others — each carrying a thread of the world's hidden history that slowly knots together." },
  { era:"Disc One", entry:"Disc One", yr:"Year 0", title:"The Meeting of Souls", art:"reunion",
    blurb:"Fei encounters Elly, an officer of Solaris — and despite standing on opposite sides, the two feel an inexplicable, overwhelming pull, the latest meeting of souls that have loved each other for ten thousand years.",
    detail:"Their bond makes no rational sense to either of them, and that's the point: Fei and Elly are reincarnated counterparts — the Contact and the Antitype — who have found and lost one another across Abel, Lacan and Sophia, Kim and his love, life after life. Elly's growing horror at what Solaris does to the surface, and her pull toward Fei, set her on the path to defection." },
  { era:"Disc One", entry:"Disc One", yr:"Year 0", title:"The Ethos Exposed", spoiler:true, art:"ethos",
    blurb:"The party uncovers the secret behind the benevolent Ethos church: it is a tool of Solaris, hoarding ancient Gears and machinery and keeping the surface world dependent and ignorant. Billy's faith is shattered.",
    detail:"Beneath the cathedrals and charity, the Ethos exists to recover the old world's technology for Solaris and to police what the 'Lambs' are allowed to know. The reveal devastates Billy, an Etone who gave his life to the church, and exposes how thoroughly the surface's institutions — even its faith — serve the empire that farms them." },
  { era:"Disc One", entry:"Disc One", yr:"Year 0", title:"The Fall of Solaris", spoiler:true, art:"solarisfall",
    blurb:"The party ascends into the floating empire itself and lays its horrors bare — the processing of surface humans, the truth of Emperor Cain — before Solaris is thrown into chaos and begins to fall.",
    detail:"Inside Solaris, the heroes witness the industrial cruelty of the harvest and confront the empire's leadership. The gentle Emperor Cain, who had come to pity humanity, is murdered by his own Gazel Ministry for standing in the way of God's revival. With its figurehead dead and its secrets exposed, the empire of the sky collapses — but Krelian's true work is only beginning." },

  // ---- Disc Two ----
  { era:"Disc Two", entry:"Disc Two", yr:"Year 0", title:"Krelian's Design", spoiler:true, art:"krelian",
    blurb:"The real architect steps forward: Krelian, who since Sophia's death five centuries ago has sought to revive God and dissolve all human souls into a single, painless divine whole — an end to suffering, and to the self.",
    detail:"Krelian's plan is not conquest but transcendence born of grief: by awakening Deus and merging every human heart into it, he would abolish the loneliness and loss that destroyed him. The Ministry and the immortal Miang share his goal for their own reasons. Xenogears' antagonist is, in the end, a man trying to perform mercy by erasing the very thing that makes mercy mean anything." },
  { era:"Disc Two", entry:"Disc Two", yr:"Year 0", title:"The Truth of Id", spoiler:true, art:"idtruth",
    blurb:"Fei finally confronts the fracture at his core — the gentle persona, the destructive Id, and the buried original self — and the chain of past lives whose unhealed pain he has been carrying all along.",
    detail:"Fei's amnesia and his three selves trace back to childhood trauma inflicted in the name of the cycle: a self split apart to survive. To stand against Deus he must stop fighting Id and instead reclaim him, integrating every fractured piece — and, with them, the grief of Abel, Lacan, and Kim. The battle for the world is, first, a battle to become a whole person." },
  { era:"Disc Two", entry:"Disc Two", yr:"Year 0", title:"The Awakening of Deus", spoiler:true, art:"deus",
    blurb:"Krelian completes his work and Deus stirs — the colossal god-weapon rising to consume humanity as its components and be reborn as a true god over a unified, soul-merged world.",
    detail:"With the Ministry's plan fulfilled, the dormant weapon at the heart of every religion begins to wake, drawing the 'Lambs' toward absorption. Ten thousand years of harvested wars and engineered faiths converge on this moment: the harvest, finally, being reaped. Only the Contact — and the true God still imprisoned in the Zohar — stand against it." },
  { era:"Disc Two", entry:"Disc Two", yr:"Year 0", title:"Xenogears & the Wave Existence", spoiler:true, art:"waveexistence",
    blurb:"Fei's Gear transforms into the ultimate machine, Xenogears, and he frees the true God — the Wave Existence — from the Zohar that imprisoned it, turning the universe's own power against the false god Deus.",
    detail:"The relic Zohar has, for ten thousand years, chained an interdimensional being (the Wave Existence — the genuine God) and drained its limitless power to run Deus and the world's machines. Reaching it through the cycle that began with Abel, Fei releases the Wave Existence at last. With its blessing and the all-powerful Gear Xenogears, the Contact confronts the weapon that made humanity as parts." },
  { era:"Disc Two", entry:"Disc Two", yr:"Year 0", title:"The End of the Cycle", spoiler:true, art:"endcycle",
    blurb:"Deus is destroyed and the false god's machinery falls silent. The floating empires drop from the sky, the harvest ends, and humanity — for the first time in ten thousand years — is free to be itself.",
    detail:"With the weapon dead and the Wave Existence released, the systems that managed humanity collapse: Solaris falls, the cycle of harvested souls breaks, and Miang's eternal will finally meets its end. Fei and Elly — two souls who have reached for each other across countless lifetimes — at last face an ordinary, unwritten future, no longer parts of someone else's god." },
];

const COMPENDIUM = [
  /* ===== The Divine & the Machine ===== */
  { cat:"The Divine & the Machine", sigil:"☉", title:"Deus", color:"#c0506a",
    body:"The 'God' at the center of the world's faiths — in truth an interplanetary biological weapon that crashed with the starship Eldridge. Humanity was grown as its replacement parts, and its revival is the goal of the Ministry." },
  { cat:"The Divine & the Machine", sigil:"◆", title:"The Zohar", color:"#d8a23a",
    body:"A monolithic relic that serves as the engine of Deus and the world's machines. It is the prison and power-tap of the Wave Existence — the true God — whose boundless energy it siphons across dimensions." },
  { cat:"The Divine & the Machine", sigil:"❂", title:"The Wave Existence", color:"#9a6cff",
    body:"An interdimensional being of pure energy — the genuine God — dragged into this reality and bound within the Zohar to power a false one. It contacted the child Abel long ago and longs, through his reincarnations, to be freed." },
  { cat:"The Divine & the Machine", sigil:"⚙", title:"Gears", color:"#d8b24a",
    body:"The towering humanoid war machines that give Xenogears its name. Salvaged from the old world or built anew, they are piloted by the cast in nearly every major battle — and the ultimate Gear, Xenogears itself, is the key to freeing God." },
  { cat:"The Divine & the Machine", sigil:"✶", title:"Ether", color:"#5aa6c8",
    body:"The setting's term for psychic and magical power — the ability to manipulate energy with the mind. Channeled by people and amplified by Gears, Ether is the 'magic' of a world where faith, science, and the soul are the same study." },

  /* ===== Powers & Peoples ===== */
  { cat:"Powers & Peoples", sigil:"☁", title:"Solaris", color:"#6a8fb8",
    body:"The hidden empire in the sky that secretly rules the surface world, farming the 'Lambs' for resources and souls. Ruled in name by Emperor Cain and in truth by the Gazel Ministry, all toward reviving God." },
  { cat:"Powers & Peoples", sigil:"❖", title:"Shevat", color:"#4fc8c0",
    body:"The other floating city — the last free nation, a remnant of the old world that has resisted Solaris since ancient times and shelters those who would defy the harvest." },
  { cat:"Powers & Peoples", sigil:"✝", title:"The Ethos", color:"#c8a45a",
    body:"The dominant church of the surface world, outwardly charitable — and secretly a tool of Solaris, recovering ancient technology and rationing knowledge to keep humanity dependent and ignorant." },
  { cat:"Powers & Peoples", sigil:"♰", title:"The Nisan Sect", color:"#4fc8c0",
    body:"The 'true' faith, founded on the legacy of the martyred Holy Mother Sophia and led by the young Margie. The compassionate counterweight to the corrupt Ethos." },
  { cat:"Powers & Peoples", sigil:"☖", title:"The Gazel Ministry", color:"#c0506a",
    body:"The disembodied minds of the old world's elite, networked together like nodes on a sephirotic tree, who are the true power behind Solaris — fanatically devoted to the resurrection of Deus." },
  { cat:"Powers & Peoples", sigil:"⚖", title:"Lambs & Demi-humans", color:"#9a8a7a",
    body:"'Lambs' is Solaris's term for surface humans — livestock, in their eyes. Below even them are the demi-humans, a persecuted underclass. Xenogears uses its rigid hierarchy to interrogate prejudice and who counts as a person." },

  /* ===== Souls & the Cycle ===== */
  { cat:"Souls & the Cycle", sigil:"↻", title:"Reincarnation", color:"#9a6cff",
    body:"The engine of the saga: certain souls return across millennia, replaying the same struggles and loves. Fei is the latest of Abel, Lacan, and Kim; Elly of Sophia and others — a wheel the world's god depends on, and the heroes must break." },
  { cat:"Souls & the Cycle", sigil:"✺", title:"The Contact", color:"#d8a23a",
    body:"The soul that first touched the Wave Existence — the child Abel — and every incarnation since, carrying that bond to God. Fei is the current Contact, which is why both the true God and the false one converge on him." },
  { cat:"Souls & the Cycle", sigil:"☯", title:"Type & Antitype", color:"#e87a98",
    body:"Two eternal feminine poles tied to the cycle: Miang, the immortal 'Mother' who manages humanity for Deus, and the Antitype — Elly's recurring soul — who loves and defies it. Their opposition runs through every age." },
  { cat:"Souls & the Cycle", sigil:"Ψ", title:"Persona & Id", color:"#d6443a",
    body:"Fei's mind is split, Jungian-style, into the gentle persona, the destructive shadow 'Id', and a buried true self — fractured by childhood trauma. His real victory is not defeating Id but reclaiming and integrating him." },
  { cat:"Souls & the Cycle", sigil:"❤", title:"A Mercy That Erases", color:"#9a6cff",
    body:"Krelian's dream — and the saga's central question — is to end all suffering by dissolving every soul into God: a heaven with no separate selves left to hurt. Xenogears asks whether a love that abolishes the individual is love at all." },
];
