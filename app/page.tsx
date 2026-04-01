"use client";

import { useMemo, useState } from "react";

import { BottomNav } from "@/app/components/BottomNav";
import { ChipRow, FilterChips } from "@/app/components/FilterChips";
import { DecisionFlow } from "@/app/components/DecisionFlow";
import { RiskCard } from "@/app/components/RiskCard";
import { SearchBar } from "@/app/components/SearchBar";
import { StepCard } from "@/app/components/StepCard";
import { ToggleSwitch } from "@/app/components/ToggleSwitch";
import { TopicCard } from "@/app/components/TopicCard";
import topicsData from "@/app/data/topics.json";
import { Topic } from "@/app/types/topic";

type View = "home" | "search" | "topic" | "2am";
type NavTab = "home" | "search" | "2am";

const topics = topicsData.topics as Topic[];

const ageOptions = ["All", "Neonate", "Infant", "Child"] as const;
const entryOptions = ["All", "Symptom", "Diagnosis", "Situation"] as const;
const urgencyOptions = ["All", "Emergency", "Urgent", "Routine"] as const;
const systemOptions = ["All", "GI", "Respiratory", "Trauma", "General surgery"] as const;
const settingOptions = ["All", "ER", "NICU", "Ward", "Post-op"] as const;

function matchSearch(topic: Topic, query: string) {
  if (!query.trim()) {
    return true;
  }

  const haystack = [
    topic.title,
    topic.description,
    ...topic.tags,
    ...topic.entryPoints.symptoms,
    ...topic.entryPoints.diagnoses,
    ...topic.entryPoints.situations,
  ]
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id ?? "");
  const [entryType, setEntryType] = useState<(typeof entryOptions)[number]>("All");
  const [age, setAge] = useState<(typeof ageOptions)[number]>("All");
  const [urgency, setUrgency] = useState<(typeof urgencyOptions)[number]>("All");
  const [system, setSystem] = useState<(typeof systemOptions)[number]>("All");
  const [setting, setSetting] = useState<(typeof settingOptions)[number]>("All");
  const [resourceLimited, setResourceLimited] = useState(false);
  const [showMentor, setShowMentor] = useState(false);
  const [showParent, setShowParent] = useState(false);

  const filteredTopics = useMemo(
    () =>
      topics.filter((topic) => {
        const matchesSearch = matchSearch(topic, query);
        const matchesEntry = entryType === "All" || topic.entryType === entryType;
        const matchesAge = age === "All" || topic.filters.age === age;
        const matchesUrgency = urgency === "All" || topic.filters.urgency === urgency;
        const matchesSystem = system === "All" || topic.filters.system === system;
        const matchesSetting = setting === "All" || topic.filters.setting === setting;

        return (
          matchesSearch &&
          matchesEntry &&
          matchesAge &&
          matchesUrgency &&
          matchesSystem &&
          matchesSetting
        );
      }),
    [query, entryType, age, urgency, system, setting]
  );

  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? topics[0];

  const cardTone: Record<Topic["filters"]["urgency"], string> = {
    Emergency: "border-red-400/40",
    Urgent: "border-amber-300/40",
    Routine: "border-emerald-300/40",
  };

  const switchToTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setView("topic");
  };

  const onNavChange = (tab: NavTab) => {
    if (tab === "2am") {
      setView("2am");
      return;
    }

    setView(tab);
  };

  return (
    <div className="min-h-screen bg-[#0b1f3a] pb-20 text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-8 pt-4">
        <header className="mb-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#163766] to-[#0b1f3a] p-4 shadow-[0_16px_40px_rgba(1,8,24,0.45)]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300">Peds-OR</p>
          <h1 className="mt-1 text-xl font-semibold">Pediatric Surgical Intelligence</h1>
          <p className="mt-1 text-sm text-slate-200/90">What should I do next?</p>
        </header>

        {view === "home" ? (
          <section className="space-y-4">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={() => {
                setView("search");
              }}
            />

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Symptoms", value: "Symptom" as const },
                { label: "Diagnoses", value: "Diagnosis" as const },
                { label: "Situations", value: "Situation" as const },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setEntryType(item.value);
                    setView("search");
                  }}
                  className="rounded-xl border border-white/15 bg-white/5 py-3 text-sm text-slate-100"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setView("2am")}
              className="w-full rounded-2xl border border-[#f5c542]/50 bg-[#f5c542] py-3 text-sm font-semibold text-slate-900"
            >
              ⚡ 2 AM MODE
            </button>

            <section className="space-y-3">
              <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Case of the day</p>
                <h2 className="mt-2 text-base font-semibold">{topics[0].title}</h2>
                <button
                  type="button"
                  onClick={() => switchToTopic(topics[0].id)}
                  className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-sm"
                >
                  Open case
                </button>
              </article>

              <article className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-emerald-200">Pearl</p>
                <p className="mt-2 text-sm text-emerald-100">{topics[0].pearls[0]}</p>
              </article>

              <article className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-red-200">Mistake</p>
                <p className="mt-2 text-sm text-red-100">{topics[0].pitfalls[0]}</p>
              </article>
            </section>
          </section>
        ) : null}

        {view === "search" ? (
          <section className="space-y-4">
            <SearchBar value={query} onChange={setQuery} />

            <ChipRow>
              <FilterChips
                label="Entry Type"
                options={entryOptions.map((value) => ({ label: value, value }))}
                selected={entryType}
                onSelect={(value) => setEntryType(value as (typeof entryOptions)[number])}
              />
              <FilterChips
                label="Age"
                options={ageOptions.map((value) => ({ label: value, value }))}
                selected={age}
                onSelect={(value) => setAge(value as (typeof ageOptions)[number])}
              />
              <FilterChips
                label="Urgency"
                options={urgencyOptions.map((value) => ({
                  label: value === "Emergency" ? "Red Emergency" : value === "Urgent" ? "Yellow Urgent" : value === "Routine" ? "Green Routine" : value,
                  value,
                  tone: value === "Emergency" ? "red" : value === "Urgent" ? "yellow" : value === "Routine" ? "green" : "default",
                }))}
                selected={urgency}
                onSelect={(value) => setUrgency(value as (typeof urgencyOptions)[number])}
              />
              <FilterChips
                label="System"
                options={systemOptions.map((value) => ({ label: value, value }))}
                selected={system}
                onSelect={(value) => setSystem(value as (typeof systemOptions)[number])}
              />
              <FilterChips
                label="Setting"
                options={settingOptions.map((value) => ({ label: value, value }))}
                selected={setting}
                onSelect={(value) => setSetting(value as (typeof settingOptions)[number])}
              />
            </ChipRow>

            <p className="text-xs uppercase tracking-[0.14em] text-slate-300">{filteredTopics.length} results</p>
            <div className="space-y-3 pb-3">
              {filteredTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} onOpen={switchToTopic} />
              ))}

              {!filteredTopics.length ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  No topic found. Try a clinical phrase like green vomit baby.
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {view === "topic" && selectedTopic ? (
          <section className="space-y-4 pb-2">
            <button type="button" onClick={() => setView("search")} className="text-sm text-slate-200 underline">
              Back to results
            </button>

            <article className={`rounded-2xl border bg-white/5 p-4 ${cardTone[selectedTopic.filters.urgency]}`}>
              <h2 className="text-lg font-semibold">{selectedTopic.title}</h2>
              <p className="mt-1 text-sm text-slate-200">{selectedTopic.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedTopic.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 px-2 py-1 text-xs text-slate-100">
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            <ToggleSwitch
              label="Global Toggle"
              enabled={resourceLimited}
              onChange={setResourceLimited}
              leftLabel="Resource-rich"
              rightLabel="Resource-limited"
            />

            <DecisionFlow nodes={selectedTopic.decisionFlow} />

            <section className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Step-by-step management</h3>
              <div className="space-y-2">
                {selectedTopic.steps.map((step) => (
                  <StepCard
                    key={step.title}
                    title={step.title}
                    detail={resourceLimited && step.resourceLimited ? step.resourceLimited : step.detail}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Investigations</h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedTopic.investigations.map((item) => (
                  <article key={item} className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-slate-100">
                    {item}
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-red-200">Risks</h3>
              <div className="space-y-2">
                {selectedTopic.risks.map((risk) => (
                  <RiskCard key={risk} risk={risk} />
                ))}
              </div>
            </section>

            <section className="grid grid-cols-2 gap-2">
              <article className="rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-emerald-200">Pearls</p>
                <ul className="mt-2 space-y-1 text-sm text-emerald-100">
                  {selectedTopic.pearls.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="rounded-xl border border-red-400/30 bg-red-500/10 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-red-200">Pitfalls</p>
                <ul className="mt-2 space-y-1 text-sm text-red-100">
                  {selectedTopic.pitfalls.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </section>

            <article className="rounded-2xl border border-[#f5c542]/40 bg-[#f5c542]/15 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-amber-100">Mnemonic</p>
              <p className="mt-2 text-sm text-white">{selectedTopic.mnemonic}</p>
            </article>

            <section className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShowMentor((current) => !current)}
                className="rounded-xl border border-white/20 bg-white/10 p-3 text-left"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Mentor Mode</p>
                <p className="mt-1 text-sm font-medium">▶ What I would do</p>
              </button>
              <button
                type="button"
                onClick={() => setShowParent((current) => !current)}
                className="rounded-xl border border-white/20 bg-white/10 p-3 text-left"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-slate-300">Parent Mode</p>
                <p className="mt-1 text-sm font-medium">Explain to parents</p>
              </button>
            </section>

            {showMentor ? (
              <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#f5c542]" />
                  <p className="text-sm">Audio note preview (mock)</p>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded bg-white/15">
                  <div className="h-full w-2/3 animate-pulse bg-[#f5c542]" />
                </div>
                <p className="mt-2 text-sm text-slate-200">{selectedTopic.mentorTip}</p>
              </article>
            ) : null}

            {showParent ? (
              <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Parent explanation</p>
                <p className="mt-2 text-sm text-slate-100">{selectedTopic.parentExplanation}</p>
              </article>
            ) : null}
          </section>
        ) : null}

        {view === "2am" ? (
          <section className="flex h-full flex-1 flex-col justify-center gap-4 pb-10">
            <h2 className="text-center text-xl font-semibold">2 AM Mode</h2>
            <p className="text-center text-sm text-slate-300">Tap symptom and move now.</p>

            {[
              { label: "Vomiting", queryText: "green vomit baby", topicId: "bilious_vomiting" },
              { label: "Distension", queryText: "distension", topicId: "postop_distension" },
              { label: "Trauma", queryText: "abdominal trauma", topicId: "blunt_trauma" },
              { label: "Bleeding", queryText: "bleeding neonate", topicId: "preop_neonate" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setQuery(item.queryText);
                  setSelectedTopicId(item.topicId);
                  setView(item.topicId === "preop_neonate" ? "topic" : "search");
                }}
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-5 text-left text-lg font-semibold"
              >
                <span className="px-4">{item.label}</span>
              </button>
            ))}
          </section>
        ) : null}
      </main>

      {view !== "topic" ? (
        <BottomNav active={view === "2am" ? "2am" : view === "search" ? "search" : "home"} onChange={onNavChange} />
      ) : null}
    </div>
  );
}
