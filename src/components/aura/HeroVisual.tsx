import type { ReactNode } from "react";
import { WaterRippleImage } from "@/components/aura/WaterRippleImage";

type FloatingCard = {
  id: string;
  title: string;
  pos: string;
  delay: string;
  content: ReactNode;
};

const CARDS: FloatingCard[] = [
  {
    id: "ia",
    title: "IA GOVERNADA",
    pos: "left-[4%] top-[14%] sm:left-[6%] sm:top-[16%]",
    delay: "0s",
    content: (
      <ul className="mt-2 space-y-1 text-[10px] leading-tight text-white/70 sm:text-[11px]">
        {["Políticas explícitas", "Auditoria contínua", "Human-in-the-loop"].map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <span className="text-gold">✓</span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "gov",
    title: "GOVERNANÇA",
    pos: "right-[4%] top-[10%] sm:right-[8%] sm:top-[12%]",
    delay: "0.6s",
    content: (
      <div className="mt-2 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-glow/40 bg-cyan-glow/10">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-cyan-glow"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 3 5 6v5c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" />
        </svg>
      </div>
    ),
  },
  {
    id: "arch",
    title: "ARQUITETURA",
    pos: "left-[6%] bottom-[22%] sm:left-[10%] sm:bottom-[24%]",
    delay: "1.2s",
    content: (
      <div className="mt-2 text-cyan-glow/90">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 3 21 8.5v7L12 21 3 15.5v-7L12 3Z" />
          <path d="M12 12 21 8.5M12 12v9M12 12 3 8.5" />
        </svg>
      </div>
    ),
  },
  {
    id: "chain",
    title: "BLOCKCHAIN",
    pos: "right-[5%] bottom-[20%] sm:right-[8%] sm:bottom-[22%]",
    delay: "1.8s",
    content: (
      <div className="mt-2 flex gap-1 text-cyan-glow/90">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3.5 w-3.5 border border-current"
            style={{ transform: `translateY(${i % 2 ? 4 : 0}px)` }}
          />
        ))}
      </div>
    ),
  },
];

export function HeroVisual() {
  return (
    <div className="hero-visual relative h-full min-h-[420px] w-full lg:min-h-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(56,140,255,0.22),transparent_65%)] blur-2xl"
      />

      <div className="absolute inset-0 z-10 overflow-hidden">
        <WaterRippleImage
          src="/imagens%20gerais/hero-aura-a.png"
          blueish={0.55}
          scale={7}
          illumination={0.14}
          surfaceDistortion={0.06}
          waterDistortion={0.025}
          className="h-full w-full"
        />
      </div>

      {CARDS.map((card) => (
        <div
          key={card.id}
          className={`hero-float absolute z-20 hidden w-[118px] rounded-xl border border-white/10 bg-[#0b1220]/70 p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md sm:w-[132px] sm:p-3 lg:block ${card.pos}`}
          style={{ animationDelay: card.delay }}
        >
          <p className="text-[9px] font-semibold tracking-[0.14em] text-white/90 sm:text-[10px]">
            {card.title}
          </p>
          {card.content}
        </div>
      ))}
    </div>
  );
}
