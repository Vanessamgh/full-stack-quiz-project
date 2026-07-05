"use client";

import { Component } from "react";
import { FAQ_DATA } from "@/lib/data";

/**
 * Individual custom UI requirement: FAQ section with collapsible answers.
 * Written as an ES6 class component (extends React.Component) rather than
 * a function component, per the assignment's "JavaScript must use ES6
 * classes" requirement. `openIndex` state tracks which single answer is
 * expanded; only one panel is open at a time, and aria-expanded/
 * aria-controls stay in sync for accessibility.
 */
export default class FaqClient extends Component {
  constructor(props) {
    super(props);
    this.state = { openIndex: null };
    this.toggle = this.toggle.bind(this);
  }

  toggle(i) {
    this.setState((prev) => ({
      openIndex: prev.openIndex === i ? null : i,
    }));
  }

  render() {
    const { openIndex } = this.state;

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
                  onClick={() => this.toggle(i)}
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
}
