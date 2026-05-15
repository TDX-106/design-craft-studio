import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

import smokedOak from "@/assets/materials/smoked-oak.jpg";
import walnut from "@/assets/materials/walnut.jpg";
import bleachedAsh from "@/assets/materials/bleached-ash.jpg";
import teak from "@/assets/materials/teak.jpg";
import charredWood from "@/assets/materials/charred-wood.jpg";
import maple from "@/assets/materials/maple.jpg";
import carrara from "@/assets/materials/carrara.jpg";
import travertine from "@/assets/materials/travertine.jpg";
import slate from "@/assets/materials/slate.jpg";
import calacatta from "@/assets/materials/calacatta.jpg";
import neroMarquina from "@/assets/materials/nero-marquina.jpg";
import granite from "@/assets/materials/granite.jpg";
import brass from "@/assets/materials/brass.jpg";
import blackenedSteel from "@/assets/materials/blackened-steel.jpg";
import chrome from "@/assets/materials/chrome.jpg";
import copper from "@/assets/materials/copper.jpg";
import stainless from "@/assets/materials/stainless.jpg";
import gunmetal from "@/assets/materials/gunmetal.jpg";
import boucle from "@/assets/materials/boucle.jpg";
import linen from "@/assets/materials/linen.jpg";
import velvet from "@/assets/materials/velvet.jpg";
import ribbedGlass from "@/assets/materials/ribbed-glass.jpg";
import smokedGlass from "@/assets/materials/smoked-glass.jpg";
import polishedConcrete from "@/assets/materials/polished-concrete.jpg";
import microcement from "@/assets/materials/microcement.jpg";

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
  img: string;
  notes: string;
}

const materials: Material[] = [
  // Wood — 6
  { name: "Smoked Oak", cat: "Wood", desc: "Warm grain, deep amber undertones.", notes: "Pairs with linen, brass.", img: smokedOak },
  { name: "Walnut Veneer", cat: "Wood", desc: "Rich chocolate with quiet figure.", notes: "Soft sheen finish.", img: walnut },
  { name: "Bleached Ash", cat: "Wood", desc: "Pale, calm, scandi feel.", notes: "Matte sealed.", img: bleachedAsh },
  { name: "Reclaimed Teak", cat: "Wood", desc: "Golden, weathered, full of story.", notes: "Hand-oiled.", img: teak },
  { name: "Charred Cedar", cat: "Wood", desc: "Shou sugi ban — burnt, textural.", notes: "Wax-sealed.", img: charredWood },
  { name: "Soft Maple", cat: "Wood", desc: "Blonde, even, gently figured.", notes: "Clear lacquer.", img: maple },

  // Stone — 6
  { name: "Carrara Marble", cat: "Stone", desc: "Soft white with feathered grey veins.", notes: "Honed surface.", img: carrara },
  { name: "Travertine", cat: "Stone", desc: "Warm porous limestone.", notes: "Filled & polished.", img: travertine },
  { name: "Slate Black", cat: "Stone", desc: "Cleft surface, deep matte.", notes: "Cool undertone.", img: slate },
  { name: "Calacatta Gold", cat: "Stone", desc: "White marble laced with bold gold.", notes: "Polished slab.", img: calacatta },
  { name: "Nero Marquina", cat: "Stone", desc: "Black marble, electric white veining.", notes: "Polished.", img: neroMarquina },
  { name: "Speckled Granite", cat: "Stone", desc: "Hardwearing, peppered crystal.", notes: "Flamed finish.", img: granite },

  // Metal — 6
  { name: "Brushed Brass", cat: "Metal", desc: "Warm gold with horizontal grain.", notes: "Lacquered.", img: brass },
  { name: "Blackened Steel", cat: "Metal", desc: "Patinated industrial finish.", notes: "Hand-waxed.", img: blackenedSteel },
  { name: "Polished Chrome", cat: "Metal", desc: "Mirror sheen, cool reflective.", notes: "High gloss.", img: chrome },
  { name: "Brushed Copper", cat: "Metal", desc: "Warm pink-orange, lively patina.", notes: "Sealed matte.", img: copper },
  { name: "Brushed Stainless", cat: "Metal", desc: "Cool silver, architectural.", notes: "Directional grain.", img: stainless },
  { name: "Gunmetal", cat: "Metal", desc: "Deep graphite, subtle sheen.", notes: "PVD-coated.", img: gunmetal },

  // Fabric — 3
  { name: "Bouclé Cream", cat: "Fabric", desc: "Looped, sculptural texture.", notes: "Wool blend.", img: boucle },
  { name: "Linen Stone", cat: "Fabric", desc: "Soft natural weave.", notes: "Pre-washed.", img: linen },
  { name: "Velvet Forest", cat: "Fabric", desc: "Deep mossy green pile.", notes: "Cotton velvet.", img: velvet },

  // Glass — 2
  { name: "Ribbed Glass", cat: "Glass", desc: "Vertical fluting, soft diffuse.", notes: "Clear tempered.", img: ribbedGlass },
  { name: "Smoked Glass", cat: "Glass", desc: "Translucent bronze tint.", notes: "Tempered safety.", img: smokedGlass },

  // Concrete — 2
  { name: "Polished Concrete", cat: "Concrete", desc: "Sealed, soft sheen.", notes: "Power-troweled.", img: polishedConcrete },
  { name: "Microcement", cat: "Concrete", desc: "Seamless, warm grey.", notes: "Hand-troweled.", img: microcement },
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
          {materials.length} surfaces across six categories — photographed close, true to grain, vein and weave.
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
            {cats.map((c) => {
              const count = c === "All" ? materials.length : materials.filter((m) => m.cat === c).length;
              return (
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
                  <span className="ml-2 opacity-60 text-xs">{count}</span>
                </button>
              );
            })}
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
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* sheen on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-70" />
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
