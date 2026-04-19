import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { PHOTOS } from "./photos.js";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const BG    = "#0e1628";
const GOLD  = "#c8a04a";
const CREAM = "#f0e8d8";
const MUTED = "#8a9ab8";

// ─── FRAME DEFINITIONS (15 styles) ───────────────────────────────────────────
const FRAMES = [
  { w:160,h:120,px:20,py:16,pw:120,ph:88, svg:(f)=>`
    <rect x="0" y="0" width="160" height="120" rx="3" fill="#8a5e08"/>
    <rect x="5" y="4" width="150" height="112" rx="2" fill="#b07c10"/>
    <rect x="10" y="8" width="140" height="104" rx="2" fill="#7a5008"/>
    <rect x="15" y="12" width="130" height="96" rx="1" fill="#c09018"/>
    <rect x="19" y="15" width="122" height="90" rx="1" fill="#9a7010"/>
    <rect x="20" y="16" width="120" height="88" fill="${f}"/>
    <rect x="5" y="4" width="150" height="112" rx="2" fill="none" stroke="#e0b030" stroke-width="1.2"/>
    <ellipse cx="80" cy="4" rx="12" ry="5" fill="#c09018"/>
    <ellipse cx="80" cy="116" rx="12" ry="5" fill="#c09018"/>
    <ellipse cx="5" cy="60" rx="5" ry="12" fill="#c09018"/>
    <ellipse cx="155" cy="60" rx="5" ry="12" fill="#c09018"/>
    <circle cx="11" cy="10" r="6" fill="#8a5e08" stroke="#d0a020" stroke-width="1"/>
    <circle cx="149" cy="10" r="6" fill="#8a5e08" stroke="#d0a020" stroke-width="1"/>
    <circle cx="11" cy="110" r="6" fill="#8a5e08" stroke="#d0a020" stroke-width="1"/>
    <circle cx="149" cy="110" r="6" fill="#8a5e08" stroke="#d0a020" stroke-width="1"/>
  `},
  { w:108,h:148,px:8,py:8,pw:92,ph:132, svg:(f)=>`
    <rect x="0" y="0" width="108" height="148" rx="2" fill="#1c0c06"/>
    <rect x="4" y="4" width="100" height="140" rx="1" fill="#2c1810"/>
    <rect x="7" y="7" width="94" height="134" rx="1" fill="#140a04"/>
    <rect x="8" y="8" width="92" height="132" fill="${f}"/>
    <line x1="4" y1="4" x2="104" y2="4" stroke="#3c2010" stroke-width="0.8"/>
    <line x1="4" y1="144" x2="104" y2="144" stroke="#3c2010" stroke-width="0.8"/>
    <line x1="4" y1="4" x2="4" y2="144" stroke="#3c2010" stroke-width="0.8"/>
    <line x1="104" y1="4" x2="104" y2="144" stroke="#3c2010" stroke-width="0.8"/>
    <line x1="0" y1="35" x2="108" y2="32" stroke="#281408" stroke-width="0.5" opacity="0.45"/>
    <line x1="0" y1="90" x2="108" y2="93" stroke="#281408" stroke-width="0.4" opacity="0.3"/>
  `},
  { w:132,h:100,px:14,py:13,pw:104,ph:74, svg:(f)=>`
    <rect x="0" y="0" width="132" height="100" rx="5" fill="#d0c8b0"/>
    <rect x="5" y="5" width="122" height="90" rx="4" fill="#e0d8c0"/>
    <rect x="9" y="9" width="114" height="82" rx="3" fill="#c0b8a0"/>
    <rect x="13" y="12" width="106" height="76" rx="2" fill="#d8d0b8"/>
    <rect x="14" y="13" width="104" height="74" rx="1" fill="${f}"/>
    <rect x="0" y="0" width="132" height="100" rx="5" fill="none" stroke="#b0a890" stroke-width="1"/>
    <rect x="5" y="5" width="122" height="90" rx="4" fill="none" stroke="#e8e0d0" stroke-width="0.5"/>
  `},
  { w:142,h:108,px:16,py:14,pw:110,ph:80, svg:(f)=>`
    <rect x="0" y="0" width="142" height="108" rx="2" fill="#906c18"/>
    <rect x="5" y="4" width="132" height="100" rx="2" fill="#b08828"/>
    <rect x="8" y="7" width="126" height="94" rx="1" fill="#785808"/>
    <rect x="12" y="11" width="118" height="86" rx="1" fill="#c09828"/>
    <rect x="15" y="13" width="112" height="82" fill="#a07818"/>
    <rect x="16" y="14" width="110" height="80" fill="${f}"/>
    <rect x="5" y="4" width="132" height="100" rx="2" fill="none" stroke="#d4ae38" stroke-width="1.2"/>
    <rect x="0" y="0" width="142" height="6" fill="#b89028"/>
    <rect x="0" y="102" width="142" height="6" fill="#b89028"/>
    <rect x="0" y="0" width="6" height="108" fill="#b89028"/>
    <rect x="136" y="0" width="6" height="108" fill="#b89028"/>
  `},
  { w:98,h:128,px:13,py:13,pw:72,ph:102, svg:(f)=>`
    <rect x="0" y="0" width="98" height="128" rx="1" fill="#7a8082"/>
    <rect x="4" y="4" width="90" height="120" rx="1" fill="#929a9c"/>
    <rect x="7" y="7" width="84" height="114" rx="1" fill="#686e70"/>
    <rect x="10" y="10" width="78" height="108" rx="1" fill="#8a9092"/>
    <rect x="13" y="13" width="72" height="102" fill="${f}"/>
    <line x1="18" y1="0" x2="18" y2="7" stroke="#c0c8c8" stroke-width="1"/>
    <line x1="80" y1="0" x2="80" y2="7" stroke="#c0c8c8" stroke-width="1"/>
    <line x1="18" y1="121" x2="18" y2="128" stroke="#c0c8c8" stroke-width="1"/>
    <line x1="80" y1="121" x2="80" y2="128" stroke="#c0c8c8" stroke-width="1"/>
    <line x1="0" y1="22" x2="7" y2="22" stroke="#c0c8c8" stroke-width="1"/>
    <line x1="0" y1="106" x2="7" y2="106" stroke="#c0c8c8" stroke-width="1"/>
    <line x1="91" y1="22" x2="98" y2="22" stroke="#c0c8c8" stroke-width="1"/>
    <line x1="91" y1="106" x2="98" y2="106" stroke="#c0c8c8" stroke-width="1"/>
  `},
  { w:138,h:96,px:12,py:11,pw:114,ph:74, svg:(f)=>`
    <rect x="0" y="0" width="138" height="96" rx="2" fill="#482c10"/>
    <rect x="6" y="5" width="126" height="86" rx="1" fill="#583818"/>
    <rect x="10" y="9" width="118" height="78" rx="1" fill="#381e08"/>
    <rect x="12" y="11" width="114" height="74" fill="${f}"/>
    <line x1="0" y1="18" x2="138" y2="16" stroke="#684830" stroke-width="1.2" opacity="0.7"/>
    <line x1="0" y1="44" x2="138" y2="46" stroke="#684830" stroke-width="0.7" opacity="0.5"/>
    <line x1="0" y1="70" x2="138" y2="68" stroke="#684830" stroke-width="0.9" opacity="0.6"/>
    <circle cx="6" cy="5" r="3" fill="#281408"/>
    <circle cx="132" cy="5" r="3" fill="#281408"/>
    <circle cx="6" cy="91" r="3" fill="#281408"/>
    <circle cx="132" cy="91" r="3" fill="#281408"/>
  `},
  { w:118,h:154,px:14,py:14,pw:90,ph:126, svg:(f)=>`
    <rect x="0" y="0" width="118" height="154" rx="6" fill="#9a5868"/>
    <rect x="5" y="5" width="108" height="144" rx="5" fill="#b47080"/>
    <rect x="9" y="9" width="100" height="136" rx="4" fill="#885868"/>
    <rect x="13" y="13" width="92" height="128" rx="3" fill="#ac7078"/>
    <rect x="14" y="14" width="90" height="126" rx="2" fill="${f}"/>
    <rect x="5" y="5" width="108" height="144" rx="5" fill="none" stroke="#c490a0" stroke-width="1.5"/>
    <path d="M59,0 Q66,5 59,10 Q52,5 59,0Z" fill="#b47080"/>
    <path d="M59,144 Q66,149 59,154 Q52,149 59,144Z" fill="#b47080"/>
  `},
  { w:113,h:83,px:9,py:8,pw:95,ph:67, svg:(f)=>`
    <rect x="0" y="0" width="113" height="83" rx="1" fill="#080808"/>
    <rect x="4" y="4" width="105" height="75" rx="1" fill="#181818"/>
    <rect x="7" y="7" width="99" height="69" fill="#0c0c0c"/>
    <rect x="9" y="8" width="95" height="67" fill="${f}"/>
    <rect x="0" y="0" width="113" height="83" fill="none" stroke="#282828" stroke-width="0.8"/>
    <rect x="4" y="4" width="105" height="75" fill="none" stroke="#343434" stroke-width="0.4"/>
  `},
  { w:138,h:103,px:22,py:17,pw:94,ph:69, svg:(f)=>`
    <rect x="0" y="0" width="138" height="103" rx="3" fill="#c0b8a0"/>
    <rect x="5" y="5" width="128" height="93" rx="2" fill="#d0c8b0"/>
    <rect x="9" y="8" width="120" height="87" rx="2" fill="#b0a890"/>
    <rect x="17" y="13" width="104" height="77" rx="1" fill="#ece4cc"/>
    <rect x="20" y="15" width="98" height="73" rx="1" fill="#dcd4bc"/>
    <rect x="22" y="17" width="94" height="69" fill="${f}"/>
    <rect x="5" y="5" width="128" height="93" rx="2" fill="none" stroke="#989080" stroke-width="0.8"/>
    <rect x="17" y="13" width="104" height="77" rx="1" fill="none" stroke="#c0b8a0" stroke-width="0.8"/>
  `},
  { w:122,h:93,px:13,py:12,pw:96,ph:69, svg:(f)=>`
    <rect x="0" y="0" width="122" height="93" rx="3" fill="#723818"/>
    <rect x="4" y="3" width="114" height="87" rx="2" fill="#925028"/>
    <rect x="8" y="6" width="106" height="81" rx="2" fill="#622808"/>
    <rect x="11" y="9" width="100" height="75" rx="1" fill="#824018"/>
    <rect x="13" y="12" width="96" height="69" fill="${f}"/>
    <circle cx="18" cy="14" r="2" fill="#aa6030" opacity="0.45"/>
    <circle cx="34" cy="7" r="1.5" fill="#aa6030" opacity="0.35"/>
    <circle cx="88" cy="9" r="2" fill="#aa6030" opacity="0.4"/>
    <circle cx="108" cy="18" r="1.5" fill="#aa6030" opacity="0.45"/>
    <rect x="0" y="0" width="122" height="93" rx="3" fill="none" stroke="#b87040" stroke-width="0.8"/>
  `},
  { w:102,h:132,px:13,py:13,pw:76,ph:106, svg:(f)=>`
    <rect x="0" y="0" width="102" height="132" rx="3" fill="#183520"/>
    <rect x="5" y="5" width="92" height="122" rx="2" fill="#24462a"/>
    <rect x="9" y="9" width="84" height="114" rx="2" fill="#102818"/>
    <rect x="12" y="12" width="78" height="108" rx="1" fill="#1e3c28"/>
    <rect x="13" y="13" width="76" height="106" fill="${f}"/>
    <line x1="5" y1="24" x2="97" y2="22" stroke="#304e38" stroke-width="0.8" opacity="0.5"/>
    <line x1="5" y1="55" x2="97" y2="57" stroke="#304e38" stroke-width="0.5" opacity="0.4"/>
    <line x1="5" y1="82" x2="97" y2="80" stroke="#304e38" stroke-width="0.7" opacity="0.45"/>
    <line x1="5" y1="110" x2="97" y2="112" stroke="#304e38" stroke-width="0.6" opacity="0.4"/>
  `},
  { w:93,h:122,px:10,py:10,pw:73,ph:102, svg:(f)=>`
    <rect x="0" y="0" width="93" height="122" rx="2" fill="#b88c1e"/>
    <rect x="3" y="3" width="87" height="116" rx="1" fill="#180e06"/>
    <rect x="7" y="7" width="79" height="108" rx="1" fill="#b88c1e"/>
    <rect x="9" y="9" width="75" height="104" fill="#0c0a04"/>
    <rect x="10" y="10" width="73" height="102" fill="${f}"/>
    <circle cx="6" cy="6" r="3" fill="#cca028"/>
    <circle cx="87" cy="6" r="3" fill="#cca028"/>
    <circle cx="6" cy="116" r="3" fill="#cca028"/>
    <circle cx="87" cy="116" r="3" fill="#cca028"/>
    <circle cx="46" cy="3" r="2.5" fill="#cca028"/>
    <circle cx="46" cy="119" r="2.5" fill="#cca028"/>
    <circle cx="3" cy="61" r="2.5" fill="#cca028"/>
    <circle cx="90" cy="61" r="2.5" fill="#cca028"/>
  `},
  { w:128,h:88,px:10,py:9,pw:108,ph:70, svg:(f)=>`
    <rect x="0" y="0" width="128" height="88" fill="#180a04"/>
    <rect x="9" y="8" width="110" height="72" fill="#0c0602"/>
    <rect x="10" y="9" width="108" height="70" fill="${f}"/>
    <polygon points="0,0 10,9 10,79 0,88" fill="#261008"/>
    <polygon points="128,0 118,9 118,79 128,88" fill="#261008"/>
    <polygon points="0,0 128,0 118,9 10,9" fill="#1e0c06"/>
    <polygon points="0,88 128,88 118,79 10,79" fill="#1e0c06"/>
    <line x1="0" y1="0" x2="10" y2="9" stroke="#381808" stroke-width="0.8"/>
    <line x1="128" y1="0" x2="118" y2="9" stroke="#381808" stroke-width="0.8"/>
    <line x1="0" y1="88" x2="10" y2="79" stroke="#381808" stroke-width="0.8"/>
    <line x1="128" y1="88" x2="118" y2="79" stroke="#381808" stroke-width="0.8"/>
  `},
  { w:112,h:142,px:14,py:14,pw:84,ph:114, svg:(f)=>`
    <rect x="0" y="0" width="112" height="142" rx="2" fill="#585c5e"/>
    <rect x="5" y="5" width="102" height="132" rx="1" fill="#686c6e"/>
    <rect x="9" y="9" width="94" height="124" rx="1" fill="#4e5254"/>
    <rect x="13" y="13" width="86" height="116" fill="#606468"/>
    <rect x="14" y="14" width="84" height="114" fill="${f}"/>
    <line x1="5" y1="5" x2="107" y2="5" stroke="#7e8284" stroke-width="0.6"/>
    <line x1="5" y1="137" x2="107" y2="137" stroke="#7e8284" stroke-width="0.6"/>
    <line x1="5" y1="5" x2="5" y2="137" stroke="#7e8284" stroke-width="0.6"/>
    <line x1="107" y1="5" x2="107" y2="137" stroke="#7e8284" stroke-width="0.6"/>
    <line x1="5" y1="34" x2="107" y2="32" stroke="#747a7c" stroke-width="0.4" opacity="0.5"/>
    <line x1="5" y1="82" x2="107" y2="84" stroke="#747a7c" stroke-width="0.4" opacity="0.4"/>
  `},
  { w:168,h:128,px:24,py:19,pw:120,ph:90, svg:(f)=>`
    <rect x="0" y="0" width="168" height="128" rx="4" fill="#845c0e"/>
    <rect x="6" y="5" width="156" height="118" rx="3" fill="#a07820"/>
    <rect x="11" y="9" width="146" height="110" rx="2" fill="#724c06"/>
    <rect x="16" y="13" width="136" height="102" rx="2" fill="#b08820"/>
    <rect x="20" y="16" width="128" height="96" rx="1" fill="#947010"/>
    <rect x="23" y="18" width="122" height="92" rx="1" fill="#b88c18"/>
    <rect x="24" y="19" width="120" height="90" fill="${f}"/>
    <ellipse cx="84" cy="5" rx="14" ry="5" fill="#b88c18"/>
    <ellipse cx="84" cy="123" rx="14" ry="5" fill="#b88c18"/>
    <ellipse cx="6" cy="64" rx="5" ry="14" fill="#b88c18"/>
    <ellipse cx="162" cy="64" rx="5" ry="14" fill="#b88c18"/>
    <circle cx="12" cy="11" r="7" fill="#845c0e" stroke="#cc9c20" stroke-width="1.2"/>
    <circle cx="156" cy="11" r="7" fill="#845c0e" stroke="#cc9c20" stroke-width="1.2"/>
    <circle cx="12" cy="117" r="7" fill="#845c0e" stroke="#cc9c20" stroke-width="1.2"/>
    <circle cx="156" cy="117" r="7" fill="#845c0e" stroke="#cc9c20" stroke-width="1.2"/>
    <rect x="6" y="5" width="156" height="118" rx="3" fill="none" stroke="#dcac28" stroke-width="1.2"/>
  `},
];

