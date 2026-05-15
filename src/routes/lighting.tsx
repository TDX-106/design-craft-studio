import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Lightbulb, Sun, Star, Sunset, BookOpen } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";
import roomImg from "@/assets/room_render.png";

export const Route = createFileRoute("/lighting")({
  head: () => ({
    meta: [
      { title: "Lighting Guide — DesignCraft" },
      { name: "description", content: "Ambient, task and accent lighting — interactive simulator." },
    ],
  }),
  component: Lighting,
});

const layers = [
  { key: "ambient", icon: Sun, label: "Ambient", desc: "The general fill — pendants, recessed, daylight." },
  { key: "task", icon: Lightbulb, label: "Task", desc: "Focused light at the worktop — desk lamps, strips." },
  { key: "accent", icon: Star, label: "Accent", desc: "Drama and depth — picture lights, sconces." },
] as const;

type LayerKey = (typeof layers)[number]["key"];

const timeOfDay = [
  { key: "dawn", label: "Dawn", emoji: "🌅", tint: "rgba(255, 200, 170, 0.4)", base: 0.65 },
  { key: "noon", label: "Noon", emoji: "☀️", tint: "rgba(255, 240, 220, 0.7)", base: 1 },
  { key: "dusk", label: "Dusk", emoji: "🌇", tint: "rgba(255, 140, 80, 0.45)", base: 0.5 },
  { key: "night", label: "Night", emoji: "🌙", tint: "rgba(20, 30, 70, 0.6)", base: 0.15 },
] as const;

type ToD = (typeof timeOfDay)[number]["key"];

const presets = [
  { label: "Reading Nook", icon: "📖", state: { ambient: 20, task: 90, accent: 30, warmth: 80, tod: "night" as ToD } },
  { label: "Dinner Ambiance", icon: "🕯️", state: { ambient: 40, task: 10, accent: 85, warmth: 95, tod: "dusk" as ToD } },
  { label: "Working Late", icon: "💻", state: { ambient: 60, task: 100, accent: 20, warmth: 40, tod: "night" as ToD } },
  { label: "Bright Morning", icon: "🌤️", state: { ambient: 100, task: 0, accent: 0, warmth: 50, tod: "dawn" as ToD } },
];

