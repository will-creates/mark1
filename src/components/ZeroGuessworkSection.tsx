import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const ZeroGuessworkSection: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');

  const items = [
    {
      icon: '📋',
      title: 'Too many ideas',
      problem: 'Long lists, no ranking, and no sense of where to start your day.',
      solution: 'One single calibrated move per day. Sized strictly to your available 15–20 min window.'
    },
    {
      icon: '⏱️',
      title: 'No cost view',
      problem: 'You cannot see what each option costs in real budget and hours.',
      solution: 'Explicit hourly budgets and cash expenditure projected before you commit to any move.'
    },
    {
      icon: '🛑',
      title: 'No feedback',
      problem: 'Without an honest weekly read, you keep paying for dead campaigns.',
      solution: 'Friday verdicts that unashamedly kill dead campaigns and give you your hours and money back.'
    }
  ];

  return (
    <section className="bg-[#050914] text-[#EEF2FB] rounded-[32px] mx-3 my-8 px-6 py-16 md:py-20 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
      {/* Subtle radial background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2F6BFF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1080px] mx-auto relative z-10">
        <div className="text-center max-w-[760px] mx-auto mb-12">
          <span className="inline-flex items-center text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#FFB547]/15 text-[#FFB547] border border-[#FFB547]/30 mb-4">
            Zero Guesswork
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#EEF2FB] leading-[1.1] mb-4">
            Full control{' '}
            <span className="font-serif-italic text-[#BCD2FF] text-[1.08em]">
              is in your hands.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#EEF2FB]/80 max-w-[58ch] mx-auto leading-relaxed mb-8">
            Every goal gets a plan built the usual way, and a plan built the way nobody in your category would. You stay in charge and approve everything before execution.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onExplore}
              className="px-6 py-3 text-sm font-semibold text-[#0A1020] bg-white hover:bg-[#EEF2FB] rounded-full shadow-[0_4px_16px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Explore plan builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#0E1525] p-1 rounded-full border border-[#1B2640] flex items-center gap-1">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeTab === 'problem' ? 'bg-[#1B2640] text-white shadow-xs' : 'text-[#97A3BA] hover:text-white'
              }`}
            >
              Standard marketing pitfalls
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1 ${
                activeTab === 'solution' ? 'bg-[#2F6BFF] text-white shadow-xs' : 'text-[#97A3BA] hover:text-white'
              }`}
            >
              <Check className="w-3 h-3" />
              <span>How Mark solves it</span>
            </button>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0E1525] border border-[#1B2640] hover:border-[#2F6BFF]/40 rounded-2xl p-6 transition-all shadow-sm"
            >
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-[#EEF2FB] mb-2">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#97A3BA]">
                {activeTab === 'problem' ? item.problem : item.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
