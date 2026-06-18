import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import sitePattern from "./assets/sitebg.jpg";

const BISQUE    = "#F7DDC2";
const FIREBRICK = "#8E1D1F";
const SADDLE    = "#644028";
const KHAKI     = "#ACAF9A";
const GREEN_CAT_BG = "#ACAF9A22";

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
const CACTUS_URL      = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781814809/cactus_wbrany.png";
const BOOTS_URL       = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781814810/boots_dvnnio.png";
const HAT_URL         = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781814826/hat_gp2ucv.png";
const SANSAN_URL      = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781814828/sansan_khqsq6.png";
const LOGO_RED_WORD   = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781811245/Sansan_Stills_name_01_nxkfee.png";
const LOGO_CREAM_WORD = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781813367/Sansan_Stills_name_03_k93cdv.png";
const LOGO_CREAM_CAT  = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781813338/Sansan_Stills_icon_03_ovwd1h.png";

const Diamond = ({ color = FIREBRICK, size = 8 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={{ display:"inline-block", flexShrink:0, verticalAlign:"middle" }}>
    <rect x="5" y="0.5" width="6.5" height="6.5" rx="0.4" transform="rotate(45 5 0.5)" fill={color} />
  </svg>
);

function FadeIn({ children, delay=0, y=24, style={} }) {
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

// ── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ onOpenQuestionnaire }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["Home","Portfolio","Investment","Experience","About"];

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        display:"flex", alignItems:"center",
        padding:"1.2rem 1.8rem",
      }}>
        <button onClick={() => setMenuOpen(true)} aria-label="Open menu"
          style={{ background:"none", border:"none", cursor:"pointer",
            display:"flex", flexDirection:"column", gap:6,
            padding:"4px", zIndex:101 }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display:"block", width:28, height:2.5,
              background: BISQUE, borderRadius:2,
            }}/>
          ))}
        </button>

        {/* Wordmark — transitions between red and cream */}
        <div style={{
          position:"absolute", left:"50%", transform:"translateX(-50%)",
          zIndex:100, height:42, display:"flex", alignItems:"center",
        }}>
          <img src={LOGO_RED_WORD} alt="Sansan Stills"
            style={{ height:42, width:"auto", position:"absolute",
              opacity: menuOpen ? 0 : 1, transition:"opacity 0.3s" }} />
          <img src={LOGO_CREAM_WORD} alt="Sansan Stills"
            style={{ height:42, width:"auto", position:"absolute",
              opacity: menuOpen ? 1 : 0, transition:"opacity 0.3s" }} />
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div key="drawer"
            initial={{ x:"-100%" }} animate={{ x:0 }} exit={{ x:"-100%" }}
            transition={{ duration:0.48, ease:[0.22,1,0.36,1] }}
            style={{
              position:"fixed", inset:0, zIndex:200,
              background:FIREBRICK,
              display:"flex", flexDirection:"column",
              justifyContent:"space-between",
              padding:"1.2rem 2rem 3rem",
            }}
          >
            {/* Top row — close + cream wordmark in same spot as nav */}
            <div style={{ display:"flex", alignItems:"center", position:"relative", height:42 }}>
              <button onClick={() => setMenuOpen(false)}
                style={{
                  background:"none", border:`1.5px solid rgba(247,221,194,0.45)`,
                  color:BISQUE, width:38, height:38, borderRadius:"50%",
                  fontSize:"0.85rem", cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}
              >✕</button>
              {/* wordmark stays centered — same position as nav wordmark */}
              <img src={LOGO_CREAM_WORD} alt="Sansan Stills"
                style={{ height:42, width:"auto",
                  position:"absolute", left:"50%", transform:"translateX(-50%)" }} />
            </div>

            {/* Links */}
            <div style={{ display:"flex", flexDirection:"column", gap:"0.1rem", paddingLeft:"0.5rem" }}>
              {navLinks.map((link,i) => (
                <motion.a key={link} href="#"
                  initial={{ opacity:0, x:-24 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.08+i*0.07, duration:0.45, ease:[0.22,1,0.36,1] }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily:"'Libre Baskerville', serif",
                    fontStyle:"italic",
                    fontSize:"clamp(2.2rem, 9vw, 4rem)",
                    color:BISQUE, textDecoration:"none",
                    lineHeight:1.25, opacity:0.92,
                  }}
                >{link}</motion.a>
              ))}
              <motion.button
                initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.5, duration:0.4 }}
                onClick={() => { setMenuOpen(false); onOpenQuestionnaire(); }}
                style={{
                  marginTop:"1.8rem",
                  background:BISQUE, border:"none", color:FIREBRICK,
                  padding:"0.9rem 2rem",
                  fontFamily:"'Manrope', sans-serif",
                  fontSize:"0.75rem", fontWeight:700,
                  letterSpacing:"0.14em", textTransform:"uppercase",
                  borderRadius:"999px", cursor:"pointer", alignSelf:"flex-start",
                }}
              >Tell Us About Your Day</motion.button>
            </div>

            {/* Cat logo bottom — smaller */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <img src={LOGO_CREAM_CAT} alt="" style={{ height:48, width:"auto", opacity:0.8 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ onOpenQuestionnaire }) {
  return (
    <section style={{ position:"relative", width:"100%", minHeight:"100svh", display:"flex", alignItems:"flex-end", background:BISQUE }}>
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`url(${sitePattern})`,
        backgroundRepeat:"repeat",
        backgroundSize:"clamp(260px, 28vw, 480px)",
        opacity:0.12, pointerEvents:"none",
      }}/>
      <div style={{ position:"absolute", inset:0, display:"flex", justifyContent:"center", alignItems:"stretch" }}>
        <div style={{ width:"100%", maxWidth:680, position:"relative", overflow:"hidden" }}>
          <img src={HERO_URL} alt="Wedding couple"
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}/>
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.05) 100%)",
          }}/>
        </div>
      </div>
      <div style={{ position:"relative", zIndex:2, width:"100%", display:"flex", justifyContent:"center" }}>
        <div style={{ width:"100%", maxWidth:680, padding:"0 1.5rem 3.5rem" }}>
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.35 }}
            style={{
              fontFamily:"'Manrope', sans-serif",
              fontSize:"0.62rem", letterSpacing:"0.22em",
              textTransform:"uppercase", color:BISQUE,
              opacity:0.72, marginBottom:"0.6rem",
              display:"flex", alignItems:"center", gap:"0.5rem",
            }}
          ><Diamond color={FIREBRICK} size={7}/>Austin, TX Based Wedding Photography</motion.p>

          <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.85, delay:0.5 }}
            style={{
              fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(2.6rem, 11vw, 5rem)",
              fontWeight:400, color:BISQUE, lineHeight:1.08, marginBottom:"2.2rem",
            }}
          >Real love,<br/>curated</motion.h1>

          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.65 }}
            style={{ display:"flex", flexDirection:"column", gap:"0.65rem" }}
          >
            <button onClick={onOpenQuestionnaire} style={{
              background:FIREBRICK, border:"none", color:BISQUE,
              padding:"1rem 2rem", width:"100%",
              fontFamily:"'Manrope', sans-serif",
              fontSize:"0.72rem", fontWeight:700,
              letterSpacing:"0.16em", textTransform:"uppercase",
              borderRadius:"999px", cursor:"pointer",
            }}>Tell Us About Your Day</button>
            <button style={{
              background:"transparent",
              border:"1.5px solid rgba(247,221,194,0.45)",
              color:BISQUE, padding:"1rem 2rem", width:"100%",
              fontFamily:"'Manrope', sans-serif",
              fontSize:"0.72rem", fontWeight:500,
              letterSpacing:"0.16em", textTransform:"uppercase",
              borderRadius:"999px", cursor:"pointer",
            }}>See Pricing</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── INTRO / FRAMES ────────────────────────────────────────────────────────────
