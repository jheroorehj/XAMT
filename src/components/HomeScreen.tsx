import React, { useState } from 'react';
import { DayData, Language, TimeSlotType } from '../types';
import { translations } from '../locales/translations';
import { 
  Camera, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sunrise, 
  Sun, 
  Moon, 
  ArrowRight,
  UploadCloud
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

  const slotsConfig: {
    key: TimeSlotType;
    title: string;
    timeRange: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'morning',
      title: t.slotMorning,
      timeRange: t.slotMorningTime,
      icon: <Sunrise className="w-4 h-4 text-[#E07A5F]" />
    },
    {
      key: 'lunch',
      title: t.slotLunch,
      timeRange: t.slotLunchTime,
      icon: <Sun className="w-4 h-4 text-[#D4A373]" />
    },
    {
      key: 'dinner',
      title: t.slotDinner,
      timeRange: t.slotDinnerTime,
      icon: <Moon className="w-4 h-4 text-[#4A6B82]" />
    }
  ];

  const getSlotStatus = (slotKey: TimeSlotType) => {
    const slotRecord = todayData.slots[slotKey];
    const myMoment = activeRole === 'parent' ? slotRecord.parentMoment : slotRecord.childMoment;
    if (myMoment) return 'completed';
    if (activeSlotTime === slotKey) return 'active';
    
    const slotOrder: TimeSlotType[] = ['morning', 'lunch', 'dinner'];
    if (slotOrder.indexOf(slotKey) < slotOrder.indexOf(activeSlotTime)) return 'missed';
    return 'upcoming';
  };

  const activeSlotName = 
    activeSlotTime === 'morning' 
      ? t.slotMorning 
      : activeSlotTime === 'lunch' 
      ? t.slotLunch 
      : t.slotDinner;

  const activeSlotTimeRange =
    activeSlotTime === 'morning'
      ? t.slotMorningTime
      : activeSlotTime === 'lunch'
      ? t.slotLunchTime
      : t.slotDinnerTime;

  const currentSlotRecord = todayData.slots[activeSlotTime];
  const isCurrentSlotCompleted = activeRole === 'parent' 
    ? Boolean(currentSlotRecord.parentMoment) 
    : Boolean(currentSlotRecord.childMoment);

  return (
    <div className="space-y-3.5 pb-24 pt-1">
      {/* 1. Compact 'How to Use' Guide Toggle */}
      <div className="bg-[#FAF8F2] rounded-xl border border-[#E6E1D4] overflow-hidden">
        <button
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          className="w-full px-3.5 py-2 flex items-center justify-between text-xs font-semibold text-[#4F5D51] hover:bg-[#F2EDE3] transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#2E7D32]" />
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

      {/* 2. Single Primary CTA (1. 지금 기록할 수 있는가) */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#E5E0D5] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
            <span className="text-xs font-bold text-[#1E3022]">
              {activeSlotName} ({activeSlotTimeRange})
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#2E7D32]">
            {isCurrentSlotCompleted ? t.homeSlotCompleted : t.homeSlotActive}
          </span>
        </div>

        {/* Single Big Action CTA */}
        <button
          onClick={() => onOpenCapture(activeSlotTime, 'photo')}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#256629] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <Camera className="w-5 h-5 text-white" />
          <span>
            {isCurrentSlotCompleted
              ? language === 'mn' ? 'Агшин дахин бүртгэх' : '순간 다시 기록하기'
              : t.homePrimaryRecordBtn}
          </span>
        </button>
      </div>

      {/* 3. Today's 3 Slots Status (2. 오늘 어느 시간대를 기록했는가 & 3. 바로 확인) */}
      <div className="space-y-2">
        {slotsConfig.map((slot) => {
          const status = getSlotStatus(slot.key);
          const slotRecord = todayData.slots[slot.key];
          const parentMoment = slotRecord.parentMoment;
          const childMoment = slotRecord.childMoment;
          const isActive = activeSlotTime === slot.key;

          return (
            <div
              key={slot.key}
              className={`rounded-2xl p-3 border transition-all ${
                isActive
                  ? 'bg-white border-[#2E7D32] ring-2 ring-[#2E7D32]/10 shadow-xs'
                  : 'bg-[#FCFBF7] border-[#E8E4DA]'
              }`}
            >
              {/* Header of Slot */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#F0ECE1] flex items-center justify-center">
                    {slot.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs text-[#202E23]">
                        {slot.title}
                      </span>
                      <span className="text-[10px] text-[#7A857A] font-mono">
                        ({slot.timeRange})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Status Badge / Action */}
                <div>
                  {status === 'completed' ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#2E7D32] bg-[#EBF3EC] px-2 py-0.5 rounded-full border border-[#CCE2CF]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.homeSlotCompleted}</span>
                    </span>
                  ) : status === 'active' ? (
                    <button
                      onClick={() => onOpenCapture(slot.key, 'photo')}
                      className="px-2.5 py-1 rounded-full bg-[#2E7D32] text-white text-[11px] font-bold hover:bg-[#256629]"
                    >
                      {language === 'mn' ? 'Бүртгэх' : '기록하기'}
                    </button>
                  ) : status === 'missed' ? (
                    <button
                      onClick={() => onOpenCapture(slot.key, 'upload')}
                      className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3EFE6] text-[#70583A] text-[10px] font-semibold border border-[#E3DAC9]"
                    >
                      <UploadCloud className="w-2.5 h-2.5" />
                      <span>{t.homeSlotMissedUpload}</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-[#8F998F] px-2 py-0.5 rounded-full bg-[#F2EFE8]">
                      {t.homeSlotUpcoming}
                    </span>
                  )}
                </div>
              </div>

              {/* Side-by-side Dual Miniature Thumbnail Preview (Parent & Child) */}
              {(parentMoment || childMoment) && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Parent Thumbnail */}
                  <div
                    onClick={() => parentMoment && onViewMedia(parentMoment.id)}
                    className={`relative rounded-xl overflow-hidden aspect-[16/9] ${
                      parentMoment
                        ? 'cursor-pointer group bg-black'
                        : 'bg-[#F2EFE8] border border-dashed border-[#DCD5C6] flex items-center justify-center'
                    }`}
                  >
                    {parentMoment ? (
                      <>
                        <img
                          src={parentMoment.mediaUrl}
                          alt="Parent Moment"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/65 text-white text-[9px] font-semibold">
                          🦌 {language === 'mn' ? 'Ээж' : '엄마'}
                        </div>
                      </>
                    ) : (
                      <span className="text-[10px] text-[#8A958B]">🦌 {language === 'mn' ? 'Хүлээгдэж буй' : '대기 중'}</span>
                    )}
                  </div>

                  {/* Child Thumbnail */}
                  <div
                    onClick={() => childMoment && onViewMedia(childMoment.id)}
                    className={`relative rounded-xl overflow-hidden aspect-[16/9] ${
                      childMoment
                        ? 'cursor-pointer group bg-black'
                        : 'bg-[#F2EFE8] border border-dashed border-[#DCD5C6] flex items-center justify-center'
                    }`}
                  >
                    {childMoment ? (
                      <>
                        <img
                          src={childMoment.mediaUrl}
                          alt="Child Moment"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/65 text-white text-[9px] font-semibold">
                          🐑 {language === 'mn' ? 'Тэмүүлэн' : '자녀'}
                        </div>
                      </>
                    ) : (
                      <span className="text-[10px] text-[#8A958B]">🐑 {language === 'mn' ? 'Хүлээгдэж буй' : '대기 중'}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Direct View Full Side-by-Side Timeline */}
      <button
        onClick={onNavigateToSetLog}
        className="w-full py-2.5 px-3.5 rounded-xl bg-[#EFEBE0] hover:bg-[#E5E0D2] text-[#243327] flex items-center justify-between transition-all border border-[#DFD8C7]"
      >
        <span className="text-xs font-bold text-[#1E3022]">
          {language === 'mn' ? 'ХАМТ цагийн хуваарь нарийвчлан үзэх' : 'ХАМТ 나란히 보기'}
        </span>
        <ArrowRight className="w-4 h-4 text-[#2E7D32]" />
      </button>
    </div>
  );
};
