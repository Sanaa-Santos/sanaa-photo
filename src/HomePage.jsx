import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import sitePattern from "./assets/sitebg.jpg";

const BISQUE    = "#F7DDC2";
const FIREBRICK = "#8E1D1F";
const SADDLE    = "#644028";
const KHAKI     = "#ACAF9A";

const HERO_URL        = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781807787/herobanner_g72oiv.jpg";
const FRAME_1         = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781807957/corbin-zuleyma-austin-wedding-frame-1_lkrvd3.jpg";
const FRAME_2         = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781808037/corbin-zuleyma-austin-wedding-frame-2_ps7esr.jpg";
const FRAME_3         = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781808132/corbin-zuleyma-austin-wedding-frame-3_xupj5w.jpg";
const FRAME_4         = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781811894/corbin-zuleyma-austin-wedding-frame-4_qeau0b.jpg";
const WEDDING_1       = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781808430/courtney-megan-austin-ranch-wedding-portfolio_pnlrct.jpg";
const WEDDING_2       = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781808583/jake-farzana-austin-hill-country-wedding-portfolio_m7ez5i.jpg";
const WEDDING_3       = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781808772/corbin-zuleyma-austin-downtown-wedding-portfolio_rbn9lx.jpg";
const REVIEW_URL      = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781812102/jake-farzana-review_qabofx.jpg";
const PRICE_URL       = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781810036/courtney-megan-austin-wedding-flat-rate-section_gjawmj.jpg";
const CATS_GREEN      = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781811065/Green-cats_yssk3o.png";
const CATS_CREAM      = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781811066/Cream-cats_nbnxvi.png";
const CACTUS_URL      = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781833031/cactus_uqyno6.png";
const BOOTS_URL       = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781833083/boots_fwnp5g.png";
const HAT_URL         = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781833117/hat_cjxrve.png";
const SANSAN_URL      = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781835662/sansan_a2uxlg.png";
const LOGO_RED_WORD   = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781811245/Sansan_Stills_name_01_nxkfee.png";
const LOGO_CREAM_WORD = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781813367/Sansan_Stills_name_03_k93cdv.png";
const LOGO_CREAM_CAT  = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781813338/Sansan_Stills_icon_03_ovwd1h.png";

const MAX_W = 680;
const DESKTOP_BREAKPOINT = 900;

// Lightweight hook used ONLY to branch a handful of desktop-specific values
// (sizing/layout) below MAX_W's centered mobile column. Mobile behavior is
// completely unaffected — this never changes markup or styles below the
// breakpoint, only adds alternate values above it.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= DESKTOP_BREAKPOINT : false
  );
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    window.addEventListener("resize", onResize, { passive:true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isDesktop;
}

const Diamond = ({ color = FIREBRICK, size = 8 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none"
    style={{ display:"inline-block", flexShrink:0, verticalAlign:"middle" }}>
    <rect x="5" y="0.5" width="6.5" height="6.5" rx="0.4"
      transform="rotate(45 5 0.5)" fill={color} />
  </svg>
);

function FadeIn({ children, delay=0, y=20, style={} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, delay, ease:[0.22,1,0.36,1] }}
      style={style}
    >{children}</motion.div>
  );
}