// Green cat bg, cactus bottom-right corner, hat top-right of photo grid
function IntroSection() {
  return (
    <section style={{ position:"relative", overflow:"hidden", background:BISQUE }}>
      {/* Green cats background at 33% */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`url(${CATS_GREEN})`,
        backgroundRepeat:"repeat",
        backgroundSize:"clamp(280px, 38vw, 540px)",
        opacity:0.33, pointerEvents:"none",
      }}/>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"4rem 1.5rem 3rem", position:"relative", zIndex:1 }}>
        <FadeIn>
          <p style={{
            fontFamily:"'Manrope', sans-serif",
            fontSize:"0.88rem", color:SADDLE,
            lineHeight:1.8, marginBottom:"2.2rem", maxWidth:280,
          }}>
            Candid wedding photography for couples who want to enjoy their day. One flat rate. The whole day.
          </p>
        </FadeIn>

        {/* Photo grid with hat floating top-right */}
        <FadeIn delay={0.08}>
          <div style={{ position:"relative" }}>
            {/* Hat — top right corner of grid */}
            <div style={{
              position:"absolute", right:-10, top:-30,
              width:120, pointerEvents:"none",
              mixBlendMode:"multiply", opacity:0.6, zIndex:2,
              transform:"rotate(8deg)",
            }}>
              <img src={HAT_URL} alt="" style={{ width:"100%", display:"block" }}/>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1.15fr 0.85fr", gap:6, marginBottom:6 }}>
              {/* Left tall */}
              <div style={{ gridRow:"1/3", aspectRatio:"3/4.2", overflow:"hidden", border:`3px solid ${SADDLE}` }}>
                <img src={FRAME_1} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              </div>
              {/* Top right */}
              <div style={{ aspectRatio:"1/1", overflow:"hidden", border:`3px solid ${SADDLE}` }}>
                <img src={FRAME_2} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              </div>
              {/* Bottom right */}
              <div style={{ aspectRatio:"1/1", overflow:"hidden", border:`3px solid ${SADDLE}` }}>
                <img src={FRAME_3} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              </div>
            </div>

            {/* Fourth image + cactus */}
            <div style={{ display:"flex", justifyContent:"flex-end", position:"relative" }}>
              {/* Cactus bottom-left of fourth image */}
              <div style={{
                position:"absolute", left:-20, bottom:-20,
                width:180, pointerEvents:"none",
                mixBlendMode:"multiply", opacity:0.55, zIndex:2,
              }}>
                <img src={CACTUS_URL} alt="" style={{ width:"100%", display:"block" }}/>
              </div>
              <div style={{ width:"40%", aspectRatio:"4/3", overflow:"hidden", border:`3px solid ${SADDLE}`, position:"relative", zIndex:1 }}>
                <img src={FRAME_4} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p style={{
            fontFamily:"'Manrope', sans-serif", fontSize:"0.6rem",
            letterSpacing:"0.18em", textTransform:"uppercase",
            color:SADDLE, opacity:0.55, marginTop:"0.9rem",
            display:"flex", alignItems:"center", gap:"0.45rem",
          }}>
            <Diamond color={SADDLE} size={6}/>Corbin & Zuleyma — Austin, TX
          </p>
        </FadeIn>
      </div>
    </section>
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
    <div style={{
      background:FIREBRICK, overflow:"hidden", padding:"0.9rem 0",
    }}>
      <motion.div
        animate={{ x:["0%","-50%"] }}
        transition={{ duration:28, repeat:Infinity, ease:"linear" }}
        style={{ display:"flex", whiteSpace:"nowrap", width:"max-content" }}
      >
        {[...items,...items].map((item,i) => (
          <span key={i} style={{
            display:"inline-flex", alignItems:"center", gap:"0.8rem",
            fontFamily:"'Manrope', sans-serif",
            fontSize:"0.65rem", letterSpacing:"0.22em",
            textTransform:"uppercase", color:BISQUE,
            opacity:0.88, paddingRight:"2rem",
          }}>
            <Diamond color={BISQUE} size={6}/>{item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── RECENT WEDDINGS ───────────────────────────────────────────────────────────
function RecentWeddings() {
  const weddings = [
    { name:"Megan & Courtney", location:"Austin, TX", img:WEDDING_1 },
    { name:"Jake & Farzana",   location:"Austin, TX", img:WEDDING_2 },
    { name:"Corbin & Zuleyma", location:"Austin, TX", img:WEDDING_3 },
  ];

  return (
    <section style={{ background:BISQUE, padding:"4rem 1.5rem 0", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom:"2.2rem" }}>
            <h2 style={{
              fontFamily:"'Libre Baskerville', serif",
              fontSize:"clamp(1.9rem, 8vw, 3rem)",
              fontWeight:400, color:FIREBRICK,
              lineHeight:1.12, marginBottom:"0.45rem",
            }}>Recent <em>weddings</em></h2>
            <p style={{
              fontFamily:"'Manrope', sans-serif",
              fontSize:"0.78rem", color:SADDLE, opacity:0.68,
            }}>Full days, start to finish — not just the highlights.</p>
          </div>
        </FadeIn>

        <div style={{ display:"flex", flexDirection:"column", gap:"3rem" }}>
          {weddings.map((w,i) => (
            <FadeIn key={w.name} delay={i*0.1}>
              <div>
                {/* Portrait crop — 3:4 */}
                <div style={{ overflow:"hidden", marginBottom:"0.8rem", aspectRatio:"3/4" }}>
                  <motion.img src={w.img} alt={w.name}
                    whileHover={{ scale:1.03 }}
                    transition={{ duration:0.5 }}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                </div>
                <h3 style={{
                  fontFamily:"'Libre Baskerville', serif",
                  fontStyle:"italic", fontSize:"1.35rem",
                  fontWeight:400, color:FIREBRICK, marginBottom:"0.25rem",
                }}>{w.name}</h3>
                <p style={{
                  fontFamily:"'Manrope', sans-serif",
                  fontSize:"0.62rem", letterSpacing:"0.18em",
                  textTransform:"uppercase", color:SADDLE, opacity:0.55,
                }}>{w.location}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* SAN SAN area bleeds into the green section below */}
        <FadeIn delay={0.1}>
          <div style={{ position:"relative", marginTop:"2.5rem", paddingBottom:"6rem" }}>
            <div style={{
              position:"absolute", top:0, left:-30,
              width:"clamp(240px, 80vw, 460px)",
              pointerEvents:"none", mixBlendMode:"multiply", opacity:0.2,
            }}>
              <img src={SANSAN_URL} alt="" style={{ width:"100%", display:"block" }}/>
            </div>
            <div style={{ position:"relative", zIndex:1, paddingTop:"8rem", textAlign:"center" }}>
              <a href="#" style={{
                display:"inline-block",
                border:`1.5px solid ${FIREBRICK}`,
                color:FIREBRICK, padding:"0.9rem 3rem",
                fontFamily:"'Manrope', sans-serif",
                fontSize:"0.72rem", fontWeight:600,
                letterSpacing:"0.16em", textTransform:"uppercase",
                borderRadius:"999px", textDecoration:"none",
              }}>View Full Portfolio</a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── HOW WE SHOOT (green bg top half → bisque bottom half) ────────────────────
function HowWeShoot() {
  const points = [
    { label:"We catch it as it happens",
      body:"We document the real day, the planned and unplanned parts, and all the in-between moments you didn't even realize were happening." },
    { label:"Every shot flattering. That's not luck.",
      body:"My first job was photographing models. Angles, light, and easy direction are second nature." },
    { label:"There the whole day",
      body:"You tell us when to start and stop. If the party keeps going, so do we." },
  ];

  return (
    // Outer wrapper with the green cat bg — covers top half
    <div style={{ position:"relative" }}>
      {/* Green section — text content sits here */}
      <section style={{
        position:"relative", overflow:"hidden",
        background:KHAKI, padding:"4rem 1.5rem 3rem",
      }}>
        {/* Cream cats at 33% */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`url(${CATS_CREAM})`,
          backgroundRepeat:"repeat",
          backgroundSize:"clamp(280px, 38vw, 540px)",
          opacity:0.33, pointerEvents:"none",
        }}/>

        <div style={{ maxWidth:680, margin:"0 auto", position:"relative", zIndex:1 }}>
          <FadeIn>
            <p style={{
              fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:BISQUE, opacity:0.75, marginBottom:"0.5rem",
            }}>How We Shoot</p>
            <h2 style={{
              fontFamily:"'Libre Baskerville', serif",
              fontSize:"clamp(1.8rem, 7.5vw, 2.9rem)",
              fontWeight:400, color:FIREBRICK,
              lineHeight:1.15, marginBottom:"2.8rem",
            }}>A Rundown of the <em>Big Day</em></h2>
          </FadeIn>

          <div style={{ display:"flex", flexDirection:"column", gap:"2.2rem", marginBottom:"3rem" }}>
            {points.map((pt,i) => (
              <FadeIn key={i} delay={i*0.1}>
                <div>
                  <p style={{
                    fontFamily:"'Manrope', sans-serif", fontSize:"0.6rem",
                    letterSpacing:"0.2em", textTransform:"uppercase",
                    color:FIREBRICK, fontWeight:700,
                    marginBottom:"0.4rem",
                    display:"flex", alignItems:"center", gap:"0.5rem",
                  }}><Diamond color={FIREBRICK} size={7}/>{pt.label}</p>
                  <p style={{
                    fontFamily:"'Manrope', sans-serif",
                    fontSize:"0.9rem", color:SADDLE,
                    lineHeight:1.78, opacity:0.9,
                  }}>{pt.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photo slider — bisque background resumes here */}
      <section style={{ background:BISQUE, padding:"0 0 3rem" }}>
        <FadeIn delay={0.1}>
          <div style={{
            display:"flex", gap:8,
            overflowX:"auto", paddingBottom:"0.75rem",
            scrollbarWidth:"none", WebkitOverflowScrolling:"touch",
            paddingLeft:"1.5rem", paddingRight:"1.5rem",
            paddingTop:"3rem",
          }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                flexShrink:0, width:"72vw", maxWidth:300,
                aspectRatio:"2/3",
                background:"rgba(100,64,40,0.07)",
                border:"1px dashed rgba(100,64,40,0.22)",
                borderRadius:3,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <span style={{
                  fontFamily:"'Manrope', sans-serif",
                  fontSize:"0.6rem", letterSpacing:"0.15em",
                  textTransform:"uppercase", color:SADDLE, opacity:0.35,
                }}>Photo {i}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Boots — right-aligned, after slider */}
        <div style={{ maxWidth:680, margin:"0 auto", paddingRight:"1.5rem" }}>
          <FadeIn delay={0.05}>
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"1rem" }}>
              <div style={{ width:120, mixBlendMode:"multiply", opacity:0.45 }}>
                <img src={BOOTS_URL} alt="" style={{ width:"100%", display:"block" }}/>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

// ── TESTIMONIAL ───────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section style={{ background:BISQUE, padding:"4rem 1.5rem" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ overflow:"hidden", aspectRatio:"4/3", marginBottom:"2.2rem" }}>
            <img src={REVIEW_URL} alt="Jake & Farzana"
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}/>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <blockquote style={{
            fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
            fontSize:"clamp(1.15rem, 5vw, 1.6rem)",
            fontWeight:400, color:FIREBRICK,
            lineHeight:1.5, marginBottom:"1.1rem",
          }}>
            "I can say with 100% confidence that having Sanaa capture our best day was the highlight of our entire experience."
          </blockquote>
          <p style={{
            fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
            letterSpacing:"0.18em", textTransform:"uppercase",
            color:SADDLE, opacity:0.55,
            display:"flex", alignItems:"center", gap:"0.5rem",
          }}><Diamond color={SADDLE} size={6}/>Jake & Farzana</p>
        </FadeIn>
      </div>
    </section>
  );
}

// ── PRICING CTA ───────────────────────────────────────────────────────────────
// Full bleed photo, text bottom-left, no overlay
function PricingCTA() {
  return (
    <section style={{ position:"relative", overflow:"hidden", minHeight:"60vw", maxHeight:600, display:"flex", alignItems:"flex-end" }}>
      <img src={PRICE_URL} alt=""
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center bottom", display:"block" }}/>
      {/* Very light dark vignette just on bottom-left so text is readable */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to top right, rgba(0,0,0,0.55) 0%, transparent 60%)",
      }}/>
      <div style={{ position:"relative", zIndex:1, padding:"2rem 1.5rem 3rem", maxWidth:380 }}>
        <FadeIn>
          <p style={{
            fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
            letterSpacing:"0.22em", textTransform:"uppercase",
            color:BISQUE, opacity:0.72, marginBottom:"0.4rem",
          }}>The Flat Rate</p>
          <h2 style={{
            fontFamily:"'Libre Baskerville', serif",
            fontSize:"clamp(2rem, 9vw, 3.2rem)",
            fontWeight:400, color:BISQUE,
            lineHeight:1.12, marginBottom:"0.55rem",
          }}>One day. <em>One price.</em></h2>
          <p style={{
            fontFamily:"'Manrope', sans-serif",
            fontSize:"0.8rem", color:BISQUE,
            opacity:0.65, marginBottom:"1.8rem",
          }}>No surprises at the end of the night.</p>
          <a href="#" style={{
            display:"inline-block",
            background:BISQUE, color:FIREBRICK,
            padding:"0.9rem 2.2rem",
            fontFamily:"'Manrope', sans-serif",
            fontSize:"0.7rem", fontWeight:700,
            letterSpacing:"0.15em", textTransform:"uppercase",
            borderRadius:"999px", textDecoration:"none",
          }}>See What's Included</a>
        </FadeIn>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ onOpenQuestionnaire }) {
  const links = ["Home","Portfolio","Investment","Experience","About"];

  return (
    <footer style={{ background:FIREBRICK, padding:"3.5rem 1.5rem 2.5rem" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        {/* Cat logo only — same size as hamburger bottom cat */}
        <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <img src={LOGO_CREAM_CAT} alt="" style={{ height:48, width:"auto" }}/>
        </div>

        {/* Links — large italic serif matching hamburger menu style */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.05rem", marginBottom:"2rem" }}>
          {links.map(link => (
            <a key={link} href="#" style={{
              fontFamily:"'Libre Baskerville', serif",
              fontStyle:"italic",
              fontSize:"clamp(1.4rem, 5vw, 2rem)",
              color:BISQUE, textDecoration:"none",
              lineHeight:1.3, opacity:0.88,
            }}>{link}</a>
          ))}
        </div>

        {/* CTA button */}
        <div style={{ textAlign:"center", marginBottom:"2.8rem" }}>
          <button onClick={onOpenQuestionnaire} style={{
            background:BISQUE, border:"none", color:FIREBRICK,
            padding:"0.9rem 2.2rem",
            fontFamily:"'Manrope', sans-serif",
            fontSize:"0.7rem", fontWeight:700,
            letterSpacing:"0.14em", textTransform:"uppercase",
            borderRadius:"999px", cursor:"pointer",
          }}>Tell Us About Your Day</button>
        </div>

        {/* Bottom info */}
        <div style={{
          borderTop:"1px solid rgba(247,221,194,0.18)",
          paddingTop:"1.5rem",
          display:"flex", flexDirection:"column",
          alignItems:"center", gap:"0.35rem",
        }}>
          <p style={{
            fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
            letterSpacing:"0.12em", color:BISQUE, opacity:0.45, textAlign:"center",
          }}>Austin, TX · Worldwide</p>
          <p style={{
            fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
            letterSpacing:"0.1em", color:BISQUE, opacity:0.45,
          }}>@sansanstills · sanaa@sansanstills.com</p>
          <p style={{
            fontFamily:"'Manrope', sans-serif", fontSize:"0.58rem",
            color:BISQUE, opacity:0.28, marginTop:"0.4rem",
          }}>© Sansan Stills 2026</p>
        </div>
      </div>
    </footer>
  );
}

// ── EXPORT ────────────────────────────────────────────────────────────────────
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
