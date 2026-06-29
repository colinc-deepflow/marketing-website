import React from 'react';
import { Container, Section, FadeIn, SectionHeading } from './ui/Shared';
import { Lock, Bell, Search, Menu, FileText, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

const dashboardItems = [
  { label: 'Active Enquiries', value: '14', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Pending Quotes', value: '£8.4k', color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Live Jobs', value: '6', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Overdue Payments', value: '2', color: 'text-rose-600', bg: 'bg-rose-50' },
];

const pipelineRows = [
  { name: 'Thompson Kitchen Fit', status: 'Quote Sent', time: '12m ago', color: 'bg-purple-100 text-purple-700' },
  { name: 'Oaks Hotel Wardrobes', status: 'Job Booked', time: '3h ago', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Bespoke Stairs Request', status: 'AI Handled', time: 'Just now', color: 'bg-blue-100 text-blue-700' },
  { name: 'City Dental Clinic', status: 'Invoiced', time: '1d ago', color: 'bg-slate-100 text-slate-700' },
  { name: 'Greenway Custom Desk', status: 'Overdue', time: '4d ago', color: 'bg-rose-100 text-rose-700' },
];

const controlItems = [
  { text: 'See all enquiries at a glance', icon: Bell },
  { text: 'Track every quote you\'ve sent', icon: FileText },
  { text: 'Monitor your booked jobs', icon: CheckCircle },
  { text: 'See which invoices are paid or overdue', icon: AlertCircle },
];

export const Dashboard: React.FC = () => {
  return (
    <Section id="control" className="bg-slate-900 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <div>
            <SectionHeading
              title={<>Nothing Runs <span className="text-accent-400">Blindly</span></>}
              subtitle="Automation shouldn't mean losing sight of your business. We build a central command centre so you always know what's happening."
              dark
            />

            <div className="space-y-3">
              {controlItems.map((item, i) => (
                <FadeIn delay={i * 75} key={i}>
                  <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
                    <div className="p-2.5 bg-accent-500/10 rounded-lg text-accent-400 flex-shrink-0 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300">
                      <item.icon size={17} />
                    </div>
                    <span className="font-semibold text-slate-200 text-sm">{item.text}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: dashboard mockup (light — looks like a screen) */}
          <FadeIn delay={200} className="relative">
            <div className="bg-white rounded-2xl shadow-[0_0_80px_rgba(6,182,212,0.08),0_40px_80px_-15px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden relative z-10 transform lg:rotate-1">

              {/* Top bar */}
              <div className="bg-slate-900 px-5 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
                <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">
                  Deepflow Control Center
                </div>
                <div className="flex gap-2 text-slate-500">
                  <TrendingUp size={11} />
                  <Menu size={11} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-7 space-y-5">

                {/* Stat widgets */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {dashboardItems.map((stat, i) => (
                    <div key={i} className={`${stat.bg} p-3 rounded-xl`}>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 leading-tight">
                        {stat.label}
                      </div>
                      <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Pipeline */}
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Pipeline</span>
                    <Search size={11} className="text-slate-400" />
                  </div>
                  <div className="divide-y divide-slate-50">
                    {pipelineRows.map((row, i) => (
                      <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                          <span className="text-sm font-bold text-slate-900 block">{row.name}</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Clock size={9} /> {row.time}
                          </span>
                        </div>
                        <div className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${row.color}`}>
                          {row.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer bar */}
              <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Secure Cloud Sync
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> Data Sovereign
                </div>
              </div>
            </div>

            {/* Cyan glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-blue-500/5 to-transparent rounded-3xl blur-3xl -z-10" />
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
};
