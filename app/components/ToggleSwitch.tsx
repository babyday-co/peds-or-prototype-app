type ToggleSwitchProps = {
  label: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
  leftLabel: string;
  rightLabel: string;
};

export function ToggleSwitch({
  label,
  enabled,
  onChange,
  leftLabel,
  rightLabel,
}: ToggleSwitchProps) {
  return (
    <section className="space-y-2">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-300">{label}</p>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className="flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 p-2"
      >
        <span className={`rounded-lg px-3 py-1 text-xs ${!enabled ? "bg-[#f5c542] text-slate-900" : "text-slate-300"}`}>
          {leftLabel}
        </span>
        <span className={`rounded-lg px-3 py-1 text-xs ${enabled ? "bg-[#f5c542] text-slate-900" : "text-slate-300"}`}>
          {rightLabel}
        </span>
      </button>
    </section>
  );
}
