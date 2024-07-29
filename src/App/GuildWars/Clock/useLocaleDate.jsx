export default function useFormatDateTime({
  timeZone,
  month,
  weekday,
  day,
  hour,
  minute,
  second,
  hour12,
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
  });

  return [format];
}
