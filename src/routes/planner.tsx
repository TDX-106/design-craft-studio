import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useCallback } from "react";
import { Trash2, RotateCcw, RotateCw, Home, Grid3X3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Space Planner — DesignCraft" },
      { name: "description", content: "Interactive 2D architectural blueprint planner." },
    ],
  }),
  component: Planner,
});

const COLS = 16;
const ROWS = 12;
const CELL_M = 0.3; // 1 cell = 0.3m

interface FurnitureType {
  id: string;
  name: string;
  w: number;
  h: number;
  icon: React.FC<{ w: number; h: number; rot: number }>;
}

// Clean, CAD-style wireframe SVGs
function SofaIcon({ w, h }: { w: number; h: number }) {
  const W = w * 100, H = h * 100;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" className="absolute inset-0">
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="6" fill="rgba(147,180,139,0.1)" stroke="#93b48b" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="8" y="8" width={W - 16} height={H * 0.45} rx="4" fill="none" stroke="#93b48b" strokeWidth="1.5" />
      {[0.1, 0.38, 0.66].map((x, i) => (
        <rect key={i} x={W * x} y={H * 0.55} width={W * 0.24} height={H * 0.35} rx="2" fill="none" stroke="#93b48b" strokeWidth="1" />
      ))}
    </svg>
  );
}

function BedIcon({ w, h }: { w: number; h: number }) {
  const W = w * 100, H = h * 100;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" className="absolute inset-0">
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="4" fill="rgba(255,255,255,0.05)" stroke="#fff" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="4" y="4" width={W - 8} height={H * 0.15} fill="none" stroke="#fff" strokeWidth="1.5" />
      <rect x="10" y={H * 0.22} width={W * 0.35} height={H * 0.18} rx="4" fill="none" stroke="#fff" strokeWidth="1" />
      <rect x={W * 0.55} y={H * 0.22} width={W * 0.35} height={H * 0.18} rx="4" fill="none" stroke="#fff" strokeWidth="1" />
      <line x1="2" y1={H * 0.45} x2={W - 2} y2={H * 0.45} stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

function DeskIcon({ w, h }: { w: number; h: number }) {
  const W = w * 100, H = h * 100;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" className="absolute inset-0">
      <rect x="2" y="2" width={W - 4} height={H - 4} fill="rgba(150,180,220,0.1)" stroke="#96b4dc" strokeWidth="2" />
      <rect x="10" y="6" width={W * 0.5} height={H - 12} fill="none" stroke="#96b4dc" strokeWidth="1" />
      <rect x={W * 0.65} y="6" width={W * 0.25} height={H * 0.5} fill="none" stroke="#96b4dc" strokeWidth="1" />
    </svg>
  );
}

function WardrobeIcon({ w, h }: { w: number; h: number }) {
  const W = w * 100, H = h * 100;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" className="absolute inset-0">
      <rect x="2" y="2" width={W - 4} height={H - 4} fill="rgba(200,180,150,0.1)" stroke="#c8b496" strokeWidth="2" />
      <line x1={W / 2} y1="2" x2={W / 2} y2={H - 2} stroke="#c8b496" strokeWidth="1.5" />
      <line x1={W * 0.2} y1={H * 0.2} x2={W * 0.8} y2={H * 0.8} stroke="#c8b496" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1={W * 0.8} y1={H * 0.2} x2={W * 0.2} y2={H * 0.8} stroke="#c8b496" strokeWidth="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

function DiningIcon({ w, h }: { w: number; h: number }) {
  const W = w * 100, H = h * 100;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" className="absolute inset-0">
      <rect x={W * 0.15} y={H * 0.15} width={W * 0.7} height={H * 0.7} rx="4" fill="none" stroke="#e8c896" strokeWidth="2" />
      <rect x={W * 0.3} y="2" width={W * 0.15} height={H * 0.1} fill="none" stroke="#e8c896" strokeWidth="1" />
      <rect x={W * 0.55} y="2" width={W * 0.15} height={H * 0.1} fill="none" stroke="#e8c896" strokeWidth="1" />
      <rect x={W * 0.3} y={H - H * 0.12} width={W * 0.15} height={H * 0.1} fill="none" stroke="#e8c896" strokeWidth="1" />
      <rect x={W * 0.55} y={H - H * 0.12} width={W * 0.15} height={H * 0.1} fill="none" stroke="#e8c896" strokeWidth="1" />
      <rect x="2" y={H * 0.4} width={W * 0.1} height={H * 0.2} fill="none" stroke="#e8c896" strokeWidth="1" />
      <rect x={W - W * 0.12} y={H * 0.4} width={W * 0.1} height={H * 0.2} fill="none" stroke="#e8c896" strokeWidth="1" />
    </svg>
  );
}

