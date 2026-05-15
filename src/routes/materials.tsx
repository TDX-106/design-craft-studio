import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, X, Maximize2 } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

// --- Original Repo Images ---
import charredWood from "@/assets/materials/charred-wood.jpg";
import maple from "@/assets/materials/maple.jpg";
import ebony from "@/assets/materials/ebony.jpg";
import bamboo from "@/assets/materials/bamboo.jpg";
import slate from "@/assets/materials/slate.jpg";
import neroMarquina from "@/assets/materials/nero-marquina.jpg";
import onyx from "@/assets/materials/onyx.jpg";
import sandstone from "@/assets/materials/sandstone.jpg";
import greenMarble from "@/assets/materials/green-marble.jpg";
import terrazzo from "@/assets/materials/terrazzo.jpg";
import brass from "@/assets/materials/brass.jpg";
import chrome from "@/assets/materials/chrome.jpg";
import copper from "@/assets/materials/copper.jpg";
import stainless from "@/assets/materials/stainless.jpg";
import gunmetal from "@/assets/materials/gunmetal.jpg";
import corten from "@/assets/materials/corten.jpg";
import titanium from "@/assets/materials/titanium.jpg";
import pewter from "@/assets/materials/pewter.jpg";
import boucle from "@/assets/materials/boucle.jpg";
import linen from "@/assets/materials/linen.jpg";
import velvet from "@/assets/materials/velvet.jpg";
import woolFelt from "@/assets/materials/wool-felt.jpg";
import silk from "@/assets/materials/silk.jpg";
import jute from "@/assets/materials/jute.jpg";
import leather from "@/assets/materials/leather.jpg";
import ribbedGlass from "@/assets/materials/ribbed-glass.jpg";
import smokedGlass from "@/assets/materials/smoked-glass.jpg";
import frostedGlass from "@/assets/materials/frosted-glass.jpg";
import reededGlass from "@/assets/materials/reeded-glass.jpg";
import microcement from "@/assets/materials/microcement.jpg";
import boardConcrete from "@/assets/materials/board-concrete.jpg";

// --- AI Generated High-Quality PNG Images ---
import texMahogany from "@/assets/materials/mahogany.png";
import texWalnut from "@/assets/materials/walnut.png";
import texWhiteOak from "@/assets/materials/white_oak.png";
import texSmokedOak from "@/assets/materials/smoked_oak.png";
import texBleachedAsh from "@/assets/materials/bleached_ash.png";
import texTeak from "@/assets/materials/teak.png";
import texCherry from "@/assets/materials/cherry.png";
import texCarrara from "@/assets/materials/carrara.png";
import texGranite from "@/assets/materials/granite.png";
import texTravertine from "@/assets/materials/travertine.png";
import texCalacatta from "@/assets/materials/calacatta.png";
import texSoapstone from "@/assets/materials/soapstone.png";
import texSteel from "@/assets/materials/steel.png";
import texConcrete from "@/assets/materials/concrete.png";

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Materials Library — DesignCraft" },
      { name: "description", content: "A tactile reference of woods, stones, metals, fabrics, glass and concrete." },
    ],
  }),
  component: Materials,
});

type Cat = "All" | "Wood" | "Stone" | "Metal" | "Fabric" | "Leather" | "Glass" | "Concrete";

interface Material {
  name: string;
  cat: Exclude<Cat, "All">;
  desc: string;
  img: string;
  notes: string;
  
  // Extended metadata for deep modal
  finish?: string;
  durability?: string;
  origin?: string;
  pairings?: string[];
  applications?: string[];
}

