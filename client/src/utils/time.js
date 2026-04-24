const IST_TIME_ZONE = 'Asia/Kolkata';

export const formatIstDateTime = (date = new Date()) => {
  return date.toLocaleString('en-IN', {
    timeZone: IST_TIME_ZONE,
  });
};

export const formatIstLongDate = (date = new Date()) => {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: IST_TIME_ZONE,
  });
};

export const formatIstWeekday = (date = new Date()) => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    timeZone: IST_TIME_ZONE,
  });
};

export const getIstCurrentMinutes = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-IN', {
    timeZone: IST_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === 'hour')?.value || 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value || 0);

  return hour * 60 + minute;
};
