import React, { useState } from 'react';
import { Language, MediaMoment } from '../types';
import { X, Play, Pause, Volume2 } from 'lucide-react';
import { FamilyAvatar } from './FamilyAvatar';

interface MediaPreviewModalProps {
  moment: MediaMoment | null;
  onClose: () => void;
  language: Language;
}

export const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({
  moment,
  onClose,
  language,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!moment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#181C19] text-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-3.5 bg-black/40 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <FamilyAvatar role={moment.authorRole} size={24} />
            <h3 className="font-bold text-xs text-white">
              {language === 'mn' ? moment.authorNameMn : moment.authorNameKo}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 16:9 Landscape Player */}
        <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={moment.mediaUrl}
            alt="Media"
            className="w-full h-full object-cover"
          />

          {moment.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-white/90 text-[#3E6B48] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-[#3E6B48]" />
                ) : (
                  <Play className="w-6 h-6 fill-[#3E6B48] translate-x-0.5" />
                )}
              </button>

              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 text-white text-xs font-mono flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                <span>{moment.duration || '0:08'}</span>
              </div>
            </div>
          )}

          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-mono">
            {moment.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};
