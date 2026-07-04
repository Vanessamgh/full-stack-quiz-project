/**
 * results.js
 * Powers results.html: reads scores from the URL, reveals the archetype,
 * then fetches live data for all 6 archetypes from the Animals API and
 * renders a searchable grid (client-side search over the fetched data).
 */

class ResultsPage {
  constructor() {
    this.archetypeIds = Object.keys(window.ARCHETYPES);
    this.scores = this.parseScores();
    this.hasResult = Object.values(this.scores).some((v) => v > 0);
    this.winners = this.computeWinners();
    this.api = new AnimalApiService();
    this.fetchedAnimals = {}; // archetypeId -> { status, data }

    if (!this.hasResult) {
      this.renderNoResult();
      return;
    }

    this.renderHero();
    this.renderScoreChart();
    this.renderFactsGrid(true); // true = show loading skeletons first
    this.loadLiveData();
    this.bindSearch();
    this.bindShare();
  }

  // ---------- scoring ----------

  parseScores() {
    const params = new URLSearchParams(window.location.search);
    const scores = {};
    this.archetypeIds.forEach((id) => {
      const raw = parseInt(params.get(id), 10);
      scores[id] = Number.isFinite(raw) ? raw : 0;
    });
    return scores;
  }

  computeWinners() {
    const max = Math.max(...Object.values(this.scores));
    return this.archetypeIds.filter((id) => this.scores[id] === max);
  }

  // ---------- "took the quiz? no?" fallback ----------

  renderNoResult() {
    document.getElementById("resultHero").innerHTML = `
      <div class="no-result">
        <p class="no-result-emoji">\ud83e\udd14</p>
        <h1>You haven't taken the quiz yet</h1>
        <p>Answer the 15 questions first and your archetype will show up here.</p>
        <a class="btn btn-primary" href="quiz.html">Take the Quiz</a>
      </div>
    `;
  }

  // ---------- hero / reveal ----------

  renderHero() {
    const isHybrid = this.winners.length > 1;
    const archetypes = this.winners.map((id) => window.ARCHETYPES[id]);

    const title = isHybrid
      ? archetypes.map((a) => a.name).join(" + ") + " Hybrid"
      : archetypes[0].name;

    const emoji = archetypes.map((a) => a.emoji).join(" ");
    const tagline = archetypes.map((a) => a.tagline).join(" ");
    const description = isHybrid
      ? `You scored evenly between ${archetypes
          .map((a) => a.name)
          .join(" and ")} \u2014 you carry both sets of traits. ${archetypes
          .map((a) => a.description)
          .join(" ")}`
      : archetypes[0].description;

    const allFacts = archetypes.flatMap((a) => a.facts);

    document.getElementById("resultHero").innerHTML = `
      <p class="result-emoji">${emoji}</p>
      <p class="result-eyebrow">Your result</p>
      <h1 class="result-name">${title}</h1>
      <p class="result-tagline">${tagline}</p>
      <p class="result-description">${description}</p>
      <ul class="result-facts">
        ${allFacts.map((f) => `<li>${f}</li>`).join("")}
      </ul>
      <div class="result-actions">
        <button class="btn btn-primary" id="shareBtn">Share my result</button>
        <a class="btn btn-ghost" href="quiz.html">Retake the quiz</a>
      </div>
      <p class="share-copied" id="shareCopied" hidden>Link copied \u2014 go paste it somewhere fun.</p>
    `;
  }

  // ---------- score breakdown chart ----------

  renderScoreChart() {
    const maxScore = Math.max(...Object.values(this.scores), 1);

    document.getElementById("scoreChart").innerHTML = `
      <h2 class="section-title">Your full score breakdown</h2>
      <div class="score-chart">
        ${this.archetypeIds
          .map((id) => {
            const a = window.ARCHETYPES[id];
            const value = this.scores[id];
            const pct = Math.round((value / maxScore) * 100);
            return `
            <div class="score-row">
              <span class="score-label">${a.emoji} ${a.name}</span>
              <div class="score-track">
                <div class="score-fill" style="width:${pct}%; background:${a.color};"></div>
              </div>
              <span class="score-value">${value}</span>
            </div>`;
          })
          .join("")}
      </div>
    `;
  }

