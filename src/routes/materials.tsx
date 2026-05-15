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
          Sixteen surfaces, six categories. Hover a swatch to read its character.
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
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
