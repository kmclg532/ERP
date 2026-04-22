import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useTheme } from '../../context/ThemeContext.jsx';
import {
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Settings,
  LogOut,
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
  Check,
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
];

const notificationsSeed = [
  { id: 1, message: 'Attendance report is ready for review.', time: '2 min ago', read: false },
  { id: 2, message: 'New notice posted for the current semester.', time: '15 min ago', read: false },
  { id: 3, message: 'Fee receipt has been generated successfully.', time: '1 hr ago', read: true },
];

function SidebarContent({ collapsed, navItemClass, onNotificationsClick }) {
  return (
    <nav className="space-y-2">
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

      <button
        type="button"
        onClick={onNotificationsClick}
        className={navItemClass({ isActive: false })}
      >
        <Bell className="h-5 w-5 shrink-0" strokeWidth={2} />
        {!collapsed && <span>Notifications</span>}
      </button>
    </nav>
  );
}

function getInitials(firstName, lastName) {
  if (!firstName || !lastName) return 'NA';
  return `${firstName?.trim().charAt(0) || ''}${lastName?.trim().charAt(0) || ''}`.toUpperCase();
}

export default function ModernLayout({ children }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const bellRef = useRef(null);
  const notificationsPanelRef = useRef(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsSeed);

  const initials = getInitials(user?.firstName, user?.lastName);
  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  // Close drawer on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrawerOpen(false);
    setNotificationsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        bellRef.current &&
        !bellRef.current.contains(event.target) &&
        notificationsPanelRef.current &&
        !notificationsPanelRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItemClass = ({ isActive }) =>
    [
      'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition duration-200',
      isActive
        ? 'bg-(--color-primary) text-(--color-on-primary) shadow-sm'
        : 'text-(--text-secondary) hover:bg-(--dropdown-hover) hover:text-(--text-primary)',
    ].join(' ');

  const markNotificationRead = (notificationId) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const notificationPanel = (
    <div
      ref={notificationsPanelRef}
      className="absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-(--border-color) bg-(--surface) shadow-[var(--shadow-lg)]"
    >
      <div className="flex items-center justify-between border-b border-(--border-color) px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-(--text-primary)">Notifications</p>
          <p className="text-xs text-(--text-tertiary)">{unreadCount} unread</p>
        </div>
        <button
          type="button"
          onClick={markAllNotificationsRead}
          className="text-xs font-medium text-(--color-primary) transition hover:text-(--color-primary-hover)"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-3 rounded-xl px-3 py-3 transition ${
              notification.read ? 'hover:bg-(--dropdown-hover)' : 'bg-(--color-primary-soft)'
            }`}
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-(--color-on-primary)">
              <Bell className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm leading-5 text-(--text-primary)">{notification.message}</p>
              <p className="mt-1 text-xs text-(--text-tertiary)">{notification.time}</p>
            </div>

            <button
              type="button"
              onClick={() => markNotificationRead(notification.id)}
              className="mt-0.5 rounded-full p-1 text-(--text-tertiary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
              aria-label="Mark notification as read"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-(--bg-color)">
      {/* Navbar */}
      <nav className="h-16 shrink-0 border-b border-(--border-color) bg-(--surface) px-4 shadow-sm">
        <div className="flex h-full items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden rounded-lg p-2 text-(--text-primary) transition hover:bg-(--dropdown-hover) md:block"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-bold text-(--text-primary)">ERP</h1>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Notification */}
            <div className="relative" ref={bellRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen((currentState) => !currentState)}
                className="relative rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
                aria-haspopup="dialog"
                aria-expanded={notificationsOpen}
                aria-label="Toggle notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-(--surface)" />
                )}
              </button>
              {notificationsOpen && notificationPanel}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate('/settings')}
              className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Profile */}
            <button
              onClick={() => navigate('/my-profile')}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
              title="Profile"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary) text-xs font-semibold text-(--color-on-primary)">
                {initials}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-(--text-primary)">
                  {user?.firstName || 'User'}
                </p>
                <p className="text-xs text-(--text-tertiary)">
                  {user?.role || 'Student'}
                </p>
              </div>
            </button>
          </div>

          {/* Right Side - Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Notification */}
            <div className="relative" ref={bellRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen((currentState) => !currentState)}
                className="relative rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
                aria-haspopup="dialog"
                aria-expanded={notificationsOpen}
                aria-label="Toggle notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-(--surface)" />
                )}
              </button>
              {notificationsOpen && notificationPanel}
            </div>

            {/* Profile */}
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-primary) text-xs font-semibold text-(--color-on-primary)">
              {initials}
            </button>

            {/* Drawer Toggle */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="rounded-lg p-2 text-(--text-primary)"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden shrink-0 border-r border-(--border-color) bg-(--sidebar-bg) transition-all duration-300 md:block ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="h-full overflow-y-auto p-4">
            <SidebarContent
              collapsed={sidebarCollapsed}
              navItemClass={navItemClass}
              onNotificationsClick={() => setNotificationsOpen((currentState) => !currentState)}
            />
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Glass Blur Overlay + Drawer (Mobile) */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 transform transition-transform duration-300 bg-(--surface) shadow-xl md:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-(--border-color) px-4 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover)"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover)"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="rounded-lg p-2 text-(--text-primary) transition hover:bg-(--dropdown-hover)"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="h-full overflow-y-auto p-4 pb-36">
          <SidebarContent
            collapsed={false}
            navItemClass={navItemClass}
            onNotificationsClick={() => setNotificationsOpen((currentState) => !currentState)}
          />
        </div>

        {/* Drawer Footer - Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-(--border-color) bg-(--surface) p-4">
          <button
            onClick={() => {
              navigate('/my-profile');
              setDrawerOpen(false);
            }}
            className="mb-4 flex w-full items-center gap-3 rounded-lg border border-(--border-color) p-3 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary) text-sm font-semibold text-(--color-on-primary)">
              {initials}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-(--text-primary)">
                {user?.firstName || 'User'}
              </p>
              <p className="text-xs text-(--text-tertiary)">
                {user?.role || 'Student'}
              </p>
            </div>
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-(--danger) transition hover:bg-(--dropdown-hover) disabled:opacity-60"
          >
            <LogOut className="h-5 w-5" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
