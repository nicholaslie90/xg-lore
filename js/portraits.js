/* ============================================================
   PARAMETRIC VECTOR PORTRAITS
   FFPortrait(p, uid) -> inner SVG markup for a 0..100 viewBox.
   p = character.portrait config:
     { skin, hair, style, eyes, glow?, slit?, clothes, acc[] }
   uid = unique string (avoids gradient/id collisions across many portraits)
   ============================================================ */

function FFPortrait(p, uid) {
  p = p || {};
  const skin = p.skin || "#ecc6a0";
  const hair = p.hair || "#2a2622";
  const eyes = p.eyes || "#4a3a2e";
  const clothes = p.clothes || "#1d2733";
  const style = p.style || "short";
  const glow = !!p.glow;
  const slit = !!p.slit;
  const acc = p.acc || [];
  const id = "p_" + (uid || "x");

  if (style === "alien") return alienFace(p, id);
  if (style === "beast") return beastFace(p, id);
  if (style === "cat") return catFace(p, id);
  if (style === "mouse") return mouseFace(p, id);
  if (style === "duck") return duckFace(p, id);
  if (style === "dog") return dogFace(p, id);
  if (style === "hood") return hoodFace(p, id);
  if (style === "chuchu") return chuFace(p, id);

  const skinShadow = shade(skin, -0.12);
  const hairShadow = shade(hair, -0.18);

  let s = "";

  // ---- background ----
  s += `<circle cx="50" cy="50" r="50" fill="#0c1110"/>`;
  s += `<circle cx="50" cy="58" r="52" fill="${shade(clothes,-0.55)}" opacity="0.5"/>`;
  s += `<ellipse cx="42" cy="30" rx="34" ry="26" fill="#ffffff" opacity="0.04"/>`;

  // ---- back hair (long lengths) ----
  const longish = (style === "long" || style === "braid" || style === "veiled");
  if (longish) {
    s += `<path d="M26 40 Q19 62 24 90 L37 90 Q32 60 34 42 Z" fill="${hairShadow}"/>`;
    s += `<path d="M74 40 Q81 62 76 90 L63 90 Q68 60 66 42 Z" fill="${hairShadow}"/>`;
  }
  if (acc.includes("wing")) s += wing(id);
  if (acc.includes("ponytail")) s += `<path d="M68 34 Q86 40 82 70 Q78 56 70 48 Z" fill="${hairShadow}"/>`;

  // ---- shoulders / clothing ----
  s += `<path d="M16 100 Q18 76 34 70 Q42 78 50 78 Q58 78 66 70 Q82 76 84 100 Z" fill="${clothes}"/>`;
  s += `<path d="M40 72 L60 72 L57 82 Q50 86 43 82 Z" fill="${skinShadow}"/>`; // neck

  // ---- head ----
  s += `<ellipse cx="50" cy="48" rx="19" ry="23" fill="${skin}"/>`;
  s += `<ellipse cx="31" cy="50" rx="3" ry="4.5" fill="${skin}"/>`;
  s += `<ellipse cx="69" cy="50" rx="3" ry="4.5" fill="${skin}"/>`;
  s += `<path d="M31 60 Q50 70 69 60 Q60 68 50 68 Q40 68 31 60 Z" fill="${skinShadow}" opacity="0.5"/>`;

  // ---- face features ----
  s += eyePair(eyes, glow, slit, id);
  s += `<path d="M48 50 Q47 56 50 57" stroke="${skinShadow}" stroke-width="1" fill="none" opacity="0.6"/>`; // nose
  s += `<path d="M44 62 Q50 65 56 62" stroke="${shade(skin,-0.35)}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`; // mouth

  // ---- hair (front) ----
  s += hairFront(style, hair, hairShadow);

  // ---- accessories (front) ----
  if (acc.includes("goggles"))  s += `<g><rect x="30" y="31" width="40" height="6" rx="3" fill="#3a3026"/><circle cx="40" cy="34" r="5" fill="#8fd6ff" opacity="0.8" stroke="#2a2018" stroke-width="1.5"/><circle cx="60" cy="34" r="5" fill="#8fd6ff" opacity="0.8" stroke="#2a2018" stroke-width="1.5"/></g>`;
  if (acc.includes("headband")) s += `<rect x="29" y="36" width="42" height="5" rx="2" fill="${headbandColor(p)}"/>`;
  if (acc.includes("glasses"))  s += `<g stroke="#2a2622" stroke-width="1.4" fill="none"><rect x="37" y="46" width="12" height="9" rx="2" fill="#cfe8ff" fill-opacity="0.25"/><rect x="51" y="46" width="12" height="9" rx="2" fill="#cfe8ff" fill-opacity="0.25"/><path d="M49 50 L51 50"/></g>`;
  if (acc.includes("shades"))   s += `<g><rect x="36" y="46" width="13" height="9" rx="3" fill="#0d0f12"/><rect x="51" y="46" width="13" height="9" rx="3" fill="#0d0f12"/><path d="M49 49 L51 49" stroke="#0d0f12" stroke-width="2"/><path d="M38 47 L46 47" stroke="#5a6b74" stroke-width="1" opacity="0.7"/></g>`;
  if (acc.includes("beard"))    s += `<path d="M33 56 Q34 74 50 78 Q66 74 67 56 Q60 66 50 66 Q40 66 33 56 Z" fill="${hair}"/>`;
  if (acc.includes("mustache")) s += `<path d="M40 60 Q50 64 60 60 Q55 63 50 63 Q45 63 40 60 Z" fill="${hair}"/>`;
  if (acc.includes("bow"))      s += `<g transform="translate(50,26)"><path d="M0 0 L-11 -5 L-11 6 Z" fill="${bowColor(p)}"/><path d="M0 0 L11 -5 L11 6 Z" fill="${bowColor(p)}"/><circle cx="0" cy="0" r="3.2" fill="${shade(bowColor(p),-0.2)}"/></g>`;
  if (acc.includes("scar"))     s += `<path d="M60 44 L64 54" stroke="${shade(skin,-0.4)}" stroke-width="1.3" stroke-linecap="round" opacity="0.8"/>`;
  if (acc.includes("eyepatch")) s += `<g><path d="M52 47 L66 47 L64 56 L54 56 Z" fill="#0d0d12"/><line x1="52" y1="49" x2="33" y2="45" stroke="#0d0d12" stroke-width="1.6"/></g>`;
  if (acc.includes("horns"))    s += `<g fill="#15151c"><path d="M37 30 Q31 13 40 9 Q41 19 45 28 Z"/><path d="M63 30 Q69 13 60 9 Q59 19 55 28 Z"/></g>`;

  return s;
}

