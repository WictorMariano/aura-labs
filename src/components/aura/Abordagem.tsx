import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ETAPAS = [
  {
    t: "Começamos pelo impacto de negócio",
    d: "A conversa parte do resultado que a organização precisa alcançar. A escolha técnica vem depois, como consequência, nunca como ponto de partida.",
  },
  {
    t: "Complexidade explicada com clareza",
    d: "Decisões de arquitetura, risco e dependência são apresentadas em linguagem institucional, de forma que quem responde pelo negócio consiga decidir.",
  },
  {
    t: "Governança faz parte do produto",
    d: "Segurança, conformidade, rastreabilidade e intervenção humana entram no desenho desde o início, não como camada adicionada ao final.",
  },
  {
    t: "Domínio técnico sem hype",
    d: "Sem promessas de risco zero ou de uma IA que resolve tudo. O que é incerto é tratado como incerto, e o que é limite é dito como limite.",
  },
];

export function Abordagem() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const track = root.querySelector<HTMLElement>("[data-timeline-track]");
    const progress = root.querySelector<HTMLElement>("[data-timeline-progress]");
    const steps = root.querySelectorAll<HTMLElement>("[data-timeline-step]");
    const end = root.querySelector<HTMLElement>("[data-timeline-end]");

    if (!track || !progress) return;

    gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });

    const progressTween = gsap.to(progress, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: track,
        start: "top 65%",
        end: "bottom 35%",
        scrub: 0.35,
      },
    });

    const stepTriggers = Array.from(steps).map((step) => {
      const dot = step.querySelector("[data-timeline-dot]");
      const content = step.querySelectorAll("[data-timeline-content]");

      gsap.set(content, { opacity: 0, y: 28 });
      if (dot) gsap.set(dot, { scale: 0.55, opacity: 0.45 });

      return gsap
        .timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            end: "top 45%",
            scrub: 0.4,
          },
        })
        .to(dot, { scale: 1.15, opacity: 1, ease: "none", duration: 0.45 }, 0)
        .to(dot, { scale: 1, ease: "none", duration: 0.55 }, 0.45)
        .to(content, { opacity: 1, y: 0, ease: "none", duration: 1 }, 0);
    });

    let endTween: gsap.core.Tween | undefined;
    if (end) {
      gsap.set(end, { opacity: 0, y: 18, scale: 0.92 });
      endTween = gsap.to(end, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: end,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    return () => {
      progressTween.scrollTrigger?.kill();
      progressTween.kill();
      stepTriggers.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
      endTween?.scrollTrigger?.kill();
      endTween?.kill();
    };
  }, []);

  return (
    <section id="abordagem" ref={rootRef} className="bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow text-gold">Abordagem</p>
        <h2 className="mt-8 max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Como conduzimos um sistema proprietário.
        </h2>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
          A Aura Labs projeta e desenvolve sistemas digitais proprietários, combinando
          inteligência artificial, agentes de IA governados, blockchain e arquitetura de
          software para resolver desafios complexos de negócios.
        </p>

        <div className="relative mt-20" data-timeline-track>
          {/* Linha base */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-8 left-4 w-[3px] bg-gold/25 md:left-1/2 md:-translate-x-1/2"
          />
          {/* Linha de progresso animada */}
          <div
            aria-hidden="true"
            data-timeline-progress
            className="absolute top-3 bottom-8 left-4 w-[3px] origin-top bg-gradient-to-b from-gold via-gold to-gold/40 shadow-[0_0_18px_rgba(201,162,77,0.45)] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="relative">
            {ETAPAS.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <li key={e.t} data-timeline-step className="relative pb-14 last:pb-16 md:pb-20">
                  <span
                    aria-hidden="true"
                    data-timeline-dot
                    className="absolute top-2 left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-gold bg-background shadow-[0_0_0_6px_rgba(201,162,77,0.12)] md:left-1/2"
                  />

                  <div className="pl-12 md:hidden" data-timeline-content>
                    <h3 className="text-2xl leading-snug sm:text-3xl">{e.t}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{e.d}</p>
                  </div>

                  <div className="hidden md:grid md:grid-cols-2 md:gap-16">
                    <div className="pr-10">
                      {left ? (
                        <div className="text-right" data-timeline-content>
                          <h3 className="text-3xl leading-snug">{e.t}</h3>
                          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                            {e.d}
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <div className="pl-10">
                      {!left ? (
                        <div data-timeline-content>
                          <h3 className="text-3xl leading-snug">{e.t}</h3>
                          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                            {e.d}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div
            data-timeline-end
            className="relative flex items-center pl-12 md:justify-center md:pl-0"
          >
            <span
              aria-hidden="true"
              className="absolute left-4 h-4 w-4 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_20px_rgba(201,162,77,0.55)] md:left-1/2"
            />
            <p className="eyebrow text-gold">Sistema em operação sob governança</p>
          </div>
        </div>
      </div>
    </section>
  );
}
