import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

// Import material images for safe Vite bundling
import microcementImg from "@/assets/materials/microcement.jpg";
import bambooImg from "@/assets/materials/bamboo.jpg";
import steelImg from "@/assets/materials/blackened-steel.jpg";
import juteImg from "@/assets/materials/jute.jpg";
import walnutImg from "@/assets/materials/walnut.jpg";
import ashImg from "@/assets/materials/bleached-ash.jpg";

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
  accent: string;
  keywords: string[];
  referenceImg: string;
  materialImg: string;
}

const styles: Style[] = [
  {
    name: "Minimalist", tag: "Less, but better.",
    short: "Quiet rooms, intentional objects, generous negative space.",
    long: "A discipline of subtraction. Each object earns its place; surfaces breathe; light becomes the most important material in the room. Clutter is the enemy of calm.",
    materials: ["Microcement", "White oak", "Linen", "Brushed steel"],
    palette: ["#fffdf9", "#e8e0d5", "#7a7068", "#2c2825"],
    bg: "linear-gradient(135deg, #f5f0eb 0%, #e8e0d5 100%)",
    accent: "#6e9e74",
    keywords: ["Restraint", "Space", "Calm"],
    referenceImg: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
    materialImg: microcementImg,
  },
  {
    name: "Japandi", tag: "Wabi-sabi meets hygge.",
    short: "Japanese restraint with Scandinavian warmth.",
    long: "Low silhouettes, natural fibers, and a deep respect for craft. Imperfection is a feature, not a flaw. Every object carries quiet intention.",
    materials: ["Bamboo", "Charred cedar", "Paper", "Stoneware"],
    palette: ["#f5f0eb", "#c4b5a0", "#5a4a3a", "#1a1a1a"],
    bg: "linear-gradient(135deg, #fffdf9 0%, #f5f0eb 100%)",
    accent: "#8b7e6d",
    keywords: ["Wabi-sabi", "Craft", "Nature"],
    referenceImg: "https://images.unsplash.com/photo-1595514535415-eb108154afed?q=80&w=800&auto=format&fit=crop",
    materialImg: bambooImg,
  },
  {
    name: "Industrial", tag: "Honest materials.",
    short: "Exposed brick, blackened steel, raw concrete.",
    long: "A loft sensibility that celebrates structure — pipes overhead, factory windows, leather worn well. Nothing is hidden; everything is honest.",
    materials: ["Blackened steel", "Reclaimed brick", "Concrete", "Aged leather"],
    palette: ["#3d3d3d", "#8b6f47", "#c4a578", "#1a1a1a"],
    bg: "linear-gradient(135deg, #e8e0d5 0%, #d4c8b8 100%)",
    accent: "#8b6f47",
    keywords: ["Raw", "Honest", "Structure"],
    referenceImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    materialImg: steelImg,
  },
  {
    name: "Bohemian", tag: "Layered & lived-in.",
    short: "Pattern, plants, and global textures collected over time.",
    long: "Maximalism with intention — vintage rugs over rugs, terracotta, brass, and an ever-changing wall of art. A room that tells stories.",
    materials: ["Jute", "Rattan", "Terracotta", "Velvet"],
    palette: ["#c4694a", "#e8c896", "#3d5a40", "#6b4423"],
    bg: "linear-gradient(135deg, #f5ecd6 0%, #e8c896 100%)",
    accent: "#c4694a",
    keywords: ["Layered", "Global", "Vibrant"],
    referenceImg: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    materialImg: juteImg,
  },
  {
    name: "Mid-Century Modern", tag: "Form follows curiosity.",
    short: "Walnut, tapered legs, atomic optimism.",
    long: "1950s clarity — clean lines paired with sculptural confidence. Saarinen, Eames, Wegner. Optimism expressed in furniture.",
    materials: ["Walnut", "Tweed", "Brass", "Bouclé"],
    palette: ["#6b4423", "#d4a544", "#3d5a40", "#f5f0eb"],
    bg: "linear-gradient(135deg, #f0ebe3 0%, #e8e0d5 100%)",
    accent: "#d4a544",
    keywords: ["Sculptural", "Optimism", "Warmth"],
    referenceImg: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800&auto=format&fit=crop",
    materialImg: walnutImg,
  },
  {
    name: "Scandinavian", tag: "Bright, simple, kind.",
    short: "Pale woods, soft textiles, abundant daylight.",
    long: "Functional democracy in design. Surfaces are honest; wool throws are everywhere; nothing competes. A room that feels like a deep breath.",
    materials: ["Bleached ash", "Wool", "Soft cotton", "White stoneware"],
    palette: ["#fffdf9", "#e8dcc4", "#a8c4ce", "#2c2825"],
    bg: "linear-gradient(135deg, #e8f0e6 0%, #d6e3d4 100%)",
    accent: "#6e9e74",
    keywords: ["Hygge", "Function", "Light"],
    referenceImg: "https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?q=80&w=800&auto=format&fit=crop",
    materialImg: ashImg,
  },
];

