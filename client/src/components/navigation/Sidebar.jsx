import { NavLink } from 'react-router-dom';
import {
  Home,
  Calendar,
  CheckSquare,
  FileText,
  BookOpen,
  HelpCircle,
  CheckCircle,
  PieChart,
  IndianRupee,
  ClipboardList,
  Download,
  MessageCircle,
  Activity,
  Users,
  User,
  Settings,
} from 'lucide-react';

const navigationGroups = [
  {
    title: 'MAIN',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: Home },
    ],
  },
  {
    title: 'QUICK ACCESS',
    highlighted: true,
    items: [
      { label: 'Class Routine', path: '/class-routine', icon: Calendar },
      { label: 'Attendance', path: '/attendance', icon: CheckSquare },
      { label: 'Assignment', path: '/assignment', icon: FileText },
      { label: 'Academic Calendar', path: '/calendar', icon: Calendar },
    ],
  },
  {
    title: 'ACADEMICS',
    items: [
      { label: 'Examination', path: '/examination', icon: HelpCircle },
      { label: 'Result', path: '/result', icon: CheckCircle },
      { label: 'Quiz', path: '/quiz', icon: PieChart },
    ],
  },
  {
    title: 'ACTIVITIES',
    items: [
      { label: 'Subject Planner', path: '/subject-planner', icon: BookOpen },
      { label: 'Feedback', path: '/feedback', icon: MessageCircle },
      { label: 'Resolved Feedback', path: '/resolved-feedback', icon: CheckCircle },
      { label: '100 Point Activity', path: '/activity', icon: Activity },
      { label: 'Student Section', path: '/student-section', icon: Users },
    ],
  },
  {
    title: 'FINANCE',
    items: [
      { label: 'Fees', path: '/fees', icon: IndianRupee },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Notice', path: '/notice', icon: ClipboardList },
      { label: 'Downloads', path: '/downloads', icon: Download },
    ],
  },
  {
    title: 'USER',
    items: [
      { label: 'My Profile', path: '/my-profile', icon: User },
      { label: 'Settings', path: '/settings', icon: Settings },
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
    <aside className="w-64 shrink-0 border-r border-(--border-color) bg-(--sidebar-bg) px-4 py-5 overscroll-contain">
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
                  <item.icon className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden="true" />
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
