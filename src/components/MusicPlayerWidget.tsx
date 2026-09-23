import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Upload } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';

interface MusicPlayerWidgetProps {
  currentTrackTitle?: string;
  onSongChange?: (newTrackUrl: string, title: string) => void;
}

export const MusicPlayerWidget: React.FC<MusicPlayerWidgetProps> = ({
  currentTrackTitle = 'Sweet Romantic Melody 🎵',
  onSongChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      romanticAudio.pause();
    } else {
      romanticAudio.play();
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    romanticAudio.setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      romanticAudio.setVolume(volume || 0.7);
    } else {
      setIsMuted(true);
      romanticAudio.setVolume(0);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const title = file.name.replace(/\.[^/.]+$/, '');
      romanticAudio.setTrack(dataUrl);
      romanticAudio.play();
      if (onSongChange) {
        onSongChange(dataUrl, title);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 select-none">
      {/* Hidden file input for changing song */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-full border border-[#c62845]/20 shadow-lg text-[#5a1f2d]">
        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-[#c62845] hover:bg-[#a11c34] text-white flex items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer"
          aria-label={isPlaying ? 'Pause music' : 'Play romantic music'}
          title={isPlaying ? 'Pause music' : 'Play romantic music'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
        </button>

        {/* Music Icon & Dynamic Equalizer Bars */}
        <div className="flex items-center gap-1.5 px-1">
          <div className="flex items-end gap-0.5 h-4">
            <span
              className={`w-0.5 bg-[#c62845] rounded-full transition-all duration-300 ${
                isPlaying ? 'h-3 animate-pulse' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-[#ff4d6d] rounded-full transition-all duration-300 ${
                isPlaying ? 'h-4 animate-bounce' : 'h-1.5'
              }`}
              style={{ animationDelay: '0.15s' }}
            />
            <span
              className={`w-0.5 bg-[#c62845] rounded-full transition-all duration-300 ${
                isPlaying ? 'h-2 animate-pulse' : 'h-1'
              }`}
              style={{ animationDelay: '0.3s' }}
            />
          </div>
          <span className="text-xs font-semibold text-[#8c3a4f] max-w-[100px] sm:max-w-[140px] truncate">
            {currentTrackTitle}
          </span>
        </div>

        {/* Volume & Mute control */}
        <div className="relative flex items-center">
          <button
            onClick={toggleMute}
            onMouseEnter={() => setShowVolumePopup(true)}
            className="w-7 h-7 rounded-full hover:bg-rose-50 flex items-center justify-center text-[#8c3a4f] transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Volume slider popover on hover/interaction */}
          {showVolumePopup && (
            <div
              onMouseLeave={() => setShowVolumePopup(false)}
              className="absolute bottom-9 left-1/2 -translate-x-1/2 bg-white px-3 py-2 rounded-xl shadow-xl border border-rose-200 flex flex-col items-center gap-1 z-50"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-20 accent-[#c62845] cursor-pointer"
              />
              <span className="text-[10px] font-medium text-[#8c3a4f]">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Change Song Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-2 py-1 text-[11px] font-semibold text-[#c62845] hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border-l border-rose-100 ml-1"
          title="Upload your own song (MP3)"
        >
          <Upload className="w-3 h-3" />
          <span className="hidden sm:inline">Change Song</span>
        </button>
      </div>
    </div>
  );
};
