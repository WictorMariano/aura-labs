import { useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BrainCircuit,
  Bot,
  Blocks,
  Layers,
  Scale,
  FileSearch,
  ShieldAlert,
  ChartNoAxesCombined,
  Hand,
  Lock,
  Building2,
  Landmark,
  Lightbulb,
  Rocket,
  Cog,
} from "lucide-react";
import { Logo } from "@/components/aura/Logo";
import { ContactForm } from "@/components/aura/ContactForm";
import { HeroVisual } from "@/components/aura/HeroVisual";
import { SobreNos } from "@/components/aura/SobreNos";
import { Portfolio } from "@/components/aura/Portfolio";
import { Abordagem } from "@/components/aura/Abordagem";
import { ColorChangeCards } from "@/components/ui/color-change-card";
import { ScrollingFeatureShowcase } from "@/components/ui/interactive-scrolling-story-component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: DEFAULT_TITLE },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { property: "og:title", content: DEFAULT_TITLE },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: absoluteUrl("/og-image.png") },
      { name: "twitter:title", content: DEFAULT_TITLE },
      { name: "twitter:description", content: DEFAULT_DESCRIPTION },
      { name: "twitter:image", content: absoluteUrl("/og-image.png") },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteJsonLd()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: SITE_NAME,
          description: DEFAULT_DESCRIPTION,
          url: SITE_URL,
          image: absoluteUrl("/og-image.png"),
          areaServed: "BR",
          serviceType: [
            "Inteligência artificial aplicada",
            "Agentes de IA governados",
            "Blockchain e ativos digitais",
            "Arquitetura de software sob medida",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#sobre", label: "Quem somos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#equipe", label: "Equipe" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#governanca", label: "Governança" },
  { href: "#abordagem", label: "Abordagem" },
  { href: "#cases", label: "Cases" },
  { href: "#contato", label: "Contato" },
];

const SERVICOS: {
  t: string;
  d: string;
  tag: string;
  chips?: string[];
  icon: ReactNode;
  image: string;
  exemploHref: string;
}[] = [
  {
    t: "Inteligência artificial aplicada",
    d: "IA projetada a partir do resultado de negócio esperado, não da tecnologia disponível. Cada sistema nasce de um desafio concreto da organização.",
    tag: "IA",
    chips: ["LLMs personalizadas"],
    icon: <BrainCircuit className="h-6 w-6" strokeWidth={1.4} />,
    image: "/imagens%20gerais/servico-ia-mockup.png",
    exemploHref: "#contato",
  },
  {
    t: "Agentes de IA governados",
    d: "Agentes que operam sob políticas, permissões e intervenção humana explícitas, com trilha de auditoria e métricas de resultado desde o desenho.",
    tag: "Agentes",
    chips: ["Agentes autônomos"],
    icon: <Bot className="h-6 w-6" strokeWidth={1.4} />,
    image: "/imagens%20gerais/servico-agentes-mockup.png",
    exemploHref: "#contato",
  },
  {
    t: "Blockchain e ativos digitais",
    d: "Aplicado quando a verificabilidade é requisito real do negócio, nunca como camada decorativa sobre um problema que não a exige.",
    tag: "Blockchain",
    chips: ["Integração Web3"],
    icon: <Blocks className="h-6 w-6" strokeWidth={1.4} />,
    image: "/imagens%20gerais/servico-blockchain-mockup.png",
    exemploHref: "#contato",
  },
  {
    t: "Arquitetura sob medida",
    d: "Engenharia proprietária para organizações com necessidades que produtos de prateleira não atendem, integrada à realidade de cada operação.",
    tag: "Software",
    chips: ["Softwares + IA sob demanda"],
    icon: <Layers className="h-6 w-6" strokeWidth={1.4} />,
    image: "/imagens%20gerais/servico-arquitetura-mockup.png",
    exemploHref: "#contato",
  },
];

const TIME = [
  {
    name: "Bruno Velloso",
    role: "Fundador & Estratégia",
    bio: "Conduz a visão de negócio e a tradução de desafios complexos em sistemas digitais sob governança.",
    initials: "BV",
    photo: "/team/bruno-velloso.png",
  },
  {
    name: "Prof. Diego Carvalho",
    role: "SMC Insights",
    bio: "Conecta pesquisa aplicada e inteligência de mercado à tomada de decisão, traduzindo dados e contexto estratégico em direção clara para projetos de alto impacto.",
    initials: "DC",
    photo: "/team/conrado-eugine.png",
  },
  {
    name: "Thiago Henrique",
    role: "Host e Analista",
    bio: "Conduz conversas e análises que traduzem complexidade técnica em linguagem clara, aproximando mercado, produto e decisão estratégica.",
    initials: "TH",
    photo: "/team/luiz.png",
  },
];

