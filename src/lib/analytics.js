/**
 * Reusable analytics event tracker using Google gtag
 * @param {Object} options
 * @param {string} options.event - The name of the event (e.g. "submit", "click").
 * @param {string} options.category - Logical category of the event (e.g. "contact", "careers").
 * @param {string} options.label - Optional label (e.g. job title, blog slug, etc).
 * @param {number} options.value - Optional numerical value (e.g. scroll percentage).
 */
export function trackEvent({ event, category, label = "", value = undefined }) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, {
      event_category: category,
      event_label: label,
      value,
    });
  } else {
    console.warn("Google Analytics is not available.");
  }
}