// ─── SEEDED RNG ───────────────────────────────────────────────────────────────
function makeRng(seed) {
  let s = ((seed ^ 0xdeadbeef) >>> 0) || 1;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return ((s >>> 0) % 99991) / 99991; // always strictly < 1
  };
}

// ─── NO-OVERLAP FRAME PLACEMENT ──────────────────────────────────────────────
function placeFrames({ count, areaW, areaH, seed = 1, minGap = 24, scaleLo = 0.65, scaleHi = 1.1 }) {
  const rng = makeRng(seed);
  const placed = [];

  for (let i = 0; i < count; i++) {
    const defIdx = Math.min(Math.floor(rng() * FRAMES.length), FRAMES.length - 1);
    const def = FRAMES[defIdx];
    const scale = scaleLo + rng() * (scaleHi - scaleLo);
    const fw = def.w * scale;
    const fh = def.h * scale;

    let best = null, bestScore = -Infinity;
    for (let attempt = 0; attempt < 350; attempt++) {
      const x = 8 + rng() * Math.max(0, areaW - fw - 16);
      const y = 8 + rng() * Math.max(0, areaH - fh - 16);
      let ok = true, minDist = Infinity;
      for (const p of placed) {
        const ox = x + fw + minGap > p.x && x < p.x + p.fw + minGap;
        const oy = y + fh + minGap > p.y && y < p.y + p.fh + minGap;
        if (ox && oy) { ok = false; break; }
        const d = Math.hypot(x + fw / 2 - (p.x + p.fw / 2), y + fh / 2 - (p.y + p.fh / 2));
        if (d < minDist) minDist = d;
      }
      if (!ok) continue;
      if (minDist > bestScore) { bestScore = minDist; best = { x, y }; }
    }
    if (!best) continue;
    placed.push({
      defIdx, scale, x: best.x, y: best.y, fw, fh, id: i,
      fill: `hsl(${205 + Math.floor(rng() * 40)},${16 + Math.floor(rng() * 16)}%,${7 + Math.floor(rng() * 9)}%)`,
    });
  }
  return placed;
}

