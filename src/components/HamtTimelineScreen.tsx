import React, { useState } from 'react';
import { DayData, Language, MediaMoment, TimeSlotType } from '../types';
import { translations } from '../locales/translations';
import { Play, Pause } from 'lucide-react';
import { FamilyAvatar } from './FamilyAvatar';

interface HamtTimelineScreenProps {
  language: Language;
  dayData: DayData;
  onViewMedia: (momentId: string) => void;
  onOpenCapture: (slot: TimeSlotType, mode: 'photo' | 'video' | 'upload') => void;
}

// Mini SVG Analog Clock Component
const AnalogClockIcon = ({ timeStr }: { timeStr: string }) => {
  const parts = timeStr.split(':');
  const hour = parseInt(parts[0] || '12', 10) % 12;
  const minute = parseInt(parts[1] || '0', 10);

  const minuteAngle = minute * 6;
  const hourAngle = hour * 30 + minute * 0.5;

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white drop-shadow-sm">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="rgba(0,0,0,0.5)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <line
        x1="12"
        y1="12"
        x2={12 + 5 * Math.sin((hourAngle * Math.PI) / 180)}
        y2={12 - 5 * Math.cos((hourAngle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="12"
        x2={12 + 7.5 * Math.sin((minuteAngle * Math.PI) / 180)}
        y2={12 - 7.5 * Math.cos((minuteAngle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const HamtTimelineScreen: React.FC<HamtTimelineScreenProps> = ({
  language,
  dayData,
  onViewMedia,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Collect all moments for the day in chronological order
  const allMoments: MediaMoment[] = [];
  const slotKeys: TimeSlotType[] = ['morning', 'lunch', 'dinner'];

  slotKeys.forEach((key) => {
    const slot = dayData.slots[key];
    if (slot.parentMoment) allMoments.push(slot.parentMoment);
    if (slot.childMoment) allMoments.push(slot.childMoment);
  });

  const handleToggleVideo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="-mx-4 pb-20 pt-0 space-y-1">
      {/* Edge-to-edge full bleed media cards without rounded corners or gaps */}
      {allMoments.map((moment) => {
        const isPlaying = playingId === moment.id;
        const exactTime = moment.timestamp || '10:00';

        return (
          <div
            key={moment.id}
            onClick={() => onViewMedia(moment.id)}
            className="w-full aspect-[16/9] overflow-hidden relative bg-black cursor-pointer group rounded-none"
          >
            {/* Media Image */}
            <img
              src={moment.mediaUrl}
              alt="Moment"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />

            {/* Top-Left: Unified Name & Emoji Overlay */}
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
              <FamilyAvatar role={moment.authorRole} size={16} withBackground />
              <span>{language === 'mn' ? moment.authorNameMn : moment.authorNameKo}</span>
            </div>

            {/* Top-Right: Analog Clock + Exact Snapshot Time */}
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-[11px] font-mono font-medium flex items-center gap-1.5 shadow-sm">
              <AnalogClockIcon timeStr={exactTime} />
              <span>{exactTime}</span>
            </div>

            {/* Video Play/Pause Overlay */}
            {moment.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                <button
                  onClick={(e) => handleToggleVideo(e, moment.id)}
                  className="w-11 h-11 rounded-full bg-white/90 text-[#3E6B48] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-[#3E6B48]" />
                  ) : (
                    <Play className="w-5 h-5 fill-[#3E6B48] translate-x-0.5" />
                  )}
                </button>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                  {moment.duration || '0:08'}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
