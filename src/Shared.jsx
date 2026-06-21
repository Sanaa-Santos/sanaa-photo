import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import sitePattern from "./assets/sitebg.jpg";

export const BISQUE    = "#F7DDC2";
export const FIREBRICK = "#8E1D1F";
export const SADDLE    = "#644028";
export const KHAKI     = "#ACAF9A";

export const LOGO_RED_WORD   = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781811245/Sansan_Stills_name_01_nxkfee.png";
export const LOGO_CREAM_WORD = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781813367/Sansan_Stills_name_03_k93cdv.png";
export const LOGO_CREAM_CAT  = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781813338/Sansan_Stills_icon_03_ovwd1h.png";

export const MAX_W = 680;
export const DESKTOP_BREAKPOINT = 900;

// Lightweight hook used ONLY to branch a handful of desktop-specific values
// (sizing/layout) below MAX_W's centered mobile column. Mobile behavior is
// completely unaffected — this never changes markup or styles below the
// breakpoint, only adds alternate values above it.
export function useIsDesktop() {
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

export const Diamond = ({ color = FIREBRICK, size = 8 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none"
    style={{ display:"inline-block", flexShrink:0, verticalAlign:"middle" }}>
    <rect x="5" y="0.5" width="6.5" height="6.5" rx="0.4"
      transform="rotate(45 5 0.5)" fill={color} />
  </svg>
);

export function FadeIn({ children, delay=0, y=20, style={} }) {
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

export function Shell({ children, outerBg=BISQUE, innerBg=BISQUE, outerStyle={}, innerStyle={} }) {
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

const MotionLink = motion(Link);

// Renders a real client-side <Link> for internal routes (anything starting
// with "/"), or a plain placeholder <a> for not-yet-built pages ("#") —
// so real routes never trigger a full page reload, while unbuilt pages
// still render as inert links rather than throwing a React Router warning.
function NavLink({ href, children, ...rest }) {
  if (href.startsWith("/")) {
    return <MotionLink to={href} {...rest}>{children}</MotionLink>;
  }
  return <motion.a href={href} {...rest}>{children}</motion.a>;
}

// ── NAV ───────────────────────────────────────────────────────────────────────
export function Nav({ onOpenQuestionnaire }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { label:"Home", href:"/" },
    { label:"Portfolio", href:"/portfolio" },
    { label:"Investment", href:"/investment" },
    { label:"Experience", href:"/experience" },
    { label:"About", href:"/about" },
  ];

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
                <NavLink key={link.label} href={link.href}
                  initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.08+i*0.07, duration:0.45, ease:[0.22,1,0.36,1] }}
                  onClick={() => setMenuOpen(false)}
                  style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
                    fontSize:"clamp(2.2rem, 9vw, 4rem)",
                    color:BISQUE, textDecoration:"none", lineHeight:1.25, opacity:0.92 }}>
                  {link.label}
                </NavLink>
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

// Plain (non-animated) version of NavLink, for static contexts like the Footer.
function PlainNavLink({ href, children, ...rest }) {
  if (href.startsWith("/")) {
    return <Link to={href} {...rest}>{children}</Link>;
  }
  return <a href={href} {...rest}>{children}</a>;
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
export function Footer({ onOpenQuestionnaire }) {
  const links = [
    { label:"Home", href:"/" },
    { label:"Portfolio", href:"/portfolio" },
    { label:"Investment", href:"/investment" },
    { label:"Experience", href:"/experience" },
    { label:"About", href:"/about" },
  ];
  return (
    <Shell outerBg={FIREBRICK} innerBg={FIREBRICK}>
      <footer style={{ padding:"3.5rem 1.5rem 2.5rem", textAlign:"center" }}>
        <img src={LOGO_CREAM_CAT} alt=""
          style={{ height:48, width:"auto", marginBottom:"2rem" }}/>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
          gap:"0.05rem", marginBottom:"2rem" }}>
          {links.map(link => (
            <PlainNavLink key={link.label} href={link.href} style={{ fontFamily:"'Libre Baskerville', serif",
              fontStyle:"italic", fontSize:"clamp(1.4rem, 5vw, 2rem)",
              color:BISQUE, textDecoration:"none", lineHeight:1.3, opacity:0.88 }}>
              {link.label}
            </PlainNavLink>
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
