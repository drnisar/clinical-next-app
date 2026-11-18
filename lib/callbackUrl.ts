const DASHBOARD = "/dashboard";

/**
 * Where to send the user after signing in.
 *
 * Keeps `raw` only when it points at a page under /dashboard on this site
 * (as a path like "/dashboard/registration/1" or a same-origin absolute URL),
 * so a session that expired on a dashboard page returns there. Anything else —
 * missing, "/", "/auth/...", "/dashboardX", or another site — goes to /dashboard.
 * Always returns a path (never an absolute URL).
 */
export function dashboardCallbackUrl(
  raw: string | null | undefined,
  origin: string,
): string {
  if (!raw) return DASHBOARD;
  let url: URL;
  try {
    url = new URL(raw, origin);
  } catch {
    return DASHBOARD;
  }
  if (url.origin !== new URL(origin).origin) return DASHBOARD;
  const { pathname, search, hash } = url;
  const underDashboard =
    pathname === DASHBOARD || pathname.startsWith(`${DASHBOARD}/`);
  return underDashboard ? `${pathname}${search}${hash}` : DASHBOARD;
}