/* ---- eyes ---- */
function eyePair(color, glow, slit, id) {
  return eye(42, 50, color, glow, slit, id + "a") + eye(58, 50, color, glow, slit, id + "b");
}
function eye(cx, cy, color, glow, slit, id) {
  let s = `<ellipse cx="${cx}" cy="${cy}" rx="4.4" ry="3.2" fill="#f3efe6"/>`;
  if (glow) s += `<circle cx="${cx}" cy="${cy}" r="4.6" fill="${color}" opacity="0.45"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="2.5" fill="${color}"/>`;
  if (slit) s += `<ellipse cx="${cx}" cy="${cy}" rx="0.9" ry="2.6" fill="#0c0c0c"/>`;
  else s += `<circle cx="${cx}" cy="${cy}" r="1.1" fill="#141414"/>`;
  if (glow) s += `<circle cx="${cx-0.8}" cy="${cy-0.8}" r="0.7" fill="#ffffff" opacity="0.9"/>`;
  // brow
  s += `<path d="M${cx-5} ${cy-5.5} Q${cx} ${cy-7} ${cx+5} ${cy-5.5}" stroke="#0000001a" stroke-width="1" fill="none"/>`;
  return s;
}

/* ---- front hair by style ---- */
function hairFront(style, c, cs) {
  switch (style) {
    case "spiky": case "messy":
      return `<path d="M28 47 L29 27 L36 39 L40 19 L46 35 L50 15 L55 34 L61 20 L67 38 L71 28 L73 47 Q62 38 50 38 Q38 38 28 47 Z" fill="${c}"/>`
        + `<path d="M30 44 L33 33 L38 42 Z" fill="${cs}" opacity="0.6"/>`;
    case "long":
      return `<path d="M27 47 Q25 20 50 18 Q75 20 73 47 Q64 37 53 41 Q50 30 47 41 Q36 37 27 47 Z" fill="${c}"/>`
        + `<path d="M27 47 Q26 34 33 30 L31 47 Z" fill="${cs}" opacity="0.5"/>`;
    case "braid":
      return `<path d="M28 46 Q26 21 50 19 Q74 21 72 46 Q62 36 50 38 Q38 36 28 46 Z" fill="${c}"/>`
        + `<path d="M50 78 Q47 88 50 98 Q53 88 50 78 Z" fill="${c}"/>`
        + `<circle cx="50" cy="84" r="2.4" fill="${cs}"/><circle cx="50" cy="90" r="2.2" fill="${c}"/>`;
    case "neat":
      return `<path d="M28 46 Q26 23 50 20 Q74 23 72 46 Q63 35 51 39 Q50 32 47 39 Q37 36 28 46 Z" fill="${c}"/>`;
    case "slick":
      return `<path d="M29 45 Q27 24 50 21 Q73 24 71 45 Q66 31 50 32 Q34 31 29 45 Z" fill="${c}"/>`
        + `<path d="M34 40 Q50 35 66 40" stroke="${cs}" stroke-width="1" fill="none" opacity="0.6"/>`;
    case "buzz":
      return `<path d="M31 41 Q31 28 50 27 Q69 28 69 41 Q60 35 50 35 Q40 35 31 41 Z" fill="${c}"/>`;
    case "veiled":
      return `<path d="M28 47 Q26 24 50 22 Q74 24 72 47 Q62 37 50 38 Q38 37 28 47 Z" fill="${c}"/>`;
    case "elder":
      return `<path d="M33 38 Q34 30 50 30 Q66 30 67 38 Q60 35 50 35 Q40 35 33 38 Z" fill="${c}" opacity="0.85"/>`
        + `<path d="M33 56 Q33 86 50 92 Q67 86 67 56 Q58 66 50 66 Q42 66 33 56 Z" fill="${c}"/>`;
    case "bald": default:
      return style === "short"
        ? `<path d="M30 45 Q29 26 50 24 Q71 26 70 45 Q60 36 50 37 Q40 36 30 45 Z" fill="${c}"/>`
        : "";
  }
}

