import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const ApproachSection: React.FC<{ onStartPlan: () => void }> = ({ onStartPlan }) => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps = [
    {
      num: 1,
      title: 'Decide',
      icon: '🔷',
      badgeColor: 'bg-[#2F6BFF]',
      iconBg: 'bg-[#EEF4FF]',
      iconBorder: 'border-[#D6E4FF]',
      desc: 'One goal becomes three sub-plans, each calculated with its cost and likely return.',
      detail: 'Instead of endless brainstorming, Mark evaluates your time capacity and spits out 2 proven playbooks and 1 unconventional category move.'
    },
    {
      num: 2,
      title: 'Do',
      icon: '⚡',
      badgeColor: 'bg-[#EA580C]',
      iconBg: 'bg-[#FFF7ED]',
      iconBorder: 'border-[#FED7AA]',
      desc: 'Each day, one small action, drafted in your authentic voice and sized for your calendar.',
      detail: 'Actions take 10 to 20 minutes max. Drafted copy, specific recipient lists, and direct links so you never stare at a blank screen.'
    },
    {
      num: 3,
      title: 'Learn',
      icon: '🧭',
      badgeColor: 'bg-[#4F46E5]',
      iconBg: 'bg-[#EEF2FF]',
      iconBorder: 'border-[#C7D2FE]',
      desc: 'Once a week, tell Mark what happened. It works out your cost per result automatically.',
      detail: 'Spend 3 minutes on Friday inputting replies, signups, or sales. Mark maps exact attribution and cost-per-lead.'
    },
    {
      num: 4,
      title: 'Adjust',
      icon: '🎯',
      badgeColor: 'bg-[#16A34A]',
      iconBg: 'bg-[#F0FDF4]',
      iconBorder: 'border-[#BBF7D0]',
      desc: 'Keep, fix, or stop. Mark points out what to drop and exactly how much capital and time that frees up.',
      detail: 'Zero shame for low numbers. Mark celebrates killing zombie campaigns so your precious hours go to high-conviction moves.'
    }
  ];

  return (
    <section id="loop" className="bg-white text-[#0A1020] px-6 py-20 md:py-24 rounded-[32px] mx-3 my-6 shadow-sm">
      <div className="max-w-[1080px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[820px] mx-auto mb-14">
          <span className="inline-flex items-center text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full bg-[#EEF4FF] text-[#2F6BFF] mb-4">
            ✨ The Approach
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0A1020] leading-[1.14] mb-4">
            A simple approach to the{' '}
            <span className="font-serif-italic text-[#2F6BFF] text-[1.08em]">
              complex world of marketing
            </span>
          </h2>
          <p className="text-[#566074] text-base md:text-lg max-w-[54ch] mx-auto leading-relaxed">
            Mark does not hand you a pile of ideas. It decides, prepares your day, learns from your results, and adjusts automatically.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st) => {
            const isExpanded = selectedStep === st.num;

            return (
              <div
                key={st.num}
                onClick={() => setSelectedStep(isExpanded ? null : st.num)}
                className={`relative overflow-hidden bg-[#F8FAFC] border rounded-3xl p-6 transition-all cursor-pointer hover:shadow-md ${
                  isExpanded ? 'border-[#2F6BFF] ring-2 ring-[#2F6BFF]/20 bg-[#F0F7FF]' : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                {/* Step number badge */}
                <span className={`absolute top-5 right-5 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center ${st.badgeColor}`}>
                  {st.num}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl ${st.iconBg} border ${st.iconBorder} flex items-center justify-center text-2xl mb-5 shadow-xs`}>
                  {st.icon}
                </div>

                <h3 className="text-xl font-semibold text-[#0A1020] mb-2">
                  {st.title}
                </h3>

                <p className="text-sm text-[#566074] leading-relaxed mb-3">
                  {st.desc}
                </p>

                {isExpanded && (
                  <div className="pt-3 border-t border-[#CBD5E1]/60 text-xs text-[#1E293B] bg-white/70 p-2.5 rounded-xl animate-in fade-in duration-200">
                    <strong className="text-[#2F6BFF] block mb-1">How Mark does this:</strong>
                    {st.detail}
                  </div>
                )}

                <div className="mt-2 text-[11px] font-semibold text-[#2F6BFF] flex items-center gap-1">
                  <span>{isExpanded ? 'Hide details' : 'Click to preview'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
