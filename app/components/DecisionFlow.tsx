import { useMemo, useState } from "react";

import { DecisionNode } from "@/app/types/topic";

type DecisionFlowProps = {
  nodes: DecisionNode[];
};

export function DecisionFlow({ nodes }: DecisionFlowProps) {
  const index = useMemo(
    () =>
      nodes.reduce<Record<string, DecisionNode>>((accumulator, node) => {
        if (node.id) {
          accumulator[node.id] = node;
        }

        return accumulator;
      }, {}),
    [nodes]
  );

  const firstNode = nodes.find((node) => node.question) ?? nodes[0];
  const [activeNode, setActiveNode] = useState<DecisionNode | undefined>(firstNode);
  const [history, setHistory] = useState<DecisionNode[]>(firstNode ? [firstNode] : []);

  if (!activeNode) {
    return null;
  }

  return (
    <section className="space-y-3 rounded-2xl border border-[#f5c542]/30 bg-[#112e55]/60 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f5c542]">Quick Decision Flow</h3>
        <button
          type="button"
          className="text-xs text-slate-300 underline"
          onClick={() => {
            setActiveNode(firstNode);
            setHistory(firstNode ? [firstNode] : []);
          }}
        >
          Restart
        </button>
      </div>

      {activeNode.question ? <p className="text-base font-semibold text-white">{activeNode.question}</p> : null}
      {activeNode.action ? (
        <p className="rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-3 text-sm text-emerald-100">{activeNode.action}</p>
      ) : null}

      {activeNode.options?.length ? (
        <div className="grid grid-cols-2 gap-2">
          {activeNode.options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                const nextNode = index[option.next];
                if (!nextNode) {
                  return;
                }

                setActiveNode(nextNode);
                setHistory((current) => [...current, nextNode]);
              }}
              className="rounded-xl border border-white/20 bg-white/10 py-2 text-sm font-medium text-white transition hover:bg-white/15"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      {history.length > 1 ? (
        <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-slate-300">Path</p>
          <p className="text-xs text-slate-200/90">
            {history
              .map((node) => node.question || node.action || "Step")
              .filter(Boolean)
              .join(" -> ")}
          </p>
        </div>
      ) : null}
    </section>
  );
}
