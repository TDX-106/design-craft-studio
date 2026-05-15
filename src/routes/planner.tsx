import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Trash2, RotateCcw } from "lucide-react";

import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Space Planner — DesignCraft" },
      { name: "description", content: "Drag-and-drop 2D room planner with snap-to-grid furniture." },
    ],
  }),
  component: Planner,
});

const COLS = 12;
const ROWS = 10;

interface FurnitureType {
  id: string;
  name: string;
  w: number;
  h: number;
  color: string;
}

const TYPES: FurnitureType[] = [
  { id: "sofa", name: "Sofa", w: 4, h: 2, color: "#93b48b" },
  { id: "bed", name: "Bed", w: 4, h: 5, color: "#c4a578" },
  { id: "desk", name: "Desk", w: 3, h: 1, color: "#7a9aab" },
  { id: "wardrobe", name: "Wardrobe", w: 3, h: 1, color: "#6b4423" },
  { id: "dining", name: "Dining Table", w: 3, h: 4, color: "#8b6f47" },
  { id: "coffee", name: "Coffee Table", w: 2, h: 2, color: "#3d2f25" },
];

interface Placed extends FurnitureType {
  uid: string;
  x: number;
  y: number;
}

function Planner() {
  const [items, setItems] = useState<Placed[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cellSize = () => {
    const el = gridRef.current;
    if (!el) return 40;
    return el.clientWidth / COLS;
  };

  const onDragFromPalette = (e: React.DragEvent, t: FurnitureType) => {
    e.dataTransfer.setData("type", t.id);
    e.dataTransfer.setData("source", "palette");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("type");
    const source = e.dataTransfer.getData("source");
    const rect = gridRef.current!.getBoundingClientRect();
    const cs = cellSize();
    const x = Math.max(0, Math.floor((e.clientX - rect.left) / cs));
    const y = Math.max(0, Math.floor((e.clientY - rect.top) / cs));

    if (source === "palette") {
      const t = TYPES.find((x) => x.id === sourceId);
      if (!t) return;
      const cx = Math.min(x, COLS - t.w);
      const cy = Math.min(y, ROWS - t.h);
      setItems((it) => [...it, { ...t, uid: crypto.randomUUID(), x: cx, y: cy }]);
    } else {
      setItems((it) =>
        it.map((p) => {
          if (p.uid !== sourceId) return p;
          const cx = Math.max(0, Math.min(x, COLS - p.w));
          const cy = Math.max(0, Math.min(y, ROWS - p.h));
          return { ...p, x: cx, y: cy };
        })
      );
    }
  };

  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>Space Planner</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-balance">Lay out the room.</h1>
        <p className="text-muted-foreground max-w-xl">
          Drag furniture from the palette onto the grid. Re-drag placed items to reposition. Snaps to a 12 × 10 grid.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid lg:grid-cols-[260px_1fr] gap-6">
          {/* PALETTE */}
          <div className="bg-card border border-border rounded-3xl p-5 h-fit lg:sticky lg:top-28">
            <h3 className="font-display text-lg mb-4">Furniture</h3>
            <div className="space-y-2">
              {TYPES.map((t) => (
                <div
                  key={t.id}
                  draggable
                  onDragStart={(e) => onDragFromPalette(e, t)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent-pistachio hover:bg-accent-light/40 cursor-grab active:cursor-grabbing transition"
                >
                  <div className="w-10 h-10 rounded-md shadow-soft" style={{ background: t.color }} />
                  <div className="text-sm">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.w} × {t.h}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setItems([]); setSelected(null); }}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-charcoal text-warm-white rounded-xl py-3 text-sm hover:shadow-glow transition"
            >
              <RotateCcw size={14} /> Clear room
            </button>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Tip: Click a placed item then press Delete.
            </p>
          </div>

          {/* GRID */}
          <div
            ref={gridRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            tabIndex={0}
            onKeyDown={(e) => {
              if ((e.key === "Delete" || e.key === "Backspace") && selected) {
                setItems((it) => it.filter((p) => p.uid !== selected));
                setSelected(null);
              }
            }}
            className="relative aspect-[12/10] bg-card border border-border rounded-3xl overflow-hidden shadow-soft outline-none focus:ring-2 focus:ring-accent-pistachio"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(122,112,104,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(122,112,104,0.12) 1px, transparent 1px)",
              backgroundSize: `${100 / COLS}% ${100 / ROWS}%`,
            }}
          >
            {items.map((p) => (
              <div
                key={p.uid}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("type", p.uid);
                  e.dataTransfer.setData("source", "placed");
                }}
                onClick={() => setSelected(p.uid)}
                className={`absolute rounded-md cursor-grab active:cursor-grabbing flex items-center justify-center text-[10px] font-medium uppercase tracking-wider text-warm-white shadow-soft transition-all ${
                  selected === p.uid ? "ring-2 ring-offset-2 ring-accent-sage" : ""
                }`}
                style={{
                  left: `${(p.x / COLS) * 100}%`,
                  top: `${(p.y / ROWS) * 100}%`,
                  width: `${(p.w / COLS) * 100}%`,
                  height: `${(p.h / ROWS) * 100}%`,
                  background: p.color,
                }}
              >
                {p.name}
              </div>
            ))}

            {items.length === 0 && (
              <div className="absolute inset-0 grid place-items-center pointer-events-none text-muted-foreground">
                <p className="text-sm">Drag furniture here →</p>
              </div>
            )}

            {selected && (
              <button
                onClick={() => {
                  setItems((it) => it.filter((p) => p.uid !== selected));
                  setSelected(null);
                }}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-charcoal text-warm-white text-xs px-4 py-2 rounded-full hover:shadow-glow transition"
              >
                <Trash2 size={12} /> Remove selected
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </PageWrap>
  );
}
