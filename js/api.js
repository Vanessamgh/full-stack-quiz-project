/**
 * api.js
 * Wraps the API Ninjas "Animals" endpoint (https://api.api-ninjas.com/v1/animals).
 * Docs: https://api-ninjas.com/api/animals — free API key, sign up required.
 *
 * IMPORTANT (read this before demoing the site):
 * 1. Go to https://api-ninjas.com/ and create a free account.
 * 2. Copy your API key from the dashboard.
 * 3. Paste it below, replacing "YOUR_API_KEY_HERE".
 * Without a key, every request will reject with a MISSING_KEY error —
 * results.js already handles that gracefully and falls back to curated facts,
 * so the site still works, it just won't show live data until you add a key.
 */

const API_NINJAS_KEY = "YOUR_API_KEY_HERE";

class AnimalApiService {
  constructor(apiKey = API_NINJAS_KEY) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.api-ninjas.com/v1/animals";
  }

  /**
   * Fetches live data for one animal by (partial) common name.
   * Resolves to an array — may be empty if nothing matched (empty state).
   * Throws on missing key / network / HTTP errors (error state).
   */
  async fetchAnimal(name) {
    if (!this.apiKey || this.apiKey === "YOUR_API_KEY_HERE") {
      throw new Error("MISSING_KEY");
    }

    let response;
    try {
      response = await fetch(`${this.baseUrl}?name=${encodeURIComponent(name)}`, {
        headers: { "X-Api-Key": this.apiKey },
      });
    } catch (networkError) {
      throw new Error("NETWORK_ERROR");
    }

    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  }

  /**
   * Fetches several animals in parallel without letting one failure
   * take down the rest. Returns { name, status: 'ok'|'empty'|'error', data, error }[].
   */
  async fetchMany(names) {
    const results = await Promise.allSettled(names.map((n) => this.fetchAnimal(n)));

    return results.map((result, i) => {
      const name = names[i];
      if (result.status === "fulfilled") {
        return result.value.length
          ? { name, status: "ok", data: result.value[0] }
          : { name, status: "empty", data: null };
      }
      return { name, status: "error", data: null, error: result.reason.message };
    });
  }
}

window.AnimalApiService = AnimalApiService;
