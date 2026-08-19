import React, { useState, useEffect } from 'react';
import { Language, VoiceConversation } from '../types';
import { translations } from '../locales/translations';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { USER_PROFILES } from '../mockData';

interface AIVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  activeRole: 'parent' | 'child';
  onAddVoiceLogToDiary: (log: VoiceConversation) => void;
  onGoToDiary: () => void;
}

type Step = 'idle' | 'recording' | 'processing' | 'response' | 'reflected';

export const AIVoiceModal: React.FC<AIVoiceModalProps> = ({
  isOpen,
  onClose,
  language,
  activeRole,
  onAddVoiceLogToDiary,
  onGoToDiary,
}) => {
  const t = translations[language];
  const [step, setStep] = useState<Step>('idle');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [simulatedSpeaker, setSimulatedSpeaker] = useState<'child' | 'parent'>(activeRole);

  useEffect(() => {
    setSimulatedSpeaker(activeRole);
  }, [activeRole]);

  useEffect(() => {
    if (!isOpen) {
      setStep('idle');
      setIsPlayingAudio(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isChild = simulatedSpeaker === 'child';
  const speakerProfile = isChild ? USER_PROFILES[1] : USER_PROFILES[0];
  const mirroredProfile = isChild ? USER_PROFILES[0] : USER_PROFILES[1];

  // Nomadic Herder & Dorm Student Conversation
  const childPromptMn = 'Ээжээ, өнөөдөр математикийн шалгалтаа сайн өгсөн. Орой дотуур байрны хоол бас амттай байлаа. Хөдөө аав та хоёр даараагүй биз дээ?';
  const childPromptKo = '엄마, 오늘 수학 시험 잘 봤어요. 기숙사 저녁 밥도 맛있게 먹었어요. 초원에 아빠랑 엄마는 춥지 않으세요?';

  const childResponseMn = 'Хүү минь, шалгалтаа сайн өгсөнд баяртай байна. Хөдөө өнөөдөр налгар дулаан байлаа. Дотуур байрандаа дулаан хувцаслаад эрт амраарай, хайртай шүү.';
  const childResponseKo = '우리 아들, 시험 잘 봐서 대견하구나. 초원도 오늘 날씨가 참 포근했단다. 기숙사에서 따뜻하게 입고 일찍 자렴, 사랑한다.';

  const parentPromptMn = 'Хүү минь, өнөөдөр гэрийн гадаах хонь мал бүгд тайван сайхан байна. Дотуур байрандаа даарахгүй хичээлээ сайн хийж байна уу?';
  const parentPromptKo = '아들아, 오늘 게르 주변 가축들도 다 건강히 풀을 뜯었단다. 기숙사에서 춥지 않게 공부 잘하고 있니?';

  const parentResponseMn = 'Ээжээ, би дотуур байрандаа дулаахан сайн байгаа. Сургуулиа сайн төгсөөд амралтаараа хурдан очиж тусална аа!';
  const parentResponseKo = '엄마, 저 기숙사에서 따뜻하게 잘 지내고 있어요. 열심히 공부해서 방학 때 얼른 게르로 가서 도울게요!';

  const handleStartRecording = () => {
    setStep('recording');
    setRecordedText(
      isChild
        ? language === 'mn' ? childPromptMn : childPromptKo
        : language === 'mn' ? parentPromptMn : parentPromptKo
    );
  };

  const handleStopRecording = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('response');
    }, 1200);
  };

  const handleApplyToDiary = () => {
    const newLog: VoiceConversation = {
      id: `voice_${Date.now()}`,
      timeSlot: 'dinner',
      speakerRole: simulatedSpeaker,
      speakerNameMn: isChild ? 'Тэмүүлэн 🐑' : 'Ээж Сараа 🦌',
      speakerNameKo: isChild ? 'Тэмүүлэн 🐑' : '엄마 Сараа 🦌',
      userInputMn: isChild ? childPromptMn : parentPromptMn,
      userInputKo: isChild ? childPromptKo : parentPromptKo,
      aiResponseVoiceMn: isChild ? 'Ээж Сараагийн хоолой' : 'Тэмүүлэнгийн хоолой',
      aiResponseVoiceKo: isChild ? '엄마 Сараа의 목소리' : 'Тэмүүлэн의 목소리',
      aiResponseMn: isChild ? childResponseMn : parentResponseMn,
      aiResponseKo: isChild ? childResponseKo : parentResponseKo,
      audioDuration: '0:12',
      timestamp: '20:20'
    };

    onAddVoiceLogToDiary(newLog);
    setStep('reflected');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#FAF9F5] rounded-t-3xl sm:rounded-3xl border border-[#E5E0D5] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#2E7D32] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-white" />
            <h3 className="font-bold text-sm">
              {t.aiVoiceTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Speaker Selector */}
          <div className="bg-[#EFEBE1] p-1.5 rounded-xl flex items-center justify-between border border-[#DDD6C5]">
            <span className="text-[11px] font-bold text-[#556357] pl-2">
              {t.aiVoiceRoleSelect}:
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setSimulatedSpeaker('child');
                  setStep('idle');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  isChild
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'bg-white/60 text-[#4D5A4F] hover:bg-white'
                }`}
              >
                <span>🐑</span>
                <span>{language === 'mn' ? 'Тэмүүлэн' : '자녀 Тэмүүлэн'}</span>
              </button>
              <button
                onClick={() => {
                  setSimulatedSpeaker('parent');
                  setStep('idle');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  !isChild
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'bg-white/60 text-[#4D5A4F] hover:bg-white'
                }`}
              >
                <span>🦌</span>
                <span>{language === 'mn' ? 'Ээж Сараа' : '엄마 Сараа'}</span>
              </button>
            </div>
          </div>

          {/* Idle State */}
          {step === 'idle' && (
            <div className="text-center py-6 space-y-4">
              <button
                onClick={handleStartRecording}
                className="w-18 h-18 rounded-full bg-[#2E7D32] text-white flex items-center justify-center shadow-lg shadow-[#2E7D32]/30 hover:scale-105 active:scale-95 transition-transform mx-auto"
              >
                <Mic className="w-8 h-8" />
              </button>

              <div>
                <h4 className="font-bold text-sm text-[#1E3022]">
                  {t.aiVoiceSpeakPrompt}
                </h4>
                <p className="text-xs text-[#6A786C] mt-1">
                  {language === 'mn'
                    ? `${speakerProfile.nameMn} (${speakerProfile.emoji}) хоолойгоор ярих`
                    : `${speakerProfile.nameKo} (${speakerProfile.emoji}) 목소리로 녹음`}
                </p>
              </div>

              {/* Sample Prompt */}
              <button
                onClick={handleStartRecording}
                className="w-full text-left p-3 rounded-xl bg-white border border-[#E0DBD0] text-xs text-[#334237] transition-all hover:border-[#2E7D32]"
              >
                <span className="text-[10px] font-bold text-[#7A867B] block mb-1">
                  {language === 'mn' ? 'Жишээ яриа' : '예시 문장'}:
                </span>
                {isChild
                  ? language === 'mn' ? childPromptMn : childPromptKo
                  : language === 'mn' ? parentPromptMn : parentPromptKo}
              </button>
            </div>
          )}

          {/* Recording State */}
          {step === 'recording' && (
            <div className="text-center py-5 space-y-4">
              <div className="flex items-center justify-center gap-1.5 h-12">
                {[12, 28, 45, 20, 56, 32, 48, 16, 40, 24].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1.5 bg-[#2E7D32] rounded-full animate-pulse"
                  />
                ))}
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#D5E6D8] text-left">
                <p className="text-xs text-[#1E3022] leading-relaxed">
                  "{recordedText}"
                </p>
              </div>

              <button
                onClick={handleStopRecording}
                className="w-full py-3 rounded-xl bg-[#2E7D32] text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>{t.aiVoiceStopBtn}</span>
              </button>
            </div>
          )}

          {/* Processing State */}
          {step === 'processing' && (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EBF3EC] border-2 border-[#2E7D32] flex items-center justify-center mx-auto animate-spin">
                <Sparkles className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <p className="text-xs text-[#526054] font-medium">
                {t.aiVoiceProcessing}
              </p>
            </div>
          )}

          {/* Response State (Voice Mirroring) */}
          {step === 'response' && (
            <div className="space-y-3 py-1">
              <div className="bg-white p-3 rounded-xl border border-[#E0DBD0]">
                <span className="text-[10px] font-bold text-[#7A867B] block">
                  {speakerProfile.emoji} {language === 'mn' ? speakerProfile.nameMn : speakerProfile.nameKo}
                </span>
                <p className="text-xs text-[#2A382D] mt-0.5">
                  "{recordedText}"
                </p>
              </div>

              {/* Mirrored Voice Response */}
              <div className="bg-[#F8F5EC] p-3.5 rounded-xl border border-[#DBCFA8] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{mirroredProfile.emoji}</span>
                    <span className="text-xs font-bold text-[#1E3022]">
                      {language === 'mn' ? mirroredProfile.nameMn : mirroredProfile.nameKo} (AI)
                    </span>
                  </div>
                  <span className="text-[10px] text-[#6A786C] font-mono">0:12</span>
                </div>

                <div className="bg-white p-2 rounded-lg border border-[#E5DEC9] flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-7 h-7 rounded-full bg-[#2E7D32] text-white flex items-center justify-center"
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-3.5 h-3.5 fill-white" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                    )}
                  </button>
                  <div className="flex-1 flex items-center gap-1 h-4">
                    {[20, 50, 70, 30, 80, 60, 40, 70, 50, 30, 20].map((val, i) => (
                      <span
                        key={i}
                        style={{ height: `${val}%` }}
                        className={`flex-1 rounded-full ${
                          isPlayingAudio ? 'bg-[#2E7D32] animate-pulse' : 'bg-[#DDD5C5]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#1E3022] leading-relaxed bg-white/70 p-2.5 rounded-lg border border-[#E8E2D0]">
                  "{isChild ? (language === 'mn' ? childResponseMn : childResponseKo) : (language === 'mn' ? parentResponseMn : parentResponseKo)}"
                </p>
              </div>

              <button
                onClick={handleApplyToDiary}
                className="w-full py-3 rounded-xl bg-[#2E7D32] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>{t.aiVoiceSaveToDiaryBtn}</span>
              </button>
            </div>
          )}

          {/* Reflected Complete State */}
          {step === 'reflected' && (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EBF3EC] border border-[#2E7D32] flex items-center justify-center mx-auto text-[#2E7D32]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-[#1E3022]">
                {t.aiVoiceSavedNotice}
              </h4>
              <p className="text-xs text-[#5D6B5F]">
                {language === 'mn' ? 'Өдрийн тэмдэглэлд амжилттай нэгтгэгдлээ.' : '오늘의 가족 공유일기 내용에 반영되었습니다.'}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-[#EAE5DA] text-[#334237] text-xs font-semibold"
                >
                  {t.aiVoiceCloseBtn}
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onGoToDiary();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#2E7D32] text-white text-xs font-bold flex items-center justify-center gap-1"
                >
                  <span>{t.navCalendarDiary}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
