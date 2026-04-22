import { MapPin, User, BookOpen } from 'lucide-react';

/**
 * LectureCard — renders one time-slot's lecture(s).
 *
 * Props
 * ─────
 * lectures   : { subject, faculty, location, batch }[]
 * isCurrent  : boolean — highlight as in-progress
 * isPast     : boolean — dim past lectures
 */
export default function LectureCard({ lectures = [], isCurrent = false, isPast = false }) {
  // Free / break slot
  if (lectures.length === 0) {
    return (
      <div
        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm italic
          border border-dashed border-[var(--border-color)]
          ${isPast ? 'opacity-40' : 'opacity-70'}
          text-[var(--text-tertiary)]`}
      >
        <span>Free / Break</span>
      </div>
    );
  }

  const glowClass = isCurrent
    ? 'ring-2 ring-[var(--color-primary)] shadow-[0_0_18px_2px_rgba(62,161,228,0.22)]'
    : '';

  const pastClass = isPast ? 'opacity-55' : '';

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl border border-[var(--border-color)]
        bg-[var(--surface)] shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${glowClass} ${pastClass}
      `}
    >
      {/* Current-lecture accent strip */}
      {isCurrent && (
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-[var(--color-primary)]" />
      )}

      {lectures.map((lec, idx) => (
        <div key={`${lec.batch}-${idx}`}>
          {/* Divider between multiple lectures */}
          {idx > 0 && (
            <div className="mx-4 border-t border-[var(--border-color)]" />
          )}

          <div className="px-4 py-3">
            {/* Subject + Batch badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <BookOpen className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" />
                <span className="truncate text-sm font-semibold text-[var(--text-primary)]">
                  {lec.subject}
                </span>
              </div>

              {/* Batch badge — only show when not 'All' */}
              {lec.batch && lec.batch !== 'All' && (
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold
                    uppercase tracking-wide
                    bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                >
                  {lec.batch}
                </span>
              )}

              {lec.batch === 'All' && isCurrent && (
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold
                    uppercase tracking-wide animate-pulse
                    bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                >
                  Live
                </span>
              )}
            </div>

            {/* Faculty + Location */}
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <User className="h-3 w-3 text-[var(--text-tertiary)]" />
                {lec.faculty}
              </span>
              <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <MapPin className="h-3 w-3 text-[var(--text-tertiary)]" />
                {lec.location}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