const PUBLICO: { tag: string; t: string; d: string; icon: ReactNode }[] = [
  {
    tag: "Fintechs",
    t: "Fintechs consolidadas e scale-ups reguladas",
    d: "Quem precisa escalar produto com conformidade, auditoria e controle sobre cada automação crítica.",
    icon: <Building2 className="h-8 w-8" strokeWidth={1.4} />,
  },
  {
    tag: "Mercado financeiro",
    t: "Instituições financeiras, gestoras e family offices",
    d: "Operações que exigem rastreabilidade, responsabilidade clara e infraestrutura digital sob governança.",
    icon: <Landmark className="h-8 w-8" strokeWidth={1.4} />,
  },
  {
    tag: "Inovação",
    t: "Times de inovação, produto, dados e tecnologia",
    d: "Equipes que querem sair do piloto e colocar agentes e sistemas proprietários em produção com segurança.",
    icon: <Lightbulb className="h-8 w-8" strokeWidth={1.4} />,
  },
  {
    tag: "Founders",
    t: "Founders e executivos com visão de infraestrutura própria",
    d: "Lideranças que não aceitam depender só de prateleira quando o diferencial competitivo exige construção.",
    icon: <Rocket className="h-8 w-8" strokeWidth={1.4} />,
  },
  {
    tag: "Operações críticas",
    t: "Empresas com processos que exigem automação governada",
    d: "Organizações em que erro, falha ou opacidade têm custo alto demais para improvisar com IA genérica.",
    icon: <Cog className="h-8 w-8" strokeWidth={1.4} />,
  },
];

const PILARES = [
  {
    heading: "Responsabilidade",
    description:
      "Cada agente existe para um resultado de negócio mensurável, com dono claro do que acontece quando algo falha.",
    imgSrc: "/imagens%20gerais/case-produto.png",
  },
  {
    heading: "Intervenção",
    description:
      "Permissões, limites e pontos de tomada de controle humana definidos antes da automação entrar em produção.",
    imgSrc: "/imagens%20gerais/case-fintech.png",
  },
  {
    heading: "Orquestração",
    description:
      "Caminhos, exceções e paradas controladas para que o sistema opere com previsibilidade, não por improviso.",
    imgSrc: "/imagens%20gerais/case-operacoes.png",
  },
  {
    heading: "Proveniência",
    description:
      "Fontes confiáveis, contexto versionado e rastreio do que alimentou cada decisão do agente.",
    imgSrc: "/imagens%20gerais/servico-ia.png",
  },
  {
    heading: "Observabilidade",
    description:
      "Visibilidade contínua de comportamento, risco e desempenho para operar com segurança no dia a dia.",
    imgSrc: "/imagens%20gerais/servico-arquitetura.png",
  },
  {
    heading: "Blockchain",
    description:
      "Camada de verificabilidade aplicada só quando o negócio realmente precisa provar origem, estado ou transferência.",
    imgSrc: "/imagens%20gerais/case-blockchain.png",
  },
];

const CASES_SLIDES = [
  {
    sector: "Fintech",
    result: "Decisões 3x mais rápidas",
    title: "Agentes de crédito com trilha auditável",
    description:
      "Automação governada com human-in-the-loop e registro completo de cada etapa da decisão.",
    mockup: "credito" as const,
  },
  {
    sector: "Gestora",
    result: "Proveniência ponta a ponta",
    title: "Tokenização com verificabilidade real",
    description:
      "Camada blockchain aplicada só onde a prova de origem e estado era requisito do negócio.",
    mockup: "tokenizacao" as const,
  },
  {
    sector: "Operações",
    result: "Menos falha operacional",
    title: "Orquestração de processos críticos",
    description:
      "Arquitetura sob medida com observabilidade e gates antes de qualquer entrada em produção.",
    mockup: "orquestracao" as const,
  },
  {
    sector: "Segurança",
    result: "Acesso sob governança",
    title: "MFA multi autenticação para sistemas críticos",
    description:
      "Camadas de verificação (TOTP, chave física e políticas) para proteger contas e operações sensíveis.",
    mockup: "mfa" as const,
  },
];

