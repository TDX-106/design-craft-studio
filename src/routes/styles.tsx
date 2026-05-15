import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

// Only locally available material images
import microcementImg from "@/assets/materials/microcement.jpg";
import bambooImg from "@/assets/materials/bamboo.jpg";
import blackenedSteelImg from "@/assets/materials/blackened-steel.jpg";
import juteImg from "@/assets/materials/jute.jpg";
import walnutImg from "@/assets/materials/walnut.jpg";
import bleachedAshImg from "@/assets/materials/bleached-ash.jpg";
import brassImg from "@/assets/materials/brass.jpg";
import travertineImg from "@/assets/materials/travertine.jpg";
import linsenImg from "@/assets/materials/linen.jpg";
import terrazzoImg from "@/assets/materials/terrazzo.jpg";

export const Route = createFileRoute("/styles")({
  head: () => ({
    meta: [
      { title: "Style Explorer — DesignCraft" },
      { name: "description", content: "Ten interior aesthetics — Minimalist, Japandi, Industrial, Bohemian, Mid-Century, Scandinavian, Art Deco, Coastal, Rustic Farmhouse, Contemporary." },
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
  /** Unsplash image — carefully chosen to match the palette and mood */
  referenceImg: string;
  /** Locally bundled material swatch */
  materialImg: string;
  /** Human-readable name of the materialImg */
  signatureMaterial: string;
}

const styles: Style[] = [
  {
    name: "Minimalist",
    tag: "Less, but better.",
    short: "Quiet rooms, intentional objects, generous negative space.",
    long: "A discipline of subtraction. Each object earns its place; surfaces breathe; light becomes the most important material in the room. Clutter is the enemy of calm.",
    materials: ["Microcement", "White oak", "Linen", "Brushed steel"],
    palette: ["#fffdf9", "#e8e0d5", "#7a7068", "#2c2825"],
    bg: "linear-gradient(135deg, #f5f0eb 0%, #e8e0d5 100%)",
    accent: "#6e9e74",
    keywords: ["Restraint", "Space", "Calm"],
    referenceImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop",
    materialImg: microcementImg,
    signatureMaterial: "Microcement",
  },
  {
    name: "Japandi",
    tag: "Wabi-sabi meets hygge.",
    short: "Japanese restraint with Scandinavian warmth.",
    long: "Low silhouettes, natural fibers, and a deep respect for craft. Imperfection is a feature, not a flaw. Every object carries quiet intention.",
    materials: ["Bamboo", "Charred cedar", "Paper", "Stoneware"],
    palette: ["#f5f0eb", "#c4b5a0", "#5a4a3a", "#1a1a1a"],
    bg: "linear-gradient(135deg, #fffdf9 0%, #f5f0eb 100%)",
    accent: "#8b7e6d",
    keywords: ["Wabi-sabi", "Craft", "Nature"],
    referenceImg: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=900&auto=format&fit=crop",
    materialImg: bambooImg,
    signatureMaterial: "Bamboo",
  },
  {
    name: "Industrial",
    tag: "Honest materials.",
    short: "Exposed brick, blackened steel, raw concrete.",
    long: "A loft sensibility that celebrates structure — pipes overhead, factory windows, leather worn well. Nothing is hidden; everything is honest.",
    materials: ["Blackened steel", "Reclaimed brick", "Concrete", "Aged leather"],
    palette: ["#3d3d3d", "#8b6f47", "#c4a578", "#1a1a1a"],
    bg: "linear-gradient(135deg, #e8e0d5 0%, #d4c8b8 100%)",
    accent: "#8b6f47",
    keywords: ["Raw", "Honest", "Structure"],
    referenceImg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop",
    materialImg: blackenedSteelImg,
    signatureMaterial: "Blackened Steel",
  },
  {
    name: "Bohemian",
    tag: "Layered & lived-in.",
    short: "Pattern, plants, and global textures collected over time.",
    long: "Maximalism with intention — vintage rugs over rugs, terracotta, brass, and an ever-changing wall of art. A room that tells stories.",
    materials: ["Jute", "Rattan", "Terracotta", "Velvet"],
    palette: ["#c4694a", "#e8c896", "#3d5a40", "#6b4423"],
    bg: "linear-gradient(135deg, #f5ecd6 0%, #e8c896 100%)",
    accent: "#c4694a",
    keywords: ["Layered", "Global", "Vibrant"],
    referenceImg: "https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=900&auto=format&fit=crop",
    materialImg: juteImg,
    signatureMaterial: "Jute",
  },
  {
    name: "Mid-Century Modern",
    tag: "Form follows curiosity.",
    short: "Walnut, tapered legs, atomic optimism.",
    long: "1950s clarity — clean lines paired with sculptural confidence. Saarinen, Eames, Wegner. Optimism expressed in furniture.",
    materials: ["Walnut", "Tweed", "Brass", "Bouclé"],
    palette: ["#6b4423", "#d4a544", "#3d5a40", "#f5f0eb"],
    bg: "linear-gradient(135deg, #f0ebe3 0%, #e8e0d5 100%)",
    accent: "#d4a544",
    keywords: ["Sculptural", "Optimism", "Warmth"],
    referenceImg: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=900&auto=format&fit=crop",
    materialImg: walnutImg,
    signatureMaterial: "Walnut",
  },
  {
    name: "Scandinavian",
    tag: "Bright, simple, kind.",
    short: "Pale woods, soft textiles, abundant daylight.",
    long: "Functional democracy in design. Surfaces are honest; wool throws are everywhere; nothing competes. A room that feels like a deep breath.",
    materials: ["Bleached ash", "Wool", "Soft cotton", "White stoneware"],
    palette: ["#fffdf9", "#e8dcc4", "#a8c4ce", "#2c2825"],
    bg: "linear-gradient(135deg, #e8f0e6 0%, #d6e3d4 100%)",
    accent: "#6e9e74",
    keywords: ["Hygge", "Function", "Light"],
    referenceImg: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=900&auto=format&fit=crop",
    materialImg: bleachedAshImg,
    signatureMaterial: "Bleached Ash",
  },
  {
    name: "Art Deco",
    tag: "Glamour & geometry.",
    short: "Bold symmetry, gold accents, luxurious surfaces.",
    long: "Born from 1920s Paris — a confident blend of geometric forms, lavish materials, and unapologetic opulence. Mirrored surfaces, sunburst motifs, and lacquered cabinets define this style.",
    materials: ["Brass", "Velvet", "Lacquered wood", "Marble"],
    palette: ["#1a1a2e", "#c9a84c", "#e8e0d5", "#4a1942"],
    bg: "linear-gradient(135deg, #2a2040 0%, #1a1a2e 100%)",
    accent: "#c9a84c",
    keywords: ["Opulence", "Geometry", "Glamour"],
    referenceImg: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=900&auto=format&fit=crop",
    materialImg: brassImg,
    signatureMaterial: "Brass",
  },
  {
    name: "Coastal",
    tag: "Breezy & sun-washed.",
    short: "Whitewashed walls, linen, and the perpetual feeling of sea air.",
    long: "A relaxed Mediterranean sensibility where sand, sea, and sky dictate the palette. Weathered wood, woven textures, and a perpetual sense of ease define every room.",
    materials: ["Travertine", "Linen", "Whitewashed oak", "Rope"],
    palette: ["#eef4f7", "#a8c4ce", "#d4b896", "#4a7c88"],
    bg: "linear-gradient(135deg, #ddeef4 0%, #c4dde6 100%)",
    accent: "#4a7c88",
    keywords: ["Breezy", "Natural", "Serene"],
    referenceImg: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=900&auto=format&fit=crop",
    materialImg: travertineImg,
    signatureMaterial: "Travertine",
  },
  {
    name: "Rustic Farmhouse",
    tag: "Warm, worn & welcoming.",
    short: "Reclaimed wood, shiplap, and hearth-side warmth.",
    long: "A celebration of imperfect beauty — worn wood, galvanized metals, stone fireplaces, and hand-thrown ceramics. Practicality and warmth are the guiding principles.",
    materials: ["Linen", "Reclaimed pine", "Wrought iron", "Sandstone"],
    palette: ["#f5ede0", "#c4a47c", "#7a5c38", "#3a2a1e"],
    bg: "linear-gradient(135deg, #f5ede0 0%, #e8d5b8 100%)",
    accent: "#a0704a",
    keywords: ["Warmth", "Texture", "Heritage"],
    referenceImg: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=900&auto=format&fit=crop",
    materialImg: linsenImg,
    signatureMaterial: "Linen",
  },
  {
    name: "Contemporary",
    tag: "Now, refined.",
    short: "Current design thinking, always evolving.",
    long: "Not a static style but a living moment — clean lines meet warm textures, monochrome meets a single bold material, and comfort is never sacrificed for form. The design of right now.",
    materials: ["Terrazzo", "Smoked oak", "Brushed brass", "Bouclé"],
    palette: ["#f2f2f0", "#c8c4be", "#6b6560", "#2a2825"],
    bg: "linear-gradient(135deg, #f2f2f0 0%, #e5e2dc 100%)",
    accent: "#8a8070",
    keywords: ["Current", "Refined", "Eclectic"],
    referenceImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900&auto=format&fit=crop",
    materialImg: terrazzoImg,
    signatureMaterial: "Terrazzo",
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
            background: `radial-gradient(circle 300px at ${mouse.x * 100}% ${mouse.y * 100}%, ${s.accent}20, transparent)`,
          }}
        />

        {/* Reference image peek at top */}
        <div className="absolute inset-x-0 top-0 h-44 overflow-hidden">
          <img
            src={s.referenceImg}
            alt={`${s.name} interior`}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" style={{ background: `linear-gradient(to bottom, transparent 40%, ${s.bg.includes('#') ? s.bg.split('135deg, ')[1]?.split(' 0%')[0] : '#f5f0eb'} 100%)` }} />
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <div className="w-9 h-9 rounded-full bg-white/60 backdrop-blur-md grid place-items-center text-[#2c2825] border border-black/5">
            <ArrowRight size={15} />
          </div>
        </div>

        <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#2c2825]">
          <p className="text-[10px] uppercase tracking-[0.25em] mb-2 font-bold" style={{ color: s.accent }}>{s.tag}</p>
          <h3 className="font-display text-3xl mb-3 leading-tight">{s.name}</h3>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {s.keywords.map(kw => (
              <span key={kw} className="text-[9px] uppercase tracking-[0.2em] bg-white/40 backdrop-blur px-2.5 py-1 rounded-full border border-black/5 text-[#2c2825]/80">
                {kw}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#2c2825]/80 leading-relaxed mb-5 line-clamp-2">{s.short}</p>

          {/* Palette swatches */}
          <div className="flex gap-2 items-center relative z-10">
            {s.palette.map((c) => (
              <div
                key={c}
                className="w-7 h-7 rounded-full border-2 border-white/60 shadow-sm transition-transform group-hover:scale-110"
                style={{ background: c }}
              />
            ))}
            {/* Signature material swatch */}
            <div className="ml-auto w-7 h-7 rounded-full border-2 border-white/60 shadow-sm overflow-hidden">
              <img src={s.materialImg} alt={s.signatureMaterial} className="w-full h-full object-cover" />
            </div>
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
          Ten enduring interior styles. Explore the precise materials, palettes, and design philosophies that define them.
        </p>
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/50 backdrop-blur grid place-items-center hover:bg-white/80 transition z-20 border border-black/10 text-[#2c2825]"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* LEFT — gradient + reference image */}
                <div
                  className="relative flex flex-col border-b md:border-b-0 md:border-r border-border overflow-hidden"
                  style={{ background: open.bg }}
                >
                  {/* Reference Room Image */}
                  <div className="w-full aspect-[4/3] overflow-hidden relative">
                    <img
                      src={open.referenceImg}
                      alt={`${open.name} interior reference`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="bg-black/40 backdrop-blur-md text-white text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full">
                        Reference Space
                      </span>
                    </div>
                  </div>

                  {/* Style info below image */}
                  <div className="p-8 md:p-10 text-[#2c2825] flex-1">
                    <p className="text-xs uppercase tracking-[0.25em] mb-2 font-bold" style={{ color: open.accent }}>{open.tag}</p>
                    <h2 className="font-display text-4xl mb-4">{open.name}</h2>
                    <p className="text-base text-[#2c2825]/80 leading-relaxed mb-6">{open.short}</p>
                    <div className="flex flex-wrap gap-2">
                      {open.keywords.map(kw => (
                        <span key={kw} className="text-[10px] uppercase tracking-[0.2em] bg-white/40 border border-black/10 px-3 py-1.5 rounded-full text-[#2c2825]/90">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT — details */}
                <div className="p-8 md:p-10 flex flex-col gap-8 bg-background">
                  <p className="text-sm text-muted-foreground leading-loose">{open.long}</p>

                  {/* Color Palette */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-bold">Color Palette</p>
                    <div className="flex gap-2">
                      {open.palette.map(c => (
                        <div key={c} className="flex-1">
                          <div className="w-full h-14 rounded-xl shadow-sm mb-2 border border-border" style={{ background: c }} />
                          <p className="text-[9px] uppercase tracking-wide text-muted-foreground font-mono text-center">{c}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Materials */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-bold">Key Materials</p>
                    <div className="flex flex-wrap gap-2">
                      {open.materials.map(m => (
                        <span key={m} className="text-xs px-4 py-2 rounded-lg bg-muted border border-border text-foreground">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Signature Material swatch */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
                    <img
                      src={open.materialImg}
                      alt={`${open.signatureMaterial} texture`}
                      className="w-16 h-16 rounded-xl object-cover border border-border shadow-sm flex-shrink-0"
                    />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1">Signature Material</p>
                      <p className="text-sm font-medium text-foreground">{open.signatureMaterial}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Defining texture of this style</p>
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
