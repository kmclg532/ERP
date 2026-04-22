import { useAuth } from '../hooks/useAuth.js';

export default function Dashboard() {
	const { user } = useAuth();

	const roleLabel = user?.role === 'faculty' ? 'Faculty' : 'Student';
	const dashboardMessage =
		roleLabel === 'Faculty' ? 'Welcome Faculty Dashboard' : 'Welcome Student Dashboard';

	return (
		<div className="grid gap-6">
			<section className="rounded-2xl border border-(--border-color) bg-(--surface) p-6 shadow-sm">
				<p className="text-sm font-medium text-(--text-tertiary)">Dashboard overview</p>
				<h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-(--text-primary)">
					{dashboardMessage}
				</h2>
				<p className="mt-2 text-sm leading-6 text-(--text-secondary)">
					Authenticated role: {roleLabel}
				</p>
			</section>

			<section className="grid gap-4 md:grid-cols-2">
				<article className="rounded-2xl border border-(--border-color) bg-(--surface-strong) p-5">
					<p className="text-sm font-medium text-(--text-tertiary)">Access level</p>
					<h3 className="mt-2 text-xl font-semibold text-(--text-primary)">{user?.role || 'student'}</h3>
				</article>
				<article className="rounded-2xl border border-(--border-color) bg-(--surface-strong) p-5">
					<p className="text-sm font-medium text-(--text-tertiary)">Signed in user</p>
					<h3 className="mt-2 text-xl font-semibold text-(--text-primary)">
						{user?.firstName || 'New'} {user?.lastName || 'User'}
					</h3>
				</article>
			</section>
		</div>
	);
}
