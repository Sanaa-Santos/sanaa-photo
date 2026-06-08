import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import logoImg from "./assets/logo.png";
import sitePattern from "./assets/sitebg.jpg";

const BISQUE    = "#F7DDC2";
const FIREBRICK = "#8E1D1F";
const SADDLE    = "#644028";
const KHAKI     = "#ACAF9A";

const EMAILJS_SERVICE  = "sansan_service";
const EMAILJS_TEMPLATE = "template_pipszhb";
const EMAILJS_KEY      = "gN2ok8Ezm4_FvorFo";

const QUESTIONS = [
{ id: "vibe", q: "How do you want your day to feel?", sub: "Go with your gut.", opts: ["Romantic & emotional", "Fun & energetic", "Calm & intimate", "Bold & unforgettable"] },
{ id: "moments", q: "What should I drop everything to photograph?", sub: "I'll keep my eyes open.", opts: ["Spontaneous tears", "Pure, unplanned laughter", "A quiet moment between you two", "Your favorite people, just being"] },
  {
    id: "size",
    q: "How many people are celebrating with you?",
    sub: "Big love, small gathering, or somewhere in between.",
    opts: ["Under 30", "30–80", "80–150", "150+"],
  },
  {
    id: "found",
    q: "How did you find Sansan Stills?",
    sub: "Just curious.",
    opts: ["Instagram", "Google", "A friend told me", "I just knew"],
  },
  {
    id: "frame",
    q: "If you could only frame one photo from your wedding, what would it be?",
    sub: "The one that says everything.",
    opts: [
      "The moment we saw each other",
      "The exact moment the open bar opened",
      "Proof that we can dance",
      "The one my mom will put on her fridge",
    ],
    isFinal: true,
  },
];

const slideTransition = { duration: 0.45, ease: [0.4, 0, 0.2, 1] };

