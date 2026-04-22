import { useNavigate } from 'react-router-dom';
import { Bell, Check, X } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext.jsx';

/**
 * NotificationPanel
 * Rendered inside a positioned wrapper (relative div) in the navbar.
 * Handles its own scrollable list + sticky footer.
 */
export default function NotificationPanel({ panelRef, onClose }) {
  const navigate = useNavigate();
  const { popupNotifications, unreadCount, markRead, markAllRead, hideFromPopup, hideAllFromPopup } =
    useNotifications();

  const handleViewMore = () => {
    onClose();
    navigate('/notifications');
  };

  const handleRemoveAll = (e) => {
    e.stopPropagation();
    hideAllFromPopup();
  };

  return (
    <div
      ref={panelRef}
      className="
        absolute right-0 top-12
        z-50 w-80 max-w-[calc(100vw-1rem)]
        flex flex-col
        overflow-hidden rounded-xl
        border border-(--border-color)
        bg-(--surface)
        shadow-xl
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Header ── */}
      <div className="flex shrink-0 items-center justify-between border-b border-(--border-color) px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-(--text-primary)">Notifications</p>
          <p className="text-xs text-(--text-tertiary)">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            markAllRead();
          }}
          className="text-xs font-medium text-(--color-primary) transition hover:opacity-75"
        >
          Mark all as read
        </button>
      </div>

      {/* ── Scrollable List ── */}
      <div className="max-h-72 overflow-y-auto overscroll-contain p-2 space-y-1
        scrollbar-thin scrollbar-thumb-[var(--border-color)] scrollbar-track-transparent">
        {popupNotifications.length === 0 ? (
          <div className="py-8 text-center">
            <Bell className="mx-auto mb-2 h-8 w-8 text-(--text-tertiary) opacity-40" />
            <p className="text-sm text-(--text-tertiary)">No notifications</p>
          </div>
        ) : (
          popupNotifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 rounded-xl p-3 transition ${
                n.isRead
                  ? 'opacity-60 hover:bg-(--dropdown-hover)'
                  : 'bg-(--color-primary-soft) hover:bg-(--color-primary-soft)'
              }`}
            >
              {/* Icon */}
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-(--color-on-primary)">
                <Bell className="h-4 w-4" />
              </div>

              {/* Body */}
              <div className="min-w-0 flex-1">
                <p className={`text-sm leading-5 ${n.isRead ? 'font-normal text-(--text-secondary)' : 'font-semibold text-(--text-primary)'}`}>
                  {n.message}
                </p>
                <p className="mt-0.5 text-xs text-(--text-tertiary)">{n.time}</p>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 flex-col gap-1">
                {/* Mark as read */}
                {!n.isRead && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markRead(n.id);
                    }}
                    className="rounded-full p-1 text-(--text-tertiary) transition hover:bg-(--dropdown-hover) hover:text-(--color-primary)"
                    aria-label="Mark as read"
                    title="Mark as read"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                )}
                {/* Remove from popup */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    hideFromPopup(n.id);
                  }}
                  className="rounded-full p-1 text-(--text-tertiary) transition hover:bg-(--dropdown-hover) hover:text-red-500"
                  aria-label="Dismiss notification"
                  title="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Footer (fixed, never scrolls) ── */}
      <div className="flex shrink-0 items-center justify-between border-t border-(--border-color) px-4 py-3 gap-2">
        <button
          type="button"
          onClick={handleRemoveAll}
          className="flex-1 rounded-lg border border-(--border-color) py-1.5 text-xs font-medium text-(--text-secondary) transition hover:bg-(--dropdown-hover)"
        >
          Remove all
        </button>
        <button
          type="button"
          onClick={handleViewMore}
          className="flex-1 rounded-lg bg-(--color-primary) py-1.5 text-xs font-medium text-(--color-on-primary) transition hover:opacity-90"
        >
          View more
        </button>
      </div>
    </div>
  );
}
