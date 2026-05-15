import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

export const Route = createFileRoute("/colors")({
  head: () => ({
    meta: [
      { title: "Color Theory Studio — DesignCraft" },
      { name: "description", content: "Interactive harmonies and curated room mood palettes." },
    ],
  }),
  component: Colors,
});

type HarmonyKey = "Monochromatic" | "Complementary" | "Analogous" | "Triadic" | "Split-Complementary" | "Tetradic";

function hsl(h: number, s = 60, l = 55) {
  return `hsl(${(h + 360) % 360}, ${s}%, ${l}%)`;
}

function getHarmony(base: number, key: HarmonyKey): number[] {
  switch (key) {
    case "Monochromatic": return [base, base, base, base, base];
    case "Complementary": return [base, base + 180];
    case "Analogous": return [base - 30, base, base + 30];
    case "Triadic": return [base, base + 120, base + 240];
    case "Split-Complementary": return [base, base + 150, base + 210];
    case "Tetradic": return [base, base + 90, base + 180, base + 270];
  }
}

function harmonyLightness(key: HarmonyKey, idx: number, total: number) {
  if (key === "Monochromatic") return 30 + (idx / Math.max(total - 1, 1)) * 50;
  return 55;
}

const harmonies: { key: HarmonyKey; desc: string }[] = [
  { key: "Monochromatic", desc: "One hue, varied lightness — calm, cohesive." },
  { key: "Complementary", desc: "Opposite hues — bold, high contrast." },
  { key: "Analogous", desc: "Neighboring hues — natural and harmonious." },
  { key: "Triadic", desc: "Three evenly spaced hues — balanced energy." },
  { key: "Split-Complementary", desc: "Less tension than complementary." },
  { key: "Tetradic", desc: "Two complementary pairs — rich palette." },
];

const moods = [
  { name: "Quiet Library", colors: ["#3a4d3a", "#8a6f47", "#d8c9a8", "#f5f0eb"], desc: "Forest green, oak, cream." },
  { name: "Coastal Calm", colors: ["#a8c4ce", "#e8e0d0", "#7a9aab", "#f5f3ed"], desc: "Soft sky, sand, driftwood." },
  { name: "Warm Loft", colors: ["#c4694a", "#3d2f25", "#e8c896", "#1a1a1a"], desc: "Terracotta, walnut, brass." },
  { name: "Garden Room", colors: ["#93b48b", "#e8f0e6", "#c4a578", "#fffdf9"], desc: "Pistachio, travertine, cream." },
];

function Colors() {
  const [base, setBase] = useState(160);

  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>Color Theory Studio</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-balance">Harmonies, made visible.</h1>
        <p className="text-muted-foreground max-w-xl">
          Drag the hue slider to generate live palettes across six classical harmonies.
        </p>
      </Reveal>

      {/* HUE WHEEL CONTROL */}
      <Reveal delay={0.1}>
        <div className="mt-12 bg-card border border-border rounded-3xl p-8 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div
              className="w-32 h-32 rounded-full shadow-elegant ring-4 ring-card"
              style={{ background: hsl(base) }}
            />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Base hue</p>
              <p className="font-display text-3xl mt-1">{Math.round(base)}°</p>
              <input
                type="range"
                min={0}
                max={360}
                value={base}
                onChange={(e) => setBase(+e.target.value)}
                className="mt-4 w-full h-2 rounded-full appearance-none cursor-pointer accent-[--accent-sage]"
                style={{
                  background: "linear-gradient(to right, hsl(0,70%,55%), hsl(60,70%,55%), hsl(120,70%,55%), hsl(180,70%,55%), hsl(240,70%,55%), hsl(300,70%,55%), hsl(360,70%,55%))",
                }}
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* HARMONIES */}
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {harmonies.map((h, i) => {
          const hues = getHarmony(base, h.key);
          return (
            <Reveal key={h.key} delay={i * 0.05}>
              <div className="bg-card border border-border rounded-3xl p-7 hover:shadow-elegant transition-shadow h-full">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-display text-2xl">{h.key}</h3>
                  <span className="text-xs text-muted-foreground">{hues.length} colors</span>
                </div>
                <p className="text-sm text-muted-foreground mb-5">{h.desc}</p>

                {/* Diagram */}
                <div className="relative h-44 mb-5 grid place-items-center">
                  <div className="absolute inset-0 m-auto w-40 h-40 rounded-full border border-dashed border-border" />
                  {hues.map((hue, idx) => {
                    const angle = (idx / hues.length) * Math.PI * 2 - Math.PI / 2;
                    const r = 70;
                    const x = Math.cos(angle) * r;
                    const y = Math.sin(angle) * r;
                    return (
                      <motion.div
                        key={idx}
                        initial={false}
                        animate={{ x, y }}
                        transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        className="absolute w-12 h-12 rounded-full shadow-soft ring-2 ring-card"
                        style={{ background: hsl(hue, 65, harmonyLightness(h.key, idx, hues.length)) }}
                      />
                    );
                  })}
                </div>

                <div className="flex gap-1.5">
                  {hues.map((hue, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-12 rounded-lg"
                      style={{ background: hsl(hue, 65, harmonyLightness(h.key, idx, hues.length)) }}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* MOOD PALETTES */}
      <Reveal>
        <div className="mt-24 mb-10">
          <SectionLabel>Room moods</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl">Curated palettes, in context.</h2>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {moods.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.06}>
            <div className="bg-card rounded-3xl border border-border overflow-hidden hover:shadow-elegant transition-shadow group">
              {/* Mini room illustration */}
              <div className="relative h-44 overflow-hidden" style={{ background: m.colors[3] }}>
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${m.colors[1]}40 0%, transparent 50%)` }} />
                {/* floor */}
                <div className="absolute bottom-0 left-0 right-0 h-14" style={{ background: m.colors[2] }} />
                {/* sofa */}
                <div className="absolute bottom-12 left-6 right-12 h-12 rounded-t-xl" style={{ background: m.colors[0] }} />
                {/* lamp */}
                <div className="absolute bottom-12 right-4 w-1 h-20" style={{ background: m.colors[1] }} />
                <div className="absolute bottom-28 right-1.5 w-6 h-3 rounded-t-full" style={{ background: m.colors[1] }} />
                {/* sun */}
                <div className="absolute top-5 right-6 w-10 h-10 rounded-full opacity-60" style={{ background: m.colors[1] }} />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                <div className="flex gap-1 mt-4">
                  {m.colors.map((c) => (
                    <div key={c} className="flex-1 h-7 rounded" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </PageWrap>
  );
}