/* ---- Sephiroth's single wing ---- */
function wing(id) {
  return `<g opacity="0.92" transform="translate(70,40)">`
    + `<path d="M0 6 Q26 -12 40 2 Q24 4 30 16 Q16 8 20 22 Q8 14 10 28 Q2 18 0 6 Z" fill="#15161b" stroke="#2a2c34" stroke-width="0.6"/>`
    + `<path d="M6 8 Q22 0 33 6" stroke="#3a3d47" stroke-width="0.5" fill="none"/>`
    + `</g>`;
}

/* ---- Jenova (alien) ---- */
function alienFace(p, id) {
  const skin = p.skin || "#c79be0";
  const eyeC = p.eyes || "#e85bff";
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#160a22"/>`;
  s += `<radialGradient id="${id}_g" cx="50%" cy="42%" r="60%"><stop offset="0%" stop-color="${shade(skin,0.15)}"/><stop offset="100%" stop-color="${shade(skin,-0.35)}"/></radialGradient>`;
  // cables/shoulders
  s += `<path d="M18 100 Q24 74 38 70 L62 70 Q76 74 82 100 Z" fill="#241338"/>`;
  for (let i = 0; i < 5; i++) {
    const x = 34 + i * 8;
    s += `<path d="M${x} 72 Q${x-3} 84 ${x+2} 100" stroke="#3a2150" stroke-width="2" fill="none" opacity="0.8"/>`;
  }
  // head — smooth, elongated
  s += `<path d="M50 18 Q72 22 70 52 Q66 74 50 76 Q34 74 30 52 Q28 22 50 18 Z" fill="url(#${id}_g)"/>`;
  // glowing visor / eye band
  s += `<path d="M34 46 Q50 40 66 46 Q50 52 34 46 Z" fill="${eyeC}" opacity="0.9"/>`;
  s += `<ellipse cx="50" cy="46" rx="18" ry="5" fill="${eyeC}" opacity="0.25"/>`;
  s += `<circle cx="42" cy="46" r="1.6" fill="#fff" opacity="0.9"/><circle cx="58" cy="46" r="1.6" fill="#fff" opacity="0.9"/>`;
  // brow ridge + seam
  s += `<path d="M36 38 Q50 33 64 38" stroke="${shade(skin,-0.4)}" stroke-width="1.2" fill="none"/>`;
  s += `<path d="M50 54 L50 68" stroke="${shade(skin,-0.4)}" stroke-width="1" opacity="0.6"/>`;
  return s;
}

