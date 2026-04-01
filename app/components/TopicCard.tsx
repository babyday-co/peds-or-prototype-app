import { Topic } from "@/app/types/topic";

type TopicCardProps = {
  topic: Topic;
  onOpen: (topicId: string) => void;
};

const urgencyColor: Record<Topic["filters"]["urgency"], string> = {
  Emergency: "bg-red-500",
  Urgent: "bg-amber-400",
  Routine: "bg-emerald-400",
};

export function TopicCard({ topic, onOpen }: TopicCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(topic.id)}
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10 active:scale-[0.99]"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white">{topic.title}</h3>
        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${urgencyColor[topic.filters.urgency]}`} />
      </div>
      <p className="text-sm text-slate-200/90">{topic.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {topic.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/15 px-2 py-1 text-xs text-slate-200/90">
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
