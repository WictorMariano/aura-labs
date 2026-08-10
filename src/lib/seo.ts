/** Base URL do site em produção. Defina VITE_SITE_URL no .env se for diferente. */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://auralabs.com.br"
).replace(/\/$/, "");

export const SITE_NAME = "Aura Labs";

export const DEFAULT_TITLE =
  "Aura Labs | Engenharia de IA e blockchain sob governança";

export const DEFAULT_DESCRIPTION =
  "A Aura Labs projeta e desenvolve sistemas digitais proprietários com inteligência artificial, agentes de IA governados, blockchain e arquitetura de software sob medida.";

export const DEFAULT_KEYWORDS = [
  "Aura Labs",
  "inteligência artificial",
  "agentes de IA",
  "governança de IA",
  "blockchain",
  "arquitetura de software",
  "sistemas proprietários",
  "engenharia de software",
  "automação governada",
].join(", ");

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon-192.png"),
    description: DEFAULT_DESCRIPTION,
    sameAs: [] as string[],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
