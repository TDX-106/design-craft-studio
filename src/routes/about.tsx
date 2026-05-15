import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DesignCraft" },
      { name: "description", content: "Project overview, tech stack, UX goals, and roadmap for DesignCraft." },
    ],
  }),
  component: About,
});

const tech = ["React 19", "TanStack Router", "Tailwind CSS", "Framer Motion", "TypeScript", "Vite"];
const goals = [
  "Calm, editorial visual language",
  "Minimum cognitive load on every screen",
  "Smooth, intentional motion — never decorative",
  "Mobile-first responsive layouts",
  "Accessible color contrast and focus states",
];
const features = [
  "Sticky glassmorphism navbar with active highlighting",
  "Filterable materials library with hover states",
  "Interactive color harmony generator",
  "Layered lighting simulator with toggles",
  "Drag-and-drop space planner with snap-to-grid",
  "Animated style explorer with detail modal",
  "Custom cursor glow & scroll progress bar",
  "Page transitions and scroll-reveal animations",
];
const future = [
  "Save & share planner layouts",
  "Export palettes to Figma tokens",
  "Material PBR previews via WebGL",
  "Designer accounts and moodboards",
];

function About() {
  return (
    <PageWrap>
      <Reveal>
        <SectionLabel>About the project</SectionLabel>
        <h1 className="font-display text-5xl md:text-7xl mb-6 text-balance">
          A frontend study in calm.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          DesignCraft is a multi-page React application built as a final-year showcase — exploring
          how a design reference platform can feel less like a tool and more like a studio.
        </p>
      </Reveal>

      <div className="mt-20 grid md:grid-cols-2 gap-6">
        <Reveal>
          <div className="bg-card border border-border rounded-3xl p-8 h-full">
            <h2 className="font-display text-3xl mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              The platform combines a portfolio aesthetic with five interactive design tools:
              materials, color theory, lighting, planning, and style exploration. Every page is
              designed with the same care as a printed editorial — typography, rhythm, and
              restraint.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-gradient-dark text-warm-white rounded-3xl p-8 grain relative overflow-hidden h-full">
            <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-accent-pistachio/30 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl mb-5">Tech stack</h2>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span key={t} className="text-xs uppercase tracking-[0.2em] glass-dark px-3 py-1.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-card border border-border rounded-3xl p-8">
            <h2 className="font-display text-3xl mb-5">UI / UX goals</h2>
            <ul className="space-y-3">
              {goals.map((g) => (
                <li key={g} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-accent-light text-accent-sage grid place-items-center flex-shrink-0">
                    <Check size={12} />
                  </span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-card border border-border rounded-3xl p-8">
            <h2 className="font-display text-3xl mb-5">Features implemented</h2>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-accent-light text-accent-sage grid place-items-center flex-shrink-0">
                    <Check size={12} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-20 bg-accent-light/60 border border-border rounded-3xl p-10 text-center">
          <SectionLabel>Future scope</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl mb-8 text-balance">Where it could go next.</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {future.map((f) => (
              <span key={f} className="bg-card border border-border px-5 py-3 rounded-full text-sm">{f}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </PageWrap>
  );
}
