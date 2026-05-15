import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/materials", label: "Materials" },
  { to: "/colors", label: "Colors" },
  { to: "/lighting", label: "Lighting" },
  { to: "/planner", label: "Planner" },
  { to: "/styles", label: "Styles" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-5 md:px-8`}>
        <div
          className={`glass rounded-2xl flex items-center justify-between px-5 md:px-7 h-14 md:h-16 transition-all ${
            scrolled ? "shadow-soft" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:rotate-90">
              <rect width="32" height="32" rx="10" fill="url(#paint0_linear)" />
              <path d="M10 10H16C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22H10V10Z" fill="white" fillOpacity="0.9" />
              <circle cx="16" cy="16" r="3" fill="#2c2825" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#93b48b" />
                  <stop offset="1" stopColor="#5d7857" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex items-center gap-3">
              <div className="w-px h-5 bg-gradient-to-b from-transparent via-border to-transparent" />
              <span className="font-display text-xl tracking-tight">
                Design<span className="text-accent-sage">Craft</span>
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-pistachio rounded-full"
                      style={{ boxShadow: "0 -2px 10px rgba(147, 180, 139, 0.4)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/planner"
            className="hidden lg:inline-flex items-center gap-2 bg-charcoal text-warm-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-soft-black transition-all hover:shadow-glow"
          >
            Try Planner
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent-light transition"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden glass mt-2 rounded-2xl p-3 shadow-elegant"
            >
              {links.map((l) => {
                const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                      active ? "bg-accent-light text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
