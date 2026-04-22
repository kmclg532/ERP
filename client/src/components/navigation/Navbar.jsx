import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useTheme } from '../../context/ThemeContext.jsx';

const getInitials = (firstName, lastName) => {
  if (!firstName || !lastName) {
    return 'NA';
  }

  return `${firstName.trim().charAt(0)}${lastName.trim().charAt(0)}`.toUpperCase();
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initials = useMemo(
    () => getInitials(user?.firstName, user?.lastName),
    [user?.firstName, user?.lastName]
  );

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
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
      setOpen(false);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-sm bg-(--bg-color) border-b border-(--border-color)">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-(--text-tertiary)">
          ERP System
        </p>
        <h1 className="text-lg font-semibold text-(--text-primary)">Dashboard</h1>
      </div>

      <div className="relative flex items-center gap-3" ref={menuRef}>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full border border-(--border-color) bg-(--surface) px-3 py-2 text-sm font-medium text-(--text-primary) transition hover:bg-(--dropdown-hover)"
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-primary) text-sm font-semibold text-(--color-on-primary) shadow-sm transition hover:scale-[1.02]"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          {initials}
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-(--border-color) bg-(--surface) shadow-lg">
            <div className="border-b border-(--border-color) px-4 py-3">
              <p className="text-sm font-medium text-(--text-primary)">
                {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'NA'}
              </p>
              <p className="text-xs text-(--text-tertiary)">{user?.role || 'student'}</p>
            </div>

            <div className="py-2">
              <Link
                to="/my-profile"
                className="block px-4 py-2 text-sm text-(--text-primary) transition hover:bg-(--dropdown-hover)"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-(--text-primary) transition hover:bg-(--dropdown-hover)"
              >
                Settings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="block w-full px-4 py-2 text-left text-sm text-(--danger) transition hover:bg-(--dropdown-hover) disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
