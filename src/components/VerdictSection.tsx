import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, XCircle, ArrowUpRight } from 'lucide-react';
import { VerdictChannel } from '../types';

export const VerdictSection: React.FC = () => {
  const [channels, setChannels] = useState<VerdictChannel[]>([
    {
      id: 'c1',
      name: 'Warm emails',
      status: 'keep',
      note: '4 replies from 10 sends. Sized well for 15 min daily.',
      hoursPerWeek: 1.5,
      costPerMonth: 0,
      leadsGenerated: 4
    },
    {
      id: 'c2',
      name: 'Drop announcement',
      status: 'fix',
      note: 'Great clicks, checkout dropped. Shorten the order form.',
      hoursPerWeek: 2.0,
      costPerMonth: 35,
      leadsGenerated: 2
    },
    {
      id: 'c3',
      name: 'Generic social posts',
      status: 'stop',
      note: 'Stop this and free up 3.5 hours. Zero attribution after 30 days.',
      hoursPerWeek: 3.5,
      costPerMonth: 120,
      leadsGenerated: 0
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newHours, setNewHours] = useState('2');
  const [newCost, setNewCost] = useState('50');

  // Calculate dynamic stats
  const stoppedChannels = channels.filter(c => c.status === 'stop');
  const totalFreedHours = stoppedChannels.reduce((acc, c) => acc + c.hoursPerWeek, 0);
  const totalFreedCost = stoppedChannels.reduce((acc, c) => acc + c.costPerMonth, 0);

  const activeChannels = channels.filter(c => c.status !== 'stop');
  const totalLeads = activeChannels.reduce((acc, c) => acc + c.leadsGenerated, 0);
  const totalActiveCost = activeChannels.reduce((acc, c) => acc + c.costPerMonth, 0);

  const dynamicCpa = totalLeads > 0 
    ? (totalActiveCost > 0 ? (totalActiveCost / totalLeads).toFixed(2) : '0.00') 
    : '14.20';

  const cycleStatus = (id: string) => {
    setChannels(prev => prev.map(c => {
      if (c.id !== id) return c;
      const nextStatus: Record<'keep' | 'fix' | 'stop', 'keep' | 'fix' | 'stop'> = {
        keep: 'fix',
        fix: 'stop',
        stop: 'keep'
      };
      const newSt = nextStatus[c.status];
      let newNote = c.note;
      if (newSt === 'keep') newNote = 'Performing well. Maintain steady weekly pace.';
      if (newSt === 'fix') newNote = 'High interest, conversion friction. Tweak offer copy.';
      if (newSt === 'stop') newNote = `Dead weight. Terminate immediately to reclaim ${c.hoursPerWeek} hrs/wk.`;
      return { ...c, status: newSt, note: newNote };
    }));
  };

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelName.trim()) return;

    const parsedHours = parseFloat(newHours) || 1;
    const parsedCost = parseFloat(newCost) || 0;

    setChannels(prev => [
      ...prev,
      {
        id: 'c_' + Date.now(),
        name: newChannelName.trim(),
        status: 'stop',
        note: `Stopped experiment. Frees up ${parsedHours} hours and $${parsedCost}/mo.`,
        hoursPerWeek: parsedHours,
        costPerMonth: parsedCost,
        leadsGenerated: 0
      }
    ]);

    setNewChannelName('');
    setShowAddModal(false);
  };

  const removeChannel = (id: string) => {
    if (channels.length <= 1) return;
    setChannels(prev => prev.filter(c => c.id !== id));
  };

  return (
    <section id="verdict" className="bg-[#060A14] text-[#EEF2FB] px-6 py-20 md:py-24 rounded-[32px] mx-3 my-6 border border-[#1B2640]">
      <div className="max-w-[1080px] mx-auto">
        <div className="max-w-[680px] mb-10">
          <span className="inline-flex items-center text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-[#2F6BFF]/15 text-[#9DBCFF] border border-[#2F6BFF]/30 mb-3.5">
            Accountability
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#EEF2FB] leading-[1.1] mb-3.5">
            Weekly verdict{' '}
            <span className="font-serif-italic text-[#9DBCFF] text-[1.08em]">
              and freed up time.
            </span>
          </h2>
          <p className="text-[#97A3BA] text-base md:text-lg leading-relaxed">
            Never shame low results. Frame stopping an unproductive campaign as pure relief: reclaim your budget and hours.
          </p>
        </div>

        {/* Verdict Box */}
        <div className="bg-[#0E1525] border border-[#1E293B] rounded-3xl p-6 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-[#1E293B]/80">
            <div>
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#FFB547]/15 text-[#FFB547] border border-[#FFB547]/30 mb-2">
                Weekly review
              </span>
              <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#4ADE80] tracking-tight tabular-nums my-1">
                ${dynamicCpa}
              </div>
              <p className="text-sm text-[#97A3BA]">
                Cost per confirmed client acquisition (down 24% this week)
              </p>
            </div>

            <div className="sm:text-right">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#FFB547]/15 text-[#FFB547] border border-[#FFB547]/30 mb-2">
                {stoppedChannels.length > 0 ? `Stopped ${stoppedChannels.length} inactive channel${stoppedChannels.length === 1 ? '' : 's'}` : 'Zero dead weight'}
              </span>
              <p className="text-lg md:text-xl font-semibold text-[#FFB547] tabular-nums">
                Freed up {totalFreedHours.toFixed(1)} hours & ${totalFreedCost}/mo
              </p>
              <p className="text-xs text-[#97A3BA] mt-1">
                Reclaimed into your core high-performing moves
              </p>
            </div>
          </div>

          {/* Interactive Channel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {channels.map((chan) => {
              const isKeep = chan.status === 'keep';
              const isFix = chan.status === 'fix';
              const isStop = chan.status === 'stop';

              return (
                <div
                  key={chan.id}
                  className={`bg-[#131C31] border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                    isKeep 
                      ? 'border-[#2F6BFF]/40 shadow-xs' 
                      : isFix 
                        ? 'border-[#FFB547]/40 shadow-xs' 
                        : 'border-[#EF4444]/40 bg-[#161224]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold text-[#EEF2FB] truncate">
                        {chan.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => cycleStatus(chan.id)}
                        title="Click to cycle status: Keep -> Fix -> Stop"
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border cursor-pointer transition-transform active:scale-95 ${
                          isKeep
                            ? 'bg-[#2F6BFF]/20 text-[#9DBCFF] border-[#2F6BFF]/40'
                            : isFix
                              ? 'bg-[#FFB547]/20 text-[#FFB547] border-[#FFB547]/40'
                              : 'bg-[#EF4444]/20 text-[#FCA5A5] border-[#EF4444]/40'
                        }`}
                      >
                        {chan.status.toUpperCase()}
                      </button>
                    </div>

                    <p className="text-xs md:text-sm text-[#97A3BA] leading-relaxed mb-4">
                      {chan.note}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#97A3BA]">
                    <span>{chan.hoursPerWeek}h/wk · ${chan.costPerMonth}/mo</span>
                    <button
                      type="button"
                      onClick={() => cycleStatus(chan.id)}
                      className="text-[#9DBCFF] hover:underline cursor-pointer"
                    >
                      Cycle status
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Channel Simulator Trigger */}
          <div className="mt-6 pt-4 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#97A3BA]">
              💡 Tip: Click on any status badge (<span className="text-[#9DBCFF]">KEEP</span>, <span className="text-[#FFB547]">FIX</span>, <span className="text-red-400">STOP</span>) to see how stopping dead campaigns immediately frees up hours.
            </p>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-xs font-semibold text-[#EEF2FB] bg-[#1E293B] hover:bg-[#25344D] border border-white/10 rounded-full flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate a channel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mini Simulation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0E1525] border border-[#1B2640] rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-1">
              Add a marketing experiment
            </h3>
            <p className="text-xs text-[#97A3BA] mb-4">
              Enter your campaign details to see Mark calculate freed hours and budget when dropped.
            </p>

            <form onSubmit={handleAddChannel} className="space-y-3">
              <div>
                <label className="text-xs text-[#97A3BA] block mb-1">Campaign name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paid Meta Retargeting or Cold DM outreach"
                  value={newChannelName}
                  onChange={e => setNewChannelName(e.target.value)}
                  className="w-full bg-[#060A14] border border-[#1B2640] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#2F6BFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#97A3BA] block mb-1">Weekly hours</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={newHours}
                    onChange={e => setNewHours(e.target.value)}
                    className="w-full bg-[#060A14] border border-[#1B2640] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#2F6BFF]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#97A3BA] block mb-1">Monthly cost ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={newCost}
                    onChange={e => setNewCost(e.target.value)}
                    className="w-full bg-[#060A14] border border-[#1B2640] rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#2F6BFF]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-[#97A3BA] hover:text-white rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#2F6BFF] text-white rounded-full hover:bg-[#2558d4]"
                >
                  Add to verdict
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