function Shell({ children, outerBg=BISQUE, innerBg=BISQUE, outerStyle={}, innerStyle={} }) {
  return (
    <div style={{ position:"relative", background:outerBg, ...outerStyle }}>
      <div style={{ position:"absolute", inset:0, zIndex:0,
        backgroundImage:`url(${sitePattern})`, backgroundRepeat:"repeat",
        backgroundSize:"clamp(260px,28vw,480px)", opacity:0.12, pointerEvents:"none" }}/>
      <div style={{ position:"relative", zIndex:1, maxWidth:MAX_W, margin:"0 auto",
        background:innerBg, ...innerStyle }}>
        {children}
      </div>
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ onOpenQuestionnaire }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ["Home","Portfolio","Investment","Experience","About"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showCream = scrolled || menuOpen;

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        background: scrolled ? FIREBRICK : "transparent",
        transition:"background 0.35s ease",
        pointerEvents:"none",
      }}>
        <div style={{
          maxWidth:MAX_W, margin:"0 auto",
          height:60, display:"flex", alignItems:"center",
          padding:"0 1.5rem", position:"relative",
          pointerEvents:"all",
        }}>
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu"
            style={{ background:"none", border:"none", cursor:"pointer",
              display:"flex", flexDirection:"column", gap:6, padding:"4px", zIndex:1 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display:"block", width:28, height:2.5,
                background:BISQUE, borderRadius:2 }}/>
            ))}
          </button>

          {/* Wordmark — centered, crossfades red↔cream on scroll */}
          <div style={{ position:"absolute", left:0, right:0,
            display:"flex", justifyContent:"center", pointerEvents:"none" }}>
            <div style={{ position:"relative", height:42, width:160,
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              <img src={LOGO_RED_WORD} alt="Sansan Stills"
                style={{ height:42, width:"auto", position:"absolute",
                  opacity: showCream ? 0 : 1, transition:"opacity 0.35s ease" }}/>
              <img src={LOGO_CREAM_WORD} alt="Sansan Stills"
                style={{ height:42, width:"auto", position:"absolute",
                  opacity: showCream ? 1 : 0, transition:"opacity 0.35s ease" }}/>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div key="drawer"
            initial={{ x:"-100%" }} animate={{ x:0 }} exit={{ x:"-100%" }}
            transition={{ duration:0.48, ease:[0.22,1,0.36,1] }}
            style={{ position:"fixed", inset:0, zIndex:200, background:FIREBRICK,
              display:"flex", flexDirection:"column", justifyContent:"space-between",
              padding:"1.1rem 2rem 3rem" }}>
            <div style={{ display:"flex", alignItems:"center", position:"relative", height:60 }}>
              <button onClick={() => setMenuOpen(false)}
                style={{ background:"none", border:`1.5px solid rgba(247,221,194,0.45)`,
                  color:BISQUE, width:38, height:38, borderRadius:"50%",
                  fontSize:"0.85rem", cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
              {/* Wordmark at same spot as nav — centered in the row */}
              <div style={{ position:"absolute", left:0, right:0,
                display:"flex", justifyContent:"center", pointerEvents:"none" }}>
                <img src={LOGO_CREAM_WORD} alt="Sansan Stills"
                  style={{ height:42, width:"auto" }}/>
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:"0.05rem", paddingLeft:"0.5rem" }}>
              {navLinks.map((link,i) => (
                <motion.a key={link} href="#"
                  initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.08+i*0.07, duration:0.45, ease:[0.22,1,0.36,1] }}
                  onClick={() => setMenuOpen(false)}
                  style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
                    fontSize:"clamp(2.2rem, 9vw, 4rem)",
                    color:BISQUE, textDecoration:"none", lineHeight:1.25, opacity:0.92 }}>
                  {link}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.5, duration:0.4 }}
                onClick={() => { setMenuOpen(false); onOpenQuestionnaire(); }}
                style={{ marginTop:"1.8rem", background:BISQUE, border:"none", color:FIREBRICK,
                  padding:"0.9rem 2rem", fontFamily:"'Manrope', sans-serif",
                  fontSize:"0.75rem", fontWeight:700,
                  letterSpacing:"0.14em", textTransform:"uppercase",
                  borderRadius:"999px", cursor:"pointer", alignSelf:"flex-start" }}>
                Tell Us About Your Day
              </motion.button>
            </div>

            <div style={{ display:"flex", justifyContent:"center" }}>
              <img src={LOGO_CREAM_CAT} alt="" style={{ height:48, width:"auto", opacity:0.8 }}/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero({ onOpenQuestionnaire }) {
  return (
    <Shell>
      <section style={{ position:"relative", minHeight:"100svh", display:"flex", alignItems:"flex-end" }}>
        <img src={HERO_URL} alt="Wedding couple"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center top", display:"block" }}/>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}/>
        <div style={{ position:"relative", zIndex:2, width:"100%", padding:"0 1.5rem 3.5rem" }}>
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.35 }}
            style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:BISQUE, opacity:0.72, marginBottom:"0.5rem",
              display:"flex", alignItems:"center", gap:"0.5rem" }}>
            <Diamond color={FIREBRICK} size={7}/>Austin, TX Based Wedding Photography
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.85, delay:0.5 }}
            style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(2.6rem, 11vw, 5rem)",
              fontWeight:400, color:BISQUE, lineHeight:1.08, marginBottom:"2rem" }}>
            Real love,<br/>curated
          </motion.h1>
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.65 }}
            style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}>
            <button onClick={onOpenQuestionnaire} style={{
              background:FIREBRICK, border:"none", color:BISQUE,
              padding:"1rem 2rem", width:"100%",
              fontFamily:"'Manrope', sans-serif", fontSize:"0.72rem", fontWeight:700,
              letterSpacing:"0.16em", textTransform:"uppercase",
              borderRadius:"999px", cursor:"pointer" }}>Tell Us About Your Day</button>
            <button style={{
              background:"transparent", border:"1.5px solid rgba(247,221,194,0.45)",
              color:BISQUE, padding:"1rem 2rem", width:"100%",
              fontFamily:"'Manrope', sans-serif", fontSize:"0.72rem", fontWeight:500,
              letterSpacing:"0.16em", textTransform:"uppercase",
              borderRadius:"999px", cursor:"pointer" }}>See Pricing</button>
          </motion.div>
        </div>
      </section>
    </Shell>
  );
}

