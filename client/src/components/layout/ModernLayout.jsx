import { useState, useEffect } from 'react';
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
  DollarSign,
  ClipboardList,
  Download,
} from 'lucide-react';

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Class Routine', path: '/class-routine', icon: Calendar },
  { label: 'Attendance', path: '/attendance', icon: CheckSquare },
  { label: 'Assignment', path: '/assignment', icon: FileText },
  { label: 'Calendar', path: '/calendar', icon: Calendar },
  { label: 'Quiz', path: '/quiz', icon: HelpCircle },
  { label: 'Fees', path: '/fees', icon: DollarSign },
  { label: 'Notice', path: '/notice', icon: ClipboardList },
  { label: 'Downloads', path: '/downloads', icon: Download },
];

function SidebarContent({ collapsed, navItemClass }) {
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
            <Icon className="h-5 w-5" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        );
      })}
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initials = getInitials(user?.firstName, user?.lastName);

  // Close drawer on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrawerOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
            <button className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)">
              <Bell className="h-5 w-5" />
            </button>

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
            <button className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover) hover:text-(--text-primary)">
              <Settings className="h-5 w-5" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-(--dropdown-hover)">
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
            </div>
          </div>

          {/* Right Side - Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Notification */}
            <button className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover)">
              <Bell className="h-5 w-5" />
            </button>

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
            <SidebarContent collapsed={sidebarCollapsed} navItemClass={navItemClass} />
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
            <button className="rounded-lg p-2 text-(--text-secondary) transition hover:bg-(--dropdown-hover)">
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
        <div className="p-4">
          <SidebarContent collapsed={false} navItemClass={navItemClass} />
        </div>

        {/* Drawer Footer - Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-(--border-color) bg-(--surface) p-4">
          <div className="mb-4 flex items-center gap-3 rounded-lg border border-(--border-color) p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary) text-sm font-semibold text-(--color-on-primary)">
              {initials}
            </div>
            <div>
              <p className="text-sm font-medium text-(--text-primary)">
                {user?.firstName || 'User'}
              </p>
              <p className="text-xs text-(--text-tertiary)">
                {user?.role || 'Student'}
              </p>
            </div>
          </div>
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
