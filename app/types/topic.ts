export type EntryType = "Symptom" | "Diagnosis" | "Situation";
export type AgeFilter = "Neonate" | "Infant" | "Child";
export type UrgencyFilter = "Emergency" | "Urgent" | "Routine";
export type SystemFilter = "GI" | "Respiratory" | "Trauma" | "General surgery";
export type SettingFilter = "ER" | "NICU" | "Ward" | "Post-op";

export type DecisionOption = {
  label: string;
  next: string;
};

export type DecisionNode = {
  id?: string;
  question?: string;
  action?: string;
  options?: DecisionOption[];
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  entryType: EntryType;
  entryPoints: {
    symptoms: string[];
    diagnoses: string[];
    situations: string[];
  };
  filters: {
    age: AgeFilter;
    urgency: UrgencyFilter;
    system: SystemFilter;
    setting: SettingFilter;
  };
  decisionFlow: DecisionNode[];
  steps: {
    title: string;
    detail: string;
    resourceLimited?: string;
  }[];
  investigations: string[];
  risks: string[];
  pearls: string[];
  pitfalls: string[];
  mnemonic: string;
  parentExplanation: string;
  mentorTip: string;
};
