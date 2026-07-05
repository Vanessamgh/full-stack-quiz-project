/**
 * lib/api.js
 * Wraps the API Ninjas "Animals" endpoint (https://api.api-ninjas.com/v1/animals).
 * Docs: https://api-ninjas.com/api/animals — free API key, sign up required.
 *
 * IMPORTANT: this runs in the browser (called from a "use client" component),
 * so the key below is public in the compiled JS. That's fine for a free demo
 * tier key on a course project, just don't reuse a key you care about.
 *
 * 1. Go to https://api-ninjas.com/ and create a free account.
 * 2. Copy your API key from the dashboard.
 * 3. Paste it below, replacing "YOUR_API_KEY_HERE".
 * Without a key, every request rejects with a MISSING_KEY error — the results
 * page already handles that gracefully and falls back to curated facts.
 */

const API_NINJAS_KEY = "YOUR_API_KEY_HERE";

export class AnimalApiService {
  constructor(apiKey = API_NINJAS_KEY) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.api-ninjas.com/v1/animals";
  }

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
