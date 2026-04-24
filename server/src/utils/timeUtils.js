const IST_TIME_ZONE = 'Asia/Kolkata';

export const formatIstDateTime = (date = new Date()) => {
  return date.toLocaleString('en-IN', {
    timeZone: IST_TIME_ZONE,
  });
};
