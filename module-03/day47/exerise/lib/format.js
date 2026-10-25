const etbFormatter = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 0 });
const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });
const relativeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
export function etb(value) { return Number.isFinite(Number(value)) ? etbFormatter.format(Number(value)) : "Not recorded"; }
export function when(value) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "Unknown" : dateFormatter.format(date); }
export function relative(value, now = Date.now()) { const seconds = Math.round((new Date(value).getTime() - new Date(now).getTime()) / 1000); if (!Number.isFinite(seconds)) return "Unknown"; const units = [["year",31536000],["month",2592000],["week",604800],["day",86400],["hour",3600],["minute",60],["second",1]]; const [unit, divisor] = units.find(([, size]) => Math.abs(seconds) >= size) ?? units.at(-1); return relativeFormatter.format(Math.round(seconds / divisor), unit); }