function CoffeeIcon({ w, h }: { w: number; h: number }) {
  const W = w * 100, H = h * 100;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" className="absolute inset-0">
      <circle cx={W / 2} cy={H / 2} r={W / 2 - 4} fill="rgba(200,200,200,0.05)" stroke="#ccc" strokeWidth="2" />
      <circle cx={W / 2} cy={H / 2} r={W / 4} fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

const TYPES: FurnitureType[] = [
  { id: "sofa", name: "Sofa", w: 5, h: 2, icon: SofaIcon },
  { id: "bed", name: "Bed", w: 4, h: 5, icon: BedIcon },
  { id: "desk", name: "Desk", w: 3, h: 2, icon: DeskIcon },
  { id: "wardrobe", name: "Wardrobe", w: 3, h: 2, icon: WardrobeIcon },
  { id: "dining", name: "Dining Table", w: 4, h: 5, icon: DiningIcon },
  { id: "coffee", name: "Coffee Table", w: 2, h: 2, icon: CoffeeIcon },
];

const PRESETS = [
  { label: "Living", icon: "🛋️", items: [{ id: "sofa", x: 2, y: 2, rot: 0 }, { id: "coffee", x: 3, y: 5, rot: 0 }] },
  { label: "Bedroom", icon: "🛏️", items: [{ id: "bed", x: 6, y: 1, rot: 0 }, { id: "wardrobe", x: 1, y: 1, rot: 0 }] },
  { label: "Office", icon: "💻", items: [{ id: "desk", x: 2, y: 3, rot: 90 }, { id: "wardrobe", x: 7, y: 1, rot: 0 }] },
];

interface Placed extends FurnitureType {
  uid: string;
  x: number;
  y: number;
  rot: number;
}

function Planner() {
  const [items, setItems] = useState<Placed[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cellW = useCallback(() => (gridRef.current ? gridRef.current.clientWidth / COLS : 40), []);
  const cellH = useCallback(() => (gridRef.current ? gridRef.current.clientHeight / ROWS : 40), []);

  const onDragStart = (e: React.DragEvent, id: string, source: "palette" | "grid") => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("source", source);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const source = e.dataTransfer.getData("source");
    const rect = gridRef.current!.getBoundingClientRect();
    const gx = Math.max(0, Math.floor((e.clientX - rect.left) / cellW()));
    const gy = Math.max(0, Math.floor((e.clientY - rect.top) / cellH()));

    if (source === "palette") {
      const t = TYPES.find((x) => x.id === id);
      if (!t) return;
      setItems((it) => [...it, { ...t, uid: crypto.randomUUID(), x: Math.min(gx, COLS - t.w), y: Math.min(gy, ROWS - t.h), rot: 0 }]);
    } else {
      setItems((it) =>
        it.map((p) => {
          if (p.uid !== id) return p;
          const effW = p.rot === 90 ? p.h : p.w;
          const effH = p.rot === 90 ? p.w : p.h;
          return { ...p, x: Math.min(gx, COLS - effW), y: Math.min(gy, ROWS - effH) };
        })
      );
    }
  };

  const rotate = () => {
    if (!selected) return;
    setItems((it) =>
      it.map((p) => {
        if (p.uid !== selected) return p;
        const nRot = p.rot === 0 ? 90 : 0;
        const effW = nRot === 90 ? p.h : p.w;
        const effH = nRot === 90 ? p.w : p.h;
        return { ...p, rot: nRot, x: Math.min(p.x, COLS - effW), y: Math.min(p.y, ROWS - effH) };
      })
    );
  };

  const loadPreset = (p: typeof PRESETS[0]) => {
    setItems(p.items.map((pi) => ({ ...TYPES.find((t) => t.id === pi.id)!, uid: crypto.randomUUID(), x: pi.x, y: pi.y, rot: pi.rot })));
    setSelected(null);
  };

  const usedCells = items.reduce((acc, p) => acc + p.w * p.h, 0);

  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>Space Planner</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-balance">Draft the layout.</h1>
        <p className="text-muted-foreground max-w-xl">
          Architectural blueprint tools. Drag wireframes onto the grid, select to rotate or measure.
        </p>
      </Reveal>

      {/* PRESETS */}
      <Reveal delay={0.08}>
        <div className="mt-8 flex gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => loadPreset(p)}
              className="px-4 py-2 bg-gradient-dark border border-white/10 rounded-xl text-warm-white text-sm hover:border-accent-pistachio transition flex items-center gap-2"
            >
              <span>{p.icon}</span> {p.label}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-6 grid lg:grid-cols-[240px_1fr] gap-6">
          {/* SIDEBAR */}
          <div className="bg-gradient-dark border border-white/5 shadow-elegant rounded-3xl p-5 h-fit lg:sticky lg:top-28">
            <h3 className="font-display text-warm-white text-lg mb-4 flex items-center gap-2"><Grid3X3 size={16}/> Wireframes</h3>
            <div className="space-y-2">
              {TYPES.map((t) => (
                <div
                  key={t.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, t.id, "palette")}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-charcoal hover:border-accent-pistachio cursor-grab active:cursor-grabbing transition"
                >
                  <div className="relative w-10 h-10 flex-shrink-0 bg-black/40 rounded-md">
                    <t.icon w={1} h={1} rot={0} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-warm-white">{t.name}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">{(t.w * CELL_M).toFixed(1)}m × {(t.h * CELL_M).toFixed(1)}m</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Room</span>
                <span className="font-mono">{(COLS * CELL_M).toFixed(1)} × {(ROWS * CELL_M).toFixed(1)}m</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Area Usage</span>
                <span className="text-warm-white font-mono">
                  {(usedCells * CELL_M * CELL_M).toFixed(1)} / {(COLS * ROWS * CELL_M * CELL_M).toFixed(1)}m²
                </span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-accent-pistachio" animate={{ width: `${(usedCells / (COLS * ROWS)) * 100}%` }} />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {selected && (
                <button onClick={rotate} className="w-full py-2 bg-accent-light text-accent-sage rounded-xl text-sm hover:bg-accent-pistachio hover:text-charcoal transition font-medium flex justify-center items-center gap-2">
                  <RotateCw size={14} /> Rotate
                </button>
              )}
              <button onClick={() => { setItems([]); setSelected(null); }} className="w-full py-2 bg-charcoal text-warm-white border border-white/10 rounded-xl text-sm hover:border-red-400/50 hover:text-red-400 transition font-medium flex justify-center items-center gap-2">
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>

          {/* BLUEPRINT CANVAS */}
          <div
            ref={gridRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            tabIndex={0}
            onKeyDown={(e) => {
              if ((e.key === "Delete" || e.key === "Backspace") && selected) { setItems((it) => it.filter((p) => p.uid !== selected)); setSelected(null); }
              if (e.key === "r") rotate();
            }}
            onClick={(e) => e.target === e.currentTarget && setSelected(null)}
            className="relative rounded-3xl overflow-hidden shadow-elegant outline-none focus:ring-1 focus:ring-accent-pistachio bg-[#0a0f16]"
            style={{
              aspectRatio: `${COLS}/${ROWS}`,
              backgroundImage: `
                linear-gradient(rgba(100, 150, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 150, 255, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(100, 150, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 150, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: `${100 / (COLS/4)}% ${100 / (ROWS/3)}%, ${100 / (COLS/4)}% ${100 / (ROWS/3)}%, ${100 / COLS}% ${100 / ROWS}%, ${100 / COLS}% ${100 / ROWS}%`,
            }}
          >
            {/* Outline box */}
            <div className="absolute inset-4 border-2 border-blue-400/20 rounded-xl pointer-events-none" />

            {/* Elements */}
            <AnimatePresence>
              {items.map((p) => {
                const effW = p.rot === 90 ? p.h : p.w;
                const effH = p.rot === 90 ? p.w : p.h;
                return (
                  <motion.div
                    key={p.uid}
                    layoutId={p.uid}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    draggable
                    onDragStart={(e) => onDragStart(e, p.uid, "grid")}
                    onClick={(e) => { e.stopPropagation(); setSelected(p.uid); }}
                    className="absolute cursor-grab active:cursor-grabbing group"
                    style={{
                      left: `${(p.x / COLS) * 100}%`,
                      top: `${(p.y / ROWS) * 100}%`,
                      width: `${(effW / COLS) * 100}%`,
                      height: `${(effH / ROWS) * 100}%`,
                    }}
                  >
                    <div className={`absolute inset-[1px] transition ${selected === p.uid ? "bg-blue-400/10 ring-1 ring-blue-400/50" : "hover:bg-white/5"}`}>
                      <p.icon w={effW} h={effH} rot={p.rot} />
                    </div>
                    {/* Measurement tooltip */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 text-blue-200 border border-blue-500/30 text-[9px] px-2 py-0.5 rounded font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none">
                      {(effW * CELL_M).toFixed(1)}m × {(effH * CELL_M).toFixed(1)}m
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {items.length === 0 && (
              <div className="absolute inset-0 grid place-items-center pointer-events-none text-blue-200/30 font-mono text-sm uppercase tracking-widest">
                [ Empty Blueprint Canvas ]
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </PageWrap>
  );
}
