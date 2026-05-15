import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Palette, Layers, Lightbulb, Layout, Sparkles } from "lucide-react";
import { PageWrap, Reveal, SectionLabel } from "@/components/PageWrap";
import heroImg from "@/assets/hero-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DesignCraft — Design with Intention" },
      { name: "description", content: "A premium interactive design studio reference: materials, color, lighting, planner, and styles." },
      { property: "og:image", content: "/assets/hero-interior.jpg" },
    ],
  }),
  component: Home,
});

const features = [
  { to: "/materials", icon: Layers, label: "Materials Library", desc: "Wood, stone, metal, fabric & more — explore tactile palettes." },
  { to: "/colors", icon: Palette, label: "Color Theory Studio", desc: "Visualize harmonies and curated room moods." },
  { to: "/lighting", icon: Lightbulb, label: "Lighting Guide", desc: "Ambient, task & accent — simulate your room." },
  { to: "/planner", icon: Layout, label: "Space Planner", desc: "Drag, drop, and arrange furniture on a smart grid." },
  { to: "/styles", icon: Sparkles, label: "Style Explorer", desc: "Japandi, Minimalist, Industrial — find your aesthetic." },
] as const;

function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.85]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-charcoal"
      >
        {/* parallax photo with continuous breathing animation */}
        <motion.div
          aria-hidden
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 will-change-transform"
        >
          <motion.img
            src={heroImg}
            alt=""
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        {/* gradient overlays */}
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-accent-pistachio/15" />
        <div aria-hidden className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-accent-pistachio/20 blur-3xl animate-float" />
        <div aria-hidden className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent-pistachio/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <motion.div style={{ y: textY }} className="relative z-10 max-w-5xl mx-auto px-6 text-center text-warm-white">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] text-accent-pistachio"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-pistachio animate-pulse" />
            Interior design reference
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[14vw] md:text-[8.5rem] leading-[0.95] mt-6 text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            Design with
            <span className="block italic text-accent-pistachio">Intention.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-8 text-lg md:text-xl text-warm-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            A curated reference for materials, color, lighting and space — built for designers who
            shape rooms with quiet confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/materials"
              className="group inline-flex items-center gap-2 bg-warm-white text-charcoal px-7 py-4 rounded-full font-medium hover:shadow-glow transition-all"
            >
              Explore the studio
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 glass-dark text-warm-white px-7 py-4 rounded-full font-medium hover:bg-white/10 transition"
            >
              Try the planner
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-warm-white/70"
        >
          Scroll
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="bg-charcoal text-warm-white/60 border-y border-warm-white/10 overflow-hidden">
        <motion.div
          className="flex gap-16 py-6 whitespace-nowrap font-display italic text-2xl md:text-3xl"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Materials", "·", "Color", "·", "Lighting", "·", "Space", "·", "Style", "·", "Atmosphere", "·"].map((w, i) => (
              <span key={`${k}-${i}`} className={w === "·" ? "text-accent-pistachio" : ""}>{w}</span>
            ))
          )}
        </motion.div>
      </section>

      {/* FEATURES */}
      <PageWrap>
        <Reveal>
          <SectionLabel>The toolkit</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <h2 className="font-display text-5xl md:text-6xl max-w-2xl text-balance">
              A studio for the way designers actually work.
            </h2>
            <p className="text-muted-foreground max-w-md">
              Five focused tools, one calm interface. Every surface, color and lumen at your
              fingertips.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.to} delay={i * 0.06}>
              <Link
                to={f.to}
                className="group relative block bg-gradient-dark text-warm-white grain rounded-3xl p-7 border border-white/5 hover:border-accent-pistachio transition-all hover:-translate-y-1 hover:shadow-glow overflow-hidden h-full"
              >
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-accent-pistachio/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/5 grid place-items-center text-accent-sage mb-6 group-hover:bg-accent-pistachio group-hover:text-warm-white transition-colors">
                    <f.icon size={20} />
                  </div>
                  <h3 className="font-display text-2xl mb-2">{f.label}</h3>
                  <p className="text-sm text-warm-white/60 leading-relaxed">{f.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-1 text-sm text-accent-pistachio opacity-0 group-hover:opacity-100 transition">
                    Open <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal delay={features.length * 0.06}>
            <div className="relative h-full rounded-3xl bg-gradient-dark text-warm-white p-8 overflow-hidden grain">
              <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-accent-pistachio/30 blur-3xl" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.2em] text-accent-pistachio">About</p>
                <h3 className="font-display text-3xl mt-3 leading-tight">A frontend showcase, made to be lived in.</h3>
                <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm border-b border-accent-pistachio pb-1">
                  Read the project notes <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* QUOTE BAND */}
        <Reveal>
          <div className="mt-32 text-center">
            <p className="font-display italic text-3xl md:text-5xl text-balance leading-tight max-w-4xl mx-auto">
              "The details are not the details. <span className="text-accent-sage">They make the design.</span>"
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-muted-foreground">— Charles Eames</p>
          </div>
        </Reveal>
      </PageWrap>
    </>
  );
}
