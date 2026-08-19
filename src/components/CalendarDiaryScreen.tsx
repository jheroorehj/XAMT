import React, { useState } from 'react';
import { DayData, Language } from '../types';
import { translations } from '../locales/translations';
import { ChevronLeft, ChevronRight, BookOpen, Mic, Play, Pause, Volume2 } from 'lucide-react';

interface CalendarDiaryScreenProps {
  language: Language;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  dayData: DayData;
}

export const CalendarDiaryScreen: React.FC<CalendarDiaryScreenProps> = ({
  language,
  selectedDate,
  onSelectDate,
  dayData,
}) => {
  const t = translations[language];
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  // Calendar dates
  const calendarDays = [
    { day: 16, dateStr: '2026-08-16', hasData: false },
    { day: 17, dateStr: '2026-08-17', hasData: false },
    { day: 18, dateStr: '2026-08-18', hasData: true },
    { day: 19, dateStr: '2026-08-19', hasData: true, isToday: true },
    { day: 20, dateStr: '2026-08-20', hasData: false },
    { day: 21, dateStr: '2026-08-21', hasData: false },
    { day: 22, dateStr: '2026-08-22', hasData: false },
  ];

  const weekDayNamesMn = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];
  const weekDayNamesKo = ['일', '월', '화', '수', '목', '금', '토'];
  const currentWeekDays = language === 'mn' ? weekDayNamesMn : weekDayNamesKo;

  const diary = dayData.sharedDiary;
  const voiceLogs = dayData.voiceLogs || [];

  return (
    <div className="space-y-4 pb-20 pt-1">
      {/* 1. Calendar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E6E1D4] shadow-xs">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F0ECE1]">
          <span className="font-bold text-sm text-[#1E3022]">
            {language === 'mn' ? '2026 оны 8-р сар' : '2026년 8월'}
          </span>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded-lg hover:bg-[#F0ECE1] text-[#7A867B]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded-lg hover:bg-[#F0ECE1] text-[#7A867B]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {currentWeekDays.map((d, i) => (
            <span
              key={i}
              className={`text-[11px] font-bold ${
                i === 0 ? 'text-[#E07A5F]' : i === 6 ? 'text-[#4A6B82]' : 'text-[#7A867B]'
              }`}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Date Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {calendarDays.map((c) => {
            const isSelected = selectedDate === c.dateStr;
            return (
              <button
                key={c.dateStr}
                onClick={() => onSelectDate(c.dateStr)}
                className={`py-2 rounded-xl flex flex-col items-center justify-center transition-all relative ${
                  isSelected
                    ? 'bg-[#2E7D32] text-white shadow-xs font-bold'
                    : c.hasData
                    ? 'bg-[#FAF8F2] text-[#1E3022] hover:bg-[#EFECE3] border border-[#E8E2D5]'
                    : 'text-[#9AA59B]'
                }`}
              >
                <span className="text-xs">{c.day}</span>
                {c.hasData && (
                  <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-white' : 'text-[#2E7D32]'}`}>
                    ●
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Family Shared Diary */}
      <div className="bg-[#FFFDF9] rounded-2xl p-4.5 border border-[#E3DCBD] shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-[#EBE3CD] pb-2.5">
          <BookOpen className="w-4 h-4 text-[#2E7D32]" />
          <h2 className="font-bold text-sm text-[#1E3022]">
            {t.diaryTitle}
          </h2>
        </div>

        {/* Diary Title */}
        <h3 className="font-bold text-base text-[#1E3022] leading-snug">
          {language === 'mn' ? diary.titleMn : diary.titleKo}
        </h3>

        {/* Diary Real Natural Content */}
        <div className="pt-1">
          <p className="text-xs text-[#2A392C] leading-relaxed whitespace-pre-line text-justify font-normal">
            {language === 'mn' ? diary.contentMn : diary.contentKo}
          </p>
        </div>
      </div>

      {/* 3. Voice Recording Log Directly Under Diary */}
      {voiceLogs.length > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-[#E5E0D5] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#EFECE4] pb-2">
            <div className="flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-[#2E7D32]" />
              <span className="font-bold text-xs text-[#1E3022]">
                {language === 'mn' ? 'Өдрийн дуут ярианы бичлэг' : '오늘의 음성 대화 기록'}
              </span>
            </div>
            <span className="text-[10px] text-[#7A867B] font-mono font-medium">
              {voiceLogs[0].timestamp}
            </span>
          </div>

          {voiceLogs.map((log) => {
            const isPlaying = playingVoiceId === log.id;

            return (
              <div key={log.id} className="space-y-2.5">
                {/* User message */}
                <div className="bg-[#F8F6F0] p-2.5 rounded-xl border border-[#EAE3D2] text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[11px] text-[#334237]">
                      {language === 'mn' ? log.speakerNameMn : log.speakerNameKo}
                    </span>
                    <span className="text-[10px] text-[#7A867B]">{log.audioDuration}</span>
                  </div>
                  <p className="text-[#2C3B2F] leading-relaxed">
                    "{language === 'mn' ? log.userInputMn : log.userInputKo}"
                  </p>
                </div>

                {/* AI Mirrored Response message with audio player */}
                <div className="bg-[#EBF3EC] p-2.5 rounded-xl border border-[#CCE2CF] text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[11px] text-[#1E5C25]">
                        {language === 'mn' ? log.aiResponseVoiceMn : log.aiResponseVoiceKo} (AI)
                      </span>
                    </div>

                    {/* Audio Player Button */}
                    <button
                      onClick={() => setPlayingVoiceId(isPlaying ? null : log.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2E7D32] text-white text-[11px] font-semibold hover:bg-[#256629] shadow-2xs"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 fill-white" />
                          <span>{language === 'mn' ? 'Зогсоох' : '정지'}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-white translate-x-0.5" />
                          <span>{language === 'mn' ? 'Сонсох' : '재생'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Audio Waveform bar */}
                  <div className="flex items-center gap-1 h-3.5 bg-white/70 px-2 rounded-md">
                    <Volume2 className="w-3 h-3 text-[#2E7D32]" />
                    <div className="flex-1 flex items-center gap-0.5 h-2">
                      {[30, 70, 40, 90, 60, 30, 80, 50, 90, 40, 60, 30, 70].map((val, idx) => (
                        <span
                          key={idx}
                          style={{ height: `${val}%` }}
                          className={`flex-1 rounded-full ${
                            isPlaying ? 'bg-[#2E7D32] animate-pulse' : 'bg-[#ADC5B0]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[#1E3E23] leading-relaxed">
                    "{language === 'mn' ? log.aiResponseMn : log.aiResponseKo}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
