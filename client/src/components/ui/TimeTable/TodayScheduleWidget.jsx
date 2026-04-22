import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen, CalendarDays } from 'lucide-react';
import { TIMETABLE_DATA } from '../../../constants/timetableData';

/** Converts "HH:MM" → minutes from midnight */
function toMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

/** Format HH:MM to 12-hour readable form */
function fmt12(t) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
}

/**
 * TodayScheduleWidget — dashboard snippet showing current + next 2 lectures.
 * Links to full Class Routine page.
 */
export default function TodayScheduleWidget() {
  const navigate = useNavigate();
  const now = new Date();
  const todayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentMin = now.getHours() * 60 + now.getMinutes();

  const todayData = TIMETABLE_DATA.find((d) => d.day === todayName);
  const slots = todayData?.slots ?? [];

  const currentSlot = slots.find(
    (s) =>
      s.lectures.length > 0 &&
      currentMin >= toMinutes(s.startTime) &&
      currentMin < toMinutes(s.endTime)
  );

  const upcomingSlots = slots
    .filter((s) => s.lectures.length > 0 && toMinutes(s.startTime) > currentMin)
    .slice(0, 2);

  const hasContent = currentSlot || upcomingSlots.length > 0;

  return (
    <section
      className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5 shadow-sm flex flex-col gap-4"
      aria-label="Today's schedule widget"
    >
      {/* Widget header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary-soft)]">
            <CalendarDays className="h-4 w-4 text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
              Today's Schedule
            </p>
            <p className="text-xs text-[var(--text-tertiary)]">{todayName}</p>
          </div>
        </div>
        <button
          id="dashboard-view-routine-btn"
          onClick={() => navigate('/class-routine')}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[var(--color-primary)]
            hover:bg-[var(--color-primary-soft)] transition-colors"
        >
          Full Routine
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Content */}
      {!hasContent ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <CalendarDays className="mb-2 h-8 w-8 text-[var(--text-tertiary)] opacity-30" />
          <p className="text-xs text-[var(--text-tertiary)]">No more classes for today 🎉</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Current lecture */}
          {currentSlot && (
            <div className="relative overflow-hidden rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary-soft)] p-3.5">
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-[var(--color-primary)]" />
              <div className="flex items-start justify-between gap-2 pl-1">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                    <span className="text-[0.65rem] font-bold uppercase tracking-wide text-[var(--color-primary)]">
                      In Progress
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">
                    {currentSlot.lectures.map((l) => l.subject).join(' / ')}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                    {currentSlot.lectures.map((l) => `${l.faculty} · ${l.location}`).join('  |  ')}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-[var(--color-primary)] tabular-nums">
                    {fmt12(currentSlot.startTime)}
                  </p>
                  <p className="text-[0.6rem] text-[var(--text-tertiary)]">
                    – {fmt12(currentSlot.endTime)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming slots */}
          {upcomingSlots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-strong)] px-3.5 py-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface)]">
                <BookOpen className="h-4 w-4 text-[var(--text-tertiary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                  {slot.lectures.map((l) => l.subject).join(' / ')}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {slot.lectures.map((l) => l.faculty).join(' / ')} &nbsp;·&nbsp;
                  {slot.lectures[0]?.location}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-xs tabular-nums text-[var(--text-tertiary)]">
                <Clock className="h-3 w-3" />
                {fmt12(slot.startTime)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
