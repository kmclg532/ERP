/**
 * Timetable Data — Static mock for development.
 * Replace `fetchTimetable()` calls with real API responses later.
 *
 * Data contract:
 *  GET /api/v1/class-routine?day={day}&batch={batch}
 *  → { success, data: { schedule: Day[] }, message }
 */

/** @type {import('../components/ui/TimeTable/types').Day[]} */
export const TIMETABLE_DATA = [
  {
    day: 'Monday',
    slots: [
      {
        id: 'mon-1',
        startTime: '09:00',
        endTime: '10:00',
        lectures: [
          { subject: 'Mathematics', faculty: 'PRM', location: 'TF-31', batch: 'All' },
        ],
      },
      {
        id: 'mon-2',
        startTime: '10:00',
        endTime: '11:00',
        lectures: [
          { subject: 'Physics', faculty: 'SKP', location: 'TF-32', batch: 'All' },
        ],
      },
      {
        id: 'mon-3',
        startTime: '11:00',
        endTime: '12:00',
        lectures: [
          { subject: 'WDF', faculty: 'DKJ', location: 'TF-32', batch: 'A1' },
          { subject: 'ADF', faculty: 'RDC', location: 'GF-26', batch: 'A2' },
        ],
      },
      {
        id: 'mon-4',
        startTime: '12:00',
        endTime: '13:00',
        lectures: [],        // Lunch break — rendered as free slot
      },
      {
        id: 'mon-5',
        startTime: '14:00',
        endTime: '15:00',
        lectures: [
          { subject: 'Data Structures', faculty: 'ANS', location: 'SF-11', batch: 'All' },
        ],
      },
      {
        id: 'mon-6',
        startTime: '15:00',
        endTime: '16:00',
        lectures: [
          { subject: 'DBMS Lab', faculty: 'RDC', location: 'Lab-3', batch: 'A1' },
          { subject: 'Network Lab', faculty: 'VKT', location: 'Lab-4', batch: 'A2' },
        ],
      },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      {
        id: 'tue-1',
        startTime: '09:00',
        endTime: '10:00',
        lectures: [
          { subject: 'DBMS', faculty: 'RDC', location: 'SF-21', batch: 'All' },
        ],
      },
      {
        id: 'tue-2',
        startTime: '10:00',
        endTime: '11:00',
        lectures: [
          { subject: 'OS', faculty: 'VKT', location: 'SF-22', batch: 'All' },
        ],
      },
      {
        id: 'tue-3',
        startTime: '11:00',
        endTime: '12:00',
        lectures: [
          { subject: 'WDF Lab', faculty: 'DKJ', location: 'Lab-1', batch: 'A1' },
          { subject: 'Network Lab', faculty: 'VKT', location: 'Lab-2', batch: 'A2' },
        ],
      },
      {
        id: 'tue-4',
        startTime: '12:00',
        endTime: '13:00',
        lectures: [],
      },
      {
        id: 'tue-5',
        startTime: '14:00',
        endTime: '15:00',
        lectures: [
          { subject: 'Computer Networks', faculty: 'VKT', location: 'SF-23', batch: 'All' },
        ],
      },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      {
        id: 'wed-1',
        startTime: '09:00',
        endTime: '10:00',
        lectures: [
          { subject: 'TOC', faculty: 'MRS', location: 'TF-11', batch: 'All' },
        ],
      },
      {
        id: 'wed-2',
        startTime: '10:00',
        endTime: '12:00',
        lectures: [
          { subject: 'DS Lab', faculty: 'ANS', location: 'Lab-5', batch: 'A1' },
          { subject: 'Math Lab', faculty: 'PRM', location: 'Lab-6', batch: 'A2' },
        ],
      },
      {
        id: 'wed-3',
        startTime: '12:00',
        endTime: '13:00',
        lectures: [],
      },
      {
        id: 'wed-4',
        startTime: '14:00',
        endTime: '15:00',
        lectures: [
          { subject: 'Soft Skills', faculty: 'RKS', location: 'Hall-A', batch: 'All' },
        ],
      },
      {
        id: 'wed-5',
        startTime: '15:00',
        endTime: '16:00',
        lectures: [
          { subject: 'Elective', faculty: 'TBA', location: 'TF-14', batch: 'All' },
        ],
      },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      {
        id: 'thu-1',
        startTime: '09:00',
        endTime: '10:00',
        lectures: [
          { subject: 'Data Structures', faculty: 'ANS', location: 'SF-11', batch: 'All' },
        ],
      },
      {
        id: 'thu-2',
        startTime: '10:00',
        endTime: '11:00',
        lectures: [
          { subject: 'Mathematics', faculty: 'PRM', location: 'TF-31', batch: 'All' },
        ],
      },
      {
        id: 'thu-3',
        startTime: '11:00',
        endTime: '12:00',
        lectures: [
          { subject: 'ADF', faculty: 'RDC', location: 'GF-26', batch: 'A1' },
          { subject: 'WDF', faculty: 'DKJ', location: 'TF-32', batch: 'A2' },
        ],
      },
      {
        id: 'thu-4',
        startTime: '12:00',
        endTime: '13:00',
        lectures: [],
      },
      {
        id: 'thu-5',
        startTime: '14:00',
        endTime: '16:00',
        lectures: [
          { subject: 'Project Work', faculty: 'MRS', location: 'Lab-7', batch: 'All' },
        ],
      },
    ],
  },
  {
    day: 'Friday',
    slots: [
      {
        id: 'fri-1',
        startTime: '09:00',
        endTime: '10:00',
        lectures: [
          { subject: 'OS', faculty: 'VKT', location: 'SF-22', batch: 'All' },
        ],
      },
      {
        id: 'fri-2',
        startTime: '10:00',
        endTime: '11:00',
        lectures: [
          { subject: 'DBMS', faculty: 'RDC', location: 'SF-21', batch: 'All' },
        ],
      },
      {
        id: 'fri-3',
        startTime: '11:00',
        endTime: '12:00',
        lectures: [
          { subject: 'TOC', faculty: 'MRS', location: 'TF-11', batch: 'All' },
        ],
      },
      {
        id: 'fri-4',
        startTime: '12:00',
        endTime: '13:00',
        lectures: [],
      },
      {
        id: 'fri-5',
        startTime: '14:00',
        endTime: '15:00',
        lectures: [
          { subject: 'Computer Networks', faculty: 'VKT', location: 'SF-23', batch: 'All' },
        ],
      },
    ],
  },
  {
    day: 'Saturday',
    slots: [
      {
        id: 'sat-1',
        startTime: '09:00',
        endTime: '10:00',
        lectures: [
          { subject: 'Seminar', faculty: 'HOD', location: 'Seminar Hall', batch: 'All' },
        ],
      },
      {
        id: 'sat-2',
        startTime: '10:00',
        endTime: '12:00',
        lectures: [
          { subject: 'Mini Project', faculty: 'ANS', location: 'Lab-8', batch: 'A1' },
          { subject: 'Mini Project', faculty: 'RDC', location: 'Lab-9', batch: 'A2' },
        ],
      },
    ],
  },
];

export const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Map abbreviated day label → full day name */
export const DAY_MAP = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
};

/** Returns today's timetable data or empty slots array */
export function getTodaySchedule() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return TIMETABLE_DATA.find((d) => d.day === today) || null;
}