const materials: Material[] = [
  // --- WOOD ---
  { name: "White Oak", cat: "Wood", desc: "Light, airy scandi style with straight subtle grain.", notes: "Natural matte finish.", img: texWhiteOak, finish: "Matte Lacquer", durability: "High (Janka 1360)", origin: "North America", pairings: ["Carrara Marble", "Brushed Steel"], applications: ["Flooring", "Cabinetry"] },
  { name: "Smoked Oak", cat: "Wood", desc: "Warm grain, deep amber undertones.", notes: "Pairs with linen, brass.", img: texSmokedOak, finish: "Hardwax Oil", durability: "High", origin: "Europe", pairings: ["Blackened Steel", "Calacatta Gold"], applications: ["Statement Furniture"] },
  { name: "Walnut Veneer", cat: "Wood", desc: "Rich chocolate with quiet figure.", notes: "Soft sheen finish.", img: texWalnut, finish: "Satin Varnish", durability: "Medium (Janka 1010)", origin: "North America", pairings: ["Brass", "Bouclé"], applications: ["Millwork"] },
  { name: "Bleached Ash", cat: "Wood", desc: "Pale, calm, scandi feel.", notes: "Matte sealed.", img: texBleachedAsh, finish: "Soap Treated", durability: "Medium", origin: "Scandinavia", pairings: ["Microcement", "Polished Chrome"], applications: ["Cabinetry"] },
  { name: "Reclaimed Teak", cat: "Wood", desc: "Golden, weathered, full of story.", notes: "Hand-oiled.", img: texTeak, finish: "Unfinished / Oiled", durability: "Very High", origin: "Southeast Asia", pairings: ["Concrete", "Linen"], applications: ["Outdoor Furniture"] },
  { name: "Dark Mahogany", cat: "Wood", desc: "Rich, polished reddish-brown with elegant flowing grain.", notes: "High gloss heritage feel.", img: texMahogany, finish: "French Polish", durability: "Medium", origin: "Central America", pairings: ["Aged Brass", "Velvet"], applications: ["Classic Furniture"] },
  { name: "American Cherry", cat: "Wood", desc: "Warm reddish, ages beautifully.", notes: "Satin oil.", img: texCherry, finish: "Clear Oil", durability: "Medium", origin: "North America", pairings: ["Soapstone", "Brushed Nickel"], applications: ["Fine Cabinetry"] },
  { name: "Charred Cedar", cat: "Wood", desc: "Shou sugi ban — burnt, textural.", notes: "Wax-sealed.", img: charredWood },
  { name: "Soft Maple", cat: "Wood", desc: "Blonde, even, gently figured.", notes: "Clear lacquer.", img: maple },
  { name: "Macassar Ebony", cat: "Wood", desc: "Near-black with copper streaks.", notes: "French polished.", img: ebony },
  { name: "Bamboo Ply", cat: "Wood", desc: "Pale, striated, sustainable.", notes: "Edge-grain panel.", img: bamboo },

  // --- STONE ---
  { name: "Carrara Marble", cat: "Stone", desc: "Soft white with feathered grey veins.", notes: "Honed surface.", img: texCarrara, finish: "Honed", durability: "Medium", origin: "Carrara, Italy", pairings: ["White Oak", "Polished Chrome"], applications: ["Vanities", "Backsplashes"] },
  { name: "Calacatta Gold", cat: "Stone", desc: "White marble laced with bold gold.", notes: "Polished slab.", img: texCalacatta, finish: "Polished", durability: "Medium", origin: "Italy", pairings: ["Smoked Oak", "Brushed Brass"], applications: ["Kitchen Islands"] },
  { name: "Travertine", cat: "Stone", desc: "Warm porous limestone.", notes: "Filled & polished.", img: texTravertine, finish: "Honed & Unfilled", durability: "High", origin: "Tivoli, Italy", pairings: ["Walnut", "Bronze"], applications: ["Flooring", "Wall Cladding"] },
  { name: "Dark Soapstone", cat: "Stone", desc: "Deep charcoal grey with soft white powdery veining.", notes: "Velvety smooth, matte finish.", img: texSoapstone, finish: "Mineral Oiled", durability: "High", origin: "Brazil", pairings: ["Natural Cherry", "Aged Copper"], applications: ["Kitchen Counters"] },
  { name: "Speckled Granite", cat: "Stone", desc: "Hardwearing, peppered crystal.", notes: "Flamed finish.", img: texGranite, finish: "High Polish", durability: "Extreme", origin: "India", pairings: ["Blackened Steel", "Clear Glass"], applications: ["Commercial Counters"] },
  { name: "Slate Black", cat: "Stone", desc: "Cleft surface, deep matte.", notes: "Cool undertone.", img: slate },
  { name: "Nero Marquina", cat: "Stone", desc: "Black marble, electric white veining.", notes: "Polished.", img: neroMarquina },
  { name: "Pink Onyx", cat: "Stone", desc: "Translucent peach, dreamy strata.", notes: "Backlit-ready.", img: onyx },
  { name: "Sandstone", cat: "Stone", desc: "Warm desert tone, fine grain.", notes: "Sawn finish.", img: sandstone },
  { name: "Verde Alpi", cat: "Stone", desc: "Deep emerald with white veins.", notes: "Polished.", img: greenMarble },
  { name: "Terrazzo", cat: "Stone", desc: "Cement base, jewel-like chips.", notes: "Ground & sealed.", img: terrazzo },

  // --- METAL ---
  { name: "Blackened Steel", cat: "Metal", desc: "Patinated industrial finish.", notes: "Hand-waxed.", img: texSteel, finish: "Hot Rolled & Waxed", durability: "High (Will patina)", origin: "Industrial", pairings: ["White Oak", "Concrete"], applications: ["Staircases", "Hardware"] },
  { name: "Brushed Brass", cat: "Metal", desc: "Warm gold with horizontal grain.", notes: "Lacquered.", img: brass },
  { name: "Polished Chrome", cat: "Metal", desc: "Mirror sheen, cool reflective.", notes: "High gloss.", img: chrome },
  { name: "Brushed Copper", cat: "Metal", desc: "Warm pink-orange, lively patina.", notes: "Sealed matte.", img: copper },
  { name: "Brushed Stainless", cat: "Metal", desc: "Cool silver, architectural.", notes: "Directional grain.", img: stainless },
  { name: "Gunmetal", cat: "Metal", desc: "Deep graphite, subtle sheen.", notes: "PVD-coated.", img: gunmetal },
  { name: "Corten Steel", cat: "Metal", desc: "Living rust, architectural warmth.", notes: "Weathered.", img: corten },
  { name: "Brushed Titanium", cat: "Metal", desc: "Soft warm grey, aerospace feel.", notes: "Anodised.", img: titanium },
  { name: "Hammered Pewter", cat: "Metal", desc: "Hand-dimpled, soft silver.", notes: "Wax finish.", img: pewter },

  // --- CONCRETE ---
  { name: "Architectural Concrete", cat: "Concrete", desc: "Sealed, soft sheen.", notes: "Power-troweled.", img: texConcrete, finish: "Power-Troweled & Sealed", durability: "Extreme", origin: "Site-cast", pairings: ["Teak", "Blackened Steel"], applications: ["Flooring", "Structural Walls"] },
  { name: "Microcement", cat: "Concrete", desc: "Seamless, warm grey.", notes: "Hand-troweled.", img: microcement },
  { name: "Board-Formed Concrete", cat: "Concrete", desc: "Wood-grain imprint, brutalist.", notes: "As-cast.", img: boardConcrete },

  // --- FABRIC ---
  { name: "Bouclé Cream", cat: "Fabric", desc: "Looped, sculptural texture.", notes: "Wool blend.", img: boucle },
  { name: "Linen Stone", cat: "Fabric", desc: "Soft natural weave.", notes: "Pre-washed.", img: linen },
  { name: "Velvet Forest", cat: "Fabric", desc: "Deep mossy green pile.", notes: "Cotton velvet.", img: velvet },
  { name: "Wool Felt", cat: "Fabric", desc: "Dense charcoal, acoustic-friendly.", notes: "Pressed.", img: woolFelt },
  { name: "Raw Silk", cat: "Fabric", desc: "Ivory shimmer, fine slubs.", notes: "Hand-loomed.", img: silk },
  { name: "Jute Weave", cat: "Fabric", desc: "Coarse natural fibre, golden.", notes: "Open weave.", img: jute },

  // --- LEATHER ---
  { name: "Cognac Leather", cat: "Leather", desc: "Full-grain, supple, develops patina.", notes: "Vegetable-tanned.", img: leather },

  // --- GLASS ---
  { name: "Ribbed Glass", cat: "Glass", desc: "Vertical fluting, soft diffuse.", notes: "Clear tempered.", img: ribbedGlass },
  { name: "Smoked Glass", cat: "Glass", desc: "Translucent bronze tint.", notes: "Tempered safety.", img: smokedGlass },
  { name: "Frosted Glass", cat: "Glass", desc: "Acid-etched milky surface.", notes: "Sandblasted.", img: frostedGlass },
  { name: "Reeded Glass", cat: "Glass", desc: "Wavy verticals, cool tint.", notes: "Cast pattern.", img: reededGlass },
];

