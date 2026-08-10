import { WaterRippleImage } from "@/components/aura/WaterRippleImage";

export function HeroVisual() {
  return (
    <div className="hero-visual relative h-full w-full min-h-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(56,140,255,0.22),transparent_65%)] blur-2xl"
      />

      <div className="absolute inset-0 z-10 overflow-hidden">
        <WaterRippleImage
          src="/imagens%20gerais/hero-aura-a.png?v=portrait"
          blueish={0.55}
          scale={7}
          illumination={0.14}
          surfaceDistortion={0.06}
          waterDistortion={0.025}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
