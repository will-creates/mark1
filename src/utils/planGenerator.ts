import { IntakeAnswers, GeneratedPlan, PlanTrack, ActionItem } from '../types';

export function generateSmartPlan(answers: IntakeAnswers): GeneratedPlan {
  const what = answers.what.trim() || 'your business';
  const who = answers.who.trim() || 'your ideal clients';
  const goal = answers.goal || 'More customers';
  const time = answers.time || '1 to 2 hours';
  const money = answers.money || 'Nothing yet';

  const isLowBudget = money === 'Nothing yet' || money.includes('$0');
  const isMinimalTime = time.includes('1 to 2');
  const lowerWhat = what.toLowerCase();

  // Detect domain
  const isPhysical = /candle|craft|ceramic|bakery|coffee|clothing|shop|store|product|handmade|jewelry/i.test(lowerWhat);
  const isSaas = /saas|software|app|tool|platform|ai|b2b|freelance tool/i.test(lowerWhat);
  const isConsulting = /design|consult|agency|coach|freelance|services|copywriter|marketing/i.test(lowerWhat);

  // Track 1: Mainline direct reach
  let t1Title = 'Win your closest customers';
  let t1Desc = 'Direct high-conviction conversations with people already primed to care.';
  let t1Actions: ActionItem[] = [];

  if (isPhysical) {
    t1Title = 'Activate your local & closest supporters';
    t1Desc = 'Turn existing connections into first buyers and recurring champions.';
    t1Actions = [
      { id: 't1-1', text: 'Hand-pick 10 past clients or close friends and send a personal photo of your latest batch (15 min)' },
      { id: 't1-2', text: 'Visit or message 3 local independent shops that stock complementary products for shelf placement (20 min)' },
      { id: 't1-3', text: 'Include a handwritten postcard offer in every unboxing to spark direct repeat orders (10 min)' },
      { id: 't1-4', text: 'Set up a clean 1-page pre-order form before spending any money on inventory (15 min)' },
      { id: 't1-5', text: 'Follow up personally with everyone who viewed your catalog but didn’t checkout (10 min)' }
    ];
  } else if (isSaas) {
    t1Title = 'Direct founder-led customer discovery';
    t1Desc = 'High-touch outreach to convert problem-aware users into eager beta testers.';
    t1Actions = [
      { id: 't1-1', text: 'Find 10 LinkedIn or Twitter posts where your target users complain about their current workflow (15 min)' },
      { id: 't1-2', text: 'Send 5 personalized 3-sentence Loom/video invitations offering free custom workflow setup (20 min)' },
      { id: 't1-3', text: 'Create a single lightweight comparison landing section: "Why founders switch from [Tool X]" (25 min)' },
      { id: 't1-4', text: 'Set up an exit-intent feedback question asking what was missing for non-converters (10 min)' },
      { id: 't1-5', text: 'Turn your best user quote from yesterday into a prominent social proof headline (10 min)' }
    ];
  } else if (isConsulting) {
    t1Title = 'Warm network reactivation & referral loop';
    t1Desc = 'Direct outreach to trusted connections with zero friction offers.';
    t1Actions = [
      { id: 't1-1', text: 'Send a "no-pitch value teardown" to 3 dream clients pinpointing one fixable flaw in their funnel (25 min)' },
      { id: 't1-2', text: 'Message 5 former happy clients asking if their network is currently hiring for your specialty (10 min)' },
      { id: 't1-3', text: 'Draft a one-page "Quarterly Focus" offering 2 open sprint slots for next month (15 min)' },
      { id: 't1-4', text: 'Conduct one 15-minute diagnostic call focused 100% on their bottleneck, not your services (20 min)' },
      { id: 't1-5', text: 'Document the specific ROI of your most recent project as a concise 3-bullet case study (15 min)' }
    ];
  } else {
    t1Actions = [
      { id: 't1-1', text: 'List 10 places where your prospective buyers already gather online and offline (10 min)' },
      { id: 't1-2', text: 'Post a clear first offer in the best 3 of them without salesy fluff (15 min)' },
      { id: 't1-3', text: 'Message 5 people who already know and trust your craft to ask for their raw reaction (15 min)' },
      { id: 't1-4', text: 'Ask your first satisfied buyers for one specific referral to someone facing the exact same need (10 min)' },
      { id: 't1-5', text: 'Log which channel responded, then double down on the single winning channel' }
    ];
  }

  // Track 2: Mainline public craft
  const t2Title = 'Show your craft in public';
  const t2Desc = 'Educational proof that builds organic trust and inbound search volume.';
  const t2Actions: ActionItem[] = [
    { id: 't2-1', text: `Write one plain sentence: who ${what} helps, and how it helps ${who} (10 min)` },
    { id: 't2-2', text: 'Share a raw 30-second behind-the-scenes breakdown of how you create your work (15 min)' },
    { id: 't2-3', text: 'Publish a genuine answer to the #1 objection buyers have before purchasing (15 min)' },
    { id: 't2-4', text: 'Leave thoughtful, high-signal comments on 10 accounts your buyers already follow daily (15 min)' },
    { id: 't2-5', text: 'Review weekly engagement and drop the content topics that brought zero qualified leads' }
  ];

  // Track 3: Off-grid unconventional tactic
  let t3Title = 'Run it like a streetwear drop';
  let t3Desc = 'Borrow scarcity and event momentum from fashion to create immediate buying urgency.';
  let t3Actions: ActionItem[] = [];

  if (isPhysical) {
    t3Title = 'The Micro-Batch Friday Drop';
    t3Desc = 'Treat inventory as limited artistic collections rather than an open warehouse.';
    t3Actions = [
      { id: 't3-1', text: 'Cap next week’s release to strictly 15 numbered units with custom packaging (15 min)' },
      { id: 't3-2', text: 'Announce a 48-hour countdown exclusively to your email/VIP waitlist subscribers (10 min)' },
      { id: 't3-3', text: 'Unlock private checkout 2 hours early for repeat buyers before announcing publicly (10 min)' },
      { id: 't3-4', text: 'Publish live countdown stickers and mark "Sold Out" public markers to build social proof (10 min)' },
      { id: 't3-5', text: 'Open the next drop waitlist immediately while purchasing desire is peak' }
    ];
  } else if (isSaas) {
    t3Title = 'The Unlisted "Founding Cohort" Pass';
    t3Desc = 'Borrow private member club mechanics to filter for high-engagement power users.';
    t3Actions = [
      { id: 't3-1', text: 'Remove public signup button; replace with "Request Founder Access" with 3 qualifying questions (15 min)' },
      { id: 't3-2', text: 'Personally invite 20 users with a direct video message from your workspace (20 min)' },
      { id: 't3-3', text: 'Offer lifetime founding pricing to the first 10 accounts who commit to one 15-min feedback call (15 min)' },
      { id: 't3-4', text: 'Create a private Telegram or Slack channel for founders to co-design your next milestone (10 min)' },
      { id: 't3-5', text: 'Close enrollment promptly at 10 members and celebrate their onboarding on public channels' }
    ];
  } else {
    t3Title = 'The Guerilla Reverse Pitch';
    t3Desc = 'Unconventional outreach that flips traditional pitch decks on their head.';
    t3Actions = [
      { id: 't3-1', text: 'Build a private 2-minute unlisted YouTube video auditing their public brand experience (20 min)' },
      { id: 't3-2', text: 'Send it with a "no response required, just thought this would help" note (5 min)' },
      { id: 't3-3', text: 'Host a free 30-minute pop-up "office hours" slot on a Thursday afternoon for your niche (30 min)' },
      { id: 't3-4', text: 'Offer a 100% money-back guarantee backed by a concrete performance milestone (10 min)' },
      { id: 't3-5', text: 'Analyze replies: stop whatever didn’t earn genuine appreciation within 72 hours' }
    ];
  }

  const tracks: PlanTrack[] = [
    {
      id: 'track-1',
      title: t1Title,
      type: 'Mainline',
      description: t1Desc,
      actions: t1Actions
    },
    {
      id: 'track-2',
      title: t2Title,
      type: 'Mainline',
      description: t2Desc,
      actions: t2Actions
    },
    {
      id: 'track-3',
      title: t3Title,
      type: 'Off-grid',
      description: t3Desc,
      actions: t3Actions
    }
  ];

  return {
    id: 'plan_' + Date.now(),
    createdAt: Date.now(),
    businessName: what,
    targetAudience: who,
    goal: goal,
    timeCommitment: time,
    budgetTier: money,
    tracks: tracks,
    todayTrackId: 'track-1',
    todayActionId: tracks[0].actions[0].id,
    completedActions: {},
    sourceLinks: answers.links || [],
    sourceFiles: answers.files || []
  };
}
