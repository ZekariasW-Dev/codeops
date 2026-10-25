const localOrigin = "http://addis-eats.local";

export function getSafeNextPath(value, fallback = "/") {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return fallback;
  }

  const destination = new URL(value, localOrigin);
  if (destination.origin !== localOrigin) {
    return fallback;
  }

  return `${destination.pathname}${destination.search}${destination.hash}`;
}

export function signInPath(nextPath) {
  const query = new URLSearchParams({ next: getSafeNextPath(nextPath) });
  return `/sign-in?${query.toString()}`;
}
