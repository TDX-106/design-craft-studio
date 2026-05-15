import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

export const Route = createFileRoute("/styles")({
  head: () => ({
    meta: [
      { title: "Style Explorer — DesignCraft" },
      { name: "description", content: "Six interior aesthetics — Minimalist, Japandi, Industrial, Bohemian, Mid-Century, Scandinavian." },
    ],
  }),
  component: Styles,
});

interface Style {
  name: string;
  tag: string;
  short: string;
  long: string;
  materials: string[];
  palette: string[];
  bg: string;
}

const styles: Style[] = [
  {
    name: "Minimalist", tag: "Less, but better.",
    short: "Quiet rooms, intentional objects, generous negative space.",
    long: "A discipline of subtraction. Each object earns its place; surfaces breathe; light becomes the most important material in the room.",
    materials: ["White oak", "Linen", "Microcement", "Brushed steel"],
    palette: ["#fffdf9", "#e8e0d5", "#7a7068", "#2c2825"],
    bg: "linear-gradient(135deg,#f5f0eb 0%,#e8e0d5 100%)",
  },
  {
    name: "Japandi", tag: "Wabi-sabi meets hygge.",
    short: "Japanese restraint with Scandinavian warmth.",
    long: "Low silhouettes, natural fibers, and a deep respect for craft. Imperfection is a feature, not a flaw.",
    materials: ["Charred cedar", "Paper", "Stoneware", "Hemp"],
    palette: ["#f5f0eb", "#c4b5a0", "#5a4a3a", "#1a1a1a"],
    bg: "linear-gradient(135deg,#e8dcc4 0%,#3d2f25 100%)",
  },
  {
    name: "Industrial", tag: "Honest materials.",
    short: "Exposed brick, blackened steel, raw concrete.",
    long: "A loft sensibility that celebrates structure — pipes overhead, factory windows, leather worn well.",
    materials: ["Blackened steel", "Reclaimed brick", "Concrete", "Aged leather"],
    palette: ["#3d3d3d", "#8b6f47", "#c4a578", "#1a1a1a"],
    bg: "linear-gradient(135deg,#3a3a3a 0%,#1a1a1a 100%)",
  },
  {
    name: "Bohemian", tag: "Layered & lived-in.",
    short: "Pattern, plants, and global textures collected over time.",
    long: "Maximalism with intention — vintage rugs over rugs, terracotta, brass, and an ever-changing wall of art.",
    materials: ["Rattan", "Terracotta", "Velvet", "Brass"],
    palette: ["#c4694a", "#e8c896", "#3d5a40", "#6b4423"],
    bg: "linear-gradient(135deg,#c4694a 0%,#6b4423 100%)",
  },
  {
    name: "Mid-Century Modern", tag: "Form follows curiosity.",
    short: "Walnut, tapered legs, atomic optimism.",
    long: "1950s clarity — clean lines paired with sculptural confidence. Saarinen, Eames, Wegner.",
    materials: ["Walnut", "Tweed", "Brass", "Bouclé"],
    palette: ["#6b4423", "#d4a544", "#3d5a40", "#f5f0eb"],
    bg: "linear-gradient(135deg,#8b6f47 0%,#3d2f25 100%)",
  },
  {
    name: "Scandinavian", tag: "Bright, simple, kind.",
    short: "Pale woods, soft textiles, abundant daylight.",
    long: "Functional democracy in design. Surfaces are honest; wool throws are everywhere; nothing competes.",
    materials: ["Bleached ash", "Wool", "Soft cotton", "White stoneware"],
    palette: ["#fffdf9", "#e8dcc4", "#a8c4ce", "#2c2825"],
    bg: "linear-gradient(135deg,#fffdf9 0%,#a8c4ce 100%)",
  },
];

function Styles() {
  const [open, setOpen] = useState<Style | null>(null);

  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>Style Explorer</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-balance">Find your aesthetic.</h1>
        <p className="text-muted-foreground max-w-xl">
          Six enduring interior styles — each with its own materials, palette, and point of view.
        </p>
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {styles.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.05}>
            <motion.button
              whileHover={{ y: -8 }}
              onClick={() => setOpen(s)}
              className="group relative w-full text-left h-[420px] rounded-3xl overflow-hidden border border-border shadow-soft hover:shadow-elegant transition-shadow"
              style={{ background: s.bg }}
            >
              <div className="absolute inset-0 grain" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-7 flex flex-col justify-end text-warm-white">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.materials.slice(0, 3).map((m) => (
                    <span key={m} className="text-[10px] uppercase tracking-[0.2em] glass-dark px-2.5 py-1 rounded-full">{m}</span>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-accent-pistachio">{s.tag}</p>
                <h3 className="font-display text-4xl mt-1 leading-tight">{s.name}</h3>
                <p className="text-sm opacity-80 mt-2 leading-relaxed">{s.short}</p>
                <div className="flex gap-1 mt-4">
                  {s.palette.map((c) => (
                    <div key={c} className="w-6 h-6 rounded-full ring-2 ring-white/20" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] bg-charcoal/60 backdrop-blur-md grid place-items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card max-w-2xl w-full rounded-3xl overflow-hidden shadow-elegant"
            >
              <div className="relative h-56" style={{ background: open.bg }}>
                <div className="absolute inset-0 grain" />
                <button
                  onClick={() => setOpen(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full glass-dark text-warm-white grid place-items-center hover:scale-110 transition"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-accent-sage">{open.tag}</p>
                <h3 className="font-display text-4xl mt-2">{open.name}</h3>
                <p className="text-muted-foreground mt-4 leading-relaxed">{open.long}</p>

                <div className="mt-6 grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Materials</p>
                    <div className="flex flex-wrap gap-1.5">
                      {open.materials.map((m) => (
                        <span key={m} className="text-xs px-3 py-1.5 rounded-full bg-accent-light text-accent-sage">{m}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Palette</p>
                    <div className="flex gap-1.5">
                      {open.palette.map((c) => (
                        <div key={c} className="flex-1 h-10 rounded-lg" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrap>
  );
}
