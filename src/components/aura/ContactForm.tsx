import { useState } from "react";

type Errors = Partial<Record<"nome" | "email" | "desafio", string>>;

const NEXT_STEPS = [
  "Resposta em até 2 dias úteis",
  "Conversa inicial sobre o desafio",
  "Proposta com escopo e governança",
];

export function ContactForm() {
  const [values, setValues] = useState({
    nome: "",
    email: "",
    organizacao: "",
    desafio: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => {
      if (!e[field as keyof Errors]) return e;
      const next = { ...e };
      delete next[field as keyof Errors];
      return next;
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!values.nome.trim()) next.nome = "Informe seu nome.";
    if (!values.email.trim()) next.email = "Informe seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "E-mail inválido.";
    if (values.desafio.trim().length < 10)
      next.desafio = "Descreva o desafio em ao menos 10 caracteres.";
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  }

  const fieldClass =
    "w-full border-b border-white/20 bg-transparent py-3.5 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold";

  if (submitted) {
    return (
      <div className="flex h-full min-h-[420px] flex-col justify-center" role="status">
        <p className="eyebrow text-gold">Recebido</p>
        <h3 className="mt-6 font-display text-3xl leading-tight text-white sm:text-4xl">
          Obrigado, {values.nome.split(" ")[0]}.
        </h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-white/65">
          Seus dados foram validados. Em breve o envio automático estará ativo; por agora, fale
          conosco em{" "}
          <a
            href="mailto:contato@auralabs.com.br"
            className="text-white underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold"
          >
            contato@auralabs.com.br
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setValues({ nome: "", email: "", organizacao: "", desafio: "" });
          }}
          className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-medium tracking-wide text-white transition-colors hover:text-gold"
        >
          Enviar outra mensagem
          <span aria-hidden="true">→</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex h-full flex-col text-white">
      <div className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor="nome" className="eyebrow text-white/45">
              Nome
            </label>
            <input
              id="nome"
              value={values.nome}
              onChange={(e) => update("nome", e.target.value)}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? "nome-error" : undefined}
              className={fieldClass}
              placeholder="Seu nome"
              autoComplete="name"
            />
            {errors.nome && (
              <p id="nome-error" className="mt-2 text-sm text-red-300">
                {errors.nome}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="eyebrow text-white/45">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={fieldClass}
              placeholder="voce@empresa.com"
              autoComplete="email"
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-300">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="organizacao" className="eyebrow text-white/45">
            Organização <span className="normal-case tracking-normal">(opcional)</span>
          </label>
          <input
            id="organizacao"
            value={values.organizacao}
            onChange={(e) => update("organizacao", e.target.value)}
            className={fieldClass}
            placeholder="Nome da organização"
            autoComplete="organization"
          />
        </div>

        <div>
          <label htmlFor="desafio" className="eyebrow text-white/45">
            Desafio a resolver
          </label>
          <textarea
            id="desafio"
            rows={5}
            value={values.desafio}
            onChange={(e) => update("desafio", e.target.value)}
            aria-invalid={!!errors.desafio}
            aria-describedby={errors.desafio ? "desafio-error" : undefined}
            className={`${fieldClass} resize-none`}
            placeholder="Contexto, restrições e o que precisa ficar sob governança."
          />
          {errors.desafio && (
            <p id="desafio-error" className="mt-2 text-sm text-red-300">
              {errors.desafio}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <ul className="space-y-2 text-sm text-white/50">
          {NEXT_STEPS.map((step) => (
            <li key={step} className="flex items-center gap-2.5">
              <span className="h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              {step}
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="inline-flex items-center justify-center bg-sand px-8 py-3.5 text-sm font-medium tracking-wide text-sand-foreground transition-colors hover:bg-white"
        >
          Solicita orçamento
        </button>
      </div>
    </form>
  );
}