function QuestionPanel({ q, step, onSelect }) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -48 }}
      transition={slideTransition}
      style={{ width: "100%", maxWidth: 420 }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.p variants={itemVariants} style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.72rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: SADDLE,
          opacity: 0.7,
          marginBottom: "0.6rem",
        }}>
          {q.sub}
        </motion.p>
        <motion.h2 variants={itemVariants} style={{
          fontFamily: "'Libre Baskerville', serif",
          fontStyle: "italic",
          fontSize: "clamp(1.15rem, 3.5vw, 1.5rem)",
          fontWeight: 400,
          color: FIREBRICK,
          lineHeight: 1.35,
          marginBottom: "1.8rem",
        }}>
          {q.q}
        </motion.h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {q.opts.map((opt, i) => (
            <motion.button
              key={`${step}-${i}`}
              className="q-btn"
              variants={itemVariants}
              onClick={() => onSelect(opt)}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "transparent",
                border: `1.5px solid ${FIREBRICK}`,
                color: FIREBRICK,
                padding: "0.72rem 1.3rem",
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.93rem",
                cursor: "pointer",
                textAlign: "left",
                borderRadius: "999px",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              <span className="q-btn-num" style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                color: KHAKI,
                minWidth: 18,
              }}>0{i + 1}</span>
              {opt}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactForm({ onSubmit, answers }) {
  const [form, setForm] = useState({ name: "", email: "", date: "", location: "", message: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const fields = [
    { k: "name",     label: "Your name",     ph: "Sarah & James" },
    { k: "email",    label: "Email address", ph: "you@email.com" },
    { k: "date",     label: "Wedding date",  ph: "October 2026 — or still deciding" },
    { k: "location", label: "Venue or city", ph: "Austin, TX" },
    { k: "message",  label: "Anything else?", ph: "Tell me more about your day...", multiline: true },
  ];

  const handleSubmit = async () => {
    setSending(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          name:     form.name,
          email:    form.email,
          date:     form.date,
          location: form.location,
          message:  form.message  || "—",
          vibe:     answers.vibe     || "—",
          moments:  answers.moments  || "—",
          size:     answers.size     || "—",
          found:    answers.found    || "—",
          frame:    answers.frame    || "—",
        },
        EMAILJS_KEY
      );
      onSubmit();
    } catch (err) {
      setError("Something went wrong — please try again.");
    } finally {
      setSending(false);
    }
  };

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const inputBase = {
    width: "100%",
    background: "rgba(142,29,31,0.04)",
    border: `1px solid rgba(142,29,31,0.25)`,
    color: FIREBRICK,
    fontFamily: "'Manrope', sans-serif",
    fontSize: "0.94rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -48 }}
      transition={slideTransition}
      style={{ width: "100%", maxWidth: 420 }}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.p variants={itemVariants} style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.72rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: SADDLE,
          opacity: 0.7,
          marginBottom: "0.4rem",
        }}>Almost there</motion.p>
        <motion.h2 variants={itemVariants} style={{
          fontFamily: "'Libre Baskerville', serif",
          fontStyle: "italic",
          fontSize: "1.4rem",
          fontWeight: 400,
          color: FIREBRICK,
          marginBottom: "0.3rem",
        }}>Tell me who you are.</motion.h2>
        <motion.p variants={itemVariants} style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.88rem",
          color: SADDLE,
          marginBottom: "1.4rem",
          opacity: 0.75,
        }}>And when the story begins.</motion.p>

        {fields.map((field) => (
          <motion.div key={field.k} variants={itemVariants} style={{ marginBottom: "0.75rem", textAlign: "left" }}>
            <label style={{
              display: "block",
              color: SADDLE,
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.75rem",
              marginBottom: "0.22rem",
              letterSpacing: "0.05em",
            }}>{field.label}</label>
            {field.multiline ? (
              <textarea
                placeholder={field.ph}
                value={form[field.k]}
                onChange={e => setForm(p => ({ ...p, [field.k]: e.target.value }))}
                rows={3}
                style={{
                  ...inputBase,
                  borderRadius: "16px",
                  padding: "0.56rem 1rem",
                  resize: "none",
                }}
                onFocus={e => e.target.style.borderColor = FIREBRICK}
                onBlur={e => e.target.style.borderColor = "rgba(142,29,31,0.25)"}
              />
            ) : (
              <input
                type="text"
                placeholder={field.ph}
                value={form[field.k]}
                onChange={e => setForm(p => ({ ...p, [field.k]: e.target.value }))}
                style={{
                  ...inputBase,
                  borderRadius: "999px",
                  padding: "0.56rem 1rem",
                }}
                onFocus={e => e.target.style.borderColor = FIREBRICK}
                onBlur={e => e.target.style.borderColor = "rgba(142,29,31,0.25)"}
              />
            )}
          </motion.div>
        ))}

        {error && (
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.8rem",
            color: FIREBRICK,
            marginBottom: "0.5rem",
            opacity: 0.8,
          }}>{error}</p>
        )}

        <motion.button
          variants={itemVariants}
          onClick={handleSubmit}
          disabled={sending}
          whileHover={{ opacity: 0.88 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: "0.5rem",
            width: "100%",
            background: sending ? "rgba(142,29,31,0.5)" : FIREBRICK,
            border: "none",
            color: BISQUE,
            padding: "0.82rem 1.5rem",
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 500,
            cursor: sending ? "not-allowed" : "pointer",
            borderRadius: "999px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >{sending ? "Sending..." : "Begin the story"}</motion.button>
      </motion.div>
    </motion.div>
  );
}

function ThankYou({ onClose }) {
  return (
    <motion.div
      key="thanks"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{ width: "100%", maxWidth: 420, textAlign: "center" }}
    >
      <p style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: "0.72rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: SADDLE,
        opacity: 0.7,
        marginBottom: "0.8rem",
      }}>You're in good hands</p>
      <h2 style={{
        fontFamily: "'Libre Baskerville', serif",
        fontStyle: "italic",
        fontSize: "1.7rem",
        fontWeight: 400,
        color: FIREBRICK,
        marginBottom: "1rem",
        lineHeight: 1.3,
      }}>Can't wait to meet you.</h2>
      <p style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: "0.95rem",
        color: SADDLE,
        lineHeight: 1.8,
        marginBottom: "2rem",
        opacity: 0.8,
      }}>
        We'll be in touch within 48 hours.<br />In the meantime, keep dreaming.
      </p>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: `1.5px solid ${FIREBRICK}`,
          color: FIREBRICK,
          padding: "0.7rem 2rem",
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 500,
          cursor: "pointer",
          borderRadius: "999px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >← Back</button>
    </motion.div>
  );
}