// ── INTRO / FRAMES ────────────────────────────────────────────────────────────
// Layout per mockup screenshot:
//  - LEFT col: blurb text, then the large landscape photo, then the caption —
//    all stacked together, the column's width matching the photo (+5px)
//  - RIGHT col: square, landscape, and circle photos stacked, each ~10% smaller,
//    with more breathing room between them
function IntroSection() {
  const isDesktop = useIsDesktop();
  return (
    <Shell>
      <div style={{ position:"absolute", inset:0, zIndex:0,
        backgroundImage:`url(${CATS_GREEN})`, backgroundRepeat:"repeat",
        backgroundSize:"clamp(280px,38vw,540px)", opacity:0.33, pointerEvents:"none" }}/>

      <div style={{ position:"relative", zIndex:1, padding:"2.5rem 1.5rem 2.5rem" }}>
        {/* Grid: left col = text + photo + caption stacked; right col = 3 smaller photos */}
        <div style={{ display:"grid", gridTemplateColumns:"calc(55% + 5px) calc(45% - 5px)", gap:8,
          alignItems:"start" }}>

          {/* LEFT COLUMN — text, photo, caption */}
          <div style={isDesktop ? { marginTop:"2.5rem" } : undefined}>
            <FadeIn>
              <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.95rem", color:SADDLE,
                lineHeight:1.75, marginBottom:"1.5rem" }}>
                Candid wedding photography for couples who want to enjoy their day. The whole day.
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div style={{ aspectRatio:"3/2.5", overflow:"hidden",
                border:`3px solid ${FIREBRICK}` }}>
                <img src={FRAME_1} alt=""
                  style={{ width:"100%", height:"100%", objectFit:"cover",
                    objectPosition:"center 40%", display:"block" }}/>
              </div>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.6rem",
                letterSpacing:"0.18em", textTransform:"uppercase",
                color:SADDLE, opacity:0.65, marginTop:"0.9rem", fontWeight:700,
                display:"flex", alignItems:"center", gap:"0.45rem" }}>
                <Diamond color={SADDLE} size={6}/>Corbin & Zuleyma — Austin, TX
              </p>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN — 3 stacked smaller photos, ~10% smaller, more gap */}
          <div style={{ display:"flex", flexDirection:"column", gap:24,
            width:"88%", justifySelf:"end" }}>
            {/* Square */}
            <div style={{ aspectRatio:"1/1", overflow:"hidden",
              border:`3px solid ${FIREBRICK}` }}>
              <img src={FRAME_2} alt=""
                style={{ width:"100%", height:"100%", objectFit:"cover",
                  objectPosition:"center top", display:"block" }}/>
            </div>
            {/* Landscape */}
            <div style={{ aspectRatio:"4/3", overflow:"hidden",
              border:`3px solid ${FIREBRICK}` }}>
              <img src={FRAME_3} alt=""
                style={{ width:"100%", height:"100%", objectFit:"cover",
                  objectPosition:"center center", display:"block" }}/>
            </div>
            {/* Circle */}
            <div style={{ aspectRatio:"1/1", overflow:"hidden",
              borderRadius:"50%", border:`3px solid ${FIREBRICK}` }}>
              <img src={FRAME_4} alt=""
                style={{ width:"100%", height:"100%", objectFit:"cover",
                  objectPosition:"center center", display:"block" }}/>
            </div>
          </div>

        </div>
      </div>
    </Shell>
  );
}

