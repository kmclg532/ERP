import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useNotifications } from '../../context/NotificationContext.jsx';
import NotificationPanel from '../common/NotificationPanel.jsx';
import {
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Settings,
  Home,
  BookOpen,
  CheckSquare,
  FileText,
  Calendar,
  HelpCircle,
  ClipboardList,
  Download,
  MessageCircle,
  CheckCircle,
  PieChart,
  Users,
  Activity,
  IndianRupee,
  BellRing,
} from 'lucide-react';

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Class Routine', path: '/class-routine', icon: Calendar },
  { label: 'Attendance', path: '/attendance', icon: CheckSquare },
  { label: 'Assignment', path: '/assignment', icon: FileText },
  { label: 'Calendar', path: '/calendar', icon: Calendar },
  { label: 'Examination', path: '/examination', icon: HelpCircle },
  { label: 'Result', path: '/result', icon: CheckCircle },
  { label: 'Quiz', path: '/quiz', icon: PieChart },
  { label: 'Fees', path: '/fees', icon: IndianRupee },
  { label: 'Notice', path: '/notice', icon: ClipboardList },
  { label: 'Downloads', path: '/downloads', icon: Download },
  { label: 'Feedback', path: '/feedback', icon: MessageCircle },
  { label: 'Resolved Feedback', path: '/resolved-feedback', icon: CheckCircle },
  { label: 'Subject Planner', path: '/subject-planner', icon: BookOpen },
  { label: '100 Point Activity', path: '/activity', icon: Activity },
  { label: 'Student Section', path: '/student-section', icon: Users },
  { label: 'Notifications', path: '/notifications', icon: BellRing },
];

function getInitials(firstName, lastName) {
  if (!firstName || !lastName) return 'NA';
  return `${firstName.trim().charAt(0)}${lastName.trim().charAt(0)}`.toUpperCase();
}

function SidebarContent({ collapsed, navItemClass }) {
  return (
    <nav className="space-y-1 overscroll-contain">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={navItemClass}
            end={item.path === '/dashboard'}
          >
            <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function ModernLayout({ children }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  // Refs for outside-click detection (desktop + mobile bell, panel)
  const bellRefDesktop = useRef(null);
  const bellRefMobile = useRef(null);
  const panelRef = useRef(null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const initials = getInitials(user?.firstName, user?.lastName);

  // Close everything on route change + scroll to top
  useEffect(() => {
    setDrawerOpen(false);
    setNotificationsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close notification panel on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const insideBell =
        bellRefDesktop.current?.contains(event.target) ||
        bellRefMobile.current?.contains(event.target);
      const insidePanel = panelRef.current?.contains(event.target);
      if (!insideBell && !insidePanel) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItemClass = ({ isActive }) =>
    [
      'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition duration-200',
      isActive
        ? 'bg-(--color-primary) text-(--color-on-primary) shadow-sm'
        : 'text-(--text-secondary) hover:bg-(--dropdown-hover) hover:text-(--text-primary)',
    ].join(' ');

  const toggleNotifications = () => setNotificationsOpen((prev) => !prev);

  // ── Bell button (reused in desktop + mobile) ──
  const BellButton = ({ refProp }) => (
    <div className="relative" ref={refProp}>
      <button
        type="button"
        onClick={toggleNotifications}
        className="relative rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
        aria-haspopup="dialog"
        aria-expanded={notificationsOpen}
        aria-label="Toggle notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-(--surface)" />
        )}
      </button>
      {notificationsOpen && (
        <NotificationPanel
          panelRef={panelRef}
          onClose={() => setNotificationsOpen(false)}
        />
      )}
    </div>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-(--bg-color)">

      {/* ══ NAVBAR ══ */}
      <nav className="h-16 shrink-0 border-b border-(--border-color) bg-(--surface) px-4 shadow-sm">
        <div className="flex h-full items-center justify-between">

          {/* LEFT: Collapse toggle (desktop) + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed((p) => !p)}
              className="hidden rounded-lg p-2 text-(--text-primary) transition hover:bg-(--dropdown-hover) md:block"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            {/* Logo — click navigates to dashboard */}
            <button
              onClick={() => navigate('/dashboard')}
              className="text-lg font-bold text-(--text-primary) transition hover:opacity-80"
              aria-label="Go to dashboard"
            >
              ERP
            </button>
          </div>

          {/* RIGHT — Desktop: Bell → Theme → Settings → Profile */}
          <div className="hidden items-center gap-4 md:gap-6 md:flex">
            <BellButton refProp={bellRefDesktop} />

            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Profile */}
            <button
              onClick={() => navigate('/my-profile')}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-(--text-secondary) transition hover:bg-(--dropdown-hover)"
              aria-label="Go to profile"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary) text-xs font-semibold text-(--color-on-primary)">
                {initials}
              </div>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium leading-tight text-(--text-primary)">
                  {user?.firstName || 'User'}
                </p>
                <p className="text-xs text-(--text-tertiary)">{user?.role || 'Student'}</p>
              </div>
            </button>
          </div>

          {/* RIGHT — Mobile: Bell → Profile → Menu */}
          <div className="flex items-center gap-3 md:hidden">
            <BellButton refProp={bellRefMobile} />

            <button
              onClick={() => navigate('/my-profile')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary) text-xs font-semibold text-(--color-on-primary) transition hover:opacity-90"
              aria-label="Go to profile"
            >
              {initials}
            </button>

            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded-lg p-2 text-(--text-primary) transition hover:bg-(--dropdown-hover)"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </nav>

      {/* ══ BODY ══ */}
      <div className="flex flex-1 overflow-hidden">

        {/* Desktop Sidebar */}
        <aside
          className={`hidden shrink-0 border-r border-(--border-color) bg-(--sidebar-bg) transition-all duration-300 md:block ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="h-full overflow-y-auto p-4">
            <SidebarContent collapsed={sidebarCollapsed} navItemClass={navItemClass} />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* ══ MOBILE DRAWER BACKDROP ══ */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ══ MOBILE DRAWER ══ */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-64 flex-col transform bg-(--surface) shadow-xl transition-transform duration-300 md:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header: [Theme] [Settings] ── [Close] */}
        <div className="flex shrink-0 items-center justify-between border-b border-(--border-color) px-4 py-4">
          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover)"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => { navigate('/settings'); setDrawerOpen(false); }}
              className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover)"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="rounded-lg p-2 text-(--text-primary) transition hover:bg-(--dropdown-hover)"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer Nav — scrollable */}
        <div className="flex-1 overflow-y-auto p-4 overscroll-contain">
          <SidebarContent collapsed={false} navItemClass={navItemClass} />
        </div>
      </div>

    </div>
  );
}
