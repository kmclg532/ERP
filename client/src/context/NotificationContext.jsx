import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Notification shape:
 * {
 *   id: number,
 *   message: string,
 *   time: string,
 *   isRead: boolean,
 *   hiddenInPopup: boolean,
 * }
 */

const SEED = [
  { id: 1, message: 'Attendance report is ready for review.', time: '2 min ago', isRead: false, hiddenInPopup: false },
  { id: 2, message: 'New notice posted for the current semester.', time: '15 min ago', isRead: false, hiddenInPopup: false },
  { id: 3, message: 'Fee receipt has been generated successfully.', time: '1 hr ago', isRead: true, hiddenInPopup: false },
  { id: 4, message: 'Assignment submission deadline is tomorrow.', time: '3 hr ago', isRead: false, hiddenInPopup: false },
  { id: 5, message: 'Your quiz result has been published.', time: 'Yesterday', isRead: true, hiddenInPopup: false },
];

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(SEED);

  /** Mark one notification as read — reflected in popup + page */
  const markRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  /** Mark all notifications as read */
  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  /** Hide from popup only — item still exists on the full page */
  const hideFromPopup = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, hiddenInPopup: true } : n))
    );
  }, []);

  /** Hide ALL from popup */
  const hideAllFromPopup = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, hiddenInPopup: true })));
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  /** Items visible in the navbar popup (not hidden) */
  const popupNotifications = useMemo(
    () => notifications.filter((n) => !n.hiddenInPopup),
    [notifications]
  );

  /** All items for the full notifications page (ignores hiddenInPopup) */
  const allNotifications = useMemo(() => notifications, [notifications]);

  const value = {
    allNotifications,
    popupNotifications,
    unreadCount,
    markRead,
    markAllRead,
    hideFromPopup,
    hideAllFromPopup,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
