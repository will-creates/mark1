import React from 'react';
import { ArrowRight, Zap, Check } from 'lucide-react';

interface HeroSectionProps {
  onStartPlan: (stepIndex?: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartPlan }) => {
  const chips = [
    { label: 'What you sell', step: 0 },
    { label: 'Who it is for', step: 1 },
    { label: 'Your goal', step: 2 },
    { label: 'Budget', step: 3 },
    { label: 'Weekly time', step: 4 },
    { label: 'Links and files', step: 5 }
  ];

  return (
    <div className="relative overflow-hidden isolate mx-3 my-3 rounded-[28px] bg-[#050914] text-[#EEF2FB] px-6 py-6 md:py-12 md:px-8 border border-white/5">
      {/* Background Ambient Glows */}
      <div 
        className="absolute -left-12 -bottom-24 w-[70vw] max-w-[720px] h-[50vw] max-h-[500px] rounded-full bg-[#2F6BFF]/35 blur-[80px] pointer-events-none -z-10 animate-hero-drift-1" 
      />
      <div 
        className="absolute -right-8 -bottom-16 w-[50vw] max-w-[500px] h-[40vw] max-h-[400px] rounded-full bg-[#8FB6FF]/25 blur-[90px] pointer-events-none -z-10 animate-hero-drift-2" 
      />

      <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Column: Rule of Thirds Hero Visual with Founder & Floating HUD */}
        <div className="relative rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)] border border-white/15 min-h-[540px] flex flex-col justify-between p-7 bg-[#070E1C]">
          {/* Founder Photo */}
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1UH1vOXbu9K27kobqgJ7MrhSYtnK4xLTeNNJmsX7jdeoCzCvM-ZTzBlCAvBgiu9WK6-QFUj1ynkrt5GWNVRu59AJeEMgrqCtHt6VJuGHVrK7YZ93Cpr2qPXPHL7dQRpPwRF_mXDI4kBcDED9pbOVEgROpXObrU4lSB0RnuSDjulfgxUcSPzqRTPvUzY2jJZ1Z2BG_CDmxHcCr2quBHmjmHhJwJ7W0ECgLK6zxvgLnhOpSkS9JdVpDthWqw"
            alt="Founder looking up thoughtfully with floating ambient marketing guidance"
            className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.96]"
            style={{ objectPosition: '72% 18%' }}
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Gradients to keep face visible while making typography legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060A14]/25 via-[#060A14]/15 via-50% to-[#060A14]/95 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060A14]/80 via-[#060A14]/30 to-transparent z-[1]" />

          {/* Top Left: Subtle Floating Pill */}
          <div className="relative z-10 self-start">
            <span className="inline-flex items-center text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md bg-[#0E1525]/75 border border-white/25 text-[#BCD2FF] shadow-sm">
              Your marketing friend
            </span>
          </div>

          {/* Lower Third: Headline & HUD Chips */}
          <div className="relative z-10 flex flex-col gap-4 mt-auto">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.08] tracking-tight font-medium drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
                <span className="block text-white font-semibold">Marketing</span>
                <span className="block text-white font-semibold">that tells you</span>
                <span className="block font-serif-italic text-[#BCD2FF] text-[1.12em] mt-0.5">
                  what to do next.
                </span>
              </h1>
            </div>

            {/* Floating HUD Glass Cards */}
            <div className="flex flex-col gap-2.5">
              <div className="backdrop-blur-xl bg-[#0E1525]/85 border border-white/20 rounded-2xl p-3 px-4 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <span className="text-xs text-[#97A3BA]">Weekly verdict</span>
                <span className="font-semibold text-emerald-400 text-sm">$14.20 / lead</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FFB547]/15 text-[#FFB547] border border-[#FFB547]/30">
                  Freed 3.5 hrs
                </span>
              </div>

              <div className="backdrop-blur-xl bg-[#0E1525]/85 border border-[#2F6BFF]/40 rounded-2xl p-2.5 px-4 flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <Zap className="w-4 h-4 text-[#FFB547] shrink-0" />
                <span className="text-xs font-medium text-[#EEF2FB]">
                  Today action: 15 min warm intro drafted
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Copy & Interactive Intake Launcher */}
        <div className="flex flex-col justify-center gap-5 lg:pl-4">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-3 text-xs md:text-sm text-[#EEF2FB]/80">
            <div className="flex -space-x-2">
              <span className="w-7 h-7 rounded-full bg-[#2F6BFF] text-white flex items-center justify-center text-[10px] font-bold border-2 border-[#060A14]">
                JS
              </span>
              <span className="w-7 h-7 rounded-full bg-[#FFB547] text-[#060A14] flex items-center justify-center text-[10px] font-bold border-2 border-[#060A14]">
                MR
              </span>
              <span className="w-7 h-7 rounded-full bg-[#9DBCFF] text-[#060A14] flex items-center justify-center text-[10px] font-bold border-2 border-[#060A14]">
                AL
              </span>
            </div>
            <span className="font-medium text-[#97A3BA]">
              Trusted by 10,000+ solo founders
            </span>
          </div>

          {/* Main Title with Italic Serif */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#EEF2FB] leading-[1.12]">
            The growth of your business{' '}
            <span className="font-serif-italic text-[#9DBCFF] font-normal block sm:inline">
              starts here.
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#EEF2FB]/80 max-w-[48ch] leading-relaxed">
            Tell Mark about your business. Get one clear plan, one small action a day, and an honest weekly read on what is working. No marketing fluff.
          </p>

          {/* Glass Intake Box */}
          <div className="p-6 rounded-3xl bg-white/[0.08] border border-white/20 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.2)] mt-1">
            <p className="text-base font-semibold text-[#EEF2FB] mb-3">
              Six quick questions, then your customized plan
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {chips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onStartPlan(chip.step)}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 text-[#EEF2FB] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-left"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/15">
              <small className="text-xs md:text-sm text-[#EEF2FB]/70 max-w-[280px]">
                Takes 2 minutes. Skip anything you're unsure about.
              </small>

              <button
                type="button"
                onClick={() => onStartPlan(0)}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#2F6BFF] hover:bg-[#2558d4] rounded-full shadow-[0_8px_24px_rgba(47,107,255,0.4)] transition-all hover:translate-x-0.5 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Start my plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