// Pre-compute frame sets (done once at module load, not on every render)
const MAIN_FRAMES   = placeFrames({ count: 48, areaW: 420, areaH: 9000, seed: 31337, minGap: 28, scaleLo: 0.8, scaleHi: 1.25 });
const QUEST_FRAMES  = Array.from({ length: 6 }, (_, i) =>
  placeFrames({ count: 16, areaW: 420, areaH: 800, seed: i * 23 + 7, minGap: 24, scaleLo: 0.42, scaleHi: 0.68 })
);

// ─── SVG FRAME ELEMENT ────────────────────────────────────────────────────────
function FrameEl({ frame, opacity = 0.38, photoIndex }) {
  const def = FRAMES[frame.defIdx];
  const photoUrl = photoIndex !== undefined ? PHOTOS[photoIndex % PHOTOS.length] : null;
  const frameSvg = photoUrl
    ? def.svg("transparent")
        .replace(/fill="(?!none)([^"]+)"/g, 'fill="$1" fill-opacity="0.04"')
        .replace(/stroke="([^"]+)"/g, 'stroke="$1" stroke-opacity="0.45"')
    : def.svg(frame.fill);

  return (
    <g transform={`translate(${frame.x},${frame.y}) scale(${frame.scale})`}>
      {photoUrl && (
        <image
          x={def.px}
          y={def.py}
          width={def.pw}
          height={def.ph}
          href={photoUrl}
          xlinkHref={photoUrl}
          preserveAspectRatio="xMidYMid slice"
          style={{ pointerEvents: "none", filter: "contrast(1.15) saturate(1.15)" }}
        />
      )}
      <g dangerouslySetInnerHTML={{ __html: frameSvg }} />
    </g>
  );
}

