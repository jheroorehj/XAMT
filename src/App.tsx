import React, { useState } from 'react';
import { DayData, Language, MediaMoment, TimeSlotType, VoiceConversation } from './types';
import { translations } from './locales/translations';
import { INITIAL_DAYS_DATA } from './mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { HamtTimelineScreen } from './components/HamtTimelineScreen';
import { CalendarDiaryScreen } from './components/CalendarDiaryScreen';
import { AIVoiceModal } from './components/AIVoiceModal';
import { CameraCaptureModal } from './components/CameraCaptureModal';
import { MediaPreviewModal } from './components/MediaPreviewModal';
import { LoadingScreen } from './components/LoadingScreen';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('mn');
  const [activeTab, setActiveTab] = useState<'home' | 'hamt' | 'calendar'>('home');
  const [activeRole, setActiveRole] = useState<'parent' | 'child'>('parent');
  const [activeSlotTime, setActiveSlotTime] = useState<TimeSlotType>('morning');
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-19');
  
  // App State Data
  const [daysData, setDaysData] = useState<Record<string, DayData>>(INITIAL_DAYS_DATA);
  
  // Modals
  const [isAiVoiceOpen, setIsAiVoiceOpen] = useState(false);
  const [isLoadingScreenOpen, setIsLoadingScreenOpen] = useState(false);
  const [captureModalState, setCaptureModalState] = useState<{
    isOpen: boolean;
    slotKey: TimeSlotType;
    mode: 'photo' | 'video' | 'upload';
  }>({
    isOpen: false,
    slotKey: 'morning',
    mode: 'photo',
  });
  const [previewMomentId, setPreviewMomentId] = useState<string | null>(null);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  const currentDayData = daysData[selectedDate] || daysData['2026-08-19'];

  // Handlers
  const handleOpenCapture = (slotKey: TimeSlotType, mode: 'photo' | 'video' | 'upload') => {
    setCaptureModalState({
      isOpen: true,
      slotKey,
      mode,
    });
  };

  const handleSaveMoment = (slotKey: TimeSlotType, moment: MediaMoment) => {
    setDaysData((prev) => {
      const day = prev[selectedDate] || prev['2026-08-19'];
      const updatedSlots = { ...day.slots };
      
      if (moment.authorRole === 'parent') {
        updatedSlots[slotKey] = {
          ...updatedSlots[slotKey],
          parentMoment: moment,
          status: 'completed',
        };
      } else {
        updatedSlots[slotKey] = {
          ...updatedSlots[slotKey],
          childMoment: moment,
          status: 'completed',
        };
      }

      return {
        ...prev,
        [selectedDate]: {
          ...day,
          slots: updatedSlots,
        },
      };
    });
  };

  const handleAddVoiceLogToDiary = (newLog: VoiceConversation) => {
    setDaysData((prev) => {
      const day = prev[selectedDate] || prev['2026-08-19'];
      const updatedVoiceLogs = [newLog, ...day.voiceLogs];

      return {
        ...prev,
        [selectedDate]: {
          ...day,
          voiceLogs: updatedVoiceLogs,
        },
      };
    });
  };

  // Find media moment for preview modal
  const findMediaMoment = (id: string | null): MediaMoment | null => {
    if (!id) return null;
    for (const dayKey of Object.keys(daysData)) {
      const day = daysData[dayKey];
      for (const slotKey of Object.keys(day.slots) as TimeSlotType[]) {
        const slot = day.slots[slotKey];
        if (slot.parentMoment?.id === id) return slot.parentMoment;
        if (slot.childMoment?.id === id) return slot.childMoment;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#243327] font-sans antialiased flex flex-col items-center justify-start sm:py-6 selection:bg-[#3E6B48]/20">
      
      {/* View Switcher (Desktop only) */}
      <aside className="w-full max-w-md px-4 py-2 mb-2 hidden sm:flex items-center justify-between text-xs text-[#5E6B60] bg-white/70 backdrop-blur-sm rounded-xl border border-[#DFD8C8]">
        <span className="font-bold text-[#3E6B48]">ХАМТ (HAMT) Prototype</span>
        <button
          onClick={() => setIsPhoneFrame(!isPhoneFrame)}
          className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#EFECE4] hover:bg-[#E3DEC] text-[11px] font-semibold text-[#3C4A3E]"
        >
          {isPhoneFrame ? <Monitor className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
          <span>{isPhoneFrame ? (language === 'mn' ? 'Өргөн дэлгэц' : '와이드 뷰') : (language === 'mn' ? 'Гар у타스' : '모바일')}</span>
        </button>
      </aside>

      {/* Main Mobile App Frame */}
      <main
        className={`w-full bg-[#FAF9F5] transition-all relative flex flex-col ${
          isPhoneFrame
            ? 'max-w-md sm:rounded-[36px] sm:shadow-2xl sm:border-[8px] sm:border-[#1E2820] sm:min-h-[820px] sm:max-h-[92vh] overflow-hidden'
            : 'max-w-xl min-h-screen'
        }`}
      >
        {/* Header with Slot Simulator & Loading Button ONLY on Home Tab */}
        <Header
          language={language}
          onLanguageChange={setLanguage}
          activeRole={activeRole}
          onRoleChange={setActiveRole}
          activeSlotTime={activeSlotTime}
          onSlotTimeChange={setActiveSlotTime}
          showSlotSimulator={activeTab === 'home'}
          onOpenLoadingScreen={() => setIsLoadingScreenOpen(true)}
        />

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2">
          {activeTab === 'home' && (
            <HomeScreen
              language={language}
              todayData={currentDayData}
              activeSlotTime={activeSlotTime}
              activeRole={activeRole}
              onOpenCapture={handleOpenCapture}
              onNavigateToHamt={() => setActiveTab('hamt')}
              onOpenAiVoice={() => setIsAiVoiceOpen(true)}
              onViewMedia={(id) => setPreviewMomentId(id)}
            />
          )}

          {activeTab === 'hamt' && (
            <HamtTimelineScreen
              language={language}
              dayData={currentDayData}
              onViewMedia={(id) => setPreviewMomentId(id)}
              onOpenCapture={handleOpenCapture}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarDiaryScreen
              language={language}
              selectedDate={selectedDate}
              onSelectDate={(date) => setSelectedDate(date)}
              dayData={currentDayData}
            />
          )}
        </div>

        {/* Bottom Menu Bar Integrated Inside Mobile Screen */}
        <Navigation
          currentTab={activeTab}
          onTabChange={setActiveTab}
          language={language}
        />

        {/* Mobile Loading Screen Component */}
        <LoadingScreen
          isOpen={isLoadingScreenOpen}
          onClose={() => setIsLoadingScreenOpen(false)}
          language={language}
          autoCloseMs={3000}
        />

        {/* AI Voice Modal */}
        <AIVoiceModal
          isOpen={isAiVoiceOpen}
          onClose={() => setIsAiVoiceOpen(false)}
          language={language}
          activeRole={activeRole}
          onAddVoiceLogToDiary={handleAddVoiceLogToDiary}
          onGoToDiary={() => {
            setActiveTab('calendar');
          }}
        />

        {/* 16:9 Landscape Camera / Video / Upload Modal */}
        <CameraCaptureModal
          isOpen={captureModalState.isOpen}
          onClose={() =>
            setCaptureModalState((prev) => ({ ...prev, isOpen: false }))
          }
          language={language}
          slotKey={captureModalState.slotKey}
          initialMode={captureModalState.mode}
          activeRole={activeRole}
          onSaveMoment={handleSaveMoment}
        />

        {/* Media Preview Modal */}
        <MediaPreviewModal
          moment={findMediaMoment(previewMomentId)}
          onClose={() => setPreviewMomentId(null)}
          language={language}
        />
      </main>
    </div>
  );
}
