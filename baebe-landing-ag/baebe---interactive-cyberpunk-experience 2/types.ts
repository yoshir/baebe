export type ViewState =
  | 'BOOT'
  | 'CUTSCENE_1'
  | 'EMAIL_CAPTURE'
  | 'TERMINAL'
  | 'CUTSCENE_2'
  | 'CUTSCENE_3'
  | 'NFT_PAGE';

export type SubscriptionStatus = 'NONE' | 'PAID' | 'FOUNDER';

export interface UserProgress {
  email: string | null;
  shards: number;
  resonanceLevel: number;
  readChapters: string[]; // IDs of read chapters
  unlockedInterludes: string[];
  unlockedLostChapters: string[];
  subscription: SubscriptionStatus;
  achievements: string[];
  timeOnSite: number; // Seconds
}

export interface TerminalLine {
  id: string;
  text: string;
  type: 'input' | 'output' | 'system' | 'error' | 'story' | 'header' | 'mission';
  typing?: boolean;
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'chapter' | 'interlude' | 'lost_chapter' | 'doc';
  content: string;
  requiredShards?: number;
  requiredSubscription?: boolean;
  shardReward?: number;
  isFree?: boolean;
}