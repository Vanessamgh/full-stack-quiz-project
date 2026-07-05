"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/lib/data";

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="faq-section" id="faq">
      <div className="hero" style={{ paddingTop: 8 }}>
        <span className="hero-eyebrow">Before you scroll away confused</span>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}>
          Frequently Overthought Questions
        </h1>
        <p className="lead">
          Everything you didn&apos;t know you needed to ask about your results.
        </p>
      </div>

      <div className="faq-list">
        {FAQ_DATA.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div className={`faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-answer-wrap" id={`faq-answer-${i}`} role="region">
                <div className="faq-answer-inner">
                  <p className="faq-answer">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
