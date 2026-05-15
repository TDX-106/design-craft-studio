import { Link } from "@tanstack/react-router";
import { Github, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-background-secondary/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-lg bg-gradient-accent grid place-items-center text-warm-white font-display text-lg">
              D
            </span>
            <span className="font-display text-xl">
              Design<span className="text-accent-sage">Craft</span>
            </span>
          </div>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            An interactive design reference platform — materials, color theory, lighting, space
            planning, and curated styles for the modern interior.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/materials" className="hover:text-foreground transition">Materials</Link></li>
            <li><Link to="/colors" className="hover:text-foreground transition">Colors</Link></li>
            <li><Link to="/lighting" className="hover:text-foreground transition">Lighting</Link></li>
            <li><Link to="/planner" className="hover:text-foreground transition">Planner</Link></li>
            <li><Link to="/styles" className="hover:text-foreground transition">Styles</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4">Connect</h4>
          <div className="flex gap-3">
            {[Github, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full glass grid place-items-center hover:shadow-glow hover:text-accent-sage transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()} DesignCraft. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
