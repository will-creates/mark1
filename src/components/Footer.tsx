import React from 'react';

export const Footer: React.FC<{ onStartPlan: () => void }> = ({ onStartPlan }) => {
  return (
    <footer className="text-center text-[#97A3BA] text-sm py-12 px-6 border-t border-[#1B2640] mt-12 bg-[#060A14]">
      <div className="max-w-[1080px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2F6BFF]" />
          <span className="font-semibold text-white">Mark</span>
          <span className="text-xs text-[#566074]">· Your marketing friend worldwide</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#97A3BA]">
          <a href="#loop" className="hover:text-white transition-colors">How it works</a>
          <a href="#tracks" className="hover:text-white transition-colors">Two tracks</a>
          <a href="#plans" className="hover:text-white transition-colors">Pricing</a>
          <a href="#verdict" className="hover:text-white transition-colors">Weekly verdict</a>
          <button 
            type="button" 
            onClick={onStartPlan} 
            className="text-[#9DBCFF] hover:underline"
          >
            Start free plan
          </button>
        </div>
      </div>

      <p className="mt-8 text-xs text-[#566074] max-w-[64ch] mx-auto">
        Designed for solo founders, bootstrappers, and freelancers who want clarity, not noise. Propose, approve, execute, and adjust.
      </p>
    </footer>
  );
};