// ── TICKER ────────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
    "Real, not performative","One flat rate","No overtime charges",
    "Full day coverage","Austin, TX based","Documentary style",
    "Real, not performative","One flat rate","No overtime charges",
    "Full day coverage","Austin, TX based","Documentary style",
  ];
  return (
    <Shell outerBg={BISQUE} innerBg={FIREBRICK}>
        <div style={{ overflow:"hidden", padding:"0.9rem 0" }}>
          <motion.div
            animate={{ x:["0%","-50%"] }}
            transition={{ duration:28, repeat:Infinity, ease:"linear" }}
            style={{ display:"flex", whiteSpace:"nowrap", width:"max-content" }}>
            {[...items,...items].map((item,i) => (
              <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:"0.8rem",
                fontFamily:"'Manrope', sans-serif", fontSize:"0.65rem", letterSpacing:"0.22em",
                textTransform:"uppercase", color:BISQUE, opacity:0.88, paddingRight:"2rem" }}>
                <Diamond color={BISQUE} size={6}/>{item}
              </span>
            ))}
          </motion.div>
        </div>
    </Shell>
  );
}

// ── RECENT WEDDINGS ───────────────────────────────────────────────────────────
function RecentWeddings() {
  const weddings = [
    { name:"Megan & Courtney", location:"Austin, TX", img:WEDDING_1,
      illSrc:CACTUS_URL, illW:170, objPos:"center 75%" },
    { name:"Jake & Farzana",   location:"Austin, TX", img:WEDDING_2,
      illSrc:BOOTS_URL,  illW:88, objPos:"center center" },
    { name:"Corbin & Zuleyma", location:"Austin, TX", img:WEDDING_3,
      illSrc:HAT_URL,    illW:120, objPos:"center center" },
  ];

  return (
    <Shell>
      <div style={{ padding:"3rem 1.5rem 0" }}>
        <FadeIn>
          <h2 style={{ fontFamily:"'Libre Baskerville', serif",
            fontSize:"clamp(1.9rem, 8vw, 3rem)",
            fontWeight:400, color:FIREBRICK, lineHeight:1.12, marginBottom:"0.3rem" }}>
            Recent <em>weddings</em>
          </h2>
          <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.78rem",
            color:SADDLE, opacity:0.68, marginBottom:"1.5rem" }}>
            Weddings that left me feeling inspired.
          </p>
        </FadeIn>

        <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
          {weddings.map((w,i) => (
            <FadeIn key={w.name} delay={i*0.08}>
              <div style={{ display:"flex", flexDirection:"column", gap:"15px" }}>
                <div style={{ overflow:"hidden", aspectRatio:"16/9" }}>
                  <motion.img src={w.img} alt={w.name}
                    whileHover={{ scale:1.03 }} transition={{ duration:0.5 }}
                    style={{ width:"100%", height:"100%", objectFit:"cover",
                      objectPosition:w.objPos, display:"block" }}/>
                </div>
                <div style={{ display:"flex", alignItems:"flex-start",
                  justifyContent:"space-between", gap:"0.75rem" }}>
                  <div style={{ display:"flex", flexDirection:"column", gap:"0.15rem" }}>
                    <h3 style={{ fontFamily:"'Libre Baskerville', serif",
                      fontStyle:"italic", fontSize:"1.35rem",
                      fontWeight:400, color:FIREBRICK, margin:0, lineHeight:1.15 }}>{w.name}</h3>
                    <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
                      letterSpacing:"0.18em", textTransform:"uppercase",
                      color:SADDLE, opacity:0.55, margin:0 }}>{w.location}</p>
                  </div>
                  <div style={{ width:w.illW, flexShrink:0, pointerEvents:"none",
                    mixBlendMode:"multiply", opacity:0.55 }}>
                    <img src={w.illSrc} alt="" style={{ width:"100%", display:"block" }}/>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* SAN SAN — full-width wordmark sitting on this section's BISQUE
            background, matching the mockup: khaki-colored letters read
            clearly against bisque. The CTA button overlaps the gap between
            the two stacked "SAN" words. */}
        <FadeIn delay={0.1}>
          <div style={{ position:"relative", marginTop:"2.5rem" }}>
            {/*
              The SAN SAN PNG is used purely as a shape mask. We apply it as a
              mask-image on a div filled with solid KHAKI (#ACAF9A) — this gives
              an exact, flat color match against the bisque backdrop. The real
              <img> is kept (invisible) to drive the container's natural
              aspect ratio.
            */}
            <div style={{ position:"relative", width:"108%", marginLeft:"-4%" }}>
              <img src={SANSAN_URL} alt="San San" style={{ width:"100%", display:"block", visibility:"hidden" }}/>
              <div style={{
                position:"absolute", inset:0,
                backgroundColor: KHAKI,
                WebkitMaskImage: `url(${SANSAN_URL})`,
                maskImage: `url(${SANSAN_URL})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}/>
            </div>
            {/* Button centered over the gap between the two stacked SAN words */}
            <div style={{ position:"absolute", top:"42%", left:0, right:0,
              display:"flex", justifyContent:"center", zIndex:2 }}>
              <a href="#" style={{
                display:"inline-block",
                border:`1.5px solid ${FIREBRICK}`,
                color:FIREBRICK, padding:"0.85rem 2.5rem",
                fontFamily:"'Manrope', sans-serif", fontSize:"0.72rem", fontWeight:600,
                letterSpacing:"0.16em", textTransform:"uppercase",
                borderRadius:"999px", textDecoration:"none",
                background:BISQUE }}>View Full Portfolio</a>
            </div>
          </div>
        </FadeIn>

      </div>
    </Shell>
  );
}

// ── HOW WE SHOOT + SLIDER ─────────────────────────────────────────────────────
// KHAKI bg with cream cats covers text section + top half of slider.
// Bottom half of slider transitions to BISQUE.
// Implemented as one outer div with the KHAKI bg, then a BISQUE bottom half.
function HowWeShoot() {
  const points = [
    { label:"We catch it as it happens",
      body:"We document the real day, including all the in-between moments you didn't even realize were happening." },
    { label:"Every shot flattering. That's not luck.",
      body:"My first job was fashion photography. Angles, light, and easy direction are second nature." },
    { label:"There the whole day",
      body:"You tell us when to start and stop. If the party keeps going, so do we." },
  ];

  // The KHAKI + cream-cats area spans from the top of this section's text
  // down through the top half of the slider — rendered as ONE continuous
  // tiled background (single element) so the pattern never restarts/seams
  // at any boundary. SAN SAN lives in RecentWeddings (on bisque) and dips
  // down into this section's khaki via a negative bottom margin there.
  // The whole khaki block sits inside the same bisque+tile-pattern outer
  // treatment as every other section, using the SAME content-column width
  // (MAX_W) as every other section so it never sticks out wider than the
  // rest of the page.
  return (
    <div style={{ position:"relative", background:BISQUE }}>
      <div style={{ position:"absolute", inset:0, zIndex:0,
        backgroundImage:`url(${sitePattern})`, backgroundRepeat:"repeat",
        backgroundSize:"clamp(260px,28vw,480px)", opacity:0.12, pointerEvents:"none" }}/>
      <div style={{ position:"relative", zIndex:1,
        maxWidth:MAX_W, margin:"0 auto",
        background:KHAKI, overflow:"hidden" }}>
        {/* Single continuous cat-pattern layer spanning SAN SAN + text + slider-top */}
        <div className="howweshoot-cats" style={{ position:"absolute", inset:0, zIndex:0,
          backgroundImage:`url(${CATS_CREAM})`, backgroundRepeat:"repeat",
          backgroundSize:"clamp(280px,38vw,540px)", opacity:0.33, pointerEvents:"none" }}/>

        {/* Text content */}
        <div style={{ position:"relative", zIndex:1, maxWidth:MAX_W, margin:"0 auto" }}>
          <div style={{ padding:"1.5rem 1.5rem 3rem" }}>
          <FadeIn>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.90rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:FIREBRICK, marginBottom:"0.4rem" }}>How We Shoot</p>
            <h2 style={{ fontFamily:"'Libre Baskerville', serif",
              fontSize:"clamp(1.8rem, 7.5vw, 2.9rem)",
              fontWeight:400, color:FIREBRICK, lineHeight:1.15, marginBottom:"2.5rem" }}>
              A Rundown of the <em>Big Day</em>
            </h2>
          </FadeIn>
          <div style={{ display:"flex", flexDirection:"column", gap:"2.2rem" }}>
            {points.map((pt,i) => (
              <FadeIn key={i} delay={i*0.1}>
                <div>
                  <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.6rem",
                    letterSpacing:"0.2em", textTransform:"uppercase",
                    color:FIREBRICK, fontWeight:700, marginBottom:"0.4rem",
                    display:"flex", alignItems:"center", gap:"0.5rem" }}>
                    <Diamond color={FIREBRICK} size={7}/>{pt.label}
                  </p>
                  <p style={{ fontFamily:"'Manrope', sans-serif",
                    fontSize:"0.9rem", color:SADDLE, lineHeight:1.78, opacity:0.9 }}>
                    {pt.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Slider — sits directly under the text, still within the same
            continuous KHAKI + cats background. A BISQUE band is layered on
            top to cover the bottom half of the slider only. */}
        <div style={{ position:"relative", overflow:"hidden" }}>
          {/* BISQUE band — bottom half, drawn over the continuous cat bg */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%",
            background:BISQUE, zIndex:0 }}/>

          <div style={{ position:"relative", zIndex:1 }}>
            <FadeIn delay={0.1}>
              <div style={{ display:"flex", gap:10, overflowX:"auto",
                paddingBottom:"3rem", paddingTop:"2rem",
                scrollbarWidth:"none", WebkitOverflowScrolling:"touch",
                paddingLeft:"1.5rem", paddingRight:"1.5rem" }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ flexShrink:0, width:"65vw", maxWidth:240,
                    aspectRatio:"2/3",
                    background:"rgba(247,221,194,0.55)",
                    border:"1px dashed rgba(100,64,40,0.22)",
                    borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontFamily:"'Manrope', sans-serif",
                      fontSize:"0.6rem", letterSpacing:"0.15em",
                      textTransform:"uppercase", color:SADDLE, opacity:0.4 }}>Photo {i}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

// ── TESTIMONIAL ───────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <Shell>
      <div style={{ padding:"4rem 1.5rem" }}>
        <FadeIn>
          <div style={{ overflow:"hidden", aspectRatio:"4/3", marginBottom:"2rem" }}>
            <img src={REVIEW_URL} alt="Jake & Farzana"
              style={{ width:"100%", height:"100%", objectFit:"cover",
                objectPosition:"center 65%", display:"block" }}/>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <blockquote style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
            fontSize:"clamp(1.15rem, 5vw, 1.6rem)",
            fontWeight:400, color:FIREBRICK, lineHeight:1.5, marginBottom:"1rem" }}>
            "I can say with 100% confidence that having Sanaa capture our best day was the highlight of our entire experience."
          </blockquote>
          <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
            letterSpacing:"0.18em", textTransform:"uppercase",
            color:SADDLE, opacity:0.55, display:"flex", alignItems:"center", gap:"0.5rem" }}>
            <Diamond color={SADDLE} size={6}/>Jake & Farzana
          </p>
        </FadeIn>
      </div>
    </Shell>
  );
}

// ── PRICING CTA ───────────────────────────────────────────────────────────────
function PricingCTA() {
  const isDesktop = useIsDesktop();
  return (
    <Shell>
      <section style={{ position:"relative", overflow:"hidden", aspectRatio:"3/4" }}>
        <img src={PRICE_URL} alt=""
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center center", display:"block" }}/>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg, rgba(247,221,194,0.45) 0%, transparent 40%)",
          pointerEvents:"none" }}/>
        <div style={{ position:"relative", zIndex:1, padding:"2rem 1.5rem 0" }}>
          <FadeIn>
            <p style={{ fontFamily:"'Manrope', sans-serif",
              fontSize: isDesktop ? "0.85rem" : "0.62rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:FIREBRICK, opacity:0.9, marginBottom: isDesktop ? "0.5rem" : "0.25rem" }}>The Flat Rate</p>
            <h2 style={{ fontFamily:"'Libre Baskerville', serif",
              fontSize: isDesktop ? "clamp(2.8rem, 5vw, 4.2rem)" : "clamp(1.8rem, 8vw, 2.8rem)",
              fontWeight:400, color:FIREBRICK, lineHeight:1.08,
              marginBottom: isDesktop ? "0.6rem" : "0.35rem" }}>
              One day.<br/><em>One price.</em>
            </h2>
            <p style={{ fontFamily:"'Manrope', sans-serif",
              fontSize: isDesktop ? "1.05rem" : "0.78rem",
              color:FIREBRICK, opacity:0.8, marginBottom: isDesktop ? "1.8rem" : "1.2rem" }}>
              No surprises at the end of the night.
            </p>
            <a href="#" style={{ display:"inline-block",
              background:FIREBRICK, color:BISQUE,
              padding: isDesktop ? "1.1rem 2.6rem" : "0.85rem 2rem",
              fontFamily:"'Manrope', sans-serif",
              fontSize: isDesktop ? "0.85rem" : "0.7rem", fontWeight:700,
              letterSpacing:"0.14em", textTransform:"uppercase",
              borderRadius:"999px", textDecoration:"none" }}>See What's Included</a>
          </FadeIn>
        </div>
      </section>
    </Shell>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ onOpenQuestionnaire }) {
  const links = ["Home","Portfolio","Investment","Experience","About"];
  return (
    <Shell outerBg={FIREBRICK} innerBg={FIREBRICK}>
      <footer style={{ padding:"3.5rem 1.5rem 2.5rem", textAlign:"center" }}>
        <img src={LOGO_CREAM_CAT} alt=""
          style={{ height:48, width:"auto", marginBottom:"2rem" }}/>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
          gap:"0.05rem", marginBottom:"2rem" }}>
          {links.map(link => (
            <a key={link} href="#" style={{ fontFamily:"'Libre Baskerville', serif",
              fontStyle:"italic", fontSize:"clamp(1.4rem, 5vw, 2rem)",
              color:BISQUE, textDecoration:"none", lineHeight:1.3, opacity:0.88 }}>
              {link}
            </a>
          ))}
        </div>
        <div style={{ marginBottom:"2.5rem" }}>
          <button onClick={onOpenQuestionnaire} style={{
            background:BISQUE, border:"none", color:FIREBRICK,
            padding:"0.9rem 2.2rem", fontFamily:"'Manrope', sans-serif",
            fontSize:"0.7rem", fontWeight:700,
            letterSpacing:"0.14em", textTransform:"uppercase",
            borderRadius:"999px", cursor:"pointer" }}>Tell Us About Your Day</button>
        </div>
        <div style={{ borderTop:"1px solid rgba(247,221,194,0.18)", paddingTop:"1.5rem",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"0.35rem" }}>
          <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
            letterSpacing:"0.12em", color:BISQUE, opacity:0.45 }}>Austin, TX · Worldwide</p>
          <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
            letterSpacing:"0.1em", color:BISQUE, opacity:0.45 }}>@sansanstills · sanaa@sansanstills.com</p>
          <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.58rem",
            color:BISQUE, opacity:0.28, marginTop:"0.4rem" }}>© Sansan Stills 2026</p>
        </div>
      </footer>
    </Shell>
  );
}

export default function HomePage({ onOpenQuestionnaire }) {
  return (
    <>
      <Nav onOpenQuestionnaire={onOpenQuestionnaire}/>
      <main>
        <Hero onOpenQuestionnaire={onOpenQuestionnaire}/>
        <IntroSection/>
        <Ticker/>
        <RecentWeddings/>
        <HowWeShoot/>
        <Testimonial/>
        <PricingCTA/>
      </main>
      <Footer onOpenQuestionnaire={onOpenQuestionnaire}/>
    </>
  );
}