function QuestionnaireDrawer({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = useCallback((opt) => {
    const q = QUESTIONS[step];
    setAnswers(prev => ({ ...prev, [q.id]: opt }));
    if (q.isFinal) { setShowForm(true); return; }
    setStep(s => s + 1);
  }, [step]);

  const handleClose = () => {
    setStep(0); setAnswers({}); setShowForm(false); setSubmitted(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: BISQUE,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        overflowY: "auto",
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${sitePattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "clamp(320px, 38vw, 620px)",
        opacity: 0.07,
        pointerEvents: "none",
      }} />

      <button
        onClick={handleClose}
        style={{
          position: "fixed",
          top: "1.2rem",
          right: "1.4rem",
          background: "none",
          border: `1.5px solid ${FIREBRICK}`,
          color: FIREBRICK,
          width: 34,
          height: 34,
          borderRadius: "999px",
          fontSize: "0.85rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.6,
          zIndex: 10,
        }}
      >✕</button>

      {!submitted && (
        <div style={{
          position: "fixed",
          top: "1.55rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 7,
          zIndex: 10,
        }}>
          {QUESTIONS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                background: i <= (showForm ? QUESTIONS.length : step) ? FIREBRICK : "rgba(142,29,31,0.2)",
                scale: i === step && !showForm ? 1.35 : 1,
              }}
              transition={{ duration: 0.25 }}
              style={{ width: 6, height: 6, borderRadius: "50%" }}
            />
          ))}
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "center" }}>
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <ThankYou key="thanks" onClose={handleClose} />
          ) : showForm ? (
            <ContactForm key="form" answers={answers} onSubmit={() => setSubmitted(true)} />
          ) : (
            <QuestionPanel key={`q-${step}`} q={QUESTIONS[step]} step={step} onSelect={handleSelect} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function SanaaPhotography() {
  const [questOpen, setQuestOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500&family=Libre+Baskerville:ital@1&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; }
        body {
          background-color: ${BISQUE};
          color: ${FIREBRICK};
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          min-height: 100vh;
        }
        button { cursor: pointer; }
        input::placeholder { color: rgba(100,64,40,0.35); }
        textarea::placeholder { color: rgba(100,64,40,0.35); }
        .q-btn { -webkit-tap-highlight-color: transparent; }
        .q-btn:active { background: ${FIREBRICK} !important; color: ${BISQUE} !important; }
        .q-btn:active .q-btn-num { color: rgba(247,221,194,0.6) !important; }
        @media (hover: hover) {
          .q-btn:hover { background: ${FIREBRICK} !important; color: ${BISQUE} !important; }
          .q-btn:hover .q-btn-num { color: rgba(247,221,194,0.6) !important; }
        }
      `}</style>

      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        backgroundImage: `url(${sitePattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "clamp(320px, 38vw, 620px)",
        opacity: 0.13,
      }} />

      <div style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "2.8rem" }}
        >
          <img
            src={logoImg}
            alt="Sansan Stills"
            style={{ height: "clamp(90px, 20vw, 160px)", width: "auto", display: "block" }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.4rem, 4.5vw, 2.2rem)",
            fontWeight: 400,
            color: FIREBRICK,
            lineHeight: 1.35,
            maxWidth: 480,
            marginBottom: "1rem",
          }}
        >
          Wedding photography for couples who believe every frame is worth keeping.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.82rem",
            color: SADDLE,
            opacity: 0.7,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "2.8rem",
          }}
        >
          Austin, TX Based · Full day coverage at $3,000
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.7rem" }}
        >
          <motion.button
            onClick={() => setQuestOpen(true)}
            whileHover={{ backgroundColor: SADDLE }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: FIREBRICK,
              border: "none",
              color: BISQUE,
              padding: "0.95rem 3rem",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 500,
              borderRadius: "999px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              transition: "background 0.2s",
              boxShadow: "0 2px 18px rgba(142,29,31,0.2)",
            }}
          >
            Let's Chat
          </motion.button>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.74rem",
            color: SADDLE,
            opacity: 0.55,
            letterSpacing: "0.05em",
          }}>
            Fill out a short questionnaire to begin
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            position: "fixed",
            bottom: "1.4rem",
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.68rem",
            color: SADDLE,
            opacity: 0.35,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          © Sansan Stills 2026
        </motion.p>
      </div>

      <AnimatePresence>
        {questOpen && (
          <QuestionnaireDrawer onClose={() => setQuestOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
