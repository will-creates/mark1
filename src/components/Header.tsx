import React, { useState } from 'react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onStartPlan: () => void;
  hasActivePlan: boolean;
  onScrollToPlan: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartPlan, hasActivePlan, onScrollToPlan }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full max-w-[1080px] mx-auto px-4 pt-4 pb-2">
      <nav className="flex items-center justify-between py-2 border-b border-white/5 md:border-none">
        {/* Brand Zone */}
        <a 
          href="#top" 
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#EEF2FB] hover:opacity-90 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#2F6BFF] shadow-[0_0_12px_#2F6BFF]" />
          <span>Mark</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#97A3BA]">
          <a href="#loop" className="hover:text-[#EEF2FB] transition-colors py-1">How it works</a>
          <a href="#tracks" className="hover:text-[#EEF2FB] transition-colors py-1">Two tracks</a>
          <a href="#plans" className="hover:text-[#EEF2FB] transition-colors py-1">Pricing</a>
          <a href="#verdict" className="hover:text-[#EEF2FB] transition-colors py-1">Verdict</a>
          <a href="#testimonials" className="hover:text-[#EEF2FB] transition-colors py-1">Stories</a>
        </div>

        {/* Primary Action Button */}
        <div className="hidden md:flex items-center gap-3">
          {hasActivePlan && (
            <button
              onClick={onScrollToPlan}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#9DBCFF] bg-[#2F6BFF]/15 border border-[#2F6BFF]/30 rounded-full hover:bg-[#2F6BFF]/25 transition-all"
            >
              View Active Plan
            </button>
          )}
          <button
            onClick={onStartPlan}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#2F6BFF] hover:bg-[#2558d4] rounded-full shadow-[0_4px_18px_rgba(47,107,255,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5"
          >
            <span>Start free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#97A3BA] hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-[#0E1525] border border-[#1B2640] rounded-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <a 
            href="#loop" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#EEF2FB] py-2 border-b border-[#1B2640]/50"
          >
            How it works
          </a>
          <a 
            href="#tracks" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#EEF2FB] py-2 border-b border-[#1B2640]/50"
          >
            Two tracks
          </a>
          <a 
            href="#plans" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#EEF2FB] py-2 border-b border-[#1B2640]/50"
          >
            Pricing
          </a>
          <a 
            href="#verdict" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#EEF2FB] py-2 border-b border-[#1B2640]/50"
          >
            Verdict
          </a>
          <a 
            href="#testimonials" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#EEF2FB] py-2 border-b border-[#1B2640]/50"
          >
            Founder Stories
          </a>
          
          <div className="pt-2 flex flex-col gap-2">
            {hasActivePlan && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToPlan();
                }}
                className="w-full py-2.5 text-xs font-semibold text-[#9DBCFF] bg-[#2F6BFF]/15 border border-[#2F6BFF]/30 rounded-full"
              >
                View Active Plan
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartPlan();
              }}
              className="w-full py-3 text-sm font-semibold text-white bg-[#2F6BFF] rounded-full shadow-md text-center"
            >
              Start free plan →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
