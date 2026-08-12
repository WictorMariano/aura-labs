import type { ReactNode } from "react";

export type CaseMockupId = "credito" | "tokenizacao" | "orquestracao" | "mfa";

export function CaseMockup({ id }: { id: CaseMockupId }) {
  switch (id) {
    case "credito":
      return <CreditoDashboard />;
    case "tokenizacao":
      return <TokenizacaoDashboard />;
    case "orquestracao":
      return <OrquestracaoDashboard />;
    case "mfa":
      return <MfaApp />;
    default:
      return null;
  }
}

function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-[#0d2347] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-[10px] font-medium tracking-[0.16em] text-[#c89538] uppercase">
            {subtitle}
          </p>
          <p className="mt-0.5 text-sm font-semibold tracking-tight">{title}</p>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-[#c89538]/80" />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden p-4">{children}</div>
    </div>
  );
}

function CreditoDashboard() {
  const rows = [
    { id: "CR-1042", score: "812", status: "Aprovado", tone: "text-emerald-300" },
    { id: "CR-1043", score: "641", status: "Revisão", tone: "text-[#f0c86c]" },
    { id: "CR-1044", score: "388", status: "Negado", tone: "text-rose-300" },
    { id: "CR-1045", score: "754", status: "Aprovado", tone: "text-emerald-300" },
  ];

  return (
    <Shell title="Credit Desk" subtitle="Agentes de crédito">
      <div className="grid h-full grid-rows-[auto_1fr] gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            { l: "Decisões / h", v: "128" },
            { l: "HITL", v: "12%" },
            { l: "Auditoria", v: "100%" },
          ].map((m) => (
            <div key={m.l} className="border border-white/10 bg-white/[0.03] px-2.5 py-2">
              <p className="text-[9px] tracking-wide text-white/45 uppercase">{m.l}</p>
              <p className="mt-1 text-lg font-semibold tracking-tight">{m.v}</p>
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-col border border-white/10 bg-white/[0.03]">
          <div className="grid grid-cols-[1fr_0.6fr_1fr] gap-2 border-b border-white/10 px-3 py-2 text-[9px] tracking-wide text-white/40 uppercase">
            <span>Caso</span>
            <span>Score</span>
            <span>Status</span>
          </div>
          <div className="min-h-0 flex-1 space-y-0 overflow-hidden">
            {rows.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[1fr_0.6fr_1fr] gap-2 border-b border-white/5 px-3 py-2.5 text-xs"
              >
                <span className="font-medium">{r.id}</span>
                <span className="text-white/70">{r.score}</span>
                <span className={r.tone}>{r.status}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 px-3 py-2.5">
            <p className="text-[10px] text-white/40">Trilha</p>
            <p className="mt-1 text-[11px] leading-snug text-white/70">
              Política → Score → Gate humano → Decisão → Log imutável
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function TokenizacaoDashboard() {
  return (
    <Shell title="Asset Ledger" subtitle="Tokenização">
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <div className="border border-white/10 bg-white/[0.03] p-3">
          <p className="text-[9px] tracking-wide text-white/40 uppercase">Ativo</p>
          <p className="mt-1 text-sm font-semibold">Fundo Institucional · Token AL-09</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-1.5 flex-1 bg-white/10">
              <span className="block h-full w-[72%] bg-[#c89538]" />
            </span>
            <span className="text-[11px] text-[#f0c86c]">72% emitido</span>
          </div>
        </div>
        <div className="min-h-0 space-y-2 overflow-hidden">
          {[
            { t: "Mint #8841", d: "Hash 0x9f…a2 · verificado" },
            { t: "Transferência", d: "Carteira custodiante · 14:02" },
            { t: "Prova de origem", d: "Documento + on-chain link" },
            { t: "Estado atual", d: "Locked · compliance OK" },
          ].map((e) => (
            <div key={e.t} className="flex gap-3 border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c89538]" />
              <div>
                <p className="text-xs font-medium">{e.t}</p>
                <p className="mt-0.5 text-[11px] text-white/50">{e.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-white/10 px-3 py-2">
            <p className="text-[9px] text-white/40 uppercase">Blocos</p>
            <p className="text-base font-semibold">1.204</p>
          </div>
          <div className="border border-white/10 px-3 py-2">
            <p className="text-[9px] text-white/40 uppercase">Latência</p>
            <p className="text-base font-semibold">1.8s</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function OrquestracaoDashboard() {
  const steps = [
    { n: "01", t: "Ingresso", s: "ok" },
    { n: "02", t: "Validação", s: "ok" },
    { n: "03", t: "Gate", s: "run" },
    { n: "04", t: "Execução", s: "wait" },
    { n: "05", t: "Auditoria", s: "wait" },
  ];

  return (
    <Shell title="Ops Control" subtitle="Orquestração">
      <div className="grid h-full grid-rows-[1fr_auto] gap-3">
        <div className="space-y-2">
          {steps.map((step) => (
            <div
              key={step.n}
              className="flex items-center gap-3 border border-white/10 bg-white/[0.03] px-3 py-2.5"
            >
              <span className="text-[10px] font-medium tracking-wide text-[#c89538]">{step.n}</span>
              <span className="flex-1 text-sm font-medium">{step.t}</span>
              <span
                className={`text-[10px] tracking-wide uppercase ${
                  step.s === "ok"
                    ? "text-emerald-300"
                    : step.s === "run"
                      ? "text-[#f0c86c]"
                      : "text-white/35"
                }`}
              >
                {step.s === "ok" ? "Concluído" : step.s === "run" ? "Em gate" : "Fila"}
              </span>
            </div>
          ))}
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-3">
          <div className="mb-2 flex items-end justify-between">
            <p className="text-[9px] tracking-wide text-white/40 uppercase">Throughput</p>
            <p className="text-xs text-white/60">últimas 6h</p>
          </div>
          <div className="flex h-16 items-end gap-1.5">
            {[40, 55, 48, 70, 62, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[#c89538]/85"
                style={{ height: `${h}%`, opacity: 0.45 + i * 0.09 }}
              />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function MfaApp() {
  return (
    <Shell title="Aura Guard" subtitle="MFA · Multi autenticação">
      <div className="flex h-full flex-col justify-between gap-3">
        <div className="border border-white/10 bg-white/[0.03] p-4 text-center">
          <p className="text-[10px] tracking-wide text-white/45 uppercase">Verificação em 2 etapas</p>
          <p className="mt-3 text-sm font-semibold">Confirme o acesso à conta</p>
          <p className="mt-2 text-[11px] leading-relaxed text-white/50">
            Enviamos um código para o autenticador registrado.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            {["6", "1", "4", "", "", ""].map((d, i) => (
              <span
                key={i}
                className={`flex h-10 w-8 items-center justify-center border text-sm font-semibold ${
                  d
                    ? "border-[#c89538] bg-[#c89538]/15 text-[#f0c86c]"
                    : "border-white/15 text-white/20"
                }`}
              >
                {d || "·"}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {[
            { t: "App autenticador", d: "Ativo · TOTP 30s", on: true },
            { t: "Chave de segurança", d: "YubiKey · registrada", on: true },
            { t: "SMS backup", d: "Desativado por política", on: false },
          ].map((m) => (
            <div
              key={m.t}
              className="flex items-center justify-between border border-white/10 bg-white/[0.03] px-3 py-2.5"
            >
              <div>
                <p className="text-xs font-medium">{m.t}</p>
                <p className="mt-0.5 text-[11px] text-white/45">{m.d}</p>
              </div>
              <span
                className={`h-2 w-2 rounded-full ${m.on ? "bg-emerald-300" : "bg-white/25"}`}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full bg-[#c89538] py-2.5 text-xs font-semibold tracking-wide text-[#07182f] uppercase"
        >
          Confirmar acesso
        </button>
      </div>
    </Shell>
  );
}
