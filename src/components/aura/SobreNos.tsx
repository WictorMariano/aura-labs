import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const LAYERS = [
  { layer: "1", yPercent: 70 },
  { layer: "2", yPercent: 55 },
  { layer: "3", yPercent: 40 },
  { layer: "4", yPercent: 10 },
] as const;

export function SobreNos() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector("[data-parallax-layers]");
    if (!triggerElement) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tl: gsap.core.Timeline | undefined;
    let lenis: Lenis | undefined;
    let tickerFn: ((time: number) => void) | undefined;

    if (!reducedMotion) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      LAYERS.forEach((layerObj, idx) => {
        tl!.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<",
        );
      });

      lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
      tl?.scrollTrigger?.kill();
      tl?.kill();
      if (triggerElement) gsap.killTweensOf(triggerElement);
    };
  }, []);

  return (
    <div id="sobre" className="parallax" ref={parallaxRef}>
      <section className="parallax__header" aria-label="Aura Labs">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" aria-hidden="true" />
          <div data-parallax-layers className="parallax__layers">
            <img
              src="/osmo-layer-3.webp"
              loading="eager"
              width={800}
              data-parallax-layer="1"
              alt=""
              className="parallax__layer-img"
            />
            <img
              src="/osmo-layer-2.webp"
              loading="eager"
              width={800}
              data-parallax-layer="2"
              alt=""
              className="parallax__layer-img"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">Aura Labs</h2>
            </div>
            <img
              src="/osmo-layer-1.webp"
              loading="eager"
              width={800}
              data-parallax-layer="4"
              alt=""
              className="parallax__layer-img"
            />
          </div>
          <div className="parallax__fade" aria-hidden="true" />
        </div>
      </section>

      <section className="parallax__content">
        <div className="parallax__content-inner">
          <h3 className="parallax__content-title">
            Engenharia de IA e blockchain com alma e responsabilidade.
          </h3>
          <p className="parallax__content-text">
            A Aura Labs nasceu para construir sistemas digitais proprietários onde a tecnologia
            serve o negócio, e a governança entra desde o desenho. Unimos inteligência artificial,
            agentes governados, blockchain e arquitetura sob medida para organizações que precisam
            de infraestrutura própria, não de improviso.
          </p>
          <p className="parallax__content-text">
            Sem hype. Sem atalhos. Resultado, rastreabilidade e intervenção humana no centro de
            cada decisão automatizada.
          </p>
        </div>
      </section>
    </div>
  );
}
