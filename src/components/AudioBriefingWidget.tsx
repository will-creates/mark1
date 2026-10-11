import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

export const AudioBriefingWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 2;
        });
      }, 300);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="my-12 p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-[800px] mx-auto text-[#0A1020] shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#2F6BFF] hover:bg-[#2558d4] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(47,107,255,0.35)] shrink-0 transition-transform active:scale-95"
            aria-label={isPlaying ? 'Pause briefing' : 'Play audio briefing'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2F6BFF] uppercase tracking-wider">
                Hey Mark Voice Audio
              </span>
              <span className="text-[11px] text-[#64748B]">
                0:45 briefing
              </span>
            </div>
            <h4 className="text-base font-semibold text-[#0A1020]">
              Friday Verdict Audio Briefing
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className="px-3 py-1.5 text-xs font-semibold text-[#566074] hover:text-[#0A1020] bg-white border border-[#CBD5E1] rounded-full transition-colors"
          >
            {showTranscript ? 'Hide transcript' : 'Read transcript'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-[#64748B] hover:text-[#0A1020] rounded-full"
            title="Restart audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Waveform / Progress bar */}
      <div className="mt-4 flex items-center gap-1.5 h-6">
        {[20, 45, 75, 30, 85, 60, 40, 95, 70, 50, 30, 65, 80, 50, 90, 45, 60, 75, 35, 90, 55, 40].map((h, i) => {
          const barProgress = (i / 22) * 100;
          const isPassed = progress >= barProgress;

          return (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-150 ${
                isPassed ? 'bg-[#2F6BFF]' : 'bg-[#CBD5E1]'
              } ${isPlaying ? 'animate-pulse' : ''}`}
              style={{ height: `${h}%` }}
            />
          );
        })}
      </div>

      {/* Transcript collapsible */}
      {showTranscript && (
        <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-xs text-[#334155] leading-relaxed bg-white/70 p-3.5 rounded-2xl animate-in fade-in duration-200">
          <p className="font-serif-italic text-sm text-[#0A1020] mb-1">
            “Good morning. Here is your verdict for the week: your warm outreach generated 4 qualified replies at $0 acquisition cost. Meanwhile, your generic social scheduling yielded zero clicks after 30 days. We recommend terminating those posts right now. That reclaims 3.5 hours for your weekend, plus $120 of software fees. Keep the warm emails; we’ve already drafted next Tuesday’s batch.”
          </p>
          <span className="text-[11px] text-[#64748B]">— Mark Voice Assistant</span>
        </div>
      )}
    </div>
  );
};
