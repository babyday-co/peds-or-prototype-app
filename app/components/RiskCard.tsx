export function RiskCard({ risk }: { risk: string }) {
  return (
    <article className="rounded-xl border border-red-400/40 bg-red-500/15 p-3">
      <p className="text-sm font-semibold text-red-100">{risk}</p>
    </article>
  );
}
