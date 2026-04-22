import { DAYS_SHORT, DAYS_FULL } from '../../../constants/timetableData';

/**
 * DaySelector — horizontal scrollable day tabs (mobile-first).
 *
 * Props
 * ─────
 * selectedDay  : string  — full day name e.g. "Monday"
 * onSelect     : (day: string) => void
 * todayDay     : string  — full name of today
 */
export default function DaySelector({ selectedDay, onSelect, todayDay }) {
  return (
    <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none">
      {DAYS_SHORT.map((short, i) => {
        const full = DAYS_FULL[i];
        const isActive = full === selectedDay;
        const isToday = full === todayDay;

        return (
          <button
            key={full}
            id={`day-tab-${short.toLowerCase()}`}
            onClick={() => onSelect(full)}
            aria-pressed={isActive}
            className={`
              relative shrink-0 flex flex-col items-center justify-center
              h-14 w-14 rounded-2xl text-xs font-semibold transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
              ${isActive
                ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md -translate-y-0.5'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }
            `}
          >
            <span className="text-[0.65rem] font-medium leading-none opacity-75">
              {short}
            </span>

            {/* Today indicator dot */}
            {isToday && (
              <span
                className={`
                  mt-1.5 h-1.5 w-1.5 rounded-full
                  ${isActive ? 'bg-[var(--color-on-primary)]' : 'bg-[var(--color-primary)]'}
                `}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
