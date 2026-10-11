import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  quote: string;
  featured?: boolean;
  category: 'saas' | 'craft' | 'studio';
}

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'saas' | 'craft' | 'studio'>('all');

  const testimonials: Testimonial[] = [
    {
      name: 'Tomás Larson',
      role: 'Solo SaaS Founder',
      initials: 'TL',
      avatarBg: 'bg-[#2F6BFF]',
      quote: "“Since switching to Mark, my marketing stress disappeared completely. It feels like I'm finally executing with a weekly strategy, not just endless hope.”",
      category: 'saas'
    },
    {
      name: 'Sophia Kim',
      role: 'Ceramic Studio Owner',
      initials: 'SK',
      avatarBg: 'bg-[#F59E0B]',
      quote: "“Stopping our dead ad campaign freed up 4 hours a week and $450 every month. Mark paid for itself on day 12 by simply telling us what to drop.”",
      featured: true,
      category: 'craft'
    },
    {
      name: 'Marcus Adebayo',
      role: 'Design Consultant',
      initials: 'MA',
      avatarBg: 'bg-[#6366F1]',
      quote: "“The Off-grid track gave us a guerilla pop-up concept that beat all our standard newsletter blasts combined. Unmatched clarity.”",
      category: 'studio'
    }
  ];

  const filtered = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === filter);

  return (
    <section id="testimonials" className="mb-20">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-9">
        <div>
          <span className="inline-flex items-center text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full bg-[#EEF4FF] text-[#2F6BFF] mb-3">
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0A1020] leading-[1.12]">
            What our founders{' '}
            <span className="font-serif-italic text-[#2F6BFF] text-[1.08em]">
              are saying
            </span>
          </h2>
        </div>

        <p className="text-[#566074] text-base md:text-lg max-w-[44ch] leading-relaxed">
          Honest feedback from solo makers, bootstrappers, and freelance studios.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
            filter === 'all' ? 'bg-[#0A1020] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
          }`}
        >
          All founders
        </button>
        <button
          onClick={() => setFilter('saas')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
            filter === 'saas' ? 'bg-[#0A1020] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
          }`}
        >
          Solo SaaS
        </button>
        <button
          onClick={() => setFilter('craft')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
            filter === 'craft' ? 'bg-[#0A1020] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
          }`}
        >
          Physical Craft & DTC
        </button>
        <button
          onClick={() => setFilter('studio')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
            filter === 'studio' ? 'bg-[#0A1020] text-white' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
          }`}
        >
          Studios & Agencies
        </button>
      </div>

      {/* Testimonials 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-7 flex flex-col justify-between gap-6 transition-all ${
              item.featured
                ? 'bg-white border-2 border-[#2F6BFF] shadow-[0_10px_30px_rgba(47,107,255,0.12)]'
                : 'bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1]'
            }`}
          >
            <p className="text-base text-[#1E293B] leading-relaxed">
              {item.quote}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]/70">
              <div className={`w-11 h-11 rounded-full ${item.avatarBg} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}>
                {item.initials}
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#0A1020]">
                  {item.name}
                </h4>
                <p className="text-xs text-[#64748B]">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
