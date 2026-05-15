import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Materials Library — DesignCraft" },
      { name: "description", content: "A tactile reference of woods, stones, metals, fabrics, glass and concrete." },
    ],
  }),
  component: Materials,
});

type Cat = "All" | "Wood" | "Stone" | "Metal" | "Fabric" | "Glass" | "Concrete";

interface Material {
  name: string;
  cat: Exclude<Cat, "All">;
  desc: string;
  bg: string;
  notes: string;
}

const materials: Material[] = [
  { name: "Smoked Oak", cat: "Wood", desc: "Warm grain, deep amber undertones.", notes: "Pairs with linen, brass.", bg: "linear-gradient(135deg,#8b6f47 0%,#5a4530 50%,#3d2f20 100%)" },
  { name: "Walnut Veneer", cat: "Wood", desc: "Rich chocolate with quiet figure.", notes: "Soft sheen finish.", bg: "linear-gradient(135deg,#6b4423 0%,#4a2e15 100%)" },
  { name: "Bleached Ash", cat: "Wood", desc: "Pale, calm, scandi feel.", notes: "Matte sealed.", bg: "linear-gradient(135deg,#e8dcc4 0%,#c9b896 100%)" },
  { name: "Carrara Marble", cat: "Stone", desc: "Soft white with feathered grey veins.", notes: "Honed surface.", bg: "linear-gradient(135deg,#f5f3ed 0%,#d8d4ca 60%,#a8a298 100%)" },
  { name: "Travertine", cat: "Stone", desc: "Warm porous limestone.", notes: "Filled & polished.", bg: "linear-gradient(135deg,#e0c9a6 0%,#c4a578 100%)" },
  { name: "Slate Black", cat: "Stone", desc: "Cleft surface, deep matte.", notes: "Cool undertone.", bg: "linear-gradient(135deg,#3a3a3a 0%,#1a1a1a 100%)" },
  { name: "Brushed Brass", cat: "Metal", desc: "Warm gold with grain.", notes: "Lacquered.", bg: "linear-gradient(135deg,#d4a544 0%,#a07820 100%)" },
  { name: "Blackened Steel", cat: "Metal", desc: "Patinated industrial finish.", notes: "Hand-waxed.", bg: "linear-gradient(135deg,#3d3d3d 0%,#1f1f1f 100%)" },
  { name: "Polished Chrome", cat: "Metal", desc: "Mirror sheen, cool reflective.", notes: "High gloss.", bg: "linear-gradient(135deg,#e8eaed 0%,#a0a8b0 50%,#5a6068 100%)" },
  { name: "Bouclé Cream", cat: "Fabric", desc: "Looped, sculptural texture.", notes: "Wool blend.", bg: "linear-gradient(135deg,#f0e6d2 0%,#d8caa8 100%)" },
  { name: "Linen Stone", cat: "Fabric", desc: "Soft natural weave.", notes: "Pre-washed.", bg: "linear-gradient(135deg,#cfc4b0 0%,#a89a82 100%)" },
  { name: "Velvet Forest", cat: "Fabric", desc: "Deep mossy green pile.", notes: "Cotton velvet.", bg: "linear-gradient(135deg,#3d5a40 0%,#1f3525 100%)" },
  { name: "Ribbed Glass", cat: "Glass", desc: "Vertical fluting, soft diffuse.", notes: "Clear tempered.", bg: "linear-gradient(90deg,#d8e4e8 0%,#a8c0c8 25%,#d8e4e8 50%,#a8c0c8 75%,#d8e4e8 100%)" },
  { name: "Smoked Glass", cat: "Glass", desc: "Translucent bronze tint.", notes: "Tempered safety.", bg: "linear-gradient(135deg,#5a4a3a 0%,#2a221a 100%)" },
  { name: "Polished Concrete", cat: "Concrete", desc: "Sealed, soft sheen.", notes: "Power-troweled.", bg: "linear-gradient(135deg,#a8a098 0%,#787068 100%)" },
  { name: "Microcement", cat: "Concrete", desc: "Seamless, warm grey.", notes: "Hand-troweled.", bg: "linear-gradient(135deg,#c4bcaf 0%,#948a7c 100%)" },
];

const cats: Cat[] = ["All", "Wood", "Stone", "Metal", "Fabric", "Glass", "Concrete"];

