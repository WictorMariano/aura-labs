export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M11 1 21 19H1L11 1Z" stroke="currentColor" strokeWidth="1.25" />
        <path d="M11 8.5 15.5 19h-9L11 8.5Z" fill="currentColor" opacity="0.5" />
      </svg>
      <span className="eyebrow" style={{ letterSpacing: "0.3em" }}>
        Aura Labs
      </span>
    </span>
  );
}
