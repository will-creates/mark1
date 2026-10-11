import React, { useState } from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface DomainPlaybook {
  category: string;
  mainlineAction: string;
  mainlineChannels: string;
  offgridAction: string;
  offgridInspiration: string;
}

export const TwoTracksSection: React.FC<{ onStartPlan: () => void }> = ({ onStartPlan }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const domainExamples: DomainPlaybook[] = [
    {
      category: 'Artisanal Bakery & Food',
      mainlineAction: 'Local Google Business profile, Instagram morning pastry reels, and seasonal flyers in neighbor mailboxes.',
      mainlineChannels: 'Local SEO, Organic Social, Foot Traffic',
      offgridAction: 'Run Saturday morning releases like a Supreme streetwear drop: numbered pastry boxes, 48-hr SMS countdown, sold-out by 10 AM.',
      offgridInspiration: 'Borrowed from: Limited Luxury Fashion'
    },
    {
      category: 'B2B SaaS / Product',
      mainlineAction: 'Competitor comparison landing page, LinkedIn cold outreach with customized 1-min Loom teardowns.',
      mainlineChannels: 'Search Ads, Cold Email, Product-Led Growth',
      offgridAction: 'Remove the public sign-up form. Make it a private invite-only "Founding Chamber" with a 15-min interview with the builder.',
      offgridInspiration: 'Borrowed from: Exclusive Private Members Clubs'
    },
    {
      category: 'Creative Design Studio',
      mainlineAction: 'Behance portfolio showcase, weekly design tips on X, cold pitching marketing heads at funded startups.',
      mainlineChannels: 'Dribbble, Referrals, Cold InMail',
      offgridAction: 'Publish raw "Unsolicited Redesigns" directly tagging company CEOs, followed by an unlisted private video breakdown.',
      offgridInspiration: 'Borrowed from: Investigative Journalism'
    },
    {
      category: 'Specialty DTC Goods',
      mainlineAction: 'Meta & TikTok Retargeting Ads, automated abandoned cart discounts, and nano-influencer gifting.',
      mainlineChannels: 'Paid Social, Email Klaviyo, Affiliate',
      offgridAction: 'Send a handwritten wax-sealed letter to your 50 biggest dream buyers with an exclusive prototype only they can touch.',
      offgridInspiration: 'Borrowed from: Diplomatic Direct Mail'
    }
  ];

  const currentExample = domainExamples[activeCategory];

  return (
    <section id="tracks" className="bg-white text-[#0A1020] px-6 py-20 md:py-24 rounded-[32px] mx-3 my-6 shadow-sm">
      <div className="max-w-[1080px] mx-auto">
        <div className="max-w-[640px] mb-10">
          <span className="inline-flex items-center text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full bg-[#EEF4FF] text-[#2F6BFF] mb-3.5">
            Strategy Playbooks
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0A1020] leading-[1.12] mb-3">
            Two ways to market{' '}
            <span className="font-serif-italic text-[#2F6BFF] text-[1.08em]">
              the same product.
            </span>
          </h2>
          <p className="text-[#566074] text-base md:text-lg leading-relaxed">
            Every goal gets a plan built the usual way, and a plan built the way nobody in your category would.
          </p>
        </div>

        {/* Category switcher tabs */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-[#566074] uppercase tracking-wider mr-1 shrink-0">
            Preview by domain:
          </span>
          {domainExamples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveCategory(i)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all shrink-0 cursor-pointer ${
                activeCategory === i
                  ? 'bg-[#0A1020] text-white shadow-xs'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {ex.category}
            </button>
          ))}
        </div>

        {/* 2 Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mainline */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-8 flex flex-col justify-between hover:border-[#CBD5E1] transition-all">
            <div>
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF4FF] text-[#2F6BFF] border border-[#D6E4FF] mb-4">
                Mainline
              </span>
              <h3 className="text-2xl font-semibold text-[#0A1020] mb-3">
                How businesses like yours do it
              </h3>
              <p className="text-sm md:text-base text-[#566074] leading-relaxed mb-6">
                Proven channels, familiar moves, lower risk. Clear benchmarks and predictable steps tuned to your available weekly hours.
              </p>

              {/* Dynamic example */}
              <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F6BFF] block mb-1">
                  Example move for {currentExample.category}
                </span>
                <p className="text-sm font-medium text-[#1E293B]">
                  {currentExample.mainlineAction}
                </p>
                <div className="mt-2 text-xs text-[#64748B]">
                  Channels: {currentExample.mainlineChannels}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
              <span>Risk: Low to Moderate</span>
              <span>Predictability: High</span>
            </div>
          </div>

          {/* Off-grid */}
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-3xl p-8 flex flex-col justify-between hover:border-[#FCD34D] transition-all">
            <div>
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FCD34D] mb-4">
                Off-grid
              </span>
              <h3 className="text-2xl font-semibold text-[#0A1020] mb-3">
                How businesses unlike yours do it
              </h3>
              <p className="text-sm md:text-base text-[#566074] leading-relaxed mb-6">
                A playbook borrowed from another industry, adapted to you and tested small first. A bakery run like a streetwear drop, for example.
              </p>

              {/* Dynamic example */}
              <div className="p-4 bg-white rounded-2xl border border-[#FDE68A] mb-4 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] block mb-1">
                  {currentExample.offgridInspiration}
                </span>
                <p className="text-sm font-medium text-[#1E293B]">
                  {currentExample.offgridAction}
                </p>
                <div className="mt-2 text-xs text-[#B45309] font-medium">
                  Tested in small 48-hr batches with $0 downside.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#FDE68A] flex items-center justify-between text-xs text-[#92400E]">
              <span>Risk: Asymmetric (Capped loss, high upside)</span>
              <span>Memorability: Very High</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
