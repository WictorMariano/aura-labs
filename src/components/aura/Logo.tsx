type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const src =
    variant === "light"
      ? "/brand/aura-lockup-horizontal-negative.svg"
      : "/brand/aura-lockup-horizontal.svg";

  return (
    <img
      src={src}
      alt="Aura Labs"
      className={`aura-logo h-8 w-auto sm:h-9 ${className}`}
      width={172}
      height={44}
    />
  );
}