/* ---- Red XIII (beast) ---- */
function beastFace(p, id) {
  const fur = p.skin || "#d7572a";
  const mane = p.hair || "#b33d1e";
  const eyeC = p.eyes || "#f0c040";
  const furD = shade(fur, -0.18);
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#1a0e08"/>`;
  // mane / back
  s += `<path d="M22 86 Q14 50 26 30 Q22 50 34 62 Z" fill="${mane}"/>`;
  s += `<path d="M78 86 Q86 50 74 30 Q78 50 66 62 Z" fill="${mane}"/>`;
  s += `<path d="M18 100 Q22 72 40 66 L60 66 Q78 72 82 100 Z" fill="${shade(mane,-0.3)}"/>`;
  // ears
  s += `<path d="M30 30 L26 12 L42 26 Z" fill="${fur}"/><path d="M30 28 L29 18 L37 25 Z" fill="${furD}"/>`;
  s += `<path d="M70 30 L74 12 L58 26 Z" fill="${fur}"/><path d="M70 28 L71 18 L63 25 Z" fill="${furD}"/>`;
  // head + muzzle
  s += `<path d="M50 22 Q70 24 70 48 Q70 62 58 66 Q54 74 50 74 Q46 74 42 66 Q30 62 30 48 Q30 24 50 22 Z" fill="${fur}"/>`;
  s += `<ellipse cx="50" cy="62" rx="12" ry="9" fill="${shade(fur,0.08)}"/>`;
  s += `<ellipse cx="50" cy="58" rx="3.2" ry="2.4" fill="#1c1008"/>`; // nose
  s += `<path d="M50 60 L50 66 M50 66 Q45 69 42 67 M50 66 Q55 69 58 67" stroke="#1c1008" stroke-width="1.2" fill="none"/>`; // muzzle lines
  // eye (right) glowing; left scarred
  s += `<circle cx="60" cy="46" r="4.6" fill="${eyeC}" opacity="0.45"/><circle cx="60" cy="46" r="2.6" fill="${eyeC}"/><circle cx="60" cy="46" r="0.9" fill="#1c1008"/>`;
  s += `<path d="M37 41 L43 51" stroke="#7a2a16" stroke-width="2" stroke-linecap="round"/>`;
  s += `<path d="M38 46 L42 46" stroke="#2a140a" stroke-width="1.4"/>`; // closed/scarred eye
  // headband feather + tattoo hint
  s += `<path d="M46 26 L50 14 L54 26 Z" fill="#e8d2a0"/><path d="M50 14 L50 26" stroke="#b09060" stroke-width="0.8"/>`;
  return s;
}

/* ---- Cait Sith (cat on a moogle, crowned) ---- */
function catFace(p, id) {
  const cape = p.clothes || "#7a1f2a";
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#0c1014"/>`;
  s += `<circle cx="50" cy="94" r="11" fill="#f0d6e0" opacity="0.55"/>`;        // moogle pompom
  s += `<path d="M22 100 Q30 78 50 76 Q70 78 78 100 Z" fill="${cape}"/>`;        // cape
  s += `<path d="M30 38 L25 17 L45 33 Z" fill="#17171d"/><path d="M70 38 L75 17 L55 33 Z" fill="#17171d"/>`;
  s += `<path d="M33 33 L31 23 L41 31 Z" fill="#3a3a46"/><path d="M67 33 L69 23 L59 31 Z" fill="#3a3a46"/>`;
  s += `<ellipse cx="50" cy="51" rx="23" ry="21" fill="#17171d"/>`;              // head
  s += `<ellipse cx="40" cy="49" rx="7.5" ry="9.5" fill="#f3efe6"/><ellipse cx="60" cy="49" rx="7.5" ry="9.5" fill="#f3efe6"/>`;
  s += `<circle cx="41" cy="50" r="3.6" fill="#161616"/><circle cx="59" cy="50" r="3.6" fill="#161616"/>`;
  s += `<circle cx="42.2" cy="48.4" r="1.1" fill="#fff"/><circle cx="60.2" cy="48.4" r="1.1" fill="#fff"/>`;
  s += `<path d="M47.5 59 L52.5 59 L50 62.5 Z" fill="#e2789a"/>`;                 // nose
  s += `<path d="M50 62.5 Q46 65.5 43 63.5 M50 62.5 Q54 65.5 57 63.5" stroke="#3a3a46" stroke-width="1" fill="none"/>`;
  s += `<g stroke="#cfcfd6" stroke-width="0.8" opacity="0.7"><line x1="29" y1="56" x2="18" y2="54"/><line x1="29" y1="59" x2="18" y2="61"/><line x1="71" y1="56" x2="82" y2="54"/><line x1="71" y1="59" x2="82" y2="61"/></g>`;
  s += `<path d="M40 28 L43 19 L46 26 L50 16 L54 26 L57 19 L60 28 Z" fill="#f0c861"/>`; // crown
  s += `<circle cx="50" cy="18" r="1.4" fill="#ff6fae"/>`;
  return s;
}

