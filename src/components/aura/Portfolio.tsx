import { useState } from "react";

type PortfolioProject = {
  id: string;
  name: string;
  sector: string;
  description: string;
  image: string;
};

const PROJECTS: PortfolioProject[] = [
  {
    id: "agentes-credito",
    name: "Agentes de crédito",
    sector: "Fintech",
    description:
      "Automação governada para análise e decisão, com trilha auditável e intervenção humana nos pontos críticos.",
    image: "/imagens%20gerais/portfolio-agentes-credito.png",
  },
  {
    id: "auditoria-ia",
    name: "Auditoria de IA",
    sector: "Governança",
    description:
      "Proveniência, políticas e rastreabilidade aplicadas a cada decisão automatizada do sistema.",
    image: "/imagens%20gerais/portfolio-auditoria-ia.png",
  },
  {
    id: "tokenizacao",
    name: "Tokenização",
    sector: "Blockchain",
    description:
      "Camada de verificabilidade quando o negócio precisa provar origem, estado ou transferência.",
    image: "/imagens%20gerais/portfolio-tokenizacao.png",
  },
  {
    id: "orquestracao",
    name: "Orquestração",
    sector: "Arquitetura",
    description:
      "Sistemas proprietários integrados à operação, com controles de fluxo e observabilidade contínua.",
    image: "/imagens%20gerais/portfolio-orquestracao.png",
  },
  {
    id: "conhecimento",
    name: "Base de conhecimento",
    sector: "IA aplicada",
    description:
      "Contexto versionado e rastreável para alimentar agentes e equipes com fontes confiáveis.",
    image: "/imagens%20gerais/portfolio-conhecimento.png",
  },
];

export function Portfolio() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  return (
    <section id="portfolio" className="relative overflow-hidden bg-void py-28 text-white">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold">Portfólio</p>
          <h2 className="mt-8 text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">
            Projetos que mostram a Aura Labs em ação.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            Uma tese por vez: selecione um projeto e veja o contexto visual correspondente.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">
          <nav aria-label="Projetos do portfólio" className="border-t border-white/10">
            {PROJECTS.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`group flex w-full items-start gap-5 border-b border-white/10 py-5 text-left transition-colors ${
                    isActive ? "text-white" : "text-white/45 hover:text-white/80"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={`eyebrow mt-1 shrink-0 ${isActive ? "text-gold" : "text-white/30"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                      {item.name}
                    </span>
                    <span
                      className={`mt-2 block text-sm leading-relaxed transition-colors ${
                        isActive ? "text-white/55" : "text-white/30"
                      }`}
                    >
                      {item.sector}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-2 h-px w-8 shrink-0 transition-all duration-300 ${
                      isActive ? "bg-gold" : "bg-transparent group-hover:bg-white/20"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex flex-col">
            <div className="relative aspect-[16/10] overflow-hidden bg-navy sm:aspect-[16/9] lg:aspect-[16/10] lg:max-h-[340px]">
              {PROJECTS.map((item, index) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent"
              />
            </div>

            <div className="border border-t-0 border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="eyebrow text-gold">{project.sector}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                {project.name}
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
                {project.description}
              </p>
              <a
                href="#contato"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-white transition-colors hover:text-gold"
              >
                Conversar sobre um projeto
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
