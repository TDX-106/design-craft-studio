import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Lightbulb, Sun, Star } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

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
  { key: "ambient", icon: Sun, label: "Ambient", desc: "The general fill — pendants, recessed, daylight. Sets the tone." },
  { key: "task", icon: Lightbulb, label: "Task", desc: "Focused light at the worktop — desk lamps, under-cabinet strips." },
  { key: "accent", icon: Star, label: "Accent", desc: "Drama and depth — picture lights, wall sconces, art uplighters." },
] as const;

function Lighting() {
  const [on, setOn] = useState({ ambient: true, task: true, accent: true });

  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>Lighting Guide</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-balance">Layer the room with light.</h1>
        <p className="text-muted-foreground max-w-xl">
          Three layers, one harmonious atmosphere. Toggle each to see how a room transforms.
        </p>
      </Reveal>

      {/* SIMULATOR */}
      <Reveal delay={0.1}>
        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* ROOM */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-soft-black grain shadow-elegant">
            {/* base dark */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1c1810]" />

            {/* Ambient */}
            <motion.div
              animate={{ opacity: on.ambient ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(255,220,160,0.45), transparent 70%)",
              }}
            />
            {/* Task */}
            <motion.div
              animate={{ opacity: on.task ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute"
              style={{
                left: "18%", bottom: "22%", width: "30%", height: "30%",
                background: "radial-gradient(ellipse, rgba(255,240,200,0.7), transparent 65%)",
                filter: "blur(2px)",
              }}
            />
            {/* Accent */}
            <motion.div
              animate={{ opacity: on.accent ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="absolute"
              style={{
                right: "10%", top: "20%", width: "26%", height: "55%",
                background: "linear-gradient(180deg, rgba(147,180,139,0.55), rgba(147,180,139,0) 80%)",
                filter: "blur(8px)",
              }}
            />

            {/* Furniture silhouettes */}
            <div className="absolute bottom-0 left-0 right-0 h-2/5">
              {/* floor */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              {/* sofa */}
              <div className="absolute bottom-6 left-[12%] w-[40%] h-24 rounded-t-2xl bg-[#2a2520]" />
              <div className="absolute bottom-24 left-[14%] w-[14%] h-10 rounded-xl bg-[#3a322a]" />
              <div className="absolute bottom-24 left-[32%] w-[14%] h-10 rounded-xl bg-[#3a322a]" />
              {/* desk lamp */}
              <div className="absolute bottom-6 left-[22%] w-1 h-20 bg-[#1a1a1a]" />
              <div className="absolute bottom-24 left-[20%] w-6 h-2 rounded-full bg-[#1a1a1a]" />
              {/* art frame */}
              <div className="absolute bottom-44 right-[14%] w-20 h-28 border-2 border-[#3a3128] rounded" />
              {/* pendant */}
              <div className="absolute -top-32 left-1/2 w-px h-16 bg-[#3a3128]" />
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-12 h-4 rounded-full bg-[#1a1a1a]" />
            </div>
          </div>

          {/* CONTROLS */}
          <div className="space-y-3">
            {layers.map((l) => {
              const active = on[l.key];
              return (
                <button
                  key={l.key}
                  onClick={() => setOn((s) => ({ ...s, [l.key]: !s[l.key] }))}
                  className={`w-full text-left bg-card rounded-2xl border p-5 flex items-start gap-4 transition-all ${
                    active ? "border-accent-pistachio shadow-soft" : "border-border opacity-70"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl grid place-items-center transition-colors ${
                    active ? "bg-accent-pistachio text-warm-white" : "bg-background-secondary text-muted-foreground"
                  }`}>
                    <l.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl">{l.label}</h3>
                      <span className={`relative w-11 h-6 rounded-full transition-colors ${active ? "bg-accent-sage" : "bg-border"}`}>
                        <motion.span
                          animate={{ x: active ? 22 : 2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className="absolute top-0.5 w-5 h-5 rounded-full bg-card shadow"
                        />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{l.desc}</p>
                  </div>
                </button>
              );
            })}
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
