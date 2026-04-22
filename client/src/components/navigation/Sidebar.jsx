import { NavLink } from 'react-router-dom';

const navigationGroups = [
  {
    title: 'MAIN',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    ],
  },
  {
    title: 'QUICK ACCESS',
    highlighted: true,
    items: [
      { label: 'Class Routine', path: '/class-routine', icon: '📅' },
      { label: 'Attendance', path: '/attendance', icon: '✅' },
      { label: 'Assignment', path: '/assignment', icon: '📝' },
      { label: 'Academic Calendar', path: '/calendar', icon: '🗓️' },
    ],
  },
  {
    title: 'ACADEMICS',
    items: [
      { label: 'Examination', path: '/examination', icon: '📚' },
      { label: 'Result', path: '/result', icon: '📊' },
    ],
  },
  {
    title: 'ACTIVITIES',
    items: [
      { label: 'Quiz', path: '/quiz', icon: '🧠' },
      { label: 'Subject Planner', path: '/subject-planner', icon: '🗂️' },
      { label: 'Feedback', path: '/feedback', icon: '💬' },
      { label: 'Contact Activity', path: '/contact-activity', icon: '📞' },
    ],
  },
  {
    title: 'FINANCE',
    items: [
      { label: 'Fees Report', path: '/fees', icon: '💰' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Notice', path: '/notice', icon: '📢' },
      { label: 'Notifications', path: '/notifications', icon: '🔔' },
      { label: 'Downloads', path: '/downloads', icon: '⬇️' },
    ],
  },
  {
    title: 'USER',
    items: [
      { label: 'My Profile', path: '/my-profile', icon: '👤' },
      { label: 'Settings', path: '/settings', icon: '⚙️' },
    ],
  },
];

const navLinkClassName = ({ isActive }) =>
  [
    'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-(--color-primary) text-(--color-on-primary) shadow-sm'
      : 'text-(--text-secondary) hover:bg-(--dropdown-hover) hover:text-(--text-primary)',
  ].join(' ');

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-(--border-color) bg-(--sidebar-bg) px-4 py-5">
      <div className="mb-6 rounded-2xl border border-(--border-color) bg-(--surface) p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-(--text-tertiary)">
          University ERP
        </p>
        <h2 className="mt-2 text-lg font-semibold text-(--text-primary)">
          Student Portal
        </h2>
      </div>

      <nav className="space-y-5">
        {navigationGroups.map((group) => (
          <section
            key={group.title}
            className={group.highlighted ? 'rounded-2xl border border-(--color-primary)/25 bg-(--color-primary)/10 p-3' : ''}
          >
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--text-tertiary)">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink key={item.path} to={item.path} className={navLinkClassName}>
                  <span aria-hidden="true" className="text-base leading-none">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}
