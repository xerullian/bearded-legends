export default function useFormatDateTime({
  timeZone,
  month,
  weekday,
  day,
  hour,
  minute,
  second,
  hour12,
  timeZoneName,
}) {
  const { format } = new Intl.DateTimeFormat(navigator.language, {
    timeZone,
    month,
    weekday,
    day,
    hour,
    minute,
    second,
    hour12,
    timeZoneName,
  });

  return [format];
}
