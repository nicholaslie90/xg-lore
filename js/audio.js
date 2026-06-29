/* ============================================================
   PROCEDURAL AMBIENT  ("Lifestream" pad)
   Original, royalty-free atmosphere synthesized live with the
   Web Audio API — a low Mako-hum drone, a slow filter sweep, and
   sparse pentatonic bell tones drifting through a soft delay.
   No audio files; nothing copyrighted.
   ============================================================ */

const FFAudio = (function () {
  let ctx, master, filter, lfo, delay, fb, drone = [], bellTimer = null;
  let started = false, playing = false, onState = null;

  // A minor pentatonic-ish set — gentle, never dissonant
  const NOTES = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00];

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // soft space (feedback delay as a cheap reverb)
    delay = ctx.createDelay(1.0);
    delay.delayTime.value = 0.34;
    fb = ctx.createGain(); fb.gain.value = 0.34;
    const wet = ctx.createGain(); wet.gain.value = 0.45;
    delay.connect(fb); fb.connect(delay);
    delay.connect(wet); wet.connect(master);

    // drone through a slowly-sweeping lowpass
    filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 480;
    filter.Q.value = 5;
    filter.connect(master);
    filter.connect(delay);

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.14;
    droneGain.connect(filter);

    [110, 110 * 1.5, 220, 220 * 1.005].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? "triangle" : "sine";
      o.frequency.value = f;
      o.detune.value = (i - 1) * 5;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.9 : 0.45;
      o.connect(g); g.connect(droneGain);
      o.start();
      drone.push(o);
    });

    lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.045;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 220;
    lfo.connect(lfoGain); lfoGain.connect(filter.frequency);
    lfo.start();

    started = true;
    return true;
  }

  function bell() {
    if (!playing || !ctx) return;
    const t = ctx.currentTime;
    let n = NOTES[Math.floor(Math.random() * NOTES.length)];
    if (Math.random() < 0.3) n *= 2;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = n;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.10, t + 0.5);
    g.gain.exponentialRampToValueAtTime(0.0006, t + 4.5);
    o.connect(g);
    g.connect(delay);
    g.connect(master);
    o.start(t);
    o.stop(t + 4.8);
    bellTimer = setTimeout(bell, 4500 + Math.random() * 7000);
  }

  function fade(to, dur) {
    if (!ctx) return;
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(to, t + dur);
  }

  function notify() { if (onState) onState(playing); }

  function start() {
    if (!started && !build()) return;
    if (ctx.state === "suspended") ctx.resume();
    playing = true;
    fade(0.5, 2.2);
    clearTimeout(bellTimer);
    bellTimer = setTimeout(bell, 1500);
    notify();
  }

  function pause() {
    playing = false;
    fade(0, 1.2);
    clearTimeout(bellTimer);
    if (ctx) setTimeout(() => { if (!playing && ctx) ctx.suspend(); }, 1400);
    notify();
  }

  return {
    toggle() { playing ? pause() : start(); },
    start, pause,
    isPlaying() { return playing; },
    isReady() { return !!(window.AudioContext || window.webkitAudioContext); },
    set onState(fn) { onState = fn; },
  };
})();
