type StepCardProps = {
  title: string;
  detail: string;
};

export function StepCard({ title, detail }: StepCardProps) {
  return (
    <article className="rounded-xl border border-white/15 bg-white/5 p-3">
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <p className="mt-1 text-sm text-slate-200/90">{detail}</p>
    </article>
  );
}
