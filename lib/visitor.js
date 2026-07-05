/**
 * lib/visitor.js
 * Generates (or reuses) a random anonymous ID per browser, stored in
 * localStorage. No login system needed — this is just enough to let each
 * visitor see only their own past results, not everyone else's.
 */

const KEY = "vibecheck_visitor_id";

export function getVisitorId() {
  if (typeof window === "undefined") return null; // safety for server-side calls

  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}