function Lighting() {
  const [on, setOn] = useState<Record<LayerKey, boolean>>({ ambient: true, task: true, accent: true });
  const [intensity, setIntensity] = useState<Record<LayerKey, number>>({ ambient: 70, task: 80, accent: 65 });
  const [warmth, setWarmth] = useState(60); // 0 cool → 100 warm
  const [tod, setTod] = useState<ToD>("dusk");

  const applyPreset = (preset: typeof presets[0]) => {
    setOn({ ambient: preset.state.ambient > 0, task: preset.state.task > 0, accent: preset.state.accent > 0 });
    setIntensity({ ambient: preset.state.ambient, task: preset.state.task, accent: preset.state.accent });
    setWarmth(preset.state.warmth);
    setTod(preset.state.tod);
  };

  const tone = useMemo(() => {
    const w = warmth / 100;
    const r = Math.round(210 + 45 * w);
    const g = Math.round(230 - 20 * w);
    const b = Math.round(255 - 110 * w);
    return `${r}, ${g}, ${b}`;
  }, [warmth]);

  const todObj = timeOfDay.find((t) => t.key === tod)!;

  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>Lighting Guide</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-balance">Sculpt with light.</h1>
        <p className="text-muted-foreground max-w-xl">
          Three layers, four times of day, infinite warmth. Toggle and tune each fixture using realistic physical light beams and shadow casting.
        </p>
      </Reveal>

      {/* SCENE PRESETS */}
      <Reveal delay={0.08}>
        <div className="mt-8 flex flex-wrap gap-3">
          <p className="w-full text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1 flex items-center gap-2">
            <BookOpen size={12} /> Scene Presets
          </p>
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border border-white/10 bg-gradient-dark text-warm-white hover:border-accent-pistachio transition-all shadow-elegant hover:shadow-glow"
            >
              <span>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* SIMULATOR */}
      <Reveal delay={0.15}>
        <div className="mt-8 grid lg:grid-cols-[1.5fr_1fr] gap-6">
          {/* ROOM */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-black shadow-elegant">
            
            {/* base photo, physically dimmed */}
            <motion.img
              src={roomImg}
              alt="3D Living room"
              loading="lazy"
              width={1920}
              height={1080}
              animate={{ 
                filter: `brightness(${0.15 + todObj.base * 0.45}) saturate(${0.7 + (warmth/100)*0.3}) hue-rotate(${(warmth/100)*15}deg)`,
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Window Daylight Volume */}
            <motion.div
              key={tod}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 mix-blend-screen pointer-events-none"
              style={{
                background: `linear-gradient(105deg, ${todObj.tint} 0%, transparent 60%)`,
              }}
            />

            {/* LIGHT BEAMS (Clip Path Masks) */}

            {/* AMBIENT — Top Down Area Light */}
            <motion.div
              animate={{ opacity: on.ambient ? intensity.ambient / 100 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 mix-blend-screen pointer-events-none"
              style={{
                background: `linear-gradient(180deg, rgba(${tone}, 0.6) 0%, rgba(${tone}, 0.1) 60%, transparent 100%)`,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)",
                filter: "blur(40px)"
              }}
            />

            {/* TASK — Focused Cone on Coffee Table */}
            <motion.div
              animate={{ opacity: on.task ? intensity.task / 100 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 mix-blend-color-dodge pointer-events-none"
            >
              <div 
                className="absolute w-full h-full"
                style={{
                  background: `rgba(${tone}, 0.8)`,
                  clipPath: "polygon(45% 20%, 55% 20%, 80% 80%, 20% 80%)",
                  filter: "blur(25px)"
                }}
              />
              {/* Hotspot on table */}
              <div 
                className="absolute w-full h-full"
                style={{
                  background: `radial-gradient(ellipse 20% 10% at 50% 75%, rgba(${tone}, 0.9), transparent 100%)`,
                  filter: "blur(10px)"
                }}
              />
            </motion.div>

            {/* ACCENT — Wall Wash / Sconces */}
            <motion.div
              animate={{ opacity: on.accent ? intensity.accent / 100 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 mix-blend-screen pointer-events-none"
            >
              {/* Left Wall Sconce */}
              <div 
                className="absolute w-full h-full"
                style={{
                  background: `rgba(${tone}, 0.7)`,
                  clipPath: "polygon(5% 30%, 15% 30%, 25% 90%, 0% 90%)",
                  filter: "blur(30px)"
                }}
              />
              {/* Right Wall Picture Light */}
              <div 
                className="absolute w-full h-full"
                style={{
                  background: `rgba(${tone}, 0.6)`,
                  clipPath: "polygon(80% 25%, 95% 25%, 95% 70%, 80% 70%)",
                  filter: "blur(20px)"
                }}
              />
            </motion.div>

            {/* SHADOW CASTING */}
            <motion.div
              animate={{ opacity: (100 - (on.ambient ? intensity.ambient : 0)) / 100 * 0.85 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 150% 150% at 80% 20%, transparent 40%, rgba(0,0,0,0.85) 100%)",
                mixBlendMode: "multiply"
              }}
            />

            {/* STATUS HUD */}
            <div className="absolute top-4 right-4 glass-dark rounded-full px-3 py-1.5 flex items-center gap-2 text-[10px] uppercase tracking-widest text-warm-white border border-white/10">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `rgb(${tone})`, boxShadow: `0 0 8px rgb(${tone})` }} />
              {todObj.label} · {Math.round((intensity.ambient + intensity.task + intensity.accent) / 3)}% avg
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-col gap-5">
            {/* TIME OF DAY */}
            <div className="bg-gradient-dark p-6 rounded-3xl border border-white/5 shadow-elegant">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-pistachio mb-4 flex items-center gap-2">
                <Sun size={12} /> Time of Day
              </p>
              <div className="grid grid-cols-4 gap-2">
                {timeOfDay.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTod(t.key)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all border ${
                      tod === t.key
                        ? "bg-accent-pistachio text-charcoal border-accent-pistachio"
                        : "bg-white/5 text-warm-white border-white/10 hover:border-accent-pistachio/50"
                    }`}
                  >
                    <span className="text-lg mb-1">{t.emoji}</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider">{t.label}</span>
                  </button>
                ))}
              </div>

              {/* WARMTH SLIDER */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-warm-white">Color Temp</label>
                  <span className="text-xs font-mono text-muted-foreground">{warmth}K</span>
                </div>
                <div className="relative h-2 rounded-full bg-gradient-to-r from-[#8ca8d8] via-[#f5f0eb] to-[#d88c44]">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={warmth}
                    onChange={(e) => setWarmth(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {/* Custom thumb tracker */}
                  <motion.div
                    className="absolute top-1/2 -mt-2.5 w-5 h-5 rounded-full bg-white shadow-md border-2 border-charcoal pointer-events-none"
                    style={{ left: `calc(${warmth}% - 10px)` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase tracking-widest">
                  <span>Cool</span>
                  <span>Warm</span>
                </div>
              </div>
            </div>

            {/* LAYERS */}
            <div className="flex-1 bg-gradient-dark p-6 rounded-3xl border border-white/5 shadow-elegant flex flex-col gap-6">
              {layers.map((l) => (
                <div key={l.key} className="group relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg grid place-items-center transition-colors ${on[l.key] ? "bg-accent-pistachio text-charcoal" : "bg-white/10 text-warm-white/50"}`}>
                        <l.icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-warm-white">{l.label}</p>
                        <p className="text-[10px] text-muted-foreground">{l.desc}</p>
                      </div>
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={() => setOn((prev) => ({ ...prev, [l.key]: !prev[l.key] }))}
                      className={`relative w-10 h-5 rounded-full transition-colors ${on[l.key] ? "bg-accent-pistachio" : "bg-white/20"}`}
                    >
                      <motion.div
                        className="absolute top-0.5 left-0.5 w-4 h-4 bg-charcoal rounded-full"
                        animate={{ x: on[l.key] ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  {/* Slider */}
                  <div className={`transition-opacity ${on[l.key] ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={intensity[l.key]}
                      onChange={(e) => setIntensity((prev) => ({ ...prev, [l.key]: Number(e.target.value) }))}
                      className="w-full accent-accent-pistachio h-1.5 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent-pistachio [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(147,180,139,0.8)] cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </PageWrap>
  );
}
