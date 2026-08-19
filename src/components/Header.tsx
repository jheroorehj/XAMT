import React from 'react';
import { Language, TimeSlotType } from '../types';
import { translations } from '../locales/translations';
import { USER_PROFILES } from '../mockData';
import { Clock, Sunrise, Sun, Moon, Globe, Sparkles } from 'lucide-react';
import { XamtLogo } from './XamtLogo';
import { FamilyAvatar } from './FamilyAvatar';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeRole: 'parent' | 'child';
  onRoleChange: (role: 'parent' | 'child') => void;
  activeSlotTime: TimeSlotType;
  onSlotTimeChange: (slot: TimeSlotType) => void;
  showSlotSimulator?: boolean;
  onOpenLoadingScreen?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeRole,
  onRoleChange,
  activeSlotTime,
  onSlotTimeChange,
  showSlotSimulator = true,
  onOpenLoadingScreen,
}) => {
  const t = translations[language];
  const currentUser = USER_PROFILES.find((u) => u.role === activeRole) || USER_PROFILES[0];

  // Shared pill styling, matched to the loading screen's ivory + soft green palette
  const pillClass =
    'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/70 text-[#3E6B48] hover:bg-white transition-all border border-[#E4DDCF] shadow-2xs whitespace-nowrap';

  return (
    <header className="sticky top-0 z-30 bg-[#F9F6EE]/95 backdrop-blur-md border-b border-[#EAE3D2] px-3.5 py-2.5">
      <div className="w-full flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-[#FAF7F0] border border-[#EAE3D2] flex items-center justify-center shadow-2xs">
            <XamtLogo size={24} />
          </div>
          <div>
            <h1 className="font-extrabold text-[#365A3D] text-sm tracking-[0.12em] leading-none whitespace-nowrap">
              {t.appName}
            </h1>
            <p className="text-[10px] text-[#5E7360] mt-1 font-medium whitespace-nowrap">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* User Role Switcher & Single Tap Language Switcher */}
        <div className="flex items-center gap-1.5">
          {/* User selector toggle button */}
          <button
            onClick={() => onRoleChange(activeRole === 'parent' ? 'child' : 'parent')}
            className={pillClass}
          >
            <FamilyAvatar role={activeRole} size={16} />
            <span>{language === 'mn' ? currentUser.nameMn : currentUser.nameKo}</span>
          </button>

          {/* Single-tap Language toggle button */}
          <button
            onClick={() => onLanguageChange(language === 'mn' ? 'ko' : 'mn')}
            className={pillClass}
          >
            <Globe className="w-3 h-3 text-[#5B8A65]" />
            <span>{language === 'mn' ? 'Монгол' : '한국어'}</span>
          </button>
        </div>
      </div>

      {/* Time Slot Simulator & Loading Screen Button - Visible ONLY on Home Screen */}
      {showSlotSimulator && (
        <div className="w-full mt-2 pt-2 border-t border-[#EFE9DA] flex flex-wrap items-center justify-between gap-1 text-[11px]">
          {/* Time Slot Selector */}
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-1 text-[10px] text-[#7A867B] font-medium mr-0.5">
              <Clock className="w-3 h-3 text-[#5B8A65]" />
              <span>{language === 'mn' ? 'Цаг:' : '시간대:'}</span>
            </span>
            <button
              onClick={() => onSlotTimeChange('morning')}
              className={`px-1.5 py-0.5 rounded-md text-[10px] flex items-center gap-0.5 transition-all border ${
                activeSlotTime === 'morning'
                  ? 'bg-[#3E6B48] text-white font-bold border-[#3E6B48]'
                  : 'bg-white/70 text-[#5E7360] border-[#E4DDCF]'
              }`}
            >
              <Sunrise className="w-2.5 h-2.5" />
              {t.slotMorning}
            </button>
            <button
              onClick={() => onSlotTimeChange('lunch')}
              className={`px-1.5 py-0.5 rounded-md text-[10px] flex items-center gap-0.5 transition-all border ${
                activeSlotTime === 'lunch'
                  ? 'bg-[#3E6B48] text-white font-bold border-[#3E6B48]'
                  : 'bg-white/70 text-[#5E7360] border-[#E4DDCF]'
              }`}
            >
              <Sun className="w-2.5 h-2.5" />
              {t.slotLunch}
            </button>
            <button
              onClick={() => onSlotTimeChange('dinner')}
              className={`px-1.5 py-0.5 rounded-md text-[10px] flex items-center gap-0.5 transition-all border ${
                activeSlotTime === 'dinner'
                  ? 'bg-[#3E6B48] text-white font-bold border-[#3E6B48]'
                  : 'bg-white/70 text-[#5E7360] border-[#E4DDCF]'
              }`}
            >
              <Moon className="w-2.5 h-2.5" />
              {t.slotDinner}
            </button>
          </div>

          {/* Loading Screen Trigger - icon only */}
          {onOpenLoadingScreen && (
            <button
              onClick={onOpenLoadingScreen}
              title={language === 'mn' ? 'Ачааллах' : '로딩 화면'}
              aria-label={language === 'mn' ? 'Ачааллах' : '로딩 화면'}
              className="w-6 h-6 rounded-full flex items-center justify-center bg-white/70 hover:bg-white text-[#3E6B48] border border-[#E4DDCF] shadow-2xs transition-transform active:scale-95 ml-auto"
            >
              <Sparkles className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </header>
  );
};
