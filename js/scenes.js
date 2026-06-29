/* ============================================================
   EVENT ILLUSTRATIONS  (FFScene)  — Xenogears
   FFScene(key) -> inner SVG markup for a 0 0 200 100 banner.
   Flat, atmospheric vector scenes; no gradient <defs>.
   ============================================================ */

function FFScene(key) {
  const sky = (a, b) =>
    `<rect width="200" height="100" fill="${a}"/>` +
    `<rect width="200" height="60" fill="${b}" opacity="0.6"/>`;
  const stars = (n, c) => {
    let s = "";
    const xs = [12,28,47,63,80,96,112,131,148,166,182,193,38,72,121,158];
    const ys = [14,30,9,22,12,28,18,8,24,14,30,12,40,6,34,20];
    for (let i = 0; i < n; i++) s += `<circle cx="${xs[i%xs.length]}" cy="${ys[i%ys.length]}" r="${i%3?0.7:1.1}" fill="${c||'#e8dcc0'}" opacity="0.6"/>`;
    return s;
  };
  const ground = (c, y) => `<path d="M0 ${y} L200 ${y} L200 100 L0 100 Z" fill="${c}"/>`;

  switch (key) {
    case "eldridge":  // the colony ship falls
      return sky("#080610", "#140a1a") + stars(9, "#cdb8e0")
        + `<path d="M0 86 Q100 70 200 86 L200 100 L0 100 Z" fill="#1a0e14"/>`
        + `<g transform="rotate(28 120 40)"><rect x="96" y="34" width="52" height="11" rx="3" fill="#2a2a3a" stroke="#4a4a5a" stroke-width="1"/><rect x="138" y="36" width="14" height="7" fill="#3a3a4a"/></g>`
        + `<line x1="150" y1="20" x2="96" y2="58" stroke="#d6443a" stroke-width="3" opacity="0.8"/>`
        + `<line x1="156" y1="22" x2="104" y2="60" stroke="#f0a84a" stroke-width="1.2" opacity="0.7"/>`
        + `<circle cx="96" cy="58" r="6" fill="#f0a84a"/><circle cx="96" cy="58" r="13" fill="#d6443a" opacity="0.3"/>`;

    case "genesis":  // humanity grown from the machine
      return sky("#0c0a10", "#160e16")
        + ground("#120c10", 80)
        + helix(70, 18, 70, "#d8a23a")
        + `<g fill="#b08a4a" opacity="0.85"><circle cx="130" cy="60" r="3.4"/><path d="M130 64 Q128 76 130 86 M130 70 l-5 6 M130 70 l5 6"/></g>`
        + `<g fill="#b08a4a" opacity="0.55"><circle cx="150" cy="64" r="2.6"/><circle cx="116" cy="66" r="2.6"/></g>`
        + `<ellipse cx="70" cy="52" rx="26" ry="40" fill="#d8a23a" opacity="0.08"/>`;

    case "zeboim":  // the lost high-tech civilization
      return sky("#08121a", "#0e2230") + stars(5, "#bfe")
        + ground("#0a1620", 70)
        + `<g fill="#13283a" stroke="#1c3a4e" stroke-width="0.8"><rect x="24" y="34" width="14" height="36"/><rect x="44" y="24" width="18" height="46"/><rect x="150" y="30" width="16" height="40"/><rect x="172" y="40" width="14" height="30"/></g>`
        + `<g fill="#5ac8c0" opacity="0.85"><rect x="48" y="30" width="10" height="3"/><rect x="153" y="36" width="9" height="3"/></g>`
        + `<g transform="translate(102,58)"><ellipse cx="0" cy="6" rx="9" ry="11" fill="#3a5a4a"/><ellipse cx="0" cy="-2" rx="6" ry="7" fill="#8ad0a0"/></g>`
        + `<g fill="#8ad0a0" opacity="0.7"><circle cx="90" cy="48" r="1"/><circle cx="116" cy="52" r="1"/><circle cx="100" cy="40" r="1"/></g>`;

    case "solaris":  // the empire above the clouds
      return sky("#0c0e1e", "#1a2244") + stars(6, "#cdd")
        + `<circle cx="150" cy="30" r="11" fill="#f0d88a" opacity="0.5"/>`
        + `<g fill="#3a4a6a"><path d="M70 54 L130 54 L116 44 L84 44 Z"/><rect x="86" y="34" width="28" height="12"/><path d="M92 34 L100 22 L108 34 Z"/></g>`
        + `<g fill="#d8a23a" opacity="0.8"><rect x="98" y="26" width="4" height="6"/></g>`
        + `<g fill="#7a86a8" opacity="0.6"><ellipse cx="60" cy="64" rx="30" ry="6"/><ellipse cx="140" cy="68" rx="36" ry="7"/><ellipse cx="100" cy="60" rx="40" ry="6"/></g>`;

    case "ministry":  // the sephirot network of disembodied minds
      return sky("#0a0c16", "#121830")
        + tree("#6a8fb8")
        + `<ellipse cx="100" cy="52" rx="42" ry="40" fill="#6a8fb8" opacity="0.06"/>`;

    case "collapse":  // the Day of Collapse
      return sky("#1a0810", "#34101a") + stars(4, "#e0a")
        + ground("#160810", 72)
        + `<g transform="rotate(-12 96 50)"><rect x="90" y="20" width="14" height="56" fill="#241018" stroke="#4a2028" stroke-width="1"/><rect x="92" y="24" width="10" height="6" fill="#3a1820"/><rect x="92" y="36" width="10" height="6" fill="#3a1820"/></g>`
        + `<g fill="#3a1820"><path d="M120 76 l8 -14 l4 14 Z"/><path d="M40 76 l6 -10 l6 10 Z"/></g>`
        + `<path d="M96 60 Q95 50 100 46 Q105 50 104 60 Z" fill="#1a0c10"/>`
        + `<circle cx="100" cy="22" r="14" fill="#d6443a" opacity="0.18"/>`;

    case "grahf":  // the Seeker of Power
      return sky("#10081a", "#1e0e2a") + stars(4, "#caa")
        + `<path d="M22 100 Q26 70 50 64 L72 64 Q78 100 78 100 Z" fill="#2a1a2a"/>`
        + `<path d="M30 86 Q26 42 50 32 Q74 42 70 86 Z" fill="#1a1020" stroke="#3a2236" stroke-width="1"/>`
        + `<path d="M38 36 L32 16 L46 30 Z" fill="#1a1020"/><path d="M62 36 L68 16 L54 30 Z" fill="#1a1020"/>`
        + `<path d="M40 60 Q34 44 50 40 Q66 44 60 60 Q50 54 40 60 Z" fill="#070409"/>`
        + `<circle cx="44" cy="50" r="2" fill="#e23a3a"/><circle cx="56" cy="50" r="2" fill="#e23a3a"/>`
        + `<ellipse cx="50" cy="50" rx="34" ry="30" fill="#d6443a" opacity="0.06"/>`;

    case "war":  // Gears clash in the desert
      return sky("#1a120a", "#2a1c0c")
        + `<path d="M0 70 Q100 60 200 70 L200 100 L0 100 Z" fill="#3a2a16"/>`
        + `<circle cx="40" cy="28" r="12" fill="#e8b86a" opacity="0.4"/>`
        + gear(56, 40, 34, "#2a2018") + gear(146, 42, 32, "#241c14")
        + `<line x1="74" y1="52" x2="128" y2="54" stroke="#f0a84a" stroke-width="2" opacity="0.7"/>`
        + `<g fill="#f0c46a" opacity="0.8"><circle cx="100" cy="53" r="2"/><circle cx="92" cy="50" r="1.2"/></g>`;

    case "lahan":  // the village destroyed by Id/Weltall
      return sky("#1a0a06", "#341206") + ground("#160a06", 70)
        + flame(34, 60, "#f0782a") + flame(54, 64, "#f0a02a") + flame(150, 60, "#f0782a")
        + `<g fill="#1a100a"><path d="M30 66 l12 -16 l12 16 Z"/><rect x="36" y="58" width="12" height="10"/></g>`
        + gear(150, 28, 40, "#0e0806")
        + `<circle cx="150" cy="40" r="2.6" fill="#e23a3a" glow="1"/><circle cx="150" cy="40" r="2.6" fill="#e23a3a"/>`
        + `<ellipse cx="100" cy="20" rx="90" ry="16" fill="#2a1408" opacity="0.6"/>`;

    case "yggdrasil":  // the land-battleship of the desert
      return sky("#16120c", "#241c10")
        + `<circle cx="156" cy="30" r="11" fill="#e8b86a" opacity="0.45"/>`
        + `<path d="M0 74 Q100 66 200 74 L200 100 L0 100 Z" fill="#3a2c18"/>`
        + `<g fill="#2a3340" stroke="#1a2028" stroke-width="1"><path d="M40 70 L150 70 L138 54 L96 50 L52 56 Z"/><rect x="84" y="38" width="22" height="14"/><path d="M88 38 L96 28 L104 38 Z"/></g>`
        + `<g fill="#1a2028"><circle cx="64" cy="72" r="5"/><circle cx="90" cy="72" r="5"/><circle cx="116" cy="72" r="5"/></g>`
        + `<g fill="#d8a23a" opacity="0.8"><rect x="98" y="32" width="3" height="5"/></g>`;

    case "reunion":  // two souls who keep finding each other
      return sky("#0e0c1e", "#1a1838") + stars(7, "#cde")
        + ground("#100e22", 82)
        + `<path d="M64 84 Q62 60 74 54 Q84 60 82 84 Z" fill="#caa06a"/><ellipse cx="73" cy="48" rx="6" ry="7" fill="#caa06a"/>`
        + `<path d="M136 84 Q134 60 126 54 Q116 60 118 84 Z" fill="#c8b48a"/><ellipse cx="127" cy="48" rx="6" ry="7" fill="#c8b48a"/>`
        + `<path d="M80 54 Q100 44 120 54" stroke="#9a6cff" stroke-width="2" fill="none" opacity="0.7"/>`
        + `<circle cx="100" cy="49" r="3" fill="#f0e0a0"/><circle cx="100" cy="49" r="10" fill="#d8a23a" opacity="0.18"/>`;

    case "ethos":  // the church hiding machinery
      return sky("#0e0c10", "#1a1418")
        + ground("#0c0a0c", 80)
        + `<g stroke="#3a3026" stroke-width="1.4" fill="none" opacity="0.7"><circle cx="100" cy="58" r="14"/><circle cx="100" cy="58" r="14"/><g stroke="#4a3e2e"><line x1="86" y1="58" x2="114" y2="58"/><line x1="100" y1="44" x2="100" y2="72"/><line x1="90" y1="48" x2="110" y2="68"/><line x1="90" y1="68" x2="110" y2="48"/></g></g>`
        + `<g fill="#c8a45a"><rect x="96" y="26" width="8" height="40" rx="1"/><rect x="84" y="36" width="32" height="8" rx="1"/></g>`
        + `<rect x="0" y="80" width="200" height="20" fill="#161216"/>`;

    case "solarisfall":  // the sky empire breaks apart
      return sky("#1a1018", "#2a1626") + stars(4, "#dcb")
        + `<g fill="#3a4a6a" transform="rotate(10 100 46)"><path d="M70 54 L130 54 L116 44 L84 44 Z"/><rect x="86" y="34" width="28" height="12"/></g>`
        + `<g fill="#2a3a55"><path d="M40 60 l10 6 l-4 10 Z" transform="rotate(-20 45 66)"/><path d="M150 56 l10 4 l-3 11 Z" transform="rotate(24 156 62)"/><path d="M120 70 l8 3 l-2 9 Z"/></g>`
        + `<g fill="#7a86a8" opacity="0.5"><ellipse cx="60" cy="80" rx="30" ry="6"/><ellipse cx="150" cy="84" rx="34" ry="6"/></g>`
        + `<g fill="#f0a84a" opacity="0.7"><circle cx="98" cy="50" r="2"/></g>`;

    case "krelian":  // the architect of God's return
      return sky("#0c0a14", "#161228")
        + tree("#9a6cff")
        + `<path d="M92 92 Q90 70 100 62 Q110 70 108 92 Z" fill="#cfd2d4"/>`
        + `<ellipse cx="100" cy="56" rx="6" ry="7" fill="#ecdcd0"/>`
        + `<path d="M100 50 L100 30" stroke="#9a6cff" stroke-width="1.2" opacity="0.7"/>`
        + `<circle cx="100" cy="26" r="4" fill="#c8a8ff"/><circle cx="100" cy="26" r="12" fill="#9a6cff" opacity="0.18"/>`;

    case "idtruth":  // the fractured self
      return sky("#140810", "#26101c")
        + ground("#120810", 82)
        + `<path d="M86 90 Q84 62 100 54 Q116 62 114 90 Z" fill="#3a2630" opacity="0.7"/><ellipse cx="100" cy="46" rx="8" ry="10" fill="#3a2630" opacity="0.7"/>`
        + `<path d="M78 90 Q76 64 92 56 Q100 60 100 70 L100 90 Z" fill="#6a4a3a" opacity="0.8"/><ellipse cx="90" cy="48" rx="7" ry="9" fill="#6a4a3a" opacity="0.8"/>`
        + `<path d="M122 90 Q124 64 108 56 Q100 60 100 70 L100 90 Z" fill="#7a1c1c" opacity="0.85"/><ellipse cx="110" cy="48" rx="7" ry="9" fill="#7a1c1c" opacity="0.85"/>`
        + `<circle cx="106" cy="48" r="1.6" fill="#e23a3a"/>`
        + `<circle cx="100" cy="56" r="16" fill="#9a6cff" opacity="0.08"/>`;

    case "deus":  // the false god awakens
      return sky("#0c0810", "#1c0e1e")
        + ground("#0a0610", 76)
        + `<path d="M100 16 Q138 30 130 64 Q150 56 142 80 L100 66 L58 80 Q50 56 70 64 Q62 30 100 16 Z" fill="#241024" stroke="#c0506a" stroke-width="1.2"/>`
        + `<g stroke="#7a2a4a" stroke-width="1.5"><line x1="74" y1="50" x2="58" y2="40"/><line x1="126" y1="50" x2="142" y2="40"/></g>`
        + `<circle cx="100" cy="44" r="6" fill="#d6443a"/><circle cx="100" cy="44" r="16" fill="#d6443a" opacity="0.2"/>`
        + `<circle cx="100" cy="44" r="2" fill="#1a0810"/>`;

    case "waveexistence":  // the true God freed; the Zohar
      return sky("#0c0a12", "#161226") + stars(6, "#e8d")
        + ground("#0c0a14", 84)
        + monolith(100, 86, 60, "#d8a23a")
        + `<circle cx="100" cy="46" r="9" fill="#f0e6b0"/><circle cx="100" cy="46" r="26" fill="#f0d86a" opacity="0.14"/>`
        + `<g stroke="#f0e0a0" stroke-width="1" opacity="0.6"><line x1="100" y1="46" x2="74" y2="30"/><line x1="100" y1="46" x2="126" y2="30"/><line x1="100" y1="46" x2="80" y2="64"/><line x1="100" y1="46" x2="120" y2="64"/></g>`;

    case "endcycle":  // the cycle broken; an open future
      return `<rect width="200" height="100" fill="#1a1626"/><rect width="200" height="64" fill="#3a2a3a" opacity="0.6"/>`
        + `<rect x="0" y="50" width="200" height="14" fill="#e8a86a" opacity="0.5"/>`
        + `<circle cx="100" cy="64" r="20" fill="#f0d88a"/><circle cx="100" cy="64" r="34" fill="#f0d88a" opacity="0.18"/>`
        + ground("#1a1018", 78)
        + `<path d="M88 92 Q86 74 96 68 Q102 72 102 80 L102 92 Z" fill="#1a1018"/>`
        + `<path d="M112 92 Q114 74 104 68 Q98 72 98 80 L98 92 Z" fill="#1a1018"/>`
        + `<g stroke="#8a7a6a" stroke-width="1.4" fill="none" opacity="0.7"><circle cx="44" cy="74" r="3"/><circle cx="50" cy="78" r="3"/><circle cx="156" cy="76" r="3"/></g>`;

    default:
      return sky("#0e0a0a", "#1a1212")
        + `<circle cx="100" cy="46" r="10" fill="#d8a23a" opacity="0.3"/><circle cx="100" cy="46" r="20" fill="#d8a23a" opacity="0.1"/>`;
  }

  // ---- helpers ----
  function gear(cx, topY, h, col) {
    const u = h / 10;
    return `<g fill="${col}" stroke="#0a0806" stroke-width="0.6">`
      + `<rect x="${cx - 2 * u}" y="${topY}" width="${4 * u}" height="${1.8 * u}" rx="${0.4 * u}"/>`
      + `<rect x="${cx - 3 * u}" y="${topY + 1.9 * u}" width="${6 * u}" height="${4 * u}" rx="${0.5 * u}"/>`
      + `<rect x="${cx - 4.6 * u}" y="${topY + 2.1 * u}" width="${1.6 * u}" height="${4.6 * u}" rx="${0.3 * u}"/>`
      + `<rect x="${cx + 3 * u}" y="${topY + 2.1 * u}" width="${1.6 * u}" height="${4.6 * u}" rx="${0.3 * u}"/>`
      + `<rect x="${cx - 2.7 * u}" y="${topY + 5.9 * u}" width="${2.1 * u}" height="${4.1 * u}" rx="${0.3 * u}"/>`
      + `<rect x="${cx + 0.6 * u}" y="${topY + 5.9 * u}" width="${2.1 * u}" height="${4.1 * u}" rx="${0.3 * u}"/>`
      + `</g>`;
  }
  function tree(col) {
    const n = [[100,22],[84,36],[116,36],[84,54],[116,54],[100,46],[84,70],[116,70],[100,62],[100,82]];
    const e = [[0,1],[0,2],[1,2],[1,3],[2,4],[1,5],[2,5],[3,5],[4,5],[3,4],[3,6],[4,7],[5,8],[6,8],[7,8],[6,7],[8,9],[5,0]];
    let s = `<g stroke="${col}" stroke-width="1" opacity="0.55">`;
    e.forEach(([a, b]) => { s += `<line x1="${n[a][0]}" y1="${n[a][1]}" x2="${n[b][0]}" y2="${n[b][1]}"/>`; });
    s += `</g><g fill="#0e1422" stroke="${col}" stroke-width="1.2">`;
    n.forEach(p => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="3.4"/>`; });
    s += `</g><g fill="${col}" opacity="0.7">`;
    n.forEach(p => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="1.3"/>`; });
    return s + `</g>`;
  }
  function monolith(cx, baseY, h, col) {
    return `<ellipse cx="${cx}" cy="${baseY - h / 2}" rx="24" ry="${h * 0.6}" fill="${col}" opacity="0.10"/>`
      + `<rect x="${cx - 7}" y="${baseY - h}" width="14" height="${h}" rx="2" fill="#141018" stroke="${col}" stroke-width="1.5"/>`
      + `<rect x="${cx - 3}" y="${baseY - h + 6}" width="6" height="${h - 12}" fill="${col}" opacity="0.5"/>`;
  }
  function flame(x, y, c) {
    return `<g transform="translate(${x},${y})"><path d="M0 0 q-7 -10 0 -22 q3 8 4 4 q5 -8 2 -16 q10 12 4 28 q-2 8 -10 6 Z" fill="${c}" opacity="0.88"/></g>`;
  }
  function helix(cx, topY, h, col) {
    let s = `<g stroke="${col}" stroke-width="2" fill="none" opacity="0.85">`;
    s += `<path d="M${cx - 12} ${topY} Q${cx + 12} ${topY + h * 0.25} ${cx - 12} ${topY + h * 0.5} Q${cx + 12} ${topY + h * 0.75} ${cx - 12} ${topY + h}"/>`;
    s += `<path d="M${cx + 12} ${topY} Q${cx - 12} ${topY + h * 0.25} ${cx + 12} ${topY + h * 0.5} Q${cx - 12} ${topY + h * 0.75} ${cx + 12} ${topY + h}"/>`;
    s += `</g><g stroke="${col}" stroke-width="1" opacity="0.5">`;
    for (let i = 0; i <= 6; i++) { const yy = topY + (h * i / 6); s += `<line x1="${cx - 10}" y1="${yy}" x2="${cx + 10}" y2="${yy}"/>`; }
    return s + `</g>`;
  }
}
