import { Bell, Check } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext.jsx';

/**
 * Notifications Page — /notifications
 *
 * Rules:
 * - Shows ALL notifications (ignores hiddenInPopup)
 * - Groups by date: Today / Yesterday / Older
 * - Syncs isRead state with popup
 * - NO remove option on this page
 */

function groupNotifications(notifications) {
  const today = [];
  const yesterday = [];
  const older = [];

  notifications.forEach((n) => {
    const t = n.time.toLowerCase();
    if (t.includes('min') || t.includes('hr') || t === 'just now') {
      today.push(n);
    } else if (t === 'yesterday') {
      yesterday.push(n);
    } else {
      older.push(n);
    }
  });

  return [
    { label: 'Today', items: today },
    { label: 'Yesterday', items: yesterday },
    { label: 'Older', items: older },
  ].filter((g) => g.items.length > 0);
}

function NotificationItem({ notification, onMarkRead }) {
  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border p-4 transition ${
        notification.isRead
          ? 'border-(--border-color) bg-(--surface) opacity-60'
          : 'border-(--color-primary)/25 bg-(--color-primary-soft)'
      }`}
    >
      {/* Icon */}
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-(--color-on-primary)">
        <Bell className="h-5 w-5" />
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm leading-6 ${
            notification.isRead
              ? 'font-normal text-(--text-secondary)'
              : 'font-semibold text-(--text-primary)'
          }`}
        >
          {notification.message}
        </p>
      </div>

      {/* Time + Mark as read */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        <p className="whitespace-nowrap text-xs text-(--text-tertiary)">{notification.time}</p>
        {!notification.isRead && (
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            className="flex items-center gap-1 rounded-full border border-(--color-primary)/30 px-2 py-0.5 text-xs font-medium text-(--color-primary) transition hover:bg-(--color-primary) hover:text-(--color-on-primary)"
            aria-label="Mark as read"
          >
            <Check className="h-3 w-3" />
            Read
          </button>
        )}
      </div>
    </div>
  );
}

export default function Notifications() {
  const { allNotifications, unreadCount, markRead, markAllRead } = useNotifications();
  const groups = groupNotifications(allNotifications);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-(--text-primary)">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-(--text-tertiary)">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="rounded-xl border border-(--border-color) px-4 py-2 text-sm font-medium text-(--text-primary) transition hover:bg-(--dropdown-hover)"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Grouped List */}
      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-(--border-color) bg-(--surface) py-20">
          <Bell className="mb-4 h-12 w-12 text-(--text-tertiary) opacity-30" />
          <p className="text-lg font-medium text-(--text-primary)">No notifications yet</p>
          <p className="mt-1 text-sm text-(--text-tertiary)">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.label}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--text-tertiary)">
                {group.label}
              </p>
              <div className="space-y-3">
                {group.items.map((n) => (
                  <NotificationItem key={n.id} notification={n} onMarkRead={markRead} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