const PRINCIPIOS: { t: string; icon: ReactNode }[] = [
  { t: "Responsabilidade clara", icon: <Scale className="h-5 w-5" strokeWidth={1.4} /> },
  { t: "Auditabilidade e proveniência", icon: <FileSearch className="h-5 w-5" strokeWidth={1.4} /> },
  { t: "Gates antes da produção", icon: <ShieldAlert className="h-5 w-5" strokeWidth={1.4} /> },
  { t: "Métricas de resultado", icon: <ChartNoAxesCombined className="h-5 w-5" strokeWidth={1.4} /> },
  { t: "Intervenção humana", icon: <Hand className="h-5 w-5" strokeWidth={1.4} /> },
  { t: "Segurança desde o desenho", icon: <Lock className="h-5 w-5" strokeWidth={1.4} /> },
];

const HERO_FEATURES = [
  {
    label: "Governança como diferencial",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3 5 6v5c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3Z" />
      </svg>
    ),
  },
  {
    label: "IA aplicada com responsabilidade",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="6" cy="12" r="2.2" />
        <circle cx="18" cy="6" r="2.2" />
        <circle cx="18" cy="18" r="2.2" />
        <path d="M8 11.2 15.8 7.2M8 12.8l7.8 4" />
      </svg>
    ),
  },
  {
    label: "Soluções proprietárias e escaláveis",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3 21 8.5v7L12 21 3 15.5v-7L12 3Z" />
      </svg>
    ),
  },
  {
    label: "Segurança, privacidade e conformidade",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="5" y="10" width="14" height="10" rx="1.5" />
        <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      </svg>
    ),
  },
];

