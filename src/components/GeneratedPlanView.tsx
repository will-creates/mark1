import React, { useState } from 'react';
import { Check, Copy, Download, RefreshCw, Sparkles, ChevronDown, ChevronUp, Share2, Flame, ArrowRight } from 'lucide-react';
import { GeneratedPlan, PlanTrack, ActionItem } from '../types';

interface GeneratedPlanViewProps {
  plan: GeneratedPlan;
  onUpdatePlan: (updatedPlan: GeneratedPlan) => void;
  onReopenIntake: () => void;
}

export const GeneratedPlanView: React.FC<GeneratedPlanViewProps> = ({
  plan,
  onUpdatePlan,
  onReopenIntake
}) => {
  const [openTracks, setOpenTracks] = useState<Record<string, boolean>>({
    'track-1': true,
    'track-2': false,
    'track-3': false
  });
  const [copied, setCopied] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [streak, setStreak] = useState(1);

  const toggleTrack = (trackId: string) => {
    setOpenTracks(prev => ({
      ...prev,
      [trackId]: !prev[trackId]
    }));
  };

  const currentTodayTrack = plan.tracks.find(t => t.id === plan.todayTrackId) || plan.tracks[0];
  const currentTodayAction = currentTodayTrack.actions.find(a => a.id === plan.todayActionId) || currentTodayTrack.actions[0];
  const isTodayDone = !!plan.completedActions[currentTodayAction.id];

  const handleToggleTodayDone = () => {
    const nextState = !isTodayDone;
    const newCompleted = {
      ...plan.completedActions,
      [currentTodayAction.id]: nextState
    };

    onUpdatePlan({
      ...plan,
      completedActions: newCompleted
    });

    if (nextState) {
      setShowCelebration(true);
      setStreak(s => s + 1);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleToggleAction = (actionId: string) => {
    const nextState = !plan.completedActions[actionId];
    onUpdatePlan({
      ...plan,
      completedActions: {
        ...plan.completedActions,
        [actionId]: nextState
      }
    });
  };

  const handleSwapTodayAction = () => {
    // Find next uncompleted action across tracks
    const allActions: { trackId: string; actionId: string }[] = [];
    plan.tracks.forEach(t => {
      t.actions.forEach(a => {
        allActions.push({ trackId: t.id, actionId: a.id });
      });
    });

    const currentIndex = allActions.findIndex(item => item.actionId === plan.todayActionId);
    const nextItem = allActions[(currentIndex + 1) % allActions.length];

    onUpdatePlan({
      ...plan,
      todayTrackId: nextItem.trackId,
      todayActionId: nextItem.actionId
    });
  };

  const handleCopyPlan = () => {
    let text = `MARK MARKETING PLAN FOR ${plan.businessName.toUpperCase()}\n`;
    text += `Target Audience: ${plan.targetAudience}\n`;
    text += `Goal: ${plan.goal} in 30 days\n`;
    text += `Time: ${plan.timeCommitment} | Budget: ${plan.budgetTier}\n\n`;

    plan.tracks.forEach(t => {
      text += `[${t.type}] ${t.title}\n`;
      t.actions.forEach((a, i) => {
        const check = plan.completedActions[a.id] ? '[x]' : '[ ]';
        text += `  ${i + 1}. ${check} ${a.text}\n`;
      });
      text += '\n';
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadPlan = () => {
    let markdown = `# Mark Marketing Plan: ${plan.businessName}\n\n`;
    markdown += `**Target Audience**: ${plan.targetAudience}  \n`;
    markdown += `**Goal**: ${plan.goal} in 30 days  \n`;
    markdown += `**Time Capacity**: ${plan.timeCommitment} | **Budget**: ${plan.budgetTier}  \n\n`;
    markdown += `---\n\n`;

    plan.tracks.forEach(track => {
      markdown += `## ${track.title} (${track.type})\n`;
      markdown += `*${track.description}*\n\n`;
      track.actions.forEach((a, i) => {
        const checked = plan.completedActions[a.id] ? 'x' : ' ';
        markdown += `- [${checked}] ${a.text}\n`;
      });
      markdown += `\n`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mark-plan-${plan.businessName.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const completedCount = Object.values(plan.completedActions).filter(Boolean).length;
  const totalActionCount = plan.tracks.reduce((acc, t) => acc + t.actions.length, 0);

  return (
    <div className="w-full max-w-[1040px] mx-auto my-8 animate-in fade-in duration-300">
      <div className="bg-[#0E1525] border border-[#2F6BFF] rounded-3xl p-6 md:p-8 shadow-[0_16px_50px_rgba(47,107,255,0.12)]">
        {/* Top Header of the Plan */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1B2640]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2F6BFF]/20 text-[#9DBCFF] border border-[#2F6BFF]/30">
                Customized Blueprint
              </span>
              <span className="text-xs text-[#97A3BA]">
                Generated {new Date(plan.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#EEF2FB]">
              Marketing plan for <span className="text-[#9DBCFF]">{plan.businessName}</span>
            </h2>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyPlan}
              className="px-3.5 py-2 text-xs font-medium bg-[#131C31] hover:bg-[#1C2A48] border border-[#1B2640] text-[#EEF2FB] rounded-full flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to clipboard' : 'Copy plan'}</span>
            </button>
            <button
              onClick={handleDownloadPlan}
              className="px-3.5 py-2 text-xs font-medium bg-[#131C31] hover:bg-[#1C2A48] border border-[#1B2640] text-[#EEF2FB] rounded-full flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .md</span>
            </button>
            <button
              onClick={onReopenIntake}
              className="px-3.5 py-2 text-xs font-medium text-[#97A3BA] hover:text-white rounded-full border border-transparent hover:border-[#1B2640] flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Modify answers</span>
            </button>
          </div>
        </div>

        {/* Lead Summary */}
        <p className="mt-6 text-base md:text-lg text-[#EEF2FB] leading-relaxed max-w-[80ch]">
          For <strong className="text-white">{plan.businessName}</strong>, serving <strong className="text-white">{plan.targetAudience}</strong>, your goal is <strong className="text-[#9DBCFF]">{plan.goal}</strong> in 30 days. Sized for <strong className="text-white">{plan.timeCommitment}</strong> a week. {plan.budgetTier.includes('0') || plan.budgetTier.includes('Nothing') ? 'Every action below is free to run.' : `Budget allocated: ${plan.budgetTier}.`} Open any plan to see its daily moves.
        </p>

        {/* Progress Strip */}
        <div className="my-5 p-3.5 bg-[#060A14] border border-[#1B2640] rounded-2xl flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#97A3BA]">Execution progress:</span>
            <span className="font-semibold text-white">{completedCount} of {totalActionCount} actions completed</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#FFB547] font-semibold">
            <Flame className="w-4 h-4 fill-[#FFB547]" />
            <span>{streak}-day execution streak</span>
          </div>
        </div>

        {/* The 3 Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-start">
          {plan.tracks.map((track) => {
            const isOpen = openTracks[track.id];
            const isOffGrid = track.type === 'Off-grid';

            return (
              <div
                key={track.id}
                className={`rounded-2xl border transition-all ${
                  isOpen 
                    ? isOffGrid ? 'bg-[#0E1525] border-[#FFB547]/50 shadow-md' : 'bg-[#0E1525] border-[#2F6BFF] shadow-md' 
                    : 'bg-[#0E1525]/80 border-[#1B2640] hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleTrack(track.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-3"
                >
                  <div>
                    <span 
                      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-2 ${
                        isOffGrid 
                          ? 'bg-[#FFB547]/15 text-[#FFB547] border border-[#FFB547]/30' 
                          : 'bg-[#2F6BFF]/15 text-[#9DBCFF] border border-[#2F6BFF]/30'
                      }`}
                    >
                      {track.type}
                    </span>
                    <h3 className="text-base font-semibold text-[#EEF2FB] leading-snug">
                      {track.title}
                    </h3>
                  </div>
                  <div className="text-[#97A3BA] pt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 border-t border-[#1B2640]/50 mt-2">
                    <p className="text-xs text-[#97A3BA] mb-3 pt-3">
                      {track.description}
                    </p>
                    <ol className="space-y-2.5 text-xs md:text-sm text-[#EEF2FB]">
                      {track.actions.map((act, idx) => {
                        const isDone = !!plan.completedActions[act.id];
                        return (
                          <li 
                            key={act.id}
                            className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                              isDone 
                                ? 'bg-[#060A14] border-white/10 text-[#97A3BA] line-through' 
                                : 'bg-[#131C31]/50 border-[#1B2640] hover:border-white/20 text-[#EEF2FB]'
                            }`}
                            onClick={() => handleToggleAction(act.id)}
                          >
                            <span 
                              className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                                isDone 
                                  ? 'bg-[#2F6BFF] border-[#2F6BFF] text-white' 
                                  : 'border-[#566074]'
                              }`}
                            >
                              {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                            <span className="leading-snug">
                              {act.text}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Today Action Card */}
        <div className="mt-6 p-6 rounded-2xl bg-[#060A14] border border-[#2F6BFF] shadow-[0_4px_24px_rgba(47,107,255,0.18)] relative overflow-hidden">
          {showCelebration && (
            <div className="absolute inset-0 bg-[#2F6BFF]/20 backdrop-blur-[2px] flex items-center justify-center text-white font-semibold text-base animate-in fade-in duration-200 z-10 pointer-events-none">
              ✨ Nicely done! 1 action executed for today.
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-[#9DBCFF]">
                  Today: {currentTodayTrack.title}, Day 1
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-medium">
                  Priority move
                </span>
              </div>
              <p className="text-base md:text-lg font-medium text-[#EEF2FB] max-w-[54ch]">
                {currentTodayAction.text}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleSwapTodayAction}
                className="px-3.5 py-2.5 text-xs text-[#97A3BA] hover:text-white rounded-full border border-[#1B2640] hover:border-white/20 transition-colors"
                title="Only have 10 mins or want a different move today?"
              >
                Swap move
              </button>
              <button
                type="button"
                onClick={handleToggleTodayDone}
                className={`px-5 py-2.5 text-sm font-semibold rounded-full border transition-all ${
                  isTodayDone
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                    : 'bg-white text-[#0A1020] border-white hover:bg-[#EEF2FB] active:scale-95'
                }`}
              >
                {isTodayDone ? 'Done. Nice work.' : 'Mark as done'}
              </button>
            </div>
          </div>
        </div>

        {/* Read Sources preview if attached */}
        {(plan.sourceLinks.length > 0 || plan.sourceFiles.length > 0) && (
          <div className="mt-5 p-4 rounded-2xl border border-dashed border-[#1B2640] bg-[#2F6BFF]/5 text-xs text-[#EEF2FB]">
            <b className="block text-sm font-semibold text-[#9DBCFF] mb-1">
              Mark synthesized {plan.sourceLinks.length} link{plan.sourceLinks.length === 1 ? '' : 's'} and {plan.sourceFiles.length} file{plan.sourceFiles.length === 1 ? '' : 's'}
            </b>
            <p className="text-[#97A3BA] mb-2">
              Action steps have been calibrated with your brand voice, offerings, and domain context.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#97A3BA]">
              {plan.sourceLinks.map((l, i) => (
                <li key={`link-src-${i}`}>Verified domain: <span className="text-[#EEF2FB] font-medium">{l}</span></li>
              ))}
              {plan.sourceFiles.map((f, i) => (
                <li key={`file-src-${i}`}>Reference file: <span className="text-[#EEF2FB] font-medium">{f.name}</span></li>
              ))}
            </ul>
          </div>
        )}

        {/* Philosophy Footnote */}
        <p className="mt-5 text-xs text-[#97A3BA] max-w-[70ch] leading-relaxed">
          Mark proposes and you approve before anything goes out. Each week, tell Mark what happened and it will say what to keep, fix, and stop.
        </p>
      </div>
    </div>
  );
};
