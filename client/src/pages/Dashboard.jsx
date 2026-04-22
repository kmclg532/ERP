import { useAuth } from '../hooks/useAuth.js';
import TodayScheduleWidget from '../components/ui/TimeTable/TodayScheduleWidget.jsx';
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  IndianRupee,
  TrendingUp,
} from 'lucide-react';

/** Quick stat card — reusable inside dashboard grid */
function StatCard({ icon: Icon, label, value, accent = false }) {
  return (
    <article
      className={`
        relative overflow-hidden rounded-2xl border border-[var(--border-color)]
        bg-[var(--surface)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md
        ${accent ? 'ring-1 ring-[var(--color-primary)] ring-opacity-40' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-soft)]">
          <Icon className="h-5 w-5 text-[var(--color-primary)]" />
        </div>
      </div>
    </article>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  const roleLabel = user?.role === 'faculty' ? 'Faculty' : 'Student';
  const firstName = user?.firstName || 'User';

  return (
    <div className="flex flex-col gap-6">

      {/* ── WELCOME BANNER ── */}
      <section className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-sm">
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
          style={{ background: 'var(--color-primary)' }}
        />

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)]">
            <LayoutDashboard className="h-6 w-6 text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
              Welcome back
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              {firstName} &nbsp;
              <span className="text-[var(--color-primary)]">·</span>&nbsp;
              <span className="text-lg font-medium text-[var(--text-secondary)]">{roleLabel}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── STAT CARDS ── */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={GraduationCap} label="Attendance" value="84%" accent />
        <StatCard icon={FileText} label="Assignments Due" value="3" />
        <StatCard icon={IndianRupee} label="Fees Due" value="₹0" />
        <StatCard icon={TrendingUp} label="CGPA" value="8.6" />
      </section>

      {/* ── TODAY'S SCHEDULE (timetable widget) ── */}
      <TodayScheduleWidget />

    </div>
  );
}
