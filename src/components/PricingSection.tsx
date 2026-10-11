import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'CAD'>('USD');

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'CA$'
  };

  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36
  };

  const symbol = currencySymbols[currency];
  const rate = rates[currency];

  const calcPrice = (baseUsd: number) => {
    if (baseUsd === 0) return 0;
    const discounted = billingCycle === 'annual' ? baseUsd * 0.8 : baseUsd;
    return Math.round(discounted * rate);
  };

  return (
    <section id="plans" className="mb-20">
      <div className="text-center max-w-[680px] mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0A1020] leading-[1.12] mb-3">
          Start free.{' '}
          <span className="font-serif-italic text-[#2F6BFF] text-[1.08em]">
            Grow when you are ready.
          </span>
        </h2>
        <p className="text-[#566074] text-base md:text-lg leading-relaxed mb-6">
          Free runs the whole loop by hand. Paid plans automate it. Pricing is localized to where you live.
        </p>

        {/* Currency & Billing Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Billing Toggle */}
          <div className="bg-[#F1F5F9] p-1 rounded-full flex items-center border border-[#E2E8F0]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-[#0A1020] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-[#2F6BFF] text-white shadow-xs' : 'text-[#64748B]'
              }`}
            >
              <span>Annual</span>
              <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                -20%
              </span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-1 rounded-full text-xs text-[#64748B]">
            <span>Currency:</span>
            {(['USD', 'EUR', 'GBP', 'CAD'] as const).map(c => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                  currency === c ? 'bg-[#0A1020] text-white' : 'hover:text-[#0A1020]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Tier 1: Free */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-8 flex flex-col justify-between hover:border-[#CBD5E1] transition-all">
          <div>
            <h3 className="text-2xl font-semibold text-[#0A1020] mb-1">
              Free
            </h3>
            <p className="text-sm text-[#64748B] mb-5">
              The full loop, by hand.
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-[#0A1020]">{symbol}0</span>
              <span className="text-xs text-[#64748B] ml-1.5 font-medium">/ forever</span>
            </div>

            <ul className="space-y-3 text-sm text-[#334155]">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2F6BFF] shrink-0" />
                <span>Plans on both tracks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2F6BFF] shrink-0" />
                <span>Today action and weekly verdict</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2F6BFF] shrink-0" />
                <span>Voice guide and exports</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlan('Free')}
            className="mt-8 w-full py-3.5 px-4 text-sm font-semibold text-[#0A1020] bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded-full transition-all cursor-pointer text-center"
          >
            Choose Free
          </button>
        </div>

        {/* Tier 2: Growth (Most Popular) */}
        <div className="bg-white border-2 border-[#2F6BFF] rounded-3xl p-8 flex flex-col justify-between shadow-[0_16px_36px_rgba(47,107,255,0.14)] relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2F6BFF] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Most Popular
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#0A1020] mt-1 mb-1">
              Growth
            </h3>
            <p className="text-sm text-[#64748B] mb-5">
              The loop, automated.
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-[#0A1020]">
                {symbol}{calcPrice(29)}
              </span>
              <span className="text-xs text-[#64748B] ml-1.5 font-medium">
                / month {billingCycle === 'annual' ? '(billed yearly)' : ''}
              </span>
            </div>

            <ul className="space-y-3 text-sm text-[#334155]">
              <li className="flex items-center gap-2.5 font-medium text-[#0A1020]">
                <Check className="w-4 h-4 text-[#2F6BFF] shrink-0" />
                <span>Voice chat and Hey Mark</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2F6BFF] shrink-0" />
                <span>Direct results from social & sales tools</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2F6BFF] shrink-0" />
                <span>Calendar and Docs live connections</span>
              </li>
              <li className="flex items-center gap-2.5 text-[#64748B] text-xs">
                <Check className="w-3.5 h-3.5 text-[#2F6BFF] shrink-0" />
                <span>Automatic Friday verdict generation</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlan('Growth')}
            className="mt-8 w-full py-3.5 px-4 text-sm font-semibold text-white bg-[#2F6BFF] hover:bg-[#2558d4] rounded-full shadow-[0_8px_20px_rgba(47,107,255,0.35)] transition-all cursor-pointer text-center"
          >
            Start 14-day trial
          </button>
        </div>

        {/* Tier 3: Pro */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-8 flex flex-col justify-between hover:border-[#CBD5E1] transition-all">
          <div>
            <h3 className="text-2xl font-semibold text-[#0A1020] mb-1">
              Pro
            </h3>
            <p className="text-sm text-[#64748B] mb-5">
              For more than one business.
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-[#0A1020]">
                {symbol}{calcPrice(79)}
              </span>
              <span className="text-xs text-[#64748B] ml-1.5 font-medium">
                / month {billingCycle === 'annual' ? '(billed yearly)' : ''}
              </span>
            </div>

            <ul className="space-y-3 text-sm text-[#334155]">
              <li className="flex items-center gap-2.5 font-medium text-[#0A1020]">
                <Check className="w-4 h-4 text-[#2F6BFF] shrink-0" />
                <span>Multiple businesses or clients</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2F6BFF] shrink-0" />
                <span>Team seats and shared permissions</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#2F6BFF] shrink-0" />
                <span>Shareable strategy packs and white-label</span>
              </li>
              <li className="flex items-center gap-2.5 text-[#64748B] text-xs">
                <Check className="w-3.5 h-3.5 text-[#2F6BFF] shrink-0" />
                <span>Dedicated strategy advisor review</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlan('Pro')}
            className="mt-8 w-full py-3.5 px-4 text-sm font-semibold text-[#0A1020] bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded-full transition-all cursor-pointer text-center"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};