// SVG texture overlays per material category — gives each swatch a tactile surface
function TextureOverlay({ cat }: { cat: Material["cat"] }) {
  const id = `tex-${cat}`;
  switch (cat) {
    case "Wood":
      return (
        <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-80" preserveAspectRatio="none" viewBox="0 0 200 200">
          <defs>
            <filter id={id}>
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.9" numOctaves="3" seed="4" />
              <feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0 0.05  0 0 0 0.55 0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter={`url(#${id})`} />
        </svg>
      );
    case "Stone":
      return (
        <svg className="absolute inset-0 w-full h-full mix-blend-soft-light opacity-90" preserveAspectRatio="none" viewBox="0 0 200 200">
          <defs>
            <filter id={id}>
              <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="4" seed="2" />
              <feDisplacementMap in="SourceGraphic" scale="6" />
              <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter={`url(#${id})`} />
          <g stroke="rgba(80,75,70,0.35)" fill="none" strokeWidth="0.6">
            <path d="M-5 60 Q60 40 130 80 T220 70" />
            <path d="M-5 110 Q70 95 140 130 T220 120" />
            <path d="M-5 160 Q50 150 120 175 T220 165" />
          </g>
        </svg>
      );
    case "Metal":
      return (
        <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-90" preserveAspectRatio="none" viewBox="0 0 200 200">
          <defs>
            <filter id={id}>
              <feTurbulence type="fractalNoise" baseFrequency="0.005 1.4" numOctaves="2" seed="7" />
              <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.45 0" />
            </filter>
            <linearGradient id={`${id}-g`} x1="0" x2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.25)" />
              <stop offset=".5" stopColor="rgba(255,255,255,0)" />
              <stop offset="1" stopColor="rgba(0,0,0,0.25)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" filter={`url(#${id})`} />
          <rect width="100%" height="100%" fill={`url(#${id}-g)`} />
        </svg>
      );
    case "Fabric":
      return (
        <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-95" preserveAspectRatio="none" viewBox="0 0 200 200">
          <defs>
            <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 3 H6 M3 0 V6" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
              <path d="M0 0 L6 6 M6 0 L0 6" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" />
            </pattern>
            <filter id={`${id}-n`}>
              <feTurbulence baseFrequency="0.9" numOctaves="2" />
              <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.25 0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
          <rect width="100%" height="100%" filter={`url(#${id}-n)`} />
        </svg>
      );
    case "Glass":
      return (
        <svg className="absolute inset-0 w-full h-full mix-blend-screen opacity-70" preserveAspectRatio="none" viewBox="0 0 200 200">
          <defs>
            <linearGradient id={id} x1="0" x2="1">
              {Array.from({ length: 12 }).map((_, i) => (
                <stop key={i} offset={`${(i / 11) * 100}%`} stopColor={i % 2 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0)"} />
              ))}
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      );
    case "Concrete":
      return (
        <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-90" preserveAspectRatio="none" viewBox="0 0 200 200">
          <defs>
            <filter id={id}>
              <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="9" />
              <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter={`url(#${id})`} />
        </svg>
      );
  }
}

function Materials() {
  const [cat, setCat] = useState<Cat>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      materials.filter(
        (m) =>
          (cat === "All" || m.cat === cat) &&
          (q === "" || m.name.toLowerCase().includes(q.toLowerCase()) || m.desc.toLowerCase().includes(q.toLowerCase()))
      ),
    [cat, q]
  );

  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>Materials Library</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-balance">A tactile reference.</h1>
        <p className="text-muted-foreground max-w-xl">
          Sixteen surfaces, six categories — each rendered with its own grain, weave, or polish.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative md:max-w-xs flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search materials…"
              className="w-full glass rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pistachio"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative px-4 py-2 text-sm rounded-full border transition ${
                  cat === c
                    ? "bg-charcoal text-warm-white border-charcoal"
                    : "bg-card border-border hover:border-accent-pistachio"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <motion.div layout className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((m, i) => (
            <motion.article
              layout
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elegant transition-shadow"
            >
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{ background: m.bg }}
                />
                <TextureOverlay cat={m.cat} />
                {/* sheen on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                <span className="absolute top-4 left-4 glass-dark text-warm-white text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                  {m.cat}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                <p className="text-xs text-accent-sage mt-3 uppercase tracking-wider">{m.notes}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">No materials match — try clearing filters.</p>
      )}
    </PageWrap>
  );
}
