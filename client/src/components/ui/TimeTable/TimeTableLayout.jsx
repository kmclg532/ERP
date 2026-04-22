import LectureCard from './LectureCard';

/**
 * Converts "HH:MM" → total minutes from midnight.
 */
function toMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * TimeTableLayout — Desktop grid view (time rows × day columns).
 *
 * Props
 * ─────
 * schedule         : Day[]        — full week data
 * currentMinutes   : number       — now in minutes from midnight
 * todayDay         : string       — e.g. "Monday"
 */
export default function TimeTableLayout({ schedule = [], currentMinutes, todayDay }) {
  if (!schedule.length) return null;

  // Collect all unique time slots across all days, sorted
  const allStartTimes = [
    ...new Set(schedule.flatMap((d) => d.slots.map((s) => s.startTime))),
  ].sort();

  const allEndTimes = [
    ...new Set(schedule.flatMap((d) => d.slots.map((s) => s.endTime))),
  ].sort();

  // Build a unified set of row boundaries
  const boundaries = [...new Set([...allStartTimes, ...allEndTimes])].sort();
  const timeRows = boundaries.slice(0, -1).map((start, i) => ({
    start,
    end: boundaries[i + 1],
  }));

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] shadow-sm">
      <table className="w-full min-w-[700px] table-fixed border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border-color)]">
            {/* Time column header */}
            <th className="w-24 py-3 pl-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">
              Time
            </th>
            {schedule.map((day) => {
              const isToday = day.day === todayDay;
              return (
                <th
                  key={day.day}
                  className={`py-3 text-center text-xs font-semibold uppercase tracking-wide
                    ${isToday ? 'text-[var(--color-primary)]' : 'text-[var(--text-tertiary)]'}
                  `}
                >
                  {day.day.slice(0, 3)}
                  {isToday && (
                    <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] align-middle" />
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {timeRows.map(({ start, end }) => {
            const startMin = toMinutes(start);
            const endMin = toMinutes(end);
            const isCurrentRow =
              currentMinutes >= startMin && currentMinutes < endMin;

            return (
              <tr
                key={`${start}-${end}`}
                className={`
                  border-b border-[var(--border-color)] transition-colors
                  ${isCurrentRow ? 'bg-[var(--color-primary-soft)]' : 'hover:bg-[var(--surface-strong)]'}
                `}
              >
                {/* Time label */}
                <td className="py-3 pl-4 align-top">
                  <div className="flex flex-col leading-none">
                    <span
                      className={`text-xs font-semibold tabular-nums
                        ${isCurrentRow ? 'text-[var(--color-primary)]' : 'text-[var(--text-tertiary)]'}
                      `}
                    >
                      {start}
                    </span>
                    <span className="mt-0.5 text-[0.6rem] text-[var(--text-tertiary)] opacity-60">
                      – {end}
                    </span>
                  </div>
                </td>

                {/* One cell per day */}
                {schedule.map((day) => {
                  const isToday = day.day === todayDay;
                  // Find slots that OVERLAP this time row
                  const matchingSlots = day.slots.filter((slot) => {
                    const sStart = toMinutes(slot.startTime);
                    const sEnd = toMinutes(slot.endTime);
                    return sStart <= startMin && sEnd >= endMin;
                  });

                  const lectures = matchingSlots.flatMap((s) => s.lectures);
                  const isCurrent = isCurrentRow && isToday;
                  const isPast = endMin <= currentMinutes && isToday;

                  return (
                    <td
                      key={day.day}
                      className={`px-2 py-2 align-top ${isToday ? 'bg-[var(--color-primary-soft)] bg-opacity-30' : ''}`}
                    >
                      {matchingSlots.length > 0 && (
                        <LectureCard
                          lectures={lectures}
                          isCurrent={isCurrent}
                          isPast={isPast}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
