/**
 * Analytics abstraction.
 *
 * No tracking ID is hard-coded. To enable analytics, set
 * VITE_ANALYTICS_PROVIDER ("ga4" | "plausible") and the matching ID/site
 * domain in environment variables, then wire the provider script in
 * index.html. Until then, events are silently dropped (kept as no-ops so
 * instrumentation can stay in components).
 */

type AnalyticsEvent =
  | "start_project_click"
  | "contact_submission"
  | "whatsapp_click"
  | "solution_select"
  | "case_study_click"
  | "discovery_step_complete"
  | "industry_select";

const provider = import.meta.env.VITE_ANALYTICS_PROVIDER as string | undefined;

export function trackEvent(event: AnalyticsEvent, data?: Record<string, string>) {
  if (!provider) return;
  try {
    if (provider === "ga4" && typeof window !== "undefined" && "gtag" in window) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event, data);
    } else if (provider === "plausible" && typeof window !== "undefined" && "plausible" in window) {
      (window as unknown as { plausible: (e: string, o?: { props?: Record<string, string> }) => void })
        .plausible(event, { props: data });
    }
  } catch {
    // Analytics must never break the UI.
  }
}
