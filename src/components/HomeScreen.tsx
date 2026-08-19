import React, { useState } from 'react';
import { DayData, Language, MediaMoment, TimeSlotType } from '../types';
import { translations } from '../locales/translations';
import { USER_PROFILES } from '../mockData';
import {
  Camera,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Check,
  Sunrise,
  Sun,
  Moon,
  ArrowRight,
  CloudOff,
} from 'lucide-react';

interface HomeScreenProps {
  language: Language;
  todayData: DayData;
  activeSlotTime: TimeSlotType;
  activeRole: 'parent' | 'child';
  onOpenCapture: (slot: TimeSlotType, mode: 'photo' | 'video' | 'upload') => void;
  onNavigateToSetLog: () => void;
  onViewMedia: (momentId: string) => void;
}

const SLOT_ORDER: TimeSlotType[] = ['morning', 'lunch', 'dinner'];

const fill = (template: string, values: Record<string, string | number>) =>
  Object.keys(values).reduce(
    (acc, key) => acc.replace(`{${key}}`, String(values[key])),
    template
  );

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  todayData,
  activeSlotTime,
  activeRole,
  onOpenCapture,
  onNavigateToSetLog,
  onViewMedia,
}) => {
  const t = translations[language];
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const slotsConfig: Record<
    TimeSlotType,
    { title: string; timeRange: string; icon: React.ReactNode }
  > = {
    morning: {
      title: t.slotMorning,
      timeRange: t.slotMorningTime,
      icon: <Sunrise className="w-5 h-5" />,
    },
    lunch: {
      title: t.slotLunch,
      timeRange: t.slotLunchTime,
      icon: <Sun className="w-5 h-5" />,
    },
    dinner: {
      title: t.slotDinner,
      timeRange: t.slotDinnerTime,
      icon: <Moon className="w-5 h-5" />,
    },
  };

  const myMomentIn = (slotKey: TimeSlotType): MediaMoment | undefined => {
    const record = todayData.slots[slotKey];
    return activeRole === 'parent' ? record.parentMoment : record.childMoment;
  };

  const peerMomentIn = (slotKey: TimeSlotType): MediaMoment | undefined => {
    const record = todayData.slots[slotKey];
    return activeRole === 'parent' ? record.childMoment : record.parentMoment;
  };

  /**
   * Time bands are open invitations, not deadlines — a band that has passed is
   * still fillable, so there is no "missed" state here on purpose.
   */
  const bandState = (slotKey: TimeSlotType): 'now' | 'open' | 'upcoming' => {
    if (slotKey === activeSlotTime) return 'now';
    return SLOT_ORDER.indexOf(slotKey) < SLOT_ORDER.indexOf(activeSlotTime)
      ? 'open'
      : 'upcoming';
  };

  const peerProfile =
    USER_PROFILES.find((u) => u.role !== activeRole) || USER_PROFILES[0];
  const peerName = language === 'mn' ? peerProfile.nameMn : peerProfile.nameKo;

  const activeSlot = slotsConfig[activeSlotTime];
  const myActiveMoment = myMomentIn(activeSlotTime);
  const peerActiveMoment = peerMomentIn(activeSlotTime);

  // Moments captured on this device that have not reached the family yet.
  const pendingCount = SLOT_ORDER.map(myMomentIn).filter(
    (moment) => moment?.syncState === 'pending'
  ).length;

  // A band counts as "connected" once both sides have shared something in it.
  const connectedCount = SLOT_ORDER.filter(
    (slotKey) => todayData.slots[slotKey].parentMoment && todayData.slots[slotKey].childMoment
  ).length;

  return (
    <div className="space-y-3 pb-24 pt-1">
      {/* 1. The band you are in right now — the only thing asking for action */}
      <section className="bg-white rounded-2xl p-4 border border-[#E4DDCF] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#F3EFE3] text-[#3E6B48] flex items-center justify-center">
              {activeSlot.icon}
            </div>
            <div>
              <div className="font-extrabold text-[#1E3022] text-base leading-tight">
                {activeSlot.title}
              </div>
              <div className="text-[11px] text-[#7A867B] font-mono mt-0.5">
                {activeSlot.timeRange}
              </div>
            </div>
          </div>

          {myActiveMoment ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#3E6B48] bg-[#EBF3EC] px-2.5 py-1 rounded-full border border-[#CCE2CF]">
              <Check className="w-3 h-3" />
              {t.homeSlotCompleted}
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-[#5E7360] bg-[#F3EFE3] px-2.5 py-1 rounded-full border border-[#E4DDCF]">
              {t.homeSlotActive}
            </span>
          )}
        </div>

        <button
          onClick={() => onOpenCapture(activeSlotTime, 'photo')}
          className="w-full py-4 px-4 rounded-xl bg-[#3E6B48] hover:bg-[#345B3D] active:scale-[0.99] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <Camera className="w-5 h-5" />
          <span>
            {myActiveMoment ? t.homeRecordAgainBtn : t.homePrimaryRecordBtn}
          </span>
        </button>

        {/*
          The peer's news as a single line, never the photo itself — seeing what
          they shared is what the ХАМТ tab is for.
        */}
        <div className="flex items-center gap-1.5 mt-3 text-[12px] text-[#5E7360]">
          <span>{peerProfile.emoji}</span>
          <span className={peerActiveMoment ? 'font-semibold text-[#3E6B48]' : ''}>
            {fill(
              peerActiveMoment ? t.homePeerShared : t.homePeerWaiting,
              { name: peerName }
            )}
          </span>
        </div>
      </section>

      {/* 2. Today's three bands, mine only — tap any of them, past ones included */}
      <section className="bg-[#FAF8F2] rounded-2xl px-4 py-4 border border-[#E6E1D4]">
        <div className="relative flex items-start justify-between">
          {/* Connecting dotted line, echoing the loading screen */}
          <div className="absolute left-8 right-8 top-6 border-t-2 border-dotted border-[#D9D1BE] z-0" />

          {SLOT_ORDER.map((slotKey) => {
            const slot = slotsConfig[slotKey];
            const mine = myMomentIn(slotKey);
            const state = bandState(slotKey);

            return (
              <button
                key={slotKey}
                onClick={() =>
                  mine ? onViewMedia(mine.id) : onOpenCapture(slotKey, 'photo')
                }
                className="relative z-10 flex flex-col items-center gap-1.5 flex-1 group"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all group-active:scale-95 ${
                    mine
                      ? 'bg-[#3E6B48] text-white shadow-sm'
                      : state === 'now'
                      ? 'bg-white text-[#3E6B48] border-2 border-[#3E6B48] ring-4 ring-[#3E6B48]/10'
                      : 'bg-white text-[#A8B2A7] border-2 border-dashed border-[#D9D1BE]'
                  }`}
                >
                  {mine ? <Check className="w-5 h-5" /> : slot.icon}
                </div>
                <span
                  className={`text-[12px] font-bold ${
                    state === 'now' ? 'text-[#1E3022]' : 'text-[#6E7B6C]'
                  }`}
                >
                  {slot.title}
                </span>
                <span className="text-[10px] text-[#98A297] leading-none">
                  {mine
                    ? t.homeSlotCompleted
                    : state === 'upcoming'
                    ? t.homeSlotUpcoming
                    : t.homeSlotOpen}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Offline reality: captured here, still waiting for a signal */}
      {pendingCount > 0 && (
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#FBF6E9] border border-[#EADFC4] text-[#7A6533]">
          <CloudOff className="w-4 h-4 shrink-0" />
          <span className="text-[12px] font-medium">
            {fill(t.homeSyncPending, { n: pendingCount })}
          </span>
        </div>
      )}

      {/* 4. The bridge to ХАМТ — carries today's reason to go there */}
      <button
        onClick={onNavigateToSetLog}
        className="w-full py-3 px-4 rounded-xl bg-[#EFEBE0] hover:bg-[#E5E0D2] text-[#243327] flex items-center justify-between transition-all border border-[#DFD8C7]"
      >
        <span className="text-[13px] font-bold text-[#1E3022]">
          {connectedCount > 0
            ? fill(t.homeBridgeConnected, { n: connectedCount })
            : t.homeBridgeEmpty}
        </span>
        <ArrowRight className="w-4 h-4 text-[#3E6B48]" />
      </button>

      {/* 5. Guidance, out of the way at the bottom */}
      <div className="bg-[#FAF8F2] rounded-xl border border-[#E6E1D4] overflow-hidden">
        <button
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          className="w-full px-3.5 py-2 flex items-center justify-between text-xs font-semibold text-[#4F5D51] hover:bg-[#F2EDE3] transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#3E6B48]" />
            <span>{t.guideToggleLabel}</span>
          </div>
          {isGuideOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#7A867B]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#7A867B]" />
          )}
        </button>

        {isGuideOpen && (
          <div className="px-3.5 pb-2.5 pt-1 text-[11px] text-[#556357] leading-relaxed border-t border-[#EDE7DB] bg-white/60">
            {t.guideContent}
          </div>
        )}
      </div>
    </div>
  );
};