  // ---------- live API grid ----------

  renderFactsGrid(loading) {
    // Bootstrap's grid system (row/col) handles the responsive layout here;
    // hand-written CSS handles the card's own look. data-name lives on the
    // Bootstrap column so filtering collapses the whole slot, not just the card.
    const container = document.getElementById("factsGrid");

    container.innerHTML = this.archetypeIds
      .map((id) => {
        const a = window.ARCHETYPES[id];
        return `
        <div class="col-sm-6 col-lg-4 fact-slot" data-id="${id}" data-name="${a.name.toLowerCase()}">
          <article class="fact-card">
            <header class="fact-card-header" style="border-color:${a.color}">
              <span>${a.emoji}</span>
              <h3>${a.name}</h3>
            </header>
            <div class="fact-card-body" id="factBody-${id}">
              ${loading ? `<p class="fact-status">Loading live data\u2026</p>` : ""}
            </div>
          </article>
        </div>`;
      })
      .join("");
  }

  async loadLiveData() {
    const queries = this.archetypeIds.map((id) => window.ARCHETYPES[id].apiQuery);
    const results = await this.api.fetchMany(queries);

    results.forEach((result, i) => {
      const id = this.archetypeIds[i];
      this.fetchedAnimals[id] = result;
      this.renderFactCardBody(id, result);
    });
  }

  renderFactCardBody(id, result) {
    const body = document.getElementById(`factBody-${id}`);
    const archetype = window.ARCHETYPES[id];
    if (!body) return;

    if (result.status === "ok") {
      const c = result.data.characteristics || {};
      const liveBits = [
        c.habitat && `<strong>Habitat:</strong> ${c.habitat}`,
        c.diet && `<strong>Diet:</strong> ${c.diet}`,
        c.top_speed && `<strong>Top speed:</strong> ${c.top_speed}`,
        c.lifespan && `<strong>Lifespan:</strong> ${c.lifespan}`,
      ].filter(Boolean);

      body.innerHTML = `
        <p class="fact-status fact-status-live">\ud83d\udfe2 Live from the Animals API</p>
        <ul class="fact-list">${liveBits.map((b) => `<li>${b}</li>`).join("") || "<li>No extra characteristics returned for this entry.</li>"}</ul>
      `;
      return;
    }

    if (result.status === "empty") {
      body.innerHTML = `
        <p class="fact-status">\u26aa No live match found for "${archetype.apiQuery}" \u2014 here's what we already know:</p>
        <ul class="fact-list">${archetype.facts.map((f) => `<li>${f}</li>`).join("")}</ul>
      `;
      return;
    }

    // status === "error" (missing key, network, HTTP error)
    const hint =
      result.error === "MISSING_KEY"
        ? "Add your free API Ninjas key in js/api.js to unlock live data."
        : "Couldn't reach the live API right now.";

    body.innerHTML = `
      <p class="fact-status fact-status-error">\ud83d\udd34 ${hint}</p>
      <ul class="fact-list">${archetype.facts.map((f) => `<li>${f}</li>`).join("")}</ul>
    `;
  }

  // ---------- client-side search over the already-fetched cards ----------

  bindSearch() {
    const input = document.getElementById("factsSearch");
    if (!input) return;

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      document.querySelectorAll(".fact-slot").forEach((slot) => {
        const matches = slot.dataset.name.includes(query);
        slot.hidden = query.length > 0 && !matches;
      });
    });
  }

  // ---------- share ----------

  bindShare() {
    const btn = document.getElementById("shareBtn");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      const url = window.location.href;
      if (navigator.share) {
        navigator.share({ title: "My Pawsonality result", url }).catch(() => {});
        return;
      }
      try {
        await navigator.clipboard.writeText(url);
        const note = document.getElementById("shareCopied");
        note.hidden = false;
        setTimeout(() => (note.hidden = true), 2500);
      } catch {
        window.prompt("Copy your result link:", url);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ResultsPage();
});

window.ResultsPage = ResultsPage;