const cats: Cat[] = ["All", "Wood", "Stone", "Metal", "Fabric", "Leather", "Glass", "Concrete"];

function Materials() {
  const [cat, setCat] = useState<Cat>("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Material | null>(null);

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
          {materials.length} surfaces across six categories — photographed close, true to grain, vein and weave. Click any material for deeper insights.
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
              className="w-full bg-card text-foreground rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pistachio border border-border shadow-sm placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative px-4 py-2 text-sm rounded-full border transition ${
                  cat === c
                    ? "bg-accent-sage text-white border-accent-sage font-medium shadow-sm"
                    : "bg-card text-foreground border-border hover:border-accent-pistachio hover:text-accent-sage shadow-sm"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <motion.div layout className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setOpen(m)}
                className="group relative text-left rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all w-full"
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img 
                    src={m.img} 
                    alt={m.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white/80 backdrop-blur text-[#2c2825] text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-black/5 shadow-sm">
                    {m.cat}
                  </span>

                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur grid place-items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all border border-black/5 shadow-sm">
                    <Maximize2 size={14} className="text-[#2c2825]" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl mb-1">{m.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{m.desc}</p>
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <p className="text-[10px] text-accent-sage uppercase tracking-widest">{m.notes}</p>
                  </div>
                </div>
              </button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">No materials match — try clearing filters.</p>
      )}

      {/* DARK THEME DEEP DIVE MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] bg-foreground/20 backdrop-blur-md grid place-items-center p-4 lg:p-10 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-background text-foreground max-w-5xl w-full h-[80vh] rounded-[2rem] overflow-hidden shadow-elegant border border-border my-auto flex flex-col md:flex-row"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/80 backdrop-blur grid place-items-center hover:bg-muted transition z-50 border border-border shadow-sm"
              >
                <X size={18} />
              </button>

              {/* LEFT PANEL: Massive Texture View */}
              <div className="w-full md:w-1/2 h-64 md:h-full relative bg-muted border-r border-border">
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={open.img} 
                  alt={open.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* RIGHT PANEL: Metadata */}
              <div className="w-full md:w-1/2 h-full overflow-y-auto p-8 md:p-12 flex flex-col bg-background relative z-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent-sage mb-3 inline-block font-bold">
                  {open.cat} Material
                </span>
                <h2 className="font-display text-4xl mb-4">{open.name}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{open.desc}</p>
                
                <div className="space-y-6 flex-1">
                  {/* Generic Notes */}
                  <div className="bg-muted rounded-xl p-4 border border-border">
                    <p className="text-sm italic text-foreground">{open.notes}</p>
                  </div>

                  {/* Deep Metadata (if available) */}
                  {(open.finish || open.durability || open.origin) && (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      {open.finish && (
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Finish</p>
                          <p className="text-sm font-medium">{open.finish}</p>
                        </div>
                      )}
                      {open.durability && (
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Durability</p>
                          <p className="text-sm font-medium">{open.durability}</p>
                        </div>
                      )}
                      {open.origin && (
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Origin</p>
                          <p className="text-sm font-medium">{open.origin}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {(open.applications || open.pairings) && <div className="h-px w-full bg-border my-2" />}

                  {open.applications && (
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Recommended For</p>
                      <div className="flex flex-wrap gap-2">
                        {open.applications.map(app => (
                          <span key={app} className="text-xs px-3 py-1.5 rounded-md bg-muted border border-border">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {open.pairings && (
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Ideal Pairings</p>
                      <div className="flex flex-wrap gap-2">
                        {open.pairings.map((pair, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm bg-accent-light text-accent-sage px-3 py-1.5 rounded-md border border-accent-sage/20">
                            {pair}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrap>
  );
}
