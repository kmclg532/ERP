import { useAuth } from '../hooks/useAuth.js';
import ModernLayout from '../components/layout/ModernLayout.jsx';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ModernLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="rounded-2xl border border-(--border-color) bg-(--surface) p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-(--text-primary)">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="mt-2 text-(--text-secondary)">
            Here's what's happening with your academics today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Attendance Card */}
          <div className="rounded-2xl border border-(--border-color) bg-(--surface) p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-(--text-tertiary)">
                  Attendance
                </p>
                <p className="mt-2 text-3xl font-bold text-(--text-primary)">
                  92%
                </p>
                <p className="mt-1 text-xs text-(--text-secondary)">
                  ↑ 2.5% from last month
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-primary)/10 text-(--color-primary)">
                ✓
              </div>
            </div>
          </div>

          {/* Assignments Card */}
          <div className="rounded-2xl border border-(--border-color) bg-(--surface) p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-(--text-tertiary)">
                  Assignments Pending
                </p>
                <p className="mt-2 text-3xl font-bold text-(--text-primary)">
                  3
                </p>
                <p className="mt-1 text-xs text-(--text-secondary)">
                  Due in next 7 days
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-warning)/10 text-orange-600">
                📝
              </div>
            </div>
          </div>

          {/* GPA Card */}
          <div className="rounded-2xl border border-(--border-color) bg-(--surface) p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-(--text-tertiary)">
                  Current GPA
                </p>
                <p className="mt-2 text-3xl font-bold text-(--text-primary)">
                  3.85
                </p>
                <p className="mt-1 text-xs text-(--text-secondary)">
                  ↑ 0.15 points
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--color-success)/10 text-green-600">
                ⭐
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-(--border-color) bg-(--surface) p-8 shadow-sm">
          <h2 className="text-xl font-bold text-(--text-primary)">
            Recent Activity
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                title: 'Assignment Submitted',
                description: 'Data Structures - Assignment 3',
                time: '2 hours ago',
              },
              {
                title: 'Grade Published',
                description: 'Algorithms Midterm - 87/100',
                time: '1 day ago',
              },
              {
                title: 'Class Scheduled',
                description: 'Web Development - Tomorrow at 10:00 AM',
                time: '3 days ago',
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between border-b border-(--border-color) pb-4 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-(--text-primary)">
                    {activity.title}
                  </p>
                  <p className="mt-1 text-sm text-(--text-secondary)">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-(--text-tertiary)">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'My Classes', icon: '📚' },
            { label: 'Results', icon: '📊' },
            { label: 'Fees', icon: '💰' },
            { label: 'Downloads', icon: '⬇️' },
          ].map((link, idx) => (
            <button
              key={idx}
              className="rounded-xl border border-(--border-color) bg-(--surface) p-4 text-center transition hover:bg-(--dropdown-hover) hover:shadow-sm"
            >
              <div className="text-2xl">{link.icon}</div>
              <p className="mt-2 text-sm font-medium text-(--text-primary)">
                {link.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </ModernLayout>
  );
}
