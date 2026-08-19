import React from 'react';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { Home, Layers, BookOpen } from 'lucide-react';

interface NavigationProps {
  currentTab: 'home' | 'hamt' | 'calendar';
  onTabChange: (tab: 'home' | 'hamt' | 'calendar') => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  language,
}) => {
  const t = translations[language];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-[#E8E4DA] w-full">
      <div className="w-full flex items-center justify-around px-3 py-2">
        {/* 1. Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
            currentTab === 'home'
              ? 'text-[#3E6B48] font-bold'
              : 'text-[#848E84] hover:text-[#4A544A]'
          }`}
        >
          <div className={`p-1 rounded-lg ${currentTab === 'home' ? 'bg-[#EBF3EC]' : ''}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[11px] mt-0.5">{t.navHome}</span>
        </button>

        {/* 2. ХАМТ Timeline */}
        <button
          onClick={() => onTabChange('hamt')}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
            currentTab === 'hamt'
              ? 'text-[#3E6B48] font-bold'
              : 'text-[#848E84] hover:text-[#4A544A]'
          }`}
        >
          <div className={`p-1 rounded-lg ${currentTab === 'hamt' ? 'bg-[#EBF3EC]' : ''}`}>
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-[11px] mt-0.5">{t.navHamtTimeline}</span>
        </button>

        {/* 3. Calendar & Diary */}
        <button
          onClick={() => onTabChange('calendar')}
          className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
            currentTab === 'calendar'
              ? 'text-[#3E6B48] font-bold'
              : 'text-[#848E84] hover:text-[#4A544A]'
          }`}
        >
          <div className={`p-1 rounded-lg ${currentTab === 'calendar' ? 'bg-[#EBF3EC]' : ''}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] mt-0.5">{t.navCalendarDiary}</span>
        </button>
      </div>
    </nav>
  );
};
