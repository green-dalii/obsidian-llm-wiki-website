// Types for the WikiDemo scenario data, mirrored across all locale files.
//
// This file is the single source of truth for the scenarios i18n contract.
// Every locale file must conform — the parity test enforces bidirectional
// coverage vs EN at the runtime level, and TypeScript enforces shape at
// compile time.

export type ScenarioId =
  | 'daily-life'
  | 'reading'
  | 'inspiration'
  | 'creation'
  | 'academic'
  | 'business';

export interface ScenarioExtractedItem {
  name: string;
  type: 'concept' | 'entity';
  lineIdx: number;
}

export interface ScenarioGeneratedPage {
  title: string;
  path: string;
  tags: string[];
  summary: string;
}

export interface ScenarioChatAnswerLead {
  // Plain text or rich-text token stream. We use a string here and let the
  // component layer split on the [[token]] markers (see WikiDemo.tsx).
  // This avoids dragging React.ReactNode into the i18n layer.
  text: string;
}

export interface Scenario {
  id: ScenarioId;
  label: string;
  icon: string; // lucide-react icon name: heart | book-open | scissors | mic | microscope | trending-up
  filename: string;
  sourceNoteContext: string;
  sourceNote: string;
  extractedItems: ScenarioExtractedItem[];
  generatedPages: ScenarioGeneratedPage[];
  links: Array<{ from: number; to: number }>;
  chatQuestion: string;
  chatAnswerLead: ScenarioChatAnswerLead;
  chatAnswerDetail: string;
  chatSource: string;
}

export interface ScenariosTranslation {
  scenarios: Scenario[];
}