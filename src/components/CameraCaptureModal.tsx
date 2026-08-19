import React, { useState, useRef } from 'react';
import { Language, MediaMoment, TimeSlotType } from '../types';
import { translations } from '../locales/translations';
import { 
  Camera, 
  Video, 
  UploadCloud, 
  X, 
  Check, 
  RotateCcw, 
  Sunrise, 
  Sun, 
  Moon 
} from 'lucide-react';
import { USER_PROFILES } from '../mockData';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  slotKey: TimeSlotType;
  initialMode?: 'photo' | 'video' | 'upload';
  activeRole: 'parent' | 'child';
  onSaveMoment: (slotKey: TimeSlotType, moment: MediaMoment) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  language,
  slotKey,
  initialMode = 'photo',
  activeRole,
  onSaveMoment,
}) => {
  const t = translations[language];
  const [mode, setMode] = useState<'photo' | 'video' | 'upload'>(initialMode);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isParent = activeRole === 'parent';
  const currentUser = USER_PROFILES.find((u) => u.role === activeRole) || USER_PROFILES[0];

  const presets = isParent
    ? [
        {
          url: '/moments/morning-parent.png',
          name: language === 'mn' ? 'Гэрийн өглөө' : '게르의 아침'
        },
        {
          url: '/moments/lunch-parent.png',
          name: language === 'mn' ? 'Хээрийн мал' : '초원의 가축'
        },
        {
          url: '/moments/dinner-parent.png',
          name: language === 'mn' ? 'Оддын шөнө' : '별이 쏟아지는 밤'
        }
      ]
    : [
        {
          url: '/moments/morning-child.png',
          name: language === 'mn' ? 'Сургуулийн зам' : '등굣길'
        },
        {
          url: '/moments/lunch-child.png',
          name: language === 'mn' ? 'Хөл бөмбөгийн талбай' : '운동장 축구'
        },
        {
          url: '/moments/dinner-child.png',
          name: language === 'mn' ? 'Оройн хичээл' : '기숙사 저녁'
        }
      ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCapturedPreview(url);
    }
  };

  const handleSave = () => {
    const newMoment: MediaMoment = {
      id: `moment_${Date.now()}`,
      type: mode === 'video' ? 'video' : 'photo',
      mediaUrl: capturedPreview || presets[0].url,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      authorRole: activeRole,
      authorNameMn: currentUser.nameMn,
      authorNameKo: currentUser.nameKo,
      authorEmoji: currentUser.emoji,
      duration: mode === 'video' ? '0:08' : undefined
    };

    onSaveMoment(slotKey, newMoment);
    onClose();
  };

  const slotTitle = 
    slotKey === 'morning' ? t.slotMorning : slotKey === 'lunch' ? t.slotLunch : t.slotDinner;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-[#FAF9F5] rounded-3xl border border-[#E5E0D5] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#FAF9F5] border-b border-[#EBE6DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF3EC] text-[#2E7D32] flex items-center justify-center font-bold">
              {slotKey === 'morning' ? <Sunrise className="w-4 h-4" /> : slotKey === 'lunch' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-bold text-xs text-[#1E3022]">
                {slotTitle} • {t.captureModalTitle}
              </h3>
              <p className="text-[10px] text-[#6A786C]">
                {currentUser.emoji} {language === 'mn' ? currentUser.nameMn : currentUser.nameKo}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#7A867B] hover:text-[#1E3022] hover:bg-[#EFECE3]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Choices Inside the Modal: Photo / Video / Upload */}
        <div className="grid grid-cols-3 p-1 mx-4 mt-3 bg-[#EFEBE1] rounded-xl border border-[#DDD6C5] text-xs font-semibold">
          <button
            onClick={() => setMode('photo')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              mode === 'photo' ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#556357]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'mn' ? 'Зураг' : '사진'}</span>
          </button>
          <button
            onClick={() => setMode('video')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              mode === 'video' ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#556357]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{language === 'mn' ? 'Бичлэг' : '영상 (0:08)'}</span>
          </button>
          <button
            onClick={() => {
              setMode('upload');
              fileInputRef.current?.click();
            }}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              mode === 'upload' ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#556357]'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{t.uploadMedia}</span>
          </button>
        </div>

        {/* 16:9 Viewfinder / Media Preview */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            {capturedPreview ? (
              <img
                src={capturedPreview}
                alt="Captured"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-neutral-400 p-4">
                <span className="text-2xl mb-1 block">
                  {mode === 'video' ? '📹' : '📷'}
                </span>
                <p className="text-xs text-white font-medium">16:9 {t.landscapeHint}</p>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  {mode === 'video' 
                    ? (language === 'mn' ? '8 секундын богино бичлэг' : '8초 가로 비디오') 
                    : (language === 'mn' ? 'Хэвтээ зураг' : '가로 사진')}
                </p>
              </div>
            )}

            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-semibold">
              {currentUser.emoji} {language === 'mn' ? currentUser.nameMn : currentUser.nameKo}
            </div>
          </div>

          {/* Quick Preset Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-[#7A867B]">
              <span className="font-bold">{t.sampleMediaLabel}:</span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[#2E7D32] font-semibold underline flex items-center gap-1"
              >
                <UploadCloud className="w-3 h-3" />
                <span>{t.myFileUploadLabel}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setCapturedPreview(p.url)}
                  className={`p-1 rounded-xl border text-left flex flex-col items-center gap-1 transition-all ${
                    capturedPreview === p.url
                      ? 'bg-[#EBF3EC] border-[#2E7D32]'
                      : 'bg-white border-[#E0DBD0]'
                  }`}
                >
                  <img
                    src={p.url}
                    alt={p.name}
                    className="w-full h-10 object-cover rounded-lg"
                  />
                  <span className="text-[10px] font-bold text-[#1E3022] truncate w-full text-center">
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF9F5] border-t border-[#EBE6DC] flex items-center justify-between gap-2">
          {!capturedPreview ? (
            <button
              onClick={() => setCapturedPreview(presets[0].url)}
              className="w-full py-3 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <Camera className="w-4 h-4" />
              <span>{mode === 'video' ? t.recordLandscapeVideo : t.takeLandscapePhoto}</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setCapturedPreview(null)}
                className="px-4 py-2.5 rounded-xl bg-[#EAE5DA] text-[#424F44] text-xs font-semibold hover:bg-[#DFD9CC] flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.retake}</span>
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl bg-[#2E7D32] text-white text-xs font-bold hover:bg-[#256629] flex items-center justify-center gap-1 shadow-xs"
              >
                <Check className="w-4 h-4" />
                <span>{t.saveRecord}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