// ─── PARALLAX FRAME BACKGROUND (main site) ───────────────────────────────────
// Uses framer-motion's useScroll + useTransform for GPU-composited parallax
function ParallaxFrames({ areaW }) {
  const { scrollY } = useScroll();
  // Frames move 1.6× scroll speed = faster than content
  const y = useTransform(scrollY, [0, 10000], [0, -16000]);
  const ySpring = useSpring(y, { stiffness: 80, damping: 30, restDelta: 0.001 });

  const H = 9000;
  const W = Math.max(areaW, 380);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <motion.div style={{ y: ySpring, willChange: "transform" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
          {MAIN_FRAMES.map(f => <FrameEl key={f.id} frame={f} photoIndex={f.id} />)}
        </svg>
      </motion.div>
    </div>
  );
}

// ─── SCROLL-TRIGGERED REVEAL ─────────────────────────────────────────────────
const revealVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      variants={revealVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function Sec({ children, style }) {
  return (
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", ...style }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(14,22,40,0.72) 25%, rgba(14,22,40,0.38) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2, padding: "7rem 2rem 6rem" }}>
        {children}
      </div>
    </section>
  );
}

// ─── QUESTIONNAIRE ────────────────────────────────────────────────────────────
const QUESTIONS = [
  { id: "vibe",    q: "What's your wedding vibe?",                  sub: "Every love story starts somewhere.",                 opts: ["Golden & timeless", "Intimate & editorial", "Wild & joyful", "Soft & dreamy"] },
  { id: "moments", q: "Which moments matter most to you?",          sub: "The ones you'll want to live in forever.",           opts: ["The first look", "The vows", "The dancing", "All the in-betweens"] },
  { id: "size",    q: "How many people are celebrating with you?",  sub: "Big love, small gathering, or somewhere in between.", opts: ["Under 30", "30–80", "80–150", "150+"] },
  { id: "found",   q: "How did you find Sanaa?",                    sub: "Just curious.",                                      opts: ["Instagram", "Google", "A friend told me", "I just knew"] },
  { id: "frame",   q: "If you could only frame one photo from your wedding, what would it be?",
    sub: "The one that says everything.",
    opts: ["The moment we saw each other", "Our hands, intertwined", "Everyone we love in one room", "A quiet moment, just us"],
    isFinal: true,
  },
];

// Slide variants — content slides left on advance, new content enters from right
const slideOut = { x: "-100%", opacity: 0 };
const slideIn  = { x: "100%",  opacity: 0 };
const slideCenter = { x: 0, opacity: 1 };
const slideTransition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] };