/* ---- King Mickey (mouse) ---- */
function mouseFace(p, id) {
  const fur = p.hair || "#16161c";
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#0c1018"/>`;
  s += `<circle cx="26" cy="22" r="14" fill="${fur}"/><circle cx="74" cy="22" r="14" fill="${fur}"/>`;
  s += `<path d="M22 100 Q26 80 50 76 Q74 80 78 100 Z" fill="${p.clothes || '#1a1a26'}"/>`;
  s += `<circle cx="50" cy="52" r="22" fill="${fur}"/>`;
  s += `<ellipse cx="50" cy="60" rx="15" ry="11" fill="#e8c4a0"/>`;
  s += `<ellipse cx="50" cy="56" rx="4" ry="3" fill="#1c1008"/>`;
  s += `<path d="M40 62 Q50 70 60 62" stroke="#1c1008" stroke-width="1.4" fill="none"/>`;
  s += `<ellipse cx="43" cy="46" rx="3.5" ry="6" fill="#0c0c0c"/><ellipse cx="57" cy="46" rx="3.5" ry="6" fill="#0c0c0c"/>`;
  return s;
}

/* ---- Donald (duck) ---- */
function duckFace(p, id) {
  const coat = p.clothes || "#2a55a0";
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#0c1018"/>`;
  s += `<path d="M22 100 Q26 80 50 76 Q74 80 78 100 Z" fill="${coat}"/>`;
  s += `<ellipse cx="50" cy="49" rx="20" ry="22" fill="#f3efe6"/>`;
  s += `<path d="M40 59 Q50 53 60 59 Q62 65 50 67 Q38 65 40 59 Z" fill="#f0a82a"/>`;
  s += `<path d="M40 61 Q50 63 60 61" stroke="#c98a1a" stroke-width="1" fill="none"/>`;
  s += `<ellipse cx="44" cy="43" rx="3" ry="5" fill="#0c0c0c"/><ellipse cx="56" cy="43" rx="3" ry="5" fill="#0c0c0c"/>`;
  s += `<circle cx="45" cy="41" r="1" fill="#fff"/><circle cx="57" cy="41" r="1" fill="#fff"/>`;
  s += `<path d="M32 31 Q50 19 68 31 Q66 27 50 25 Q34 27 32 31 Z" fill="${coat}"/>`;
  s += `<rect x="40" y="29" width="20" height="4" fill="${shade(coat,-0.3)}"/>`;
  return s;
}

/* ---- Goofy (dog) ---- */
function dogFace(p, id) {
  const fur = p.skin || "#caa06a";
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#0c1018"/>`;
  s += `<path d="M22 100 Q26 80 50 76 Q74 80 78 100 Z" fill="${p.clothes || '#2a6a3a'}"/>`;
  s += `<ellipse cx="26" cy="56" rx="8" ry="16" fill="#7a5430"/><ellipse cx="74" cy="56" rx="8" ry="16" fill="#7a5430"/>`;
  s += `<ellipse cx="50" cy="46" rx="19" ry="21" fill="${fur}"/>`;
  s += `<ellipse cx="50" cy="62" rx="11" ry="14" fill="${fur}"/>`;
  s += `<ellipse cx="50" cy="70" rx="6" ry="5" fill="#1c1008"/>`;
  s += `<path d="M46 74 L46 80 L52 78 Z" fill="#fff"/>`;
  s += `<ellipse cx="44" cy="42" rx="4" ry="5" fill="#f3efe6"/><ellipse cx="56" cy="42" rx="4" ry="5" fill="#f3efe6"/>`;
  s += `<circle cx="45" cy="43" r="2" fill="#0c0c0c"/><circle cx="57" cy="43" r="2" fill="#0c0c0c"/>`;
  s += `<path d="M36 28 Q50 20 64 28 L62 32 Q50 28 38 32 Z" fill="#3a6a2a"/><rect x="44" y="22" width="12" height="8" rx="2" fill="#5a8a3a"/>`;
  return s;
}

