const currency = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 2 });
const dateTime = new Intl.DateTimeFormat("en-ET", { dateStyle: "medium", timeStyle: "short" });
const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
export const etb = (value) => currency.format(Number(value) || 0);
export const when = (value) => dateTime.format(new Date(value));
export const relative = (value) => {
  const seconds = Math.round((new Date(value).getTime() - Date.now()) / 1000);
  const formatter = relativeTime;
  if (Math.abs(seconds) < 60) return formatter.format(seconds, "second");
  const minutes = Math.round(seconds / 60);
  if (Math.abs(minutes) < 60) return formatter.format(minutes, "minute");
  return formatter.format(Math.round(minutes / 60), "hour");
};


