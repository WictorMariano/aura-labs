import { useState, type ReactNode } from "react";
import {
  Bot,
  ShieldCheck,
  Blocks,
  Layers,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

type PortfolioProject = {
  id: string;
  name: string;
  badge: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

const PROJECTS: PortfolioProject[] = [
  {
    id: "agentes-credito",
    name: "Agentes de crédito",
    badge: "Caso ativo",
    description: "Automação governada para análise e decisão com trilha auditável.",
    image: "/imagens%20gerais/servico-agentes.png",
    icon: Bot,
  },
  {
    id: "auditoria-ia",
    name: "Auditoria de IA",
    badge: "Governança",
    description: "Proveniência, políticas e intervenção humana em cada decisão.",
    image: "/imagens%20gerais/servico-ia.png",
    icon: ShieldCheck,
  },
  {
    id: "tokenizacao",
    name: "Tokenização",
    badge: "Blockchain",
    description: "Ativos digitais verificáveis quando a prova importa de verdade.",
    image: "/imagens%20gerais/servico-blockchain.png",
    icon: Blocks,
  },
  {
    id: "orquestracao",
    name: "Orquestração",
    badge: "Arquitetura",
    description: "Sistemas proprietários integrados à operação do negócio.",
    image: "/imagens%20gerais/servico-arquitetura.png",
    icon: Layers,
  },
  {
    id: "conhecimento",
    name: "Base de conhecimento",
    badge: "IA aplicada",
    description: "Contexto versionado e rastreável para agentes e equipes.",
    image: "/imagens%20gerais/hero-aura-a.png",
    icon: BrainCircuit,
  },
];

export function Portfolio() {
  const [active, setActive] = useState(0);
  const total = PROJECTS.length;

  const prevIndex = (active - 1 + total) % total;
  const nextIndex = (active + 1) % total;

  return (
    <section id="portfolio" className="relative overflow-hidden bg-void py-28 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(74,163,255,0.14),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(212,175,80,0.08),transparent_45%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold">Portfólio</p>
          <h2 className="mt-8 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Projetos que mostram a Aura Labs em ação.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/60">
            Selecione um projeto à esquerda e veja o contexto visual à direita.
          </p>
        </div>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-[minmax(240px,0.9fr)_1.4fr] lg:gap-8">
          {/* Lista esquerda */}
          <div className="flex flex-col justify-center bg-gold p-4 sm:p-5">
            <nav className="flex flex-col gap-2" aria-label="Projetos do portfólio">
              {PROJECTS.map((project, index) => {
                const Icon = project.icon;
                const isActive = index === active;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`flex items-center gap-3 px-4 py-3 text-left text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                      isActive
                        ? "bg-white text-primary-foreground shadow-md"
                        : "bg-transparent text-primary-foreground/75 ring-1 ring-primary-foreground/30 hover:bg-white/15 hover:text-primary-foreground"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                    <span className="leading-tight">{project.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Slide direita */}
          <div className="relative flex min-h-[420px] items-center justify-center sm:min-h-[480px]">
            <SlideCard
              project={PROJECTS[prevIndex]}
              index={prevIndex}
              variant="prev"
              onSelect={() => setActive(prevIndex)}
            />
            <SlideCard
              project={PROJECTS[active]}
              index={active}
              variant="active"
            />
            <SlideCard
              project={PROJECTS[nextIndex]}
              index={nextIndex}
              variant="next"
              onSelect={() => setActive(nextIndex)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideCard({
  project,
  index,
  variant,
  onSelect,
}: {
  project: PortfolioProject;
  index: number;
  variant: "prev" | "active" | "next";
  onSelect?: () => void;
}) {
  const base =
    "absolute overflow-hidden border border-white/10 transition-all duration-500 ease-out";

  const variants: Record<typeof variant, string> = {
    prev: "z-10 h-[78%] w-[58%] -translate-x-[42%] scale-90 opacity-45 cursor-pointer hover:opacity-60",
    active: "z-20 h-[92%] w-[72%] translate-x-0 scale-100 opacity-100 shadow-[0_30px_80px_rgba(0,0,0,0.45)]",
    next: "z-10 h-[78%] w-[58%] translate-x-[42%] scale-90 opacity-45 cursor-pointer hover:opacity-60",
  };

  const content: ReactNode =
    variant === "active" ? (
      <>
        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 bg-black/45 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 bg-emerald-400" />
          {project.badge}
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 sm:p-7">
          <p className="inline-flex bg-black/50 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur-sm">
            {index + 1} · {project.name.toUpperCase()}
          </p>
          <p className="mt-3 max-w-md text-lg leading-snug text-white sm:text-xl">
            {project.description}
          </p>
        </div>
      </>
    ) : null;

  const Wrapper = onSelect ? "button" : "article";

  return (
    <Wrapper
      {...(onSelect ? { type: "button" as const, onClick: onSelect } : {})}
      className={`${base} ${variants[variant]}`}
      aria-hidden={variant !== "active"}
    >
      <img
        src={project.image}
        alt=""
        className="h-full w-full object-cover"
      />
      {variant !== "active" ? (
        <div className="absolute inset-0 bg-void/55" aria-hidden="true" />
      ) : null}
      {content}
    </Wrapper>
  );
}
