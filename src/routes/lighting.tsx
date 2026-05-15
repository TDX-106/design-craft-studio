import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Lightbulb, Sun, Star, Sunset } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";
import roomImg from "@/assets/lighting-room.jpg";

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
  { key: "dawn", label: "Dawn", tint: "rgba(255, 200, 170, 0.25)", base: 0.55 },
  { key: "noon", label: "Noon", tint: "rgba(255, 240, 220, 0.55)", base: 1 },
  { key: "dusk", label: "Dusk", tint: "rgba(255, 150, 100, 0.35)", base: 0.4 },
  { key: "night", label: "Night", tint: "rgba(40, 50, 90, 0.55)", base: 0.12 },
] as const;

type ToD = (typeof timeOfDay)[number]["key"];

function Lighting() {
  const [on, setOn] = useState<Record<LayerKey, boolean>>({ ambient: true, task: true, accent: true });
  const [intensity, setIntensity] = useState<Record<LayerKey, number>>({ ambient: 70, task: 80, accent: 65 });
  const [warmth, setWarmth] = useState(60); // 0 cool → 100 warm
  const [tod, setTod] = useState<ToD>("dusk");

  const tone = useMemo(() => {
    // map warmth to RGB tint
    const w = warmth / 100;
    const r = Math.round(220 + 35 * w);
    const g = Math.round(210 + 20 * w);
    const b = Math.round(255 - 95 * w);
    return `${r}, ${g}, ${b}`;
  }, [warmth]);

  const todObj = timeOfDay.find((t) => t.key === tod)!;
  const baseDim = todObj.base;

  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>Lighting Guide</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-balance">Layer the room with light.</h1>
        <p className="text-muted-foreground max-w-xl">
          Three layers, four times of day, infinite warmth. Toggle and tune each fixture and watch
          the room breathe.
        </p>
      </Reveal>

      {/* SIMULATOR */}
      <Reveal delay={0.1}>
        <div className="mt-12 grid lg:grid-cols-[1.5fr_1fr] gap-6">
          {/* ROOM */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-soft-black shadow-elegant">
            {/* base photo, dimmed by time of day */}
            <motion.img
              src={roomImg}
              alt="Living room lighting simulator"
              loading="lazy"
              width={1920}
              height={1080}
              animate={{ filter: `brightness(${0.25 + baseDim * 0.45}) saturate(0.85)` }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* time-of-day color wash through window */}
            <motion.div
              key={tod}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
              style={{
                background: `linear-gradient(115deg, ${todObj.tint} 0%, transparent 55%)`,
                mixBlendMode: "screen",
              }}
            />

            {/* AMBIENT — pendant glow from upper-center */}
            <motion.div
              animate={{ opacity: on.ambient ? intensity.ambient / 100 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 65% 55% at 48% 30%, rgba(${tone}, 0.85), transparent 70%)`,
                mixBlendMode: "screen",
              }}
            />
            {/* pendant bulb hot-spot */}
            <motion.div
              animate={{ opacity: on.ambient ? Math.min(1, intensity.ambient / 70) : 0, scale: on.ambient ? 1 : 0.6 }}
              className="absolute pointer-events-none"
              style={{
                left: "44%", top: "22%", width: "12%", height: "10%",
                background: `radial-gradient(ellipse, rgba(${tone}, 1) 0%, rgba(${tone}, 0) 70%)`,
                filter: "blur(4px)",
                mixBlendMode: "screen",
              }}
            />

            {/* TASK — floor lamp pool */}
            <motion.div
              animate={{ opacity: on.task ? intensity.task / 100 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute pointer-events-none"
              style={{
                left: "32%", top: "45%", width: "26%", height: "30%",
                background: `radial-gradient(ellipse, rgba(${tone}, 0.95) 0%, rgba(${tone}, 0) 70%)`,
                filter: "blur(6px)",
                mixBlendMode: "screen",
              }}
            />

            {/* ACCENT — wall sconce / picture light */}
            <motion.div
              animate={{ opacity: on.accent ? intensity.accent / 100 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute pointer-events-none"
              style={{
                right: "8%", top: "18%", width: "30%", height: "32%",
                background: `radial-gradient(ellipse 60% 100% at 50% 0%, rgba(${tone}, 0.7) 0%, rgba(${tone}, 0) 75%)`,
                mixBlendMode: "screen",
              }}
            />

            {/* subtle vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />

            {/* status pill */}
            <div className="absolute bottom-4 left-4 glass-dark text-warm-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              {todObj.label} · {warmth < 35 ? "Cool" : warmth < 70 ? "Neutral" : "Warm"}
            </div>
          </div>

          {/* CONTROLS */}
          <div className="space-y-4">
            {/* Time of day */}
            <div className="bg-card rounded-2xl border border-border p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sunset size={14} className="text-accent-sage" />
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Time of day</p>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {timeOfDay.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTod(t.key)}
                    className={`text-xs py-2 rounded-xl transition border ${
                      tod === t.key
                        ? "bg-charcoal text-warm-white border-charcoal"
                        : "bg-background-secondary border-transparent hover:border-accent-pistachio"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layers */}
            {layers.map((l) => {
              const active = on[l.key];
              return (
                <div
                  key={l.key}
                  className={`bg-card rounded-2xl border p-4 transition-all ${
                    active ? "border-accent-pistachio shadow-soft" : "border-border opacity-70"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => setOn((s) => ({ ...s, [l.key]: !s[l.key] }))}
                      className={`w-10 h-10 rounded-xl grid place-items-center transition-colors shrink-0 ${
                        active ? "bg-accent-pistachio text-warm-white" : "bg-background-secondary text-muted-foreground"
                      }`}
                    >
                      <l.icon size={16} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg">{l.label}</h3>
                        <button
                          onClick={() => setOn((s) => ({ ...s, [l.key]: !s[l.key] }))}
                          className={`relative w-10 h-5 rounded-full transition-colors ${active ? "bg-accent-sage" : "bg-border"}`}
                          aria-label={`Toggle ${l.label}`}
                        >
                          <motion.span
                            animate={{ x: active ? 20 : 2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-card shadow"
                          />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{l.desc}</p>
                    </div>
                  </div>
                  {active && (
                    <div className="mt-3 pl-13">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
                        <span>Intensity</span>
                        <span>{intensity[l.key]}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={intensity[l.key]}
                        onChange={(e) => setIntensity((s) => ({ ...s, [l.key]: Number(e.target.value) }))}
                        className="w-full accent-accent-sage"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Warmth */}
            <div className="bg-card rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                <span>Color temperature</span>
                <span>{2700 + Math.round((1 - warmth / 100) * 2300)}K</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={warmth}
                onChange={(e) => setWarmth(Number(e.target.value))}
                className="w-full"
                style={{
                  accentColor: `rgb(${tone})`,
                }}
              />
              <div className="mt-1 h-2 rounded-full" style={{ background: "linear-gradient(90deg,#cfe2ff 0%,#fff7e0 50%,#ffd29a 100%)" }} />
              <div className="flex justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
                <span>Cool</span><span>Warm</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* CHEAT SHEET */}
      <Reveal>
        <div className="mt-24 mb-8">
          <SectionLabel>Cheat sheet</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl">Color temperature, simply.</h2>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { k: "2700K — Warm", c: "#f5d597", t: "Living, bedroom — relax." },
          { k: "3500K — Neutral", c: "#fef3d4", t: "Kitchens, bathrooms — clarity." },
          { k: "5000K — Cool", c: "#e8eef5", t: "Workspaces, garages — focus." },
        ].map((x, i) => (
          <Reveal key={x.k} delay={i * 0.07}>
            <div className="rounded-3xl p-6 border border-border bg-card">
              <div className="h-32 rounded-2xl mb-4" style={{ background: `radial-gradient(ellipse, ${x.c} 0%, #1a1a1a 80%)` }} />
              <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">{x.k}</p>
              <p className="font-display text-xl mt-1">{x.t}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </PageWrap>
  );
}