function StyleCard({ s, index, onClick }: { s: Style; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <Reveal delay={index * 0.05}>
      <motion.button
        ref={cardRef}
        whileHover={{ y: -8, scale: 1.01 }}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        className="group relative w-full text-left h-[420px] rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all cursor-pointer"
        style={{ background: s.bg }}
      >
        {/* Parallax Hover Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 300px at ${mouse.x * 100}% ${mouse.y * 100}%, ${s.accent}15, transparent)`,
          }}
        />

        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-md grid place-items-center text-[#2c2825] border border-black/5">
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#2c2825]">
          <p className="text-[10px] uppercase tracking-[0.25em] mb-2 font-bold" style={{ color: s.accent }}>{s.tag}</p>
          <h3 className="font-display text-4xl mb-3 leading-tight">{s.name}</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {s.keywords.map(kw => (
              <span key={kw} className="text-[9px] uppercase tracking-[0.2em] bg-white/40 backdrop-blur px-2.5 py-1 rounded-full border border-black/5 text-[#2c2825]/80">
                {kw}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#2c2825]/80 leading-relaxed mb-6 line-clamp-2">{s.short}</p>

          <div className="flex gap-2 relative z-10">
            {s.palette.map((c) => (
              <div 
                key={c} 
                className="w-8 h-8 rounded-full border border-border shadow-sm transition-transform group-hover:scale-110" 
                style={{ background: c }} 
              />
            ))}
          </div>
        </div>
      </motion.button>
    </Reveal>
  );
}

function Styles() {
  const [open, setOpen] = useState<Style | null>(null);

  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>Style Explorer</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-balance">Find your aesthetic.</h1>
        <p className="text-muted-foreground max-w-xl">
          Six enduring interior styles. Explore the precise materials, palettes, and design philosophies that define them.
        </p>
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((s, i) => (
          <StyleCard key={s.name} s={s} index={i} onClick={() => setOpen(s)} />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] bg-foreground/10 backdrop-blur-sm grid place-items-center p-4 lg:p-10 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card text-foreground max-w-5xl w-full rounded-[2rem] overflow-hidden shadow-elegant border border-border my-auto"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/50 backdrop-blur grid place-items-center hover:bg-white/80 transition z-10 border border-black/10 text-[#2c2825]"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative p-10 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border" style={{ background: open.bg }}>
                  <div className="relative z-10 text-[#2c2825]">
                    <p className="text-xs uppercase tracking-[0.25em] mb-3 font-bold" style={{ color: open.accent }}>{open.tag}</p>
                    <h2 className="font-display text-5xl mb-6">{open.name}</h2>
                    <p className="text-lg text-[#2c2825]/80 leading-relaxed">{open.short}</p>
                    <div className="flex flex-wrap gap-2 mt-8">
                      {open.keywords.map(kw => (
                        <span key={kw} className="text-[10px] uppercase tracking-[0.2em] bg-white/40 border border-black/10 px-3 py-1.5 rounded-full text-[#2c2825]/90">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Reference Image */}
                  <div className="mt-10 rounded-2xl overflow-hidden border border-black/5 shadow-sm aspect-[4/3] relative">
                    <img 
                      src={open.referenceImg} 
                      alt={`${open.name} interior reference`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <p className="text-[9px] uppercase tracking-wider text-white/90">Reference Space</p>
                    </div>
                  </div>
                </div>

                <div className="p-10 md:p-14 flex flex-col justify-center bg-background">
                  <p className="text-sm text-muted-foreground leading-loose mb-10">{open.long}</p>
                  
                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-bold">Color Palette</p>
                    <div className="flex gap-3">
                      {open.palette.map(c => (
                        <div key={c} className="flex-1">
                          <div className="w-full h-12 rounded-lg shadow-sm mb-2 border border-border" style={{ background: c }} />
                          <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono text-center">{c}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-bold">Key Materials</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {open.materials.map(m => (
                        <span key={m} className="text-xs px-4 py-2 rounded-lg bg-muted border border-border text-foreground">
                          {m}
                        </span>
                      ))}
                    </div>
                    
                    {/* Material Image */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
                      <img 
                        src={open.materialImg} 
                        alt={`${open.materials[0]} texture`} 
                        className="w-16 h-16 rounded-xl object-cover shadow-sm border border-border" 
                      />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1">Signature Material</p>
                        <p className="text-sm font-medium">{open.materials[0]}</p>
                      </div>
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
