import { useAuth } from '../../hooks/useAuth.js';

export default function Profile() {
  const { user } = useAuth();
  const fullName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'NA';

  return (
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
  );
}
