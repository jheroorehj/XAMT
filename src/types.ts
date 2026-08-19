export type Language = 'mn' | 'ko';

export type TimeSlotType = 'morning' | 'lunch' | 'dinner';

export interface UserProfile {
  id: string;
  role: 'parent' | 'child';
  nameMn: string;
  nameKo: string;
  emoji: string;
}

export interface MediaMoment {
  id: string;
  type: 'photo' | 'video';
  mediaUrl: string;
  timestamp?: string;
  authorRole: 'parent' | 'child';
  authorNameMn: string;
  authorNameKo: string;
  authorEmoji: string;
  duration?: string; // for video e.g. "0:08"
  // Offline-first: a moment is captured on the device, then uploaded once the
  // herder camp or dormitory regains a connection.
  syncState?: 'pending' | 'synced';
}

export interface TimeSlotRecord {
  slot: TimeSlotType;
  parentMoment?: MediaMoment;
  childMoment?: MediaMoment;
  status: 'completed' | 'active' | 'upcoming';
}

export interface VoiceConversation {
  id: string;
  timeSlot: TimeSlotType;
  speakerRole: 'child' | 'parent';
  speakerNameMn: string;
  speakerNameKo: string;
  userInputMn: string;
  userInputKo: string;
  aiResponseMn: string;
  aiResponseKo: string;
  aiResponseVoiceMn: string;
  aiResponseVoiceKo: string;
  audioDuration: string;
  timestamp: string;
}

export interface SharedDiaryEntry {
  date: string; // YYYY-MM-DD
  titleMn: string;
  titleKo: string;
  contentMn: string;
  contentKo: string;
}

export interface DayData {
  date: string; // YYYY-MM-DD
  isComplete: boolean;
  slots: Record<TimeSlotType, TimeSlotRecord>;
  sharedDiary: SharedDiaryEntry;
  voiceLogs: VoiceConversation[];
}
