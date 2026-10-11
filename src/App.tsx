import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IntakeModal } from './components/IntakeModal';
import { GeneratedPlanView } from './components/GeneratedPlanView';
import { ApproachSection } from './components/ApproachSection';
import { ZeroGuessworkSection } from './components/ZeroGuessworkSection';
import { TwoTracksSection } from './components/TwoTracksSection';
import { VerdictSection } from './components/VerdictSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AudioBriefingWidget } from './components/AudioBriefingWidget';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { IntakeAnswers, GeneratedPlan } from './types';
import { generateSmartPlan } from './utils/planGenerator';
import { ArrowRight, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'mark_marketing_plan_v1';

export default function App() {
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [intakeInitialStep, setIntakeInitialStep] = useState(0);
  const [currentPlan, setCurrentPlan] = useState<GeneratedPlan | null>(null);
  const planSectionRef = useRef<HTMLDivElement>(null);

  // Load saved plan from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCurrentPlan(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleOpenIntake = (step: number = 0) => {
    setIntakeInitialStep(step);
    setIsIntakeOpen(true);
  };

  const handlePlanSubmit = (answers: IntakeAnswers) => {
    const newPlan = generateSmartPlan(answers);
    setCurrentPlan(newPlan);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlan));
    } catch {
      // Ignore
    }

    // Scroll to plan view smoothly
    setTimeout(() => {
      planSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleUpdatePlan = (updatedPlan: GeneratedPlan) => {
    setCurrentPlan(updatedPlan);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlan));
    } catch {
      // Ignore
    }
  };

  const handleScrollToPlan = () => {
    planSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectPricingPlan = (tierName: string) => {
    if (tierName === 'Free' || tierName === 'Growth') {
      handleOpenIntake(0);
    } else {
      // Pro contact sales toast / intake
      handleOpenIntake(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#060A14] text-[#EEF2FB] selection:bg-[#2F6BFF] selection:text-white flex flex-col justify-between">
      {/* Top Header */}
      <Header
        onStartPlan={() => handleOpenIntake(0)}
        hasActivePlan={!!currentPlan}
        onScrollToPlan={handleScrollToPlan}
      />

      {/* Hero Container */}
      <main id="top" className="flex-1 w-full max-w-[1240px] mx-auto px-1 sm:px-2">
        <HeroSection onStartPlan={handleOpenIntake} />

        {/* Generated Plan Section Anchor */}
        <div ref={planSectionRef}>
          {currentPlan && (
            <GeneratedPlanView
              plan={currentPlan}
              onUpdatePlan={handleUpdatePlan}
              onReopenIntake={() => handleOpenIntake(0)}
            />
          )}
        </div>

        {/* Section: The Approach */}
        <ApproachSection onStartPlan={() => handleOpenIntake(0)} />

        {/* Section: Zero Guesswork */}
        <ZeroGuessworkSection onExplore={() => handleOpenIntake(0)} />

        {/* Section: Two Tracks */}
        <TwoTracksSection onStartPlan={() => handleOpenIntake(0)} />

        {/* Section: Weekly Verdict */}
        <VerdictSection />

        {/* Lower Light Section Wrapper matching design */}
        <div 
          id="lightBottom" 
          className="bg-white text-[#0A1020] rounded-[36px] mx-3 my-8 px-6 py-16 md:py-20 shadow-sm"
        >
          <div className="max-w-[1080px] mx-auto">
            {/* Customer Stories */}
            <TestimonialsSection />

            {/* Interactive Hey Mark Voice Demo */}
            <AudioBriefingWidget />

            {/* Pricing Section */}
            <PricingSection onSelectPlan={handleSelectPricingPlan} />

            {/* Final Call to Action */}
            <section className="pt-10 pb-6 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0A1020] max-w-[22ch] mx-auto mb-4 leading-[1.12]">
                Ready for a marketing friend{' '}
                <span className="font-serif-italic text-[#2F6BFF] text-[1.08em]">
                  who tells the truth?
                </span>
              </h2>

              <p className="text-[#566074] text-base md:text-lg max-w-[48ch] mx-auto mb-7 leading-relaxed">
                Takes 2 minutes. Receive your actionable marketing plan instantly.
              </p>

              <button
                type="button"
                onClick={() => handleOpenIntake(0)}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#2F6BFF] hover:bg-[#2558d4] rounded-full shadow-[0_10px_28px_rgba(47,107,255,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Start my plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onStartPlan={() => handleOpenIntake(0)} />

      {/* Guided Intake Dialog Modal */}
      <IntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onSubmit={handlePlanSubmit}
        initialAnswers={currentPlan ? {
          what: currentPlan.businessName,
          who: currentPlan.targetAudience,
          goal: currentPlan.goal,
          time: currentPlan.timeCommitment,
          money: currentPlan.budgetTier,
          links: currentPlan.sourceLinks,
          files: currentPlan.sourceFiles
        } : undefined}
      />
    </div>
  );
}
