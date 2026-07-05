"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ARCHETYPES } from "@/lib/data";
import { AnimalApiService } from "@/lib/api";
import { getVisitorId } from "@/lib/visitor";

const archetypeIds = Object.keys(ARCHETYPES);

export default function ResultsClient() {
  const searchParams = useSearchParams();
  const [facts, setFacts] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [search, setSearch] = useState("");

  const scores = useMemo(() => {
    const s = {};
    archetypeIds.forEach((id) => {
      const raw = parseInt(searchParams.get(id), 10);
      s[id] = Number.isFinite(raw) ? raw : 0;
    });
    return s;
  }, [searchParams]);

  const hasResult = Object.values(scores).some((v) => v > 0);
  const maxScore = Math.max(...Object.values(scores), 1);
  const topScore = Math.max(...Object.values(scores));
  const winners = archetypeIds.filter((id) => scores[id] === topScore);

  // live animal facts from the Animals API — one fetch per archetype
  useEffect(() => {
    if (!hasResult) return;
    const api = new AnimalApiService();
    let cancelled = false;

    archetypeIds.forEach(async (id) => {
      const [result] = await api.fetchMany([ARCHETYPES[id].apiQuery]);
      if (!cancelled) {
        setFacts((prev) => ({ ...prev, [id]: result }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [hasResult]);

  // this visitor's own past results, from our own Neon-backed API route
  useEffect(() => {
    const visitorId = getVisitorId();
    if (!visitorId) return;
    fetch(`/api/results?visitor_id=${visitorId}`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setLeaderboard)
      .catch(() => setLeaderboard([]));
  }, []);

  if (!hasResult) {
    return (
      <section className="hero" aria-live="polite">
        <div className="no-result">
          <p className="no-result-emoji">🤔</p>
          <h1>You haven&apos;t taken the quiz yet</h1>
          <p>Answer the 15 questions first and your archetype will show up here.</p>
          <Link className="btn btn-primary" href="/quiz">
            Take the Quiz
          </Link>
        </div>
      </section>
    );
  }

  const winningArchetypes = winners.map((id) => ARCHETYPES[id]);
  const isHybrid = winningArchetypes.length > 1;
  const title = isHybrid
    ? winningArchetypes.map((a) => a.name).join(" + ") + " Hybrid"
    : winningArchetypes[0].name;
  const emoji = winningArchetypes.map((a) => a.emoji).join(" ");
  const tagline = winningArchetypes.map((a) => a.tagline).join(" ");
  const description = isHybrid
    ? `You scored evenly between ${winningArchetypes
        .map((a) => a.name)
        .join(" and ")} — you carry both sets of traits. ${winningArchetypes
        .map((a) => a.description)
        .join(" ")}`
    : winningArchetypes[0].description;
  const allFacts = winningArchetypes.flatMap((a) => a.facts);

  const filteredIds = archetypeIds.filter((id) =>
    ARCHETYPES[id].name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <>
      <section className="hero" aria-live="polite">
        <p className="result-emoji">{emoji}</p>
        <p className="result-eyebrow">Your result</p>
        <h1 className="result-name">{title}</h1>
        <p className="result-tagline">{tagline}</p>
        <p className="result-description">{description}</p>
        <ul className="result-facts">
          {allFacts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="result-actions">
          <Link className="btn btn-ghost" href="/quiz">
            Retake the quiz
          </Link>
        </div>
      </section>

      <section aria-label="Full score breakdown">
        <h2 className="section-title">Your full score breakdown</h2>
        <div className="score-chart">
          {archetypeIds.map((id) => {
            const a = ARCHETYPES[id];
            const value = scores[id];
            const pct = Math.round((value / maxScore) * 100);
            return (
              <div className="score-row" key={id}>
                <span className="score-label">
                  {a.emoji} {a.name}
                </span>
                <div className="score-track">
                  <div
                    className="score-fill"
                    style={{ width: `${pct}%`, background: a.color }}
                  />
                </div>
                <span className="score-value">{value}</span>
              </div>
            );
          })}
        </div>
      </section>

      {leaderboard.length > 0 && (
        <section aria-labelledby="leaderboard-title">
          <h2 id="leaderboard-title" className="section-title">
            Your past results
          </h2>
          <ul className="result-facts">
            {leaderboard.map((row, i) => (
              <li key={i}>
                {ARCHETYPES[row.archetype]?.emoji} {ARCHETYPES[row.archetype]?.name || row.archetype}
                {" — "}
                {new Date(row.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="facts-title">
        <h2 id="facts-title" className="section-title">
          Explore live animal facts
        </h2>
        <p className="lead" style={{ textAlign: "left", margin: "0 0 14px", fontSize: "0.92rem" }}>
          Pulled live from the API Ninjas Animals API for all six archetypes.
          Search to filter the cards below (this happens instantly in your
          browser — no extra requests).
        </p>
        <input
          type="text"
          className="facts-search"
          placeholder='Search archetypes… try "owl" or "dolphin"'
          aria-label="Search archetype facts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="row g-3">
          {filteredIds.map((id) => {
            const a = ARCHETYPES[id];
            const result = facts[id];
            return (
              <div className="col-sm-6 col-lg-4" key={id}>
                <article className="fact-card">
                  <header className="fact-card-header" style={{ borderColor: a.color }}>
                    <span>{a.emoji}</span>
                    <h3>{a.name}</h3>
                  </header>
                  <div className="fact-card-body">
                    {!result && <p className="fact-status">Loading live data…</p>}

                    {result && result.status === "ok" && (() => {
                      const c = result.data.characteristics || {};
                      const bits = [
                        c.habitat && `Habitat: ${c.habitat}`,
                        c.diet && `Diet: ${c.diet}`,
                        c.top_speed && `Top speed: ${c.top_speed}`,
                        c.lifespan && `Lifespan: ${c.lifespan}`,
                      ].filter(Boolean);
                      return (
                        <>
                          <p className="fact-status fact-status-live">
                            🟢 Live from the Animals API
                          </p>
                          <ul className="fact-list">
                            {bits.length ? (
                              bits.map((b) => <li key={b}>{b}</li>)
                            ) : (
                              <li>No extra characteristics returned for this entry.</li>
                            )}
                          </ul>
                        </>
                      );
                    })()}

                    {result && result.status === "empty" && (
                      <>
                        <p className="fact-status">
                          ⚪ No live match found for &quot;{a.apiQuery}&quot; — here&apos;s
                          what we already know:
                        </p>
                        <ul className="fact-list">
                          {a.facts.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {result && result.status === "error" && (
                      <>
                        <p className="fact-status fact-status-error">
                          🔴{" "}
                          {result.error === "MISSING_KEY"
                            ? "Add your free API Ninjas key in lib/api.js to unlock live data."
                            : "Couldn't reach the live API right now."}
                        </p>
                        <ul className="fact-list">
                          {a.facts.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
