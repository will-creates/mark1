export type TrackType = 'Mainline' | 'Off-grid';

export interface ActionItem {
  id: string;
  text: string;
  timeEstimate?: string;
  completed?: boolean;
}

export interface PlanTrack {
  id: string;
  title: string;
  type: TrackType;
  description: string;
  actions: ActionItem[];
}

export interface AttachedFile {
  name: string;
  size: number;
  snippet?: string;
}

export interface IntakeAnswers {
  what: string;
  who: string;
  goal: string;
  money: string;
  time: string;
  links: string[];
  files: AttachedFile[];
}

export interface GeneratedPlan {
  id: string;
  createdAt: number;
  businessName: string;
  targetAudience: string;
  goal: string;
  timeCommitment: string;
  budgetTier: string;
  tracks: PlanTrack[];
  todayTrackId: string;
  todayActionId: string;
  completedActions: Record<string, boolean>;
  sourceLinks: string[];
  sourceFiles: AttachedFile[];
}

export interface VerdictChannel {
  id: string;
  name: string;
  status: 'keep' | 'fix' | 'stop';
  note: string;
  hoursPerWeek: number;
  costPerMonth: number;
  leadsGenerated: number;
}
