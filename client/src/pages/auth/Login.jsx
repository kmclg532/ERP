import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export default function Login() {
  const navigate = useNavigate();
  const { login, user, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSignupMessage, setShowSignupMessage] = useState(false);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <div className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,var(--color-primary-soft),transparent_34%),linear-gradient(180deg,var(--bg-secondary),var(--bg-primary))] px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-80 max-w-6xl rounded-full bg-[radial-gradient(circle,rgba(62,161,228,0.18),transparent_70%)] blur-3xl" />

        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
          <div className="w-full rounded-2xl border border-(--border-color) bg-(--bg-glass) p-6 shadow-[0_24px_80px_rgba(31,55,80,0.14)] backdrop-blur-xl transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:p-8">
            <div className="mb-6 text-center">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-(--text-tertiary)">
                Secure access portal
              </p>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-(--text-primary)">
                ERP System Login
              </h1>
              <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                Sign in to continue to your workspace.
              </p>
            </div>

            <div className="mb-4 grid grid-cols-2 rounded-full border border-(--border-color) bg-(--surface-strong) p-1 shadow-[0_10px_28px_rgba(31,55,80,0.08)]">
              <button
                type="button"
                role="tab"
                aria-selected={role === 'student'}
                onClick={() => setRole('student')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  role === 'student'
                    ? 'bg-(--color-primary) text-(--color-on-primary) shadow-sm'
                    : 'text-(--text-secondary) hover:-translate-y-px hover:text-(--text-primary)'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={role === 'faculty'}
                onClick={() => setRole('faculty')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  role === 'faculty'
                    ? 'bg-(--color-primary) text-(--color-on-primary) shadow-sm'
                    : 'text-(--text-secondary) hover:-translate-y-px hover:text-(--text-primary)'
                }`}
              >
                Faculty
              </button>
            </div>

            <div className="mb-5 flex items-center justify-between rounded-xl border border-(--border-color) bg-(--surface-strong) px-4 py-3">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-(--text-tertiary)">
                Role selected
              </span>
              <strong className="text-sm font-medium text-(--text-primary)">
                {role === 'student' ? 'Student portal' : 'Faculty portal'}
              </strong>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-(--text-secondary)" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-(--border-color) bg-(--bg-primary) px-4 py-3 text-(--text-primary) placeholder:text-(--text-tertiary) transition-all duration-200 outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 focus:ring-offset-0 hover:border-(--color-primary)"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-(--text-secondary)" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-(--border-color) bg-(--bg-primary) px-4 py-3 text-(--text-primary) placeholder:text-(--text-tertiary) transition-all duration-200 outline-none focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20 focus:ring-offset-0 hover:border-(--color-primary)"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-(--danger) bg-(--danger-soft) px-4 py-3 text-sm leading-6 text-(--text-primary)" role="alert" aria-live="polite">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="inline-flex w-full items-center justify-center rounded-xl bg-(--color-primary) px-4 py-3 text-sm font-medium text-(--color-on-primary) shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-(--color-primary-hover) hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-(--color-primary)"
              >
                {loading ? 'Logging in...' : `Login as ${role}`}
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-(--text-secondary)">
              <span>New here?</span>
              <button
                type="button"
                className="font-medium text-(--color-primary) transition-colors duration-200 hover:text-(--color-primary-hover)"
                onClick={() => setShowSignupMessage(true)}
              >
                Create Account
              </button>
            </div>

            {showSignupMessage && (
              <p className="mt-3 text-center text-sm text-(--text-secondary)">
                Signup is coming soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
