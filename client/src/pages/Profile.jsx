import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fullName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'NA';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="grid gap-6">
      <section className="max-w-3xl rounded-2xl border border-(--border-color) bg-(--surface) p-6 shadow-sm">
        <p className="text-sm font-medium text-(--text-tertiary)">Profile</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-(--text-primary)">
          My Profile
        </h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-(--border-color) bg-(--surface-strong) p-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-(--text-tertiary)">Name</p>
            <p className="mt-2 text-base font-medium text-(--text-primary)">{fullName}</p>
          </div>
          <div className="rounded-xl border border-(--border-color) bg-(--surface-strong) p-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-(--text-tertiary)">Role</p>
            <p className="mt-2 text-base font-medium text-(--text-primary)">{user?.role || 'student'}</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl rounded-2xl border border-(--border-color) bg-(--surface) p-6 shadow-sm">
        <p className="text-sm font-medium text-(--text-tertiary)">Session</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-(--text-primary)">
          Logout
        </h2>
        <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
          Use this button to end the current session on mobile or desktop.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-5 rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-(--color-on-primary) transition hover:bg-(--color-primary-hover)"
        >
          Logout
        </button>
      </section>
    </div>
  );
}