function SectionLabel({ children, className = "" }: { children: string; className?: string }) {
  return <p className={`eyebrow text-gold ${className}`}>{children}</p>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-void/90 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="text-white">
            <Logo variant="light" />
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-gold/60 hover:text-gold"
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-4 bg-current transition-transform ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-current transition-transform ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <button
        type="button"
        aria-label="Fechar menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[55] bg-black/50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Painel lateral direita */}
      <aside
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={`fixed inset-y-0 right-0 z-[56] flex w-[min(100%,22rem)] flex-col border-l border-white/10 bg-void/95 shadow-[-24px_0_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-300 ease-out md:w-[26rem] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-white/10 px-6">
          <p className="eyebrow text-gold">Menu</p>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:border-gold/60 hover:text-gold"
          >
            <span className="relative block h-3 w-3">
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-6 py-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-5 text-lg text-white/80 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-white/10 px-6 py-6">
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            Solicita orçamento
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </aside>

      <main id="top">
        {/* HERO */}
        <section className="relative flex min-h-screen flex-col overflow-hidden bg-void text-white">
          {/* Imagem/símbolo oficial: coluna direita, altura total */}
          <div className="absolute top-0 right-0 bottom-0 z-[1] hidden w-[min(46vw,540px)] translate-x-[-2rem] xl:w-[min(48vw,600px)] xl:translate-x-[-3rem] lg:block">
            <HeroVisual />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col">
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-10 px-6 pt-28 pb-8 lg:px-10 lg:pr-[min(48vw,580px)] lg:pt-24 lg:pb-0">
              <div className="w-full max-w-2xl">
                <p
                  className="hero-fade-up eyebrow text-gold"
                  style={{ animationDelay: "0.05s" }}
                >
                  Agentes de IA sob sua governança.
                </p>

                <h1
                  className="hero-fade-up mt-8 font-sans text-[2.5rem] leading-[1.12] font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.4rem] xl:text-[3.65rem]"
                  style={{ animationDelay: "0.15s" }}
                >
                  Tecnologia sob medida para negócios que querem construir o futuro.
                </h1>

                <p
                  className="hero-fade-up mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
                  style={{ animationDelay: "0.28s" }}
                >
                  Sistemas proprietários com IA, agentes e blockchain sob governança.
                </p>

                <div
                  className="hero-fade-up mt-10 flex flex-wrap items-center gap-6"
                  style={{ animationDelay: "0.4s" }}
                >
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Solicita orçamento
                    <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href="#governanca"
                    className="inline-flex items-center gap-2 border-b border-gold/70 pb-0.5 text-sm text-white/85 transition-colors hover:text-gold"
                  >
                    Como governamos agentes de IA
                  </a>
                </div>
              </div>

              <div className="w-full lg:hidden">
                <div className="relative mx-auto flex aspect-square max-h-[55vh] w-full max-w-sm items-center justify-center">
                  <img
                    src="/brand/aura-symbol-negative.svg"
                    alt=""
                    className="h-full w-full object-contain p-6"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-20 mx-auto w-full max-w-7xl border-t border-white/10 px-6 py-6 lg:px-10">
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {HERO_FEATURES.map((f) => (
                  <li key={f.label} className="flex items-center gap-3 text-base text-white/75">
                    <span className="shrink-0 text-gold">{f.icon}</span>
                    <span className="leading-snug">{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <SobreNos />

        {/* SERVIÇOS */}
        <section id="servicos" className="relative overflow-hidden bg-sand py-28 text-sand-foreground">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,oklch(0.71_0.107_78.5_/_0.08),transparent_60%)]"
          />
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionLabel className="text-center">Serviços</SectionLabel>
            <div className="mt-8 mx-auto max-w-3xl text-center">
              <h2 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
                O que construímos quando a prateleira não basta.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-sand-foreground/70">
                Transformamos visão estratégica em tecnologia proprietária: segura, escalável e
                integrada à realidade de cada organização.
              </p>
            </div>

            <div className="mt-20 grid gap-6 sm:grid-cols-2">
              {SERVICOS.map((s) => (
                <article
                  key={s.t}
                  className="group flex flex-col overflow-hidden border border-sand-foreground/10 bg-sand transition-colors duration-300 hover:border-navy/20"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    <img
                      src={s.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                    <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center bg-void/70 text-gold backdrop-blur-sm">
                      {s.icon}
                    </span>
                    <span className="absolute top-4 right-4 eyebrow text-white/80">{s.tag}</span>
                  </div>

                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    {s.chips?.length ? (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {s.chips.map((chip) => (
                          <span
                            key={chip}
                            className="inline-flex border border-sand-foreground/15 bg-sand-foreground/[0.04] px-3 py-1 text-[11px] font-medium tracking-wide text-sand-foreground/75 uppercase"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <h3 className="text-2xl leading-snug sm:text-3xl">{s.t}</h3>
                    <p className="mt-4 flex-1 text-base leading-relaxed text-sand-foreground/65 sm:text-lg">
                      {s.d}
                    </p>
                    <a
                      href={s.exemploHref}
                      className="mt-8 inline-flex w-fit items-center gap-2 border border-sand-foreground/20 bg-transparent px-5 py-2.5 text-sm font-medium tracking-wide text-sand-foreground transition-colors hover:border-navy hover:bg-navy hover:text-navy-foreground"
                    >
                      Ver exemplo
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PARA QUEM */}
        <section id="para-quem" className="relative overflow-hidden bg-navy py-28 text-navy-foreground">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(200,149,56,0.12),transparent_65%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 bottom-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(240,200,108,0.08),transparent_65%)]"
          />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow text-gold">Audiência</p>
              <h2 className="mt-8 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Pra quem é a Aura Labs
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-navy-foreground/65">
                Para quem precisa de infraestrutura própria, com IA e sistemas sob governança, não de
                atalho genérico.
              </p>
            </div>

            <div className="relative mt-16 px-2 sm:px-12">
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {PUBLICO.map((p) => (
                    <CarouselItem
                      key={p.t}
                      className="pl-4 basis-[85%] sm:basis-[55%] lg:basis-[42%]"
                    >
                      <article className="flex h-full min-h-[320px] flex-col justify-between bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.08] sm:min-h-[360px] sm:p-10">
                        <div className="flex items-start justify-between gap-4">
                          <span className="flex h-14 w-14 items-center justify-center text-gold">
                            {p.icon}
                          </span>
                          <span className="eyebrow text-gold/70">{p.tag}</span>
                        </div>
                        <div className="mt-12">
                          <h3 className="text-2xl leading-snug sm:text-3xl">{p.t}</h3>
                          <p className="mt-5 text-lg leading-relaxed text-navy-foreground/65">
                            {p.d}
                          </p>
                        </div>
                      </article>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden border-white/20 bg-navy text-white hover:bg-white/10 hover:text-gold disabled:opacity-30 sm:flex left-0" />
                <CarouselNext className="hidden border-white/20 bg-navy text-white hover:bg-white/10 hover:text-gold disabled:opacity-30 sm:flex right-0" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* EQUIPE */}
        <section id="equipe" className="bg-background py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel className="text-center">Equipe</SectionLabel>
              <h2 className="mt-8 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Quem constrói a Aura Labs.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground">
                Um time enxuto, com domínio técnico e responsabilidade direta pelo que entrega.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {TIME.map((person) => (
                <article
                  key={person.name}
                  className="group flex flex-col overflow-hidden border border-border bg-background transition-colors duration-300 hover:border-navy/30"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-void">
                    {person.photo ? (
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center text-gold"
                      >
                        <span className="font-display text-5xl tracking-wide">
                          {person.initials}
                        </span>
                      </div>
                    )}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void/80 to-transparent"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-border px-6 py-7 sm:px-7">
                    <p className="eyebrow text-gold">{person.role}</p>
                    <h3 className="mt-3 text-3xl leading-tight sm:text-4xl">{person.name}</h3>
                    <p className="mt-4 flex-1 text-lg leading-relaxed text-muted-foreground">
                      {person.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Portfolio />

        {/* GOVERNANÇA */}
        <section id="governanca" className="relative overflow-hidden bg-void py-28 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,149,56,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(240,200,108,0.06),transparent_45%)]"
          />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow text-gold">Governança</p>
              <h2 className="mt-8 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Agentes de IA sob sua governança.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/65">
                Governar agentes é decidir, antes da automação, quem responde pelo resultado, o que o
                agente pode fazer, como cada decisão fica rastreável e em que ponto uma pessoa assume
                o controle.
              </p>
            </div>

            <div className="mt-16">
              <ColorChangeCards items={PILARES} />
            </div>

            <div className="mt-24">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow text-gold">Princípios inegociáveis</p>
                  <h3 className="mt-4 max-w-xl text-3xl leading-tight sm:text-4xl">
                    O que não negociamos em nenhum sistema.
                  </h3>
                </div>
                <p className="max-w-sm text-base leading-relaxed text-white/55 sm:text-lg">
                  Regras que entram no desenho desde o primeiro dia, não como checklist no final.
                </p>
              </div>

              <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PRINCIPIOS.map((p) => (
                  <div
                    key={p.t}
                    className="flex items-center gap-4 bg-white/[0.04] px-5 py-5 transition-colors duration-300 hover:bg-white/[0.08]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center text-gold">
                      {p.icon}
                    </span>
                    <p className="text-lg leading-snug sm:text-xl">{p.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Abordagem />

        <ScrollingFeatureShowcase slides={CASES_SLIDES} />

        {/* CONTATO */}
        <section id="contato" className="relative overflow-hidden bg-sand py-20 sm:py-28">
          <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-0">
            <div className="grid overflow-hidden lg:grid-cols-2 lg:items-stretch">
              <div className="bg-navy px-6 py-12 text-navy-foreground sm:px-10 sm:py-14 md:px-12 lg:px-16 lg:py-16">
                <SectionLabel>Contato</SectionLabel>
                <h2 className="mt-8 max-w-md text-4xl leading-tight sm:text-5xl">
                  Comece pelo desafio, não pela tecnologia.
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
                  Descreva o problema de negócio. A conversa inicial serve para entender contexto,
                  restrições e o que precisa ficar sob governança.
                </p>

                <div className="mt-12 space-y-8 border-t border-white/10 pt-10">
                  <div>
                    <p className="eyebrow text-white/40">E-mail</p>
                    <a
                      href="mailto:contato@auralabs.com.br"
                      className="mt-3 inline-block text-xl text-white transition-colors hover:text-gold sm:text-2xl"
                    >
                      contato@auralabs.com.br
                    </a>
                  </div>
                  <div>
                    <p className="eyebrow text-white/40">Para quem</p>
                    <p className="mt-3 max-w-sm text-base leading-relaxed text-white/55">
                      Gestores, operações e times técnicos que precisam de sistemas proprietários
                      com responsabilidade clara.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-void px-6 py-12 text-white sm:px-10 sm:py-14 md:px-12 lg:px-16 lg:py-16">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy py-16 text-navy-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Logo variant="light" />
            <p className="eyebrow text-navy-foreground/50">Engenharia de IA e blockchain</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
