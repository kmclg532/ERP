import { useTheme } from '../../context/ThemeContext.jsx';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="max-w-3xl rounded-2xl border border-(--border-color) bg-(--surface) p-6 shadow-sm">
      <p className="text-sm font-medium text-(--text-tertiary)">Settings</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-(--text-primary)">
        Preferences
      </h1>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-(--border-color) bg-(--surface-strong) p-4">
        <div>
          <p className="text-sm font-medium text-(--text-primary)">Theme mode</p>
          <p className="text-sm text-(--text-secondary)">Current mode: {theme}</p>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-xl bg-(--color-primary) px-4 py-2 text-sm font-medium text-(--color-on-primary) shadow-sm transition hover:bg-(--color-primary-hover)"
        >
          Toggle theme
        </button>
      </div>
    </section>
  );
}
