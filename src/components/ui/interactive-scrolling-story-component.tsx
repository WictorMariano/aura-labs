import { useEffect, useRef, useState } from "react";

export type StorySlide = {
  title: string;
  description: string;
  image: string;
  sector?: string;
  result?: string;
  bgColor?: string;
  textColor?: string;
};

type ScrollingFeatureShowcaseProps = {
  slides: StorySlide[];
  eyebrow?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function ScrollingFeatureShowcase({
  slides,
  eyebrow = "Cases de sucesso",
  ctaHref = "#contato",
  ctaLabel = "Solicita orçamento",
}: ScrollingFeatureShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || slides.length === 0) return;

    const handleScroll = () => {
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setActiveIndex(0);
        return;
      }
      const scrolled = Math.min(total, Math.max(0, -section.getBoundingClientRect().top));
      const stepHeight = total / slides.length;
      const next = Math.min(slides.length - 1, Math.floor(scrolled / stepHeight));
      setActiveIndex(next);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [slides.length]);

  function goToSlide(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const stepHeight = total / slides.length;
    const top = section.offsetTop + stepHeight * index;
    window.scrollTo({ top, behavior: "smooth" });
  }

  const active = slides[activeIndex] ?? slides[0];
  if (!active) return null;

  const bgColor = active.bgColor ?? "var(--sand)";
  const textColor = active.textColor ?? "var(--sand-foreground)";

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="relative"
      style={{ height: `${Math.max(slides.length, 1) * 100}vh` }}
    >
      <div
        className="sticky top-0 flex h-screen w-full flex-col"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          transition: "background-color 0.7s ease, color 0.7s ease",
        }}
      >
        <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 md:grid-cols-2">
          <div className="relative flex flex-col justify-center border-black/10 px-6 py-24 md:border-r md:px-12 lg:px-16">
            <div className="absolute top-8 left-6 flex flex-col gap-4 md:top-12 md:left-12 lg:left-16">
              <p className="eyebrow text-current/50">{eyebrow}</p>
              <div className="flex space-x-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`h-1 rounded-full transition-all duration-500 ease-in-out ${
                      index === activeIndex ? "w-12 bg-current/80" : "w-6 bg-current/20"
                    }`}
                    aria-label={`Ir para case ${index + 1}`}
                    aria-current={index === activeIndex}
                  />
                ))}
              </div>
            </div>

            <div className="relative h-72 w-full sm:h-80">
              {slides.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === activeIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-10 opacity-0"
                  }`}
                >
                  {slide.sector && (
                    <p className="eyebrow mb-4 text-current/45">{slide.sector}</p>
                  )}
                  {slide.result && (
                    <p className="mb-3 text-sm font-semibold tracking-wide text-current/70 uppercase">
                      {slide.result}
                    </p>
                  )}
                  <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h2>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-current/70 md:text-xl">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 lg:left-16">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 bg-navy px-8 py-3.5 text-sm font-semibold tracking-wide text-navy-foreground uppercase transition-opacity hover:opacity-90"
              >
                {ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div
            className="relative hidden items-center justify-center p-8 md:flex"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(8, 11, 18, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(8, 11, 18, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "3.5rem 3.5rem",
            }}
          >
            <div className="relative h-[70vh] w-[78%] max-w-md overflow-hidden border border-black/10 shadow-[0_24px_80px_rgba(8,11,18,0.18)]">
              <div
                className="absolute inset-x-0 top-0 w-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.title} className="h-[70vh] w-full">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
