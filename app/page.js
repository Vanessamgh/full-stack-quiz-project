import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <span className="hero-eyebrow">15 questions · 2 minutes · zero science</span>
        <h1>Which animal matches your vibe?</h1>
        <p className="lead">
          Answer honestly (or don&apos;t, we&apos;re not the personality
          police) and we&apos;ll match you to one of six animal archetypes —
          then back it up with real facts pulled live from an animal data API.
        </p>
        <Link className="btn btn-primary" href="/quiz">
          Start the Quiz &rarr;
        </Link>

        <div className="archetype-preview">
          <span className="archetype-chip">🐺 Wolf</span>
          <span className="archetype-chip">🐱 Cat</span>
          <span className="archetype-chip">🐶 Dog</span>
          <span className="archetype-chip">🦅 Eagle</span>
          <span className="archetype-chip">🦉 Owl</span>
          <span className="archetype-chip">🐬 Dolphin</span>
        </div>
      </section>

      <section aria-labelledby="about-title">
        <h2 id="about-title" className="section-title">
          How this works
        </h2>
        <div className="row g-3 info-grid-row">
          <div className="col-md-4">
            <div className="info-card">
              <h3>1. Answer 15 questions</h3>
              <p>
                Quick-fire questions about how you handle conflict, stress,
                weekends, and decision-making — no overthinking required.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card">
              <h3>2. Get your archetype</h3>
              <p>
                Each answer scores a different animal. Whichever one you
                match most closely becomes your result — or you get a hybrid
                if it&apos;s close.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card">
              <h3>3. See the real facts</h3>
              <p>
                Your result page pulls live characteristics for all six
                animals from a public Animals API, so you can compare your
                vibe to the real thing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