/* ---- hooded figure (Master of Masters / Org coat) ---- */
function hoodFace(p, id) {
  const coat = p.clothes || "#14141c";
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#0a0a10"/>`;
  s += `<path d="M16 100 Q20 74 50 70 Q80 74 84 100 Z" fill="${coat}"/>`;
  s += `<path d="M30 86 Q24 44 50 34 Q76 44 70 86 Z" fill="${shade(coat,0.07)}" stroke="#2a2a36" stroke-width="1"/>`;
  s += `<path d="M38 80 Q34 50 50 44 Q66 50 62 80 Q50 73 38 80 Z" fill="#050507"/>`;
  s += `<circle cx="44" cy="58" r="1.7" fill="${p.eyes || '#5ad6ff'}" opacity="0.85"/><circle cx="56" cy="58" r="1.7" fill="${p.eyes || '#5ad6ff'}" opacity="0.85"/>`;
  return s;
}

/* ---- Chu-Chu (fluffy companion creature) ---- */
function chuFace(p, id) {
  const fur = p.clothes || "#e8a8b8";
  const cream = "#f6ead8";
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#160e14"/>`;
  // big ears
  s += `<ellipse cx="24" cy="34" rx="11" ry="18" fill="${fur}"/><ellipse cx="76" cy="34" rx="11" ry="18" fill="${fur}"/>`;
  s += `<ellipse cx="24" cy="34" rx="5" ry="11" fill="${cream}"/><ellipse cx="76" cy="34" rx="5" ry="11" fill="${cream}"/>`;
  // round body/head
  s += `<circle cx="50" cy="56" r="28" fill="${fur}"/>`;
  s += `<ellipse cx="50" cy="62" rx="18" ry="15" fill="${cream}"/>`;
  // eyes (big, shiny)
  s += `<ellipse cx="40" cy="50" rx="5" ry="7" fill="#1a1014"/><ellipse cx="60" cy="50" rx="5" ry="7" fill="#1a1014"/>`;
  s += `<circle cx="41.6" cy="48" r="1.6" fill="#fff"/><circle cx="61.6" cy="48" r="1.6" fill="#fff"/>`;
  // nose + mouth
  s += `<path d="M47 58 L53 58 L50 61 Z" fill="#b85a72"/>`;
  s += `<path d="M50 61 Q46 65 42 63 M50 61 Q54 65 58 63" stroke="#b85a72" stroke-width="1" fill="none"/>`;
  // cheek blush
  s += `<circle cx="34" cy="60" r="3.4" fill="#f0b0c0" opacity="0.6"/><circle cx="66" cy="60" r="3.4" fill="#f0b0c0" opacity="0.6"/>`;
  return s;
}

/* ---- color helpers ---- */
function shade(hex, amt) {
  let h = (hex || "#000000").replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  let r = parseInt(h.substring(0, 2), 16);
  let g = parseInt(h.substring(2, 4), 16);
  let b = parseInt(h.substring(4, 6), 16);
  const f = (v) => {
    if (amt >= 0) return Math.round(v + (255 - v) * amt);
    return Math.round(v * (1 + amt));
  };
  const to2 = (v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0");
  return "#" + to2(f(r)) + to2(f(g)) + to2(f(b));
}
function headbandColor(p) {
  if (p.eyes === "#e23a3a") return "#9a1c1c";        // Vincent red bandana
  if ((p.clothes || "").includes("2f6f54")) return "#1f4d3a"; // Yuffie
  return "#caa45a";
}
function bowColor(p) { return p.clothes === "#c23a4a" ? "#e85a86" : "#ff7aa8"; }

/* Convenience wrappers ---------------------------------------- */
// Standalone <svg> string (dossier, search results)
function portraitSVG(ch, size, extraClass) {
  const cfg = ch.portrait || {};
  return `<svg class="portrait ${extraClass || ""}" viewBox="0 0 100 100" width="${size}" height="${size}" `
    + `role="img" aria-label="${ch.name}">${FFPortrait(cfg, ch.id)}</svg>`;
}
