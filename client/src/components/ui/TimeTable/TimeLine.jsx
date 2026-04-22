import { useRef, useEffect } from 'react';
import LectureCard from './LectureCard';

/**
 * Converts "HH:MM" string → total minutes from midnight.
 */
function toMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * TimeLine — renders the vertical mobile timeline for one day's slots.
 *
 * Props
 * ─────
 * slots            : Slot[]
 * currentMinutes   : number  — minutes from midnight for "now"
 * currentLineRef   : React ref — attached to the current-time indicator DOM node
 */
export default function TimeLine({ slots = [], currentMinutes, currentLineRef }) {
  const containerRef = useRef(null);

  // Auto-scroll to the current-time line on mount / day switch
  useEffect(() => {
    if (currentLineRef?.current && containerRef.current) {
      currentLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [slots, currentLineRef]);

  // Determine first and last slot boundary for layout
  const firstStart = slots.length ? toMinutes(slots[0].startTime) : 540;
  const lastEnd = slots.length ? toMinutes(slots[slots.length - 1].endTime) : 960;
  const totalSpan = lastEnd - firstStart || 1;

  // Clamp percent between 0 and 100
  const currentPercent = Math.max(
    0,
    Math.min(100, ((currentMinutes - firstStart) / totalSpan) * 100)
  );

  const isCurrentInRange = currentMinutes >= firstStart && currentMinutes <= lastEnd;

  return (
    <div ref={containerRef} className="relative flex flex-col gap-0">
      {slots.map((slot, idx) => {
        const startMin = toMinutes(slot.startTime);
        const endMin = toMinutes(slot.endTime);

        const isCurrent = currentMinutes >= startMin && currentMinutes < endMin;
        const isPast = currentMinutes >= endMin;

        // Position of current-time line *within* this slot
        const slotProgress =
          isCurrent
            ? ((currentMinutes - startMin) / (endMin - startMin)) * 100
            : null;

        const isLast = idx === slots.length - 1;

        return (
          <div key={slot.id} className="relative flex gap-3">
            {/* ── TIME COLUMN ── */}
            <div className="flex w-14 shrink-0 flex-col items-end pt-0.5">
              <span
                className={`text-xs font-semibold tabular-nums leading-none
                  ${isCurrent ? 'text-[var(--color-primary)]' : 'text-[var(--text-tertiary)]'}
                `}
              >
                {slot.startTime}
              </span>
            </div>

            {/* ── CONNECTOR + CARD AREA ── */}
            <div className="relative flex flex-1 flex-col pb-6">
              {/* Vertical timeline track */}
              {!isLast && (
                <div
                  className={`
                    absolute left-[-1.15rem] top-2.5 w-px
                    ${isPast
                      ? 'bg-[var(--color-primary)] opacity-40'
                      : isCurrent
                        ? 'bg-[var(--color-primary)]'
                        : 'bg-[var(--border-color)]'
                    }
                  `}
                  style={{ bottom: '-1.25rem' }}
                />
              )}

              {/* Timeline dot */}
              <div
                className={`
                  absolute left-[-1.6rem] top-2 h-2.5 w-2.5 rounded-full border-2
                  transition-all duration-300
                  ${isCurrent
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] shadow-[0_0_8px_2px_rgba(62,161,228,0.5)] scale-125'
                    : isPast
                      ? 'border-[var(--color-primary)] bg-transparent'
                      : 'border-[var(--border-color)] bg-[var(--surface)]'
                  }
                `}
              />

              {/* ── CURRENT TIME LINE (within slot) ── */}
              {isCurrent && slotProgress !== null && (
                <div
                  ref={currentLineRef}
                  className="absolute left-0 right-0 z-10 flex items-center gap-1.5"
                  style={{ top: `${slotProgress}%` }}
                >
                  <span className="text-[0.6rem] font-bold text-[var(--color-primary)] tabular-nums whitespace-nowrap">
                    {/* inline time label omitted — shown in time column */}
                  </span>
                  <div className="h-px flex-1 bg-[var(--color-primary)] shadow-[0_0_6px_1px_rgba(62,161,228,0.6)] animate-pulse" />
                  <div className="h-2 w-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_6px_rgba(62,161,228,0.8)]" />
                </div>
              )}

              {/* Lecture card */}
              <div className={`mt-0.5 ${isCurrent ? 'mt-0' : ''}`}>
                <LectureCard
                  lectures={slot.lectures}
                  isCurrent={isCurrent}
                  isPast={isPast}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* End time label after last slot */}
      {slots.length > 0 && (
        <div className="flex gap-3">
          <div className="flex w-14 shrink-0 items-end justify-end">
            <span className="text-xs font-semibold tabular-nums text-[var(--text-tertiary)]">
              {slots[slots.length - 1].endTime}
            </span>
          </div>
          <div className="relative flex-1">
            <div className="absolute left-[-1.6rem] top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--border-color)] bg-[var(--surface)]" />
          </div>
        </div>
      )}
    </div>
  );
}
