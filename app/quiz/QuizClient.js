"use client";

import { Component } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS } from "@/lib/data";
import { getVisitorId } from "@/lib/visitor";

/**
 * Drives the 15-question quiz flow. Written as an ES6 class component so
 * the quiz's state machine (current question, chosen answers, saving flag)
 * lives on `this` rather than in hooks.
 *
 * Next.js's `useRouter()` is a hook and can only be called inside a function
 * component, so this file exports a small function wrapper (`QuizClient`)
 * that just grabs the router and hands it to the class as a `navigate` prop.
 * All of the actual quiz logic below lives in the `Quiz` class.
 */
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      answers: [],
      saving: false,
    };
    this.selectOption = this.selectOption.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);
    this.finish = this.finish.bind(this);
  }

  selectOption(type) {
    const next = [...this.state.answers];
    next[this.state.currentIndex] = type;
    this.setState({ answers: next });
  }

  goBack() {
    if (this.state.currentIndex === 0) return;
    this.setState((prev) => ({ currentIndex: prev.currentIndex - 1 }));
  }

  goNext() {
    const { currentIndex, answers } = this.state;
    if (!answers[currentIndex]) return;
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      this.setState({ currentIndex: currentIndex + 1 });
    } else {
      this.finish();
    }
  }

  async finish() {
    const scores = { wolf: 0, cat: 0, dog: 0, eagle: 0, owl: 0, dolphin: 0 };
    this.state.answers.forEach((type) => {
      if (type) scores[type]++;
    });

    this.setState({ saving: true });
    try {
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores, visitorId: getVisitorId() }),
      });
    } catch (err) {
      // Non-blocking: saving to the leaderboard is a bonus feature.
      // The quiz result itself still works via the URL params below.
      console.error("Could not save result to leaderboard:", err);
    }

    const params = new URLSearchParams(scores);
    this.props.navigate(`/results?${params.toString()}`);
  }

  render() {
    const { currentIndex, answers, saving } = this.state;
    const question = QUIZ_QUESTIONS[currentIndex];
    const selectedType = answers[currentIndex];
    const isLast = currentIndex === QUIZ_QUESTIONS.length - 1;
    const progressPercent = Math.round((currentIndex / QUIZ_QUESTIONS.length) * 100);

    return (
      <div className="quiz-card" aria-live="polite">
        <div className="quiz-progress">
          <div className="quiz-progress-bar" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="quiz-step">
          Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
        </p>
        <h2 className="quiz-question">{question.text}</h2>
        <div className="quiz-options">
          {question.options.map((opt) => (
            <button
              key={opt.type}
              type="button"
              className={`quiz-option${opt.type === selectedType ? " is-selected" : ""}`}
              onClick={() => this.selectOption(opt.type)}
            >
              <span className="quiz-option-label">{opt.label}</span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
        <div className="quiz-nav">
          <button
            type="button"
            className="btn btn-ghost quiz-back"
            disabled={currentIndex === 0}
            onClick={this.goBack}
          >
            &larr; Back
          </button>
          <button
            type="button"
            className="btn btn-primary quiz-next"
            disabled={!selectedType || saving}
            onClick={this.goNext}
          >
            {saving ? "Saving…" : isLast ? "See my result" : "Next"} &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default function QuizClient() {
  const router = useRouter();
  return <Quiz navigate={(path) => router.push(path)} />;
}
