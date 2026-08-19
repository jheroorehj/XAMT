import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { X, Sunrise, Sun, Moon, Heart } from 'lucide-react';
import { XamtLogo } from './XamtLogo';

interface LoadingScreenProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  autoCloseMs?: number; // Optional auto close
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isOpen,
  onClose,
  language,
  autoCloseMs = 3000,
}) => {
  const t = translations[language];
  const [activeSlotIdx, setActiveSlotIdx] = useState(1); // 0: morning, 1: lunch, 2: dinner

  // Cycle through the three time moments (morning -> day -> night) smoothly
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setActiveSlotIdx((prev) => (prev + 1) % 3);
    }, 900);

    let timer: NodeJS.Timeout;
    if (autoCloseMs > 0) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseMs);
    }

    return () => {
      clearInterval(interval);
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, autoCloseMs, onClose]);

  if (!isOpen) return null;

  const brandSloganMn = 'Гурван агшнаар, өдрийг хамтдаа';
  const brandSloganKo = '세 순간으로, 하루를 함께';

  const loadingMsgMn = 'Гэр бүлийн нандин агшныг нэгтгэж байна';
  const loadingMsgKo = '가족의 따뜻한 순간을 불러오고 있어요';

  return (
    <div
      id="xamt-loading-screen"
      className="absolute inset-0 z-50 bg-[#F9F6EE] flex flex-col justify-between overflow-hidden select-none animate-fadeIn"
      style={{ animationDuration: '300ms' }}
    >
      {/* Top Bar with Dismiss Button & Status Simulator */}
      <div className="w-full pt-3 px-5 flex items-center justify-between z-20">
        <div className="text-[13px] font-semibold text-[#6E7B6C] tracking-tight">
          9:41
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/70 hover:bg-white text-[#5E6B5D] flex items-center justify-center border border-[#E4DDCF] shadow-2xs transition-transform active:scale-95"
          title="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 -mt-6">
        {/* 1. XAMT Logo & Emblem (Embracing Family Heart) */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-2">
            {/* Custom SVG Embracing Family Heart Logo */}
            <XamtLogo size={72} className="drop-shadow-xs" />
          </div>

          {/* Wordmark */}
          <h1 className="text-4xl font-extrabold tracking-[0.28em] text-[#365A3D] font-sans text-center ml-2">
            XAMT
          </h1>
          <p className="text-sm text-[#5E7360] font-medium tracking-wide mt-2">
            {language === 'mn' ? brandSloganMn : brandSloganKo}
          </p>
        </div>

        {/* 2. Three Time Moments Indicator (Morning · Day · Night) */}
        <div className="w-full max-w-[280px] my-6 flex items-center justify-between relative px-2">
          {/* Connecting Dotted Line */}
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 border-t-2 border-dotted border-[#D4CBB8] z-0" />

          {/* Morning Slot Node */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                activeSlotIdx === 0
                  ? 'bg-gradient-to-tr from-[#FFF3D6] to-[#FFE7A8] text-[#8C6418] shadow-lg shadow-[#F6C667]/40 ring-4 ring-[#FFF8E7] scale-110'
                  : 'bg-white/80 text-[#8C988B] border border-[#E0D8C8]'
              }`}
            >
              <Sunrise className="w-5 h-5" />
            </div>
          </div>

          {/* Day / Sun Slot Node */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                activeSlotIdx === 1
                  ? 'bg-gradient-to-tr from-[#FFF8D6] to-[#FCE082] text-[#7A5B0B] shadow-xl shadow-[#ECC440]/50 ring-4 ring-[#FFF9E6] scale-110'
                  : 'bg-white/80 text-[#8C988B] border border-[#E0D8C8]'
              }`}
            >
              <Sun className={`w-6 h-6 ${activeSlotIdx === 1 ? 'animate-spin-slow' : ''}`} />
            </div>
          </div>

          {/* Night / Moon Slot Node */}
          <div className="flex flex-col items-center z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                activeSlotIdx === 2
                  ? 'bg-gradient-to-tr from-[#E1EDF6] to-[#C9DFEF] text-[#2F5E80] shadow-lg shadow-[#9FC5E8]/40 ring-4 ring-[#F2F7FA] scale-110'
                  : 'bg-white/80 text-[#8C988B] border border-[#E0D8C8]'
              }`}
            >
              <Moon className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Loading Message & Soft Pulsing Dots */}
        <div className="flex flex-col items-center mt-2">
          <p className="text-sm font-medium text-[#657A68] text-center">
            {language === 'mn' ? loadingMsgMn : loadingMsgKo}
          </p>

          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E6B48] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B8A65] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#8EAA7B] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* 3. Soft Grassland Hills & Bottom Curved Signature Card */}
      <div className="relative w-full z-10">
        {/* Serene Watercolor Rolling Hills Vector */}
        <div className="w-full h-36 relative overflow-hidden -mb-1">
          <svg
            viewBox="0 0 400 160"
            preserveAspectRatio="none"
            className="w-full h-full opacity-85"
          >
            {/* Distant mountains */}
            <path
              d="M0 110 Q90 60 190 95 T400 70 L400 160 L0 160 Z"
              fill="#D6E5D1"
            />
            {/* Mid green rolling hills */}
            <path
              d="M0 120 Q120 75 240 115 T400 90 L400 160 L0 160 Z"
              fill="#BACFB3"
            />
            {/* Winding road/river */}
            <path
              d="M170 160 C175 140 210 125 215 110 C220 95 200 90 205 80 L212 80 C207 90 227 95 222 110 C217 125 185 140 180 160 Z"
              fill="#EBE4D5"
              opacity="0.9"
            />
            {/* Front rolling hill */}
            <path
              d="M0 135 Q140 100 280 135 T400 120 L400 160 L0 160 Z"
              fill="#A2BC99"
            />
            {/* Peaceful little yurt/house */}
            <g transform="translate(320, 95) scale(0.65)">
              <rect x="0" y="8" width="18" height="14" rx="2" fill="#FAF8F2" stroke="#5E6B5D" strokeWidth="1" />
              <polygon points="-3,8 9,-3 21,8" fill="#D36B50" />
              <rect x="6" y="12" width="6" height="10" fill="#FFE599" />
            </g>
          </svg>

          {/* Left decorative botanical leaves */}
          <div className="absolute left-2 bottom-4 opacity-75 pointer-events-none">
            <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
              <path d="M5 65 Q15 45 10 20 Q8 10 15 2" stroke="#466649" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 40 Q25 35 22 25 Q10 32 10 40 Z" fill="#6F8D69" />
              <path d="M8 25 Q-5 18 -2 10 Q6 18 8 25 Z" fill="#7C9A76" />
              <path d="M12 15 Q24 8 18 2 Q10 8 12 15 Z" fill="#5F7E59" />
            </svg>
          </div>

          {/* Right decorative botanical leaves */}
          <div className="absolute right-2 bottom-4 opacity-75 pointer-events-none">
            <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
              <path d="M35 65 Q25 45 30 20 Q32 10 25 2" stroke="#466649" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M30 40 Q15 35 18 25 Q30 32 30 40 Z" fill="#6F8D69" />
              <path d="M32 25 Q45 18 42 10 Q34 18 32 25 Z" fill="#7C9A76" />
            </svg>
          </div>
        </div>

        {/* Bottom Curved Ivory Card */}
        <div className="w-full bg-[#FAF7F0] pt-3 pb-6 px-4 rounded-t-[28px] border-t border-[#EAE3D2] shadow-sm flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-1 mb-1 text-[#3E6B48]">
            <Heart className="w-4 h-4 fill-[#3E6B48]/20" />
          </div>
          <p className="text-[13px] font-medium text-[#4C5E4E] tracking-wide text-center">
            · · &nbsp; {t.appSubtitle} &nbsp; · ·
          </p>

          {/* Home Bar indicator */}
          <div className="w-28 h-1 bg-[#1A261C]/20 rounded-full mt-3.5" />
        </div>
      </div>
    </div>
  );
};
