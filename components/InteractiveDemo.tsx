import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, Mail, Clock, CheckCircle2, AlertCircle, Database,
  Send, Calendar, FileText, DollarSign, Star, MessageSquare,
  Bell, Sparkles, Check, Search, Phone,
} from 'lucide-react';
import { Container, Section, FadeIn, SectionHeading } from './ui/Shared';

type StepState = 'pending' | 'active' | 'complete';

interface Step {
  icon: React.ElementType;
  label: string;
  detail: string;
  iconColor: string;
  iconBg: string;
}

interface OutputPreview {
  type: 'email' | 'message';
  channel: string;
  to: string;
  subject?: string;
  fullBody: string;
}

interface Scenario {
  id: string;
  label: string;
  icon: React.ElementType;
  triggerIcon: React.ElementType;
  trigger: string;
  triggerDetail: string;
  steps: Step[];
  output: OutputPreview;
}

// ============================================================================
// Scenarios rewritten 11 Oct 2026 to match what the platform really does
// (see the project doc claude/feature-audit-2026-10.md). The old ones showed
// things that don't exist: Stripe payment links, calendar availability scans,
// WhatsApp, and messages "sent automatically". Every message here is written
// for the tradesperson and waits for his approval.
// ============================================================================
const scenarios: Scenario[] = [
  {
    id: 'enquiry',
    label: 'New Enquiry',
    icon: Mail,
    triggerIcon: Zap,
    trigger: 'Someone fills in your enquiry page',
    triggerDetail: 'Kitchen fit · Name, phone and email captured · 8:42pm',
    steps: [
      {
        icon: Database,
        label: 'Saved to your enquiries',
        detail: 'It appears in your app straight away, marked New',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
      },
      {
        icon: Sparkles,
        label: 'Reply written for you',
        detail: 'In your words, asking the questions you\'d ask — ready within seconds',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
      },
      {
        icon: Bell,
        label: 'Waiting for your OK',
        detail: 'Tap approve and it\'s gone — while the other lads are still asleep on it',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: 'Claire Thompson',
      subject: 'Re: Kitchen fit',
      fullBody: `Hi Claire,

Thanks for getting in touch about the kitchen. I'd be glad to take a look.

So I can give you a proper price, could you let me know:
  • Roughly how many units, and is it a full replacement?
  • Have you got the units, or would you like me to supply them?
  • When are you hoping to have it done?

I can call out to measure up next week if that suits.

Cheers,
Mark
Mark Smith Joinery`,
    },
  },
  {
    id: 'quote',
    label: 'Quote Gone Quiet',
    icon: MessageSquare,
    triggerIcon: Clock,
    trigger: 'No reply to your quote',
    triggerDetail: 'Quote for £4,200 sent Tuesday · No answer yet',
    steps: [
      {
        icon: Search,
        label: 'It notices the silence',
        detail: 'Every message it sends is watched for a reply',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
      },
      {
        icon: Mail,
        label: 'Friendly follow-up written',
        detail: 'A light nudge, not a hard sell — waiting for your OK',
        iconColor: 'text-accent-400',
        iconBg: 'bg-accent-500/10',
      },
      {
        icon: Phone,
        label: 'Still nothing? You\'re told',
        detail: 'After a couple of follow-ups, it tells you it\'s time to give them a ring',
        iconColor: 'text-rose-400',
        iconBg: 'bg-rose-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: 'Paul Kelly',
      subject: 'Your quote — any questions?',
      fullBody: `Hi Paul,

Just checking the quote for the stairs came through okay.

If anything isn't clear, or you'd like me to look at a different option, just say and I'll sort it.

No rush at all — I just want to keep a slot free for you if you're going ahead.

Cheers,
Mark
Mark Smith Joinery`,
    },
  },
  {
    id: 'invoice',
    label: 'Job Finished',
    icon: DollarSign,
    triggerIcon: CheckCircle2,
    trigger: 'You tap "Completed" on the job',
    triggerDetail: 'Bathroom refit · Agreed price £850',
    steps: [
      {
        icon: FileText,
        label: 'Invoice email written',
        detail: 'Uses the price on the job, with your bank details on it',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
      },
      {
        icon: CheckCircle2,
        label: 'Figures checked',
        detail: 'The £ amount and bank details are checked against the job before it can go',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
      },
      {
        icon: Clock,
        label: 'Chasing lined up',
        detail: 'Polite reminders at 7, 14, 30 and 45 days — they stop when you mark it paid',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: 'Sarah Smith',
      subject: 'Invoice — bathroom refit',
      fullBody: `Hi Sarah,

Thanks again for having us — I hope you're enjoying the new bathroom.

As agreed, the total for the work is £850.00.

You can pay by bank transfer to:
  Mark Smith Joinery
  Sort code: 00-00-00
  Account: 00000000

Any questions, just give me a shout.

Cheers,
Mark`,
    },
  },
  {
    id: 'reply',
    label: 'Customer Replies',
    icon: Mail,
    triggerIcon: Mail,
    trigger: 'A customer answers one of your emails',
    triggerDetail: '"Any chance you could come Thursday instead of Wednesday?"',
    steps: [
      {
        icon: Search,
        label: 'It reads what they want',
        detail: 'A question, a change of date, a query about the bill, or a yes',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
      },
      {
        icon: Sparkles,
        label: 'Answer written for you',
        detail: 'Matched to the right job, so it knows what you\'re talking about',
        iconColor: 'text-accent-400',
        iconBg: 'bg-accent-500/10',
      },
      {
        icon: Bell,
        label: 'Chasing stops',
        detail: 'They\'ve replied, so nobody gets nudged again',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: 'Joe Davies',
      subject: 'Re: Your booking',
      fullBody: `Hi Joe,

No problem at all — Thursday works.

I'll be with you around 8.30am as planned, just a day later.

Cheers,
Mark`,
    },
  },
  {
    id: 'callme',
    label: 'Call Me',
    icon: Phone,
    triggerIcon: Phone,
    trigger: 'You tap "Call me" in the van',
    triggerDetail: 'Your phone rings within a few seconds',
    steps: [
      {
        icon: Phone,
        label: 'You just talk',
        detail: '"Sarah Smith\'s bathroom is finished, invoice is £850."',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
      },
      {
        icon: Database,
        label: 'Job updated',
        detail: 'Marked as finished — exactly as if you\'d tapped it yourself',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
      },
      {
        icon: FileText,
        label: 'Invoice written',
        detail: '"Want me to read it to you?" — approve it right there on the call',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
      },
    ],
    output: {
      type: 'message',
      channel: 'Call Me',
      to: 'You, on the phone',
      fullBody: `You:  Sarah Smith's bathroom is finished,
      invoice is £850.

PA:   Done — I've marked it finished and the
      invoice for £850 is written. Want me to
      read it to you?

You:  Go on, send it.

PA:   Sent. Anything else before I let you go?`,
    },
  },
  {
    id: 'review',
    label: 'Review Request',
    icon: Star,
    triggerIcon: Star,
    trigger: 'You mark the job "Paid"',
    triggerDetail: 'Two days later, once they\'ve settled up',
    steps: [
      {
        icon: Clock,
        label: 'Waits two days',
        detail: 'They\'ve paid and had time to enjoy the work',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
      },
      {
        icon: Star,
        label: 'Review request written',
        detail: 'With your Google, Checkatrade or Trustpilot link',
        iconColor: 'text-yellow-400',
        iconBg: 'bg-yellow-500/10',
      },
      {
        icon: Calendar,
        label: 'A note for next year',
        detail: 'Eleven months on, a friendly message to bring them back',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
      },
    ],
    output: {
      type: 'email',
      channel: 'Email',
      to: 'Sarah Smith',
      subject: 'Thanks, Sarah — quick favour?',
      fullBody: `Hi Sarah,

Thanks for paying so promptly, and for having us in.

If you're happy with the bathroom, would you mind leaving a short review? It really helps a small business like mine.

[Your Google review link]

Thanks again,
Mark`,
    },
  },
];

export const InteractiveDemo: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [stepStates, setStepStates] = useState<StepState[]>([]);
  const [showOutput, setShowOutput] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const runScenario = (scenario: Scenario) => {
    clearTimeouts();
    setActiveScenario(scenario);
    setStepStates(scenario.steps.map(() => 'pending'));
    setShowOutput(false);
    setIsAnimating(true);

    scenario.steps.forEach((_, i) => {
      const t1 = setTimeout(() => {
        setStepStates(prev => prev.map((s, idx) => idx === i ? 'active' : s));
      }, i * 900);

      const t2 = setTimeout(() => {
        setStepStates(prev => prev.map((s, idx) => idx === i ? 'complete' : s));
        if (i === scenario.steps.length - 1) {
          const t3 = setTimeout(() => {
            setShowOutput(true);
            setIsAnimating(false);
          }, 400);
          timeoutsRef.current.push(t3);
        }
      }, i * 900 + 650);

      timeoutsRef.current.push(t1, t2);
    });
  };

  useEffect(() => {
    const t = setTimeout(() => runScenario(scenarios[0]), 400);
    return () => {
      clearTimeout(t);
      clearTimeouts();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section id="demo" className="bg-slate-950 overflow-hidden">
      <Container>
        <SectionHeading
          title={<>See it <span className="text-accent-400">work</span></>}
          subtitle="Pick one. Watch what happens, and see the message it writes for you."
          center
          dark
        />

        {/* Scenario selector */}
        <FadeIn>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => !isAnimating && runScenario(s)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95 ${
                  activeScenario?.id === s.id
                    ? 'bg-accent-500/15 border-accent-500/40 text-accent-300 shadow-[0_0_16px_rgba(6,182,212,0.1)]'
                    : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                } ${isAnimating && activeScenario?.id !== s.id ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <s.icon className="w-3.5 h-3.5" />
                {s.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Main panel */}
        {activeScenario && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start [&>*]:min-w-0">

            {/* Left: Trigger + Steps */}
            <div className="space-y-3">

              {/* Trigger card */}
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <div className="bg-accent-500/10 border border-accent-500/20 rounded-xl p-2.5 flex-shrink-0">
                  <activeScenario.triggerIcon className="w-4 h-4 text-accent-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-accent-400 uppercase tracking-widest">Trigger</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
                  </div>
                  <p className="text-white font-semibold text-sm">{activeScenario.trigger}</p>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">{activeScenario.triggerDetail}</p>
                </div>
              </div>

              {/* Step pipeline */}
              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-[19px] top-6 bottom-6 w-px bg-white/5 z-0" />

                <div className="space-y-2.5 relative z-10">
                  {activeScenario.steps.map((step, i) => {
                    const state = stepStates[i] ?? 'pending';
                    return (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-4 rounded-2xl border transition-all duration-500 ${
                          state === 'complete'
                            ? 'bg-slate-900/80 border-white/15'
                            : state === 'active'
                            ? 'bg-slate-900/60 border-accent-500/30 shadow-[0_0_24px_rgba(6,182,212,0.06)]'
                            : 'bg-slate-900/20 border-white/5 opacity-40'
                        }`}
                      >
                        {/* Status dot */}
                        <div className="flex-shrink-0 mt-0.5">
                          {state === 'complete' ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                              <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
                            </div>
                          ) : state === 'active' ? (
                            <div className="w-6 h-6 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-slate-700" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className={`${step.iconBg} p-1.5 rounded-lg flex-shrink-0`}>
                                <step.icon className={`w-3.5 h-3.5 ${step.iconColor}`} />
                              </div>
                              <span className={`text-sm font-bold leading-tight ${
                                state === 'pending' ? 'text-slate-600' : 'text-white'
                              }`}>
                                {step.label}
                              </span>
                            </div>
                            <div className="flex-shrink-0">
                              {state === 'active' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-accent-500/15 text-accent-400 rounded-full border border-accent-500/20 animate-pulse">
                                  Running…
                                </span>
                              )}
                              {state === 'complete' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                                  Done
                                </span>
                              )}
                            </div>
                          </div>
                          <p className={`text-xs leading-relaxed ${
                            state === 'pending' ? 'text-slate-700' : 'text-slate-400'
                          }`}>
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Output preview */}
            <div className="lg:sticky lg:top-24">
              {showOutput ? (
                <div className="animate-fade-in-up bg-slate-900/60 rounded-2xl border border-white/15 overflow-hidden">

                  {/* Preview header — fake browser/email chrome */}
                  <div className="bg-slate-900 px-5 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                      </div>
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        {activeScenario.output.type === 'message' ? activeScenario.output.channel : `${activeScenario.output.channel} · Draft`}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                      {activeScenario.output.type === 'message' ? 'On the call' : 'Ready for your OK'}
                    </span>
                  </div>

                  {/* Email meta */}
                  {activeScenario.output.type === 'email' && (
                    <div className="px-5 py-3.5 border-b border-white/5 space-y-1.5">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[10px] text-slate-600 font-bold uppercase w-12 text-right flex-shrink-0">To</span>
                        <span className="text-sm text-slate-300">{activeScenario.output.to}</span>
                      </div>
                      {activeScenario.output.subject && (
                        <div className="flex items-baseline gap-3">
                          <span className="text-[10px] text-slate-600 font-bold uppercase w-12 text-right flex-shrink-0">Subject</span>
                          <span className="text-sm text-white font-semibold">{activeScenario.output.subject}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message preview */}
                  <div className="p-5">
                    {activeScenario.output.type === 'message' ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            To: {activeScenario.output.to}
                          </span>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl rounded-tl-sm p-4">
                          <pre className="text-[12px] text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                            {activeScenario.output.fullBody}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <pre className="text-[12px] text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                        {activeScenario.output.fullBody}
                      </pre>
                    )}

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-slate-600">
                        {activeScenario.output.type === 'message' ? 'Updates your jobs as you talk' : 'Written for you · waiting for your OK'}
                      </span>
                      {activeScenario.output.type !== 'message' && (
                        <button className="text-[11px] font-bold text-accent-400 hover:text-accent-300 transition-colors">
                          Approve & Send →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="min-h-[360px] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 text-slate-700">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Sparkles size={20} />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-bold text-slate-600">Writing your message…</p>
                    <p className="text-xs text-slate-700">It'll appear here in a moment</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Footer note */}
        <FadeIn delay={200}>
          <div className="mt-8 flex items-start gap-4 p-5 bg-slate-900/40 rounded-2xl border border-white/5">
            <div className="p-2 bg-accent-500/10 rounded-xl text-accent-400 flex-shrink-0 mt-0.5">
              <Sparkles size={15} />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Names and figures are made up for the example. The steps are what really happens —
              and every message waits for you to read it and tap OK before it goes anywhere.
              Click any example to play it again.
            </p>
          </div>
        </FadeIn>

      </Container>
    </Section>
  );
};
