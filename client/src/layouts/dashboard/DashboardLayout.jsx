import { NavLink } from 'react-router-dom';
import Navbar from '../../components/navigation/Navbar.jsx';

const navItemClass = ({ isActive }) =>
  [
    'flex items-center rounded-xl px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-(--color-primary) text-(--color-on-primary) shadow-sm'
      : 'text-(--text-secondary) hover:bg-(--dropdown-hover) hover:text-(--text-primary)',
  ].join(' ');

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-(--bg-color) text-(--text-primary)">
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-b border-(--border-color) bg-(--sidebar-bg) p-4 lg:w-64 lg:border-b-0 lg:border-r lg:p-5">
          <div className="mb-6 rounded-2xl border border-(--border-color) bg-(--surface) p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-(--text-tertiary)">
              Phase 1
            </p>
            <h2 className="mt-2 text-lg font-semibold text-(--text-primary)">
              ERP Workspace
            </h2>
            <p className="mt-1 text-sm text-(--text-secondary)">
              Clean sidebar and dashboard shell.
            </p>
          </div>

          <nav className="space-y-2">
            <NavLink to="/dashboard" className={navItemClass} end>
              Dashboard
            </NavLink>
            <NavLink to="/my-profile" className={navItemClass}>
              My Profile
            </NavLink>
            <NavLink to="/settings" className={navItemClass}>
              Settings
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