// Frame bg for questionnaire also slides left as content does
const bgSlideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit:  (dir) => ({ x: dir > 0 ? "-100%" : "100%" }),
};

function QuestionPanel({ q, step, onSelect }) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={slideTransition}
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: "5rem 2rem 2rem" }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ textAlign: "center", maxWidth: 340, width: "100%" }}>
        <motion.p variants={itemVariants} style={{ color: GOLD, fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.7rem", opacity: 0.75 }}>
          {q.sub}
        </motion.p>
        <motion.h2 variants={itemVariants} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(1.2rem,4.5vw,1.65rem)", color: CREAM, fontWeight: 400, lineHeight: 1.38, marginBottom: "2.4rem" }}>
          {q.q}
        </motion.h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {q.opts.map((opt, i) => (
            <motion.button
              key={opt}
              variants={itemVariants}
              onClick={() => onSelect(opt)}
              whileHover={{ scale: 1.02, borderColor: GOLD, backgroundColor: "rgba(200,160,74,0.12)" }}
              whileTap={{ scale: 0.98 }}
              style={{ background: "rgba(14,22,40,0.6)", border: "1px solid rgba(200,160,74,0.22)", color: CREAM, padding: "0.82rem 1.2rem", fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.98rem", cursor: "pointer", textAlign: "left", borderRadius: "2px", display: "flex", alignItems: "center", gap: "0.7rem", backdropFilter: "blur(8px)" }}
            >
              <span style={{ color: GOLD, opacity: 0.5, fontSize: "0.72rem", fontFamily: "monospace", minWidth: 18 }}>0{i + 1}</span>
              {opt}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", date: "", location: "" });
  const fields = [
    { k: "name",     label: "Your name",     ph: "Sarah & James" },
    { k: "email",    label: "Email address", ph: "you@email.com" },
    { k: "date",     label: "Wedding date",  ph: "October 2026 — or still deciding" },
    { k: "location", label: "Venue or city", ph: "Austin, TX" },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={slideTransition}
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: "5rem 2rem 2rem" }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ maxWidth: 340, width: "100%", textAlign: "center" }}>
        <motion.p variants={itemVariants} style={{ color: GOLD, fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.4rem", opacity: 0.75 }}>
          Almost there
        </motion.p>
        <motion.h2 variants={itemVariants} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.4rem", color: CREAM, fontWeight: 400, marginBottom: "0.35rem" }}>
          Tell me who you are.
        </motion.h2>
        <motion.p variants={itemVariants} style={{ color: MUTED, fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.92rem", marginBottom: "1.6rem" }}>
          And when the story begins.
        </motion.p>
        {fields.map((field) => (
          <motion.div key={field.k} variants={itemVariants} style={{ marginBottom: "0.85rem", textAlign: "left" }}>
            <label style={{ display: "block", color: "#5a6a88", fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.8rem", marginBottom: "0.25rem", letterSpacing: "0.06em" }}>
              {field.label}
            </label>
            <input
              type="text"
              placeholder={field.ph}
              value={form[field.k]}
              onChange={e => setForm(p => ({ ...p, [field.k]: e.target.value }))}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid #1e2e48", borderRadius: "2px", padding: "0.58rem 0.82rem", color: CREAM, fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.96rem", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = GOLD}
              onBlur={e => e.target.style.borderColor = "#1e2e48"}
            />
          </motion.div>
        ))}
        <motion.button
          variants={itemVariants}
          onClick={() => onSubmit(form)}
          whileHover={{ scale: 1.02, opacity: 0.92 }}
          whileTap={{ scale: 0.98 }}
          style={{ marginTop: "0.6rem", width: "100%", background: GOLD, border: "none", color: "#1a1208", padding: "0.82rem", fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.96rem", cursor: "pointer", borderRadius: "2px", letterSpacing: "0.04em" }}
        >
          Begin the story
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function ThankYou({ onClose }) {
  return (
    <motion.div
      key="thanks"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: "2rem", textAlign: "center" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2rem", color: GOLD, marginBottom: "1rem" }}>
          Can't wait to meet you.
        </div>
        <p style={{ color: MUTED, lineHeight: 1.8, fontFamily: "'Crimson Text',Georgia,serif", fontSize: "1.05rem", marginBottom: "2rem", maxWidth: 280 }}>
          Sanaa will be in touch within 48 hours. In the meantime, keep dreaming.
        </p>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{ background: "none", border: `1px solid ${GOLD}`, color: GOLD, padding: "0.75rem 2rem", fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.95rem", cursor: "pointer", borderRadius: "2px" }}
        >
          Back to the gallery
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function Questionnaire({ visible, onClose }) {
  const [step, setStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset state whenever questionnaire opens
  useEffect(() => {
    if (visible) { setStep(0); setShowForm(false); setSubmitted(false); }
  }, [visible]);

  const handleSelect = useCallback(() => {
    const q = QUESTIONS[step];
    if (q.isFinal) { setShowForm(true); return; }
    setStep(s => s + 1);
  }, [step]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  // Which frame set to show — new set per step + form + thanks
  const bgFrameSet = submitted ? QUEST_FRAMES[5] : showForm ? QUEST_FRAMES[4] : QUEST_FRAMES[Math.min(step, 3)];
  const bgKey = submitted ? "thanks" : showForm ? "form" : `q${step}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="questionnaire-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{ position: "fixed", inset: 0, zIndex: 400, background: "#080e1a", overflow: "hidden" }}
        >
          {/* Frame background — slides left on each step advance */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={bgKey}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: "absolute", inset: 0 }}
            >
              <svg width="100%" height="100%" viewBox="0 0 420 800" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
                {bgFrameSet.map(f => <FrameEl key={f.id} frame={f} opacity={0.28} />)}
              </svg>
            </motion.div>
          </AnimatePresence>

          {/* Vignette */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 45%, rgba(8,14,26,0.55) 15%, rgba(8,14,26,0.92) 100%)", zIndex: 1 }} />

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.15, color: CREAM }}
            style={{ position: "absolute", top: "1.2rem", right: "1.2rem", zIndex: 10, background: "none", border: "none", color: "#3a4a68", fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
          >
            ×
          </motion.button>

          {/* Progress dots */}
          {!submitted && (
            <div style={{ position: "absolute", top: "1.3rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7, zIndex: 10 }}>
              {QUESTIONS.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ background: i <= step ? GOLD : "#1e2e48", scale: i === step ? 1.3 : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: 6, height: 6, borderRadius: "50%" }}
                />
              ))}
            </div>
          )}

          {/* Content layer */}
          <div style={{ position: "absolute", inset: 0, zIndex: 5, overflow: "hidden" }}>
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <ThankYou key="thanks" onClose={onClose} />
              ) : showForm ? (
                <ContactForm key="form" onSubmit={handleSubmit} />
              ) : (
                <QuestionPanel key={`q-${step}`} q={QUESTIONS[step]} step={step} onSelect={handleSelect} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── FLOATING CTA BUTTON ──────────────────────────────────────────────────────
function FloatingButton({ onClick }) {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    return scrollY.on("change", v => setPastHero(v > window.innerHeight * 0.6));
  }, [scrollY]);

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.button
          key="fab"
          onClick={onClick}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 150, background: GOLD, border: "none", color: "#1a1208", width: 52, height: 52, borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 24px rgba(200,160,74,0.3)`, fontFamily: "serif" }}
          title="Book Sanaa"
        >
          ✦
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

// ─── INLINE QUESTIONNAIRE SECTION ─────────────────────────────────────────────
function InlineQuestionnaire() {
  const [step, setStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = useCallback(() => {
    const q = QUESTIONS[step];
    if (q.isFinal) { setShowForm(true); return; }
    setStep(s => s + 1);
  }, [step]);

  const bgKey = submitted ? "thanks" : showForm ? "form" : `q${step}`;
  const bgFrameSet = submitted ? QUEST_FRAMES[5] : showForm ? QUEST_FRAMES[4] : QUEST_FRAMES[Math.min(step, 3)];

  return (
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>

      {/* Solid base blocks parallax bleed-through */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: BG }} />

      {/* Sliding frame background per question */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={bgKey}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 420 800"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: "absolute", inset: 0 }}>
            {bgFrameSet.map(f => <FrameEl key={f.id} frame={f} opacity={0.28} />)}
          </svg>
        </motion.div>
      </AnimatePresence>

      {/* Vignette — heavy to keep text readable */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "radial-gradient(ellipse at 50% 65%, rgba(8,14,26,0.45) 10%, rgba(8,14,26,0.88) 100%)", pointerEvents: "none" }} />

      {/* Top fade — frames and bg dissolve together into the section above */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "22rem", zIndex: 3, background: `linear-gradient(to bottom, ${BG} 0%, ${BG}f0 20%, ${BG}99 55%, transparent 100%)`, pointerEvents: "none" }} />

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5rem", zIndex: 3, background: `linear-gradient(to top, ${BG}, transparent)`, pointerEvents: "none" }} />

      {/* Progress dots */}
      {!submitted && (
        <div style={{ position: "absolute", top: "1.8rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7, zIndex: 5 }}>
          {QUESTIONS.map((_, i) => (
            <motion.div
              key={i}
              animate={{ background: i <= step ? GOLD : "#1e2e48", scale: i === step ? 1.3 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ width: 6, height: 6, borderRadius: "50%" }}
            />
          ))}
        </div>
      )}

      {/* Sliding content */}
      <div style={{ position: "relative", zIndex: 5, overflow: "hidden" }}>
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <ThankYou key="thanks" onClose={() => { setStep(0); setShowForm(false); setSubmitted(false); }} />
          ) : showForm ? (
            <ContactForm key="form" onSubmit={() => setSubmitted(true)} />
          ) : (
            <QuestionPanel key={`q-${step}`} q={QUESTIONS[step]} step={step} onSelect={handleSelect} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SanaaPhotography() {
  const [areaW, setAreaW] = useState(420);
  const questRef = useRef(null);

  useEffect(() => {
    const update = () => setAreaW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollToQuest = useCallback(() => {
    questRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${BG}; color: ${CREAM}; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        h1, h2, h3, p, button, label { text-shadow: 0 1px 18px rgba(0,0,0,0.45); }
        input::placeholder { color: #1e2e48; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: #1e2e48; }
      `}</style>

      <div style={{ position: "relative", background: BG, minHeight: "100vh" }}>

        <ParallaxFrames areaW={areaW} />

        {/* Grain */}
        <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.28,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")` }} />

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: `linear-gradient(to bottom, ${BG}e0, transparent)` }}
        >
          <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.95rem", color: GOLD, letterSpacing: "0.05em" }}>Sanaa</span>
          <motion.button
            onClick={scrollToQuest}
            whileHover={{ color: CREAM }}
            style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.8rem", color: MUTED, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            Let's begin →
          </motion.button>
        </motion.nav>

        <div style={{ position: "relative", zIndex: 2 }}>

          {/* HERO */}
          <Sec>
            <div style={{ textAlign: "center" }}>
              <Reveal>
                <p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.78rem", letterSpacing: "0.24em", color: MUTED, textTransform: "uppercase", marginBottom: "1.5rem" }}>Austin, Texas</p>
              </Reveal>
              <Reveal delay={0.12}>
                <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(2.8rem,12vw,4.8rem)", fontWeight: 400, color: CREAM, lineHeight: 1.1, marginBottom: "1.4rem" }}>
                  Sanaa<br /><em style={{ color: GOLD }}>Photography</em>
                </h1>
              </Reveal>
              <Reveal delay={0.24}>
                <p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "1.1rem", color: "#5a6a88", lineHeight: 1.9, maxWidth: 290, margin: "0 auto 3.5rem" }}>
                  Wedding photography for couples who believe every frame tells a story worth keeping.
                </p>
              </Reveal>
              <Reveal delay={0.38}>
                <motion.button
                  onClick={scrollToQuest}
                  whileHover={{ scale: 1.04, opacity: 0.9 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ background: "none", border: `1px solid ${GOLD}44`, color: GOLD, padding: "0.75rem 2rem", fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.9rem", cursor: "pointer", borderRadius: "2px", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Begin here ↓
                </motion.button>
              </Reveal>
            </div>
          </Sec>

          {/* ABOUT */}
          <Sec>
            <Reveal><p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.76rem", letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>About Sanaa</p></Reveal>
            <Reveal delay={0.09}>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(1.7rem,7vw,2.5rem)", fontWeight: 400, color: CREAM, lineHeight: 1.25, marginBottom: "2rem", maxWidth: 340 }}>
                I document what words leave out.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "1.03rem", color: "#5a6a88", lineHeight: 1.95, marginBottom: "1.4rem" }}>
                I'm Sanaa, a documentary-style wedding photographer rooted in Austin. I'm drawn to the quiet in-between moments — a hand squeeze before the doors open, a grandmother laughing mid-toast, the last song when no one wants to leave.
              </p>
            </Reveal>
            <Reveal delay={0.27}>
              <p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "1.03rem", color: "#5a6a88", lineHeight: 1.95 }}>
                My work is warm, honest, and unhurried. I'm not just there to photograph your wedding — I'm there to remember it with you.
              </p>
            </Reveal>
          </Sec>

          {/* APPROACH */}
          <Sec>
            <Reveal><p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.76rem", letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>The approach</p></Reveal>
            <Reveal delay={0.09}>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(1.7rem,7vw,2.5rem)", fontWeight: 400, color: CREAM, lineHeight: 1.25, marginBottom: "2.4rem" }}>
                A gallery you'll return to for decades.
              </h2>
            </Reveal>
            {[
              { n: "01", t: "Documentary at heart", b: "No forced poses. I follow the day as it unfolds and find the frame within it." },
              { n: "02", t: "Film-inspired editing",  b: "Warm tones, deep shadows, grain that feels like memory. Your photos will age like a print, not a filter." },
              { n: "03", t: "Full day coverage",      b: "From the quiet morning getting ready to the last slow dance. Nothing missed." },
            ].map((item, i) => (
              <Reveal key={item.n} delay={0.12 + i * 0.1}>
                <div style={{ marginBottom: "2rem", paddingLeft: "1rem", borderLeft: "1px solid #1a2840" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: GOLD, opacity: 0.55 }}>{item.n}</span>
                  <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.02rem", color: CREAM, fontWeight: 400, margin: "0.25rem 0 0.38rem" }}>{item.t}</h3>
                  <p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.96rem", color: "#3e4e68", lineHeight: 1.78, margin: 0 }}>{item.b}</p>
                </div>
              </Reveal>
            ))}
          </Sec>

          {/* INVESTMENT */}
          <Sec>
            <Reveal><p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.76rem", letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>Investment</p></Reveal>
            <Reveal delay={0.09}>
              <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(1.7rem,7vw,2.5rem)", fontWeight: 400, color: CREAM, lineHeight: 1.25, marginBottom: "2rem" }}>
                Made to fit your day.
              </h2>
            </Reveal>
            {[
              { name: "The Elopement", hours: "4 hours",  price: "from $1,800" },
              { name: "The Full Day",  hours: "8 hours",  price: "from $3,200" },
              { name: "The Weekend",   hours: "Two days", price: "from $5,500" },
            ].map((pkg, i) => (
              <Reveal key={pkg.name} delay={0.1 + i * 0.09}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.05rem 0", borderBottom: "1px solid #151f30" }}>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.98rem", color: CREAM, margin: 0, fontWeight: 400 }}>{pkg.name}</p>
                    <p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.86rem", color: "#344050", margin: 0 }}>{pkg.hours}</p>
                  </div>
                  <p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.95rem", color: GOLD, margin: 0 }}>{pkg.price}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.86rem", color: "#344050", marginTop: "1.4rem", fontStyle: "italic" }}>
                All packages include a private online gallery, print release, and a lot of care.
              </p>
            </Reveal>
          </Sec>

          {/* PRE-QUESTIONNAIRE CTA */}
          <section style={{ position: "relative", padding: "8rem 2rem", textAlign: "center", minHeight: "50svh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${BG}d0 20%, ${BG}80 100%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <Reveal><p style={{ fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.76rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem", opacity: 0.8 }}>Your story is waiting</p></Reveal>
              <Reveal delay={0.1}>
                <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(1.9rem,8vw,2.7rem)", fontWeight: 400, color: CREAM, lineHeight: 1.25, maxWidth: 320, margin: "0 auto 2rem" }}>
                  Let's put your photos in a frame worth keeping.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <motion.button
                  onClick={scrollToQuest}
                  whileHover={{ scale: 1.04, opacity: 0.9 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ background: GOLD, border: "none", color: "#1a1208", padding: "1rem 2.5rem", fontFamily: "'Playfair Display',Georgia,serif", fontSize: "0.95rem", cursor: "pointer", borderRadius: "2px", letterSpacing: "0.05em" }}
                >
                  Begin here
                </motion.button>
              </Reveal>
              <Reveal delay={0.32}>
                <p style={{ marginTop: "3rem", fontFamily: "'Crimson Text',Georgia,serif", fontSize: "0.8rem", color: "#1e2e48" }}>
                  Austin, TX · Available worldwide
                </p>
              </Reveal>
            </div>
          </section>

          {/* QUESTIONNAIRE — inline bottom section */}
          <div ref={questRef}>
            <InlineQuestionnaire />
          </div>

        </div>
      </div>

      <FloatingButton onClick={scrollToQuest} />
    </>
  );
}
