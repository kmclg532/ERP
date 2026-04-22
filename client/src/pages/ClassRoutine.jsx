import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, LayoutGrid, AlignLeft, RefreshCw } from 'lucide-react';

import DaySelector from '../components/ui/TimeTable/DaySelector';
import TimeLine from '../components/ui/TimeTable/TimeLine';
import TimeTableLayout from '../components/ui/TimeTable/TimeTableLayout';
import { TIMETABLE_DATA } from '../constants/timetableData';

/** Converts "HH:MM" → minutes from midnight */
function toMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

/** Returns current time in minutes from midnight */
function nowMinutes() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

/** Returns today's full day name e.g. "Monday" */
function todayName() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

/** Format HH:MM to 12-hour display */
function fmt12(t) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
}

export default function ClassRoutine() {
  const navigate = useNavigate();
  const today = todayName();

  const [selectedDay, setSelectedDay] = useState(today);
  const [view, setView] = useState('timeline'); // 'timeline' | 'grid'
  const [currentMin, setCurrentMin] = useState(nowMinutes());
  const currentLineRef = useRef(null);

  // Tick every 30 s to keep current-time line accurate
  useEffect(() => {
    const id = setInterval(() => setCurrentMin(nowMinutes()), 30_000);
    return () => clearInterval(id);
  }, []);

  const dayData = TIMETABLE_DATA.find((d) => d.day === selectedDay);
  const slots = dayData?.slots ?? [];

  // Detect current & next lectures
  const activeLectures = slots.filter(
    (s) => currentMin >= toMinutes(s.startTime) && currentMin < toMinutes(s.endTime)
  );
  const upcomingSlots = slots
    .filter((s) => toMinutes(s.startTime) > currentMin && s.lectures.length > 0)
    .slice(0, 2);

  const handleRefresh = useCallback(() => {
    setCurrentMin(nowMinutes());
  }, []);

  // ── Current day pill label
  const isToday = selectedDay === today;

  return (
    <div className="flex flex-col gap-6">

      {/* ── PAGE HEADER ── */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)]">
            <CalendarDays className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-[var(--text-primary)]">
              Class Routine
            </h1>
            <p className="text-xs text-[var(--text-tertiary)]">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* View toggle + refresh */}
        <div className="flex items-center gap-2">
          <button
            id="timetable-refresh-btn"
            onClick={handleRefresh}
            title="Refresh current time"
            className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--dropdown-hover)] hover:text-[var(--text-primary)]"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          <div className="flex rounded-xl border border-[var(--border-color)] bg-[var(--surface-strong)] p-1">
            <button
              id="timetable-view-timeline"
              onClick={() => setView('timeline')}
              aria-pressed={view === 'timeline'}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition
                ${view === 'timeline'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              <AlignLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Timeline</span>
            </button>
            <button
              id="timetable-view-grid"
              onClick={() => setView('grid')}
              aria-pressed={view === 'grid'}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition
                ${view === 'grid'
                  ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Full Week</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── CURRENT / UPCOMING STATUS STRIP (today only, timeline view) ── */}
      {isToday && view === 'timeline' && (
        <div className="flex flex-wrap gap-3">
          {/* Current lecture status */}
          {activeLectures.length > 0 ? (
            <div className="flex items-center gap-2 rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary-soft)] px-4 py-2.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)]" />
              <span className="text-xs font-semibold text-[var(--color-primary)]">
                Now:&nbsp;
                {activeLectures[0].lectures.map((l) => l.subject).join(' / ')}
                &nbsp;·&nbsp;
                {activeLectures[0].startTime} – {activeLectures[0].endTime}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] px-4 py-2.5">
              <Clock className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-tertiary)]">No lecture right now</span>
            </div>
          )}

          {/* Upcoming */}
          {upcomingSlots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] px-4 py-2.5"
            >
              <Clock className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
              <span className="text-xs text-[var(--text-secondary)]">
                Next:&nbsp;
                <span className="font-semibold text-[var(--text-primary)]">
                  {slot.lectures.map((l) => l.subject).join(' / ')}
                </span>
                &nbsp;@&nbsp;{fmt12(slot.startTime)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      {view === 'timeline' ? (
        <section className="flex flex-col gap-5">
          {/* Day selector */}
          <DaySelector
            selectedDay={selectedDay}
            onSelect={setSelectedDay}
            todayDay={today}
          />

          {/* Timeline */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-5 shadow-sm">
            {/* Day header inside card */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[var(--text-primary)]">{selectedDay}</h2>
                <p className="text-xs text-[var(--text-tertiary)]">
                  {slots.filter((s) => s.lectures.length > 0).length} lecture
                  {slots.filter((s) => s.lectures.length > 0).length !== 1 ? 's' : ''} scheduled
                </p>
              </div>
              {isToday && (
                <span className="rounded-full bg-[var(--color-primary)] px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-[var(--color-on-primary)]">
                  Today
                </span>
              )}
            </div>

            {slots.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <CalendarDays className="mb-3 h-10 w-10 text-[var(--text-tertiary)] opacity-40" />
                <p className="text-sm text-[var(--text-tertiary)]">No classes scheduled</p>
              </div>
            ) : (
              <div className="ml-3">
                <TimeLine
                  slots={slots}
                  currentMinutes={isToday ? currentMin : -1}
                  currentLineRef={currentLineRef}
                />
              </div>
            )}
          </div>
        </section>
      ) : (
        /* ── GRID / FULL WEEK VIEW ── */
        <section>
          <TimeTableLayout
            schedule={TIMETABLE_DATA}
            currentMinutes={currentMin}
            todayDay={today}
          />
        </section>
      )}
    </div>
  );
}
